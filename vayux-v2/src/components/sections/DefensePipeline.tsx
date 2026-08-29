'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { defenseStages } from '@/lib/site-data-enhanced';

export default function DefensePipelineSection() {
  const [activeStage, setActiveStage] = useState(0);
  const active = defenseStages[activeStage];

  const getStageIcon = (step: string) => {
    const icons: { [key: string]: string } = {
      '01': '📥',
      '02': '🔍',
      '03': '🌐',
      '04': '📁',
      '05': '🧹',
      '06': '📊',
      '07': '👤',
    };
    return icons[step] || '⚙️';
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
            ⚡ 7-Stage Autonomous Pipeline
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-4">
            How <span className="text-gradient">VayuX SOC</span> Operations Work
          </h2>
          <p className="font-[var(--font-body)] text-lg text-on-surface-variant max-w-2xl mx-auto">
            A seven-stage sovereign defense pipeline—driven by autonomous detection engines and verified by elite L2 threat responders—triages alerts at machine speed, 24/7.
          </p>
        </div>
      </ScrollReveal>

      {/* Desktop: Two-Column Layout */}
      <ScrollReveal className="hidden lg:grid grid-cols-2 gap-12 items-start">
        {/* Left: Stage Selector */}
        <div className="space-y-3">
          {defenseStages.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => setActiveStage(idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                activeStage === idx
                  ? 'bg-primary/10 border-primary'
                  : 'border-outline-variant/20 hover:border-primary/50'
              }`}
              style={{
                background: activeStage === idx ? `${stage.color}15` : undefined,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 font-bold"
                  style={{
                    background: `${stage.color}20`,
                    color: stage.color,
                  }}
                >
                  {getStageIcon(stage.step)}
                </div>
                <div className="flex-1">
                  <div className="font-[var(--font-heading)] text-xs font-bold uppercase tracking-wide" style={{ color: stage.color }}>
                    Stage {stage.step}
                  </div>
                  <h3 className="font-[var(--font-heading)] font-bold text-on-surface">
                    {stage.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Active Stage Details */}
        <div
          className="glass-card rounded-2xl p-8 border border-white/80 sticky top-20"
          style={{
            borderColor: active.color,
            background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, ${active.color}08 100%)`,
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                background: `${active.color}20`,
              }}
            >
              {getStageIcon(active.step)}
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-xs font-bold uppercase tracking-wide mb-2" style={{ color: active.color }}>
                Stage {active.step} — {active.badge}
              </div>
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface">
                {active.title}
              </h3>
            </div>
          </div>

          <p className="font-[var(--font-body)] text-on-surface-variant leading-relaxed mb-6 text-lg">
            {active.description}
          </p>

          {/* Technical Details */}
          <div className="pt-6 border-t border-outline-variant/20">
            <p className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface-variant font-semibold mb-3">
              Key Functions
            </p>
            <ul className="space-y-2">
              {active.description.split('.').slice(0, 2).map((func, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: active.color }}
                  />
                  <span className="font-[var(--font-body)] text-on-surface-variant">
                    {func.trim()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>

      {/* Mobile: Accordion Layout */}
      <ScrollReveal className="lg:hidden space-y-3">
        {defenseStages.map((stage, idx) => (
          <div
            key={stage.step}
            className="glass-card rounded-2xl border border-white/80 overflow-hidden"
          >
            <button
              onClick={() => setActiveStage(activeStage === idx ? -1 : idx)}
              className="w-full text-left p-4 hover:bg-surface-container/50 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 font-bold"
                  style={{
                    background: `${stage.color}20`,
                    color: stage.color,
                  }}
                >
                  {getStageIcon(stage.step)}
                </div>
                <div>
                  <div className="font-[var(--font-heading)] text-xs font-bold uppercase tracking-wide" style={{ color: stage.color }}>
                    Stage {stage.step}
                  </div>
                  <h3 className="font-[var(--font-heading)] font-bold text-on-surface">
                    {stage.title}
                  </h3>
                </div>
              </div>
              <ChevronDown
                className="w-5 h-5 text-on-surface-variant transition-transform flex-shrink-0"
                style={{
                  transform: activeStage === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {activeStage === idx && (
              <div className="px-4 pb-4 border-t border-outline-variant/20">
                <p className="font-[var(--font-body)] text-on-surface-variant leading-relaxed mt-4">
                  {stage.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal className="mt-16 text-center">
        <p className="font-[var(--font-body)] text-on-surface-variant mb-6">
          Interested in learning how this pipeline can protect your organization?
        </p>
        <a
          href="/contact"
          className="btn-glow px-8 py-3 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-sm inline-flex items-center gap-2"
        >
          Request SOC Assessment
        </a>
      </ScrollReveal>
    </section>
  );
}
