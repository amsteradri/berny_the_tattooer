-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT,
  price TEXT,
  duration TEXT,
  image TEXT,
  long_description TEXT,
  material TEXT[],
  techniques TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_courses table (enrollments)
CREATE TABLE IF NOT EXISTS user_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  progress INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, completed, archived
  completed_sections TEXT[] DEFAULT '{}',
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, course_id)
);

-- Insert initial data from courses-data.ts (Converted json to values)
INSERT INTO courses (slug, title, description, level, price, duration, image, long_description, material, techniques, tags)
VALUES
(
  'iniciacion-al-tatuaje',
  'Iniciación al Tatuaje',
  'Todo lo que necesitas saber antes de coger una máquina. Higiene, materiales y diseño básico.',
  'Principiante',
  '197€',
  '4 Semanas',
  'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop',
  'Este curso está diseñado para aquellos que nunca han tocado una máquina de tatuar o están en sus primeros pasos. Aprenderás desde cero los fundamentos del oficio, poniendo especial énfasis en la higiene y la seguridad, que son la base de un buen tatuador profesional. No solo te enseñaremos a tatuar, sino a pensar como un tatuador, a entender tu equipo y a preparar tu mesa de trabajo de manera estéril y profesional.',
  ARRAY['Máquina de bobinas básica o rotativa', 'Piel sintética de práctica', 'Agujas de línea (3RL, 5RL)', 'Tinta negra de práctica', 'Vaselina y depresores', 'Papel hectográfico'],
  ARRAY['Montaje y calibrado de máquina', 'Higiene y seguridad (Cross-contamination)', 'Técnica de línea limpia', 'Relleno sólido básico', 'Curación del tatuaje'],
  ARRAY['Teoría', 'Higiene', 'Línea']
),
(
  'tecnicas-de-sombreado',
  'Técnicas de Sombreado',
  'Domina el Black & Grey. Aprende a crear volúmenes, texturas y transiciones suaves.',
  'Intermedio',
  '247€',
  '6 Semanas',
  'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop',
  'Si ya dominas la línea, es hora de dar vida a tus diseños. El curso de técnicas de sombreado te introducirá en el mundo del Black & Grey. Aprenderás a construir volúmenes mediante el uso de diferentes diluciones de tinta negra. Nos centraremos en conseguir transiciones suaves, evitar el trauma excesivo en la piel y dominar las diferentes configuraciones de agujas planas y magnum para conseguir efectos de textura y profundidad.',
  ARRAY['Máquina rotativa o tipo Pen', 'Set de tintas (Greywash)', 'Diluyente (Mixing solution)', 'Agujas Magnum (7M, 9M) y RM', 'Piel sintética de alta calidad'],
  ARRAY['Black & Grey', 'Whip Shading (Puntillismo de arrastre)', 'Degradados suaves', 'Volumetría y luz', 'Uso correcto de diluyentes'],
  ARRAY['Black & Grey', 'Texturas', 'Sombreado']
),
(
  'realismo-avanzado',
  'Realismo Avanzado',
  'Lleva tu arte al siguiente nivel. Retratos, detalles hiperrealistas y composición compleja.',
  'Avanzado',
  '297€',
  '8 Semanas',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop',
  'El realismo es una de las disciplinas más exigentes del tatuaje. En este curso avanzado nos adentraremos en el retrato, el realismo en animales y las texturas complejo (pelo, agua, metal). Analizaremos la anatomía, la iluminación y cómo trasladar una fotografía a la piel con la mayor fidelidad posible. Es imprescindible tener un buen control del sombreado y la línea antes de acceder a este curso.',
  ARRAY['Máquina Pen de alta gama o rotativa específica', 'Set completo de tintas realismo (gama extendida)', 'Agujas de cartucho de precisión (3RL, 5RL, 7M, 9RM, 15RM)', 'Transfer de alta definición (stencil printer o thermocopier)', 'Piel sintética premium o modelo real (bajo supervisión)'],
  ARRAY['Mapeado de sombras (Mapping)', 'Texturas complejas (pelo, piel, ojos)', 'Retrato y expresión facial', 'Micro-realismo', 'Gestión del contraste y la saturación'],
  ARRAY['Realismo', 'Retrato', 'Avanzado']
);
