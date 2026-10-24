'use client';

import * as React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { CjRingMark } from '@/components/cj-website/verified-profile/shared';
import { publicEnvVars } from '@/settings';
import { landingSlideUp } from '@/lib/animations';
import {
  RevealSequence,
  SequenceDot,
  SequenceTyping,
  useRevealSequence,
} from '@/components/ui/RevealSequence';

const AVATAR_URL = `${publicEnvVars.NEXT_PUBLIC_CLOUDFRONT_URL}/public/website-content/b1b46d8148a7d5021959dc636317029422f8b484.jpg`;

/* ─────────────────────────────────────────────────────────────────────────── */
/* Card 1 — Proactive insights                                                  */
/* Floating icon tiles orbit a central glow; ClearQuant orb sits on a 3-D    */
/* ring platform at the bottom (Figma: Frame 2147224950 illustration area).   */
/* ─────────────────────────────────────────────────────────────────────────── */
/** iconamoon:flag-light */
function FlagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 3v2m0 16v-8m0-8h12l-2 4l2 4H8m0-8v8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ion:sync */
function SyncIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 512 512" fill="none" aria-hidden>
      <path
        d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
        stroke="white"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
        stroke="white"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** material-symbols-light:pattern */
function PatternIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="white"
        d="M6 19.23q-.517 0-.874-.356T4.769 18t.357-.874t.874-.357q.125 0 .221.02q.096.019.202.069l4.435-4.435q-.125-.333-.055-.682t.33-.608t.608-.33q.35-.07.682.055l4.435-4.435l-.06-.202q-.029-.096-.029-.221q0-.517.357-.874T18 4.769t.874.357t.357.874t-.357.874t-.874.357q-.308 0-.423-.089l-4.435 4.43q.125.332.055.684t-.33.611q-.265.266-.614.336q-.35.07-.682-.06L7.246 17.46l.039.039h3.592q.16-.334.456-.533q.296-.198.667-.198q.377 0 .686.196q.308.195.449.535h3.73q.16-.34.459-.536q.299-.195.676-.195q.517 0 .874.357t.357.874t-.357.874t-.874.357q-.377 0-.676-.198t-.459-.533h-3.73q-.14.34-.45.536q-.308.195-.685.195q-.371 0-.667-.198q-.296-.199-.456-.533H7.123q-.14.335-.446.533T6 19.23m0-6q-.517 0-.874-.357T4.769 12t.357-.874t.874-.357t.874.357t.357.874t-.357.874t-.874.357m0-6q-.517 0-.874-.357T4.769 6t.357-.874T6 4.769t.874.357t.357.874t-.357.874T6 7.231m5.126-.357q-.357-.357-.357-.874t.357-.874t.874-.357t.874.357t.357.874t-.357.874t-.874.357t-.874-.357M18 13.231q-.517 0-.874-.357T16.769 12t.357-.874t.874-.357t.874.357t.357.874t-.357.874t-.874.357"
      />
    </svg>
  );
}

/** hugeicons:chart-up */
function ChartUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g stroke="white" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M20.5 10.5v9c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54C19.699 21 19.466 21 19 21s-.699 0-.883-.076a1 1 0 0 1-.54-.541c-.077-.184-.077-.417-.077-.883v-9c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C18.301 9 18.534 9 19 9s.699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883Z" />
        <path strokeLinecap="round" d="M16.5 3h3v3" />
        <path strokeLinecap="round" d="M19 3.5s-4 5-14.5 8.5" />
        <path d="M13.5 14v5.5c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54C12.699 21 12.466 21 12 21s-.699 0-.883-.076a1 1 0 0 1-.54-.541c-.077-.184-.077-.417-.077-.883V14c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54c.184-.077.417-.077.883-.077s.699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883Zm-7 2.5v3c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54C5.699 21 5.466 21 5 21s-.699 0-.883-.076a1 1 0 0 1-.54-.541c-.077-.184-.077-.417-.077-.883v-3c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C4.301 15 4.534 15 5 15s.699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883Z" />
      </g>
    </svg>
  );
}

