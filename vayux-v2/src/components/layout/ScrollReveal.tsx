'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  distance?: number;
  blur?: boolean;
  scale?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.65,
  distance = 28,
  blur = true,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Root margin triggers slightly before the element fully enters the screen for silky smoothness
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -50px 0px',
    amount: 'some',
  });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      return;
    }

    const checkViewport = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
    };

    checkViewport();
    const rafId = requestAnimationFrame(checkViewport);
    const timerId = setTimeout(checkViewport, 120);

    const safetyId = setTimeout(() => {
      setIsVisible(true);
    }, 900);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      clearTimeout(safetyId);
    };
  }, [isInView]);

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
    none: { y: 0, x: 0 },
  };

  const offset = directionMap[direction] || { y: distance, x: 0 };
  const shouldShow = isVisible || isInView;

  const initialStyles: Record<string, any> = {
    opacity: 0,
    ...offset,
  };

  if (blur) {
    initialStyles.filter = 'blur(8px)';
  }
  if (scale) {
    initialStyles.scale = 0.95;
  }

  const animateStyles: Record<string, any> = {
    opacity: 1,
    y: 0,
    x: 0,
  };

  if (blur) {
    animateStyles.filter = 'blur(0px)';
  }
  if (scale) {
    animateStyles.scale = 1;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialStyles}
      animate={shouldShow ? animateStyles : initialStyles}
      transition={{
        duration,
        delay: shouldShow ? delay : 0,
        ease: [0.16, 1, 0.3, 1], // Custom apple-grade cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
}
