'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll to top instantly when route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    // Force re-render on orientation change
    window.dispatchEvent(new Event('resize'));
  }, [pathname]);

  useEffect(() => {
    // Handle orientation changes on mobile
    const handleOrientationChange = () => {
      // Force layout recalculation
      window.dispatchEvent(new Event('resize'));
      // Trigger re-render after orientation changes
      setTimeout(() => {
        window.dispatchEvent(new Event('orientationchange'));
      }, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange, false);
    window.addEventListener('resize', handleOrientationChange, false);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.25,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
