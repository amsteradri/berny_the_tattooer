import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, BookOpen, LogOut, ChevronRight } from "lucide-react"
import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Verificar sesión y rol admin
  const session = await getSession()
  if (!session?.userId) redirect('/login')

  const { data: user } = await db
    .from('users')
    .select('role, full_name, email')
    .eq('id', session.userId)
    .single()

  if (user?.role !== 'admin') redirect('/')

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/cursos', label: 'Cursos', icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Panel Admin</p>
          <p className="font-bold text-white truncate">{user.full_name || user.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors group"
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">{label}</span>
              <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:text-white text-xs transition-colors"
          >
            ← Volver al sitio
          </Link>
          <form action={logout}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-zinc-500 hover:text-red-400 hover:bg-red-950/20 gap-3"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
