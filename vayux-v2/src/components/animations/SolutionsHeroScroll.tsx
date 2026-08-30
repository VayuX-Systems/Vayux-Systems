'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { Shield } from 'lucide-react';

interface SolutionsHeroScrollProps {
  children?: React.ReactNode;
}

export default function SolutionsHeroScroll({ children }: SolutionsHeroScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth cinematic recession of hero content on scroll
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.3, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* 1. Full-Bleed Edge-to-Edge Solutions Hero (Pure clean studio lighting, no background image) */}
      <div className="relative min-h-[65vh] md:min-h-[75vh] w-full flex items-center justify-center pt-32 md:pt-40 pb-24 px-4 sm:px-6 md:px-[80px] z-10">
        {/* Soft Ambient Radiance in Background */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary-fixed-dim/15 dark:bg-primary/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-container/15 dark:bg-secondary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* Hero Content with Parallax Motion */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="text-center max-w-4xl mx-auto relative z-20"
        >
          <ScrollReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-primary/30 bg-white/80 dark:bg-primary/10 backdrop-blur-md text-primary font-[var(--font-heading)] text-xs uppercase tracking-[0.2em] mb-6 shadow-sm font-semibold">
              <Shield className="w-3.5 h-3.5 text-primary" /> Elite Applied Engineering
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6 tracking-tight leading-[1.15] shimmer-text">
              Unassailable <span className="text-gradient">Protection</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant dark:text-slate-100 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Experience celestial technicality. Our elite services provide luminous clarity and absolute precision, ensuring your digital sovereignty remains pristine and secure through advanced software research and resilient architectural implementations.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-[var(--font-heading)] uppercase tracking-wider text-on-surface-variant dark:text-slate-200 font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>24/7 Threat Interception</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container" />
                <span>Sub-15ms Detection Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Zero-Day Nullification</span>
              </div>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>

      {/* 2. Elevated Content Card (Glides up and overlaps over the hero on scroll) */}
      <div className="relative z-30 bg-surface dark:bg-[#09090b] rounded-t-[3rem] md:rounded-t-[4.5rem] shadow-[0_-30px_90px_rgba(0,0,0,0.12)] dark:shadow-[0_-30px_100px_rgba(0,0,0,0.85)] border-t border-white/80 dark:border-cyan-500/20 pt-16 md:pt-24 pb-20 md:pb-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto w-full transition-colors duration-300">
        {children}
      </div>
    </div>
  );
}
