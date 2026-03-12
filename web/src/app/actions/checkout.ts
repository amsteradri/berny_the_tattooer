'use server'

import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { courses as hardcodedCourses } from "@/lib/courses-data"
import { redirect } from "next/navigation"

export async function createCheckoutSession(slug: string) {
  // 1. Verificar sesión — si no hay sesión, redirigir a login
  const session = await getSession()
  if (!session?.userId) {
    redirect('/login')
  }

  // 2. Buscar el curso en la BD — es la FUENTE DE VERDAD para precio y disponibilidad
  const { data: dbCourse } = await db
    .from('courses')
    .select('id, title, description, image, price_cents, is_published, level')
    .eq('slug', slug)
    .single()

  if (!dbCourse) {
    return { error: "Curso no encontrado" }
  }

  if (!dbCourse.is_published) {
    return { error: "Este curso no está disponible actualmente" }
  }

  if (!dbCourse.price_cents || dbCourse.price_cents <= 0) {
    return { error: "El precio del curso no está configurado correctamente" }
  }

  // 3. Comprobar si ya está inscrito — SEGURIDAD: evitar doble compra
  const { data: existing } = await db
    .from('user_courses')
    .select('id')
    .eq('user_id', session.userId)
    .eq('course_id', dbCourse.id)
    .single()

  if (existing) {
    redirect('/mis-cursos')
  }

  // 4. Para el título/imagen de Stripe usamos los datos hardcodeados si existen
  //    (mejor contenido), pero el PRECIO siempre viene de la DB.
  const hardcoded = hardcodedCourses.find(c => c.slug === slug)
  const productName = hardcoded?.title || dbCourse.title
  const productDescription = hardcoded?.description || dbCourse.description
  const productImage = hardcoded?.image || dbCourse.image

  // 5. Obtener el email del usuario para prellenar el checkout de Stripe
  const { data: user } = await db
    .from('users')
    .select('email, full_name')
    .eq('id', session.userId)
    .single()

  // 6. Crear la Checkout Session en Stripe
  // IMPORTANTE: el precio viene de DB — nadie puede manipularlo desde el cliente.
  // Los metadatos se usan en el webhook para inscribir al usuario.
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: user?.email,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: productName,
            description: productDescription,
            ...(productImage ? { images: [productImage] } : {}),
          },
          unit_amount: dbCourse.price_cents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.userId,
      courseId: dbCourse.id,
      courseSlug: slug,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mis-cursos?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cursos/${slug}?cancelled=1`,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
  })

  if (!checkoutSession.url) {
    return { error: "No se pudo crear la sesión de pago" }
  }

  redirect(checkoutSession.url)
}
