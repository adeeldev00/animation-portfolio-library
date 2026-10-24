'use client';

// Adapted from trust-security/ReadOnlyAnimation — exchanges flow into the CJ orb,
// then out to three verified stat chips. Pure SVG + SMIL, no JS animation.

const VW = 600;
const VH = 256;
const CY = VH / 2;

const LP = { x: 16, y: 12, w: 56, h: 232, rx: 12 };
const ORB = { cx: 264, cy: CY, r: 30 };

const LEFT_EDGE = LP.x + LP.w;
const ORB_EXIT = ORB.cx + ORB.r;
const CHIP_X = 372; // where the right connectors terminate

const ROW_YS = [30, 62, 94, 126, 158, 190, 222] as const;
const CHIP_YS = [50, 128, 206] as const;

const EXCHANGES = [
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/exchanges/binance.svg',
    alt: 'Binance',
  },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/exchanges/bybit.svg',
    alt: 'Bybit',
  },
  { src: 'https://cdn.clearjournal.com/public/images/landingPage/exchanges/okx.svg', alt: 'OKX' },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/exchanges/bitget.svg',
    alt: 'Bitget',
  },
  { src: 'https://cdn.clearjournal.com/public/images/landingPage/exchanges/woox.svg', alt: 'WooX' },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/exchanges/hyperliquid.svg',
    alt: 'Hyperliquid',
  },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/exchanges/aster.svg',
    alt: 'Aster',
  },
] as const;

// Left routes — flat, one S-bend, flat into the orb (ribbon-cable stack)
const ROUTES = [
  { y: ROW_YS[0], bx1: 150, bx2: 210, ty: CY - 21 },
  { y: ROW_YS[1], bx1: 130, bx2: 178, ty: CY - 14 },
  { y: ROW_YS[2], bx1: 112, bx2: 143, ty: CY - 7 },
  { y: ROW_YS[3], bx1: 104, bx2: 127, ty: CY },
  { y: ROW_YS[4], bx1: 112, bx2: 143, ty: CY + 7 },
  { y: ROW_YS[5], bx1: 130, bx2: 178, ty: CY + 14 },
  { y: ROW_YS[6], bx1: 150, bx2: 210, ty: CY + 21 },
] as const;

const LEFT_PATHS = ROUTES.map(({ y, bx1, bx2, ty }, i) => {
  const mx = (bx1 + bx2) / 2;
  return {
    id: `vp-lp${i}`,
    d: `M ${LEFT_EDGE},${y} L ${bx1},${y} C ${mx},${y} ${mx},${ty} ${bx2},${ty} L ${ORB.cx},${ty}`,
  };
});

// Right routes — orb out to the three chips
const RIGHT_PATHS = CHIP_YS.map((cy, i) => {
  if (cy === CY) return { id: `vp-rp${i}`, d: `M ${ORB_EXIT},${CY} L ${CHIP_X},${CY}` };
  const bx1 = 316;
  const bx2 = 352;
  const mx = (bx1 + bx2) / 2;
  return {
    id: `vp-rp${i}`,
    d: `M ${ORB_EXIT},${CY} L ${bx1},${CY} C ${mx},${CY} ${mx},${cy} ${bx2},${cy} L ${CHIP_X},${cy}`,
  };
});

const DUR = '5s';
const SEG = 0.14;

const LEFT_TIMING: Record<string, { depart: number; arrive: number }> = {
  'vp-lp0': { depart: 0.04, arrive: 0.3 },
  'vp-lp1': { depart: 0.08, arrive: 0.33 },
  'vp-lp2': { depart: 0.12, arrive: 0.36 },
  'vp-lp3': { depart: 0.16, arrive: 0.39 },
  'vp-lp4': { depart: 0.2, arrive: 0.42 },
  'vp-lp5': { depart: 0.24, arrive: 0.45 },
  'vp-lp6': { depart: 0.28, arrive: 0.48 },
};

// Right sweeps depart after the left bars converge on the orb
const RIGHT_TIMING = [
  { depart: 0.5, arrive: 0.78 },
  { depart: 0.55, arrive: 0.82 },
  { depart: 0.6, arrive: 0.86 },
];

function GlowBar({ d, depart, arrive }: { d: string; depart: number; arrive: number }) {
  return (
    <path
      d={d}
      pathLength="1"
      stroke="rgba(210,225,255,0.9)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      strokeDasharray={`${SEG} 2`}
      filter="url(#vp-bar-glow)"
    >
      <animate
        attributeName="stroke-dashoffset"
        values={`${SEG};${SEG};-1;${-(1 + SEG)}`}
        keyTimes={`0;${depart};${arrive};1`}
        dur={DUR}
        repeatCount="indefinite"
        calcMode="linear"
      />
    </path>
  );
}

function TransferIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M2 5H14M14 5L11 2M14 5L11 8M14 11H2M2 11L5 8M2 11L5 14"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0">
      <path
        d="M10 12.5C7.23858 12.5 5 10.2614 5 7.5V2.5H15V7.5C15 10.2614 12.7614 12.5 10 12.5ZM10 12.5V15M7 15H13M3 2.5H5M15 2.5H17M5 4.5C4.16667 5 2.5 7 2.5 9M15 4.5C15.8333 5 17.5 7 17.5 9"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SproutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M8 14V8M8 8C8 5.79 10 4 10 4M8 8C8 5.79 6 4 6 4"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CHIPS = [
  { icon: <TransferIcon />, label: 'Trades', value: '643', color: '#FFFFFF' },
  { icon: <TrophyIcon />, label: 'Win Rate', value: '39.2%', color: '#F9AA4B' },
  { icon: <SproutIcon />, label: 'P. Factor', value: '1.27', color: '#22C55E' },
];

