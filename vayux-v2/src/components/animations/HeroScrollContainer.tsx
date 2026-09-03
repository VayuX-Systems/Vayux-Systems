'use client';

import React, { useState, useEffect } from 'react';
import DribbbleSentinelHero from '@/components/animations/DribbbleSentinelHero';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { api } from '@/lib/api-client';

export default function HeroScrollContainer() {
  const [heroData, setHeroData] = useState({
    badge_text: '🔒 Sovereign Cyber Defense Nexus',
    heading: 'Architecting a Safer, Self-Defending',
    highlight_text: 'Online World',
    subheading: 'VayuX Systems is an innovation-driven cybersecurity R&D firm leveraging an operational feedback loop to channel real-world telemetry into autonomous security architectures.',
  });

  useEffect(() => {
    async function loadBackendHero() {
      try {
        const sections = await api.getPageSections();
        if (sections && sections['home-hero']) {
          setHeroData({
            badge_text: sections['home-hero'].badge_text || '🔒 Sovereign Cyber Defense Nexus',
            heading: sections['home-hero'].heading || 'Architecting a Safer, Self-Defending',
            highlight_text: sections['home-hero'].highlight_text || 'Online World',
            subheading: sections['home-hero'].subheading || 'VayuX Systems is an innovation-driven cybersecurity R&D firm leveraging an operational feedback loop.',
          });
        }
      } catch (err) {
        // Silent fallback
      }
    }
    loadBackendHero();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Mobile-Specific Background 3D Logo & Lamp (Vivid & Distinct Presence on Mobile) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-75 dark:opacity-65 z-0 scale-90 sm:scale-100 translate-y-2 lg:hidden overflow-hidden">
        <DribbbleSentinelHero />
      </div>

      {/* 2. Hero Section Container */}
      <div className="relative min-h-[78vh] sm:min-h-[85vh] md:min-h-[90vh] w-full flex items-center justify-center pt-20 sm:pt-28 md:pt-36 pb-10 sm:pb-16 px-4 sm:px-6 md:px-[80px] z-10">
        {/* Soft Ambient Radiance in Background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-fixed-dim/15 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-container/15 dark:bg-secondary/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Hero Content Grid */}
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-20">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="mb-3 sm:mb-6">
              <span className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full border border-primary/30 bg-primary/10 dark:bg-primary/20 backdrop-blur-md text-primary font-[var(--font-heading)] text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] shadow-sm font-bold">
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> {heroData.badge_text}
              </span>
            </div>

            {/* Solid High-Contrast Headline with Celestial Blue Finish */}
            <h1 className="hero-title font-[var(--font-heading)] text-2xl sm:text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.18] sm:leading-[1.12] mb-3 sm:mb-6 max-w-lg sm:max-w-none">
              {heroData.heading} <br className="hidden sm:inline" />
              <span className="text-gradient">{heroData.highlight_text}</span>
            </h1>

            {/* High-Contrast Visible Subtitle Description */}
            <p className="hero-desc font-[var(--font-body)] text-xs sm:text-base md:text-xl mb-5 sm:mb-8 max-w-lg sm:max-w-xl leading-relaxed text-on-surface-variant font-normal">
              {heroData.subheading}
            </p>

            {/* Action Buttons — Sleek, Crisp, Non-Bulky */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2.5 sm:gap-4 mb-6 sm:mb-10 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto lg:mx-0">
              <Link
                href="/insights"
                className="btn-glow px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-white font-[var(--font-heading)] tracking-wider sm:tracking-[0.15em] uppercase text-xs sm:text-sm shadow-md inline-flex items-center justify-center gap-2 font-semibold w-full sm:w-auto"
              >
                Explore Our Research
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline-glass px-5 sm:px-8 py-2.5 sm:py-4 rounded-full font-[var(--font-heading)] tracking-wider sm:tracking-[0.15em] uppercase text-xs sm:text-sm inline-flex items-center justify-center font-semibold transition-all duration-300 shadow-sm w-full sm:w-auto"
              >
                Initiate Consultation
              </Link>
            </div>

            {/* Micro Feature Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-white/10 text-[9px] sm:text-xs font-[var(--font-heading)] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Sub-15ms Event Correlation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary-container" />
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
