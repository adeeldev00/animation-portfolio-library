'use client';

/* ─────────────────────────────────────────────────────────────────────────────
 * "It will not predict" — BuiltToTrust card illustration.
 * CJ orb forks into two branches: a dotted dead-end up to a red ✗ "Prediction"
 * node, and a live glowing branch down to a blue ✓ "Analysis" node with a
 * spark sweeping along it (same SMIL stroke-dashoffset technique as
 * ReadOnlyAnimation / SyncTradesAnimation).
 * ──────────────────────────────────────────────────────────────────────────── */

const VW = 548;
const VH = 256;

const ORB = { cx: 110, cy: 128, r: 26 };

const NODE_R = 24;
const PREDICT = { cx: 400, cy: 54 };
const ANALYZE = { cx: 400, cy: 194 };

// Branches share a short horizontal run out of the orb, then S-bend apart.
const PATH_END = PREDICT.cx - NODE_R - 6; // 370
const P_UP = `M ${ORB.cx + ORB.r} ${ORB.cy} H 168 C 216 ${ORB.cy} 216 ${PREDICT.cy} 264 ${PREDICT.cy} H ${PATH_END}`;
const P_DOWN = `M ${ORB.cx + ORB.r} ${ORB.cy} H 168 C 216 ${ORB.cy} 216 ${ANALYZE.cy} 264 ${ANALYZE.cy} H ${PATH_END}`;

const DUR = '3s';
const SEG = 0.16;
// Spark departs, arrives at the Analysis node, then rests until the next cycle
const DEPART = 0.08;
const ARRIVE = 0.23;

const RED = '#F04438';
const BLUE = '#5D80FF';

export function NoPredictAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          {/* Spark glow — userSpaceOnUse so flat horizontal runs don't collapse */}
          <filter id="np-bar-glow" filterUnits="userSpaceOnUse" x="0" y="0" width={VW} height={VH}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Orb bloom */}
          <filter id="np-orb-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="b" />
            <feFlood floodColor={BLUE} floodOpacity="0.55" result="c" />
            <feComposite in="c" in2="b" operator="in" result="s" />
            <feMerge>
              <feMergeNode in="s" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft static glow under the live branch */}
          <filter id="np-line-glow" filterUnits="userSpaceOnUse" x="0" y="0" width={VW} height={VH}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>

          {/* Live branch fades from bright near the orb to subtle at the node */}
          <linearGradient
            id="np-live-grad"
            x1={ORB.cx + ORB.r}
            y1="0"
            x2={PATH_END}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(140,165,255,0.8)" />
            <stop offset="40%" stopColor="rgba(93,128,255,0.35)" />
            <stop offset="100%" stopColor="rgba(93,128,255,0.6)" />
          </linearGradient>
        </defs>

        {/* ── Dead branch — dotted up to Prediction ── */}
        <path
          d={P_UP}
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
        />

        {/* ── Live branch — static glow + gradient line + traveling spark ── */}
        <path
          d={P_DOWN}
          stroke="rgba(93,128,255,0.3)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#np-line-glow)"
        />
        <path d={P_DOWN} stroke="url(#np-live-grad)" strokeWidth="2" strokeLinecap="round" />
        <path
          d={P_DOWN}
          pathLength="1"
          stroke="rgba(220,232,255,0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${SEG} 2`}
          filter="url(#np-bar-glow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            values={`${SEG};${SEG};${-(1 + SEG)};${-(1 + SEG)}`}
            keyTimes={`0;${DEPART};${ARRIVE + SEG};1`}
            dur={DUR}
            repeatCount="indefinite"
            calcMode="linear"
          />
        </path>

        {/* ── Center orb with CJ ring mark ── */}
        <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r} fill={BLUE} filter="url(#np-orb-glow)" />
        <circle cx={ORB.cx} cy={ORB.cy} r={ORB.r} fill={BLUE} />
        <g transform={`translate(${ORB.cx - 16}, ${ORB.cy - 16}) scale(${32 / 34})`} opacity={0.92}>
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

        {/* ── Prediction node — red ✗ (rejected) ── */}
        <circle
          cx={PREDICT.cx}
          cy={PREDICT.cy}
          r={NODE_R}
          fill="rgba(240,68,56,0.06)"
          stroke={RED}
          strokeWidth="1.5"
        />
        <g stroke={RED} strokeWidth="2.5" strokeLinecap="round">
          <path d={`M ${PREDICT.cx - 7} ${PREDICT.cy - 7} l 14 14`} />
          <path d={`M ${PREDICT.cx + 7} ${PREDICT.cy - 7} l -14 14`} />
        </g>
        <text
          x={PREDICT.cx + NODE_R + 16}
          y={PREDICT.cy}
          dominantBaseline="central"
          className="font-inter-tight"
          fontSize="20"
          fill="rgba(255,255,255,0.4)"
        >
          Prediction
        </text>

        {/* ── Analysis node — blue ✓ (chosen), pulses on spark arrival ── */}
        <circle
          cx={ANALYZE.cx}
          cy={ANALYZE.cy}
          r={NODE_R}
          fill="rgba(93,128,255,0.08)"
          stroke={BLUE}
          strokeWidth="1.5"
        />
        <path
          d={`M ${ANALYZE.cx - 8} ${ANALYZE.cy} l 5.5 5.5 l 10.5 -10.5`}
          stroke={BLUE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text
          x={ANALYZE.cx + NODE_R + 16}
          y={ANALYZE.cy}
          dominantBaseline="central"
          className="font-inter-tight"
          fontSize="20"
          fill="rgba(255,255,255,0.9)"
        >
          Analysis
        </text>

        {/* Pulse ring — expands when the spark reaches the Analysis node */}
        <circle
          cx={ANALYZE.cx}
          cy={ANALYZE.cy}
          r={NODE_R}
          fill="none"
          stroke={BLUE}
          strokeWidth="1.5"
          opacity="0"
        >
          <animate
            attributeName="r"
            values={`${NODE_R};${NODE_R};${NODE_R + 14};${NODE_R};${NODE_R}`}
            keyTimes={`0;${ARRIVE};${ARRIVE + 0.14};${ARRIVE + 0.141};1`}
            dur={DUR}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values={`0;0;0.7;0;0`}
            keyTimes={`0;${ARRIVE};${ARRIVE + 0.03};${ARRIVE + 0.14};1`}
            dur={DUR}
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
