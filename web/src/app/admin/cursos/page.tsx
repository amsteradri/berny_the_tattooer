import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Eye, EyeOff } from "lucide-react"
import { TogglePublishButton } from "./toggle-publish-button"

export default async function AdminCoursesPage() {
  const { data: courses } = await db
    .from('courses')
    .select('id, title, slug, level, price_cents, is_published, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Cursos</h1>
          <p className="text-zinc-400 mt-1">{courses?.length ?? 0} cursos en total</p>
        </div>
        <Button asChild className="bg-white text-black hover:bg-zinc-200">
          <Link href="/admin/cursos/nuevo">
            <Plus className="w-4 h-4 mr-2" />
            Crear curso
          </Link>
        </Button>
      </div>

      {!courses || courses.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-16 text-center">
          <p className="text-zinc-400 mb-4">No hay cursos todavía.</p>
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/admin/cursos/nuevo">Crear el primer curso</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4">Curso</th>
                <th className="text-left px-6 py-4 hidden md:table-cell">Nivel</th>
                <th className="text-left px-6 py-4">Precio</th>
                <th className="text-left px-6 py-4">Estado</th>
                <th className="text-right px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course: any) => (
                <tr key={course.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-white">{course.title}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{course.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                      {course.level || '—'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold">
                    {course.price_cents > 0
                      ? `${(course.price_cents / 100).toFixed(0)}€`
                      : '—'}
                  </td>
                  <td className="px-6 py-4">
                    {course.is_published ? (
                      <Badge className="bg-green-900/30 text-green-400 border border-green-800 text-xs">
                        Publicado
                      </Badge>
                    ) : (
                      <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700 text-xs">
                        Borrador
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <TogglePublishButton
                        id={course.id}
                        isPublished={course.is_published}
                      />
                      <Button asChild size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        <Link href={`/admin/cursos/${course.id}/editar`}>
                          <Pencil className="w-3 h-3 mr-1" />
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
