'use client';

import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function MagneticCard({
  children,
  className = '',
  glowColor = 'rgba(0, 168, 255, 0.15)',
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calculate 3D tilt (-8 to +8 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
      className={`relative overflow-hidden rounded-2xl glass-card transition-shadow duration-300 ${className}`}
      style={{
        boxShadow: isHovered
          ? '0 20px 40px rgba(56, 189, 248, 0.12), 0 0 0 1px rgba(0, 168, 255, 0.25)'
          : '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Dribbble-style dynamic mouse spotlight glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
