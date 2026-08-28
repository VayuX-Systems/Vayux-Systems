'use client';

import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type ButtonVariant = 'glow' | 'outline' | 'text' | 'gradient';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  href?: string;
}

export default function Button({
  children,
  variant = 'glow',
  className = '',
  icon = false,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-[var(--font-heading)] text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300';

  const variants: Record<ButtonVariant, string> = {
    glow: 'btn-glow px-8 py-4 rounded-full text-on-primary shadow-xl',
    gradient: 'btn-primary-gradient px-8 py-4 rounded-full text-on-primary shadow-lg',
    outline: 'btn-outline-glass px-8 py-4 rounded-full text-on-surface',
    text: 'text-primary hover:text-primary-container border-b border-primary/20 pb-1 px-0 py-0',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}
