import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, PlayCircle } from "lucide-react"

export default async function MyCoursesPage() {
  const session = await getSession()
  
  // Esto ya lo protege el middleware, pero doble seguridad no hace daño
  if (!session) {
    redirect('/login')
  }

  const { data: enrolledCourses } = await db
    .from('user_courses')
    .select(`
      *,
      course:courses (*)
    `)
    .eq('user_id', session.userId);

  const myCourses = enrolledCourses || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl pt-12">
        <div className="flex items-center gap-4 mb-16
        ">
            <div className="p-3 bg-zinc-900 rounded-full border border-zinc-800">
                <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Mis Cursos</h1>
        </div>

        {myCourses.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((enrollment: any) => {
                  const course = enrollment.course;
                  return (
                    <Link key={enrollment.id} href={`/mis-cursos/${enrollment.id}`}>
                        <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden hover:border-zinc-700 transition-colors h-full flex flex-col">
                            <div className="aspect-video relative w-full bg-zinc-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={course.image} 
                                    alt={course.title} 
                                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold px-2 py-1 bg-zinc-800 rounded text-zinc-400 border border-zinc-700 uppercase tracking-wider">
                                        {course.level}
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        {enrollment.progress}% Completado
                                    </span>
                                </div>
                                <CardTitle className="text-xl line-clamp-1">{course.title}</CardTitle>
                                <CardDescription className="line-clamp-2 text-zinc-400">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto pt-0">
                                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-4">
                                    <div 
                                        className="bg-white h-full transition-all duration-1000" 
                                        style={{ width: `${enrollment.progress}%` }}
                                    ></div>
                                </div>
                                <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
                                    {enrollment.progress === 0 ? "Comenzar Curso" : "Continuar Curso"}
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                  )
              })}
           </div>
        ) : (
           <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
              <div className="w-20 h-20 bg-zinc-800/80 rounded-full flex items-center justify-center mb-6">
                  <PlayCircle className="w-10 h-10 text-zinc-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Aún no tienes cursos activos</h2>
              <p className="text-zinc-400 max-w-md mb-8">
                 Explora nuestro catálogo y empieza tu formación como tatuador profesional hoy mismo.
              </p>
              <Link href="/#cursos">
                <Button className="bg-white text-black hover:bg-zinc-200 font-bold px-8 py-6 rounded-full text-lg">
                    Ver Cursos Disponibles
                </Button>
              </Link>
           </div>
        )}
      </div>
    </div>
  )
}
