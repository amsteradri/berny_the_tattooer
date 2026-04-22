'use server'

import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const COURSE_IMAGES_BUCKET = "course-images"
const MAX_IMAGE_SIZE_MB = 5
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"]

// ---------------------------------------------------------------------------
// Helper: verifica que el usuario en sesión tiene role='admin'
// ---------------------------------------------------------------------------
async function requireAdmin() {
  const session = await getSession()
  if (!session?.userId) redirect('/login')

  const { data: user } = await db
    .from('users')
    .select('role')
    .eq('id', session.userId)
    .single()

  if (user?.role !== 'admin') {
    redirect('/')
  }

  return session
}

// ---------------------------------------------------------------------------
// Genera un slug URL-safe a partir de un título
// ---------------------------------------------------------------------------
function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// ---------------------------------------------------------------------------
// Sube imagen a Supabase Storage y devuelve la URL pública
// ---------------------------------------------------------------------------
export async function uploadCourseImageAction(
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  await requireAdmin()

  const file = formData.get('image') as File | null

  if (!file || file.size === 0) {
    return { error: 'No se ha seleccionado ninguna imagen' }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: 'Formato no permitido. Usa JPG, PNG, WebP o AVIF.' }
  }

  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return { error: `La imagen no puede superar ${MAX_IMAGE_SIZE_MB}MB` }
  }

  const ext = file.type.split('/')[1].replace('jpeg', 'jpg')
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const arrayBuffer = await file.arrayBuffer()

  // Crear el bucket si no existe (primera vez)
  await db.storage.createBucket(COURSE_IMAGES_BUCKET, { public: true }).catch(() => {
    // Ignorar si ya existe
  })

  const { error } = await db.storage
    .from(COURSE_IMAGES_BUCKET)
    .upload(fileName, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('[Admin] Error subiendo imagen:', error)
    return { error: 'Error al subir la imagen. Inténtalo de nuevo.' }
  }

  const { data: publicUrlData } = db.storage
    .from(COURSE_IMAGES_BUCKET)
    .getPublicUrl(fileName)

  return { url: publicUrlData.publicUrl }
}

