import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { PrimaryCta, SectionBadge } from '@/components/cj-website/verified-profile/shared';
import { landingSlideUp, landingSlideUpDelay } from '@/lib/animations';
import { AnalyticsCard } from './analytics-card';
import { PerformanceCard } from './performance-card';
import { TestimonialCard } from './testimonial-card';
import { UserProfileCard } from './user-profile-card';
import { TradingTableCard } from './trading-table-card';

const WhyClearJournal = () => {
  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        <DirectionalReveal
          variants={landingSlideUp}
          className="flex max-w-[660px] flex-col items-center gap-4 text-center"
        >
          <SectionBadge label="Why CJ" />

          <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
            Why Clear Journal
          </h2>
        </DirectionalReveal>

        <DirectionalReveal
          variants={landingSlideUpDelay}
          className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-[repeat(2,400px)]"
        >
          <div className="lg:row-span-2">
            <AnalyticsCard />
          </div>

          <TradingTableCard />
          <UserProfileCard />
          <PerformanceCard />
          <TestimonialCard />
        </DirectionalReveal>

        <PrimaryCta href="/dashboard" label="Try for Free" />
      </div>
    </section>
  );
};

export default WhyClearJournal;
