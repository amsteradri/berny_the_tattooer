import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Berny The Tattooer Academy | Cursos de Tatuaje Profesional",
  description: "Aprende el arte del tatuaje con Berny. Cursos online y presenciales para todos los niveles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground flex flex-col",
        inter.variable
      )}>
        <MainNav />
        <main className="flex-1">
           {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
