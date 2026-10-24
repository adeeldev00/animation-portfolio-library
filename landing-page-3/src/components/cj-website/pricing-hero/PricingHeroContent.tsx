'use client';

import PricingPlansGrid from './PricingPlansGrid';
import type { SessionPayload } from '@/lib/auth';

interface Props {
  session: SessionPayload | null;
}

export default function PricingHeroContent({ session }: Props) {
  return (
    <div className="relative z-10 section-shell flex flex-col items-center gap-[60px] px-4 pt-[80px] pb-4 sm:px-8 lg:px-[100px] lg:pt-[92px]">
      <div className="flex max-w-[660px] flex-col items-center gap-4 text-center">
        <span
          className="inline-flex w-fit items-center gap-1 rounded-[8px] border border-white/[0.05] px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
          }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-glow-blue" />
          Pricing
        </span>

        <h1 className="font-inter-tight text-[40px] leading-[100%] font-normal text-white sm:text-[48px] lg:text-[56px]">
          Choose the plan that fits
          <br />
          your trading journey.
        </h1>

        <p className="max-w-[600px] font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
          Whether you&apos;re just starting your trading journal or managing thousands of trades,
          Clear Journal gives you the tools to analyze performance, stay disciplined, and improve
          with confidence.
        </p>
      </div>

      <PricingPlansGrid session={session} />
    </div>
  );
}
