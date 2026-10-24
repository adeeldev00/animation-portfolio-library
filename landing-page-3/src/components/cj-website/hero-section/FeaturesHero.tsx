import { BorderTrail } from '@/components/ui/BorderTrail';
import { ContainerScroll } from '@/components/ui/ContainerScroll';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import Navbar from '../navbar-v1';
import HeroDotBackdrop from '../HeroDotBackdrop';

interface IProps {
  title?: string;
  description?: string;
}

const EXCHANGE_LOGOS = [
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/hero/bybit.svg',
    alt: 'Bybit',
    width: 140,
    height: 40,
  },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/hero/okx.svg',
    alt: 'OKX',
    width: 140,
    height: 40,
  },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/hero/bitget.svg',
    alt: 'Bitget',
    width: 140,
    height: 40,
  },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/hero/woox.svg',
    alt: 'WOOX',
    width: 140,
    height: 40,
  },
  {
    src: 'https://cdn.clearjournal.com/public/images/landingPage/hero/binance.svg',
    alt: 'Binance',
    width: 140,
    height: 40,
  },
];

const TRUST_PILLS = ['7 days free trial', 'No credit card required', 'Read-only access'];

// Pre-computed: 8 copies × 3 logos = 24 items; keyframe translateX(-50%) loops the first half seamlessly
const MARQUEE_ITEMS = [...Array(8)].flatMap((_, i) =>
  EXCHANGE_LOGOS.map((logo) => ({ ...logo, id: `${logo.alt}-${i}` }))
);

const Hero = ({ title, description }: IProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <HeroDotBackdrop heightPx={1200} />

      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[833px] w-[37.87px] bg-glow-blue blur-[150px]"
        style={{ left: 'calc(50% - 37.87px/2 - 4.06px)', top: '-310.25px' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[833px] w-[37.87px] bg-glow-blue blur-[150px]"
        style={{
          left: 'calc(50% - 37.87px/2 - 775.06px)',
          top: '-222.3px',
          transform: 'rotate(-32.42deg)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[833px] w-[37.87px] bg-glow-blue blur-[150px]"
        style={{
          left: 'calc(50% - 37.87px/2 - 929.06px)',
          top: '197px',
          transform: 'rotate(-32.42deg)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[833px] w-[37.87px] bg-glow-blue blur-[150px]"
        style={{
          left: 'calc(50% - 37.87px/2 + 339.42px)',
          top: '-225px',
          transform: 'rotate(32deg)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[833px] w-[37.87px] bg-glow-blue blur-[80px]"
        style={{
          left: 'calc(50% - 37.87px/2 + 359.93px)',
          top: '492px',
          transform: 'rotate(32deg)',
        }}
      />

      <Navbar />

      <div className="relative z-10 mx-auto flex flex-col items-center gap-8 px-4 pt-[88px] text-center lg:pt-[104px]">
        <div className="flex w-full max-w-[660px] flex-col items-center gap-8">
          <div className="flex w-full animate-rise-in flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-1 rounded-[8px] border-[1.5px] border-white/5 bg-linear-to-b from-white/[0.02] to-white/10 px-2 py-1 font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
              <span className="h-[6px] w-[6px] rounded-full bg-glow-blue" />
              ClearJournal 2.0 is Live
            </div>

            <h1 className="w-full text-center font-inter-tight text-[40px] leading-[100%] font-normal tracking-normal text-white sm:text-[52px] lg:text-[64px]">
              {title || (
                <>
                  Know exactly why you
                  <br />
                  win and lose.
                </>
              )}
            </h1>

            <p
              className="max-w-[524px] font-inter-tight leading-[150%] font-normal text-white/70"
              style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.25rem)' }}
            >
              {description ||
                'Connect your exchange once. Every trade syncs automatically and an AI built on your own history shows you the exact patterns winning and losing your money.'}
            </p>
          </div>

          <div className="flex animate-rise-in flex-col items-center gap-4 [animation-delay:150ms]">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/login"
                className="group relative flex h-11 items-center gap-3 rounded-[12px] bg-[#5D80FF] py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white shadow-[0px_3px_6px_rgba(93,128,255,0.2),0px_11px_11px_rgba(93,128,255,0.17),0px_25px_15px_rgba(93,128,255,0.1)] transition-shadow hover:shadow-[0px_6px_10px_rgba(93,128,255,0.28),0px_15px_18px_rgba(93,128,255,0.22),0px_30px_22px_rgba(93,128,255,0.14)]"
              >
                <span>Get Started for Free</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2.25}
                    className="text-[#5D80FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>

              <Link
                href="#how-it-works"
                className="group flex h-11 items-center gap-3 rounded-[12px] bg-white/10 py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white backdrop-blur-[12px] transition-colors hover:bg-white/15"
              >
                <span>See How It Works</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/5">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2}
                    className="rotate-[135deg] text-white transition-transform duration-200 group-hover:translate-y-0.5"
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
      </div>

      <div className="relative z-10 mt-8 w-full animate-rise-in overflow-hidden [animation-delay:300ms]">
        <div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
          {MARQUEE_ITEMS.map(({ id, src, alt, width, height }) => (
            <div key={id} className="flex shrink-0 items-center justify-center">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="h-auto max-h-10 w-auto object-contain opacity-90"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="relative z-10 mx-auto mt-4 animate-rise-in px-4 text-center font-inter-tight text-[14px] leading-[150%] font-normal text-white/50 [animation-delay:300ms]">
        Not affiliated with or endorsed by these exchanges. All connections use read-only API keys.
      </p>

      <div className="relative z-10 section-shell mt-8 animate-rise-in px-4 pb-4 [animation-delay:450ms] sm:px-8 lg:px-[100px]">
        <ContainerScroll>
          <div className="relative rounded-[16px]">
            <div className="relative overflow-hidden rounded-[16px]">
              <Image
                src="https://cdn.clearjournal.com/public/images/landingPage/hero/Dashboard_with_streak.webp"
                alt="ClearJournal dashboard preview"
                width={1240}
                height={698}
                sizes="(max-width: 1440px) 100vw, 1240px"
                className="h-auto w-full"
              />
            </div>

            <BorderTrail
              className="bg-[#5D80FF] blur-[16px]"
              size={120}
              cornerRadius={16}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            />
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
};

export default Hero;
