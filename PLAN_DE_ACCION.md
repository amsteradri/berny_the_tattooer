# Plan de Acción: Berny the Tattooer - Tattoo Academy

Este documento detalla la hoja de ruta para construir la plataforma de venta de cursos de tatuaje para Berny. El objetivo es una web moderna, ultra-optimizada (Core Web Vitals), totalmente responsive y con un diseño de alto impacto.

## 1. Stack Tecnológico Seleccionado

*   **Core:** Next.js 14 (App Router)
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS
*   **UI Kit:** Shadcn/ui (basado en Radix Primitives)
*   **Iconos:** Lucide React
*   **Animaciones:** Framer Motion
*   **Fuentes:** `Inter` o `Manrope` (Google Fonts optimizadas por Next.js)

## 2. Estructura del Proyecto

```text
/
├── app/
│   ├── layout.tsx       # Layout principal (Navbar, Footer, SEO)
│   ├── page.tsx         # Landing Page (Hero, Cursos, About)
│   └── courses/         # (Futuro) Páginas individuales de cursos
├── components/
│   ├── ui/              # Componentes de Shadcn (Botones, Cards, etc.)
│   ├── sections/        # Secciones completas de la landing
│   │   ├── hero.tsx
│   │   ├── courses-grid.tsx
│   │   ├── about-berny.tsx
│   │   └── footer.tsx
│   └── navigation.tsx   # Barra de navegación responsive
├── lib/
│   └── utils.ts         # Utilidades de clases (clsx, tw-merge)
└── public/              # Imágenes y assets estáticos
```

## 3. Fases de Desarrollo

### Fase 1: Configuración Inicial (Setup)
- [ ] Inicializar proyecto Next.js con TypeScript, Tailwind y ESLint.
- [ ] Limpiar archivos base y boilerplate.
- [ ] Instalar `Shadcn/ui` y configurar componentes base (Button, Card, Sheet, etc.).
- [ ] Instalar `Framer Motion` y `Lucide React`.

### Fase 2: Diseño y Layout Base
- [ ] Crear **Navbar**: Responsive, con menú hamburguesa para móvil, sticky al hacer scroll.
- [ ] Crear **Footer**: Enlaces legales, redes sociales y contacto rápido.
- [ ] Definir paleta de colores (tema oscuro premium) y tipografías en `tailwind.config.ts`.

### Fase 3: Landing Page - Secciones Principales
1.  **Hero Section (Impacto visual):**
    *   Titulo grande (H1) con propuesta de valor única.
    *   Subtítulo persuasivo.
    *   CTA (Call to Action) claro: "Ver Cursos".
    *   Imagen de fondo o vídeo de Berny tatuando (optimizado).
2.  **Sección de Cursos (Grid):**
    *   Diseño de `Card` para cada curso.
    *   Mostrar: Título, Nivel (Iniciación/Avanzado), Precio y botón "Más info".
    *   Inspiración en *Producción Electrónica* para la estructura limpia.
3.  **Sección "Sobre Berny" (Autoridad):**
    *   Layout asimétrico (Texto + Foto).
    *   Subsecciones: "¿Quién soy?", "Mi Experiencia", "Metodología".
    *   Inspiración en *Tattoox* para el estilo visual.
4.  **FAQ / CTA Final**: Responder dudas rápidas y último empujón a la compra.

### Fase 4: Optimización y Pulido
- [ ] Implementar animaciones de entrada (fade-in al hacer scroll) con Framer Motion.
- [ ] Optimizar imágenes con el componente `<Image>` de Next.js.
- [ ] Verificar responsive en Mobile, Tablet y Desktop.
- [ ] Mejorar SEO (Metadata, Open Graph tags).

## 4. Referencias de Diseño (Inspiración)

*   **Estructura de Cursos:** *produccionelectronica.com* (Grid limpia, información clara).
*   **Vibe / Estilo:** *tattoox.es* (Estética moderna, uso de tipografía grande, contrastes).

---
**Notas:** Aunque los colores de referencia no gustan, usaremos una paleta neutra (Negro, Gris Antracita, Blanco Hueso) con un color de acento vibrante (ej. Dorado, Rojo Neón o Azul Eléctrico) para los botones de compra.
