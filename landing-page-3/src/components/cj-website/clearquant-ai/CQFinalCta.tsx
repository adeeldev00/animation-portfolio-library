import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Fragment } from 'react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';
import { DotGridSpotlight } from '@/components/ui/DotGridSpotlight';

const TRUST_PILLS = ['7 days free trial', 'No credit card required', 'Cancel anytime'];

export default function CQFinalCta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <DotGridSpotlight dotColor="rgba(255,255,255,0.15)" dotSize={2} dotSpacing={14} />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: '#5D80FF' }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <DirectionalReveal variants={landingSlideUp}>
          <h2 className="mb-4 font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[52px]">
            Run your first report
            <br />
            in two minutes.
          </h2>
          <p className="mb-8 font-inter-tight text-[16px] leading-[160%] text-white/60">
            Connect your exchange. ClearQuant reads the rest and tells you the truth.
          </p>
          <div className="flex flex-col items-center gap-4">
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
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-inter-tight text-[14px] font-normal text-white/50">
              {TRUST_PILLS.map((pill, i) => (
                <Fragment key={pill}>
                  {i > 0 && <span className="h-[3px] w-[3px] rounded-full bg-white/30" />}
                  <span>{pill}</span>
                </Fragment>
              ))}
            </div>
          </div>
        </DirectionalReveal>
      </div>
    </section>
  );
}
