import GlassCard from './GlassCard';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

export default function StepCard({
  number,
  title,
  description,
  className = '',
}: StepCardProps) {
  return (
    <GlassCard className={`p-6 text-center relative bg-surface/90 ${className}`} hover={true}>
      <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-[var(--font-heading)] text-sm font-bold mx-auto mb-4 relative z-10 shadow-lg shadow-primary/20">
        {number}
      </div>
      <h3 className="font-[var(--font-heading)] text-lg font-semibold text-on-surface mb-2">
        {title}
      </h3>
      <p className="font-[var(--font-body)] text-sm text-on-surface-variant font-light leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
}
