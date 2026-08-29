'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { industryVerticals } from '@/lib/site-data-enhanced';

export default function IndustriesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = industryVerticals[activeTab];

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
      <ScrollReveal>
        <SectionHeading
          center
          title="Industry-Specific Defense"
          subtitle="Each sector faces a unique threat landscape. VayuX delivers targeted detection and response tailored to your industry's risk profile."
        />
      </ScrollReveal>

      {/* Industry Tabs */}
      <ScrollReveal className="mt-16 mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {industryVerticals.map((industry, idx) => (
            <button
              key={industry.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-lg font-[var(--font-heading)] font-semibold uppercase tracking-wide text-xs transition-all ${
                activeTab === idx
                  ? 'bg-primary text-on-primary border border-primary'
                  : 'border border-outline-variant/30 text-on-surface hover:border-primary/50'
              }`}
            >
              {industry.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Active Industry Panel */}
      <ScrollReveal key={active.id} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Threats */}
          <div className="glass-card rounded-2xl p-8 border border-white/80">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface">
                Threat Vectors
              </h3>
            </div>
            <div className="space-y-3">
              {active.threats.map((threat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="font-[var(--font-body)] text-base text-on-surface-variant">
                    {threat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VayuX Response */}
          <div className="glass-card rounded-2xl p-8 border border-white/80">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface">
                VayuX Response
              </h3>
            </div>
            <div className="space-y-3">
              {active.responses.map((response, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="font-[var(--font-body)] text-base text-on-surface-variant">
                    {response}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Stat */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/80 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
          <p className="font-[var(--font-body)] text-lg text-on-surface-variant">
            <span className="font-semibold text-on-surface">{active.label} Industry Fact:</span> {active.stat}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`/contact?industry=${active.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-all font-[var(--font-heading)] font-semibold uppercase tracking-wide text-sm"
          >
            Learn How VayuX Protects {active.label}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
