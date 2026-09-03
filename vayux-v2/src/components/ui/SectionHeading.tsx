interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  gradient?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  center = false,
  className = '',
  gradient = false,
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center' : ''} mb-6 sm:mb-10 md:mb-16 ${className}`}>
      {label && (
        <span className="inline-block font-[var(--font-heading)] text-primary tracking-[0.2em] uppercase mb-2 sm:mb-4 text-xs sm:text-sm font-bold">
          {label}
        </span>
      )}
      <h2
        className={`font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2.5 sm:mb-6 ${
          gradient ? 'text-gradient' : 'text-on-surface'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-[var(--font-body)] text-xs sm:text-base md:text-xl text-on-surface-variant font-light leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
          {subtitle}
        </p>
      )}
      {gradient && (
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary-container mx-auto rounded-full mt-3 sm:mt-6" />
      )}
    </div>
  );
}
