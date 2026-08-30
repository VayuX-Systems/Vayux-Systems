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
        className={`relative overflow-hidden rounded-2xl h-full ${
          isFlagship ? 'md:col-span-2' : ''
        }`}
        style={{ perspective: '1000px' }}
      >
        {/* Ambient Corner Glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-2xl pointer-events-none -z-10 opacity-30 group-hover:opacity-70 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${color}35 0%, ${color}05 50%, transparent 80%)`,
          }}
        />

        {/* Card Background Base */}
        <div className="absolute inset-0 bg-white/80 dark:bg-[#070b16]/90 backdrop-blur-xl -z-20" />

        {/* Animated border glow on hover */}
        <div
          className="absolute inset-0 border border-slate-200/80 dark:border-white/10 rounded-2xl pointer-events-none group-hover:border-2 transition-all duration-300"
          style={{ borderColor: `${color}40` }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between">
          {/* Header */}
          <div>
            {/* Icon & Badge */}
            <div className="flex items-start justify-between mb-6">
              <motion.div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 border shadow-md"
                style={{
                  backgroundColor: `${color}15`,
                  borderColor: `${color}35`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {icon}
              </motion.div>

              {isFlagship && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  Flagship
                </motion.div>
              )}
            </div>

            {/* Title & Subtitle */}
            <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-2 tracking-tight">
              {title}
            </h3>
            <p
              className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color }}
            >
              {subtitle}
            </p>

            {/* Description */}
            <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
              {description}
            </p>

            {/* Features List */}
            <div className="space-y-2.5 mb-8">
              {includes.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color }} />
                  <span className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant/90">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div
            className="flex items-center justify-between border-t border-outline-variant/15 dark:border-white/10 pt-4 group-hover:translate-x-1 transition-transform"
          >
            <span className="font-[var(--font-heading)] text-xs uppercase tracking-wider font-semibold" style={{ color }}>
              View Details
            </span>
            <ArrowRight className="w-4 h-4" style={{ color }} />
          </div>
        </div>

        {/* Hover highlight effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ backgroundColor: color }}
        />
      </motion.div>
    </Link>
  );
}
