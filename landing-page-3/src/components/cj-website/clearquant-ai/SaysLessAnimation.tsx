'use client';

/* ─────────────────────────────────────────────────────────────────────────────
 * "Says less on purpose" — BuiltToTrust card illustration.
 * One-shot sequence that plays when the card scrolls into view: the left
 * "Checked" column spins fast and decelerates slot-machine style onto one
 * item; the middle beam blinks while scanning, then flashes and holds a
 * steady glow on selection; the right "Told you" skeletons fill in with the
 * surfaced findings and the scene holds. Leaving the viewport resets it, so
 * it replays on the next visit.
 * ──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'framer-motion';

const CHECKED = ['487 Trades', '18 Symbols', '14 Strategies', '6 Accounts', '2,184 Executions'];
const FINDINGS = ['Fees - $79,258', 'Risk - 1/100'];

const N = CHECKED.length;
const PITCH = 29; // 21px line + 8px gap
const COPIES = 5;

const TARGET = 1; // lands on "18 Symbols"
const SPINS = 2; // full laps before landing
const TOTAL_STEPS = SPINS * N + TARGET;
const SCAN_S = 1.8;

// Item i (global) is centred in the 86px window when y = 32.5 - i * PITCH
const START_GLOBAL = N; // start centred on item 0 of the second copy
const Y_START = 32.5 - START_GLOBAL * PITCH;
const Y_END = Y_START - TOTAL_STEPS * PITCH;

const BLUE = '#5D80FF';

type Phase = 'idle' | 'scan' | 'done';

export function SaysLessAnimation() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const y = useMotionValue(Y_START);
  const [centered, setCentered] = useState(-1);
  const [phase, setPhase] = useState<Phase>('idle');
  const [revealed, setRevealed] = useState(0);
  const [flash, setFlash] = useState(0);

  // Out of view resets to idle; coming into view starts the scan phase.
  const [prevInputs, setPrevInputs] = useState<[boolean, boolean | null] | null>(null);
  if (!prevInputs || prevInputs[0] !== inView || prevInputs[1] !== reduce) {
    setPrevInputs([inView, reduce]);
    if (!reduce && !inView) {
      setCentered(-1);
      setPhase('idle');
      setRevealed(0);
    } else if (!reduce) {
      setPhase('scan');
    }
  }

  useEffect(() => {
    if (reduce) {
      y.set(Y_END);
      return;
    }
    if (!inView) {
      y.set(Y_START);
      return;
    }

    const controls = animate(0, TOTAL_STEPS, {
      duration: SCAN_S,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        y.set(Y_START - v * PITCH);
        setCentered(START_GLOBAL + Math.round(v));
      },
    });
    // Reveal timeline runs off the scan start, independent of animation
    // callbacks, so the findings always fill in after the selection lands.
    const timers = [
      setTimeout(() => {
        setPhase('done');
        setFlash((f) => f + 1);
      }, SCAN_S * 1000),
      setTimeout(() => setRevealed(1), SCAN_S * 1000 + 250),
      setTimeout(() => setRevealed(2), SCAN_S * 1000 + 650),
    ];
    return () => {
      controls.stop();
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce, y]);

  const done = reduce || phase === 'done';
  const shownRevealed = reduce ? 2 : revealed;
  const shownCentered = reduce ? START_GLOBAL + TOTAL_STEPS : centered;

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-between px-6">
      {/* ── Checked — spins fast, decelerates onto the selected item ── */}
      <div className="flex w-[37%] max-w-[204px] flex-col items-center gap-4">
        <p className="font-inter-tight text-[16px] leading-[150%] text-white/70">Checked</p>
        <div className="relative h-[86px] w-full overflow-hidden">
          <motion.div className="flex flex-col items-center gap-2" style={{ y }}>
            {Array.from({ length: COPIES }, (_, copy) =>
              CHECKED.map((label, i) => {
                const isCentered = copy * N + i === shownCentered;
                return (
                  <span
                    key={`${copy}-${label}`}
                    className={`font-inter-tight text-[14px] leading-[21px] transition-colors duration-200 ${
                      isCentered && done
                        ? 'text-white'
                        : isCentered
                          ? 'text-white/80'
                          : 'text-white/30'
                    }`}
                  >
                    {label}
                  </span>
                );
              })
            )}
          </motion.div>
          {/* Figma Rectangles 240648785/6 — edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-6"
            style={{ background: 'linear-gradient(180deg, #0A0B14 0%, rgba(10,11,20,0) 100%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-6"
            style={{ background: 'linear-gradient(180deg, rgba(10,11,20,0) 0%, #0A0B14 100%)' }}
          />
        </div>
      </div>

      {/* ── Scanning beam — blinks while checking, flashes then holds steady ── */}
      <div className="relative h-[200px] w-[4px] shrink-0 self-center">
        <motion.div
          aria-hidden
          className="absolute top-1/2 left-1/2 h-[144px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[4px]"
          style={{ background: BLUE }}
          animate={done ? { opacity: 0.85 } : { opacity: [0.3, 0.8, 0.3] }}
          transition={done ? { duration: 0.4 } : { duration: 0.7, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full"
          style={{ background: BLUE }}
          animate={done ? { opacity: 1 } : { opacity: [0.45, 0.95, 0.45] }}
          transition={done ? { duration: 0.4 } : { duration: 0.7, repeat: Infinity }}
        />
        {flash > 0 && (
          <motion.div
            key={flash}
            aria-hidden
            className="absolute top-1/2 left-1/2 h-[176px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[8px]"
            style={{ background: '#8CA5FF' }}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* ── Told you — skeletons fill in once the scan lands ── */}
      <div className="flex w-[37%] max-w-[204px] flex-col gap-4">
        <p className="text-center font-inter-tight text-[16px] leading-[150%] text-white/70">
          Told you
        </p>
        <div className="flex flex-col gap-[6px]">
          {FINDINGS.map((finding, i) => {
            const isRevealed = shownRevealed > i;
            return (
              <div
                key={finding}
                className="relative flex h-10 items-center rounded-[8px] bg-white/5 px-4"
              >
                <motion.div
                  aria-hidden
                  animate={
                    isRevealed
                      ? { opacity: 0 }
                      : reduce
                        ? { opacity: 0.6 }
                        : { opacity: [0.3, 0.8, 0.3] }
                  }
                  transition={
                    isRevealed || reduce ? { duration: 0.25 } : { duration: 1.4, repeat: Infinity }
                  }
                  className="absolute h-3.5 w-[65%] rounded-full bg-white/10"
                />
                <motion.span
                  initial={false}
                  animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-inter-tight text-[16px] leading-[150%] font-medium text-white/80"
                >
                  {finding}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
