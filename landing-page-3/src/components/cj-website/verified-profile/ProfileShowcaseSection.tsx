'use client';

import { Bell, Plus } from 'lucide-react';
import {
  ArrowDataTransferHorizontalIcon,
  AutoConversationsIcon,
  Award01Icon,
} from 'hugeicons-react';
import { publicEnvVars } from '@/settings';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import VectorGlow from '@/components/ui/VectorGlow';
import { fadeInLeft, fadeInRight } from '@/lib/animations';
import { SectionBadge, PrimaryCta, CheckList, VerifiedBadgeIcon } from './shared';

const AVATAR_URL = `${publicEnvVars.NEXT_PUBLIC_CLOUDFRONT_URL}/public/website-content/b1b46d8148a7d5021959dc636317029422f8b484.jpg`;

const CHECK_ITEMS = [
  {
    label: 'Verified KPIs',
    text: 'trades, win rate, profit factor, avg win/loss, long/short split.',
  },
  {
    label: 'Open positions, live',
    text: 'your current book in real time, real leverage included.',
  },
  { label: 'Full trade history', text: 'entries, exits, duration, realized P&L, on the record.' },
  { label: 'ClearQuant Score', text: 'one verified number for how you actually trade.' },
  { label: 'Your own URL + badge', text: 'clearjournal.com/j/you, "Verified on CJ."' },
];

