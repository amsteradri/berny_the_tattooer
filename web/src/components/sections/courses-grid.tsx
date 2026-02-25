"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import SplitText from "@/components/react-bits/SplitText"
import BlurText from "@/components/react-bits/BlurText"

const courses = [

  {
    id: 1,
    title: "Iniciación al Tatuaje",
    level: "Principiante",
    description: "Todo lo que necesitas saber antes de coger una máquina. Higiene, materiales y diseño básico.",
    price: "197€",
    tags: ["Teoría", "Higiene", "Línea"],
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Técnicas de Sombreado",
    level: "Intermedio",
    description: "Domina el Black & Grey. Aprende a crear volúmenes, texturas y transiciones suaves.",
    price: "247€",
    tags: ["Black & Grey", "Texturas", "Sombreado"],
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Realismo Avanzado",
    level: "Avanzado",
    description: "Lleva tu arte al siguiente nivel. Retratos, detalles hiperrealistas y composición compleja.",
    price: "397€",
    tags: ["Realismo", "Retratos", "Avanzado"],
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop"
  }
]

export function CoursesGrid() {
  return (
    <section id="cursos" className="relative py-24 bg-zinc-50 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="text-3xl font-bold tracking-tighter sm:text-5xl overflow-hidden">
            <SplitText
              text="Gama de Cursos"
              className="inline-block"
              delay={30}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              threshold={0.1}
              rootMargin="-50px"
            />
          </div>
          <div className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-zinc-400">
            <BlurText
              text="Elige el nivel que mejor se adapte a ti. Desde los fundamentos hasta las técnicas más complejas."
              delay={20}
              animateBy="words"
              direction="bottom"
              className="inline-block"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="w-full md:w-[350px] group overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl dark:bg-zinc-950 flex flex-col p-0 gap-0">

              <div className="aspect-video relative overflow-hidden bg-zinc-200">
                 <Image 
                   src={course.image} 
                   alt={course.title}
                   fill
                   className="object-cover transition-transform duration-500 group-hover:scale-105"
                 />
                 <Badge className="absolute top-4 right-4 bg-black/80 hover:bg-black/80 text-white backdrop-blur-sm shadow-sm">
                    {course.level}
                 </Badge>
              </div>
              <CardHeader className="pt-6">
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                    <span className="font-mono font-bold text-lg text-primary">{course.price}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {course.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{tag}</Badge>
                    ))}
                </div>
              </CardHeader>
              <CardContent className="pt-4 px-6 flex-grow">
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pb-6 px-6 pt-4 mt-auto">
                <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200" size="lg">
                    Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
