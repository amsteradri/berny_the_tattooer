import { HeroSection } from "@/components/sections/hero";
import { CoursesGrid, type CourseCardData } from "@/components/sections/courses-grid";
import { AboutBerny } from "@/components/sections/about-berny";
import { Newsletter } from "@/components/sections/newsletter";
import ScrollVelocity from "@/components/react-bits/ScrollVelocity";
import ParallaxGallery from "@/components/react-bits/ParallaxGallery";
import { db } from "@/lib/db";
import { courses as hardcodedCourses } from "@/lib/courses-data";

export default async function Home() {
  // Obtener cursos publicados de la BD y combinarlos con los hardcodeados
  const { data: dbCourses } = await db
    .from('courses')
    .select('id, slug, title, description, image, level, price_cents, tags, is_published')
    .eq('is_published', true)
    .order('created_at', { ascending: true })

  // Unificar: para cursos que existen en hardcoded data, usamos sus tags y precio formateado
  // Para cursos solo-DB (creados por admin), los construimos desde DB
  const coursesForGrid: CourseCardData[] = (dbCourses || []).map(dbCourse => {
    const hardcoded = hardcodedCourses.find(c => c.slug === dbCourse.slug)
    return {
      id: dbCourse.id,
      slug: dbCourse.slug,
      title: dbCourse.title,
      description: dbCourse.description,
      image: dbCourse.image || '',
      level: dbCourse.level || hardcoded?.level || '',
      price: hardcoded?.price || `${Math.round((dbCourse.price_cents || 0) / 100)}€`,
      tags: (dbCourse.tags?.length ? dbCourse.tags : hardcoded?.tags) || [],
    }
  })

  return (
    <div className="flex flex-col gap-0 w-full overflow-x-hidden">
      <HeroSection />
      <ScrollVelocity />
      <CoursesGrid courses={coursesForGrid} />
      <AboutBerny />
      <ParallaxGallery />
      <Newsletter />
    </div>
  );
}
