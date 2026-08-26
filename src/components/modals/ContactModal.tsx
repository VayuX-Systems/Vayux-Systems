import React, { useState, useEffect } from 'react';
import { X, Mail, Building2, CheckCircle, ChevronRight, Zap } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'General Inquiry',
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState(defaultService);
  const [endpoints, setEndpoints] = useState('500 - 2,500 endpoints');
  const [message, setMessage] = useState('');
  const [refId, setRefId] = useState('');

  // Reset form when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setName('');
      setEmail('');
      setCompany('');
      setServiceType(defaultService);
      setEndpoints('500 - 2,500 endpoints');
      setMessage('');
      setRefId('');
    }
  }, [isOpen, defaultService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRefId(`VX-REQ-${String(100000 + Math.floor(Math.random() * 900000))}`);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl w-full max-w-2xl my-4 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)] px-4 sm:px-8 py-4 sm:py-6 border-b border-[var(--color-border)]/30 flex items-start justify-between gap-3">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[var(--color-brand-light)]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">Security Inquiry</h2>
                <p className="text-xs font-mono text-[var(--color-text-secondary)] mt-0.5 truncate">Engineering consultation</p>
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
            {/* Form Content - Scrollable */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto hide-scrollbar">
              {/* Section 1: Contact Information */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 text-xs font-bold text-[var(--color-brand-light)] flex-shrink-0">
                    1
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Your Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pl-8">
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Taylor Vance"
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="taylor@company.com"
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Service & Scope */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 text-xs font-bold text-[var(--color-brand-light)] flex-shrink-0">
                    2
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Service & Scope</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pl-8">
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Service Interest *
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Managed SOC">Managed SOC</option>
                      <option value="VAPT">VAPT / Penetration Testing</option>
                      <option value="DFIR">DFIR / Incident Response</option>
                      <option value="GRC">GRC & Advisory</option>
                      <option value="Security Training">Security Training</option>
                      <option value="vCISO Consulting">vCISO Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                      Organization Size
                    </label>
                    <select
                      value={endpoints}
                      onChange={(e) => setEndpoints(e.target.value)}
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 sm:px-4 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all"
                    >
                      <option value="< 100 endpoints">Under 100</option>
                      <option value="100 - 500 endpoints">100 - 500</option>
                      <option value="500 - 2,500 endpoints">500 - 2,500</option>
                      <option value="2,500 - 10,000 endpoints">2,500 - 10,000</option>
                      <option value="10,000+ endpoints">10,000+</option>
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Message */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 text-xs font-bold text-[var(--color-brand-light)] flex-shrink-0">
                    3
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Message</h3>
                </div>

                <div className="pl-8">
                  <label className="block text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-widest mb-1.5 sm:mb-2">
                    Tell us about your needs
                  </label>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2 sm:mb-3">
                    Help us understand your security challenges and what matters most.
                  </p>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Example: We need SOC monitoring for 24/7 threat detection..."
                    className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg p-3 text-sm text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-brand-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-light)]/20 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-[var(--color-brand-primary)]/5 border border-[var(--color-brand-primary)]/20 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 pl-8">
                <Zap size={14} className="text-[var(--color-brand-light)] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[var(--color-text-secondary)]">
                  <p className="font-semibold text-white mb-0.5 sm:mb-1">Quick Response</p>
                  <p>Our team reviews inquiries within 24 hours.</p>
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
                className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20 whitespace-nowrap"
              >
                <span>Submit</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State - Scrollable */}
            <div className="p-4 sm:p-8 sm:p-12 text-center space-y-4 sm:space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
              {/* Success Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--color-brand-light)]/20 text-[var(--color-brand-light)] flex items-center justify-center mx-auto">
                <CheckCircle size={40} className="sm:w-12 sm:h-12" />
              </div>

              {/* Success Message */}
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Inquiry Received</h3>
                <p className="text-xs font-mono text-[var(--color-brand-light)] tracking-widest">SECURITY TEAM NOTIFIED</p>
              </div>

              {/* Reference Card */}
              <div className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-border)]/40 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 text-left">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-[var(--color-border)]/30 gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">Reference ID</span>
                    <span className="text-base sm:text-lg font-bold text-[var(--color-brand-light)] font-mono truncate">{refId}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-[var(--color-border)]/30 gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">Contact</span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate">{email}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 gap-2">
                    <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase">Service</span>
                    <span className="text-xs sm:text-sm font-semibold text-[var(--color-brand-light)] truncate">{serviceType}</span>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3 sm:p-4 text-left space-y-2">
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  Thank you, <span className="font-semibold text-white">{name}</span>. Our team will review your inquiry and contact you within 24 hours.
                </p>
                <div className="bg-[var(--color-bg-primary)] rounded p-2.5 sm:p-3 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)]/30 space-y-1">
                  <p className="font-semibold text-white mb-1 text-xs">Next Steps:</p>
                  <p>→ Team review and scope analysis</p>
                  <p>→ Initial discovery call</p>
                  <p>→ Customized proposal</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20 rounded-lg p-3 sm:p-4 text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Building2 size={13} className="flex-shrink-0" />
                  <span>Need Help?</span>
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] text-center sm:text-left">
                  Contact: <span className="font-mono text-[var(--color-brand-light)] block sm:inline">inquiries@vayuxsystems.com</span>
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-full bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
