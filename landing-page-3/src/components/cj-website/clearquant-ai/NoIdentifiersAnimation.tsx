/* ─────────────────────────────────────────────────────────────────────────────
 * "No identifiers exposed" — DataStaysYours card illustration.
 * Figma Frame 2147231710: centre shield inside dotted/faint rings, four data
 * chips (Internet Data / Name / Device Info / Email) linked by dashed rounded
 * connectors. Sparks travel from the chips toward the shield (same SMIL
 * stroke-dashoffset technique as NoPredictAnimation / ReadOnlyAnimation).
 * ──────────────────────────────────────────────────────────────────────────── */

const VW = 548;
const VH = 256;

// Ring group is offset from the frame centre (+9, +15) per Figma
const C = { x: 283, y: 143 };

const CHIP_H = 29;
const CHIPS = {
  internet: { x: 0, y: 46, w: 123, label: 'Internet Data' },
  name: { x: 462, y: 46, w: 86, label: 'Name' },
  device: { x: 0, y: 186, w: 123, label: 'Device Info' },
  email: { x: 462, y: 186, w: 86, label: 'Email' },
};

// Dashed rounded connectors (Figma Lines 114–117, radius 48 pill rects),
// drawn chip → ring edge so the sparks flow toward the shield.
const CONNECTORS = [
  `M 123 60.5 H 148 Q 171 60.5 171 84.75 Q 171 109 194 109 H 202`,
  `M 462 60.5 H 418 Q 394 60.5 394 84.75 Q 394 109 371 109 H 364`,
  `M 123 200.5 H 148 Q 171 200.5 171 177.75 Q 171 155 194 155 H 196`,
  `M 462 200.5 H 418 Q 394 200.5 394 177.75 Q 394 155 371 155 H 370`,
];

const DUR = '3s';
const SEG = 0.18;
const TRAVEL = 0.14;
const DEPARTS = [0, 0.25, 0.5, 0.75];

const BLUE = '#5D80FF';

// ic:baseline-shield, 24px viewBox — scaled to the 128px Figma icon box
const SHIELD_PATH = 'M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3z';

function Chip({
  x,
  y,
  w,
  label,
  children,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={CHIP_H} rx="8" fill="rgba(255,255,255,0.05)" />
      <g transform={`translate(${x + 8}, ${y + 6.5})`} stroke={BLUE} strokeWidth="1.1" fill="none">
        {children}
      </g>
      <text
        x={x + 32}
        y={y + CHIP_H / 2}
        dominantBaseline="central"
        className="font-inter-tight"
        fontSize="14"
        fill="rgba(255,255,255,0.5)"
      >
        {label}
      </text>
    </g>
  );
}

