"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogOut, User as UserIcon, BookOpen } from "lucide-react"

interface MainNavProps {
  user?: any; // We can improve type later
}

export function MainNav({ user }: MainNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  
  const hasSession = !!user;

  console.log("MainNav Render - User Prop:", user);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
        window.removeEventListener("scroll", handleScroll);
    } 
  }, [])

  const navLinks = [
    { name: "Cursos", href: "/#cursos" },
    { name: "Sobre Nosotros", href: "/#sobre-mi" },
    { name: "Newsletter", href: "/#newsletter" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/') {
       e.preventDefault();
       const elementId = href.split('#')[1];
       if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
              const headerOffset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
       }
       setIsOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        setIsOpen(false);
    }
  };

  return (
    <>
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
          scrolled || isOpen ? "bg-zinc-950 backdrop-blur-md border-white/10 py-2 shadow-lg" : "bg-zinc-950 py-4 border-white/5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8 relative h-16 w-full max-w-[1400px]">
          
          {/* Logo Area - moved more to the left */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center z-50 mr-8 cursor-pointer">
            <span className="font-extrabold text-xl md:text-2xl tracking-tighter text-white uppercase italic">
              ART WORX ACADEMY<span className="text-primary-foreground/80">.</span>
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex items-center">
            <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            </nav>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
             {!hasSession ? (
               <>
                 <Link href="/login">
                   <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 font-medium">Inicia Sesión</Button>
                 </Link>
                 <Link href="/signup">
                   <Button className="bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105 font-bold rounded-full px-6">
                      Empezar Ahora
                   </Button>
                 </Link>
               </>
             ) : (
               <>
                   <Link href="/mis-cursos" passHref>
                     <Button 
                        variant="ghost" 
                        className="text-zinc-300 hover:text-white hover:bg-white/10 font-medium gap-2"
                     >
                       <BookOpen size={16} /> Mis Cursos
                     </Button>
                   </Link>
                   <Link href="/perfil" passHref>
                     <Button 
                        className="bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105 font-bold rounded-full px-6 gap-2"
                     >
                        <UserIcon size={16} /> Perfil
                     </Button>
                   </Link>
               </>
             )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-zinc-950 md:hidden flex flex-col pt-24 px-6 overflow-hidden"
          >
             <nav className="flex flex-col gap-6 items-center w-full mt-8">
               {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-3xl font-black text-white hover:text-zinc-400 transition-colors uppercase tracking-tight cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
             </nav>
             
             <div className="flex flex-col w-full gap-4 mt-12 max-w-xs mx-auto">
                 {!hasSession ? (
                   <>
                     <Link href="/login" onClick={() => setIsOpen(false)} passHref>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full border-zinc-700 text-white bg-transparent hover:bg-zinc-800 text-lg py-6"
                        >
                            Inicia Sesión
                        </Button>
                     </Link>
                     <Link href="/signup" onClick={() => setIsOpen(false)} passHref>
                        <Button 
                            size="lg" 
                            className="w-full bg-white text-black hover:bg-zinc-200 text-lg py-6 font-bold"
                        >
                            Empezar Ahora
                        </Button>
                     </Link>
                   </>
                 ) : (
                   <>
                     <Link href="/mis-cursos" onClick={() => setIsOpen(false)} passHref>
                       <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full border-zinc-700 text-white bg-transparent hover:bg-zinc-800 text-lg py-6 gap-3"
                        >
                          <BookOpen size={20} /> Mis Cursos
                       </Button>
                     </Link>
                     <Link href="/perfil" onClick={() => setIsOpen(false)} passHref>
                       <Button 
                            size="lg" 
                            className="w-full bg-white text-black hover:bg-zinc-200 text-lg py-6 font-bold gap-3"
                        >
                          <UserIcon size={20} /> Mi Perfil
                       </Button>
                     </Link>
                   </>
                 )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

