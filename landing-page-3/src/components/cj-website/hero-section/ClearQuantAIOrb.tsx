export const EXCHANGE_CDN = 'https://cdn.clearjournal.com/public/images/landingPage/exchanges';
const CDN = EXCHANGE_CDN;

// 11 icons at exact Figma positions (Frame 2147231990, 1312×546).
// Figma gives 48px top-left coords; converted to center %: (left+24)/1312, (top+24)/546.
// CDN entries render an <img>; inline entries render a colored disc + white glyph.
export const EXCHANGE_ICONS = [
  { alt: 'WooX', left: '9.76%', top: '24.36%', slug: 'woox.svg' },
  { alt: 'Aster', left: '15.63%', top: '37.91%', slug: 'aster.svg' },
  { alt: 'OKX', left: '6.78%', top: '44.51%', slug: 'okx.svg' },
  { alt: 'Bybit', left: '10.14%', top: '58.79%', slug: 'bybit.svg' },
  { alt: 'Chainlink', left: '15.09%', top: '66.30%', bg: '#2A5ADA' },
  { alt: 'Avalanche', left: '8.31%', top: '82.97%', bg: '#E84142' },
  { alt: 'Bitget', left: '21.65%', top: '47.62%', slug: 'bitget.svg' },
  { alt: 'Hyperliquid', left: '22.48%', top: '60.81%', slug: 'hyperliquid.svg' },
  {
    alt: 'Bitcoin',
    left: '28.81%',
    top: '52.01%',
    bg: 'linear-gradient(180deg, #F9AA4B -0.02%, #F7931A 99.99%)',
  },
  { alt: 'SUI', left: '35.14%', top: '54.40%', bg: '#4CA3FF' },
  { alt: 'BNB', left: '41.92%', top: '53.30%', slug: 'binance.svg' },
] as const;

// Negative delays make pills emit in REVERSE array order (index 0, then 8, 7…),
// so the on-screen belt sequence is: Trade Analysis → Auto Sync → Risk Analysis
// → Trade Review → Pattern Detection → Performance Insights → Journaling →
// Market Breakdown → AI Explanations. That sequence alternates up/down
// divergers and puts the narrow labels behind the near-centreline ones, so
// consecutive pills always separate before their boxes could touch.
export const FEATURE_PILLS = [
  { label: 'Trade Analysis', left: '56.25%', top: '51.10%' },
  { label: 'AI Explanations', left: '87.04%', top: '60.81%' },
  { label: 'Market Breakdown', left: '84.83%', top: '26.37%' },
  { label: 'Journaling', left: '77.17%', top: '63.55%' },
  { label: 'Performance Insights', left: '82.39%', top: '50.55%' },
  { label: 'Pattern Detection', left: '85.29%', top: '77.47%' },
  { label: 'Trade Review', left: '79.88%', top: '38.46%' },
  { label: 'Risk Analysis', left: '66.39%', top: '55.31%' },
  { label: 'Auto Sync', left: '70.96%', top: '45.79%' },
] as const;

