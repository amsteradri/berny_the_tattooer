"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center bg-zinc-950 text-white overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-black/60 z-[5]"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1608666599953-b951163495f4?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="relative z-10 container mx-auto px-4 md:px-6 text-center space-y-8"
            >
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight drop-shadow-2xl">
                  DOMINA EL ARTE DEL <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">TATUAJE PROFESIONAL</span>
               </h1>
               
               <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl font-light tracking-wide">
                  Aprende desde cero o perfecciona tu técnica con los cursos exclusivos de Berny. Teoría, práctica y secretos del oficio.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
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
