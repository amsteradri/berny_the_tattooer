"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const cards = [
  {
    url: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop",
    title: "Realismo",
    id: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
    title: "Blackwork",
    id: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1590246296340-985223e75344?q=80&w=2670&auto=format&fit=crop",
    title: "Neo Tradicional",
    id: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1542646279-d56770267252?q=80&w=2670&auto=format&fit=crop", // A cool tattoo or art image
    title: "Dotwork",
    id: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1562962230-16bc46364924?q=80&w=2670&auto=format&fit=crop",
    title: "Lettering",
    id: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1598371838890-482c3c690c58?q=80&w=2574&auto=format&fit=crop",
    title: "Japonés",
    id: 6,
  },
  {
    url: "https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2672&auto=format&fit=crop",
    title: "Fine Line",
    id: 7,
  },
];

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white dark:bg-neutral-950">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};


const Card = ({ card }: { card: { url: string; title: string; id: number } }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;
