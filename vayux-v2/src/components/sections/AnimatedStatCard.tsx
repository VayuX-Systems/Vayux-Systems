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
      className="rounded-xl p-6 sm:p-8 bg-white/5 border border-white/10 hover:border-white/20 transition-all"
    >
      {/* Icon */}
      <motion.div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-on-surface"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>

      {/* Number */}
      <div className="mb-2">
        <div className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-on-surface">
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
      <p className="font-[var(--font-body)] text-sm text-on-surface-variant">
        {label}
      </p>

      {/* Sublabel */}
      {sublabel && (
        <p className="font-[var(--font-body)] text-xs text-on-surface-variant/70 mt-2">
          {sublabel}
        </p>
      )}
    </motion.div>
  );
}
