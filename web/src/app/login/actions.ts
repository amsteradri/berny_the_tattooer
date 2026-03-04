'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { createSession } from '@/lib/session'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Buscar usuario
  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    // Si no existe, error genérico
    redirect('/?error=InvalidCredentials')
  }

  // 2. Verificar contraseña
  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (!passwordsMatch) {
    redirect('/?error=InvalidCredentials')
  }

  // 3. Crear sesión
  await createSession(user.id)

  revalidatePath('/', 'layout')
  redirect('/')
}
