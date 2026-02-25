"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: any;
  animationTo?: any;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ').map(word => word.split(''));
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useGSAP(
    () => {
      if (inView) {
        const chars = letters.current.filter((l): l is HTMLSpanElement => l !== null);
        gsap.fromTo(chars, 
          { 
            willChange: 'opacity, transform', 
            ...animationFrom 
          },
          {
            ...animationTo,
            delay: delay / 1000, 
            ease,
            stagger: 0.05,
            duration: 0.8,
            onComplete: onLetterAnimationComplete,
          }
        );
      }
    },
    { dependencies: [inView, delay, ease, animationFrom, animationTo, onLetterAnimationComplete], scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`split-parent overflow-hidden inline-block ${className}`}
      style={{ textAlign, whiteSpace: 'normal', wordWrap: 'break-word' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.map((letter, letterIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <span
                key={index}
                ref={(el) => {
                  if (letters.current) {
                      letters.current[index] = el;
                  }
                }}
                style={{ display: 'inline-block', opacity: 0, willChange: 'opacity, transform' }}
              >
                {letter}
              </span>
            );
          })}
          <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
        </span>
      ))}
    </div>
  );
};

export default SplitText;

