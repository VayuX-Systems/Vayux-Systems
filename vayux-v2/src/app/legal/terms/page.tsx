'use client';

import { FileText, AlertCircle, Gavel } from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function TermsPage() {
  return (
    <main className="relative pt-28 sm:pt-36 pb-20 md:pb-32 px-4 sm:px-6 md:px-[80px] max-w-4xl mx-auto w-full">
      {/* Hero Header */}
      <header className="text-center mb-10 md:mb-12">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
            📜 Legal Vault
          </span>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-3 leading-tight tracking-tight">
            Terms of <span className="text-gradient">Service</span>
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
                <FileText className="w-6 h-6 text-primary" />
                Agreement to Terms
              </h2>
              <p className="font-[var(--font-body)] text-on-surface-variant leading-relaxed">
                By accessing our website or engaging with VayuX Systems services (including SOC Management, VAPT, DFIR, and GRC), you agree to be bound by these Terms of Service. These terms apply to all visitors, users, and clients. If you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 2 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Managed Security Services
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  VayuX provides AI-powered Security Operations Center (SOC) monitoring, Digital Forensics & Incident Response (DFIR), Vulnerability Assessment & Penetration Testing (VAPT), and Governance, Risk & Compliance (GRC) services.
                </p>
                <p className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <strong>Important:</strong> While our autonomous AI agents achieve industry-leading accuracy, filtering over 99.9% of alert noise, cybersecurity is an active, evolving field. No security service can guarantee absolute, 100% protection against all possible threat variations. You acknowledge and accept this inherent risk.
                </p>
                <p>
                  All engagements are governed by individual Master Service Agreements (MSAs) and Service Level Agreements (SLAs) tailored to your specific environment and requirements.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 3 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Intellectual Property Rights
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  All content on this website and our services—including our AI defense pipeline, proprietary security frameworks, threat detection algorithms, and autonomous response logic—remain the exclusive property of VayuX Systems and its licensors.
                </p>
                <p>
                  You may not reproduce, modify, distribute, or reverse engineer any portion of our platform without explicit written permission from VayuX Systems.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 4 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-primary" />
                Prohibited Activities
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  You agree not to use VayuX services to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Reverse engineer, decompile, or analyze our AI-SOC pipeline without authorization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Attempt to bypass security controls or access restricted systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Use the services for any illegal activities under the Information Technology Act, 2000 or successor legislation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Conduct attacks, testing, or reconnaissance against VayuX infrastructure without explicit authorization</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 5 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                AI Triage & Detection Disclaimer
              </h2>
              <p className="font-[var(--font-body)] text-on-surface-variant leading-relaxed">
                While our automated threat detection engines achieve industry-leading accuracy, cybersecurity is inherently probabilistic. All website-delivered diagnostic reports are provided for informational assessment only and do not constitute professional security advice. Production security services are always delivered under formal MSAs with defined SLAs and accuracy expectations. VayuX is not liable for missed detections, false positives, or operational gaps resulting from the inherent limitations of automated systems.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 6 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  In no event shall VayuX Systems, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>Loss of profits, revenue, or data</li>
                  <li>Loss of goodwill or business reputation</li>
                  <li>Costs of substitute services or products</li>
                  <li>Business interruption or downtime</li>
                  <li>Any other intangible losses</li>
                </ul>
                <p className="mt-4">
                  ...even if VayuX has been advised of the possibility of such damages. Your sole remedy is limited to the fees paid for the affected service period.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 7 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Compliance & Regulatory Responsibility
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  Clients are responsible for ensuring accurate environment data and compliance requirements are communicated to VayuX. While we assist in meeting CERT-In directives, DPDP Act 2023 compliance, and ISO 27001 standards, the ultimate responsibility for regulatory filing and compliance remains with the Client.
                </p>
                <p>
                  VayuX provides technical support and evidence gathering, but compliance attestation and regulatory reporting authority rests with your organization's leadership.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 8 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
                <Gavel className="w-6 h-6 text-primary" />
                Governing Law & Jurisdiction
              </h2>
              <div className="space-y-4 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of India, specifically the state of Gujarat, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these terms or your use of VayuX services shall be subject to the exclusive jurisdiction of the courts located in Vadodara, Gujarat, India.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 9 */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 border border-white/80">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
                Contact Us
              </h2>
              <div className="space-y-3 font-[var(--font-body)] text-on-surface-variant">
                <p>
                  To resolve disputes or receive clarification on these terms:
                </p>
                <div className="space-y-2 ml-4">
                  <p><strong>Email:</strong> <a href="mailto:admin@vayux.systems" className="text-primary hover:underline">admin@vayux.systems</a></p>
                  <p><strong>Address:</strong> Vadodara, Gujarat, India</p>
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
    </main>
  );
}
