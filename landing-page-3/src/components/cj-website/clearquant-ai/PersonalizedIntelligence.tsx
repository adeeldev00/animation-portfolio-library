'use client';

import { useEffect, useRef, useState } from 'react';
import { type Variants, motion, useInView, useReducedMotion } from 'framer-motion';
import { SendHorizontal, User } from 'lucide-react';
import { CjRingMark } from '@/components/cj-website/verified-profile/shared';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';

const QUESTION = 'Why am I down when my win/loss ratio is 2:1?';
const CHAR_SPEED = 32;

const T_START = 400;
const T_SEND = T_START + QUESTION.length * CHAR_SPEED + 180;
const T_BUBBLE = T_SEND + 220;
const T_AI_BOX = T_BUBBLE + 380;
const T_HEADER = T_AI_BOX + 180;
const T_F1 = T_HEADER + 320;
const T_F2 = T_F1 + 380;
const T_CONC = T_F2 + 340;

interface PersonalizedIntelligenceProps {
  tuckUnderHero?: boolean;
}

export default function PersonalizedIntelligence({
  tuckUnderHero = true,
}: PersonalizedIntelligenceProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();

  const [typedChars, setTypedChars] = useState(0);
  const [sending, setSending] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showF1, setShowF1] = useState(false);
  const [showF2, setShowF2] = useState(false);
  const [showConc, setShowConc] = useState(false);

  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reduced motion shows everything; leaving the viewport resets to the first frame.
  const [prevInputs, setPrevInputs] = useState<[boolean, boolean | null] | null>(null);
  if (!prevInputs || prevInputs[0] !== inView || prevInputs[1] !== reduce) {
    setPrevInputs([inView, reduce]);
    if (reduce || !inView) {
      const shown = !!reduce;
      setTypedChars(0);
      setSending(false);
      setShowBubble(shown);
      setShowAI(shown);
      setShowHeader(shown);
      setShowF1(shown);
      setShowF2(shown);
      setShowConc(shown);
    }
  }

  useEffect(() => {
    if (reduce) return;

    if (!inView) {
      if (typingRef.current) clearInterval(typingRef.current);
      typingRef.current = null;
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        let i = 0;
        typingRef.current = setInterval(() => {
          i += 1;
          setTypedChars(i);
          if (i >= QUESTION.length) {
            clearInterval(typingRef.current!);
            typingRef.current = null;
          }
        }, CHAR_SPEED);
      }, T_START)
    );

    timers.push(setTimeout(() => setSending(true), T_SEND));
    timers.push(setTimeout(() => setSending(false), T_SEND + 300));

    timers.push(
      setTimeout(() => {
        setShowBubble(true);
        setTypedChars(0);
      }, T_BUBBLE)
    );

    timers.push(setTimeout(() => setShowAI(true), T_AI_BOX));
    timers.push(setTimeout(() => setShowHeader(true), T_HEADER));
    timers.push(setTimeout(() => setShowF1(true), T_F1));
    timers.push(setTimeout(() => setShowF2(true), T_F2));
    timers.push(setTimeout(() => setShowConc(true), T_CONC));

    return () => {
      timers.forEach(clearTimeout);
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [inView, reduce]);

  const inputText = typedChars > 0 ? QUESTION.slice(0, typedChars) : '';
  const showPlaceholder = typedChars === 0;
  const cursorVisible = typedChars > 0 && typedChars < QUESTION.length;

  const slideIn: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={ref}
      className={`relative z-10 section-shell flex flex-col items-center gap-[60px] section-pad ${
        tuckUnderHero ? 'mt-12 pt-0! lg:-mt-[68px]' : ''
      }`}
    >
      <DirectionalReveal
        variants={landingSlideUp}
        className="flex w-full max-w-[544px] flex-col items-center gap-4 text-center"
      >
        <span
          className="inline-flex items-center rounded-[8px] border-[1.5px] border-white/5 px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
          }}
        >
          Personalized intelligence
        </span>

        <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
          AI that understands
          <br />
          your trading.
        </h2>

        <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
          Built from your own journal, not generic market data. Every answer is grounded in your
          history, habits, and execution.
        </p>
      </DirectionalReveal>

      <div
        className="relative isolate flex w-full max-w-[748px] flex-col gap-14 overflow-hidden rounded-[24px] border border-white/[0.06] px-6 pt-8 pb-6"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[60px] right-[200px] z-0 h-[304px] w-[335px] rotate-[75deg] rounded-full opacity-70 blur-[100px]"
          style={{ background: '#5D80FF' }}
        />

        <div className="relative z-10 flex w-full flex-col gap-6">
          <motion.div
            className="flex items-start justify-end gap-4"
            initial={{ opacity: 0, y: 6 }}
            animate={showBubble || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="flex max-w-[800px] items-center rounded-[12px] px-4 py-2"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <p className="text-left font-inter-tight text-[16px] leading-[150%] text-white">
                {QUESTION}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
              <User size={20} className="text-white" />
            </span>
          </motion.div>

          <motion.div
            className="flex items-start gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={showAI || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-glow-blue">
              <CjRingMark size={22} color="#FFFFFF" />
            </span>

            <div
              className="flex w-full flex-col gap-4 rounded-[16px] p-6 text-left font-inter-tight text-[14px]"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <motion.p
                className="leading-[150%] font-normal text-white/70"
                variants={slideIn}
                initial="hidden"
                animate={showHeader || reduce ? 'show' : 'hidden'}
              >
                Two things, ranked by impact:
              </motion.p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col font-medium">
                  <motion.div
                    className="flex items-start justify-between gap-4 border-b-[1.5px] border-white/5 p-3"
                    variants={slideIn}
                    initial="hidden"
                    animate={showF1 || reduce ? 'show' : 'hidden'}
                  >
                    <span className="w-[30px] shrink-0 leading-[150%] text-white/50">1</span>
                    <p className="flex-1 leading-[150%]" style={{ color: '#5D9EFF' }}>
                      <span>Fees</span>
                      {" — you've paid $79,258 with zero rebates, "}
                      <span className="text-loss">~38%</span>
                      {' of your total losses. Trade maker-only and your net flips from '}
                      <span className="text-loss">−$21,314</span>
                      {' to roughly '}
                      <span className="text-profit">+$57,943</span>
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-start justify-between gap-4 border-b-[1.5px] border-white/5 p-3"
                    variants={slideIn}
                    initial="hidden"
                    animate={showF2 || reduce ? 'show' : 'hidden'}
                  >
                    <span className="w-[30px] shrink-0 leading-[150%] text-white/50">2</span>
                    <p className="flex-1 leading-[150%]" style={{ color: '#5D9EFF' }}>
                      <span>Risk control (1/100)</span>
                      {' — one drawdown hit '}
                      <span className="text-profit">100%</span>
                      {' of peak equity and never recovered.'}
                    </p>
                  </motion.div>
                </div>

                <motion.p
                  className="leading-[150%] font-normal text-white/70"
                  variants={slideIn}
                  initial="hidden"
                  animate={showConc || reduce ? 'show' : 'hidden'}
                >
                  Your 2:1 ratio is real. It&apos;s being eaten before it reaches your balance.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 w-full">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[6px] left-1/2 h-[31px] w-[94%] -translate-x-1/2 rounded-full blur-[25px]"
            style={{ background: '#5D80FF' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-[9px] left-1/2 h-[33px] w-[94%] -translate-x-1/2 rounded-full blur-[50px]"
            style={{ background: '#5D80FF' }}
          />

          <div
            className="relative flex min-h-[112px] w-full flex-col items-start gap-6 rounded-[12px] p-6 backdrop-blur-[32px]"
            style={{
              background: '#0A0B14',
              border: '2px solid rgba(93,128,255,0.1)',
            }}
          >
            <div className="text-left font-inter-tight text-[16px] leading-[150%] select-none">
              {showPlaceholder ? (
                <span className="text-white/30">
                  Ask about your PNL, win rate, best strategies...
                </span>
              ) : (
                <span className="text-white">
                  {inputText}
                  {cursorVisible && (
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
              <SendHorizontal size={20} className="text-white" />
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
