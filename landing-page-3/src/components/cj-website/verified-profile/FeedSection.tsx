import { Flame, Heart, MessageCircle, Smile, Sparkles } from 'lucide-react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import VectorGlow from '@/components/ui/VectorGlow';
import { fadeInLeft, fadeInRight } from '@/lib/animations';
import { publicEnvVars } from '@/settings';
import { SectionBadge, PrimaryCta, CheckList, VerifiedBadgeIcon, CjRingMark } from './shared';

const AVATAR_URL = `${publicEnvVars.NEXT_PUBLIC_CLOUDFRONT_URL}/public/website-content/b1b46d8148a7d5021959dc636317029422f8b484.jpg`;

const CHECK_ITEMS = [
  {
    label: 'A live feed of everyone you follow',
    text: 'new positions, closed trades, milestones.',
  },
  { label: 'Position alerts', text: 'get notified the moment a trader you follow opens a trade.' },
  { label: 'Follow and be followed', text: 'build a verified audience around your record.' },
  { label: 'The leaderboard', text: 'ranked by verified performance, not follower count.' },
];

const TOP_TRADERS = [
  { rank: 1, name: 'Jack Hunter', initials: 'JH', verified: true, amount: '$4,210' },
  { rank: 2, name: 'Lucas Hayes', initials: 'LH', verified: false, amount: '$3,985' },
  { rank: 3, name: 'Morgan Bennett', initials: 'MB', verified: true, amount: '$3,565' },
  { rank: 4, name: 'Ethan Cole', initials: 'EC', verified: true, amount: '$2,880' },
  { rank: 5, name: 'Lucas Hayes', initials: 'LH', verified: false, amount: '$1,540' },
];

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #5D80FF 0%, #2C3E8F 100%)',
  'linear-gradient(135deg, #8A6DE9 0%, #45338C 100%)',
  'linear-gradient(135deg, #4BA3F9 0%, #1F4E85 100%)',
  'linear-gradient(135deg, #F9AA4B 0%, #8F5A1B 100%)',
  'linear-gradient(135deg, #34C48B 0%, #14634A 100%)',
];

const ENGAGEMENT = [
  { icon: Heart, count: 3 },
  { icon: Smile, count: 4 },
  { icon: Flame, count: 18 },
  { icon: Sparkles, count: 2 },
  { icon: MessageCircle, count: 2 },
];

// ── Candlestick chart — Figma plot 373×211, labels + tags on the right ───────
const CW = 453;
const CH = 232;
const PLOT_W = 373;
const PLOT_H = 211;

type Candle = { x: number; o: number; c: number; h: number; l: number };

function genCandles(): Candle[] {
  let s = 7;
  const rand = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };

  // Shape per Figma: choppy lower band → dip → climb → high cluster at the right
  const anchors = [128, 138, 120, 145, 132, 150, 128, 96, 70, 52, 66, 44, 58];
  const candles: Candle[] = [];
  let i = 0;
  for (let a = 0; a < anchors.length - 1; a++) {
    for (let j = 0; j < 4; j++) {
      const t = j / 4;
      const mid = anchors[a] + (anchors[a + 1] - anchors[a]) * t + (rand() - 0.5) * 14;
      const o = mid + (rand() - 0.5) * 10;
      const c = mid + (rand() - 0.5) * 10;
      const hi = Math.min(o, c) - rand() * 9 - 2;
      const lo = Math.max(o, c) + rand() * 9 + 2;
      candles.push({ x: 8 + i * 7.4, o, c, h: Math.max(hi, 6), l: Math.min(lo, PLOT_H - 14) });
      i++;
    }
  }
  return candles;
}

const CANDLES = genCandles();

const Y_LABELS = [
  '112000.00',
  '111000.00',
  '110000.00',
  '109000.00',
  '108000.00',
  '107000.00',
  '106000.00',
  '105000.00',
  '104000.00',
];

const X_LABELS = ['09.00', '12.00', '15.00', '18.00', '21.00', '24.00', '3.00', '6.00'];

