'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxHeroProps {
  children: ReactNode;
  className?: string;
}

export default function ParallaxHero({ children, className = '' }: ParallaxHeroProps) {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax transformations
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const y3 = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  if (!isMounted) return <div className={className}>{children}</div>;

  return (
    <motion.div
      style={{ y: y1, opacity }}
      className={`relative ${className}`}
    >
      {/* Background Layer 1 - Slowest */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 -z-30 opacity-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Background Layer 2 - Medium */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 -z-20 opacity-15"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Background Layer 3 - Fastest */}
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 -z-10 opacity-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10 blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Floating elements component for hero
interface FloatingElementProps {
  delay?: number;
  duration?: number;
  offset?: number;
  children: ReactNode;
  className?: string;
}

export function FloatingElement({
  delay = 0,
  duration = 4,
  offset = 20,
  children,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -offset, 0],
        x: [0, offset / 2, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated gradient background
export function AnimatedGradientBg({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0,168,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(0,168,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(0,168,255,0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0"
      />
    </div>
  );
}
