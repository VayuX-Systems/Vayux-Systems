import React from 'react';
import { PageId } from '../../types';
import { SERVICES_DATA } from '../../data/mockData';
import {
  ChevronRight,
  ArrowRight,
  Shield,
  Crosshair,
  Search,
  ClipboardCheck,
  GraduationCap,
  Users,
  CheckCircle2,
  PhoneCall,
  Activity,
} from 'lucide-react';

interface ServicesScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'managed-soc':
        return <Shield size={28} className="text-[var(--color-brand-light)]" />;
      case 'penetration-testing':
        return <Crosshair size={28} className="text-[var(--color-brand-light)]" />;
      case 'threat-intelligence':
        return <Search size={28} className="text-[var(--color-brand-light)]" />;
      case 'compliance-auditing':
        return <ClipboardCheck size={28} className="text-[var(--color-brand-light)]" />;
      case 'security-training':
        return <GraduationCap size={28} className="text-[var(--color-brand-light)]" />;
      case 'vciso-consulting':
        return <Users size={28} className="text-[var(--color-brand-light)]" />;
      default:
        return <Activity size={28} className="text-[var(--color-brand-light)]" />;
    }
  };

  return (
    <div className="flex flex-col w-full px-6 sm:px-8 max-w-7xl mx-auto py-8 space-y-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex text-xs font-mono text-[var(--color-text-secondary)]/70 pt-2">
        <ol className="flex items-center space-x-2">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[var(--color-brand-light)] transition-colors cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <ChevronRight size={13} />
          </li>
          <li className="text-[var(--color-brand-light)]">Services</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] text-xs font-mono">
          <span>COMPREHENSIVE CAPABILITIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Core services, one continuous loop.
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Our security capabilities are modular, but they never operate in a silo. Every service feeds data into the VayuX Loop, hardening your overall posture as threats evolve.
        </p>
      </header>

      {/* 6 Grid Service Cards */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {SERVICES_DATA.map((service) => {
          const isFlagship = service.isFlagship;

          return (
            <div
              key={service.id}
              onClick={() => {
                if (service.route) {
                  onNavigate(service.route);
                } else {
                  onOpenContact(service.title);
                }
              }}
              className={`p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer relative group ${
                isFlagship
                  ? 'border-2 border-[var(--color-brand-light)] bg-[var(--color-bg-secondary)] shadow-xl shadow-[var(--color-brand-primary)]/15 hover:shadow-2xl hover:shadow-[var(--color-brand-primary)]/25'
                  : 'border border-[var(--color-border)]/40 bg-[var(--color-bg-secondary)] hover:border-[var(--color-brand-light)]/60 hover:shadow-xl hover:shadow-[var(--color-bg-primary)]'
              }`}
            >
              {/* Flagship Badge */}
              {isFlagship && (
                <div className="absolute top-4 right-4 bg-[var(--color-brand-primary)]/25 text-[var(--color-brand-light)] text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-[var(--color-brand-light)]/40 tracking-widest uppercase">
                  Flagship
                </div>
              )}

              <div>
                <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]/40 flex items-center justify-center mb-6 group-hover:bg-[var(--color-brand-primary)]/20 group-hover:border-[var(--color-brand-light)]/40 transition-all">
                  {getServiceIcon(service.id)}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--color-brand-light)] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="border-t border-[var(--color-border)]/30 pt-4 space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-primary)]"
                    >
                      <CheckCircle2 size={14} className="text-[var(--color-brand-accent)] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--color-brand-light)] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {isFlagship ? 'Explore Architecture' : 'Request service details'}
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </main>

      {/* Consultation Banner */}
      <section className="bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-border)]/40 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Not sure what you need?
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Talk to a security engineer, not a salesperson. We'll assess your current posture and recommend the right starting point for your environment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <button
            onClick={() => onOpenContact('General Architecture Consultation')}
            className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-8 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
          >
            Request consultation
          </button>
        </div>
      </section>
    </div>
  );
};
