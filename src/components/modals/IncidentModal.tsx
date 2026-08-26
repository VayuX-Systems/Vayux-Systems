import React, { useState, useEffect } from 'react';
import { X, AlertOctagon, Phone, Shield, CheckCircle, ChevronRight, Clock, Briefcase } from 'lucide-react';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [incidentType, setIncidentType] = useState('Active Ransomware / Extortion');
  const [severity, setSeverity] = useState('Critical (Severity 1)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [incidentTicket, setIncidentTicket] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setIncidentType('Active Ransomware / Extortion');
      setSeverity('Critical (Severity 1)');
      setName('');
      setEmail('');
      setPhone('');
      setDetails('');
      setIncidentTicket('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIncidentTicket(`#INC-${String(10000 + Math.floor(Math.random() * 90000))}`);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl w-full max-w-2xl my-4 shadow-2xl relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#14212b] to-[#1a2a35] px-4 sm:px-8 py-4 sm:py-6 border-b border-[var(--color-border)]/30 flex items-start justify-between gap-3">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-brand-danger)]/20 border border-[var(--color-brand-danger)]/40 flex items-center justify-center flex-shrink-0">
                <AlertOctagon size={18} className="text-[var(--color-brand-danger)]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">Emergency Incident Report</h2>
                <p className="text-xs font-mono text-[var(--color-text-secondary)] mt-0.5 truncate">15-Min Guaranteed Response</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-[var(--color-text-secondary)] hover:text-white p-1.5 sm:p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {step === 'form' ? (
          <>
            {/* Emergency Hotline Banner */}
            <div className="bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)]/30 px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Phone size={16} className="text-[var(--color-brand-light)] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-mono text-[var(--color-text-secondary)] truncate">24/7 Emergency Hotline</p>
                  <p className="text-sm font-bold text-white font-mono truncate">+1 (800) 555-0199</p>
                </div>
              </div>
              <a
                href="tel:18005550199"
                className="text-xs font-bold text-white bg-[var(--color-brand-danger)] hover:bg-[#ffb4ab] hover:text-white px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap"
              >
                <Phone size={13} />
                CALL
              </a>
            </div>

            {/* Form Content - Scrollable */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto hide-scrollbar">
              {/* Section 1: Contact Information */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 text-xs font-bold text-[var(--color-brand-light)] flex-shrink-0">
                    1
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Contact Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pl-8">
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Security Lead"
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Direct Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Incident Classification */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 text-xs font-bold text-[var(--color-brand-light)] flex-shrink-0">
                    2
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Incident Classification</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pl-8">
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Incident Type *
                    </label>
                    <select
                      value={incidentType}
                      onChange={(e) => setIncidentType(e.target.value)}
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    >
                      <option value="Active Ransomware / Extortion">Active Ransomware / Extortion</option>
                      <option value="Active Intrusion / Lateral Movement">Active Intrusion / Lateral Movement</option>
                      <option value="Data Exfiltration in Progress">Data Exfiltration in Progress</option>
                      <option value="Cloud Infrastructure Compromise">Cloud Infrastructure Compromise</option>
                      <option value="Zero-Day Vulnerability Exploitation">Zero-Day Vulnerability Exploitation</option>
                      <option value="Supply Chain Attack">Supply Chain Attack</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Severity Level *
                    </label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    >
                      <option value="Critical (Severity 1) - Outage / Active Breach">Critical (Severity 1) - Outage / Active Breach</option>
                      <option value="High (Severity 2) - Isolated Host Compromise">High (Severity 2) - Isolated Host Compromise</option>
                      <option value="Medium (Severity 3) - Suspicious IOCs Detected">Medium (Severity 3) - Suspicious IOCs Detected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Incident Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 text-xs font-bold text-[var(--color-brand-light)] flex-shrink-0">
                    3
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Incident Details</h3>
                </div>

                <div className="pl-8">
                  <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                    Observed Artifacts & Scope *
                  </label>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2 sm:mb-3">
                    Include affected domains, file extensions, suspicious IPs, beacon intervals...
                  </p>
                  <textarea
                    rows={3}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Example: Files encrypted with .vayux extension, C2 beacon to 185.220.101.45..."
                    className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg p-3 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-[var(--color-brand-primary)]/5 border border-[var(--color-brand-primary)]/20 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 pl-8">
                <Shield size={14} className="text-[var(--color-brand-light)] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[var(--color-text-secondary)]">
                  <p className="font-semibold text-white mb-0.5 sm:mb-1">Chain of Custody Protected</p>
                  <p>Your incident information is encrypted and timestamped.</p>
                </div>
              </div>
            </form>

            {/* Submit Button - Sticky */}
            <div className="sticky bottom-0 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]/30 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 sm:px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[var(--color-brand-danger)] hover:bg-[#ffb4ab] hover:text-white text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-danger)]/20 whitespace-nowrap"
              >
                <AlertOctagon size={14} />
                <span>Dispatch</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State - Scrollable */}
            <div className="p-4 sm:p-8 sm:p-12 text-center space-y-4 sm:space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
              {/* Success Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#71dba2]/20 text-[#71dba2] flex items-center justify-center mx-auto">
                <CheckCircle size={40} className="sm:w-12 sm:h-12" />
              </div>

              {/* Ticket Information */}
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Incident Report Received</h3>
                <p className="text-xs font-mono text-[var(--color-brand-light)] tracking-widest">DFIR TEAM MOBILIZING</p>
              </div>

              {/* Ticket Card */}
              <div className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-border)]/40 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 text-left">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-[var(--color-border)]/30 gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">Ticket ID</span>
                    <span className="text-base sm:text-lg font-bold text-[var(--color-brand-light)] font-mono truncate">{incidentTicket}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-[var(--color-border)]/30 gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">Contact</span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate">{name}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-[var(--color-border)]/30 gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">Phone</span>
                    <span className="text-xs sm:text-sm font-mono text-[var(--color-brand-light)] truncate">{phone}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">SLA</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#71dba2] flex-shrink-0">
                      <Clock size={12} />
                      <span>&lt; 4 HRS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3 sm:p-4 text-left space-y-2">
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  Specialists are initiating containment. A senior analyst will contact <span className="font-semibold text-white">{phone}</span> within 4 hours.
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--color-brand-light)] font-mono">
                  <Phone size={11} className="flex-shrink-0" />
                  <span className="truncate">+1 (800) 555-0199</span>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20 rounded-lg p-3 sm:p-4 text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Briefcase size={13} className="flex-shrink-0" />
                  <span>What to Expect</span>
                </h4>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-brand-light)] flex-shrink-0">→</span>
                    <span>Containment strategy within 4 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-brand-light)] flex-shrink-0">→</span>
                    <span>Real-time forensic updates via call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-brand-light)] flex-shrink-0">→</span>
                    <span>Chain-of-custody preserved</span>
                  </li>
                </ul>
              </div>

              {/* Close Button */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                <button
                  onClick={handleClose}
                  className="flex-1 w-full bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Acknowledge
                </button>
                <a
                  href="tel:18005550199"
                  className="flex-1 w-full bg-[var(--color-brand-danger)] hover:bg-[#ffb4ab] hover:text-white text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Phone size={13} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
