import type { ReactNode } from 'react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp, landingSlideUpDelay } from '@/lib/animations';
import { ReadOnlyAnimation } from '@/components/cj-website/trust-security/ReadOnlyAnimation';
import { PrivateByDefaultAnimation } from '@/components/cj-website/trust-security/PrivateByDefaultAnimation';
import { DeleteAnytimeAnimation } from '@/components/cj-website/trust-security/DeleteAnytimeAnimation';
import { NoIdentifiersAnimation } from './NoIdentifiersAnimation';

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-4 overflow-hidden rounded-[24px] p-8"
      style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex flex-col gap-2">
        <p className="font-inter-tight text-[20px] leading-[150%] font-medium text-white sm:text-[24px]">
          {title}
        </p>
        <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white/70 sm:text-[16px]">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export default function DataStaysYours() {
  return (
    <section className="relative section-shell section-pad">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full opacity-70 blur-[100px]"
        style={{
          width: 335,
          height: 304,
          background: '#5D80FF',
          right: '35%',
          top: '0%',
          transform: 'rotate(75deg)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-[60px]">
        {/* Header */}
        <DirectionalReveal
          variants={landingSlideUp}
          className="flex max-w-[507px] flex-col items-center gap-4 text-center"
        >
          <span
            className="inline-flex items-center rounded-[8px] border border-white/[0.05] px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
            }}
          >
            Trust &amp; security
          </span>

          <h2 className="font-inter-tight text-[40px] leading-[100%] font-normal text-white sm:text-[48px]">
            Your data stays yours.
          </h2>

          <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            Clearquant AI only ever sees what you&apos;ve already chosen to log. Nothing more.
          </p>
        </DirectionalReveal>

        {/* 2×2 card grid */}
        <DirectionalReveal
          variants={landingSlideUpDelay}
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
        >
          <Card
            title="Read-only access"
            description="API keys are read-only. Clearquant AI can never place trades or move funds."
          >
            <ReadOnlyAnimation />
          </Card>

          <Card
            title="Private by default"
            description="Your trade history and insights are never shared or used to train models for other users."
          >
            <PrivateByDefaultAnimation />
          </Card>

          <Card
            title="Delete anytime"
            description="Disconnect any exchange or wallet and your synced data is removed immediately."
          >
            <DeleteAnytimeAnimation />
          </Card>

          <Card
            title="No identifiers exposed"
            description={`ClearQuant talks about "your account" and "your trades" never raw IDs, emails, or data.`}
          >
            <NoIdentifiersAnimation />
          </Card>
        </DirectionalReveal>
      </div>
    </section>
  );
}
