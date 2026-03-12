import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Pencil, GripVertical, Video, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteSectionButton } from "./delete-section-button"

interface Props {
  params: Promise<{ id: string }>
}

export default async function SeccionesPage({ params }: Props) {
  const { id } = await params

  const [{ data: course }, { data: sections }] = await Promise.all([
    db.from('courses').select('id, title').eq('id', id).single(),
    db.from('course_sections')
      .select('*')
      .eq('course_id', id)
      .order('sort_order', { ascending: true }),
  ])

  if (!course) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link
          href={`/admin/cursos/${id}/editar`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a editar curso
        </Link>
        <h1 className="text-3xl font-black tracking-tight">Secciones del curso</h1>
        <p className="text-zinc-400 mt-1 truncate">{course.title}</p>
      </div>

      <div className="mb-6">
        <Link href={`/admin/cursos/${id}/secciones/nueva`}>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nueva sección
          </Button>
        </Link>
      </div>

      {(!sections || sections.length === 0) ? (
        <div className="border border-dashed border-zinc-700 rounded-xl p-12 text-center">
          <Video className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 font-medium mb-1">No hay secciones todavía</p>
          <p className="text-zinc-600 text-sm">Crea la primera sección del curso.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4"
            >
              <div className="flex items-center gap-2 text-zinc-600 mt-0.5 shrink-0">
                <GripVertical className="w-4 h-4" />
                <span className="text-xs font-bold w-5 text-center">{index + 1}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{section.title}</p>
                {section.description && (
                  <p className="text-zinc-500 text-sm mt-0.5 line-clamp-2">{section.description}</p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  {section.duration_text && (
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" />
                      {section.duration_text}
                    </span>
                  )}
                  {section.video_path ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-500">
                      <Video className="w-3 h-3" />
                      Vídeo subido
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-600">
                      <Video className="w-3 h-3" />
                      Sin vídeo
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/cursos/${id}/secciones/${section.id}/editar`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <DeleteSectionButton sectionId={section.id} courseId={id} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-zinc-800 text-sm text-zinc-500">
        {sections?.length ?? 0} sección{(sections?.length ?? 0) !== 1 ? 'es' : ''} en total
      </div>
    </div>
  )
}
