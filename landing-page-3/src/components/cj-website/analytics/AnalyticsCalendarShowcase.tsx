'use client';

import { useEffect, useState } from 'react';
import WebsiteImage from '@/components/cj-website/WebsiteImage';
import { cn } from '@/lib/utils';

const VIEWS = [
  {
    label: 'Month',
    src: 'calender.svg',
    alt: 'Monthly trading calendar with per-day P&L, trades, and win rate',
  },
  {
    label: 'Yearly',
    src: 'calender-yearly.svg',
    alt: 'Yearly trading calendar mapping every winning and losing day',
  },
  {
    label: 'Day',
    src: 'calender-day.svg',
    alt: 'Day view with every trade and session breakdown',
  },
];

const ROTATE_MS = 2000;

export default function AnalyticsCalendarShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((p) => (p + 1) % VIEWS.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-[24px] border border-white/[0.05] bg-dark-card p-4 sm:p-6">
      {/* View switcher */}
      <div className="flex items-center gap-1 rounded-[12px] border border-white/[0.05] bg-white/[0.03] p-1">
        {VIEWS.map((view, i) => (
          <button
            key={view.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              'flex h-9 items-center justify-center rounded-[8px] px-5 font-inter-tight text-[14px] font-medium transition-colors',
              i === active ? 'bg-glow-blue text-white' : 'text-white/60 hover:text-white'
            )}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Crossfading calendar views — all mounted so switches never flash */}
      <div className="relative w-full">
        {VIEWS.map((view, i) => (
          <WebsiteImage
            folder="analytics"
            key={view.label}
            src={view.src}
            alt={view.alt}
            width={1240}
            height={771}
            className={cn(
              'h-auto w-full transition-opacity duration-500',
              i === active ? 'relative opacity-100' : 'absolute inset-0 opacity-0'
            )}
          />
        ))}
      </div>
    </div>
  );
}
