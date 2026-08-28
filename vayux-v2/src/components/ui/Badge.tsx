import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle';
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary-container/20 text-on-secondary-container border border-secondary-container/30',
    outline: 'bg-white/50 backdrop-blur-md text-primary border border-primary/20 shadow-sm',
    subtle: 'bg-surface-container text-on-surface-variant border border-outline-variant/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-[var(--font-heading)] text-[11px] md:text-xs font-bold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
