"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";
import { useRef } from "react";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string; // Permitir personalización de clases
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-45, -20, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden tracking-tighter leading-[0.8] m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className={`font-semibold uppercase text-6xl md:text-9xl whitespace-nowrap flex flex-nowrap ${className}`} style={{ x }}>
        <span className="block mr-12 md:mr-24">{children} </span>
        <span className="block mr-12 md:mr-24">{children} </span>
        <span className="block mr-12 md:mr-24">{children} </span>
        <span className="block mr-12 md:mr-24">{children} </span>
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity() {
  return (
    <section className="py-12 bg-black dark:bg-black border-y border-zinc-900 dark:border-zinc-800 relative z-20">
      <ParallaxText baseVelocity={-2} className="text-zinc-500 dark:text-zinc-600 opacity-80">ART WORX ACADEMY • </ParallaxText>
      <ParallaxText baseVelocity={2} className="text-white dark:text-white mt-4 font-black">TATTOO MASTERY • </ParallaxText>
    </section>
  );
}