export function NoIdentifiersAnimation() {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '548 / 256' }}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          {/* Spark glow — userSpaceOnUse so flat horizontal runs don't collapse */}
          <filter
            id="ni-spark-glow"
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={VW}
            height={VH}
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Vector 1 — blue bloom behind the shield (blur 28.44) */}
          <filter
            id="ni-bloom"
            filterUnits="userSpaceOnUse"
            x={C.x - 160}
            y={C.y - 160}
            width="320"
            height="320"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" />
          </filter>

          {/* Ellipse 10748 — shaded disc */}
          <linearGradient
            id="ni-disc"
            x1={C.x}
            y1={C.y - 82}
            x2={C.x}
            y2={C.y + 82}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.05" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Shield fill: blue fading down */}
          <linearGradient
            id="ni-shield"
            x1={C.x}
            y1={C.y - 59}
            x2={C.x}
            y2={C.y + 59}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={BLUE} />
            <stop offset="1" stopColor={BLUE} stopOpacity="0.1" />
          </linearGradient>

          {/* Lock: white fading down (local 35×42 coords) */}
          <linearGradient
            id="ni-lock"
            x1="17.5"
            y1="0"
            x2="17.5"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* ── Blue glow behind the shield ── */}
        <ellipse
          cx={C.x + 23}
          cy={C.y - 14}
          rx="48"
          ry="43"
          transform={`rotate(75 ${C.x + 23} ${C.y - 14})`}
          fill={BLUE}
          opacity="0.7"
          filter="url(#ni-bloom)"
        >
          <animate
            attributeName="opacity"
            values="0.55;0.75;0.55"
            dur="6s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* ── Dashed connectors ── */}
        {CONNECTORS.map((d) => (
          <path
            key={d}
            d={d}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="3 5"
          />
        ))}

        {/* ── Sparks — chips → shield, staggered ── */}
        {CONNECTORS.map((d, i) => {
          const dep = DEPARTS[i];
          const arr = dep + TRAVEL;
          return (
            <path
              key={`spark-${d}`}
              d={d}
              pathLength="1"
              stroke="rgba(220,232,255,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${SEG} 2`}
              filter="url(#ni-spark-glow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                values={`${SEG};${SEG};${-(1 + SEG)};${-(1 + SEG)}`}
                keyTimes={`0;${dep};${arr + SEG};1`}
                dur={DUR}
                repeatCount="indefinite"
                calcMode="linear"
              />
            </path>
          );
        })}

        {/* ── Rings — same motion as PrivateByDefaultAnimation:
             dotted ring cw 24s, faint ring + shaded disc ccw 16s ── */}
        <g>
          <circle
            cx={C.x}
            cy={C.y}
            r="88"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 7"
            strokeLinecap="round"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${C.x} ${C.y}`}
            to={`360 ${C.x} ${C.y}`}
            dur="24s"
            repeatCount="indefinite"
          />
        </g>
        <g>
          <circle cx={C.x} cy={C.y} r="84.9" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx={C.x} cy={C.y} r="81.7" fill="url(#ni-disc)" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`360 ${C.x} ${C.y}`}
            to={`0 ${C.x} ${C.y}`}
            dur="16s"
            repeatCount="indefinite"
          />
        </g>

        {/* ── Shield (ic:baseline-shield, 128px) ── */}
        <g transform={`translate(${C.x - 64}, ${C.y - 64}) scale(${128 / 24})`}>
          <path d={SHIELD_PATH} fill="url(#ni-shield)" />
        </g>

        {/* ── Lock — public/small-lock.svg, 35×42 centred on the shield ── */}
        <g transform={`translate(${C.x - 17.5}, ${C.y - 21})`}>
          <path
            d="M30.0008 14.8234V12.3533C30.0008 5.53875 24.3932 0 17.5 0C10.6068 0 4.99924 5.54138 4.99924 12.3533V14.8234C2.23664 14.8234 0 17.0363 0 19.7636V37.0597C0 39.7897 2.23664 42 4.99924 42H30.0008C32.7634 42 35 39.7871 35 37.0597V19.7636C35 17.0336 32.7607 14.8234 30.0008 14.8234ZM9.99848 12.3533C9.99848 8.26613 13.3641 4.94025 17.5 4.94025C21.6359 4.94025 25.0015 8.26613 25.0015 12.3533V14.8234H9.99583L9.99848 12.3533ZM19.9996 29.6467C19.9996 30.3019 19.7363 30.9302 19.2675 31.3934C18.7987 31.8566 18.1629 32.1169 17.5 32.1169C16.8371 32.1169 16.2013 31.8566 15.7325 31.3934C15.2637 30.9302 15.0004 30.3019 15.0004 29.6467V24.7065C15.0004 24.0514 15.2637 23.4231 15.7325 22.9599C16.2013 22.4966 16.8371 22.2364 17.5 22.2364C18.1629 22.2364 18.7987 22.4966 19.2675 22.9599C19.7363 23.4231 19.9996 24.0514 19.9996 24.7065V29.6467Z"
            fill="url(#ni-lock)"
          />
        </g>

        {/* ── Data chips ── */}
        <Chip {...CHIPS.internet}>
          {/* database */}
          <ellipse cx="8" cy="3.6" rx="5.3" ry="2.2" />
          <path d="M 2.7 3.6 v 8.8 c 0 1.2 2.4 2.2 5.3 2.2 c 2.9 0 5.3 -1 5.3 -2.2 v -8.8" />
          <path d="M 2.7 8 c 0 1.2 2.4 2.2 5.3 2.2 c 2.9 0 5.3 -1 5.3 -2.2" />
        </Chip>
        <Chip {...CHIPS.name}>
          {/* user */}
          <circle cx="8" cy="5.2" r="2.8" />
          <path d="M 2.9 13.7 c 0 -2.8 2.3 -4.6 5.1 -4.6 c 2.8 0 5.1 1.8 5.1 4.6" />
        </Chip>
        <Chip {...CHIPS.device}>
          {/* computer + phone sync */}
          <rect x="1.4" y="2.8" width="9.6" height="7" rx="1" />
          <path d="M 4.5 12.8 h 4" />
          <path d="M 6.5 9.8 v 3" />
          <rect x="10.8" y="6.6" width="3.8" height="7" rx="1" fill="#101120" />
        </Chip>
        <Chip {...CHIPS.email}>
          {/* mail */}
          <rect x="1.4" y="3.3" width="13.2" height="9.4" rx="1.5" />
          <path d="M 2.6 5 L 8 9.2 L 13.4 5" strokeLinecap="round" strokeLinejoin="round" />
        </Chip>
      </svg>
    </div>
  );
}
