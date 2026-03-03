"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import useDimension from "@/hooks/useDimension"; // Assuming this hook exists or I'll implement inline. I will implement inline for simplicity.
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1482328177731-274399da39f0?q=80&w=1200&auto=format&fit=crop", // 1. Fortune and Glory (Allef Vinicius)
  "https://images.unsplash.com/photo-1483992645819-22e6df766e84?q=80&w=1200&auto=format&fit=crop", // 2. Black Heart (Allef Vinicius)
  "https://images.unsplash.com/photo-1605647533135-51b5906087d0?q=80&w=1200&auto=format&fit=crop", // 3. Tattooed Arm Detail (Maxim Hopman)
  "https://images.unsplash.com/photo-1753259669126-660f46975072?q=80&w=1200&auto=format&fit=crop", // 4. Artist Inking Arm (Certified Tattoo Academy)
  "https://images.unsplash.com/photo-1761276297653-00549dc7263f?q=80&w=1200&auto=format&fit=crop", // 5. Hands Close Up (R.D. Smith)
  "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=1200&auto=format&fit=crop", // 6. Studio Large Piece (Allef Vinicius)
  "https://images.unsplash.com/photo-1482329033286-79a3d24413b4?q=80&w=1200&auto=format&fit=crop", // 7. B&W Artist Focused (Allef Vinicius)
  "https://images.unsplash.com/photo-1761276297688-bc67f27c2577?q=80&w=1200&auto=format&fit=crop", // 8. Preparing Machine (R.D. Smith)
  "https://images.unsplash.com/photo-1482375702222-03a768d5ea3c?q=80&w=1200&auto=format&fit=crop", // 9. Machine Close Up (Allef Vinicius)
  "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1200&auto=format&fit=crop", // 10. Artist Working (Fallback High Quality)
  "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1200&auto=format&fit=crop", // 11. Ink & Setup (Fallback High Quality)
  "https://images.unsplash.com/photo-1761276297688-bc67f27c2577?q=80&w=1200&auto=format&fit=crop", // 12. Detailed Sleeve (Fallback High Quality)
];

export default function ParallaxGallery() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only access window on client side
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    resize(); // Initial call
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, dimension.height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, dimension.height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, dimension.height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, dimension.height * 3]);

  return (
    <div className="bg-zinc-950 min-h-[150vh] overflow-hidden relative">
      <div 
        ref={container} 
        className="h-[175vh] flex gap-[2vw] p-[2vw] box-border relative -top-[45vh]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} className="hidden lg:flex" />
      </div>
      <div className="absolute inset-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none z-10 mix-blend-difference py-20">
         <h2 className="text-[12vw] font-black uppercase text-white tracking-tighter leading-none text-center">
            Ink<br/>Culture
         </h2>
      </div>
    </div>
  );
}

const Column = ({ images, y, className = "" }: { images: string[], y: any, className?: string }) => {
  return (
    <motion.div style={{ y }} className={`relative h-full w-[33%] md:w-[25%] flex flex-col gap-[2vw] ${className}`}>
      {images.map((src, i) => {
        return (
          <div key={i} className="relative w-full aspect-[2/3] rounded-[1vw] overflow-hidden min-h-[250px] md:min-h-[400px]">
            <Image 
                src={src} 
                alt="image" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-grayscale duration-500 ease-in-out" 
                sizes="(max-width: 768px) 33vw, 25vw"
            />
          </div>
        );
      })}
    </motion.div>
  );
};
