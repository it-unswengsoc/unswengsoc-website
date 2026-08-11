import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { findByStripePriceId } from '@/lib/merchProducts';
import { getLiveStockLevels, getRemainingForSku } from '@/lib/stockLevels';

// Stable per-integration tag (not per-request) so Checkout Sessions from this
// flow are grouped together in the Stripe Dashboard.
const INTEGRATION_IDENTIFIER = 'engsoc-merch-checkout-zonzvdpt';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const priceId = typeof body === 'object' && body !== null && 'priceId' in body ? (body as { priceId: unknown }).priceId : undefined;
  if (typeof priceId !== 'string') {
    return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
  }

  // Never trust a client-supplied price directly — only create a session for a
  // price that's actually in our own catalog.
  const meta = findByStripePriceId(priceId);
  if (!meta) {
    return NextResponse.json({ error: 'Unknown priceId' }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const slug = meta.variant?.slug ?? meta.product.slug ?? '';

  // Re-check against Stripe's live sold count right before creating the session —
  // this is the last line of defense against two people buying the last unit at
  // the same time (the page's own display could be up to ~30s stale).
  if (meta.variant && meta.size) {
    const liveLevels = await getLiveStockLevels();
    const remaining = getRemainingForSku(liveLevels, slug, meta.size);
    if (remaining === 0) {
      return NextResponse.json({ error: 'That size just sold out' }, { status: 409 });
    }
  }

  // Set on both the Session and the underlying PaymentIntent — the Session's
  // copy is handy in the Dashboard, but only PaymentIntents are searchable via
  // the API, which is what getLiveStockLevels() relies on.
  const skuMetadata = {
    slug,
    size: meta.size ?? '',
    colourway: meta.variant?.name ?? '',
    product_title: meta.product.title,
  };

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    phone_number_collection: { enabled: true },
    custom_fields: [
      {
        key: 'full_name',
        label: { type: 'custom', custom: 'Full name' },
        type: 'text',
      },
      {
        key: 'zid',
        label: { type: 'custom', custom: 'zID (e.g. z1234567)' },
        type: 'text',
        optional: true,
      },
    ],
    // INTERNALS2026 is a hoodie-only discount — the keychain has no variant/size,
    // which we use as the "is this the hoodie" signal.
    allow_promotion_codes: Boolean(meta.variant),
    metadata: skuMetadata,
    payment_intent_data: { metadata: skuMetadata },
    success_url: `${siteUrl}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/merch/${slug}`,
    integration_identifier: INTEGRATION_IDENTIFIER,
  });

  if (!session.url) {
    return NextResponse.json({ error: 'Stripe did not return a Checkout URL' }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}