// White glyphs for the inline coin icons (drawn in a 24×24 box)
export const COIN_GLYPHS: Record<string, React.ReactNode> = {
  Bitcoin: (
    <path
      d="M15.4 10.4c.9-.5 1.4-1.3 1.3-2.5-.2-1.7-1.6-2.3-3.4-2.5V3.2h-1.4v2.1h-1.1V3.2H9.4v2.1H6.6v1.5s1 0 1 .7v8.7c0 .5-.4.6-.8.6h-.7l-.3 1.7h2.9v2.2h1.4v-2.2h1.1v2.2h1.4v-2.2c2.4-.1 4.1-.8 4.3-3 .2-1.8-.7-2.6-2.1-3.1Zm-4.5-3.4c.9 0 3.9-.3 3.9 1.6 0 1.8-3 1.6-3.9 1.6V7Zm0 8.9v-3.5c1.1 0 4.5-.3 4.5 1.7 0 2-3.4 1.8-4.5 1.8Z"
      fill="#fff"
    />
  ),
  SUI: (
    <path
      d="M12 3.5c-2.8 3.2-5 5.7-5 9 0 2.9 2.2 5.5 5 5.5s5-2.6 5-5.5c0-3.3-2.2-5.8-5-9Zm0 2.9c1.9 2.3 3.3 4 3.3 6.1 0 .5-.1 1-.3 1.5-.7-1.7-2.3-2.8-3-3.6-.7.8-2.3 1.9-3 3.6-.2-.5-.3-1-.3-1.5 0-2.1 1.4-3.8 3.3-6.1Z"
      fill="#fff"
    />
  ),
  Chainlink: (
    <path
      d="M12 3.6 8.4 5.7 4.8 7.8v8.4l3.6 2.1 3.6 2.1 3.6-2.1 3.6-2.1V7.8l-3.6-2.1L12 3.6Zm0 3.4 4.2 2.4v4.9L12 16.7l-4.2-2.4V9.4L12 7Z"
      fill="#fff"
    />
  ),
  Avalanche: (
    <path
      d="M13.3 4.5c-.6-1-1.9-1-2.5 0L4.5 15.6c-.6 1 .1 2.2 1.3 2.2h3.4c.7 0 1.4-.4 1.7-1l4.5-7.9c.3-.5.3-1.1 0-1.6l-2.1-2.8Zm4.3 8.1c-.6-1-1.9-1-2.5 0l-1.7 2.9c-.6 1 .1 2.3 1.2 2.3h3.5c1.2 0 1.9-1.3 1.3-2.3l-1.8-2.9Z"
      fill="#fff"
    />
  ),
};

