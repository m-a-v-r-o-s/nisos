import Stripe from "stripe";

let cached: Stripe | null = null;

/** Returns a Stripe client only if a secret key is configured (test mode). */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}

export const stripeEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);
