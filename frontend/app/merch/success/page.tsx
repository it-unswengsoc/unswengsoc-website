import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { stripe } from '@/lib/stripe';
import { MERCH_CONTACT_EMAIL, NIGHTSHIFT_RED, NIGHTSHIFT_BLACK } from '@/lib/merchProducts';
import GridTexture from '@/components/GridTexture';

export default async function MerchSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  const session = sessionId
    ? await stripe.checkout.sessions
        .retrieve(sessionId, { expand: ['line_items.data.price.product'] })
        .catch(() => null)
    : null;

  const lineItem = session?.line_items?.data[0];
  const itemName =
    lineItem?.price && typeof lineItem.price.product === 'object' && !('deleted' in lineItem.price.product)
      ? lineItem.price.product.name
      : lineItem?.description;
  const email = session?.customer_details?.email;

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: NIGHTSHIFT_BLACK }}>
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <GridTexture color={NIGHTSHIFT_RED} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-md">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: NIGHTSHIFT_RED }} />
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: NIGHTSHIFT_RED }}>Order confirmed</p>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-4">
          You&apos;re in.
        </h1>

        {itemName ? (
          <p className="font-mono text-sm text-white/80 mb-2">{itemName}</p>
        ) : null}
        {email ? (
          <p className="text-sm text-white/60 mb-8">
            A receipt has been sent to <span className="text-white">{email}</span>.
          </p>
        ) : (
          <p className="text-sm text-white/60 mb-8">A receipt has been sent to your email.</p>
        )}

        <p className="font-mono text-[11px] text-white/50 mb-8 leading-relaxed">
          Questions about your order? Email {MERCH_CONTACT_EMAIL}.
        </p>

        <Link
          href="/merch"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white border-2 border-[#a3212f] px-4 py-2 hover:bg-[#a3212f] hover:text-[#120c0a] transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Merch
        </Link>
      </div>
    </div>
  );
}
