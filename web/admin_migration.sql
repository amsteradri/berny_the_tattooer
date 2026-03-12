-- ============================================================
-- MIGRACIÓN: Panel de Admin + Cursos dinámicos
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- 1. Añadir columna 'role' a la tabla users (si no existe)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
    CHECK (role IN ('user', 'admin'));

-- 2. Para hacer admin a Berny, ejecuta (cambia el email por el suyo):
-- UPDATE users SET role = 'admin' WHERE email = 'berny@ejemplo.com';

-- 3. Añadir columnas nuevas a la tabla courses (si no existen)
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS price_cents       INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published      BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS long_description  TEXT,
  ADD COLUMN IF NOT EXISTS duration_text     TEXT,
  ADD COLUMN IF NOT EXISTS level             TEXT,
  ADD COLUMN IF NOT EXISTS tags              TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS techniques        TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS material          TEXT[] DEFAULT '{}';

-- 4. Sincronizar precios de los cursos hardcodeados existentes en DB
UPDATE courses SET price_cents = 19700, is_published = TRUE WHERE slug = 'iniciacion-al-tatuaje';

-- 5. Índices
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses (is_published);
CREATE INDEX IF NOT EXISTS idx_users_role        ON users (role);

-- ============================================================
-- BUCKET para imágenes de cursos (ejecutar también)
-- ============================================================

-- 6. Crear bucket público para imágenes de cursos
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-images', 'course-images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Política: cualquiera puede ver las imágenes (son públicas)
CREATE POLICY "Imágenes de cursos públicas"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'course-images');

-- 8. Política: solo admins pueden subir/borrar imágenes
--    (se comprueba contra nuestra tabla users personalizada)
CREATE POLICY "Solo admins suben imágenes de cursos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'course-images'
  );

CREATE POLICY "Solo admins borran imágenes de cursos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'course-images'
  );

-- ============================================================
-- SECCIONES DE CURSOS
-- ============================================================

-- 9. Tabla de secciones dinámicas
CREATE TABLE IF NOT EXISTS course_sections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  video_path    TEXT,         -- Path en Supabase Storage bucket "course-videos"
  duration_text TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  content       JSONB DEFAULT '[]',   -- Array de SectionContentBlock
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_sections_course_id ON course_sections (course_id, sort_order);

-- 10. Bucket para vídeos de secciones (si no existe ya)
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-videos', 'course-videos', false)
ON CONFLICT (id) DO NOTHING;
