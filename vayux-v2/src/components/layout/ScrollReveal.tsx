'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Root margin only affects bottom boundary (-40px)
  // Top/left/right are 0px so any content at or near the top of the viewport triggers immediately
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -40px 0px',
    amount: 'some',
  });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      return;
    }

    // Direct viewport check on mount & route change
    // This ensures content in view on initial load or reload displays immediately
    // without requiring the user to touch or scroll the screen
    const checkViewport = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // If any portion of the element is visible in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
    };

    checkViewport();
    const rafId = requestAnimationFrame(checkViewport);
    const timerId = setTimeout(checkViewport, 100);

    // Fallback safety: guarantee content reveals after 800ms even if observer fails
    const safetyId = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      clearTimeout(safetyId);
    };
  }, [isInView]);

  const directionMap = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
  };

  const offset = directionMap[direction] || { y: 20, x: 0 };
  const shouldShow = isVisible || isInView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={shouldShow ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay: shouldShow ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
