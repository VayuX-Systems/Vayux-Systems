import React, { useState, useEffect } from 'react';
import { JobOpening } from '../../types';
import { X, CheckCircle, Briefcase, MapPin, Send } from 'lucide-react';

interface JobApplicationModalProps {
  job: JobOpening | null;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Reset form when job changes or closes
  useEffect(() => {
    if (!job) {
      setName('');
      setEmail('');
      setLinkedin('');
      setPortfolio('');
      setNotes('');
      setSubmitted(false);
    }
  }, [job]);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--color-border)]/30 bg-[var(--color-bg-primary)]">
          <div>
            <h3 className="text-lg font-bold text-white">{job.title}</h3>
            <div className="flex items-center gap-3 text-xs text-[var(--color-brand-light)] font-mono mt-0.5">
              <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-text-secondary)] hover:text-white p-1 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)] flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <h4 className="text-xl font-bold text-white">Application Received</h4>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[var(--color-brand-light)] font-semibold">{name}</span>. Our Engineering Hiring Committee reviews all candidate code samples and security challenges within 3 business days.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)]/30 space-y-2">
              <p className="text-xs text-[var(--color-text-secondary)]">{job.description}</p>
              <div className="text-[11px] font-mono text-[var(--color-brand-light)]">
                Requirements: {job.requirements.join(' • ')}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--color-brand-light)] mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Taylor Vance"
                  className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--color-brand-light)] mb-1">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="taylor@domain.com"
                  className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--color-brand-light)] mb-1">
                  GITHUB / CV / REPO LINK
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--color-brand-light)] mb-1">
                  LINKEDIN PROFILE
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--color-brand-light)] mb-1">
                ENGINEERING EXPERTISE & NOTABLE CVEs/PROJECTS
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe systems you've secured, offensive tooling you've built, or research published..."
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg p-3 text-sm text-white focus:border-[var(--color-brand-light)] focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send size={14} />
                <span>Submit Application</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
