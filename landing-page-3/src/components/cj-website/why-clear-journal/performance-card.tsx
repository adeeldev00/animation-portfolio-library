import Image from 'next/image';
import { card, CardGlow } from '@/components/cj-website/stats-band';

export function PerformanceCard() {
  return (
    <div className={`${card} text-white`}>
      <CardGlow className="-top-10 -right-10 opacity-50" />

      <div className="relative z-10">
        <h3 className="mb-2 font-inter-tight text-[20px] leading-[150%] font-medium sm:text-[24px]">
          Performance Insights
        </h3>
        <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white/70 sm:text-[16px]">
          Spot your edge and fix weak points fast.
        </p>
      </div>

      <div className="relative z-10 -mr-6 flex flex-1 items-start">
        <Image
          src="/images/website/pricing/why-cj-performance.webp"
          alt="Win and loss split by trade duration bucket"
          width={379}
          height={284}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
