'use client';

import { Mail, Phone, Building2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { teamMembers, corePillars } from '@/lib/site-data-enhanced';

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
              🧪 Cybersecurity R&D Firm & Dynamic Laboratory
            </span>

            <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
              Architecting a <span className="text-gradient">Self-Defending World</span>
            </h1>

            <p className="font-[var(--font-body)] text-lg md:text-xl text-on-surface-variant leading-relaxed mb-6">
              VayuX Systems operates at the intersection of <strong>advanced cybersecurity engineering and strategic infrastructure defense.</strong> We are dedicated to architecting a more resilient digital landscape through the rigorous integration of fundamental research and applied technical solutions.
            </p>

            <p className="font-[var(--font-body)] text-base md:text-lg text-on-surface-variant leading-relaxed">
              Unlike traditional service providers that focus on routine maintenance, VayuX functions as a dynamic laboratory where every operational engagement—across SOC Management, VAPT, GRC, and DFIR—serves as a catalyst for deeper systemic inquiry and continuous architectural evolution.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Core Pillars Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <div className="mb-16">
          <ScrollReveal>
            <SectionHeading
              center
              title="Our Core Pillars"
              subtitle="Three foundational principles guiding every VayuX engagement and innovation."
            />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {corePillars.map((pillar, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div
                className="glass-card rounded-2xl p-8 md:p-10 h-full border border-white/80 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300"
                style={{ background: `rgba(255, 255, 255, 0.65)` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xl">
                      {pillar.icon === 'FlaskConical' && '🧪'}
                      {pillar.icon === 'RefreshCw' && '🔄'}
                      {pillar.icon === 'ShieldAlert' && '🛡️'}
                    </span>
                  </div>
                </div>

                <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
                  {pillar.title}
                </h3>

                <p className="font-[var(--font-body)] text-base text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
        <div className="mb-16">
          <ScrollReveal>
            <SectionHeading
              center
              title="The Team Behind the Laboratory"
              subtitle="Elite systems researchers, vulnerability experts, and defense engineers architecting the future of cybersecurity."
            />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {teamMembers.map((member) => (
            <ScrollReveal key={member.slug}>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/80 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 flex flex-col h-full">
                {/* Member Image */}
                {member.image && (
                  <div className="relative w-full h-64 bg-surface-container">
                    <Image
                      src={member.image}
                      alt={member.fullName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/20 to-transparent" />
                  </div>
                )}

                {/* Member Info */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-1">
                    {member.fullName}
                  </h3>

                  <p className="font-[var(--font-heading)] text-sm text-primary font-semibold uppercase tracking-wide mb-4">
                    {member.title}
                  </p>

                  <p className="font-[var(--font-body)] text-base text-on-surface-variant leading-relaxed mb-6 flex-1">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  {member.expertise && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact Links */}
                  <div className="flex items-center gap-3 pt-6 border-t border-outline-variant/20">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        title={`Email ${member.firstName}`}
                        className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`LinkedIn Profile`}
                        className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Twitter Profile`}
                        className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                        aria-label="Twitter"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-on-surface mb-4">
              Global Presence, Local Roots
            </h2>
            <p className="font-[var(--font-body)] text-lg text-on-surface-variant max-w-2xl mx-auto">
              Operating across India with headquarters in Vadodara, Gujarat, and strategic presence in key technology hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* HQ Card */}
            <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/80">
              <div className="flex items-start gap-4 mb-6">
                <Building2 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface">
                  Headquarters
                </h3>
              </div>
              <p className="font-[var(--font-body)] text-base text-on-surface-variant mb-2">
                Vadodara, Gujarat
              </p>
              <p className="font-[var(--font-body)] text-sm text-on-surface-variant mb-6">
                Innovation hub and primary operations center for VayuX research and development.
              </p>
              <div className="space-y-2">
                <a href="tel:+91-8200677905" className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors text-sm font-semibold">
                  <Phone className="w-4 h-4" />
                  +91-8200677905
                </a>
              </div>
            </div>

            {/* Branches Card */}
            <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/80">
              <div className="flex items-start gap-4 mb-6">
                <Building2 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface">
                  Regional Offices
                </h3>
              </div>
              <p className="font-[var(--font-body)] text-base text-on-surface-variant mb-6">
                Strategic presence across India:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 font-[var(--font-body)] text-base text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Ahmedabad, Gujarat
                </li>
                <li className="flex items-center gap-2 font-[var(--font-body)] text-base text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Surat, Gujarat
                </li>
                <li className="flex items-center gap-2 font-[var(--font-body)] text-base text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Pan-India presence
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-white/80 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-on-surface mb-4">
              Ready to Establish an <span className="text-gradient">R&D Engagement</span>?
            </h2>
            <p className="font-[var(--font-body)] text-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
              Connect with our team to discuss how VayuX can architect autonomous defense mechanisms for your organization.
            </p>
            <Link
              href="/contact"
              className="btn-glow px-8 py-3 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-sm inline-flex items-center gap-2"
            >
              Schedule Consultation
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