function ProactiveIllustration() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  // Figma Ellipse 10742–10747, converted to offsets from frame center (193.5, 152)
  const DOTS: [number, number][] = [
    [28.5, 18],
    [-1.5, -12],
    [28.5, -32],
    [-51.5, -62],
    [-41.5, 28],
    [68.5, -62],
  ];

  // Figma Frames 2 / 2147231700 / 2147231701 / 2147231702 — offsets from center
  const TILES = [
    { render: () => <FlagIcon />, x: -94, y: -64.5, rotate: -15 },
    { render: () => <SyncIcon />, x: -30.5, y: -14, rotate: 15 },
    { render: () => <PatternIcon />, x: 22.5, y: -76, rotate: 15 },
    { render: () => <ChartUpIcon />, x: 71.5, y: -16, rotate: -15 },
  ];

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-[16px] bg-[#080912]">
      {/* Central blue glow — Figma Rectangle 41: 180px, blur 32, opacity 0.7 */}
      <motion.div
        aria-hidden
        className="absolute h-[260px] w-[260px]"
        style={{
          left: 'calc(50% - 129.5px)',
          top: 'calc(50% - 127px)',
          background:
            'radial-gradient(closest-side, rgba(93,128,255,0.65) 0%, rgba(93,128,255,0.35) 45%, rgba(93,128,255,0) 100%)',
        }}
        initial={false}
        animate={
          isInView
            ? reduceMotion
              ? { opacity: 0.7 }
              : { opacity: [0.55, 0.7, 0.55] }
            : { opacity: 0 }
        }
        transition={
          isInView
            ? reduceMotion
              ? { duration: 0.6 }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }
        }
      />

      {/* Light beam — soft volumetric cone rising from the orb (appears first) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: 'calc(50% - 110px)',
          top: 38,
          width: 220,
          height: 192,
          transformOrigin: '50% 100%',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={
          isInView ? { duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }
        }
      >
        {/* Wide soft cone — blur wrapper outside the clip so edges stay feathered */}
        <div className="absolute inset-0" style={{ filter: 'blur(22px)' }}>
          <div
            className="h-full w-full"
            style={{
              clipPath: 'polygon(8% 0%, 92% 0%, 62% 100%, 38% 100%)',
              background:
                'linear-gradient(180deg, rgba(93,128,255,0.06) 0%, rgba(93,128,255,0.18) 55%, rgba(120,148,249,0.34) 100%)',
              maskImage: 'linear-gradient(180deg, transparent 0%, black 45%, black 100%)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 45%, black 100%)',
            }}
          />
        </div>
        {/* Bright inner core */}
        <div className="absolute inset-0" style={{ filter: 'blur(12px)' }}>
          <div
            className="h-full w-full"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 57% 100%, 43% 100%)',
              background:
                'linear-gradient(180deg, rgba(120,148,249,0.05) 0%, rgba(120,148,249,0.16) 50%, rgba(255,255,255,0.2) 100%)',
              maskImage: 'linear-gradient(180deg, transparent 5%, black 55%, black 100%)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent 5%, black 55%, black 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Rotating dashed platform ring — Figma Ellipse 10750 (224×121), spins anticlockwise */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: 'calc(50% - 111.5px)',
          top: 133.5,
          width: 224,
          height: 224,
          transform: 'rotateX(57.3deg)',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={isInView ? { duration: 0.6 } : { duration: 0 }}
      >
        <svg
          viewBox="0 0 224 224"
          fill="none"
          className="h-full w-full animate-rotate-ccw motion-reduce:animate-none"
        >
          <circle
            cx="112"
            cy="112"
            r="111.25"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 7"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Rotating main shaded ring — Figma Ellipse 10749 (216×113), spins clockwise */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: 'calc(50% - 107.5px)',
          top: 137.5,
          width: 216,
          height: 216,
          transform: 'rotateX(58.45deg)',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={isInView ? { duration: 0.6 } : { duration: 0 }}
      >
        <svg
          viewBox="0 0 216 216"
          fill="none"
          className="h-full w-full animate-rotate-cw motion-reduce:animate-none"
        >
          <circle cx="108" cy="108" r="107" stroke="url(#proactive-ring-shade)" strokeWidth="1.5" />
          <defs>
            <linearGradient
              id="proactive-ring-shade"
              x1="0"
              y1="0"
              x2="216"
              y2="216"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.35" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.06" />
              <stop offset="1" stopColor="white" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Static gradient disc — Figma Ellipse 10748: 208×104 */}
      <motion.svg
        aria-hidden
        className="absolute"
        style={{ left: 'calc(50% - 103.5px)', top: 193 }}
        width="208"
        height="104"
        viewBox="0 0 208 104"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={isInView ? { duration: 0.6 } : { duration: 0 }}
      >
        <ellipse cx="104" cy="52" rx="104" ry="52" fill="url(#proactive-disc)" />
        <defs>
          <linearGradient
            id="proactive-disc"
            x1="104"
            y1="0"
            x2="104"
            y2="104"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.05" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Isometric orb disc — Figma Frame 2147231699: 55px, matrix(0.87,0.5,-0.87,0.5) */}
      <motion.div
        aria-hidden
        className="absolute"
        style={{ left: 'calc(50% - 27.5px)', top: 217, width: 55, height: 55 }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={
          isInView ? { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }
        }
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-full bg-glow-blue"
          style={{ transform: 'matrix(0.87, 0.5, -0.87, 0.5, 0, 0)' }}
        >
          {/* Static CJ ring mark (same brand logo as landing orb) */}
          <CjRingMark size={32} color="#FFFFFF" />
        </div>
      </motion.div>

      {/* Rising rings — Figma Ellipse 10733–10735: 64×32, white/50% */}
      {reduceMotion
        ? [193, 205, 217].map((top, i) => (
            <div
              key={top}
              aria-hidden
              className="absolute rounded-[50%]"
              style={{
                left: 'calc(50% - 31.5px)',
                top,
                width: 64,
                height: 32,
                border: `1px solid rgba(255,255,255,${0.5 - i * 0.12})`,
              }}
            />
          ))
        : [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute rounded-[50%] border border-white/50"
              style={{ left: 'calc(50% - 31.5px)', top: 217, width: 64, height: 32 }}
              initial={false}
              animate={isInView ? { y: [0, -26], opacity: [0, 0.9, 0] } : { opacity: 0 }}
              transition={
                isInView
                  ? { duration: 2.4, delay: 0.4 + i * 0.8, repeat: Infinity, ease: 'easeOut' }
                  : { duration: 0 }
              }
            />
          ))}

      {/* Accent dots — twinkle */}
      {DOTS.map(([x, y], i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute h-1 w-1 rounded-full blur-[1px]"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            background: '#7894F9',
          }}
          initial={{ opacity: 0 }}
          animate={
            isInView ? (reduceMotion ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }) : { opacity: 0 }
          }
          transition={
            isInView
              ? reduceMotion
                ? { duration: 0.4 }
                : { duration: 2 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }
              : { duration: 0 }
          }
        />
      ))}

      {/* Floating icon tiles — emerge from the center orb through the beam, then bob */}
      {TILES.map(({ render, x, y, rotate }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `calc(50% - 20px + ${x}px)`, top: `calc(50% - 20px + ${y}px)` }}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.2, x: -x, y: 92.5 - y }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, x: 0, y: 0 }
              : reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.2, x: -x, y: 92.5 - y }
          }
          transition={
            isInView
              ? { duration: 0.8, delay: 1.0 + i * 0.1, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0 }
          }
        >
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/10"
            style={{ rotate }}
            animate={reduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 3.6 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }
            }
          >
            {render()}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Card 2 — Natural language Q&A                                               */
