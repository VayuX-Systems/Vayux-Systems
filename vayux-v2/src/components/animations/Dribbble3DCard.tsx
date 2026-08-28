'use client';

import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Dribbble3DCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  depth?: number;
  interactive?: boolean;
}

export default function Dribbble3DCard({
  children,
  className = '',
  glowColor = 'rgba(0, 168, 255, 0.25)',
  depth = 35,
  interactive = true,
}: Dribbble3DCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Smooth tilt angles (-10 to +10 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -9;
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 22,
          stiffness: 220,
          mass: 0.6,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-3xl overflow-hidden glass-panel border border-white/80 transition-shadow duration-500 ${className}`}
      >
        {/* Dynamic Specular Light Glare following cursor */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 65%)`,
            }}
          />
        )}

        {/* Animated Moving Border Glow on Hover */}
        <div
          className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(64,194,253,0.4), transparent 50%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1.5px',
          }}
        />

        {/* 3D Elevated Content Layer */}
        <div
          style={{
            transform: isHovered ? `translateZ(${depth}px)` : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.25s ease-out',
          }}
          className="relative z-20 h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
