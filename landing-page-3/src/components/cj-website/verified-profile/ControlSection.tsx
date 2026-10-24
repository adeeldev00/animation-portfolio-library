'use client';

import {
  ArrowDataTransferHorizontalIcon,
  Award01Icon,
  Coins01Icon,
  JusticeScale01Icon,
  Plant04Icon,
} from 'hugeicons-react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp, landingSlideUpDelay } from '@/lib/animations';
import { SectionBadge } from './shared';
import { ExchangeFlowAnimation } from './ExchangeFlowAnimation';

const ORBIT_DURATION = '40s';

function PersonMark() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
      <defs>
        <linearGradient
          id="vp-person-grad"
          x1="36"
          y1="8"
          x2="36"
          y2="66"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7C97FF" />
          <stop offset="100%" stopColor="#2C3E8F" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="24" r="13" fill="url(#vp-person-grad)" />
      <path
        d="M12 64C12 49.6 22.7 40 36 40C49.3 40 60 49.6 60 64V66H12V64Z"
        fill="url(#vp-person-grad)"
      />
    </svg>
  );
}

const ORBIT_ICONS = [
  {
    key: 'transfer',
    node: <ArrowDataTransferHorizontalIcon size={22} className="text-[#5D80FF]" />,
  },
  { key: 'plant', node: <Plant04Icon size={22} className="text-[#5D80FF]" /> },
  { key: 'award', node: <Award01Icon size={22} className="text-[#5D80FF]" /> },
  { key: 'coins', node: <Coins01Icon size={22} className="text-[#5D80FF]" /> },
  { key: 'scale', node: <JusticeScale01Icon size={22} className="text-[#5D80FF]" /> },
];

// Center avatar + dashed ring + 5 icon tiles orbiting (pure CSS: the ring spins
// clockwise, each tile counter-spins at the same rate so icons stay upright).
const ORBIT_SIZE = 320; // container px
const ORBIT_RADIUS = 128; // ring + tile orbit radius px

function OrbitAnimation() {
  return (
    <div className="relative mx-auto" style={{ width: ORBIT_SIZE, height: ORBIT_SIZE }}>
      {/* Dashed orbit ring */}
      <svg
        viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`}
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full"
      >
        <circle
          cx={ORBIT_SIZE / 2}
          cy={ORBIT_SIZE / 2}
          r={ORBIT_RADIUS}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
      </svg>

      {/* Center avatar */}
      <div
        className="absolute top-1/2 left-1/2 flex h-[136px] w-[136px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          background: 'radial-gradient(60% 60% at 50% 35%, #181A28 0%, #0C0D17 100%)',
          border: '1.5px solid rgba(255,255,255,0.06)',
          boxShadow: '0 0 60px rgba(93,128,255,0.15)',
        }}
      >
        <PersonMark />
      </div>

      {/* Orbiting tiles */}
      <div
        className="absolute inset-0 animate-rotate-cw"
        style={{ animationDuration: ORBIT_DURATION }}
      >
        {ORBIT_ICONS.map(({ key, node }, i) => {
          const angle = i * 72 - 90;
          return (
            <div
              key={key}
              className="absolute top-1/2 left-1/2 -mt-6 -ml-6 h-12 w-12"
              style={{ transform: `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px)` }}
            >
              <div className="h-full w-full" style={{ transform: `rotate(${-angle}deg)` }}>
                <div
                  className="flex h-full w-full animate-rotate-ccw items-center justify-center rounded-[10px]"
                  style={{
                    animationDuration: ORBIT_DURATION,
                    background: '#11121D',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
                  }}
                >
                  {node}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ControlSection() {
  return (
    <section className="relative section-shell section-pad">
      {/* Center glow behind the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-[120px]"
        style={{ background: '#5D80FF' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-[60px]">
        <DirectionalReveal
          variants={landingSlideUp}
          className="flex max-w-[660px] flex-col items-center gap-4 text-center"
        >
          <SectionBadge label="Verified, and Yours to Control" />

          <h2 className="font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[48px]">
            Public when you want.
            <br />
            Private until then.
          </h2>

          <p className="max-w-[440px] font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            Verification never means surrender. You decide if and when your profile goes public.
          </p>
        </DirectionalReveal>

        <DirectionalReveal
          variants={landingSlideUpDelay}
          className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Real, from the exchange */}
          <div
            className="flex flex-col gap-8 rounded-[24px] p-7 sm:p-9"
            style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex min-h-[280px] items-center">
              <ExchangeFlowAnimation />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-inter-tight text-[24px] font-medium text-white sm:text-[28px]">
                Real, from the exchange
              </h3>
              <p className="font-inter-tight text-[15px] leading-[160%] font-normal text-white/50 sm:text-[16px]">
                Every stat is pulled live over a read-only API key - it can&apos;t be edited, faked,
                or cherry-picked.
              </p>
            </div>
          </div>

          {/* You're always in control */}
          <div
            className="flex flex-col gap-8 rounded-[24px] p-7 sm:p-9"
            style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex min-h-[280px] items-center justify-center">
              <OrbitAnimation />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-inter-tight text-[24px] font-medium text-white sm:text-[28px]">
                You&apos;re always in control
              </h3>
              <p className="font-inter-tight text-[15px] leading-[160%] font-normal text-white/50 sm:text-[16px]">
                Nothing is public by default. Publish your profile only when you&apos;re ready - and
                take it private, or remove it entirely, anytime.
              </p>
            </div>
          </div>
        </DirectionalReveal>
      </div>
    </section>
  );
}
