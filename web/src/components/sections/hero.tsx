"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SplitText from "@/components/react-bits/SplitText"
import BlurText from "@/components/react-bits/BlurText"
import ShinyText from "@/components/react-bits/ShinyText"

export function HeroSection() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center bg-zinc-950 text-white overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-black/60 z-[5]"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1608666599953-b951163495f4?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
               className="relative z-10 container mx-auto px-4 md:px-6 text-center space-y-8 flex flex-col items-center"
            >
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight drop-shadow-2xl flex flex-col items-center">
                  <SplitText 
                     text="DOMINA EL ARTE DEL" 
                     className="mb-2 !block" 
                     delay={50} 
                     animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }} 
                     animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }} 
                     easing="easeOutCubic" 
                     threshold={0.2} 
                     rootMargin="-50px" 
                  />
                  <div className="mt-2">
                    <ShinyText 
                        text="TATUAJE PROFESIONAL" 
                        disabled={false} 
                        speed={3} 
                        className="text-transparent bg-clip-text" 
                        color="#ffffff"
                        shineColor="#3f3f46" 
                    />
                  </div>
               </h1>
               
               <div className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl font-light tracking-wide">
                  <BlurText 
                     text="Aprende desde cero o perfecciona tu técnica con los cursos exclusivos de Berny. Teoría, práctica y secretos del oficio." 
                     delay={30} 
                     animateBy="words" 
                     direction="top" 
                     className="justify-center"
                  />
               </div>

               
               <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                   <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                       Ver Cursos Disponibles
                   </Button>
                   <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all">
                       Conoce a Berny <ArrowRight className="ml-2 w-5 h-5" />
                   </Button>
               </div>
            </motion.div>
        </section>
    )
}

