import { stripe } from './stripe';
import { heroProduct } from './merchProducts';
import { ProductVariant } from '@/components/types';

export type StockLevels = Record<string, Record<string, number>>;

// Stripe is the source of truth for "how many have sold" — no separate database.
// Every Checkout Session's underlying PaymentIntent is tagged with the same
// slug/size/colourway metadata (see /api/checkout), so remaining stock for a SKU
// is just: initial stock (from lib/merchProducts.ts) minus however many succeeded
// PaymentIntents Stripe's Search API finds for that exact slug+size.
//
// Caveat: Stripe's Search API has a short indexing delay (typically a few
// seconds, rarely up to ~a minute) — a just-completed sale may not be reflected
// immediately. Fine at this scale (~100 units, low traffic); not appropriate for
// a high-frequency flash-sale scenario.
export async function getLiveStockLevels(): Promise<StockLevels> {
  const levels: StockLevels = {};
  for (const variant of heroProduct.variants ?? []) {
    levels[variant.slug] = {};
    for (const [size, entry] of Object.entries(variant.sizeStock ?? {})) {
      levels[variant.slug][size] = entry.stock;
    }
  }

  try {
    let page = await stripe.paymentIntents.search({
      query: `status:'succeeded' AND metadata['product_title']:'${heroProduct.title}'`,
      limit: 100,
    });

    // Our checkout always creates one-unit purchases (no quantity selector), so
    // one succeeded PaymentIntent for a given size == one unit sold.
    while (true) {
      for (const intent of page.data) {
        const slug = intent.metadata?.slug;
        const size = intent.metadata?.size;
        if (slug && size && levels[slug] && typeof levels[slug][size] === 'number') {
          levels[slug][size] = Math.max(0, levels[slug][size] - 1);
        }
      }
      if (!page.has_more || !page.next_page) break;
      page = await stripe.paymentIntents.search({
        query: `status:'succeeded' AND metadata['product_title']:'${heroProduct.title}'`,
        limit: 100,
        page: page.next_page,
      });
    }
  } catch {
    // Stripe Search unavailable (e.g. transient error) — fall back to the static
    // initial counts rather than breaking the page.
  }

  return levels;
}

export function getRemainingForSku(levels: StockLevels, slug: string, size: string): number | null {
  return levels[slug]?.[size] ?? null;
}

// Returns a copy of the variant with each size's stock swapped for the live
// count — never mutates the original, since that's a shared module-level object
// reused across requests.
export function withLiveStock(variant: ProductVariant, levels: StockLevels): ProductVariant {
  if (!variant.sizeStock) return variant;
  return {
    ...variant,
    sizeStock: Object.fromEntries(
      Object.entries(variant.sizeStock).map(([size, entry]) => [
        size,
        { ...entry, stock: getRemainingForSku(levels, variant.slug, size) ?? entry.stock },
      ])
    ),
  };
}
