import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SectionForm } from "../../section-form"

interface Props {
  params: Promise<{ id: string; sectionId: string }>
}

export default async function EditarSeccionPage({ params }: Props) {
  const { id, sectionId } = await params

  const [{ data: course }, { data: section }] = await Promise.all([
    db.from('courses').select('id, title').eq('id', id).single(),
    db.from('course_sections').select('*').eq('id', sectionId).eq('course_id', id).single(),
  ])

  if (!course || !section) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link
          href={`/admin/cursos/${id}/secciones`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a secciones
        </Link>
        <h1 className="text-3xl font-black tracking-tight">Editar sección</h1>
        <p className="text-zinc-400 mt-1 truncate">{section.title}</p>
      </div>

      <SectionForm courseId={id} section={section} />
    </div>
  )
}
