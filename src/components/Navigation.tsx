import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, ShieldAlert, Mail, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenContact: () => void;
  onOpenIncident: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  onOpenContact,
  onOpenIncident,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'loop', label: 'The Loop' },
    { id: 'services', label: 'Services' },
    { id: 'insights', label: 'Insights' },
    { id: 'company', label: 'Company' },
  ];

  // Dynamic header styling based on page scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-bg-secondary)]/95 backdrop-blur-md border-b border-[var(--color-brand-primary)]/20 shadow-lg shadow-black/25'
            : 'bg-[var(--color-bg-primary)]/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-8 py-3.5 max-w-7xl mx-auto w-full h-[68px]">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-brand-light)] md:hidden p-1.5 rounded hover:bg-[var(--color-bg-tertiary)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-light)]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <button
              onClick={() => handleNavClick('home')}
              className="font-bold text-2xl text-[var(--color-brand-light)] tracking-tight flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none"
            >
              <img src="/logo.png" alt="VayuX Logo" className="w-7 h-7 rounded-full object-contain drop-shadow-[0_0_8px_rgba(124,213,211,0.4)]" />
              <span className="text-[var(--color-text-primary)] font-semibold">
                Vayu<span className="text-[var(--color-brand-light)]">X</span>
              </span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-8 items-center text-xs font-semibold uppercase tracking-wider">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'services' && ['services', 'managed-soc', 'vapt', 'dfir', 'grc', 'training', 'consultation'].includes(currentPage));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 transition-colors cursor-pointer relative focus-visible:outline-2 focus-visible:outline-[var(--color-brand-light)] ${
                    isActive
                      ? 'text-[var(--color-brand-light)] font-bold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-brand-light)] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-light)] border border-[var(--color-border)] transition-all cursor-pointer focus-visible:outline-2"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} className="text-sky-600" />}
              </button>
            )}

            <button
              onClick={onOpenIncident}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-[var(--color-brand-danger)] bg-[var(--color-brand-danger-dark)]/15 border border-[var(--color-brand-danger)]/30 rounded hover:bg-[var(--color-brand-danger-dark)]/30 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-brand-danger)]"
            >
              <ShieldAlert size={14} className="text-[var(--color-brand-danger)] animate-pulse" />
              <span>24/7 Incident Dispatch</span>
            </button>

            <button
              onClick={onOpenContact}
              className="bg-[var(--color-brand-primary)] text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider hover:bg-[var(--color-brand-light)] hover:text-[#003736] transition-all duration-200 active:scale-95 shadow-sm cursor-pointer focus-visible:outline-2"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            role="navigation"
            className="md:hidden bg-[var(--color-bg-secondary)] border-b border-[var(--color-brand-primary)]/20 px-6 py-4 space-y-4 relative z-50 animate-in slide-in-from-top duration-300"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left py-2 text-sm font-semibold tracking-wide ${
                  currentPage === 'home' ? 'text-[var(--color-brand-light)]' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                Overview (Home)
              </button>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 text-sm font-semibold tracking-wide ${
                    currentPage === item.id ||
                    (item.id === 'services' && currentPage === 'managed-soc')
                      ? 'text-[var(--color-brand-light)]'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--color-text-muted)]/20 flex flex-col gap-2">
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="w-full py-2 px-3 text-xs font-semibold rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-sky-600" />}
                    <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono text-[var(--color-brand-light)]">Switch</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenIncident();
                }}
                className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-brand-danger)] bg-[var(--color-brand-danger-dark)]/20 border border-[var(--color-brand-danger)]/30 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldAlert size={16} className="animate-pulse" />
                <span>Emergency Incident Line</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Dimmed Scroll-Blocking Backdrop for Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[68px] bg-black/60 backdrop-blur-sm z-40 md:hidden select-none animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Fixed Mobile Bottom Bar (iOS Notch Safe Spacing) */}
      <nav
        className="bg-[#12202c] fixed bottom-0 left-0 right-0 w-full z-50 md:hidden border-t border-[var(--color-brand-primary)]/10 shadow-2xl px-6 flex justify-around items-center"
        style={{
          height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <button
          onClick={onOpenContact}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] flex flex-col items-center gap-1 active:scale-95 transition-all text-[11px] font-semibold uppercase tracking-wider cursor-pointer"
        >
          <Mail size={18} />
          <span>Contact Us</span>
        </button>

        <button
          onClick={onOpenIncident}
          className="bg-[var(--color-brand-light)] text-[#003736] px-4 py-2 rounded-xl flex flex-col items-center gap-0.5 active:scale-95 transition-all shadow-lg font-bold text-[10px] uppercase tracking-wider cursor-pointer"
        >
          <ShieldAlert size={16} />
          <span>Incident Response</span>
        </button>
      </nav>
    </>
  );
};