// ---------------------------------------------------------------------------
// Crear curso
// ---------------------------------------------------------------------------
export async function createCourseAction(formData: FormData) {
  await requireAdmin()

  const title = (formData.get('title') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()
  const longDescription = (formData.get('long_description') as string)?.trim()
  const priceRaw = formData.get('price_euros') as string
  const level = (formData.get('level') as string)?.trim()
  const durationText = (formData.get('duration_text') as string)?.trim()
  const imageUrl = (formData.get('image_url') as string)?.trim()

  // Validación básica
  if (!title || !description || !priceRaw || !level) {
    return { error: 'Faltan campos obligatorios' }
  }

  const priceEuros = parseFloat(priceRaw)
  if (isNaN(priceEuros) || priceEuros <= 0) {
    return { error: 'El precio debe ser un número positivo' }
  }
  const priceCents = Math.round(priceEuros * 100)

  const slug = toSlug(title)

  // Verificar que el slug no exista ya
  const { data: existing } = await db
    .from('courses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return { error: `Ya existe un curso con el slug "${slug}". Elige un título diferente.` }
  }

  const { data, error } = await db
    .from('courses')
    .insert({
      title,
      slug,
      description,
      long_description: longDescription || description,
      price_cents: priceCents,
      level,
      duration_text: durationText || '',
      image: imageUrl || 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop',
      is_published: false,
    })
    .select('id')
    .single()

  if (error) {
    console.error('[Admin] Error al crear curso:', error)
    return { error: 'Error al guardar el curso en la base de datos' }
  }

  revalidatePath('/admin/cursos')
  revalidatePath('/')
  redirect(`/admin/cursos/${data.id}/editar?created=1`)
}

// ---------------------------------------------------------------------------
// Actualizar curso
// ---------------------------------------------------------------------------
export async function updateCourseAction(id: string, formData: FormData) {
  await requireAdmin()

  const title = (formData.get('title') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()
  const longDescription = (formData.get('long_description') as string)?.trim()
  const priceRaw = formData.get('price_euros') as string
  const level = (formData.get('level') as string)?.trim()
  const durationText = (formData.get('duration_text') as string)?.trim()
  const imageUrl = (formData.get('image_url') as string)?.trim()

  if (!title || !description || !priceRaw || !level) {
    return { error: 'Faltan campos obligatorios' }
  }

  const priceEuros = parseFloat(priceRaw)
  if (isNaN(priceEuros) || priceEuros <= 0) {
    return { error: 'El precio debe ser un número positivo' }
  }

  const { error } = await db
    .from('courses')
    .update({
      title,
      description,
      long_description: longDescription || description,
      price_cents: Math.round(priceEuros * 100),
      level,
      duration_text: durationText || '',
      image: imageUrl || undefined,
    })
    .eq('id', id)

  if (error) {
    console.error('[Admin] Error al actualizar curso:', error)
    return { error: 'Error al actualizar el curso' }
  }

  revalidatePath('/admin/cursos')
  revalidatePath('/')
  revalidatePath(`/cursos`)
  return { success: true }
}

// ---------------------------------------------------------------------------
// Publicar / despublicar curso
// ---------------------------------------------------------------------------
export async function togglePublishAction(id: string, publish: boolean) {
  await requireAdmin()

  if (publish) {
    const { data: course, error: readError } = await db
      .from('courses')
      .select('price_cents')
      .eq('id', id)
      .single()

    if (readError) {
      console.error('[Admin] Error validando precio antes de publicar:', readError)
      return { error: 'No se pudo validar el precio del curso' }
    }

    if (!course?.price_cents || course.price_cents <= 0) {
      return { error: 'No puedes publicar un curso sin precio válido (> 0)' }
    }
  }

  const { error } = await db
    .from('courses')
    .update({ is_published: publish })
    .eq('id', id)

  if (error) {
    console.error('[Admin] Error al cambiar estado de publicación:', error)
    return { error: 'Error al cambiar el estado del curso' }
  }

  revalidatePath('/admin/cursos')
  revalidatePath('/')
  return { success: true }
}

// ---------------------------------------------------------------------------
// Eliminar curso (solo si no tiene inscripciones)
// ---------------------------------------------------------------------------
export async function deleteCourseAction(id: string) {
  await requireAdmin()

  // Verificar que no haya alumnos inscritos
  const { count } = await db
    .from('user_courses')
    .select('id', { count: 'exact', head: true })
    .eq('course_id', id)

  if (count && count > 0) {
    return { error: `No se puede eliminar: hay ${count} alumno(s) inscritos en este curso.` }
  }

  const { error } = await db
    .from('courses')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[Admin] Error al eliminar curso:', error)
    return { error: 'Error al eliminar el curso' }
  }

  revalidatePath('/admin/cursos')
  revalidatePath('/')
  redirect('/admin/cursos')
}

// ===========================================================================
// ACCIONES DE SECCIONES
// ===========================================================================

const COURSE_VIDEOS_BUCKET = "course-videos"
const MAX_VIDEO_SIZE_MB = 500
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/mov", "video/quicktime"]

// ---------------------------------------------------------------------------
// Obtener secciones de un curso (ordenadas)
// ---------------------------------------------------------------------------
export async function getSectionsAction(courseId: string) {
  await requireAdmin()

  const { data, error } = await db
    .from('course_sections')
    .select('*')
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[Admin] Error al obtener secciones:', error)
    return { sections: [], error: 'Error al obtener las secciones' }
  }

  return { sections: data ?? [] }
}

