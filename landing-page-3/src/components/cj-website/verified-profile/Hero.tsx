import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '../navbar-v1';
import { HeroGlow } from '../HeroGlow';
import HeroDotBackdrop from '../HeroDotBackdrop';
import { SectionBadge } from './shared';
import DashboardShowcase from './DashboardShowcase';

const TRUST_ITEMS = ['7 days free trial', 'No credit card required', 'Read-only access'];

export default function VerifiedProfileHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <HeroDotBackdrop heightPx={900} />
      <HeroGlow beamE={{ left: 'calc(50% + 577.77px)', top: 835.25 }} />

      <Navbar />

      <section className="relative z-10 section-shell flex flex-col items-center gap-8 px-4 pt-[80px] pb-0 sm:px-8 lg:px-[100px] lg:pt-[92px]">
        <div className="flex max-w-[880px] flex-col items-center gap-4 text-center">
          <SectionBadge label="Public Journal" dot />

          <h1 className="font-inter-tight text-[40px] leading-[110%] font-normal text-white sm:text-[48px] lg:text-[56px]">
            Screenshots lie.
            <br />
            Your API doesn&apos;t.
          </h1>

          <p className="max-w-[720px] font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            Every profile on ClearJournal is built live from your exchange - real trades, real
            P&amp;L, real leverage, stamped &quot;Verified on CJ.&quot; No screenshots, no
            Photoshop, no &quot;trust me.&quot; Share it on your own URL, and finally find the
            traders whose numbers actually check out.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
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
              href="/#clearquant"
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

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
            {TRUST_ITEMS.map((item, i) => (
              <Fragment key={item}>
                {i > 0 && <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-white/30" />}
                <span className="font-inter-tight text-[14px] font-normal text-white/50">
                  {item}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Animated dashboard strip — live components, slowly pans left and back */}
      <DashboardShowcase />
    </div>
  );
}
