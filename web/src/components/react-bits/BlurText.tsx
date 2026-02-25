"use client"
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Variants;
  animationTo?: Variants;
  easing?: string | number[];
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOut',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      if (onAnimationComplete) {
         // simulate on complete if needed or use framer's onComplete
      }
    }
  }, [isInView, hasAnimated, onAnimationComplete]);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo = {
    filter: 'blur(0px)',
    opacity: 1,
    transform: 'translate3d(0,0,0)',
  };

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((element: string, index: number) => (

        <motion.span
          key={index}
          initial={animationFrom || defaultFrom}
          animate={isInView ? (animationTo || defaultTo) : (animationFrom || defaultFrom)}
          transition={{
            duration: 0.8,
            delay: index * (delay / 1000), // convert delay (ms) to seconds
            ease: easing,
          }}
          className="inline-block relative mr-[0.3em] last:mr-0"
          style={{ willChange: 'filter, transform, opacity' }}
        >
          {element === ' ' ? '\u00A0' : element}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;

