"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string; // Permitir personalización de clases
}

export default function TextReveal({ children, className }: TextRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // Ajuste fino para la activación
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]); // Desvanecer al entrar
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]); // Mover hacia arriba

  // Dividir el texto en palabras para un efecto más granular si se desea,
  // pero por simplicidad usaremos un bloque global con este transform.
  // Para un efecto "tattoox", a veces usan opacidad por palabra.

  return (
    <motion.div
      ref={targetRef}
      style={{ opacity, y }}
      className={`relative ${className}`}
    >
      <span className="text-white mix-blend-difference">{children}</span>
    </motion.div>
  );
}
