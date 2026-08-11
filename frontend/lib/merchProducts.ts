import { Product, ProductVariant } from '@/components/types';

export const MERCH_CONTACT_EMAIL = 'contact@unswengsoc.com';

// Discount code for the Nightshift drop — doesn't gate purchasing (the countdown
// alone does that, see useDropStatus().isLive). Released by EngSoc separately
// (e.g. Instagram, Discord) — not shown on the site. Applied and validated by
// Stripe itself as a Promotion Code on the hosted Checkout page (see
// scripts/setup-stripe-catalog.mjs), not checked client-side — that's what makes
// it a real discount now rather than just a client-side speed bump.
export const NIGHTSHIFT_DISCOUNT_CODE = 'INTERNALS2026';
export const NIGHTSHIFT_DISCOUNT_AMOUNT = 5;

// Nightshift 2026 campaign palette — torn-poster streetwear look (crimson red,
// cream/tan, near-black), taken from the actual campaign artwork in public/merch.
export const NIGHTSHIFT_RED = '#a3212f';
export const NIGHTSHIFT_CREAM = '#ecd9b0';
export const NIGHTSHIFT_BLACK = '#120c0a';

// stripePriceId values come from scripts/setup-stripe-catalog.mjs's initial output,
// with the hoodie prices later replaced via scripts/update-hoodie-price.mjs (Stripe
// Prices are immutable, so a price change creates a new Price and deactivates the
// old one — see that script for the $70 -> $60 IDs it replaced).
//
// LIVE: pointed at live-mode Price IDs (matches the sk_live_ key) — this is what's
// deployed to production. The test-mode IDs used during development are commented
// alongside each; swap back to those (and to the test secret key in .env.local) if
// this ever needs testing again without touching real money.
export const heroProduct: Product = {
  title: 'EngSoc Double-Zip Hoodie',
  price: '$60',
  description: 'Heavyweight double-zip hoodie, embroidered on the chest and screen-printed across the back. A strictly limited run only 100 pieces exist across both colourways, and once they sell out they will not be restocked.',
  status: 'coming-soon',
  // Per-size unit counts are from the 2026 production order (50 units per colourway).
  variants: [
    {
      name: 'Ash Grey',
      // Black stays the primary/backdrop colour for both colourways (matches the
      // campaign artwork, which is shot on the same dark backdrop either way) —
      // red and cream are the two accents that differentiate each colourway.
      hex: NIGHTSHIFT_BLACK,
      accentHex: NIGHTSHIFT_RED,
      image: '/merch/hoodie-ash-grey-campaign.png',
      secondaryImage: '/merch/double-zip-grey-red.png',
      slug: 'double-zip-hoodie-ash-grey',
      sizeStock: {
        // test: price_1U37KGHXrGnNjscbxUemIMUj
        S: { stock: 14, stripePriceId: 'price_1U36y5HXrGnNjscbfJJ3Fz1r' },
        // test: price_1U37KHHXrGnNjscbTmrQrrRL
        M: { stock: 17, stripePriceId: 'price_1U36y6HXrGnNjscb6VR3GU9o' },
        // test: price_1U37KIHXrGnNjscbY0xn1Vtp
        L: { stock: 16, stripePriceId: 'price_1U36y7HXrGnNjscb0UoSH6dM' },
        // test: price_1U37KJHXrGnNjscbObB0qoMu
        XL: { stock: 3, stripePriceId: 'price_1U36y8HXrGnNjscb6fVqpib9' },
      },
    },
    {
      name: 'Onyx Black',
      hex: NIGHTSHIFT_BLACK,
      accentHex: NIGHTSHIFT_CREAM,
      image: '/merch/hoodie-onyx-black-campaign.png',
      secondaryImage: '/merch/double-zip-black-grey.png',
      slug: 'double-zip-hoodie-onyx-black',
      sizeStock: {
        // test: price_1U37KJHXrGnNjscbW0cFPrX5
        S: { stock: 14, stripePriceId: 'price_1U36yAHXrGnNjscb6KETbHYN' },
        // test: price_1U37KKHXrGnNjscbPTQGVU08
        M: { stock: 17, stripePriceId: 'price_1U36yBHXrGnNjscbuSFz2dbj' },
        // test: price_1U37KLHXrGnNjscblHGCwLKc
        L: { stock: 16, stripePriceId: 'price_1U36yCHXrGnNjscbnAX7xlv7' },
        // test: price_1U37KMHXrGnNjscbXOXSy6Gf
        XL: { stock: 3, stripePriceId: 'price_1U36yDHXrGnNjscbPlH3QA0u' },
      },
    },
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  totalStock: 100,
  specs: ['350GSM cotton fleece', 'Embroidered chest crest', 'Screen-printed back graphic', 'Individually numbered'],
};

export const accessories: Product[] = [
  {
    title: 'EngSoc Clickers',
    price: '$5',
    description: 'Blind bag keychain featuring the Clicky Enoch mascot. 6 possible colourways, randomly assigned. You won’t know which one you get until you open it. Collect all 6!',
    status: 'coming-soon',
    image: '/merch/clickers-blind-bag-campaign.png',
    slug: 'clickers-blind-bag',
    // test: price_1U37KMHXrGnNjscbAQLhbtl4
    stripePriceId: 'price_1U36eaHXrGnNjscbrS4CJQXx',
  },
];

export function totalVariantStock(variant: ProductVariant): number | null {
  if (!variant.sizeStock) return null;
  return Object.values(variant.sizeStock).reduce((sum, entry) => sum + entry.stock, 0);
}

export interface MerchLookup {
  product: Product;
  variant?: ProductVariant;
}

// Looks up a product (and colourway, if any) by the slug used in its /merch/[slug]
// purchase page — the single source of truth both the catalog tiles and that route
// resolve against, so a link can never point at a slug that doesn't exist.
export function findMerchBySlug(slug: string): MerchLookup | null {
  for (const variant of heroProduct.variants ?? []) {
    if (variant.slug === slug) return { product: heroProduct, variant };
  }
  if (heroProduct.slug === slug) return { product: heroProduct };
  for (const product of accessories) {
    if (product.slug === slug) return { product };
  }
  return null;
}

export interface StripePriceMeta {
  product: Product;
  variant?: ProductVariant;
  size?: string;
  stock: number | null;
}

// Server-side allow-list: resolves a client-submitted Stripe Price ID back to a
// known SKU in our own catalog. /api/checkout uses this to refuse to create a
// Checkout Session for any price it doesn't recognise, rather than trusting
// whatever ID the client sends.
export function findByStripePriceId(priceId: string): StripePriceMeta | null {
  for (const variant of heroProduct.variants ?? []) {
    for (const [size, entry] of Object.entries(variant.sizeStock ?? {})) {
      if (entry.stripePriceId === priceId) {
        return { product: heroProduct, variant, size, stock: entry.stock };
      }
    }
  }
  for (const product of accessories) {
    if (product.stripePriceId === priceId) {
      return { product, stock: null };
    }
  }
  return null;
}

