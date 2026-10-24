const VW = 548;
const VH = 256;

const PLATE_X = 137; // group left
const PLATE_W = 274.5;
const STEP = 32;
// Visible plates at tops 37..165; one extra above fades in each cycle
const TOPS = [5, 37, 69, 101, 133, 165];

const DUR = '1.6s';
// Hold, then step down — the fades run alongside the move
const MOVE_TIMES = '0;0.3;1';
const MOVE_VALUES = `0 0;0 0;0 ${STEP}`;
const FADE_IN = { values: '0;0;1', keyTimes: '0;0.3;1' };
const FADE_OUT = { values: '1;1;0', keyTimes: '0;0.3;1' };
const SPLINES = '0.4 0 0.2 1;0.4 0 0.2 1';

const BLUE = '#5D80FF';

// Trapezoid plate in local coords (274.5×54.5, corner radius 10)
const PLATE_PATH =
  'M 55 0 H 219.5 Q 229.5 0 235.86 7.71 L 268.14 46.79 Q 274.5 54.5 264.5 54.5 H 10 Q 0 54.5 6.36 46.79 L 38.64 7.71 Q 45 0 55 0 Z';

function Plate({ top, fade }: { top: number; fade?: 'in' | 'out' }) {
  return (
    <g transform={`translate(${PLATE_X}, ${top})`} opacity={fade === 'in' ? 0 : 1}>
      <path d={PLATE_PATH} fill="url(#det-plate)" stroke="rgba(93,128,255,0.4)" strokeWidth="1" />
      {/* Centre dot + soft glow (Ellipse 2206x) */}
      <circle cx={PLATE_W / 2} cy={STEP} r="7" fill="rgba(93,128,255,0.18)" />
      <circle cx={PLATE_W / 2} cy={STEP} r="3" fill={BLUE} />
      {fade && (
        <animate
          attributeName="opacity"
          values={fade === 'in' ? FADE_IN.values : FADE_OUT.values}
          keyTimes={fade === 'in' ? FADE_IN.keyTimes : FADE_OUT.keyTimes}
          calcMode="spline"
          keySplines={SPLINES}
          dur={DUR}
          repeatCount="indefinite"
        />
      )}
    </g>
  );
}

export function DeterministicAnimation() {
  return (
    <div className="absolute inset-0">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="det-plate"
            x1={PLATE_W / 2}
            y1="0"
            x2={PLATE_W / 2}
            y2="54.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={BLUE} stopOpacity="0.02" />
            <stop offset="1" stopColor={BLUE} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g>
          {TOPS.map((top, i) => (
            <Plate
              key={top}
              top={top}
              fade={i === 0 ? 'in' : i === TOPS.length - 1 ? 'out' : undefined}
            />
          ))}
          <animateTransform
            attributeName="transform"
            type="translate"
            values={MOVE_VALUES}
            keyTimes={MOVE_TIMES}
            calcMode="spline"
            keySplines={SPLINES}
            dur={DUR}
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
}
