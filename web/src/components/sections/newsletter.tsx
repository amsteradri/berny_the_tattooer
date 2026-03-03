"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function Newsletter() {
  return (
    <section id="newsletter" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Mantente Actualizado
            </h2>
            <p className="text-zinc-400 text-lg">
              Únete a la comunidad de ART WORX ACADEMY. Recibe consejos, noticias sobre nuevos cursos y contenido exclusivo directamente en tu bandeja de entrada.
            </p>
          </motion.div>

          <motion.form 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <Input 
              type="email" 
              placeholder="tu@email.com" 
              className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-500 h-12 rounded-full focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="rounded-full bg-white text-black hover:bg-zinc-200 font-bold h-12 px-8"
            >
              Suscribirse
            </Button>
          </motion.form>
          
          <motion.p 
            className="text-xs text-zinc-600 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Respetamos tu privacidad. Date de baja en cualquier momento.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