// Right-edge price tags per Figma: MFE / Exit / Entry / MAE
const TAGS = [
  { label: 'MFE', value: '108786.00', y: 40, bg: '#5D80FF', fg: '#FFFFFF' },
  { label: 'Exit', value: '107986.65', y: 58, bg: '#EF4444', fg: '#FFFFFF' },
  { label: 'Entry', value: '104958.00', y: 140, bg: '#22C55E', fg: '#052E13' },
  { label: 'MAE', value: '103079.40', y: 176, bg: '#5D80FF', fg: '#FFFFFF' },
];

function BuyMarker({ x, y }: { x: number; y: number }) {
  return (
    <g fontFamily="Inter Tight, sans-serif" fontSize="7" textAnchor="middle">
      <text x={x} y={y} fill="rgba(255,255,255,0.75)">
        Open
      </text>
      <path d={`M ${x},${y + 10} L ${x},${y + 3.5}`} stroke="#22C55E" strokeWidth="1.4" />
      <path
        d={`M ${x - 2.6},${y + 6.5} L ${x},${y + 3} L ${x + 2.6},${y + 6.5}`}
        fill="none"
        stroke="#22C55E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={x} y={y + 19} fill="#22C55E">
        Buy
      </text>
    </g>
  );
}

function SellMarker({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g fontFamily="Inter Tight, sans-serif" fontSize="7" textAnchor="middle">
      <text x={x} y={y} fill="#EF4444">
        {label}
      </text>
      <path d={`M ${x},${y + 3} L ${x},${y + 9.5}`} stroke="#EF4444" strokeWidth="1.4" />
      <path
        d={`M ${x - 2.6},${y + 6.5} L ${x},${y + 10} L ${x + 2.6},${y + 6.5}`}
        fill="none"
        stroke="#EF4444"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function CandleChart() {
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} fill="none" aria-hidden className="h-auto w-full">
      {/* Plot frame */}
      <rect
        x="0.5"
        y="0.5"
        width={PLOT_W}
        height={PLOT_H}
        rx="4"
        stroke="rgba(255,255,255,0.07)"
        fill="rgba(255,255,255,0.015)"
      />

      {/* Y labels — right of the plot */}
      {Y_LABELS.map((label, i) => {
        const y = 12 + i * ((PLOT_H - 24) / (Y_LABELS.length - 1));
        return (
          <text
            key={label}
            x={PLOT_W + 8}
            y={y + 2}
            fill="rgba(255,255,255,0.4)"
            fontSize="7"
            fontFamily="Inter Tight, sans-serif"
          >
            {label}
          </text>
        );
      })}

      {/* Level lines: Exit (blue dotted) + Entry (green dotted) */}
      <line
        x1="6"
        y1="62"
        x2={PLOT_W - 4}
        y2="62"
        stroke="rgba(93,128,255,0.45)"
        strokeDasharray="2 3"
      />
      <line
        x1="6"
        y1="144"
        x2={PLOT_W - 4}
        y2="144"
        stroke="rgba(34,197,94,0.45)"
        strokeDasharray="2 3"
      />

      {/* Vertical crosshair */}
      <line
        x1="178"
        y1="6"
        x2="178"
        y2={PLOT_H - 6}
        stroke="rgba(93,128,255,0.55)"
        strokeWidth="1"
      />

      {/* Candles */}
      {CANDLES.map((candle) => {
        const up = candle.c < candle.o;
        const color = up ? '#22C55E' : '#EF4444';
        const top = Math.min(candle.o, candle.c);
        const height = Math.max(2, Math.abs(candle.o - candle.c));
        return (
          <g key={candle.x}>
            <line
              x1={candle.x + 2.2}
              y1={candle.h}
              x2={candle.x + 2.2}
              y2={candle.l}
              stroke={color}
              strokeWidth="0.9"
            />
            <rect x={candle.x} y={top} width="4.4" height={height} rx="0.8" fill={color} />
          </g>
        );
      })}

      {/* Trade markers */}
      <BuyMarker x={46} y={168} />
      <BuyMarker x={122} y={178} />
      <BuyMarker x={252} y={128} />
      <SellMarker x={286} y={26} label="Sell" />
      <SellMarker x={306} y={44} label="Close" />

      {/* Price tags on the right edge */}
      {TAGS.map((tag) => (
        <g key={tag.label} fontFamily="Inter Tight, sans-serif" fontSize="7">
          <rect x={PLOT_W - 62} y={tag.y - 9} width="66" height="12" rx="2" fill={tag.bg} />
          <text x={PLOT_W - 57} y={tag.y} fill={tag.fg} fontWeight="500">
            {tag.label} | {tag.value}
          </text>
        </g>
      ))}

      {/* Tooltip — glass card left of the crosshair */}
      <g>
        <rect
          x="96"
          y="88"
          width="118"
          height="60"
          rx="7"
          fill="rgba(30,32,48,0.9)"
          stroke="rgba(255,255,255,0.1)"
        />
        <g fontFamily="Inter Tight, sans-serif">
          <text x="106" y="103" fill="rgba(255,255,255,0.9)" fontSize="7.5">
            Tue, 07 Dec 2025
          </text>
          <text x="176" y="103" fill="rgba(255,255,255,0.6)" fontSize="7">
            05:23 PM
          </text>
          <text x="106" y="118" fill="rgba(255,255,255,0.4)" fontSize="6.5">
            Open
          </text>
          <text x="106" y="127" fill="rgba(255,255,255,0.85)" fontSize="7">
            107679
          </text>
          <text x="160" y="118" fill="rgba(255,255,255,0.4)" fontSize="6.5">
            Close
          </text>
          <text x="160" y="127" fill="rgba(255,255,255,0.85)" fontSize="7">
            107651.8
          </text>
          <text x="106" y="137" fill="rgba(255,255,255,0.4)" fontSize="6.5">
            Lowest
          </text>
          <text x="106" y="146" fill="rgba(255,255,255,0.85)" fontSize="7">
            107411.7
          </text>
          <text x="160" y="137" fill="rgba(255,255,255,0.4)" fontSize="6.5">
            Highest
          </text>
          <text x="160" y="146" fill="rgba(255,255,255,0.85)" fontSize="7">
            107729.8
          </text>
        </g>
      </g>

      {/* X labels */}
      {X_LABELS.map((label, i) => {
        const x = 22 + ((PLOT_W - 44) / (X_LABELS.length - 1)) * i;
        return (
          <text
            key={label}
            x={x}
            y={PLOT_H + 16}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
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

const TRADE_STATS = [
  { label: 'Entry Price', value: '$69,500.0' },
  { label: 'Exit Price', value: '$70,473.6' },
  { label: 'ROI', value: '+20%' },
  { label: 'Realized PnL', value: '$146.54' },
];

function TradeDetailCard() {
  return (
    <div
      className="flex flex-col gap-3 rounded-[16px] p-4 transition-transform duration-300 hover:-translate-y-1.5"
      style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.06)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="flex items-center gap-1.5 rounded-[6px] px-2 py-1 font-inter-tight text-[12px] font-medium text-[#F87171]"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <span className="h-[3px] w-[3px] rounded-full bg-[#F87171]" />
          Close Trade
        </span>
        <span className="font-inter-tight text-[12px] font-normal text-white/50">
          Duration: <span className="font-medium text-white">1d 10h 28m 6s</span>
        </span>
      </div>

      {/* Chart + side stats */}
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <CandleChart />
        </div>

        <div className="flex w-[96px] shrink-0 flex-col gap-2">
          <div className="flex flex-col">
            <span className="font-inter-tight text-[14px] font-medium text-white">BTCUSDT</span>
            <span className="font-inter-tight text-[11px] font-medium text-[#22C55E]">
              Long 10x
            </span>
          </div>

          <div
            className="flex flex-col overflow-hidden rounded-[8px]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {TRADE_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col gap-0.5 px-2.5 py-2"
                style={{
                  borderBottom:
                    i === TRADE_STATS.length - 1 ? undefined : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="font-inter-tight text-[10px] font-normal text-white/40">
                  {stat.label}
                </span>
                <span className="font-inter-tight text-[13px] font-medium text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open / Close datetimes */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <span className="font-inter-tight text-[13px] font-normal text-white/50">
          Open: <span className="font-medium text-white">3 June 2026</span>
          <span className="text-white/40"> · 12:55 AM</span>
        </span>
        <span className="font-inter-tight text-[13px] font-normal text-white/50">
          Close: <span className="font-medium text-white">4 June 2026</span>
          <span className="text-white/40"> · 11:23 AM</span>
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AVATAR_URL}
          alt="Morgan Bennett"
          className="h-5 w-5 shrink-0 rounded-full object-cover"
        />
        <span className="font-inter-tight text-[13px] font-medium text-white">Morgan Bennett</span>
        <VerifiedBadgeIcon size={12} />
        <span className="min-w-0 truncate font-inter-tight text-[13px] font-normal text-white/50">
          @morganbennett15
        </span>
        <span className="ml-auto shrink-0 font-inter-tight text-[12px] font-medium text-[#5D80FF]">
          Follow
        </span>
      </div>
    </div>
  );
}

function EngagementRail() {
  return (
    <div className="flex flex-col gap-3">
      {ENGAGEMENT.map(({ icon: Icon, count }, i) => (
        <span key={i} className="flex items-center gap-1.5 text-white/50">
          <Icon size={13} strokeWidth={1.75} />
          <span className="font-inter-tight text-[11px] font-normal">{count}</span>
        </span>
      ))}
    </div>
  );
}

function TopThisWeekCard() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[16px] p-4 transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        background: '#0C0D17',
        border: '1.5px solid rgba(255,255,255,0.07)',
        boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-inter-tight text-[17px] font-medium text-white">Top This Week</span>
        <CjRingMark size={22} color="rgba(255,255,255,0.45)" />
      </div>

      <ul className="flex flex-col gap-3">
        {TOP_TRADERS.map((trader, i) => (
          <li key={`${trader.rank}-${trader.name}`} className="flex items-center gap-3">
            <span className="w-3 shrink-0 font-inter-tight text-[14px] font-normal text-white/40">
              {trader.rank}
            </span>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: AVATAR_GRADIENTS[i] }}
            >
              <span className="font-inter-tight text-[11px] font-medium text-white">
                {trader.initials}
              </span>
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-1.5">
              <span className="truncate font-inter-tight text-[15px] font-normal text-white">
                {trader.name}
              </span>
              {trader.verified && <VerifiedBadgeIcon size={13} />}
            </span>
            <span className="font-inter-tight text-[16px] font-medium text-[#22C55E]">
              {trader.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeedSection() {
  return (
    <section className="relative section-shell section-pad">
      <VectorGlow opacity={0.3} right="-5%" top="30%" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Showcase */}
        <DirectionalReveal variants={fadeInLeft} className="order-2 lg:order-1">
          <div
            className="relative mx-auto w-full max-w-[570px] rounded-[24px] px-4 pt-10 pb-24 sm:pt-12 sm:pb-28"
            style={{
              background:
                'radial-gradient(80% 60% at 20% 15%, rgba(93,128,255,0.10) 0%, rgba(93,128,255,0) 60%), #07080F',
              border: '1.5px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="relative">
              {/* Trade detail card + engagement rail */}
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1 -rotate-[2.5deg]">
                  <TradeDetailCard />
                </div>
                <div className="hidden shrink-0 pt-1 sm:block">
                  <EngagementRail />
                </div>
              </div>

              {/* Top This Week — front card, overlaps bottom-right */}
              <div className="relative z-20 -mt-10 sm:absolute sm:right-2 sm:-bottom-24 sm:mt-0 sm:w-[56%]">
                <TopThisWeekCard />
              </div>
            </div>
          </div>
        </DirectionalReveal>

        {/* Copy */}
        <DirectionalReveal
          variants={fadeInRight}
          className="order-1 flex flex-col gap-6 lg:order-2"
        >
          <div className="flex flex-col gap-4">
            <SectionBadge label="The feed" />
            <h2 className="font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[48px]">
              Follow the traders whose numbers are real.
            </h2>
            <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
              ClearJournal isn&apos;t just your profile it&apos;s a network of verified traders.
              Follow the ones worth watching, get notified the moment they open a position, and see
              their moves in your feed. For once, the flex is backed by data.
            </p>
          </div>

          <CheckList items={CHECK_ITEMS} />

          <PrimaryCta href="/login" label="Try for Free" />
        </DirectionalReveal>
      </div>
    </section>
  );
}
