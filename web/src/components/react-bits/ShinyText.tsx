"use client";
import React from 'react';

interface ShinyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
  spread?: number;
  className?: string;
  direction?: string;
  disabled?: boolean;
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  speed = 4,
  delay = 0,
  spread = 120,
  className = '',
  direction = 'right',
  disabled = false,
  pauseOnHover = false,
  yoyo = false,
  ...props
}) => {
  const gradient = `linear-gradient(
    120deg,
    ${color} 20%,
    ${shineColor} 50%,
    ${color} 80%
  )`;


  return (
    <span
      className={className}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        animation: !disabled ? `shine ${speed}s linear infinite` : 'none',
        display: 'inline-block',
        ...props.style,
      }}
      {...props}
    >
      <style>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
      {text}
    </span>
  );
};

export default ShinyText;

