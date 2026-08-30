'use client';

import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animation for smooth tilt
  const springConfig = { damping: 15, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);

  // Shadow based on tilt
  const shadowX = useSpring(useTransform(x, [-100, 100], [-20, 20]), springConfig);
  const shadowY = useSpring(useTransform(y, [-100, 100], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {/* Card with shadow that follows tilt */}
      <motion.div
        style={{
          boxShadow: shadowX.get
            ? `${shadowX.get}px ${shadowY.get}px 30px rgba(0, 168, 255, 0.2)`
            : '0 10px 30px rgba(0, 168, 255, 0.1)',
        }}
        className="relative"
      >
        {children}
      </motion.div>

      {/* Glossy shine effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 30% 30%, white, transparent)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          transformStyle: 'preserve-3d',
        }}
      />
    </motion.div>
  );
}
