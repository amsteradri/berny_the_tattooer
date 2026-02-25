/*
	React Bits <Cubes />
	https://reactbits.dev/animations/cubes
	Recreated by GitHub Copilot based on documented props and behavior.
*/

"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface CubesProps {
  gridSize?: number;
  cubeSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: string;
  duration?: { enter: number; leave: number };
  cellGap?: number;
  borderStyle?: string;
  faceColor?: string;
  shadow?: boolean | string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
  perspective?: number;
  backfaceVisibility?: 'visible' | 'hidden';
  className?: string; // Add className prop for custom styling like Tailwind
}

const Cubes: React.FC<CubesProps> = ({
  gridSize = 10,
  cubeSize,
  maxAngle = 45,
  radius = 3,
  easing = 'power3.out',
  duration = { enter: 0.3, leave: 0.6 },
  cellGap = 2,
  borderStyle = '1px solid #333',
  faceColor = '#000000',
  shadow = false,
  autoAnimate = false, 
  rippleOnClick = true,
  rippleColor = '#fff',
  rippleSpeed = 1,
  perspective = 800,
  backfaceVisibility = 'hidden',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]); 
  const [responsiveCubeSize, setResponsiveCubeSize] = useState(cubeSize || 40);

  // If cubeSize is not provided, calculate it based on container width
  useEffect(() => {
    if (cubeSize) return;

    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Just fill the specific grid size, no fancy math
        const totalGap = (gridSize - 1) * cellGap;
        const size = (containerWidth - totalGap) / gridSize;
        setResponsiveCubeSize(size);
      }
    };
    
    // Initial calculation
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cubeSize, gridSize, cellGap]);

  // Animation Logic
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Use requestAnimationFrame for smoother updates
    // Track active cubes (indices) to minimize GSAP calls
    const activeCubes = new Set<number>();
    
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let rafId: number;

    const update = () => {
        if (!containerRef.current) return; // Guard
        
        const rect = container.getBoundingClientRect();
        
        // Optimización: Si el contenedor no está visible en el viewport, salir
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const x = lastMouseX - rect.left;
        const y = lastMouseY - rect.top;

        const mouseCol = Math.floor(x / (responsiveCubeSize + cellGap));
        const mouseRow = Math.floor(y / (responsiveCubeSize + cellGap));

        // Optimización: Si el mouse está muy lejos del grid, resetear todo y salir
        if (mouseCol < -radius || mouseCol > gridSize + radius || mouseRow < -radius || mouseRow > gridSize + radius) {
             if (activeCubes.size > 0) {
                 activeCubes.forEach(index => {
                     if(squaresRef.current[index]) {
                          gsap.to(squaresRef.current[index], { rotateX: 0, rotateY: 0, z: 0, duration: duration.leave, ease: easing, overwrite: 'auto' });
                     }
                 });
                 activeCubes.clear();
             }
             return;
        }

        const searchRadius = Math.ceil(radius);
        const minRow = Math.max(0, mouseRow - searchRadius);
        const maxRow = Math.min(gridSize - 1, mouseRow + searchRadius);
        const minCol = Math.max(0, mouseCol - searchRadius);
        const maxCol = Math.min(gridSize - 1, mouseCol + searchRadius);

        const newActiveCubes = new Set<number>();

        // 1. Calculate new active cubes
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const index = row * gridSize + col;
                if(squaresRef.current[index]) {
                   const dx = col - mouseCol;
                   const dy = row - mouseRow;
                   const distSq = dx*dx + dy*dy;
                   if (distSq < radius * radius) {
                       newActiveCubes.add(index);
                       
                       const distance = Math.sqrt(distSq);
                       const intensity = 1 - distance / radius;
                       const targetRotateY = dx * intensity * maxAngle;
                       const targetRotateX = -dy * intensity * maxAngle;

                       gsap.to(squaresRef.current[index], {
                           rotateX: targetRotateX,
                           rotateY: targetRotateY,
                           duration: duration.enter,
                           ease: easing,
                           overwrite: 'auto'
                       });
                   }
                }
            }
        }

        // 2. Reset cubes that are no longer active
        activeCubes.forEach(index => {
            if (!newActiveCubes.has(index)) {
                if(squaresRef.current[index]) {
                     gsap.to(squaresRef.current[index], {
                         rotateX: 0,
                         rotateY: 0,
                         z: 0,
                         duration: duration.leave,
                         ease: easing,
                         overwrite: 'auto'
                     });
                }
            }
        });

        // 3. Update active set
        activeCubes.clear();
        newActiveCubes.forEach(v => activeCubes.add(v));
    };

    const handleMouseMove = (e: MouseEvent) => {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        // Throttling via RAF
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(update);
    };
    
    // ... rest of event listeners


    const handleMouseLeave = () => {
        // Reset all
        activeCubes.forEach(index => {
             if(squaresRef.current[index]) {
                  gsap.to(squaresRef.current[index], { rotateX: 0, rotateY: 0, z: 0, duration: duration.leave, ease: easing, overwrite: 'auto' });
             }
        });
        activeCubes.clear();
    };

    // Attach to WINDOW so it works even when hovering over other elements
    window.addEventListener('mousemove', handleMouseMove);
    // document.addEventListener('mouseleave', handleMouseLeave); // Often unnecessary for window-wide tracking
    
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        // document.removeEventListener('mouseleave', handleMouseLeave);
        if (rafId) cancelAnimationFrame(rafId);
    };

  }, [gridSize, responsiveCubeSize, radius, duration, easing, maxAngle, cellGap]);

  // Styles for the 3D Cube
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gap: `${cellGap}px`,
    width: '100%',
    height: '100%', // Ensure it takes full height
    perspective: `${perspective}px`,
    alignContent: 'center', // Center content vertically if grid is smaller than container
    justifyContent: 'center', // Center content horizontally
    overflow: 'hidden',
  };


  const cubeWrapperStyle: React.CSSProperties = {
      width: `${responsiveCubeSize}px`,
      height: `${responsiveCubeSize}px`,
      position: 'relative',
      transformStyle: 'preserve-3d',
      transform: 'translateZ(0)', // GPU trigger?
      cursor: 'pointer',
  };

  const faceStyle = (transform: string): React.CSSProperties => ({
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: faceColor,
      border: borderStyle,
      boxShadow: typeof shadow === 'string' ? shadow : shadow ? '0 0 10px rgba(0,0,0,0.5)' : 'none',
      backfaceVisibility: backfaceVisibility,
      transform: transform,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  });

  const translate = responsiveCubeSize / 2;

  // We change the approach slightly:
  // Instead of a strict grid, we want to FILL the container.
  // We can let CSS grid handle the layout naturally. 
  // If we remove the "width: fit-content" and let it stretch...

  return (
    <div ref={containerRef} style={containerStyle} className={className}>
      {Array.from({ length: gridSize * gridSize }).map((_, i) => (

        <div
          key={i}
          className="cube"
          ref={(el) => { squaresRef.current[i] = el; }}
          style={cubeWrapperStyle}
        >
          {/* Front */}
          <div className="cube-face cube-face-front" style={faceStyle(`rotateY(0deg) translateZ(${translate}px)`)} />
          {/* Back */}
          <div className="cube-face cube-face-back" style={faceStyle(`rotateY(180deg) translateZ(${translate}px)`)} />
          {/* Right */}
          <div className="cube-face cube-face-right" style={faceStyle(`rotateY(90deg) translateZ(${translate}px)`)} />
          {/* Left */}
          <div className="cube-face cube-face-left" style={faceStyle(`rotateY(-90deg) translateZ(${translate}px)`)} />
          {/* Top */}
          <div className="cube-face cube-face-top" style={faceStyle(`rotateX(90deg) translateZ(${translate}px)`)} />
          {/* Bottom */}
          <div className="cube-face cube-face-bottom" style={faceStyle(`rotateX(-90deg) translateZ(${translate}px)`)} />
        </div>
      ))}
    </div>
  );
};

export default Cubes;
