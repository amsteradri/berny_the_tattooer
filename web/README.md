# Berny The Tattooer - Art Worx Academy Platform

Plataforma web educativa y portfolio para **Berny**, tatuador profesional. Combina un portfolio visual de alto impacto con un sistema completo de cursos online (LMS) con autenticación propia, base de datos y seguimiento de progreso.

> ⚠️ **Proyecto en desarrollo activo (~30% completado).** La base técnica, autenticación y esqueleto del LMS están funcionales. Quedan pendientes pagos, contenido real, vídeos, chat, calendario, panel de admin, entregables y mucho más.

## Stack Tecnológico

- **Next.js 16 (App Router)** — Framework React con Server Components y Server Actions
- **TypeScript** — Código tipado y robusto
- **Tailwind CSS v4 + Shadcn UI** — Diseño responsive y componentes reutilizables
- **Supabase (PostgreSQL + Storage)** — BD: usuarios, cursos, inscripciones, progreso. Storage: bucket privado `course-videos` para vídeos protegidos
- **JWT personalizado (`jose`)** — Autenticación propia con cookies HTTP-only (sin Supabase Auth)
- **bcrypt** — Hash seguro de contraseñas
- **GSAP + Framer Motion** — Animaciones premium (Parallax, ScrollVelocity, SplitText, BlurText)

---

## Funcionalidades Implementadas

### 🎨 Landing Page / Portfolio
- Hero con animaciones de entrada
- Marquesina infinita reactiva al scroll (ScrollVelocity)
- Galería Parallax estilo Tattoox con columnas flotantes
- Sección "Sobre Berny" con contadores animados
- Grid de cursos con cards, badges y precios
- Footer corporativo
- Newsletter (UI)

### 🔐 Autenticación
- Registro de usuario (`/registro`) con hash bcrypt
- Login (`/login`) con sesión JWT en cookie HTTP-only
- Logout con Server Action
- Rutas protegidas server-side (redirect si no hay sesión)

### 👤 Perfil de Usuario (`/perfil`)
- Datos del usuario (nombre, email, fecha de registro)
- Contador de cursos inscritos (dato real de la BD)
- Acceso rápido a "Mis Cursos"

### 📚 Catálogo de Cursos (`/cursos/[slug]`)
- Página detallada por curso: descripción, nivel, duración, materiales, técnicas
- Botón de inscripción gratuita si no está inscrito
- Redirección a "Mis Cursos" si ya está inscrito

### 🎓 Mis Cursos (`/mis-cursos`)
- Lista de cursos inscritos con progreso real desde BD
- Botón "Comenzar" o "Continuar" según el progreso

### 📖 Visor de Curso (`/mis-cursos/[enrollmentId]`)
- Acordeón de secciones con desbloqueo secuencial
- Contenido rico por sección: encabezados, párrafos, listas, tips (💡) y advertencias (⚠️) — 19 secciones totales
- Botón "Marcar como Completado" con estado de carga
- **Persistencia real en BD**: el progreso se guarda en `user_courses.completed_sections[]` y `progress`
- **Validación server-side**: no se puede completar una sección si la anterior no está marcada en la BD (anti-trampa)
- Barra de progreso en tiempo real (actualización optimista confirmada por servidor)
- Las secciones completadas siguen accesibles para revisión

### 🎬 Sistema de Vídeo Protegido
- **`SecureVideoPlayer`** (producción): vídeos en Supabase Storage (bucket privado `course-videos`)
  - URL firmada generada server-side con caducidad de **1 hora** — compartirla es inútil
  - Reproduce con `<video>` nativo: sin botón de descarga, sin clic derecho, sin Picture-in-Picture
  - Validación de inscripción en servidor antes de generar la URL
- **`YouTubeEmbed`** (testing): embed temporal con banner de aviso visible
- Switching automático: `videoPath` → player seguro | `videoId` → YouTube

---

## Base de Datos (Supabase)

### Tablas
| Tabla | Descripción |
|-------|-------------|
| `users` | Usuarios registrados (id, nombre, email, password_hash) |
| `courses` | Catálogo de cursos (slug, título, nivel, precio, imagen...) |
| `user_courses` | Inscripciones: `user_id`, `course_id`, `progress`, `completed_sections TEXT[]`, `status`, `enrolled_at` |

### Storage
| Bucket | Acceso | Descripción |
|--------|--------|-------------|
| `course-videos` | **Privado** | Vídeos de los cursos — acceso sólo mediante URLs firmadas (1h) |

Estructura de ficheros en el bucket:
```
course-videos/
├── iniciacion/   (seccion-1.mp4, seccion-2.mp4, ...)
├── sombreado/    (seccion-1.mp4, ...)
└── realismo/     (seccion-1.mp4, ...)
```

### Setup inicial
Ejecutar `supabase_courses.sql` en el SQL Editor de Supabase para crear las tablas e insertar los 3 cursos iniciales.

Si la tabla `user_courses` ya existía antes de añadir `completed_sections`, ejecutar `supabase_migration.sql`.

---

## Instalación y Desarrollo

```bash
# 1. Ir al directorio web
cd web

# 2. Instalar dependencias
npm install

# 3. Crear variables de entorno
cp .env.example .env.local
# Rellenar NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY y JWT_SECRET

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Estado del Proyecto

**Progreso actual: ~30%** — Consultar `ESTADO_Y_PRECIO_WEB.md` en la raíz del proyecto para el desglose detallado del progreso y valoración económica (presupuesto total: **~3.500€**).

### Pendiente (resumen)
- Pasarela de pagos (Stripe)
- Contenido y vídeos reales de los cursos
- Mejora general de UX/UI
- Chat en tiempo real con Berny
- Reservas de reuniones (Google Calendar / Calendly)
- Panel de administración completo
- Corrección de proyectos entregables por admin
- Exámenes, certificados, SEO, Analytics, seguridad avanzada
