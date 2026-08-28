'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { navLinks } from '@/lib/site-data';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-surface/90 backdrop-blur-2xl border-outline-variant/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
            : 'bg-surface/70 backdrop-blur-xl border-outline-variant/10'
        }`}
      >
        <div className="flex justify-between items-center px-5 md:px-[80px] py-4 md:py-5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo-light.png"
              alt="VayuX Systems"
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="font-[var(--font-heading)] text-xl md:text-2xl font-bold tracking-tight text-on-surface">
              VayuX Systems
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-[var(--font-heading)] uppercase tracking-[0.1em] text-xs transition-colors duration-300 py-1 ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
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
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-[var(--font-heading)] text-2xl uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="btn-glow px-8 py-4 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-sm flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <ShieldCheck className="w-5 h-5" />
                  Secure Portal
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
