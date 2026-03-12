import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseForm } from "../../course-form"
import { DeleteCourseButton } from "./delete-course-button"

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ created?: string }>
}

export default async function EditarCursoPage({ params, searchParams }: Props) {
  const { id } = await params
  const { created } = await searchParams

  const { data: course } = await db
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()

  if (!course) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Editar curso</h1>
        <p className="text-zinc-400 mt-1 truncate">{course.title}</p>
      </div>

      {created && (
        <div className="mb-6 bg-green-950/40 border border-green-800 rounded-xl px-5 py-4 text-green-300 text-sm">
          ✅ Curso creado correctamente. Ahora puedes editarlo y publicarlo cuando esté listo.
        </div>
      )}

      <CourseForm course={course} />

      {/* Secciones */}
      <div className="mt-10 pt-8 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="font-bold text-zinc-100">Contenido del curso</h2>
            <p className="text-zinc-500 text-sm">Gestiona las secciones (lecciones) de este curso.</p>
          </div>
          <Link href={`/admin/cursos/${id}/secciones`}>
            <Button variant="outline" size="sm">
              <LayoutList className="w-4 h-4 mr-2" />
              Gestionar secciones
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-zinc-800">
        <h2 className="font-bold text-red-400 mb-2">Zona de peligro</h2>
        <p className="text-zinc-500 text-sm mb-4">
          Solo puedes eliminar un curso si no tiene alumnos inscritos.
        </p>
        <DeleteCourseButton id={id} />
      </div>
    </div>
  )
}
