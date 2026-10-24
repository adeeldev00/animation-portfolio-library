import { cn } from '@/lib/utils';
import exchange from '@/services/exchange';
import Image from 'next/image';

const Exchanges = async () => {
  const exchanges = await exchange.exchanges();

  const availableExchanges = (exchanges ?? []).filter((item) => !item.configs.isComingSoon);

  return (
    <div className="mt-5 flex flex-col">
      <div className={cn('flex flex-wrap items-center gap-2 md:gap-3')}>
        <p className={cn('font-roobert font-medium whitespace-nowrap text-white/70')}>
          Trusted by traders on
        </p>
        {availableExchanges.map((item) => {
          return (
            <Image
              key={item.id}
              src={item.image_url}
              alt="Clear Journal"
              width={32}
              height={32}
              className="shrink-0 rounded-full"
            />
          );
        })}
        <p className="font-roobert text-base font-medium whitespace-nowrap text-white/70">
          and more coming soon
        </p>
      </div>
      <p className="mt-2 font-roobert text-xs leading-snug font-normal text-white/50">
        Not affiliated with or endorsed by these exchanges.
        <br />
        All connections use read-only API keys.
      </p>
    </div>
  );
};

export default Exchanges;
