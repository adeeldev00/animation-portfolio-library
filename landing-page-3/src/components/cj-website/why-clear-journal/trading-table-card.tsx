import Image from 'next/image';
import { card, CardGlow } from '@/components/cj-website/stats-band';

export function TradingTableCard() {
  return (
    <div className={`${card} text-white`}>
      <CardGlow className="-top-10 -right-10 opacity-50" />
      <CardGlow className="-top-8 -left-14 opacity-30" />

      <div className="relative z-10">
        <h3 className="font-inter-tight text-[20px] leading-[150%] font-medium sm:text-[24px]">
          Auto-Synced Trading
        </h3>
      </div>

      <div className="relative z-10 -mr-6 flex flex-1 items-start">
        <Image
          src="/images/website/pricing/why-cj-trades-table.webp"
          alt="Synced trades table showing ID, account, symbol, size and open price"
          width={379}
          height={316}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