// ---------------------------------------------------------------------------
// Subir vídeo de sección a Supabase Storage
// ---------------------------------------------------------------------------
export async function uploadSectionVideoAction(
  formData: FormData
): Promise<{ path: string } | { error: string }> {
  await requireAdmin()

  const file = formData.get('video') as File | null
  const courseId = formData.get('courseId') as string | null

  if (!file || file.size === 0) return { error: 'No se ha seleccionado ningún vídeo' }
  if (!courseId) return { error: 'Falta el ID del curso' }
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    return { error: 'Formato no permitido. Usa MP4, WebM o MOV.' }
  }
  if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
    return { error: `El vídeo no puede superar ${MAX_VIDEO_SIZE_MB} MB` }
  }

  // Auto-crear bucket si no existe
  const { data: buckets } = await db.storage.listBuckets()
  if (!buckets?.find(b => b.name === COURSE_VIDEOS_BUCKET)) {
    await db.storage.createBucket(COURSE_VIDEOS_BUCKET, { public: false })
  }

  const ext = file.name.split('.').pop() ?? 'mp4'
  const fileName = `${courseId}/${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await db.storage
    .from(COURSE_VIDEOS_BUCKET)
    .upload(fileName, buffer, { contentType: file.type, upsert: false })

  if (error) {
    console.error('[Admin] Error al subir vídeo:', error)
    return { error: 'Error al subir el vídeo' }
  }

  return { path: fileName }
}

// ---------------------------------------------------------------------------
// Crear sección
// ---------------------------------------------------------------------------
export async function createSectionAction(courseId: string, formData: FormData) {
  await requireAdmin()

  const title = (formData.get('title') as string)?.trim()
  if (!title) return { error: 'El título es obligatorio' }

  // Obtener el siguiente sort_order
  const { count } = await db
    .from('course_sections')
    .select('id', { count: 'exact', head: true })
    .eq('course_id', courseId)

  const sortOrder = (count ?? 0)

  const { data, error } = await db
    .from('course_sections')
    .insert({
      course_id: courseId,
      title,
      description: (formData.get('description') as string)?.trim() ?? '',
      duration_text: (formData.get('duration_text') as string)?.trim() ?? '',
      video_path: (formData.get('video_path') as string)?.trim() || null,
      sort_order: sortOrder,
      content: [],
    })
    .select('id')
    .single()

  if (error) {
    console.error('[Admin] Error al crear sección:', error)
    return { error: 'Error al crear la sección' }
  }

  revalidatePath(`/admin/cursos/${courseId}/secciones`)
  redirect(`/admin/cursos/${courseId}/secciones/${data.id}/editar`)
}

// ---------------------------------------------------------------------------
// Actualizar sección
// ---------------------------------------------------------------------------
export async function updateSectionAction(sectionId: string, courseId: string, formData: FormData) {
  await requireAdmin()

  const title = (formData.get('title') as string)?.trim()
  if (!title) return { error: 'El título es obligatorio' }

  const { error } = await db
    .from('course_sections')
    .update({
      title,
      description: (formData.get('description') as string)?.trim() ?? '',
      duration_text: (formData.get('duration_text') as string)?.trim() ?? '',
      video_path: (formData.get('video_path') as string)?.trim() || null,
    })
    .eq('id', sectionId)
    .eq('course_id', courseId)

  if (error) {
    console.error('[Admin] Error al actualizar sección:', error)
    return { error: 'Error al actualizar la sección' }
  }

  revalidatePath(`/admin/cursos/${courseId}/secciones`)
  return { success: true }
}

// ---------------------------------------------------------------------------
// Eliminar sección
// ---------------------------------------------------------------------------
export async function deleteSectionAction(sectionId: string, courseId: string) {
  await requireAdmin()

  const { error } = await db
    .from('course_sections')
    .delete()
    .eq('id', sectionId)
    .eq('course_id', courseId)

  if (error) {
    console.error('[Admin] Error al eliminar sección:', error)
    return { error: 'Error al eliminar la sección' }
  }

  revalidatePath(`/admin/cursos/${courseId}/secciones`)
  return { success: true }
}

// ---------------------------------------------------------------------------
// Reordenar secciones (recibe array de IDs en el nuevo orden)
// ---------------------------------------------------------------------------
export async function reorderSectionsAction(courseId: string, orderedIds: string[]) {
  await requireAdmin()

  const updates = orderedIds.map((id, index) =>
    db.from('course_sections').update({ sort_order: index }).eq('id', id).eq('course_id', courseId)
  )

  await Promise.all(updates)
  revalidatePath(`/admin/cursos/${courseId}/secciones`)
  return { success: true }
}
