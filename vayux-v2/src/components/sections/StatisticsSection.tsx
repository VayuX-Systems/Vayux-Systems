'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart3, Target, TrendingDown, Lock, Eye } from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { performanceMetrics } from '@/lib/site-data-enhanced';

export default function StatisticsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconName: string) => {
    const props = { className: 'w-8 h-8 text-primary' };
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 {...props} />;
      case 'Target':
        return <Target {...props} />;
      case 'TrendingDown':
        return <TrendingDown {...props} />;
      case 'Lock':
        return <Lock {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto"
    >
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-4">
            VayuX Performance <span className="text-gradient">Metrics</span>
          </h2>
          <p className="font-[var(--font-body)] text-lg text-on-surface-variant max-w-2xl mx-auto">
            Real-world statistics from our autonomous SOC operations and client deployments.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
        {performanceMetrics.map((stat, idx) => (
          <ScrollReveal key={stat.id} delay={idx * 0.08}>
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/80 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {getIcon(stat.icon)}
              </div>

              {/* Display Value */}
              <div
                className={`font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-on-surface mb-2 transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                {stat.display}
              </div>

              {/* Label */}
              <p className="font-[var(--font-body)] text-sm md:text-base text-on-surface-variant leading-relaxed">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
