'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp, User } from 'lucide-react';
import { CjRingMark } from '@/components/cj-website/verified-profile/shared';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';

// ─── chart constants (shared y-scale) ────────────────────────────────────────

const GREEN_DATA = [
  { value: 4500 },
  { value: 7500 },
  { value: 9500 },
  { value: 7000 },
  { value: 4500 },
  { value: 8000 },
  { value: 13000 },
  { value: 17500 },
  { value: 19777 },
];
const RED_DATA = [
  { value: 19777 },
  { value: 17000 },
  { value: 14000 },
  { value: 10000 },
  { value: 7000 },
  { value: 3500 },
  { value: -1500 },
  { value: -4500 },
];

const W = 584,
  H = 200,
  V_PAD = 14,
  H_PAD = 6,
  BLEED = 12;
const MID_X = W / 2;
const ALL_VALUES = [...GREEN_DATA, ...RED_DATA].map((p) => p.value);
const MIN_V = Math.min(...ALL_VALUES);
const MAX_V = Math.max(...ALL_VALUES);
const RANGE = MAX_V - MIN_V;
const GREEN_MS = 900,
  RED_MS = 700,
  TOTAL_MS = GREEN_MS + RED_MS;
const G_CLIP_W = MID_X + BLEED,
  R_CLIP_W = W - MID_X + BLEED;
const DELAY_FRAC = (GREEN_MS / TOTAL_MS).toFixed(4);

function toY(v: number) {
  return V_PAD + (H - V_PAD * 2) * (1 - (v - MIN_V) / RANGE);
}

