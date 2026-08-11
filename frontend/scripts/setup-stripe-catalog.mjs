// One-off setup script: creates a Stripe Product + Price for every merch SKU,
// plus the INTERNALS2026 discount Coupon/Promotion Code, on whichever Stripe
// account STRIPE_SECRET_KEY points at. Run once; re-running will create
// duplicate Products (Stripe has no "create or get" for Products by name), so
// don't run this twice against the same account without cleaning up first.
//
// Usage:
//   set -a; source .env.local; set +a; node scripts/setup-stripe-catalog.mjs
import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error('STRIPE_SECRET_KEY is not set in the environment.');
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: '2026-07-29.dahlia' });

const HOODIE_PRICE_CENTS = 6000; // $60 AUD
const KEYCHAIN_PRICE_CENTS = 500; // $5 AUD
const CURRENCY = 'aud';

const hoodieVariants = [
  { slug: 'double-zip-hoodie-heather-grey-maroon', colourway: 'Heather Grey / Maroon' },
  { slug: 'double-zip-hoodie-black-graphite', colourway: 'Black / Graphite' },
];
const sizes = ['S', 'M', 'L', 'XL'];

async function createSkuPrice({ name, unitAmount, metadata }) {
  const product = await stripe.products.create({ name, metadata });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: unitAmount,
    currency: CURRENCY,
    metadata,
  });
  return price.id;
}

async function main() {
  const priceIds = { hoodie: {}, keychain: null };

  for (const variant of hoodieVariants) {
    priceIds.hoodie[variant.slug] = {};
    for (const size of sizes) {
      const priceId = await createSkuPrice({
        name: `EngSoc Double-Zip Hoodie — ${variant.colourway} — Size ${size}`,
        unitAmount: HOODIE_PRICE_CENTS,
        metadata: { slug: variant.slug, colourway: variant.colourway, size },
      });
      priceIds.hoodie[variant.slug][size] = priceId;
      console.log(`Created: ${variant.colourway} / ${size} -> ${priceId}`);
    }
  }

  priceIds.keychain = await createSkuPrice({
    name: 'EngSoc Clicker Keychain',
    unitAmount: KEYCHAIN_PRICE_CENTS,
    metadata: { slug: 'clicker-keychain' },
  });
  console.log(`Created: Keychain -> ${priceIds.keychain}`);

  const coupon = await stripe.coupons.create({
    amount_off: 500, // $5 AUD off
    currency: CURRENCY,
    duration: 'once',
    max_redemptions: 100,
    name: 'Nightshift internals -$5',
  });
  const promotionCode = await stripe.promotionCodes.create({
    promotion: { type: 'coupon', coupon: coupon.id },
    code: 'INTERNALS2026',
  });
  console.log(`Created coupon ${coupon.id} + promotion code ${promotionCode.code} (${promotionCode.id})`);

  console.log('\n--- Paste this into lib/merchProducts.ts ---\n');
  console.log(JSON.stringify(priceIds, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
