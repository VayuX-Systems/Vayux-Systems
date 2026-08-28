'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  accentLeft?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  accentLeft = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        glass-card rounded-2xl
        ${hover ? 'cursor-pointer' : ''}
        ${glow ? 'animate-pulse-glow' : ''}
        ${accentLeft ? 'border-l-4 border-l-primary' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
