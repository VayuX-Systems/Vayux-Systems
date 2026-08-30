'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollFadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 32,
  threshold = 0.15,
  className = '',
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check initial viewport presence immediately
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 850);

    return () => {
      clearTimeout(timer);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getInitialState = () => {
    const baseState: Record<string, any> = { opacity: 0, filter: 'blur(6px)' };
    switch (direction) {
      case 'up':
        return { ...baseState, y: distance };
      case 'down':
        return { ...baseState, y: -distance };
      case 'left':
        return { ...baseState, x: distance };
      case 'right':
        return { ...baseState, x: -distance };
      case 'none':
        return baseState;
      default:
        return { ...baseState, y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={isVisible ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : getInitialState()}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
