import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 md:px-6 border-t bg-zinc-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2 space-y-4">
                  <h3 className="font-bold text-xl uppercase tracking-widest">Berny The Tattooer</h3>
                  <p className="max-w-xs text-sm text-zinc-400">
                      Academia de tatuaje profesional. Aprende el arte con metodología probada y práctica real.
                  </p>
              </div>
              <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500">Enlaces</h4>
                  <ul className="space-y-2 text-sm">
                      <li><Link href="#cursos" className="hover:text-white transition-colors">Cursos</Link></li>
                      <li><Link href="#sobre-mi" className="hover:text-white transition-colors">Sobre mí</Link></li>
                      <li><Link href="#" className="hover:text-white transition-colors">Politica de Privacidad</Link></li>
                      <li><Link href="#" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                  </ul>
              </div>
              <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500">Sígueme</h4>
                  <ul className="space-y-2 text-sm">
                      <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
                      <li><Link href="#" className="hover:text-white transition-colors">YouTube</Link></li>
                      <li><Link href="#" className="hover:text-white transition-colors">TikTok</Link></li>
                  </ul>
              </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
              <p>© {new Date().getFullYear()} Berny The Tattooer. Todos los derechos reservados.</p>
              <p>Diseñado con pasión.</p>
          </div>
      </div>
    </footer>
  )
}
