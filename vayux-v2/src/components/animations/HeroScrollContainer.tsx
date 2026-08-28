'use client';

import React from 'react';
import DribbbleSentinelHero from '@/components/animations/DribbbleSentinelHero';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export default function HeroScrollContainer() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Mobile-Specific Background 3D Logo & Lamp (Positioned cleanly behind text on small screens) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35 dark:opacity-25 z-0 scale-90 sm:scale-100 translate-y-2 lg:hidden overflow-hidden">
        <DribbbleSentinelHero />
      </div>

      {/* 2. Hero Section Container */}
      <div className="relative min-h-[85vh] md:min-h-[90vh] w-full flex items-center justify-center pt-24 sm:pt-28 md:pt-36 pb-14 sm:pb-16 px-5 md:px-[80px] z-10">
        {/* Soft Ambient Radiance in Background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-fixed-dim/15 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-container/15 dark:bg-secondary/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Hero Content Grid */}
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-primary/30 bg-primary/10 dark:bg-primary/20 backdrop-blur-md text-primary font-[var(--font-heading)] text-xs uppercase tracking-[0.2em] shadow-sm font-bold">
                <Shield className="w-3.5 h-3.5 text-primary" /> Autonomous Defense Architecture
              </span>
            </div>

            {/* Solid High-Contrast Headline */}
            <h1 className="hero-title font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.12] mb-5 sm:mb-6">
              Architecting a Resilient <br className="hidden sm:inline" />
              Digital Landscape.
            </h1>

            {/* High-Contrast Visible Subtitle Description */}
            <p className="hero-desc font-[var(--font-body)] text-base sm:text-lg md:text-xl mb-8 max-w-xl leading-relaxed font-medium">
              VayuX Systems is an innovation-driven R&amp;D firm leveraging an operational feedback loop to channel real-world insights into next-generation autonomous security architectures.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <Link
                href="/insights"
                className="btn-glow px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-[var(--font-heading)] tracking-[0.15em] uppercase text-xs sm:text-sm shadow-xl inline-flex items-center justify-center gap-2 font-semibold w-full sm:w-auto"
              >
                Explore Our Research
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline-glass px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-[var(--font-heading)] tracking-[0.15em] uppercase text-xs sm:text-sm inline-flex items-center justify-center font-semibold transition-all duration-300 shadow-sm w-full sm:w-auto"
              >
                Initiate Consultation
              </Link>
            </div>

            {/* Micro Feature Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-slate-200 dark:border-white/10 text-[11px] sm:text-xs font-[var(--font-heading)] uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span>Sub-15ms Event Correlation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                <span>Zero-Day Neutralization</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Sentinel Hero (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="w-full">
              <DribbbleSentinelHero />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