export function ClearQuantAIOrb() {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1312 / 546' }}>
      {/* Conveyor animation: icons stream in from the left, get absorbed by the
          orb; pills are emitted from the orb and fade out toward the right edge.
          Negative animation-delays pre-fill the stream so it never starts empty. */}
      <style>{`
        /* 
          X and Y movements are animated separately to allow for accurate bezier curves.
          Icons shrink as they approach the orb.
        */
        /* X slows down after 65% so consecutive icons bunch up close together
           in the funnel before merging into the orb one by one. */
        @keyframes cqIconX {
          0%   { transform: translateX(0%); opacity: 0; }
          5%   { opacity: 1; }
          65%  { transform: translateX(35%); }
          90%  { opacity: 1; }
          100% { transform: translateX(50%); opacity: 0; }
        }
        @keyframes cqIconY {
          0%   { transform: translateY(var(--cq-start-y)); }
          100% { transform: translateY(var(--cq-end-y)); }
        }
        @keyframes cqIconScale {
          0%   { transform: translate(-50%, -50%) scale(1); }
          80%  { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-50%, -50%) scale(0.35); }
        }
        /* Pills never rest: emitted from the orb, every pill crosses the full
           beam (51.5% → 96%) at the same speed during the first 60% of the
           loop — uniform speed + even stagger keeps them ~8% apart so labels
           can never collide — then waits invisible until its next emission.
           Each pill passes through its exact Figma spot mid-flight. */
        @keyframes cqPillX {
          0%   { transform: translateX(51.5%); opacity: 0; }
          5%   { opacity: 1; }
          54%  { opacity: 1; }
          60%  { transform: translateX(96%); opacity: 0; }
          100% { transform: translateX(96%); opacity: 0; }
        }
        /* Y diverges following the funnel's own opening profile (measured from
           the beam edge curve), so every pill trajectory is a scaled copy of
           the funnel silhouette and can never cross the beam border. */
        @keyframes cqPillY {
          0%   { transform: translateY(var(--cq-start-y)); animation-timing-function: linear(0, 0.106 20%, 0.24 40%, 0.336 55%, 0.575 70%, 0.8 85%, 1); }
          60%  { transform: translateY(var(--cq-end-y)); }
          100% { transform: translateY(var(--cq-end-y)); }
        }
        /* Pill left/top are Figma raw text coords (top-left), so the content is
           anchored at the text's top-left and only the padding is compensated. */
        @keyframes cqPillScale {
          0%   { transform: translate(-12px, -4px) scale(0.5); }
          5%   { transform: translate(-12px, -4px) scale(1); }
          100% { transform: translate(-12px, -4px) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cq-animate * { animation: none !important; }
        }
      `}</style>

      {/* ── Glow beams: curved funnel paths (Figma Vectors 21368/21370) ─────
          Vector paths shaped like a bowtie — pinched at the orb (y≈292),
          flaring out with concave curves toward the frame edges, filled with
          the exact Figma radial gradient (focus 647.77, 316.53; rx 639,
          ry 399) and softened with feGaussianBlur. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1312 546"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient
            id="cqBeamL"
            gradientUnits="userSpaceOnUse"
            cx="647.77"
            cy="316.53"
            r="639"
            gradientTransform="translate(0 118.94) scale(1 0.6244)"
          >
            <stop offset="0" stopColor="#5D80FF" />
            <stop offset="1" stopColor="#5D80FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="cqBeamR"
            gradientUnits="userSpaceOnUse"
            cx="664.23"
            cy="316.53"
            r="639"
            gradientTransform="translate(0 118.94) scale(1 0.6244)"
          >
            <stop offset="0" stopColor="#5D80FF" />
            <stop offset="1" stopColor="#5D80FF" stopOpacity="0" />
          </radialGradient>
          {/* Inner-core gradient — exact Figma: radial-gradient(108.71% 46.73% at 100% 53.07%)
              on a 588×218 rect at (60,182) → focus (648, 297.7), rx 639.2, ry 101.9.
              sy = 101.9/639.2 = 0.1594, ty = 297.7 × (1−sy) = 250.24 */}
          <radialGradient
            id="cqCoreL"
            gradientUnits="userSpaceOnUse"
            cx="648"
            cy="297.7"
            r="639.2"
            gradientTransform="translate(0 250.24) scale(1 0.1594)"
          >
            <stop offset="0" stopColor="#5D80FF" />
            <stop offset="1" stopColor="#5D80FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="cqCoreR"
            gradientUnits="userSpaceOnUse"
            cx="664"
            cy="297.7"
            r="639.2"
            gradientTransform="translate(0 250.24) scale(1 0.1594)"
          >
            <stop offset="0" stopColor="#5D80FF" />
            <stop offset="1" stopColor="#5D80FF" stopOpacity="0" />
          </radialGradient>
          {/* 1px funnel-edge hairline: white 20% near the orb, vanishing toward the corners
              (Figma border-image linear-gradient 270.49deg, .2 @21.26% → 0 @93.08%) */}
          <linearGradient
            id="cqEdgeL"
            gradientUnits="userSpaceOnUse"
            x1="650"
            y1="0"
            x2="60"
            y2="0"
          >
            <stop offset="0.2126" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="0.9308" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="cqEdgeR"
            gradientUnits="userSpaceOnUse"
            x1="662"
            y1="0"
            x2="1252"
            y2="0"
          >
            <stop offset="0.2126" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="0.9308" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id="cqBlur25" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="25.6" />
          </filter>
          <filter id="cqBlur50" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="50" />
          </filter>
          {/* Mask keeping the inner core inside the funnel silhouette, fading toward the ends */}
          <linearGradient
            id="cqMaskFadeL"
            gradientUnits="userSpaceOnUse"
            x1="650"
            y1="0"
            x2="60"
            y2="0"
          >
            <stop offset="0.25" stopColor="#fff" />
            <stop offset="0.95" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="cqMaskFadeR"
            gradientUnits="userSpaceOnUse"
            x1="662"
            y1="0"
            x2="1252"
            y2="0"
          >
            <stop offset="0.25" stopColor="#fff" />
            <stop offset="0.95" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id="cqBlur10" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <mask id="cqCoreMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1312" height="546">
            <rect x="0" y="0" width="1312" height="546" fill="#000" />
            <g filter="url(#cqBlur10)">
              <path
                d="M 650 274 Q 380 280 60 -10 L 60 560 Q 380 304 650 310 Z"
                fill="url(#cqMaskFadeL)"
              />
              <path
                d="M 662 274 Q 932 280 1252 -10 L 1252 560 Q 932 304 662 310 Z"
                fill="url(#cqMaskFadeR)"
              />
              <rect x="636" y="266" width="40" height="52" fill="#fff" />
            </g>
          </mask>
        </defs>

        {/* Left primary funnel */}
        <path
          d="M 650 274
             Q 380 280 60 -10
             L 60 560
             Q 380 304 650 310
             Z"
          fill="url(#cqBeamL)"
          filter="url(#cqBlur25)"
        />

        {/* Right primary funnel — mirrored */}
        <path
          d="M 662 274
             Q 932 280 1252 -10
             L 1252 560
             Q 932 304 662 310
             Z"
          fill="url(#cqBeamR)"
          filter="url(#cqBlur25)"
        />

        {/* Inner bright core — exact Figma gradient rects, clipped to the funnel
            silhouette and faded toward the beam ends via cqCoreMask */}
        <g mask="url(#cqCoreMask)">
          <rect
            x="60"
            y="182"
            width="596"
            height="218"
            fill="url(#cqCoreL)"
            style={{ mixBlendMode: 'plus-lighter' }}
          />
          <rect
            x="656"
            y="182"
            width="596"
            height="218"
            fill="url(#cqCoreR)"
            style={{ mixBlendMode: 'plus-lighter' }}
          />
        </g>

        {/* Crisp 1px hairlines along the funnel edges */}
        <path d="M 650 274 Q 380 280 60 -10" fill="none" stroke="url(#cqEdgeL)" strokeWidth="1" />
        <path d="M 650 310 Q 380 304 60 560" fill="none" stroke="url(#cqEdgeL)" strokeWidth="1" />
        <path d="M 662 274 Q 932 280 1252 -10" fill="none" stroke="url(#cqEdgeR)" strokeWidth="1" />
        <path d="M 662 310 Q 932 304 1252 560" fill="none" stroke="url(#cqEdgeR)" strokeWidth="1" />
      </svg>

      {/* ── Coin / exchange icons ─────────────────────────────────────────── */}
      <div className="cq-animate pointer-events-none absolute inset-0">
        {EXCHANGE_ICONS.map((icon, i) => {
          const Px = parseFloat(icon.left);
          const Py = parseFloat(icon.top);
          const Cy = 53.43;
          // X is piecewise: 0→35% over the first 65% of the loop, 35→50% after.
          // tp = loop fraction at which the icon crosses its Figma X.
          const tp = Px <= 35 ? (0.65 * Px) / 35 : 0.65 + ((Px - 35) * 0.35) / 15;
          const up = 1 - tp;
          // Calculate the Y coordinate at X=0 to make the parabola pass through Figma coordinates
          const A = Cy + (Py - Cy) / (up * up);
          const DURATION = 16;
          // Stagger evenly so they enter the orb one-by-one in sequence
          const delay = -(i * DURATION) / EXCHANGE_ICONS.length;

          return (
            <div key={icon.alt} className="absolute inset-0" style={{ zIndex: 10 }}>
              <div
                className="absolute inset-0"
                style={{
                  animation: `cqIconX ${DURATION}s linear ${delay}s infinite`,
                  transform: `translateX(${Px}%)`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={
                    {
                      animation: `cqIconY ${DURATION}s cubic-bezier(0.333, 0.667, 0.667, 1) ${delay}s infinite`,
                      transform: `translateY(${Py}%)`,
                      '--cq-start-y': `${A.toFixed(2)}%`,
                      '--cq-end-y': `${Cy}%`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="absolute top-0 left-0"
                    style={{
                      animation: `cqIconScale ${DURATION}s linear ${delay}s infinite`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {'slug' in icon ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={`${CDN}/${icon.slug}`}
                        alt={icon.alt}
                        width={48}
                        height={48}
                        style={{ width: 48, height: 48 }}
                        className="object-contain drop-shadow-lg"
                      />
                    ) : (
                      <div
                        role="img"
                        aria-label={icon.alt}
                        className="flex items-center justify-center drop-shadow-lg"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: icon.alt === 'Chainlink' ? '30px' : '50%',
                          background: icon.bg,
                        }}
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          {COIN_GLYPHS[icon.alt]}
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Circular halo behind the orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          top: '53.43%',
          width: '300px',
          height: '300px',
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(93,128,255,0.45) 0%, rgba(93,128,255,0) 70%)',
          zIndex: 15,
        }}
      />

      {/* ── Centre orb — Figma: 120px at (596.24, 231.73) → center y 53.43% ── */}
      <div
        className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          top: '53.43%',
          width: '120px',
          height: '120px',
          background: '#5D80FF',
          boxShadow: '0px 0px 90px #5D80FF',
          zIndex: 20,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/clearquant-orb-icon.png" alt="" width={72} height={72} aria-hidden />
      </div>

      {/* ── Feature pills ─────────────────────────────────────────────────── */}
      <div className="cq-animate pointer-events-none absolute inset-0">
        {FEATURE_PILLS.map((pill, i) => {
          const Px = parseFloat(pill.left);
          const Py = parseFloat(pill.top);
          // Emission point: text anchor just right of the orb centre, one text
          // half-height above the centreline so the pill is centred on the orb.
          const Sy = 51.5;
          // Travel fraction at which the pill crosses its Figma X (X spans
          // 51.5% → 96% linearly over the travel phase).
          const tp = (Px - 51.5) / (96 - 51.5);
          // Funnel opening profile — must match the linear() stops in cqPillY.
          const FUNNEL: [number, number][] = [
            [0, 0],
            [0.2, 0.106],
            [0.4, 0.24],
            [0.55, 0.336],
            [0.7, 0.575],
            [0.85, 0.8],
            [1, 1],
          ];
          const k = FUNNEL.findIndex(([s]) => s >= tp);
          const [s0, e0] = FUNNEL[k - 1];
          const [s1, e1] = FUNNEL[k];
          const e = e0 + ((tp - s0) / (s1 - s0)) * (e1 - e0);
          // Solve end Y so the path passes through the Figma spot exactly at tp.
          const endY = Sy + (Py - Sy) / e;
          const DURATION = 16;
          // Stagger evenly so they exit the orb one-by-one in sequence
          const delay = -(i * DURATION) / FEATURE_PILLS.length;

          return (
            <div key={pill.label} className="absolute inset-0" style={{ zIndex: 16 }}>
              <div
                className="absolute inset-0"
                style={
                  {
                    animation: `cqPillX ${DURATION}s linear ${delay}s infinite`,
                    transform: `translateX(${Px}%)`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="absolute inset-0"
                  style={
                    {
                      animation: `cqPillY ${DURATION}s ${delay}s infinite`,
                      transform: `translateY(${Py}%)`,
                      '--cq-start-y': `${Sy}%`,
                      '--cq-end-y': `${endY.toFixed(2)}%`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="absolute top-0 left-0 font-inter-tight text-[14px] leading-[150%] font-medium whitespace-nowrap text-white"
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: 'rgba(5, 6, 15, 0.2)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transform: 'translate(-12px, -4px)',
                      animation: `cqPillScale ${DURATION}s linear ${delay}s infinite`,
                    }}
                  >
                    {pill.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
