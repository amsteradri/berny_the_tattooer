import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ART WORX ACADEMY | Cursos de Tatuaje Profesional",
  description: "Aprende el arte del tatuaje con Berny en ART WORX ACADEMY. Cursos online y presenciales para todos los niveles.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  // Si hay sesión, obtenemos el rol para controlar el link de admin en la navbar
  let userRole: string | null = null
  if (session?.userId) {
    const { data } = await db
      .from('users')
      .select('role')
      .eq('id', session.userId)
      .single()
    userRole = data?.role || null
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground flex flex-col",
        inter.variable
      )}>
        <MainNav user={session ? { ...session, role: userRole } : null} />
        <main className="flex-1 pt-24">
           {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
