'use client';

import { useCallback, useRef, type ReactNode } from 'react';
import {
  ArrowDataTransferHorizontalIcon,
  Award01Icon,
  Clock01Icon,
  JusticeScale01Icon,
  Plant04Icon,
} from 'hugeicons-react';
import { ClearQuantScoreCard, scoreBadge } from '@/components/common/ClearQuantScoreCard';
import { publicEnvVars } from '@/settings';
import { cn } from '@/lib/utils';
import { CjRingMark } from './shared';

const PARTICLES_BG = `${publicEnvVars.NEXT_PUBLIC_CLOUDFRONT_URL}/public/website-content/282995069c81b80536d99278ce719964804af88d%20(1).jpg`;

// Same cursor-tilt interaction as the landing page TraderCard marquee
const MAX_TILT = 6;

function TiltCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -2 * MAX_TILT;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_TILT;
    inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (innerRef.current) innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <div
        ref={innerRef}
        className="h-full transition-transform duration-200 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}

function CjLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <CjRingMark size={26} color="#FFFFFF" />
      <span className="font-inter-tight text-[13px] font-medium leading-[1.25] tracking-[0.35em] text-white">
        CLEAR
        <br />
        JOURNAL
      </span>
    </div>
  );
}

// ── Deterministic PnL chart (SSR-safe) ───────────────────────────────────────
// Figma plot area: 681 × 196, zero line centered, gridlines every ~42.5px
const CW = 681;
const CH = 196;
const PLOT_L = 28;
const PLOT_R = CW - 12;
const ZERO_Y = 90;
const AMP = 0.85; // rescales the ±73px series into the flatter Figma plot

function genSeries(seed: number): number[] {
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };

  // Anchor shape roughly matching the design: deep dip → rally → chop → spike → drop
  const anchors = [-30, -55, -38, 52, 20, 28, 10, 14, 8, 18, 12, 58, 34, -62];
  const points: number[] = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const from = anchors[i];
    const to = anchors[i + 1];
    for (let j = 0; j < 9; j++) {
      const t = j / 9;
      points.push(from + (to - from) * t + (rand() - 0.5) * 22);
    }
  }
  return points;
}