/* Sequential reveal: left card → message bubble → connector draws → right    */
/* card slides in → AI response types out. Uses RevealSequence step system.   */
/* ─────────────────────────────────────────────────────────────────────────── */

/** motion.div driven by RevealSequence step, supports x offset. */
function QARevealBlock({
  index,
  children,
  className,
  style,
  x = 0,
  y = 8,
  duration = 0.45,
  advanceOnComplete = true,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  x?: number;
  y?: number;
  duration?: number;
  advanceOnComplete?: boolean;
}) {
  const { step, advance } = useRevealSequence();
  const reached = step >= index;

  React.useEffect(() => {
    if (step === index && advanceOnComplete) {
      const t = setTimeout(() => advance(index), duration * 1000);
      return () => clearTimeout(t);
    }
  }, [step, index, advance, duration, advanceOnComplete]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={false}
      animate={reached ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Height-collapse reveal for the message bubble inside the left card. */
function QAMessageReveal({ index }: { index: number }) {
  const { step, advance } = useRevealSequence();
  const reached = step >= index;
  const duration = 0.4;

  React.useEffect(() => {
    if (step === index) {
      const t = setTimeout(() => advance(index), duration * 1000);
      return () => clearTimeout(t);
    }
  }, [step, index, advance]);

  return (
    <motion.div
      initial={false}
      animate={reached ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: 'hidden' }}
    >
      <div className="rounded-[12px] bg-glow-blue px-3 py-2 font-inter-tight text-[12px] leading-[150%] text-white">
        Why do I lose more on Friday afternoons?
      </div>
    </motion.div>
  );
}

/**
 * Dashed L-shaped connector — matching Figma Ellipse 10751/10752 positions.
 *
 * The Figma connector is an L: horizontal right from the message bubble,
 * then a rounded corner turning down to the AI card. The original Figma
 * had a rectangle, but only the top+right sides are visible in the design
 * (the cards cover the other two sides). We draw just those two sides.
 *
 * Coordinates (viewBox 0 0 387 304):
 *   White dot: (174, 68) — Figma Ellipse 10751
 *   Corner:    (209, 68) → rx=8 → (209, 76)
 *   Blue dot:  (209, 214) — Figma Ellipse 10752
 */
function QAConnectorPath({ index, d }: { index: number; d: string }) {
  const { step, advance } = useRevealSequence();
  const reached = step >= index;
  const duration = 0.7;

  React.useEffect(() => {
    if (step === index) {
      const t = setTimeout(() => advance(index), duration * 1000);
      return () => clearTimeout(t);
    }
  }, [step, index, advance]);

  return (
    <>
      <defs>
        {/* Framer's pathLength animation overrides strokeDasharray, so the
            dashed path is revealed through a mask drawn by a solid path. */}
        <mask id="qa-thread-mask" maskUnits="userSpaceOnUse">
          <motion.path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth={6}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: reached ? 1 : 0 }}
            transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          />
        </mask>
      </defs>
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
        strokeDasharray="4 6"
        strokeLinecap="round"
        mask="url(#qa-thread-mask)"
      />
    </>
  );
}

