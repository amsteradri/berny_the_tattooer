import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import { courses } from "@/lib/courses-data"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import SectionAccordion from "@/components/courses/section-accordion"

interface PageProps {
  params: Promise<{ enrollmentId: string }>
}

export default async function CourseContentPage({ params }: PageProps) {
  const { enrollmentId } = await params
  const session = await getSession()

  if (!session?.userId) redirect('/login')

  // Get enrollment with course data
  const { data: enrollment, error } = await db
    .from('user_courses')
    .select('*, course:courses(*)')
    .eq('id', enrollmentId)
    .eq('user_id', session.userId)
    .single()

  if (error || !enrollment) notFound()

  const courseData = enrollment.course
  const localCourse = courses.find(c => c.slug === courseData.slug)

  if (!localCourse) notFound()

  const completedSections: string[] = enrollment.completed_sections || []

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Course Header */}
      <div className="relative w-full h-36 md:h-44 overflow-hidden pt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={courseData.image}
          alt={courseData.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="relative h-full flex flex-col justify-end container mx-auto px-4 md:px-8 pb-4">
          <Link href="/mis-cursos" className="inline-flex items-center text-zinc-400 hover:text-white mb-2 transition-colors text-sm w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Mis Cursos
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-xs font-bold px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 uppercase tracking-wider">
              {courseData.level}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> {localCourse.sections.length} apartados
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">{courseData.title}</h1>
        </div>
      </div>

      {/* Accordion with progress — client component for instant feedback */}
      <SectionAccordion
        sections={localCourse.sections}
        completedSections={completedSections}
        enrollmentId={enrollmentId}
        courseSlug={courseData.slug}
      />
    </div>
  )
}
