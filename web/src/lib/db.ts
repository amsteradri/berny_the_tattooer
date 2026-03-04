import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Usa la clave secreta para operaciones administrativas

if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co') {
  console.error('⚠️ ALERTA: La URL de Supabase no está configurada correctamente en .env.local')
}

// Cliente con permisos elevados para crear usuarios y gestionar la DB directamente
export const db = createClient(supabaseUrl, supabaseKey)
