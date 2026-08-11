import Stripe from 'stripe';

// Server-only — never import this from a 'use client' component. The secret key
// must never reach the browser bundle.
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set (check .env.local)');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-07-29.dahlia',
});
