import Image from 'next/image';
import Link from 'next/link';
// import WebsiteImage from '@/components/cj-website/WebsiteImage'; // S3/CDN path — restore when uploading to S3
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Fragment } from 'react';
import Navbar from '../navbar-v1';
import HeroDotBackdrop from '../HeroDotBackdrop';

const TRUST_PILLS = ['7 days free trial', 'No credit card required', 'Read-only access'];

const JournalHero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <HeroDotBackdrop heightPx={950} />

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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-[88px] text-center lg:pt-[104px]">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex w-full animate-rise-in flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-1 rounded-[8px] border-[1.5px] border-white/5 bg-linear-to-b from-white/[0.02] to-white/10 px-2 py-1 font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
              <span className="h-[6px] w-[6px] rounded-full bg-glow-blue" />
              Trade Journal
            </div>

            <h1 className="w-full text-center font-inter-tight text-[40px] leading-[100%] font-normal tracking-normal text-white sm:text-[52px] lg:text-[64px]">
              It doesn&apos;t log your trades.
              <br />
              It autopsies them.
            </h1>

            <p className="max-w-[730px] font-inter-tight text-[15px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
              Connect once and your full history fills itself in — no manual entry, ever. Then
              ClearJournal shows you what a spreadsheet never could: how much of each move you
              actually captured, where you exited too early, and which of your setups quietly make
              or lose all your money.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex animate-rise-in flex-col items-center gap-4 [animation-delay:150ms]">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/register"
                className="group relative flex h-11 items-center gap-3 rounded-[12px] bg-glow-blue py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white shadow-[0px_3px_6px_rgba(93,128,255,0.2),0px_11px_11px_rgba(93,128,255,0.17),0px_25px_15px_rgba(93,128,255,0.1)] transition-shadow hover:shadow-[0px_6px_10px_rgba(93,128,255,0.28),0px_15px_18px_rgba(93,128,255,0.22),0px_30px_22px_rgba(93,128,255,0.14)]"
              >
                <span>Get Started for Free</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2.25}
                    className="text-glow-blue transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>

              <Link
                href="/clearquant-ai"
                className="group flex h-11 items-center gap-3 rounded-[12px] bg-white/10 py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white backdrop-blur-[12px] transition-colors hover:bg-white/15"
              >
                <span>Meet ClearQuant AI</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/5">
                  <ArrowRight
                    size={22}
                    strokeWidth={2}
                    className="text-white transition-transform duration-200 group-hover:translate-x-0.5"
                  />
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

        {/* Hero panel */}
        <div className="relative w-full max-w-[1240px] animate-rise-in overflow-hidden rounded-[16px] [animation-delay:300ms]">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[-40px] left-1/2 z-0 h-[200px] w-[70%] -translate-x-1/2 rounded-full bg-glow-blue/30 blur-[120px]"
          />
          {/* TODO: upload to S3 then restore WebsiteImage below and remove local Image */}
          {/* <WebsiteImage
            folder="journal"
            src="hero.svg"
            alt="Trade anatomy panel showing entry, exit, best and worst point of an ETH long"
            width={1160}
            height={481}
            priority
            className="relative z-10 w-full"
          /> */}
          <Image
            src="/Heros/journal.webp"
            alt="Trade anatomy panel showing entry, exit, best and worst point of an ETH long"
            width={2480}
            height={1027}
            priority
            className="relative z-10 w-full"
          />
        </div>
      </div>

      <div className="h-16 sm:h-24" />
    </div>
  );
};

export default JournalHero;
