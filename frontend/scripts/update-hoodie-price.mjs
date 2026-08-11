// Stripe Prices are immutable (can't edit unit_amount on an existing Price), so
// changing the hoodie price means: create a new Price on each existing Product,
// deactivate the old Price so it can't accidentally be charged, and swap the new
// Price IDs into lib/merchProducts.ts.
//
// Usage:
//   set -a; source .env.local; set +a; node scripts/update-hoodie-price.mjs
import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error('STRIPE_SECRET_KEY is not set in the environment.');
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: '2026-07-29.dahlia' });

const NEW_PRICE_CENTS = 6000; // $60 AUD

const oldPriceIds = {
  'Heather Grey / Maroon': {
    S: 'price_1U36eVHXrGnNjscbuBdDwSGs',
    M: 'price_1U36eVHXrGnNjscb43TeFlbf',
    L: 'price_1U36eWHXrGnNjscb5Tph7ytJ',
    XL: 'price_1U36eXHXrGnNjscbB4n2ZVMp',
  },
  'Black / Graphite': {
    S: 'price_1U36eXHXrGnNjscb7iR0n6ep',
    M: 'price_1U36eYHXrGnNjscbZv1LB2xN',
    L: 'price_1U36eZHXrGnNjscbpr2TtT6B',
    XL: 'price_1U36eaHXrGnNjscbo6HJ0z76',
  },
};

async function main() {
  const newPriceIds = {};

  for (const [colourway, sizes] of Object.entries(oldPriceIds)) {
    newPriceIds[colourway] = {};
    for (const [size, oldPriceId] of Object.entries(sizes)) {
      const oldPrice = await stripe.prices.retrieve(oldPriceId);

      const newPrice = await stripe.prices.create({
        product: oldPrice.product,
        unit_amount: NEW_PRICE_CENTS,
        currency: oldPrice.currency,
        metadata: oldPrice.metadata,
      });

      await stripe.prices.update(oldPriceId, { active: false });

      newPriceIds[colourway][size] = newPrice.id;
      console.log(`${colourway} / ${size}: ${oldPriceId} (deactivated) -> ${newPrice.id} ($60)`);
    }
  }

  console.log('\n--- New price IDs ---\n');
  console.log(JSON.stringify(newPriceIds, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