// ── Card 1 — profile header ───────────────────────────────────────────────────
function ProfileHeaderCard() {
  return (
    <div
      className="flex flex-col gap-5 rounded-[16px] p-5 transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center sm:gap-6"
      style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.06)' }}
    >
      {/* Identity */}
      <div className="flex flex-1 items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AVATAR_URL}
          alt="Morgan Bennett"
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-inter-tight text-[16px] font-medium text-white">
              Morgan Bennett
            </span>
            <VerifiedBadgeIcon size={15} />
          </div>
          <span className="font-inter-tight text-[14px] font-normal text-white/50">
            @morganbennett15
          </span>
          <div className="mt-0.5 flex items-center gap-1.5">
            <Award01Icon size={15} className="shrink-0 text-[#FFDF5D]" />
            <span className="font-inter-tight text-[13px] font-medium text-[#FFDF5D]">#3</span>
            <span className="h-1 w-1 rounded-full" style={{ background: 'rgba(255,223,93,0.3)' }} />
            <span className="font-inter-tight text-[13px] font-medium text-[#FFDF5D]">Futures</span>
            <span className="h-1 w-1 rounded-full" style={{ background: 'rgba(255,223,93,0.3)' }} />
            <span className="font-inter-tight text-[13px] font-medium text-[#FFDF5D]">30d</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden h-[71px] w-px shrink-0 bg-white/[0.07] sm:block" />

      {/* Social + actions */}
      <div className="flex shrink-0 flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="font-inter-tight text-[14px] font-medium text-white">34</span>
          <span className="font-inter-tight text-[14px] font-normal text-white/50">Following</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="font-inter-tight text-[14px] font-medium text-white">896</span>
          <span className="font-inter-tight text-[14px] font-normal text-white/50">Followers</span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex h-[34px] items-center justify-center gap-1.5 rounded-[8px] bg-white px-5 font-inter-tight text-[14px] font-medium whitespace-nowrap text-[#0B0C15] transition-colors hover:bg-white/90"
          >
            <Plus size={15} strokeWidth={2.25} />
            Follow
          </button>
          <button
            type="button"
            className="flex h-[34px] items-center justify-center gap-1.5 rounded-[8px] px-5 font-inter-tight text-[14px] font-medium whitespace-nowrap text-white transition-colors hover:bg-white/15"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <Bell size={15} strokeWidth={1.75} />
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Card 2 — KPI columns ──────────────────────────────────────────────────────
const KPIS = [
  {
    icon: <AutoConversationsIcon size={16} className="shrink-0 text-white/50" />,
    label: 'Net PnL',
    value: '$78,106.38',
    valueColor: '#22C55E',
    chip: { text: 'Unrealized PnL $2801.47', color: '#FACC15', bg: 'rgba(250,204,21,0.1)' },
  },
  {
    icon: <ArrowDataTransferHorizontalIcon size={16} className="shrink-0 text-white/50" />,
    label: 'Trades',
    value: '643',
    valueColor: '#FFFFFF',
    sub: (
      <span className="font-inter-tight text-[12px] font-normal">
        <span className="text-[#22C55E]">252 wins</span>
        <span className="text-white/40"> / 391 losses</span>
      </span>
    ),
  },
  {
    icon: <Award01Icon size={16} className="shrink-0 text-white/50" />,
    label: 'Win Rate',
    value: '39.2%',
    valueColor: '#F9AA4B',
    chip: { text: 'Below 50% threshold', color: '#F87171', bg: 'rgba(239,68,68,0.1)' },
  },
];

function KpiCard() {
  return (
    <div
      className="grid grid-cols-1 rounded-[16px] transition-transform duration-300 hover:-translate-y-1 sm:grid-cols-3"
      style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.06)' }}
    >
      {KPIS.map((kpi, i) => (
        <div
          key={kpi.label}
          className="flex flex-col gap-2 p-5"
          style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : undefined }}
        >
          <div className="flex items-center gap-2">
            {kpi.icon}
            <span className="font-inter-tight text-[13px] font-normal text-white/50">
              {kpi.label}
            </span>
          </div>
          <span
            className="font-inter-tight text-[20px] leading-none font-medium"
            style={{ color: kpi.valueColor }}
          >
            {kpi.value}
          </span>
          <div className="mt-1">
            {kpi.chip ? (
              <span
                className="inline-flex rounded-[5px] px-1.5 py-[3px] font-inter-tight text-[11px] font-medium"
                style={{ color: kpi.chip.color, background: kpi.chip.bg }}
              >
                {kpi.chip.text}
              </span>
            ) : (
              kpi.sub
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Card 3 — open positions table ─────────────────────────────────────────────
const POSITIONS = [
  {
    symbol: 'BTC',
    exchange: 'Binance',
    ref: 'efeb2',
    dot: '#FACC15',
    side: 'Long 10x',
    long: true,
    pnl: '$1,843',
    pnlColor: '#22C55E',
  },
  {
    symbol: 'ETH',
    exchange: 'Bybit',
    ref: 'b9c13',
    dot: '#8A6DE9',
    side: 'Short 3x',
    long: false,
    pnl: '-$320',
    pnlColor: '#F87171',
  },
  {
    symbol: 'SOL',
    exchange: 'OKX',
    ref: 'a7d49',
    dot: '#4BA3F9',
    side: 'Long 5x',
    long: true,
    pnl: '$147',
    pnlColor: '#22C55E',
  },
  {
    symbol: 'ENA',
    exchange: 'Bitget',
    ref: 'd12e7',
    dot: '#34C48B',
    side: 'Short 3x',
    long: false,
    pnl: '$204',
    pnlColor: '#22C55E',
  },
];

function PositionsCard() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[16px] p-5 transition-transform duration-300 hover:-translate-y-1"
      style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.06)' }}
    >
      <span className="font-inter-tight text-[13px] font-medium text-white">
        Open Future Positions (5)
      </span>

      <div
        className="overflow-hidden rounded-[12px]"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {POSITIONS.map((pos, i) => (
          <div
            key={pos.symbol}
            className="grid h-[54px] grid-cols-[48px_1fr_auto_64px] items-center gap-3 px-4 sm:gap-4"
            style={{
              borderBottom:
                i === POSITIONS.length - 1 ? undefined : '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.015)',
            }}
          >
            <span className="font-inter-tight text-[13px] font-medium text-white">
              {pos.symbol}
            </span>

            <span
              className="inline-flex h-[22px] w-fit items-center gap-1.5 rounded-[6px] px-2 font-inter-tight text-[12px]"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: pos.dot }} />
              <span className="text-white/70">{pos.exchange}</span>
              <span className="text-white/35">· {pos.ref}</span>
            </span>

            <span
              className="inline-flex h-[22px] items-center rounded-[6px] px-2 font-inter-tight text-[12px] font-medium"
              style={
                pos.long
                  ? {
                      color: '#22C55E',
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.35)',
                    }
                  : {
                      color: '#F87171',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.35)',
                    }
              }
            >
              {pos.side}
            </span>

            <span
              className="text-right font-inter-tight text-[14px] font-medium"
              style={{ color: pos.pnlColor }}
            >
              {pos.pnl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfileShowcaseSection() {
  return (
    <section className="relative section-shell section-pad">
      <VectorGlow opacity={0.3} left="-5%" top="20%" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <DirectionalReveal variants={fadeInLeft} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SectionBadge label="Your profile" />
            <h2 className="font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[48px]">
              Your whole record - good days and bad.
            </h2>
            <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
              Your public profile shows exactly what your exchange shows: win rate, profit factor,
              P&amp;L, average win/loss, long/short split, your open positions in real time, and
              your full trade history. Every number carries the &quot;Verified on CJ&quot; badge,
              because it&apos;s pulled live - not typed in.
            </p>
          </div>

          <CheckList items={CHECK_ITEMS} />

          <PrimaryCta href="/login" label="Get Started" />
        </DirectionalReveal>

        {/* Showcase — live profile components */}
        <DirectionalReveal variants={fadeInRight}>
          <div
            className="relative mx-auto flex w-full max-w-[620px] flex-col gap-4 rounded-[24px] p-5 sm:p-7"
            style={{
              background:
                'radial-gradient(70% 55% at 8% 45%, rgba(93,128,255,0.18) 0%, rgba(93,128,255,0) 60%), #07080F',
              border: '1.5px solid rgba(255,255,255,0.05)',
            }}
          >
            <ProfileHeaderCard />
            <KpiCard />
            <PositionsCard />
          </div>
        </DirectionalReveal>
      </div>
    </section>
  );
}
