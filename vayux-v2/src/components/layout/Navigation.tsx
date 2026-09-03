'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  BookOpen,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [insightsDropdown, setInsightsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setInsightsDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setInsightsDropdown(false);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          // Scrolling down
          setVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          // Scrolling up
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
    setInsightsDropdown(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const insightsDropdownItems = [
    {
      title: 'Research & Whitepapers',
      desc: 'Technical threat research, SOC telemetry & deep architectures',
      href: '/insights',
      icon: BookOpen,
    },
    {
      title: 'Careers & Fellowship',
      desc: 'Recruiting engineers, researchers & fellowship cohorts',
      href: '/careers',
      icon: Briefcase,
    },
    {
      title: 'Cyber Glossary',
      desc: 'Enterprise security definitions & threat taxonomy',
      href: '/glossary',
      icon: Layers,
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible || isOpen ? 0 : -110 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-colors duration-500 border-b ${
          scrolled
            ? 'bg-surface/90 backdrop-blur-2xl border-outline-variant/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
            : 'bg-surface/70 backdrop-blur-xl border-outline-variant/10'
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-[80px] py-4 md:py-5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo-light.png"
              alt="VayuX Systems"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="font-[var(--font-heading)] text-xl md:text-2xl font-bold tracking-tight text-on-surface">
              VayuX Systems
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            <Link
              href="/"
              className={`relative font-[var(--font-heading)] uppercase tracking-[0.1em] text-xs transition-colors duration-300 py-1 ${
                pathname === '/'
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Home
              {pathname === '/' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>

            <Link
              href="/about"
              className={`relative font-[var(--font-heading)] uppercase tracking-[0.1em] text-xs transition-colors duration-300 py-1 ${
                pathname === '/about'
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              About Us
              {pathname === '/about' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>

            <Link
              href="/solutions"
              className={`relative font-[var(--font-heading)] uppercase tracking-[0.1em] text-xs transition-colors duration-300 py-1 ${
                pathname.startsWith('/solutions')
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Solutions
              {pathname.startsWith('/solutions') && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>

            {/* Insights Dropdown with Careers */}
            <div
              className="relative py-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`relative font-[var(--font-heading)] uppercase tracking-[0.1em] text-xs transition-colors duration-300 flex items-center gap-1.5 ${
                  pathname.startsWith('/insights') ||
                  pathname.startsWith('/careers') ||
                  pathname.startsWith('/glossary')
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span>Insights &amp; Lab</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    insightsDropdown ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {insightsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-84 mt-3 p-2.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#070b16] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,168,255,0.18)] z-50"
                  >
                    <div className="space-y-1">
                      {insightsDropdownItems.map((item) => {
                        const Icon = item.icon;
                        const isItemActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-all group ${
                              isItemActive
                                ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30'
                                : 'hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={`font-[var(--font-heading)] text-xs font-bold transition-colors ${
                                    isItemActive
                                      ? 'text-primary'
                                      : 'text-slate-900 dark:text-white group-hover:text-primary'
                                  }`}
                                >
                                  {item.title}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light mt-0.5 line-clamp-1">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className={`relative font-[var(--font-heading)] uppercase tracking-[0.1em] text-xs transition-colors duration-300 py-1 ${
                pathname === '/contact'
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Contact
              {pathname === '/contact' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* Desktop Actions (ThemeToggle + CTA) */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-glow px-6 py-2.5 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-xs items-center gap-2 flex"
            >
              <ShieldCheck className="w-4 h-4" />
              Secure Portal
            </Link>
          </div>

          {/* Mobile Right Controls (ThemeToggle + Hamburger) */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-full gap-6 py-24 px-6 text-center">
              <Link
                href="/"
                className={`font-[var(--font-heading)] text-xl font-bold uppercase tracking-widest ${
                  pathname === '/' ? 'text-primary' : 'text-on-surface'
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`font-[var(--font-heading)] text-xl font-bold uppercase tracking-widest ${
                  pathname === '/about' ? 'text-primary' : 'text-on-surface'
                }`}
              >
                About Us
              </Link>
              <Link
                href="/solutions"
                className={`font-[var(--font-heading)] text-xl font-bold uppercase tracking-widest ${
                  pathname.startsWith('/solutions') ? 'text-primary' : 'text-on-surface'
                }`}
              >
                Solutions
              </Link>
              <Link
                href="/insights"
                className={`font-[var(--font-heading)] text-xl font-bold uppercase tracking-widest ${
                  pathname === '/insights' ? 'text-primary' : 'text-on-surface'
                }`}
              >
                Research &amp; Insights
              </Link>
              <Link
                href="/careers"
                className={`font-[var(--font-heading)] text-xl font-bold uppercase tracking-widest ${
                  pathname === '/careers' ? 'text-primary' : 'text-on-surface'
                }`}
              >
                Careers &amp; Fellowship
              </Link>
              <Link
                href="/glossary"
                className={`font-[var(--font-heading)] text-xl font-bold uppercase tracking-widest ${
                  pathname === '/glossary' ? 'text-primary' : 'text-on-surface'
                }`}
              >
                Glossary
              </Link>
              <Link
                href="/contact"
                className={`font-[var(--font-heading)] text-xl font-bold uppercase tracking-widest ${
                  pathname === '/contact' ? 'text-primary' : 'text-on-surface'
                }`}
              >
                Contact Nexus
              </Link>

              <div className="mt-6 w-full max-w-xs">
                <Link
                  href="/contact"
                  className="btn-glow w-full py-3.5 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-xs inline-flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Secure Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
