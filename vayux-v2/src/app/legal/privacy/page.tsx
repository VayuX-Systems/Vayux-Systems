'use client';

import { Mail, Lock, Eye, Shield } from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function PrivacyPage() {
  return (
    <main className="relative pt-28 sm:pt-36 pb-20 md:pb-32 px-4 sm:px-6 md:px-[80px] max-w-4xl mx-auto w-full">
      {/* Hero Header */}
      <header className="text-center mb-10 md:mb-12">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
            🛡️ Privacy Vault
          </span>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-3 leading-tight tracking-tight">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="font-[var(--font-body)] text-on-surface-variant text-xs sm:text-sm font-medium">
            Last Updated: August 29, 2026
          </p>
        </ScrollReveal>
      </header>

      {/* Content */}
      <div className="space-y-8">
          {/* Section 1 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Introduction
              </h2>
              <p className="font-[var(--font-body)] text-on-surface-variant leading-relaxed">
                Welcome to VayuX Systems. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, store, and process your information when you interact with our website or services. We comply with the Digital Personal Data Protection (DPDP) Act 2023 and maintain strict data sovereignty standards.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 2 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Data We Collect
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>We collect the following types of information:</p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Identity Data:</strong> First name, last name, job title, and professional credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Contact Data:</strong> Business email, phone number, organization name, and location</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Security Data:</strong> When using our SOC, VAPT, or DFIR services, we process logs, telemetry, and security events exclusively within India-hosted infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Usage Data:</strong> Information about how you interact with our website and dashboards</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 3 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                How We Use Your Data
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>Your data is used exclusively for:</p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Service Delivery:</strong> Operating our SOC, conducting VAPT assessments, executing DFIR investigations, and maintaining GRC compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Threat Intelligence:</strong> Analyzing security patterns to improve our autonomous defense mechanisms (fully anonymized, no client identification)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Communication:</strong> Sending critical security alerts, incident reports, and compliance updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>R&D Advancement:</strong> Anonymized insights feed directly into VayuX research to improve security architectures</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 4 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Data Sovereignty & Security
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p className="font-semibold text-on-surface">Your data stays in India.</p>
                <p>
                  All security telemetry and personal data processed by VayuX is stored exclusively on private, dedicated infrastructure located within India. We do not transmit any client security logs or telemetry to international cloud services. We implement AES-256 encryption for all data at rest and in transit, with strict access controls enforced through multi-factor authentication.
                </p>
                <p>
                  In compliance with CERT-In directives, we maintain audit logs for security investigations and regulatory compliance. All infrastructure meets or exceeds ISO 27001 standards.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 5 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                DPDP Act 2023 & Data Retention
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  VayuX fully complies with the Digital Personal Data Protection Act 2023. As a Data Processor for client enterprise security logs, we retain security telemetry only as long as necessary to fulfill service commitments or as mandated by law.
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>SOC logs retained for 180 days (CERT-In mandate)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>DFIR forensic artifacts retained for 90 days post-incident</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>GRC compliance records retained for 1 year</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Website visitor data retained for 30 days</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 6 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Your Legal Rights
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  Under the DPDP Act 2023, you have the right to:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Request access to your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Request correction or deletion of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Withdraw consent for data processing (subject to service continuity requirements)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>File a grievance with our Data Protection Officer at <a href="mailto:dpo@vayux.systems" className="text-primary hover:underline">dpo@vayux.systems</a></span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 7 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Third-Party Services
              </h2>
              <p className="font-[var(--font-body)] text-on-surface-variant leading-relaxed">
                VayuX does not sell or share personal data with third parties. We may use service providers (email delivery, hosting, analytics) that process data on our behalf under strict Data Processing Agreements. All such services must comply with DPDP Act requirements and maintain equivalent security standards.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 8 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Contact Us
              </h2>
              <div className="space-y-3 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  For privacy-related inquiries, data requests, or to exercise your rights:
                </p>
                <div className="space-y-2 ml-4">
                  <p><strong>Data Protection Officer:</strong> <a href="mailto:dpo@vayux.systems" className="text-primary hover:underline">dpo@vayux.systems</a></p>
                  <p><strong>General Inquiries:</strong> <a href="mailto:admin@vayux.systems" className="text-primary hover:underline">admin@vayux.systems</a></p>
                  <p><strong>Location:</strong> Vadodara, Gujarat, India</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
    </main>
  );
}
