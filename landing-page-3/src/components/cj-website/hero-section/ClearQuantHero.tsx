import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { Fragment } from 'react';
import Navbar from '../navbar-v1';
import HeroDotBackdrop from '../HeroDotBackdrop';
import { ClearQuantAIOrb } from './ClearQuantAIOrb';

const TRUST_PILLS = ['7 days free trial', 'No credit card required', 'Read-only access'];

const ClearQuantHero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <HeroDotBackdrop heightPx={820} />

      {/* Glow beams */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[833px] w-[37.87px] bg-glow-blue blur-[150px]"
        style={{ left: 'calc(50% - 37.87px/2)', top: '-310px' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[724px] w-[478px] rounded-full bg-glow-blue/20 blur-[150px]"
        style={{ left: '-240px', top: '-360px' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[726px] w-[474px] rounded-full bg-glow-blue/20 blur-[150px]"
        style={{ right: '-240px', top: '-360px' }}
      />

      <Navbar />

      {/* Text block */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-[88px] text-center lg:pt-[104px]">
        {/* Text + CTA: one flex item so the gap to orb equals the gap from orb to chat */}
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex w-full animate-rise-in flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-1 rounded-[8px] border-[1.5px] border-white/5 bg-linear-to-b from-white/[0.02] to-white/10 px-2 py-1 font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
              <span className="h-[6px] w-[6px] rounded-full bg-glow-blue" />
              ClearQuant AI
            </div>

            <h1 className="w-full text-center font-inter-tight text-[40px] leading-[100%] font-normal tracking-normal text-white sm:text-[52px] lg:text-[64px]">
              It analyzes the trader,
              <br />
              not the market.
            </h1>

            <p className="max-w-[682px] font-inter-tight text-[15px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
              ClearQuant reads your full verified history and tells you exactly why your performance
              is changing — your edges, your leaks, the moment you drifted off your baseline. It
              never predicts. It never sends signals. It just shows you the truth about how you
              trade.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex animate-rise-in flex-col items-center gap-4 [animation-delay:150ms]">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/login"
                className="group relative flex h-11 items-center gap-3 rounded-[12px] bg-glow-blue py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white shadow-[0px_3px_6px_rgba(93,128,255,0.2),0px_11px_11px_rgba(93,128,255,0.17),0px_25px_15px_rgba(93,128,255,0.1)] transition-shadow hover:shadow-[0px_6px_10px_rgba(93,128,255,0.28),0px_15px_18px_rgba(93,128,255,0.22),0px_30px_22px_rgba(93,128,255,0.14)]"
              >
                <span>Try ClearQuant AI free</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2.25}
                    className="text-glow-blue transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>

              <Link
                href="#demo"
                className="group flex h-11 items-center gap-3 rounded-[12px] bg-white/10 py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white backdrop-blur-[12px] transition-colors hover:bg-white/15"
              >
                <span>Watch 2 min demo</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/5">
                  <Play size={20} strokeWidth={2} className="fill-white/20 text-white" />
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-inter-tight text-[14px] font-normal text-white/50">
              {TRUST_PILLS.map((pill, i) => (
                <Fragment key={pill}>
                  {i > 0 && <span className="h-[3px] w-[3px] rounded-full bg-white/30" />}
                  <span>{pill}</span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          id="demo"
          className="-mt-[104px] hidden w-full animate-rise-in [animation-delay:300ms] lg:block"
        >
          <ClearQuantAIOrb />
        </div>
      </div>
    </div>
  );
};

export default ClearQuantHero;
