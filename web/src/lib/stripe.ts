import Stripe from 'stripe'

// Cliente de Stripe server-side (solo se importa desde Server Actions / API Routes)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})
