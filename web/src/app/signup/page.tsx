// src/app/signup/page.tsx
import { signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Volver al Inicio
      </Link>
      
      <div className="w-full max-w-md space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">CREA TU CUENTA</h1>
          <p className="text-zinc-400">Únete a Art Worx Academy</p>
        </div>

        <form action={signup} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-zinc-300">Nombre Completo</Label>
            <Input 
              id="full_name" 
              name="full_name" 
              type="text" 
              placeholder="Berny Tattoo" 
              required 
              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
            />
          </div>

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
            <Label htmlFor="phone" className="text-zinc-300">Número de Teléfono</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder="+34 600 000 000" 
              required 
              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">Contraseña</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
            />
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-12 text-lg">
            Registrarse
          </Button>
        </form>

        <div className="text-center text-sm text-zinc-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-white hover:underline underline-offset-4">
            Inicia Sesión aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
