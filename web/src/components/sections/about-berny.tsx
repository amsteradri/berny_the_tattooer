"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AboutBerny() {
    return (
        <section id="sobre-mi" className="py-24 bg-white dark:bg-black overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 order-2 lg:order-1">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">MÁS QUE TINTA, <br/>UNA FORMA DE VIDA.</h2>
                        <p className="text-zinc-500 text-lg leading-relaxed dark:text-zinc-400">
                            Soy <span className="font-bold text-black dark:text-white">Berny</span>, tatuador profesional con más de 10 años de experiencia en el sector. Mi pasión es transformar ideas en arte sobre la piel y ahora, compartir ese conocimiento contigo.
                        </p>
                        <p className="text-zinc-500 text-lg leading-relaxed dark:text-zinc-400">
                            He desarrollado una metodología propia que simplifica los procesos más complejos, permitiéndote avanzar más rápido y con una base sólida.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 py-4">
                             <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                 <h4 className="font-bold text-2xl mb-1">+10 Años</h4>
                                 <p className="text-sm text-zinc-500">Experiencia</p>
                             </div>
                             <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                 <h4 className="font-bold text-2xl mb-1">+500</h4>
                                 <p className="text-sm text-zinc-500">Alumnos</p>
                             </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                             <Button size="lg" variant="default" className="w-full sm:w-auto">Conoce mi historia</Button>
                        </div>
                    </div>
                    
                    <div className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden order-1 lg:order-2 shadow-2xl">
                        <Image 
                            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop" 
                            alt="Berny tatuando" 
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="font-medium">Berny @ Studio</p>
                            <p className="text-sm opacity-80">Madrid, España</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

