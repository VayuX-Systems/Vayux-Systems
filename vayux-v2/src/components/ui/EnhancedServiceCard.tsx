'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface EnhancedServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  bgImage?: string;
  color: string;
  badge?: string;
  includes: string[];
  href: string;
  isFlagship?: boolean;
  delay?: number;
}

export default function EnhancedServiceCard({
  title,
  subtitle,
  description,
  icon,
  bgImage,
  color,
  badge,
  includes,
  href,
  isFlagship = false,
  delay = 0,
}: EnhancedServiceCardProps) {
  return (
    <Link href={href} className="h-full block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl h-full border border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-900/80 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        style={{ perspective: '1000px' }}
      >
        {/* Ambient Corner Glow */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none -z-10 opacity-20 group-hover:opacity-60 transition-opacity duration-500 blur-2xl"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${color}40 0%, ${color}10 60%, transparent 80%)`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 md:p-9 h-full flex flex-col justify-between">
          <div>
            {/* Header: Icon & Domain Badge */}
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 border shadow-sm transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: `${color}12`,
                  borderColor: `${color}35`,
                }}
              >
                {icon}
              </div>

              <span
                className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border shadow-sm"
                style={{
                  backgroundColor: `${color}10`,
                  borderColor: `${color}35`,
                  color: color,
                }}
              >
                {badge || (isFlagship ? 'FLAGSHIP PILLAR' : 'APPLIED SOLUTION')}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p
              className="font-mono text-xs font-semibold uppercase tracking-wider mb-4 leading-normal"
              style={{ color }}
            >
              {subtitle}
            </p>

            {/* Description */}
            <p className="font-[var(--font-body)] text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-light">
              {description}
            </p>

            {/* Key Capabilities Checklist */}
            <div className="space-y-2.5 mb-8 pt-2 border-t border-slate-100 dark:border-white/5">
              {includes.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color }} />
                  <span className="font-[var(--font-body)] text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div
            className="flex items-center justify-between border-t border-slate-200/80 dark:border-white/10 pt-4 mt-auto group-hover:translate-x-1 transition-transform"
          >
            <span className="font-[var(--font-heading)] text-xs uppercase tracking-wider font-bold" style={{ color }}>
              View Technical Specifications
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-all"
              style={{
                backgroundColor: `${color}15`,
                borderColor: `${color}30`,
              }}
            >
              <ArrowRight className="w-4 h-4" style={{ color }} />
            </div>
          </div>
        </div>

        {/* Dynamic Border Glow on Hover */}
        <div
          className="absolute inset-0 border-2 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderColor: `${color}50` }}
        />
      </motion.div>
    </Link>
  );
}
