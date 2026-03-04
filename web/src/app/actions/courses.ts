'use server'

import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { courses } from "@/lib/courses-data"

export async function enrollCourse(formData: FormData) {
  const session = await getSession()
  if (!session?.userId) {
    redirect('/login')
  }

  const slug = formData.get('slug') as string
  if (!slug) return { error: "Missing slug" }

  const { data: course, error: courseError } = await db
    .from('courses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (courseError || !course) {
    return { error: "Course not found in database." }
  }

  const { data: existingEnrollment } = await db
    .from('user_courses')
    .select('id')
    .eq('user_id', session.userId)
    .eq('course_id', course.id)
    .single()

  if (existingEnrollment) {
    return { message: "Already enrolled" }
  }

  const { error: enrollError } = await db
    .from('user_courses')
    .insert({
      user_id: session.userId,
      course_id: course.id,
      progress: 0,
      status: 'active',
      completed_sections: []
    })

  if (enrollError) {
    console.error("Enrollment failed:", enrollError)
    return { error: "Failed to enroll" }
  }

  revalidatePath('/perfil')
  revalidatePath('/mis-cursos')
  revalidatePath(`/cursos/${slug}`)
  
  redirect('/mis-cursos')
}

export async function completeSectionAction(enrollmentId: string, sectionId: string, slug: string) {
  const session = await getSession()
  if (!session?.userId) redirect('/login')

  // Get current enrollment from DB (source of truth)
  const { data: enrollment, error } = await db
    .from('user_courses')
    .select('completed_sections, course_id')
    .eq('id', enrollmentId)
    .eq('user_id', session.userId)
    .single()

  if (error || !enrollment) return { error: "Enrollment not found" }

  const course = courses.find(c => c.slug === slug)
  if (!course) return { error: "Course not found" }

  const completedSections: string[] = enrollment.completed_sections || []

  // Already completed — return current state (idempotent)
  if (completedSections.includes(sectionId)) {
    return { success: true, completed: completedSections, progress: Math.round((completedSections.length / course.sections.length) * 100) }
  }

  // SERVER-SIDE ORDER VALIDATION: ensure previous section is completed
  const sectionIndex = course.sections.findIndex(s => s.id === sectionId)
  if (sectionIndex === -1) return { error: "Section not found in course" }

  if (sectionIndex > 0) {
    const prevSectionId = course.sections[sectionIndex - 1].id
    if (!completedSections.includes(prevSectionId)) {
      return { error: "Previous section not completed" }
    }
  }

  const newCompleted = [...completedSections, sectionId]
  const newProgress = Math.round((newCompleted.length / course.sections.length) * 100)

  const { error: updateError } = await db
    .from('user_courses')
    .update({
      completed_sections: newCompleted,
      progress: newProgress,
      last_accessed_at: new Date().toISOString()
    })
    .eq('id', enrollmentId)
    .eq('user_id', session.userId)

  if (updateError) {
    console.error("[completeSectionAction] DB update failed:", JSON.stringify(updateError))
    return { error: "Failed to save progress" }
  }

  console.log(`[completeSectionAction] ✅ Saved: enrollment=${enrollmentId} section=${sectionId} progress=${newProgress}%`)

  revalidatePath(`/mis-cursos/${enrollmentId}`)
  revalidatePath('/mis-cursos')
  revalidatePath('/perfil')

  return { success: true, completed: newCompleted, progress: newProgress }
}
