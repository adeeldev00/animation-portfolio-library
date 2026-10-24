import Image from 'next/image';
import { card } from '@/components/cj-website/stats-band';

export function AnalyticsCard() {
  return (
    <div className={`${card} h-full text-white`}>
      <div className="relative z-10">
        <h3 className="mb-2 font-inter-tight text-[20px] leading-[150%] font-medium sm:text-[24px]">
          Smart Analytics That Drive Real Improvement
        </h3>
        <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white/70 sm:text-[16px]">
          ClearJournal transforms your trading history into actionable insights.
        </p>
      </div>

      <div className="relative z-10 -mr-6 flex flex-1 items-center">
        <Image
          src="/images/website/pricing/why-cj-analytics.webp"
          alt="Average duration, profit factor, net PnL, long/short split and win rate cards"
          width={403}
          height={653}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
