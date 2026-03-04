import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Cliente con permisos de administrador para generar URLs firmadas
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoPath: string }> }
) {
  try {
    // 1. Verificar sesión
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { videoPath } = await params
    const enrollmentId = request.nextUrl.searchParams.get('enrollmentId')

    if (!enrollmentId) {
      return NextResponse.json({ error: 'Enrollment ID requerido' }, { status: 400 })
    }

    // 2. Verificar que el usuario tiene acceso al curso
    const { data: enrollment } = await db
      .from('user_courses')
      .select('*')
      .eq('id', enrollmentId)
      .eq('user_id', session.userId)
      .single()

    if (!enrollment) {
      return NextResponse.json(
        { error: 'No tienes acceso a este curso' },
        { status: 403 }
      )
    }

    // 3. Generar URL firmada que expira en 1 hora
    const { data, error } = await supabaseAdmin.storage
      .from('course-videos')
      .createSignedUrl(videoPath, 3600) // 1 hora

    if (error) {
      console.error('Error generando URL firmada:', error)
      return NextResponse.json(
        { error: 'Error generando acceso al vídeo' },
        { status: 500 }
      )
    }

    // 4. Devolver URL firmada + info del usuario para watermark
    return NextResponse.json({
      url: data.signedUrl,
      userEmail: session.userId, // Usaremos esto para el watermark
      expiresIn: 3600
    })
  } catch (error) {
    console.error('Error en API de vídeo:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
