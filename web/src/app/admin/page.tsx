import { db } from "@/lib/db"
import { getSession } from "@/lib/session"
import { BookOpen, Users, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const session = await getSession()

  const [{ count: totalCourses }, { count: publishedCourses }, { count: totalUsers }, { count: totalEnrollments }] =
    await Promise.all([
      db.from('courses').select('id', { count: 'exact', head: true }),
      db.from('courses').select('id', { count: 'exact', head: true }).eq('is_published', true),
      db.from('users').select('id', { count: 'exact', head: true }),
      db.from('user_courses').select('id', { count: 'exact', head: true }),
    ])

  const stats = [
    { label: 'Cursos totales', value: totalCourses ?? 0, icon: BookOpen, color: 'text-blue-400' },
    { label: 'Cursos publicados', value: publishedCourses ?? 0, icon: Eye, color: 'text-green-400' },
    { label: 'Usuarios registrados', value: totalUsers ?? 0, icon: Users, color: 'text-purple-400' },
    { label: 'Inscripciones', value: totalEnrollments ?? 0, icon: TrendingUp, color: 'text-yellow-400' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Bienvenido al panel de administración</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-400">{label}</span>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-4xl font-black">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/admin/cursos/nuevo">+ Crear curso nuevo</Link>
          </Button>
          <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Link href="/admin/cursos">Ver todos los cursos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
