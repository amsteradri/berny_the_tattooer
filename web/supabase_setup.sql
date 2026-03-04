-- En Supabase > SQL Editor, ejecuta este comando:
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null,
  full_name text not null,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS solo si quieres proteger los datos, pero como usaremos Service Role Key desde el backend, tenemos acceso total
alter table users enable row level security;
