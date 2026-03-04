'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { createSession } from '@/lib/session'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const phone = formData.get('phone') as string

  // 1. Verificar si el usuario ya existe
  const { data: existingUser } = await db
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    // Si queremos ser amables, redirigimos mostrando un error
    // En produccion querrás mostrar un mensaje tipo "Usuario ya existe"
    redirect('/?error=UserAlreadyExists') 
  }

  // 2. Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Crear el usuario en la base de datos (TABLA 'users' PERSONALIZADA, NO AUTH DE SUPABASE)
  const { data: newUser, error } = await db
    .from('users')
    .insert({
      email,
      password: hashedPassword,
      full_name: fullName,
      phone
    })
    .select()
    .single()

  if (error) {
    console.error('Error creando usuario:', error)
    redirect('/?error=CreateUserFailed')
  }

  // 4. No creamos sesión, solo redirigimos a login
  // await createSession(newUser.id)

  redirect('/login?success=AccountCreated')
}