function PnlChart({ seed, xLabels }: { seed: number; xLabels: string[] }) {
  const series = genSeries(seed);
  const step = (PLOT_R - PLOT_L) / (series.length - 1);
  const pts = series.map(
    (v, i) => `${(PLOT_L + i * step).toFixed(1)},${(ZERO_Y - v * AMP).toFixed(1)}`
  );
  const line = `M ${pts.join(' L ')}`;
  const band = `${line} L ${PLOT_R},${ZERO_Y} L ${PLOT_L},${ZERO_Y} Z`;

  const gradId = `vp-pnl-line-${seed}`;
  const fillId = `vp-pnl-fill-${seed}`;
  const yLabels = [
    { label: '40k', y: 5 },
    { label: '20k', y: 47 },
    { label: '0', y: ZERO_Y },
    { label: '-20k', y: 132 },
    { label: '-40k', y: 175 },
  ];

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} fill="none" aria-hidden className="h-auto w-full">
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={CH}>
          <stop offset="0" stopColor="#22C55E" />
          <stop offset={ZERO_Y / CH} stopColor="#22C55E" />
          <stop offset={ZERO_Y / CH} stopColor="#EF4444" />
          <stop offset="1" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id={fillId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={CH}>
          <stop offset="0" stopColor="rgba(34,197,94,0.35)" />
          <stop offset={ZERO_Y / CH} stopColor="rgba(34,197,94,0.02)" />
          <stop offset={ZERO_Y / CH} stopColor="rgba(239,68,68,0.05)" />
          <stop offset="1" stopColor="rgba(239,68,68,0.45)" />
        </linearGradient>
      </defs>

      {/* Grid + y labels */}
      {yLabels.map(({ label, y }) => (
        <g key={label}>
          <line x1={PLOT_L} y1={y} x2={PLOT_R} y2={y} stroke="rgba(255,255,255,0.1)" />
          <text
            x={PLOT_L - 8}
            y={y + 3}
            textAnchor="end"
            fill="rgba(255,255,255,0.7)"
            fontSize="8"
            fontFamily="Inter Tight, sans-serif"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Watermark */}
      <g opacity="0.15" transform={`translate(${CW / 2 - 110}, ${ZERO_Y - 22})`}>
        <g transform="scale(1.35)">
          <path
            d="M19.33 3.8 A13.4 13.4 0 0 1 30.2 14.67"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M30 20.24 A13.4 13.4 0 0 1 19.33 30.2"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14.67 30.2 A13.4 13.4 0 0 1 14.67 3.8"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <text
          x="62"
          y="20"
          fill="white"
          fontSize="24"
          letterSpacing="8"
          fontFamily="Inter Tight, sans-serif"
        >
          CLEAR
        </text>
        <text
          x="62"
          y="46"
          fill="white"
          fontSize="24"
          letterSpacing="8"
          fontFamily="Inter Tight, sans-serif"
        >
          JOURNAL
        </text>
      </g>

      {/* Band fill + line */}
      <path d={band} fill={`url(#${fillId})`} />
      <path d={line} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />

      {/* X labels */}
      {xLabels.map((label, i) => {
        const x = PLOT_L + ((PLOT_R - PLOT_L) / (xLabels.length - 1 || 1)) * i;
        return (
          <text
            key={label}
            x={x}
            y={CH - 3}
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="8"
            fontFamily="Inter Tight, sans-serif"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

// ── Dashboard card ────────────────────────────────────────────────────────────
type Stat = { icon: ReactNode; label: string; value: ReactNode };

type DashboardData = {
  pnl: string;
  score: number;
  stats: Stat[];
  chartSeed: number;
  xLabels: string[];
};

function LongShort({ long, short }: { long: string; short: string }) {
  return (
    <span>
      <span className="text-[#22C55E]">{long}</span>
      <span className="text-white/40"> / </span>
      <span className="text-[#EF4444]">{short}</span>
    </span>
  );
}

function DashboardCard({ data }: { data: DashboardData }) {
  return (
    <div
      className="flex w-[88vw] max-w-[748px] shrink-0 flex-col gap-[17px] rounded-[16px] p-[17px] lg:h-[505px]"
      style={{
        border: '1px solid rgba(255,255,255,0.05)',
        backgroundImage: `url("${PARTICLES_BG}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo row */}
      <CjLogo />

      {/* Total PNL + Trading Score */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-[6px]">
          <span className="font-inter-tight text-[12.5px] font-normal leading-[150%] text-white/50">
            Total PNL
          </span>
          <span className="font-inter-tight text-[36px] font-semibold leading-[110%] text-[#22C55E] sm:text-[50px]">
            {data.pnl}
          </span>
        </div>

        <ClearQuantScoreCard
          score={data.score}
          title="Trading Score"
          badge={scoreBadge(data.score)}
          ringSize={66}
          ringFontSize={17}
          className="h-[77px] w-[166px] gap-2.5 rounded-l-[8px] rounded-r-[42px] bg-[#0A0B14]/50 py-[6px] pl-[17px] pr-[6px] backdrop-blur-[14px]"
          titleClassName="text-[11px]"
          badgeClassName="px-1 py-px text-[8px]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-[6px]">
        {/* Stat chips */}
        <div className="grid grid-cols-2 gap-[6px] sm:grid-cols-5">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-[3px] rounded-[8px] p-[11px] backdrop-blur-[14px]"
              style={{
                background: 'rgba(10,11,20,0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center gap-[6px]">
                {stat.icon}
                <span className="font-inter-tight whitespace-nowrap text-[10px] font-normal text-white/50">
                  {stat.label}
                </span>
              </div>
              <span className="font-inter-tight whitespace-nowrap text-[17px] font-medium text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Performance chart */}
        <div
          className="flex flex-1 flex-col gap-[11px] rounded-[8px] p-[17px] backdrop-blur-[14px]"
          style={{ background: 'rgba(10,11,20,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-inter-tight text-[11px] font-normal text-white">
              Performance <span className="text-white/50">(PnL Chart)</span>
            </span>
            <span className="font-inter-tight text-[8px] font-normal text-white/70">
              Nov 2025 - Jun 2026
            </span>
          </div>
          <PnlChart seed={data.chartSeed} xLabels={data.xLabels} />
        </div>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const MONTHS = ['Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'April 26', 'May 26', 'Jun 26'];

type CardSeed = {
  pnl: string;
  score: number;
  chartSeed: number;
  trades: string;
  winRate: number;
  duration: string;
  profitFactor: number;
  long: number;
};

const CARD_SEEDS: CardSeed[] = [
  {
    pnl: '$25,585.64',
    score: 56.4,
    chartSeed: 42,
    trades: '243',
    winRate: 52.1,
    duration: '16h 1m 26s',
    profitFactor: 1.21,
    long: 65,
  },
  {
    pnl: '$41,230.90',
    score: 74.8,
    chartSeed: 7,
    trades: '412',
    winRate: 58.4,
    duration: '12h 4m 10s',
    profitFactor: 1.62,
    long: 70,
  },
  {
    pnl: '$78,106.38',
    score: 82.3,
    chartSeed: 19,
    trades: '643',
    winRate: 61.8,
    duration: '9h 42m 3s',
    profitFactor: 1.94,
    long: 52,
  },
  {
    pnl: '$12,940.12',
    score: 48.6,
    chartSeed: 63,
    trades: '128',
    winRate: 47.5,
    duration: '22h 18m 40s',
    profitFactor: 1.08,
    long: 44,
  },
  {
    pnl: '$56,772.45',
    score: 77.2,
    chartSeed: 91,
    trades: '389',
    winRate: 55.9,
    duration: '6h 55m 12s',
    profitFactor: 1.71,
    long: 61,
  },
  {
    pnl: '$33,418.07',
    score: 63.5,
    chartSeed: 28,
    trades: '301',
    winRate: 51.2,
    duration: '14h 27m 51s',
    profitFactor: 1.34,
    long: 58,
  },
];

const CARDS: DashboardData[] = CARD_SEEDS.map((seed) => ({
  pnl: seed.pnl,
  score: seed.score,
  chartSeed: seed.chartSeed,
  xLabels: MONTHS,
  stats: [
    {
      icon: <ArrowDataTransferHorizontalIcon size={11} className="shrink-0 text-white/50" />,
      label: 'Total Trades',
      value: seed.trades,
    },
    {
      icon: <Award01Icon size={11} className="shrink-0 text-white/50" />,
      label: 'Win Rate',
      value: (
        <span className={seed.winRate >= 50 ? 'text-[#22C55E]' : 'text-[#F9AA4B]'}>
          {seed.winRate.toFixed(1)}%
        </span>
      ),
    },
    {
      icon: <Clock01Icon size={11} className="shrink-0 text-white/50" />,
      label: 'Avg Trade Duration',
      value: seed.duration,
    },
    {
      icon: <Plant04Icon size={11} className="shrink-0 text-white/50" />,
      label: 'Profit Factor',
      value: (
        <span className={seed.profitFactor >= 1 ? 'text-[#22C55E]' : 'text-[#F9AA4B]'}>
          {seed.profitFactor.toFixed(2)}
        </span>
      ),
    },
    {
      icon: <JusticeScale01Icon size={11} className="shrink-0 text-white/50" />,
      label: 'Long / Short Ratio',
      value: <LongShort long={`${seed.long}%`} short={`${100 - seed.long}%`} />,
    },
  ],
}));

// ── Showcase strip — continuous marquee of verified profile cards ────────────
export default function DashboardShowcase({ className }: { className?: string }) {
  return (
    <div className={cn('group relative z-10 mt-6 w-full overflow-hidden pb-10 lg:mt-8', className)}>
      <div className="flex w-max animate-marquee items-stretch gap-6 pr-6 will-change-transform [animation-duration:75s] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...CARDS, ...CARDS].map((data, i) => (
          <div key={i} aria-hidden={i >= CARDS.length}>
            <TiltCard>
              <DashboardCard data={data} />
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  );
}
