import WebsiteImage from '@/components/cj-website/WebsiteImage';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';
import AnalyticsCalendarShowcase from './AnalyticsCalendarShowcase';

function SectionHeader({ badge, title, body }: { badge: string; title: string; body: string }) {
  return (
    <DirectionalReveal variants={landingSlideUp}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center rounded-[8px] border-[1.5px] border-white/5 bg-linear-to-b from-white/[0.02] to-white/10 px-2 py-1 font-inter-tight text-[12px] text-white/70">
          {badge}
        </div>
        <h2 className="max-w-[600px] font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[48px]">
          {title}
        </h2>
        <p className="max-w-[507px] font-inter-tight text-[15px] leading-[150%] text-white/70 sm:text-[18px]">
          {body}
        </p>
      </div>
    </DirectionalReveal>
  );
}

export default function AnalyticsFeatureSections() {
  return (
    <>
      {/* 1. Where */}
      <section className="relative section-shell section-pad">
        <div className="flex flex-col items-center gap-[60px]">
          <SectionHeader
            badge="1. Where"
            title="Where your money is made and lost."
            body="Which symbols, sides, and setups carry your account and which quietly drain it."
          />
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <DirectionalReveal variants={landingSlideUp}>
              <WebsiteImage
                folder="analytics"
                src="where-performance.svg"
                alt="Performance card — two setups are carrying you, the rest are leaks"
                width={612}
                height={662}
                className="h-auto w-full"
              />
            </DirectionalReveal>
            <DirectionalReveal variants={landingSlideUp}>
              <WebsiteImage
                folder="analytics"
                src="where-costs.svg"
                alt="Funding, fees and order type card — your real P&L is quieter than you think"
                width={612}
                height={662}
                className="h-auto w-full"
              />
            </DirectionalReveal>
          </div>
        </div>
      </section>

      {/* 2. When */}
      <section className="relative section-shell section-pad">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-[20%] h-[304px] w-[335px] rounded-full bg-glow-blue opacity-40 blur-[120px]"
        />
        <div className="flex flex-col items-center gap-[60px]">
          <SectionHeader
            badge="2. When"
            title="When you actually win."
            body="The days, hours, and sessions behind your P&L and a calendar that maps every one of them."
          />
          <DirectionalReveal variants={landingSlideUp} className="w-full max-w-[612px]">
            <WebsiteImage
              folder="analytics"
              src="when-timing.svg"
              alt="Timing card — your worst day isn't random"
              width={612}
              height={662}
              className="h-auto w-full"
            />
          </DirectionalReveal>
        </div>
      </section>

      {/* Calendar */}
      <section className="relative section-shell section-pad">
        <div className="flex flex-col items-center gap-[60px]">
          <SectionHeader
            badge="Calendar"
            title="Your trading year, mapped."
            body="Every day, week, and session at a glance so the patterns you can't feel become impossible to miss."
          />
          <DirectionalReveal variants={landingSlideUp} className="w-full">
            <div className="flex flex-col items-center gap-6">
              <AnalyticsCalendarShowcase />
              <p className="max-w-[600px] text-center font-inter-tight text-[14px] leading-[150%] text-white/50">
                Plus weekly and quarterly breakdowns, and combos like &ldquo;Tuesday + BTC&rdquo;
                surfaced automatically.
              </p>
            </div>
          </DirectionalReveal>
        </div>
      </section>

      {/* 3. The verdict */}
      <section className="relative section-shell section-pad">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-[20%] h-[304px] w-[335px] rounded-full bg-glow-blue opacity-40 blur-[120px]"
        />
        <div className="flex flex-col items-center gap-[60px]">
          <SectionHeader
            badge="3. The verdict"
            title="What each period really earned."
            body="The monthly review most traders skip done for you, and ready to export."
          />
          <DirectionalReveal variants={landingSlideUp} className="w-full max-w-[612px]">
            <WebsiteImage
              folder="analytics"
              src="verdict-report.svg"
              alt="Monthly report card — the review you keep meaning to do"
              width={612}
              height={662}
              className="h-auto w-full"
            />
          </DirectionalReveal>
        </div>
      </section>
    </>
  );
}
