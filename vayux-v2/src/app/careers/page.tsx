'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import { api, JobRole } from '@/lib/api-client';

const initialRoles = [
  {
    title: 'Offensive Security Researcher',
    slug: 'offensive-security-researcher',
    tag: 'OFFENSIVE · FELLOWSHIP / FULL-TIME',
    icon: 'ShieldAlert',
    description: 'Reverse-engineer binaries, design novel exploit chains, and audit complex enterprise architectures to uncover architectural vulnerabilities.',
    subject: 'Application - Offensive Security Researcher',
  },
  {
    title: '24/7 SOC Incident Analyst',
    slug: 'soc-incident-analyst',
    tag: 'DEFENSE · 24/7 ROSTER',
    icon: 'Search',
    description: 'Monitor real-time threat telemetry, triage SIEM anomalies, and execute automated containment playbooks during live security incidents.',
    subject: 'Application - 24/7 SOC Incident Analyst',
  },
  {
    title: 'GRC & Compliance Auditor',
    slug: 'grc-compliance-auditor',
    tag: 'GOVERNANCE · SOVEREIGN COMPLIANCE',
    icon: 'CheckSquare',
    description: 'Map enterprise architectures against DPDP Act 2023, ISO 27001, SOC 2 Type II, and CERT-In mandates, establishing unassailable policy frameworks.',
    subject: 'Application - GRC & Compliance Auditor',
  },
  {
    title: 'Core Systems Architect',
    slug: 'core-systems-architect',
    tag: 'SYSTEMS · KERNEL DEFENSE',
    icon: 'Code2',
    description: 'Engineer low-latency event ingestion pipelines, eBPF telemetry hooks, and high-throughput security agents operating at the OS kernel boundary.',
    subject: 'Application - Core Systems Architect',
  },
  {
    title: 'Technical Security Writer & Researcher',
    slug: 'technical-security-writer',
    tag: 'PUBLICATIONS · FELLOWSHIP',
    icon: 'PenTool',
    description: 'Deconstruct complex sovereign cyber architectures, kernel telemetry, and threat incident logs into clear research whitepapers and threat advisories.',
    subject: 'Application - Technical Security Writer',
  },
];

export default function CareersPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBackendRoles() {
      try {
        setLoading(true);
        const res = await api.getJobRoles(true);
        if (res && Array.isArray(res.results)) {
          const mapped = res.results.map((r: JobRole) => ({
            title: r.title,
            slug: r.slug,
            tag: r.tag,
            icon: r.icon,
            description: r.description,
            subject: r.subject,
          }));
          setRoles(mapped);
        }
      } catch {
        if (process.env.NODE_ENV === 'development') {
          console.info('[VayuX Careers] Backend offline or unreachable.');
        }
      } finally {
        setLoading(false);
      }
    }
    loadBackendRoles();
  }, []);

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
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
                Connecting to Sentinel Recruitment DB...
              </p>
            </div>
          ) : roles.length > 0 ? (
            roles.map((role, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/80 dark:border-white/10 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 flex flex-col h-full group">
                  {/* Icon */}
                  <div className="flex-shrink-0 mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xl group-hover:scale-110 transition-transform">
                      {role.icon === 'ShieldAlert' && '🛡️'}
                      {role.icon === 'Search' && '🔍'}
                      {role.icon === 'CheckSquare' && '✓'}
                      {role.icon === 'Code2' && '💻'}
                      {role.icon === 'PenTool' && '✍️'}
                      {!['ShieldAlert', 'Search', 'CheckSquare', 'Code2', 'PenTool'].includes(role.icon) && '⚡'}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>

                  {/* Badge */}
                  <Badge variant="secondary" className="mb-4 w-fit">
                    {role.tag ? role.tag.split(' · ')[0] : 'ACTIVE OPENING'}
                  </Badge>

                  {/* Description */}
                  <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 flex-1 line-clamp-3">
                    {role.description}
                  </p>

                  {/* CTA Link to Dedicated Role Detail Page */}
                  <Link
                    href={`/careers/${role.slug || 'soc-incident-analyst'}`}
                    className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary hover:text-black border border-primary/30 text-primary transition-all font-[var(--font-heading)] text-xs font-bold uppercase tracking-wider group"
                  >
                    <span>View Details &amp; Apply</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-16 px-6 text-center max-w-lg mx-auto glass-card rounded-2xl border border-outline-variant/20 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                📡
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-2">
                No Active Roles Posted
              </h3>
              <p className="font-[var(--font-body)] text-sm text-on-surface-variant leading-relaxed mb-6">
                The Sentinel HR Vault currently has no public vacancies listed. Exceptional talent is invited to submit a spontaneous dossier below.
              </p>
            </div>
          )}

          {/* Open Application Card */}
          <ScrollReveal delay={roles.length * 0.1}>
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

              <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 flex-1">
                Have unmatched skills that don't fit standard openings? We value exceptional, independent talent and foster innovation beyond traditional roles.
              </p>

              <a
                href="mailto:careers@vayux.systems?subject=Open Application - Sovereign Technical Alignment"
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all font-[var(--font-heading)] text-xs font-bold uppercase tracking-wider"
              >
                <span>Submit Direct Alignment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Fellowship Program */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
        <ScrollReveal>
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
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
                  <span>Remote and on-site options available in Vadodara R&amp;D Lab</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Direct mentorship from Founder &amp; CTO Pragnesh Kumar S.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Work on real incident response telemetry and adversarial zero-day research</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Competitive stipend with performance bonuses and fast-track hiring</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-white/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
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
