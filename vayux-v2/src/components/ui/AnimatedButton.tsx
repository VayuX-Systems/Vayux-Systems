'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles = 'relative font-[var(--font-heading)] font-semibold uppercase tracking-wide transition-all duration-300 overflow-hidden rounded-lg';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container',
    secondary: 'bg-secondary text-on-secondary hover:bg-secondary-container',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 border border-primary/30',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  };

  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  const buttonContent = (
    <motion.button
      className={buttonClasses}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Ripple Effect on Click */}
      <motion.span
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-center w-1 h-1 bg-white/30 rounded-full pointer-events-none"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Hover Glow Background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={!disabled ? { opacity: 0.1 } : {}}
        className="absolute inset-0 bg-white/20 pointer-events-none"
      />
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}