function QAIllustration() {
  const measureRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(387);

  React.useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Thread geometry in real pixels: out of the bubble's right edge (fixed from
  // the left) → corner down → vertical → corner right → the AI card's left
  // edge (fixed from the right, card is right-4 + w-40).
  const xEnd = width - 185;
  const d = `M 172 76 H 180 Q 188 76 188 84 V 205 Q 188 213 196 213 H ${xEnd}`;

  return (
    <RevealSequence
      className="relative h-full w-full overflow-hidden rounded-[16px] bg-[#080912]"
      amount={0.4}
    >
      <div ref={measureRef} aria-hidden className="pointer-events-none absolute inset-0" />
      {/* Step 0: User card (avatar) slides in from left */}
      <QARevealBlock
        index={0}
        x={-16}
        duration={0.45}
        className="absolute top-4 left-4 z-10 flex w-40 flex-col gap-2 rounded-[20px] border border-white/[0.05] bg-elevated p-2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AVATAR_URL}
          alt="Trader avatar"
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
        {/* Step 1: Message bubble expands inside the card */}
        <QAMessageReveal index={1} />
      </QARevealBlock>

      {/* Step 2: S-shaped dashed connector draws + endpoint dots pop in */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        viewBox={`0 0 ${width} 304`}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <QAConnectorPath index={2} d={d} />
        {/* White dot at connector start — sits on the bubble's right edge */}
        <SequenceDot index={2} cx={172} cy={76} r={2.5} fill="white" />
        {/* Blue dot at connector end — at the AI card's left edge, appears when line arrives */}
        <SequenceDot index={2} cx={width - 182} cy={213} r={3} fill="#5D80FF" delay={0.55} />
      </svg>

      {/* Step 3: AI response card slides in from right; step 4: text types out */}
      <QARevealBlock
        index={3}
        x={16}
        duration={0.45}
        className="absolute right-4 bottom-4 z-10 flex w-40 flex-col gap-2 rounded-[20px] border border-white/[0.05] bg-elevated p-2"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-glow-blue">
          <CjRingMark size={16} color="#FFFFFF" />
        </div>
        <div className="rounded-[12px] bg-dark-card px-3 py-2 font-inter-tight text-[12px] leading-[150%] text-white">
          <SequenceTyping
            index={4}
            text="I'll run the report over your latest 90-day performance window, using close time as..."
            speed={22}
            advanceOnComplete={false}
          />
        </div>
      </QARevealBlock>
    </RevealSequence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Card 3 — ClearQuant Score                                                   */
/* Animated donut arc (Framer Motion, in-view trigger) with the same dashed   */
/* rotating ring used in PrivateByDefaultAnimation (TrustSecurity section).   */
/* Arc uses a conic-gradient-style linear() fill: red→orange→yellow→green.   */
/* ─────────────────────────────────────────────────────────────────────────── */
function ScoreIllustration() {
  const ref = React.useRef<HTMLDivElement>(null);
  // once: false → resets and replays every time the card scrolls back into view
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  const score = 76;
  const CX = 100;
  const CY = 100;
  const R = 80;
  const circ = 2 * Math.PI * R;
  const filled = (score / 100) * circ;

  // Dot position: arc starts at 12 o'clock (−90°) and advances clockwise by score%
  // The <g> rotates the arc group by -90°, so the dot (outside the group) uses
  // the same -90° + progress formula in the un-rotated coordinate system.
  const endAngle = -Math.PI / 2 + (score / 100) * 2 * Math.PI;
  const dotX = CX + R * Math.cos(endAngle);
  const dotY = CY + R * Math.sin(endAngle);

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[16px] bg-[#080912]"
    >
      {/* ── Rotating dashed outer ring (same as PrivateByDefaultAnimation) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 224, height: 224 }}
      >
        <svg
          viewBox="0 0 224 224"
          fill="none"
          className="h-full w-full animate-rotate-cw motion-reduce:animate-none"
        >
          <circle
            cx="112"
            cy="112"
            r="111.25"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 7"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Counter-rotating faint ring + shaded disc ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 224, height: 224 }}
      >
        <svg
          viewBox="0 0 224 224"
          fill="none"
          className="h-full w-full animate-rotate-ccw motion-reduce:animate-none"
        >
          <circle cx="112" cy="112" r="107.25" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <circle cx="112" cy="112" r="104" fill="url(#score-disc)" />
          <defs>
            <linearGradient
              id="score-disc"
              x1="112"
              y1="8"
              x2="112"
              y2="216"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.05" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Score ring (200×200 viewBox, matching CircularProgressCard pattern) ── */}
      <div className="relative h-[160px] w-[160px]">
        <svg width="100%" height="100%" viewBox="0 0 200 200" aria-hidden>
          <defs>
            {/* Score gradient: green (good) → yellow → orange → red (risk) */}
            <linearGradient id="score-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Rotate group so arc starts at 12 o'clock */}
          <g transform={`rotate(-90, ${CX}, ${CY})`}>
            {/* Track */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={14}
            />
            {/* Animated progress arc — plays in on scroll, resets instantly when off-screen */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={R}
              fill="transparent"
              stroke="url(#score-arc-grad)"
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: isInView ? circ - filled : circ }}
              transition={isInView ? { duration: 1.6, ease: 'easeOut' } : { duration: 0 }}
            />
          </g>

          {/* Endpoint dot — fades in with arc, resets instantly when off-screen */}
          <motion.circle
            cx={dotX}
            cy={dotY}
            r={7}
            fill="#5D80FF"
            stroke="#ffffff"
            strokeWidth={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={isInView ? { duration: 0.3, delay: 1.4 } : { duration: 0 }}
          />
        </svg>

        {/* Score number */}
        <div className="absolute inset-0 flex items-center justify-center font-inter-tight text-[28px] font-medium text-glow-blue">
          {score}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Cards data                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    title: 'Proactive insights',
    body: 'Risk flags, patterns, and edges surface automatically every time you open the app, no prompting required.',
    Illustration: ProactiveIllustration,
  },
  {
    title: 'Natural language Q&A',
    body: "Ask 'why do I lose more on Friday afternoons?' and get a specific answer pulled straight from your own trade history.",
    Illustration: QAIllustration,
  },
  {
    title: 'ClearQuant Score',
    body: 'A single trackable number for your trading discipline, like a credit score, but for risk management and consistency.',
    Illustration: ScoreIllustration,
  },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* Section                                                                     */
/* Figma: Frame 2147231456 — padding 100px, gap 60px, max-w 1240px            */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function NotAChatbot() {
  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        {/* Header — Figma Frame 2147231451: max-w 660px, gap 16px */}
        <DirectionalReveal variants={landingSlideUp}>
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Badge — Figma Frame 2147224951 */}
            <div className="inline-flex items-center rounded-[8px] border-[1.5px] border-white/5 bg-linear-to-b from-white/[0.02] to-white/10 px-2 py-1 font-inter-tight text-[12px] text-white/70">
              Why it&apos;s different
            </div>

            {/* Heading — Figma: 48px, weight 400, line-height 100% */}
            <h2 className="max-w-[660px] font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
              Not a chatbot.
              <br />
              An analyst.
            </h2>

            {/* Body — Figma: 18px, line-height 150%, white/70 */}
            <p className="max-w-[660px] font-inter-tight text-[16px] leading-[150%] text-white/70 sm:text-[18px]">
              Most AI trading tools wait for you to type a question. Clearquant AI works the moment
              you log a trade, surfacing what matters before you ask.
            </p>
          </div>
        </DirectionalReveal>

        {/* Cards grid — Figma Frame 2147231455: 3 cols, gap 16px, h 476px */}
        <DirectionalReveal variants={landingSlideUp}>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {CARDS.map(({ title, body, Illustration }) => (
              <div
                key={title}
                className="flex flex-col gap-6 rounded-[24px] border border-white/[0.05] bg-dark-card p-2"
              >
                {/* Illustration — Figma: 387×304, border-radius 16px */}
                <div className="h-[304px] w-full overflow-hidden rounded-[16px]">
                  <Illustration />
                </div>

                {/* Text — Figma Frame 2147231448: px 16, pb 16, gap 8 */}
                <div className="flex flex-col gap-2 px-4 pb-4">
                  <h3 className="font-inter-tight text-[24px] leading-[150%] font-medium text-white">
                    {title}
                  </h3>
                  <p className="font-inter-tight text-[16px] leading-[150%] text-white/70">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DirectionalReveal>
      </div>
    </section>
  );
}
