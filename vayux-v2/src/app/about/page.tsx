import Image from 'next/image';
import { Eye, Shield, Heart, FlaskConical } from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Dribbble3DCard from '@/components/animations/Dribbble3DCard';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import { teamMembers, aboutFAQ } from '@/lib/site-data';

export const metadata = {
  title: 'About Us | VayuX Systems',
  description:
    'Transparent, Protective Stewardship. We operate at the intersection of advanced engineering and strategic defense.',
};

export default function AboutPage() {
  const iconMap = {
    Transparency: Eye,
    'Structural Resilience': Shield,
    'Proactive Care': Heart,
    'Scientific Rigor': FlaskConical,
  };

  const corePrinciples = [
    {
      title: 'Transparency',
      description:
        'Clarity in operation. We believe that true security is built on a foundation of observable, verifiable processes rather than obscured complexity.',
    },
    {
      title: 'Structural Resilience',
      description:
        'Architecture designed to withstand and adapt. Our defense grids are dynamic, absorbing impact and emerging stronger through iterative learning algorithms.',
    },
    {
      title: 'Proactive Care',
      description:
        'Anticipation over reaction. We deploy predictive models to neutralize vulnerabilities before they manifest, acting as an unseen, benevolent guardian.',
    },
    {
      title: 'Scientific Rigor',
      description:
        'Empirical validation at every layer. Our protocols are subjected to exhaustive, peer-reviewed testing within controlled adversarial environments.',
    },
  ];

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-5 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* Hero Section */}
      <section className="py-10 md:py-16 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6 bg-clip-text text-transparent bg-gradient-to-r from-on-surface via-primary to-secondary-container leading-[1.15]">
            Transparent, Protective Stewardship.
          </h1>
          <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-light">
            We operate at the intersection of advanced engineering and strategic defense. Our mission is to provide unassailable protection through systems that are as elegant as they are impenetrable, fostering an environment of ultimate trust and security.
          </p>
        </ScrollReveal>
      </section>

      {/* Core Principles Grid */}
      <section className="py-16 md:py-24 bg-surface-container-low rounded-3xl p-6 sm:p-10 md:p-16 relative overflow-hidden mb-24 md:mb-36">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <SectionHeading
            center
            gradient
            title="Core Principles"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {corePrinciples.map((principle, idx) => {
              const IconComponent = iconMap[principle.title as keyof typeof iconMap] || Shield;
              return (
                <ScrollReveal key={principle.title} delay={idx * 0.1}>
                  <Dribbble3DCard depth={20} className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-6 shadow-sm border border-outline-variant/30 text-primary">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-bold mb-3 text-on-surface">
                      {principle.title}
                    </h3>
                    <p className="font-[var(--font-body)] text-sm md:text-base text-on-surface-variant font-light leading-relaxed">
                      {principle.description}
                    </p>
                  </Dribbble3DCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section — Architects of Protection */}
      <section className="py-12 md:py-24 mb-24 md:mb-36">
        <SectionHeading
          center
          title="Architects of Protection"
          subtitle="The visionary minds behind the Nexus framework."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, idx) => (
            <ScrollReveal key={member.name} delay={idx * 0.15}>
              <div className="group relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-fixed-dim to-secondary-container rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition duration-700 pointer-events-none" />
                <Dribbble3DCard depth={25} className="rounded-[2rem] p-8 h-full flex flex-col items-center text-center">
                  <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-surface shadow-md relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-on-surface mb-1">
                    {member.name}
                  </h3>
                  <p className="font-[var(--font-heading)] text-xs md:text-sm text-secondary tracking-widest uppercase mb-4 font-semibold">
                    {member.role}
                  </p>
                  <p className="font-[var(--font-body)] text-sm md:text-base text-on-surface-variant font-light leading-relaxed">
                    {member.bio}
                  </p>
                </Dribbble3DCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-12 md:py-24 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal>
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-6">
              Leadership Philosophy
            </h2>
            <p className="font-[var(--font-body)] text-base sm:text-lg text-on-surface-variant mb-6 font-light leading-relaxed">
              At VayuX Systems, our leadership is driven by the conviction that true security stems from clarity and ethical stewardship. We believe in empowering our teams to innovate responsibly, ensuring that our defense mechanisms are as transparent in their operation as they are impenetrable in their structure.
            </p>
            <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
              We foster a culture of continuous learning and rigorous peer review. By challenging our own assumptions and inviting external scrutiny, we maintain the highest standards of scientific rigor and operational excellence.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard className="p-8 sm:p-10 rounded-[2rem] border-l-4 border-l-primary" hover={false}>
              <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-medium text-on-surface mb-4 leading-relaxed italic">
                &ldquo;Security without transparency is merely obscured vulnerability. We build trust through verifiable resilience.&rdquo;
              </h3>
              <p className="font-[var(--font-heading)] text-xs sm:text-sm text-primary tracking-widest uppercase font-bold">
                — Executive Board
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Operational Transparency FAQ */}
      <section className="py-16 md:py-24 bg-surface-container-low rounded-3xl p-6 sm:p-10 md:p-16 mb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            center
            gradient
            title="Operational Transparency FAQ"
          />
          <ScrollReveal>
            <FAQ items={aboutFAQ} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
