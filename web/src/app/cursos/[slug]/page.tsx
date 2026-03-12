// src/app/cursos/[slug]/page.tsx
import { courses as hardcodedCourses } from "@/lib/courses-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Clock, ShoppingCart, BookOpen, PenTool } from "lucide-react";
import Link from "next/link";
import { enrollCourse } from "@/app/actions/courses";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { EnrollButton } from "@/components/courses/enroll-button";
import { BuyButton } from "@/components/courses/buy-button";

// Permite rutas generadas dinámicamente por el admin además de las estáticas
export const dynamicParams = true

export async function generateStaticParams() {
  return hardcodedCourses.map((course) => ({
    slug: course.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;

  // Buscar en DB primero (fuente de verdad para precio y disponibilidad)
  const { data: dbCourse } = await db
    .from('courses')
    .select('id, title, slug, description, long_description, image, level, price_cents, duration_text, tags, techniques, material, is_published')
    .eq('slug', slug)
    .single()

  // Si no está en DB o no está publicado, 404
  if (!dbCourse || !dbCourse.is_published) {
    notFound()
  }

  // Para el contenido rico (secciones, técnicas, etc.) usamos los datos hardcodeados si existen
  const hardcoded = hardcodedCourses.find((c) => c.slug === slug)

  // Unificamos datos: DB para precio/disponibilidad, hardcoded para contenido detallado
  const course = {
    ...dbCourse,
    title: hardcoded?.title || dbCourse.title,
    description: hardcoded?.description || dbCourse.description,
    longDescription: hardcoded?.longDescription || dbCourse.long_description || dbCourse.description,
    image: hardcoded?.image || dbCourse.image,
    level: hardcoded?.level || dbCourse.level || '',
    price: hardcoded?.price || `${Math.round((dbCourse.price_cents || 0) / 100)}€`,
    duration: hardcoded?.duration || dbCourse.duration_text || '',
    tags: (hardcoded?.tags?.length ? hardcoded.tags : dbCourse.tags) || [],
    techniques: (hardcoded?.techniques?.length ? hardcoded.techniques : dbCourse.techniques) || [],
    material: (hardcoded?.material?.length ? hardcoded.material : dbCourse.material) || [],
    sections: hardcoded?.sections || [],
  }

  const session = await getSession();
  let isEnrolled = false;
  let enrollmentId: string | null = null;
  
  if (session?.userId) {
    const { data: enrollment } = await db
      .from('user_courses')
      .select('id')
      .eq('user_id', session.userId)
      .eq('course_id', dbCourse.id)
      .single()

    if (enrollment) {
      isEnrolled = true
      enrollmentId = enrollment.id
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-end">
        <div className="absolute inset-0 z-0">
             <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover opacity-50"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 pb-12 md:pb-20">
            <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-white text-black hover:bg-zinc-200 text-base py-1 px-4">{course.level}</Badge>
                {course.tags.map((tag: string) => (
                   <Badge key={tag} variant="outline" className="text-zinc-300 border-zinc-700">{tag}</Badge>
                ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{course.title}</h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl">{course.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                  
                  {/* About the Course */}
                  <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                          <BookOpen className="mr-3 text-primary" />
                          Sobre este curso
                      </h2>
                      <p className="text-lg text-zinc-300 leading-relaxed">
                          {course.longDescription}
                      </p>
                  </section>

                  {/* What you'll learn */}
                  {course.techniques.length > 0 && (
                  <section>
                      <h2 className="text-2xl font-bold mb-6">¿Qué aprenderás?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.techniques.map((tech: string, index: number) => (
                              <div key={index} className="flex items-start bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                                  <CheckCircle className="text-green-500 mr-3 mt-1 h-5 w-5 shrink-0" />
                                  <span className="text-zinc-200">{tech}</span>
                              </div>
                          ))}
                      </div>
                  </section>
                  )}

                  {/* Material Needed */}
                  {course.material.length > 0 && (
                  <section>
                      <h2 className="text-2xl font-bold mb-6 flex items-center">
                           <PenTool className="mr-3 text-primary" />
                           Material Necesario
                      </h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.material.map((item: string, index: number) => (
                              <li key={index} className="flex items-center text-zinc-300">
                                  <span className="w-2 h-2 bg-zinc-500 rounded-full mr-3" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </section>
                  )}
              </div>

              {/* Sidebar / Sticky Card */}
              <div className="lg:col-span-1">
                  <div className="sticky top-24">
                      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden shadow-2xl shadow-black/50">
                          <CardHeader className="bg-zinc-800/50 pb-6 border-b border-zinc-700/50">
                              <CardTitle className="flex justify-between items-center text-3xl">
                                  {course.price}
                                  <Badge variant="secondary" className="text-sm bg-green-900/40 text-green-400 border-green-800">
                                      Plazas limitadas
                                  </Badge>
                              </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-6">
                              <div className="flex items-center text-zinc-300">
                                  <Clock className="mr-3 h-5 w-5 text-zinc-500" />
                                  <span className="font-medium">Duración:</span>
                                  <span className="ml-auto">{course.duration}</span>
                              </div>
                              <div className="space-y-3 pt-4">
                                  {isEnrolled ? (
                                    <Link href="/mis-cursos" className="w-full">
                                        <Button className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                                            Ir al Curso
                                        </Button>
                                    </Link>
                                  ) : (
                                    <BuyButton slug={course.slug} price={course.price} />
                                  )}
                                  <p className="text-xs text-center text-zinc-500">
                                      {isEnrolled ? "Ya tienes acceso a este curso." : "Acceso inmediato tras el pago. Pago seguro con Stripe."}
                                  </p>
                              </div>
                          </CardContent>
                      </Card>
                      
                      <div className="mt-6 bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-xl">
                          <h3 className="font-bold mb-2 text-zinc-200">¿Tienes dudas?</h3>
                          <p className="text-sm text-zinc-400 mb-4">
                              Si no estás seguro de si este nivel es para ti, contáctanos antes de inscribirte.
                          </p>
                          <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                              Contactar con Berny
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
