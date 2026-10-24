import Image from 'next/image';
import { card, CardGlow } from '@/components/cj-website/stats-band';

export function UserProfileCard() {
  return (
    <div className={`${card} h-full text-white`}>
      <CardGlow className="-top-10 -right-10 opacity-50" />

      <div className="relative z-10">
        <h3 className="mb-2 font-inter-tight text-[20px] leading-[150%] font-medium sm:text-[24px]">
          Share Your Edge
        </h3>
        <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white/70 sm:text-[16px]">
          Build credibility with verified results
        </p>
      </div>

      <div className="relative z-10 -mr-6 flex flex-1 items-start">
        <Image
          src="/images/website/pricing/why-cj-profile.webp"
          alt="Verified public profile showing net PnL, trades and win rate"
          width={379}
          height={284}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
