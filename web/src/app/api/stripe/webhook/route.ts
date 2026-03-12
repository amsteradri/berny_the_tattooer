import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

// En App Router el body se lee con req.text() — no hace falta bodyParser: false

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    console.error('[Webhook] Sin firma de Stripe')
    return NextResponse.json({ error: 'Sin firma' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // ✅ VERIFICACIÓN CRIPTOGRÁFICA: Stripe firma cada evento con STRIPE_WEBHOOK_SECRET
    // Si alguien intenta llamar a este endpoint manualmente, la firma no coincide y se rechaza.
    // Esto hace IMPOSIBLE falsificar un pago para conseguir acceso gratuito.
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[Webhook] Firma inválida:', err)
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
  }

  // Solo procesamos el evento de pago completado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Solo procesar si el pago fue efectivo (no pendiente)
    if (session.payment_status !== 'paid') {
      console.log('[Webhook] Sesión completada pero pago no confirmado, ignorando')
      return NextResponse.json({ received: true })
    }

    const { userId, courseId, courseSlug } = session.metadata || {}

    if (!userId || !courseId) {
      console.error('[Webhook] Metadatos incompletos:', session.metadata)
      return NextResponse.json({ error: 'Metadatos incompletos' }, { status: 400 })
    }

    console.log(`[Webhook] ✅ Pago confirmado — user=${userId} course=${courseId} slug=${courseSlug}`)

    // Verificar si ya está inscrito (idempotencia — Stripe puede enviar el evento varias veces)
    const { data: existing } = await db
      .from('user_courses')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()

    if (existing) {
      console.log(`[Webhook] Usuario ${userId} ya tenía acceso al curso ${courseId}, ignorando`)
      return NextResponse.json({ received: true })
    }

    // Inscribir al usuario — SOLO llega aquí si Stripe confirmó el pago con su firma
    const { error } = await db
      .from('user_courses')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        status: 'active',
        completed_sections: [],
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent as string,
      })

    if (error) {
      console.error('[Webhook] Error al inscribir usuario:', error)
      // Devolvemos 500 para que Stripe reintente el webhook
      return NextResponse.json({ error: 'Error al inscribir' }, { status: 500 })
    }

    console.log(`[Webhook] ✅ Usuario ${userId} inscrito en curso ${courseId}`)
  }

  return NextResponse.json({ received: true })
}
