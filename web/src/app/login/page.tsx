import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Volver al Inicio
      </Link>
      
      <div className="w-full max-w-md space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">INICIA SESIÓN</h1>
          <p className="text-zinc-400">Accede a tus cursos y perfil</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Correo Electrónico</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="berny@example.com" 
              required 
              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-zinc-300">Contraseña</Label>
              <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-white transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
            />
          </div>

          <Button formAction={login} className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-12 text-lg">
            Entrar
          </Button>
        </form>

        <div className="text-center text-sm text-zinc-500">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="text-white hover:underline underline-offset-4">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
