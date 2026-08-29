'use client';

import { Briefcase, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import { careerRoles } from '@/lib/site-data-enhanced';

export default function CareersPage() {
  return (
    <main className="relative overflow-hidden w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
              📡 Join the Grid
            </span>

            <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
              Build the <span className="text-gradient">Future of Defense</span>
            </h1>

            <p className="font-[var(--font-body)] text-lg md:text-xl text-on-surface-variant leading-relaxed">
              We are recruiting the next generation of security researchers, system engineers, and code architects. Join us remote or in Vadodara, and construct the sovereign cybersecurity grid.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Career Roles Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {careerRoles.map((role, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/80 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 flex flex-col h-full">
                {/* Icon */}
                <div className="flex-shrink-0 mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xl">
                    {role.icon === 'ShieldAlert' && '🛡️'}
                    {role.icon === 'Search' && '🔍'}
                    {role.icon === 'CheckSquare' && '✓'}
                    {role.icon === 'Code2' && '💻'}
                    {role.icon === 'PenTool' && '✍️'}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-2">
                  {role.title}
                </h3>

                {/* Badge */}
                <Badge variant="secondary" className="mb-4 w-fit">
                  {role.tag.split(' · ')[0]}
                </Badge>

                {/* Description */}
                <p className="font-[var(--font-body)] text-base text-on-surface-variant leading-relaxed mb-6 flex-1">
                  {role.description}
                </p>

                {/* CTA */}
                <a
                  href={`mailto:careers@vayux.systems?subject=${encodeURIComponent(role.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-all font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wide"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          ))}

          {/* Open Application Card */}
          <ScrollReveal delay={careerRoles.length * 0.1}>
            <div className="glass-card rounded-2xl p-8 md:p-10 border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 flex flex-col h-full">
              <div className="flex-shrink-0 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 text-primary text-xl">
                  💼
                </div>
              </div>

              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-2">
                Open Alignment
              </h3>

              <Badge variant="primary" className="mb-4 w-fit">
                EXCEPTIONAL TALENT
              </Badge>

              <p className="font-[var(--font-body)] text-base text-on-surface-variant leading-relaxed mb-6 flex-1">
                Have unmatched skills that don't fit our standard boxes? We value exceptional, independent talent and foster innovation beyond traditional roles.
              </p>

              <a
                href="mailto:careers@vayux.systems?subject=Open Application - Sovereign Technical Alignment"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wide"
              >
                Submit Application <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Fellowship Program */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
        <ScrollReveal>
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/80 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-on-surface mb-6">
              VayuX Fellowship Program
            </h2>

            <div className="space-y-4 font-[var(--font-body)] text-lg text-on-surface-variant">
              <p>
                Our fellowship cohorts are designed for exceptional individuals who want to accelerate their careers in cybersecurity while contributing to cutting-edge research and development. Fellows work alongside senior engineers and researchers, gaining hands-on experience with real-world infrastructure security challenges.
              </p>

              <p>
                Each fellowship includes academic credit (where applicable), performance-based stipend, mentorship from industry experts, and potential for full-time conversion based on performance.
              </p>

              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Remote and on-site options available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Mentorship from top cybersecurity professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Work on real security challenges and R&D projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Competitive stipend with performance bonuses</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-white/80 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-on-surface mb-4">
              Questions About Careers?
            </h2>
            <p className="font-[var(--font-body)] text-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
              Our recruitment team is ready to discuss opportunities, answer your questions, and help you find the right fit within VayuX.
            </p>
            <a
              href="mailto:careers@vayux.systems"
              className="btn-glow px-8 py-3 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-sm inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Careers Team
            </a>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
