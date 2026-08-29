'use client';

import { Check, X, FlaskConical, ShieldAlert } from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { comparisonDimensions } from '@/lib/site-data-enhanced';

export default function ComparisonSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto bg-surface-container/30 rounded-3xl border border-outline-variant/20">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-4">
            <span className="text-gradient">VayuX Systems</span> vs. Traditional Vendors
          </h2>
          <p className="font-[var(--font-body)] text-lg text-on-surface-variant max-w-2xl mx-auto">
            Why an R&D laboratory methodology delivers superior infrastructure resilience compared to routine maintenance vendors.
          </p>
        </div>
      </ScrollReveal>

      {/* Comparison Table */}
      <ScrollReveal className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/20">
              <th className="text-left py-4 px-4 md:px-6 font-[var(--font-heading)] font-bold text-on-surface">
                Operational Dimension
              </th>
              <th className="text-left py-4 px-4 md:px-6 font-[var(--font-heading)] font-bold text-on-surface">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-on-surface-variant" />
                  Traditional Vendor
                </div>
              </th>
              <th className="text-left py-4 px-4 md:px-6 font-[var(--font-heading)] font-bold text-on-surface">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-primary" />
                  VayuX R&D Lab
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonDimensions.map((dimension, idx) => (
              <tr
                key={idx}
                className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
              >
                <td className="py-6 px-4 md:px-6 font-[var(--font-heading)] font-semibold text-on-surface">
                  {dimension.name}
                </td>
                <td className="py-6 px-4 md:px-6">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-[var(--font-heading)] font-semibold text-on-surface">
                        {dimension.mssp.text}
                      </div>
                      <div className="font-[var(--font-body)] text-sm text-on-surface-variant mt-1">
                        {dimension.mssp.sub}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4 md:px-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-[var(--font-heading)] font-semibold text-on-surface">
                        {dimension.vayux.text}
                      </div>
                      <div className="font-[var(--font-body)] text-sm text-on-surface-variant mt-1">
                        {dimension.vayux.sub}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollReveal>
    </section>
  );
}
