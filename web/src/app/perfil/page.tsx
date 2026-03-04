import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { logout } from "@/app/actions/auth"
import { User, Mail, Smartphone, Calendar, Shield, LogOut, Settings, CircleUser, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function ProfilePage() {
  const session = await getSession()
  
  if (!session?.userId) {
    redirect('/login')
  }

  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('id', session.userId)
    .single()

  if (error || !user) {
    return (
        <form action={logout}>
            <Button>Error loading profile. Logout</Button>
        </form>
    )
  }

  const { count: enrolledCount } = await db
    .from('user_courses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session.userId);

  const joinDate = new Date(user.created_at).toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full bg-gradient-to-r from-zinc-900 to-zinc-800 relative overflow-hidden rounded-b-3xl shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-8">
            <div className="flex flex-col md:flex-row items-end md:items-center gap-6 group">
                <div className="relative">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-zinc-950 shadow-2xl">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                        <AvatarFallback className="bg-zinc-800 text-2xl font-bold">{user.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-zinc-950" title="Online"></div>
                </div>
                <div className="mb-2 md:mb-4 space-y-1">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">{user.full_name}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-zinc-400">
                        <span className="flex items-center text-sm md:text-base"><MapPin className="w-4 h-4 mr-1 text-zinc-500" /> España</span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center text-sm md:text-base"><Calendar className="w-4 h-4 mr-1 text-zinc-500" /> Miembro desde {joinDate}</span>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-3 mb-4 md:mb-8 w-full md:w-auto">
                 <Button variant="outline" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 backdrop-blur-sm flex-1 md:flex-none">
                    <Settings className="w-4 h-4 mr-2" />
                    Configuración
                 </Button>
                 <form action={logout}>
                    <Button variant="destructive" className="bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/30 flex-1 md:flex-none">
                        <LogOut className="w-4 h-4 mr-2" />
                        Salir
                    </Button>
                 </form>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats & Info */}
            <div className="space-y-6">
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center text-zinc-200">
                        <Shield className="w-5 h-5 mr-2 text-primary" />
                        Detalles de la Cuenta
                    </h3>
                    <div className="space-y-4">
                        <div className="group flex items-center justify-between p-3 hover:bg-zinc-800/50 rounded-lg transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200">
                                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Email</p>
                                    <span className="text-sm">{user.email}</span>
                                </div>
                            </div>
                        </div>
                        <Separator className="bg-zinc-800/50" />
                        <div className="group flex items-center justify-between p-3 hover:bg-zinc-800/50 rounded-lg transition-colors cursor-pointer">
                             <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200">
                                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                                    <Smartphone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Teléfono</p>
                                    <span className="text-sm">{user.phone || 'Sin añadir'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Pending Actions */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <CircleUser className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">¡Hola, {user.full_name.split(' ')[0]}!</h2>
                    <p className="text-zinc-400 max-w-md mb-8">
                        Estás en tu panel de control personal. Aquí podrás ver tu progreso, acceder a tus certificados y gestionar tus cursos.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                        <Link href="/#cursos" className="w-full">
                            <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-bold">
                                Explorar Catálogo
                            </Button>
                        </Link>
                        <Link href="/mis-cursos" className="w-full">
                            <Button variant="outline" className="w-full h-12 border-zinc-500 bg-transparent text-white hover:bg-zinc-800 hover:text-white hover:border-zinc-400">
                                Ir a Mis Cursos
                            </Button>
                        </Link>
                    </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Cursos Totales", value: enrolledCount?.toString() || "0" },
                        { label: "Horas de Estudio", value: "0" },
                        { label: "Certificados", value: "0" },
                        { label: "Proyectos", value: "0" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 text-center hover:bg-zinc-900/50 transition-colors">
                            <p className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</p>
                            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
      </div>
    </div>
  )
}
