'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}

function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const currentCount = from + (to - from) * progress;
      setCount(parseFloat(currentCount.toFixed(decimals)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, from, to, duration, decimals, delay]);

  return (
    <div ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  sublabel?: string;
  suffix?: string | null;
  prefix?: string;
  color?: string;
  delay?: number;
  trend?: string;
  benchmark?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  sublabel,
  suffix = '',
  prefix = '',
  color = '#0284c7',
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-xl p-3.5 sm:p-6 md:p-8 bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between h-full"
    >
      {/* Icon */}
      <motion.div
        className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2.5 sm:mb-4 text-on-surface bg-primary/10 dark:bg-white/5"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center text-primary dark:text-sky-400">
          {icon}
        </div>
      </motion.div>

      {/* Number */}
      <div className="mb-1 sm:mb-2">
        <div className="font-[var(--font-heading)] text-xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
          <AnimatedCounter
            to={value}
            duration={2}
            suffix={suffix || ''}
            prefix={prefix}
            delay={delay}
            decimals={suffix === '%' ? 1 : 0}
          />
        </div>
      </div>

      {/* Label */}
      <p className="font-[var(--font-body)] text-[11px] sm:text-sm text-on-surface-variant font-medium leading-snug">
        {label}
      </p>

      {/* Sublabel */}
      {sublabel && (
        <p className="font-[var(--font-body)] text-[10px] sm:text-xs text-on-surface-variant/70 mt-1">
          {sublabel}
        </p>
      )}
    </motion.div>
  );
}
