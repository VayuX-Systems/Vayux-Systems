import React, { useState } from 'react';
import { PageId } from '../types';
import { Shield, AlertTriangle, RefreshCw, X } from 'lucide-react';
import { VayuXLogo } from './VayuXLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: () => void;
  onOpenIncident: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenContact,
  onOpenIncident,
}) => {
  const [governanceModal, setGovernanceModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] w-full mt-auto relative overflow-hidden pb-20 md:pb-0">
        {/* Background Watermark */}
        <div className="absolute -bottom-24 -right-24 opacity-[0.03] pointer-events-none text-[var(--color-brand-primary)]">
          <RefreshCw size={360} className="animate-spin-slow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 sm:px-8 py-16 max-w-7xl mx-auto relative z-10">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div
              onClick={() => handleNav('home')}
              className="cursor-pointer flex items-center gap-2 group"
            >
              <VayuXLogo size="md" glow={true} />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              © {new Date().getFullYear()} VayuX Systems. Engineering-Grade Security.
            </p>
            <div className="text-xs font-mono text-[var(--color-brand-light)] pt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] animate-pulse" />
              <span>Verifiable Models • Autonomous Defense</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col gap-2.5 text-xs font-semibold uppercase tracking-wider">
            <span className="text-white mb-2 font-bold tracking-widest text-[#DCDCDF]">Platform</span>
            <button
              onClick={() => handleNav('loop')}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              The Loop
            </button>
            <button
              onClick={() => handleNav('services')}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNav('managed-soc')}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              Managed SOC (Flagship)
            </button>
            <button
              onClick={() => handleNav('insights')}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              Insights & Research
            </button>
          </div>

          {/* Corporate & Support */}
          <div className="flex flex-col gap-2.5 text-xs font-semibold uppercase tracking-wider">
            <span className="text-white mb-2 font-bold tracking-widest text-[#DCDCDF]">Company</span>
            <button
              onClick={() => handleNav('company')}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              About & Team
            </button>
            <button
              onClick={onOpenContact}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              Contact Details
            </button>
            <button
              onClick={onOpenIncident}
              className="text-left text-[var(--color-brand-danger)] hover:text-white transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle size={14} className="text-[var(--color-brand-danger)]" />
              <span>Emergency Hotline</span>
            </button>
          </div>

          {/* Legal & Compliance */}
          <div className="flex flex-col gap-2.5 text-xs font-semibold uppercase tracking-wider">
            <span className="text-white mb-2 font-bold tracking-widest text-[#DCDCDF]">Governance</span>
            <button
              onClick={() => setGovernanceModal('privacy')}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setGovernanceModal('terms')}
              className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors py-1 cursor-pointer"
            >
              Terms of Service
            </button>
            <div className="mt-3 p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <div className="text-[11px] text-[var(--color-brand-light)] flex items-center gap-1.5 font-mono">
                <Shield size={12} className="text-[var(--color-brand-primary)]" />
                <span>SOC2 Type II Certified</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Governance Modal */}
      {governanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
              <h3 className="text-lg font-semibold text-white">
                {governanceModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button
                onClick={() => setGovernanceModal(null)}
                className="text-[var(--color-text-secondary)] hover:text-white p-1 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {governanceModal === 'privacy' ? (
                <>
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Data Sovereignty & Compliance</h4>
                    <p>
                      VayuX Systems complies with global data sovereignty standards, including DPDP Act 2023, GDPR, and ISO/IEC 27001. All customer data is encrypted at rest and in transit using industry-standard cryptographic protocols.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Data Processing</h4>
                    <p>
                      We process security telemetry and incident data only for the explicit purposes of threat detection, remediation, and improving our defense mechanisms. Data is never shared with third parties without explicit customer consent.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Retention Policy</h4>
                    <p>
                      Incident logs and forensic data are retained for a minimum of 7 years to support regulatory requirements and enable historical threat analysis. Customers retain full control over data deletion and archival.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Your Rights</h4>
                    <p>
                      You have the right to access, modify, export, or delete your data at any time. Submit data requests to privacy@vayuxsystems.com and we will respond within 30 days.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Service Level Agreement (SLA)</h4>
                    <p>
                      VayuX guarantees a 15-minute active containment SLA for Critical (Severity 1) incidents, backed by financial service credits. Managed SOC services include 24/7 monitoring, high-fidelity alert validation, and rapid threat neutralization.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Master Services Agreement</h4>
                    <p>
                      Our MSA outlines the terms of engagement, including scope of services, pricing, payment terms, and dispute resolution. All services are provided on an "as-is" basis with reasonable efforts to maintain uptime and service quality.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Uptime Guarantee</h4>
                    <p>
                      We guarantee 99.9% uptime for Managed SOC services measured on a monthly basis. Planned maintenance is scheduled during low-traffic periods and communicated in advance.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Liability Limitations</h4>
                    <p>
                      VayuX liability is limited to the total amount paid by the customer in the 12 months preceding the claim. We are not liable for indirect, consequential, or punitive damages.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Term & Termination</h4>
                    <p>
                      Agreements are for a minimum of 12 months with automatic renewal. Either party may terminate with 30 days written notice. Upon termination, all customer data is securely deleted within 30 days unless otherwise required by law.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] px-6 py-4 flex justify-end">
              <button
                onClick={() => setGovernanceModal(null)}
                className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-6 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
