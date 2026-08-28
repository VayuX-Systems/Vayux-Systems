'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-8 right-8 z-40 hidden md:block animate-float">
      <Link
        href="/contact"
        className="btn-glow flex items-center gap-3 px-5 py-3.5 rounded-full text-white shadow-2xl group border border-white/20 backdrop-blur-md hover:scale-105 transition-transform duration-300"
      >
        <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="font-[var(--font-heading)] uppercase tracking-widest text-xs font-bold">
          Secure Inquiry
        </span>
      </Link>
    </div>
  );
}