type Pt = { x: number; y: number };
function smoothPath(pts: Pt[]): string {
  if (pts.length <= 2)
    return pts.reduce(
      (d, p, i) => `${d}${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)} `,
      ''
    );
  return pts.slice(1).reduce(
    (d, p, i) => {
      const prev = pts[i],
        before = pts[i - 1] ?? prev,
        next = pts[i + 2] ?? p;
      const c1 = { x: prev.x + (p.x - before.x) / 6, y: prev.y + (p.y - before.y) / 6 };
      const c2 = { x: p.x - (next.x - prev.x) / 6, y: p.y - (next.y - prev.y) / 6 };
      return `${d} C${c1.x.toFixed(2)},${c1.y.toFixed(2)} ${c2.x.toFixed(2)},${c2.y.toFixed(2)} ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    },
    `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`
  );
}

const GC: Pt[] = GREEN_DATA.map((p, i) => ({
  x: H_PAD + (i / (GREEN_DATA.length - 1)) * (MID_X - H_PAD),
  y: toY(p.value),
}));
const RC: Pt[] = RED_DATA.map((p, i) => ({
  x: MID_X + (i / (RED_DATA.length - 1)) * (W - MID_X - H_PAD),
  y: toY(p.value),
}));

const GREEN_PATH = smoothPath(GC);
const RED_PATH = smoothPath(RC);
const D_G_VALLEY = GC[4];
const D_G_PEAK = GC[GC.length - 1];
const D_R_MID = RC[4];
const D_R_END = RC[RC.length - 1];

// ─── PnL chart ────────────────────────────────────────────────────────────────

function PnLChart({ replayKey = 0 }: { replayKey?: number }) {
  const uid = useId().replace(/:/g, '');
  const [showGD, setShowGD] = useState(false);
  const [showRD, setShowRD] = useState(false);

  // Hide both drawdown markers again on each replay.
  const [prevReplayKey, setPrevReplayKey] = useState(replayKey);
  if (replayKey !== prevReplayKey) {
    setPrevReplayKey(replayKey);
    setShowGD(false);
    setShowRD(false);
  }

  useEffect(() => {
    const t1 = setTimeout(() => setShowGD(true), GREEN_MS);
    const t2 = setTimeout(() => setShowRD(true), TOTAL_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [replayKey]);

  return (
    <div className="relative w-full" style={{ height: H }}>
      <svg
        key={replayKey}
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        overflow="visible"
        style={{ display: 'block' }}
      >
        <defs>
          <clipPath id={`${uid}-gc`}>
            <rect x={-BLEED} y={-BLEED} height={H + BLEED * 2}>
              <animate
                attributeName="width"
                values={`0;${G_CLIP_W}`}
                keyTimes="0;1"
                dur={`${GREEN_MS}ms`}
                calcMode="spline"
                keySplines="0.25 1 0.5 1"
                fill="freeze"
              />
            </rect>
          </clipPath>
          <clipPath id={`${uid}-rc`}>
            <rect x={MID_X - BLEED} y={-BLEED} height={H + BLEED * 2}>
              <animate
                attributeName="width"
                values={`0;0;${R_CLIP_W}`}
                keyTimes={`0;${DELAY_FRAC};1`}
                dur={`${TOTAL_MS}ms`}
                calcMode="spline"
                keySplines="0 0 0 0;0.25 1 0.5 1"
                fill="freeze"
              />
            </rect>
          </clipPath>
        </defs>

        <g clipPath={`url(#${uid}-gc)`}>
          <path
            d={GREEN_PATH}
            stroke="#22C55E"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g clipPath={`url(#${uid}-rc)`}>
          <path
            d={RED_PATH}
            stroke="#EF4444"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {showGD && (
          <>
            <circle cx={D_G_VALLEY.x} cy={D_G_VALLEY.y} r={5} fill="#22C55E" />
            <circle cx={D_G_PEAK.x} cy={D_G_PEAK.y} r={5} fill="#22C55E" />
          </>
        )}
        {showRD && (
          <>
            <circle cx={D_R_MID.x} cy={D_R_MID.y} r={5} fill="#EF4444" />
            <circle cx={D_R_END.x} cy={D_R_END.y} r={5} fill="#EF4444" />
          </>
        )}
      </svg>

      <div
        className="pointer-events-none absolute"
        style={{
          left: '50%',
          top: 12,
          bottom: 12,
          borderLeft: '1px dashed rgba(255,255,255,0.25)',
        }}
      />
      <span
        className="pointer-events-none absolute font-inter-tight text-[12px] leading-[150%] font-normal text-white/50"
        style={{ left: 'calc(50% + 8px)', top: 9 }}
      >
        The break
      </span>
    </div>
  );
}

// ─── stream text ──────────────────────────────────────────────────────────────

function StreamText({
  text,
  speed = 10,
  onDone,
  className,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const doneCalledRef = useRef(false);

  // reset when text changes
  const [prevText, setPrevText] = useState(text);
  if (text !== prevText) {
    setPrevText(text);
    setIdx(0);
  }
  useEffect(() => {
    doneCalledRef.current = false;
  }, [text]);

  useEffect(() => {
    if (idx >= text.length) {
      if (!doneCalledRef.current) {
        doneCalledRef.current = true;
        onDone?.();
      }
      return;
    }
    const t = setTimeout(() => setIdx((i) => i + 1), speed);
    return () => clearTimeout(t);
  }, [idx, text.length, speed, onDone]);

  const done = idx >= text.length;
  return (
    <span className={className}>
      {text.slice(0, idx)}
      {!done && (
        <motion.span
          className="ml-px inline-block h-[13px] w-[2px] bg-white/60 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}
    </span>
  );
}

// ─── typing dots ──────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-[6px] py-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-[7px] w-[7px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.35)' }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── table / ranked ───────────────────────────────────────────────────────────

const TABLE_ROWS = [
  { metric: 'Win rate', first: '33%', fC: '#FFFFFF', last: '21%', lC: '#EF4444' },
  { metric: 'Avg win', first: '$4,370', fC: '#FFFFFF', last: '$691', lC: '#EF4444' },
  { metric: 'Trade expectancy', first: '+$193.72', fC: '#22C55E', last: '-$207.04', lC: '#EF4444' },
  { metric: 'Max consecutive losses', first: '12', fC: '#FFFFFF', last: '17', lC: '#EF4444' },
];
const RANKED = [
  {
    color: '#EF4444',
    text: 'Fees quietly took $79,258 – without them, this stretch is still positive.',
  },
  { color: '#F9AA4B', text: 'Avg win shrank 84% – you stopped letting winners run.' },
  { color: '#F9AA4B', text: 'Expectancy flipped from +$194 to -$207 per trade.' },
  { color: '#F9AA4B', text: 'Longest losing streak grew from 12 to 17 trades in a row.' },
];

const INTRO_TEXT =
  "I'll pull your full 90-day history and rank what actually moved your result – not just describe it.";
const ANALYSIS_TEXT =
  "Your first 100 trades made $19,777 at a 5.07 profit factor. Your last 100 lost -$20,704 at 0.41 – you gave the whole run back. The shift isn't random. Four things changed at once, and they all point the same direction.";

const QUERY = 'Run my report';
const CHAR_SPEED = 32;
const T_START = 400;
const T_SEND = T_START + QUERY.length * CHAR_SPEED + 180;
const T_CLEAR = T_SEND + 300;

type Ph = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default function InsightReport() {
  const [phase, setPhase] = useState<Ph>(0);
  const [sparkKey, setSparkKey] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const animStarted = useRef(false);
  const phaseRef = useRef<Ph>(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { scrollY } = useScroll();

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (typingRef.current) {
      clearInterval(typingRef.current);
      typingRef.current = null;
    }
  }, []);

  const go = useCallback((p: Ph) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const onIntroDone = useCallback(() => {
    if (phaseRef.current !== 3) return;
    go(4);
    setSparkKey((k) => k + 1);
    const t = setTimeout(() => {
      if (phaseRef.current === 4) go(5);
    }, TOTAL_MS + 100);
    timers.current.push(t);
  }, [go]);

  useEffect(() => {
    if (phase !== 5) return;
    const t = setTimeout(() => go(6), 420);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [phase, go]);

  const onAnalysisDone = useCallback(() => {
    if (phaseRef.current !== 6) return;
    const t1 = setTimeout(() => go(7), 300);
    const t2 = setTimeout(() => go(8), 800);
    timers.current.push(t1, t2);
  }, [go]);

  function startAnimation() {
    clearTimers();
    go(0);
    setTypedChars(0);
    setSending(false);

    const t0 = setTimeout(() => {
      let i = 0;
      typingRef.current = setInterval(() => {
        i += 1;
        setTypedChars(i);
        if (i >= QUERY.length) {
          clearInterval(typingRef.current!);
          typingRef.current = null;
        }
      }, CHAR_SPEED);
    }, T_START);

    const tSendOn = setTimeout(() => setSending(true), T_SEND);
    const tSendOff = setTimeout(() => setSending(false), T_SEND + 300);
    const tClear = setTimeout(() => setTypedChars(0), T_CLEAR);

    const t1 = setTimeout(() => go(1), T_CLEAR + 150);
    const t2 = setTimeout(() => go(2), T_CLEAR + 450);
    const t3 = setTimeout(() => go(3), T_CLEAR + 850);
    timers.current.push(t0, tSendOn, tSendOff, tClear, t1, t2, t3);
  }

  useMotionValueEvent(scrollY, 'change', () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const wh = window.innerHeight;
    const inView = rect.top < wh - 60 && rect.bottom > 0;

    if (inView && !animStarted.current) {
      animStarted.current = true;
      startAnimation();
    } else if (!inView && rect.top > wh) {
      // section is below the fold again — reset so it replays on next scroll-in
      animStarted.current = false;
      clearTimers();
      setTypedChars(0);
      setSending(false);
      go(0);
    }
  });

  function replay() {
    animStarted.current = false;
    startAnimation();
    animStarted.current = true;
  }

  return (
    <section
      ref={sectionRef}
      className="section-shell flex flex-col items-center gap-[60px] section-pad"
    >
      {/* ── section header ── */}
      <DirectionalReveal variants={landingSlideUp}>
        <div className="mx-auto flex w-full max-w-[498px] flex-col items-center gap-4 text-center">
          <div
            className="inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.1) 100%)',
              border: '1.5px solid rgba(255,255,255,0.05)',
            }}
          >
            <span className="font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
              A real report
            </span>
          </div>
          <h2 className="font-inter-tight text-[clamp(36px,4.5vw,48px)] leading-[100%] font-normal text-white">
            Insight, then it stops talking.
          </h2>
          <p className="font-inter-tight text-[clamp(16px,1.8vw,18px)] leading-[150%] font-normal text-white/70">
            Every full report follows the same structure, in the same order, with a computed number
            in every field. No filler, no &ldquo;I can also&hellip;&rdquo;, no guessing. Just the
            truth, ranked by what matters.
          </p>
        </div>
      </DirectionalReveal>

      {/* ── report card ── */}
      <DirectionalReveal variants={landingSlideUp}>
        <div
          className="mx-auto flex w-full max-w-[736px] flex-col items-end rounded-[16px]"
          style={{
            background: '#05060F',
            border: '1.5px solid rgba(255,255,255,0.05)',
            padding: 24,
            gap: 24,
            display: 'flex',
          }}
        >
          {/* header — right-aligned button + avatar */}
          <div className="flex w-full flex-row items-center justify-end" style={{ gap: 12 }}>
            <button
              onClick={replay}
              className="font-inter-tight text-[14px] leading-[150%] font-normal whitespace-nowrap text-white"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 24,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Run my report
            </button>
            <div
              className="flex shrink-0 items-center justify-center"
              style={{
                width: 40,
                height: 40,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <User size={18} className="text-white/70" />
            </div>
          </div>

          {/* ── chat area ── */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                className="flex w-full flex-col"
                style={{ gap: 12 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                {/* AI row */}
                <div className="flex w-full flex-row items-start" style={{ gap: 16 }}>
                  {/* avatar */}
                  <div
                    className="mt-1 flex shrink-0 items-center justify-center"
                    style={{ width: 40, height: 40, background: '#5D80FF', borderRadius: '50%' }}
                  >
                    <CjRingMark size={22} color="#FFFFFF" />
                  </div>

                  {/* response bubble */}
                  <div
                    className="flex min-w-0 flex-1 flex-col items-start rounded-[16px]"
                    style={{
                      padding: 24,
                      gap: 16,
                      display: 'flex',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1.5px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* phase 2: typing dots only */}
                    {phase === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TypingDots />
                      </motion.div>
                    )}

                    {/* phase 3+: intro text streaming */}
                    {phase >= 3 && (
                      <p className="min-h-[21px] font-inter-tight text-[14px] leading-[150%] font-normal text-white/70">
                        {phase === 3 ? (
                          <StreamText text={INTRO_TEXT} speed={10} onDone={onIntroDone} />
                        ) : (
                          INTRO_TEXT
                        )}
                      </p>
                    )}

                    {/* phase 4+: chart section */}
                    {phase >= 4 && (
                      <motion.div
                        className="flex w-full flex-col"
                        style={{ gap: 8 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h4 className="font-inter-tight text-[14px] leading-[150%] font-medium text-white">
                          Cumulative PnL
                        </h4>
                        <PnLChart replayKey={sparkKey} />
                      </motion.div>
                    )}

                    {/* phase 5: typing dots (between chart and content) */}
                    {phase === 5 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TypingDots />
                      </motion.div>
                    )}

                    {/* phase 6: analysis text streams in — table/ranked gated behind onDone */}
                    {phase >= 6 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white">
                          {phase === 6 ? (
                            <StreamText text={ANALYSIS_TEXT} speed={7} onDone={onAnalysisDone} />
                          ) : (
                            ANALYSIS_TEXT
                          )}
                        </p>
                      </motion.div>
                    )}

                    {/* phase 7: table — only appears after analysis text finishes */}
                    {phase >= 7 && (
                      <motion.div
                        className="flex w-full flex-col"
                        style={{ gap: 8 }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <h4 className="font-inter-tight text-[14px] leading-[150%] font-medium text-white">
                          First 100 vs Last 100
                        </h4>
                        <div className="flex w-full flex-col">
                          <div
                            className="flex items-center justify-between"
                            style={{
                              padding: '8px 12px',
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                              gap: 16,
                            }}
                          >
                            <span className="flex-1 font-inter-tight text-[12px] font-normal text-white/50">
                              Metric
                            </span>
                            <span
                              className="text-center font-inter-tight text-[12px] font-medium text-white/50"
                              style={{ width: 140 }}
                            >
                              First 100
                            </span>
                            <span
                              className="text-right font-inter-tight text-[12px] font-medium text-white/50"
                              style={{ width: 140 }}
                            >
                              Last 100
                            </span>
                          </div>
                          {TABLE_ROWS.map((row) => (
                            <div
                              key={row.metric}
                              className="flex items-center justify-between"
                              style={{
                                padding: '8px 12px',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                gap: 16,
                              }}
                            >
                              <span className="flex-1 font-inter-tight text-[12px] font-medium text-white">
                                {row.metric}
                              </span>
                              <span
                                className="text-center font-inter-tight text-[12px] font-medium"
                                style={{ width: 140, color: row.fC }}
                              >
                                {row.first}
                              </span>
                              <span
                                className="text-right font-inter-tight text-[12px] font-medium"
                                style={{ width: 140, color: row.lC }}
                              >
                                {row.last}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* phase 8: ranked + conclusion — only after table */}
                    {phase >= 8 && (
                      <motion.div
                        className="flex w-full flex-col"
                        style={{ gap: 16 }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="flex flex-col" style={{ gap: 8 }}>
                          <h4 className="font-inter-tight text-[14px] leading-[150%] font-medium text-white">
                            Ranked by Impact
                          </h4>
                          <div className="flex flex-col" style={{ gap: 8 }}>
                            {RANKED.map((item, i) => (
                              <div
                                key={i}
                                className="flex flex-row items-center"
                                style={{ gap: 8 }}
                              >
                                <div
                                  className="shrink-0 rounded-full"
                                  style={{ width: 4, height: 4, background: item.color }}
                                />
                                <span className="font-inter-tight text-[12px] leading-[150%] font-normal text-white/50">
                                  {item.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white">
                          Nothing here is bad luck. It&apos;s the same account, trading differently.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── persistent ask-a-question input ── */}
          <div className="relative z-10 mt-2 w-full">
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 h-[30px] w-[80%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(ellipse 50% 100% at 50% 50%, rgba(93,128,255,0.36) 0%, rgba(93,128,255,0.19) 45%, rgba(93,128,255,0) 88%)',
                filter: 'blur(16px)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 h-[48px] w-[100%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(ellipse 50% 100% at 50% 50%, rgba(93,128,255,0.16) 0%, rgba(93,128,255,0.07) 45%, rgba(93,128,255,0) 85%)',
                filter: 'blur(30px)',
              }}
            />

            <div
              className="relative flex min-h-[112px] w-full flex-col items-start gap-6 rounded-[12px] p-6 backdrop-blur-[32px]"
              style={{
                background: '#0A0B14',
                border: '2px solid rgba(93,128,255,0.1)',
              }}
            >
              <div className="text-left font-inter-tight text-[16px] leading-[150%] select-none">
                {typedChars === 0 ? (
                  <span className="text-white/30">
                    Ask about your PNL, win rate, best strategies...
                  </span>
                ) : (
                  <span className="text-white">
                    {QUERY.slice(0, typedChars)}
                    {typedChars < QUERY.length && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="ml-[1px] inline-block h-[18px] w-[2px] rounded-sm bg-white align-text-bottom"
                      />
                    )}
                  </span>
                )}
              </div>

              <motion.span
                className="absolute right-3 bottom-3 flex h-10 w-[52px] items-center justify-center rounded-[8px]"
                animate={
                  sending
                    ? { background: 'rgba(93,128,255,0.4)', scale: 1.05 }
                    : { background: '#141521', scale: 1 }
                }
                transition={{ duration: 0.2 }}
              >
                <ArrowUp size={20} className="text-white" />
              </motion.span>
            </div>

            {/* Top-border highlight — the glow lights the border where it crosses it,
                fading back to the base border colour toward the corners. */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 h-[2px] w-full -translate-x-1/2"
              style={{
                background:
                  'linear-gradient(90deg, rgba(93,128,255,0) 0%, rgba(93,128,255,0.1) 10%, rgba(93,128,255,0.3) 30%, rgba(93,128,255,0.45) 50%, rgba(93,128,255,0.3) 70%, rgba(93,128,255,0.1) 90%, rgba(93,128,255,0) 100%)',
              }}
            />
          </div>
        </div>
      </DirectionalReveal>
    </section>
  );
}
