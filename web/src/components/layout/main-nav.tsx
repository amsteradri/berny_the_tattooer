"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Cursos", href: "#cursos" },
    { name: "Sobre Mí", href: "#sobre-mi" },
    { name: "Preguntas", href: "#faq" },
  ]

  return (
    <>
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
          scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-2 shadow-lg" : "bg-transparent py-4"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8 relative h-16">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center z-50">
            <span className="font-extrabold text-2xl tracking-tighter text-white uppercase italic">
              Berny<span className="text-primary-foreground/80">.</span>
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center">
            <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group bg-transparent border-0 cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            </nav>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
             <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 font-medium">Inicia Sesión</Button>
             <Button className="bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105 font-bold rounded-full px-6">
                Empezar Ahora
             </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2 ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col items-center gap-8"
          >
             {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white hover:text-zinc-300"
              >
                {link.name}
              </Link>
            ))}
             <div className="flex flex-col w-full gap-4 mt-8">
                 <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-zinc-800" onClick={() => setIsOpen(false)}>
                    Inicia Sesión
                 </Button>
                 <Button className="w-full bg-white text-black hover:bg-zinc-200" onClick={() => setIsOpen(false)}>
                    Empezar Ahora
                 </Button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