export function ExchangeFlowAnimation() {
  const LOGO = 24;

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${VW} / ${VH}` }}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="vp-bar-glow" filterUnits="userSpaceOnUse" x="0" y="0" width={VW} height={VH}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="vp-orb-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="28" result="b" />
            <feFlood floodColor="#5D80FF" floodOpacity="0.55" result="c" />
            <feComposite in="c" in2="b" operator="in" result="s" />
            <feMerge>
              <feMergeNode in="s" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="vp-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="vp-fade-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="25%" stopColor="#141521" />
            <stop offset="70%" stopColor="rgba(20,21,33,0.8)" />
            <stop offset="100%" stopColor="rgba(20,21,33,0)" />
          </linearGradient>

          <linearGradient id="vp-fade-bot" x1="0" y1="1" x2="0" y2="0">
            <stop offset="25%" stopColor="#141521" />
            <stop offset="70%" stopColor="rgba(20,21,33,0.8)" />
            <stop offset="100%" stopColor="rgba(20,21,33,0)" />
          </linearGradient>

          <mask id="vp-lines-mask">
            <rect x="0" y="0" width={VW} height={VH} fill="white" />
            <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r + 1} fill="black" />
          </mask>
        </defs>

        {/* Left exchange panel */}
        <rect
          x={LP.x}
          y={LP.y}
          width={LP.w}
          height={LP.h}
          rx={LP.rx}
          fill="#141521"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1.5"
        />
        {EXCHANGES.map((ex, i) => (
          <image
            key={ex.alt}
            href={ex.src}
            x={LP.x + (LP.w - LOGO) / 2}
            y={ROW_YS[i] - LOGO / 2}
            width={LOGO}
            height={LOGO}
            preserveAspectRatio="xMidYMid meet"
          />
        ))}
        <rect x={LP.x} y={LP.y} width={LP.w} height={72} fill="url(#vp-fade-top)" />
        <rect x={LP.x} y={LP.y + LP.h - 72} width={LP.w} height={72} fill="url(#vp-fade-bot)" />
        {ROW_YS.map((y) => (
          <circle key={y} cx={LEFT_EDGE} cy={y} r="2.5" fill="white" filter="url(#vp-dot-glow)" />
        ))}

        {/* Left connectors + glow bars */}
        <g mask="url(#vp-lines-mask)">
          {LEFT_PATHS.map(({ id, d }) => (
            <path
              key={id}
              d={d}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          ))}
          {LEFT_PATHS.map(({ id, d }) => (
            <GlowBar key={id} d={d} {...LEFT_TIMING[id]} />
          ))}
        </g>

        {/* Right connectors + glow bars sweeping to the chips */}
        <g mask="url(#vp-lines-mask)">
          {RIGHT_PATHS.map(({ id, d }) => (
            <path
              key={id}
              d={d}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          ))}
          {RIGHT_PATHS.map(({ id, d }, i) => (
            <GlowBar key={id} d={d} {...RIGHT_TIMING[i]} />
          ))}
        </g>

        {/* Chip entry dots — flash as each sweep arrives */}
        {CHIP_YS.map((cy, i) => (
          <circle key={cy} cx={CHIP_X} cy={cy} r="2.5" fill="#5D80FF" filter="url(#vp-dot-glow)">
            <animate
              attributeName="r"
              values="2.5;2.5;4.5;2.5;2.5"
              keyTimes={`0;${RIGHT_TIMING[i].arrive - 0.03};${RIGHT_TIMING[i].arrive};${Math.min(RIGHT_TIMING[i].arrive + 0.06, 0.98)};1`}
              dur={DUR}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Center orb + CJ ring mark */}
        <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r} fill="#5D80FF" filter="url(#vp-orb-glow)" />
        <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r} fill="#5D80FF" />
        <g transform={`translate(${ORB.cx - 22}, ${ORB.cy - 22}) scale(${44 / 34})`} opacity={0.92}>
          <path
            d="M19.33 3.8 A13.4 13.4 0 0 1 30.2 14.67"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M30 20.24 A13.4 13.4 0 0 1 19.33 30.2"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M14.67 30.2 A13.4 13.4 0 0 1 14.67 3.8"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      {/* Stat chips — HTML overlay aligned to the SVG grid */}
      {CHIPS.map((chip, i) => (
        <div
          key={chip.label}
          className="absolute flex flex-col justify-center gap-1 rounded-[10px] px-4"
          style={{
            left: `${(CHIP_X / VW) * 100}%`,
            top: `${((CHIP_YS[i] - 30) / VH) * 100}%`,
            width: `${(210 / VW) * 100}%`,
            height: `${(60 / VH) * 100}%`,
            background: '#141521',
            border: '1.5px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex items-center gap-2">
            {chip.icon}
            <span className="font-inter-tight text-[12px] font-normal text-white/50">
              {chip.label}
            </span>
          </div>
          <span
            className="font-inter-tight text-[15px] leading-none font-medium"
            style={{ color: chip.color }}
          >
            {chip.value}
          </span>
        </div>
      ))}
    </div>
  );
}
