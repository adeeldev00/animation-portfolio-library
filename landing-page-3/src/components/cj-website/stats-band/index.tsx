import exchange from '@/services/exchange';
import Image from 'next/image';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

interface StatsBandProps {
  stats?: StatItem[];
  showExchanges?: boolean;
}

const DEFAULT_STATS: StatItem[] = [
  {
    value: '30+',
    label: 'Trading metrics tracked',
    description:
      'Win rate, profit factor, session analysis, hold time, position sizing, drawdown, and more.',
  },
  {
    value: '30 sec',
    label: 'To your first insight',
    description:
      'Add your read-only API key, confirm permissions, and your complete trade history appears immediately.',
  },
  {
    value: '3k+',
    label: 'Active users',
    description:
      'Trusted by traders building consistency through data-driven journaling and analytics.',
  },
  {
    value: '$1 billion+',
    label: 'Trades synced',
    description:
      'Millions of trades imported securely across connected exchanges, portfolios, and trading accounts.',
  },
];

export const card =
  'relative flex flex-col gap-6 overflow-hidden rounded-[24px] border-[1.5px] border-white/[0.05] bg-dark-card p-6';

/** Blue bloom used on cards. Defaults to the right edge; pass `className` to reposition. */
export function CardGlow({ className }: { className?: string } = {}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute h-32 w-32 rounded-full opacity-20 blur-3xl',
        className ?? 'top-1/2 -right-12 -translate-y-1/2'
      )}
      style={{ background: 'rgba(93, 128, 255, 0.3)' }}
    />
  );
}

// Matches the dot pattern used in AI insight cards — white dots fading from top-right corner
export function CardDots() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[180px] w-[180px] opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.35) 1px, transparent 1.5px)',
          backgroundSize: '9.29px 9.29px',
          maskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-3xl"
        style={{ background: 'rgba(93, 128, 255, 0.3)' }}
      />
    </>
  );
}

export default async function StatsBand({
  stats = DEFAULT_STATS,
  showExchanges = true,
}: StatsBandProps = {}) {
  const exchanges = await exchange.exchanges();
  const available = (exchanges ?? []).filter((e) => !e.configs.isComingSoon);

  return (
    <section className="section-shell section-pad">
      {/*
       * 1 col on phones, 3 cols from sm (2+2+1), all 5 in one row on lg+
       */}
      <DirectionalReveal
        variants={landingSlideUp}
        className={
          showExchanges
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5'
            : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
        }
      >
        {/* Exchanges card */}
        {showExchanges && (
          <div className={card}>
            <CardDots />
            <div className="flex items-center gap-6">
              <span className="font-inter-tight shrink-0 text-[40px] font-medium leading-none text-[#5D80FF]">
                {available.length}
              </span>
              <div className="flex flex-wrap gap-3" style={{ maxWidth: 141 }}>
                {available.map((item) => (
                  <Image
                    key={item.id}
                    src={item.image_url}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-contain"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-inter-tight text-[16px] font-medium leading-[150%] text-white">
                Exchanges live today
              </p>
              <p className="font-inter-tight text-[12px] font-normal leading-[150%] text-white/70">
                Binance, Bybit, OKX, Bitget, WOO X. Hyperliquid and Aster arriving with the next
                update.
              </p>
            </div>
          </div>
        )}

        {/* Stat cards */}
        {stats.map((stat) => (
          <div key={stat.label} className={card}>
            <CardDots />
            <span className="font-inter-tight text-[40px] font-medium leading-none text-[#5D80FF]">
              {stat.value}
            </span>
            <div className="flex flex-col gap-2">
              <p className="font-inter-tight text-[16px] font-medium leading-[150%] text-white">
                {stat.label}
              </p>
              <p className="font-inter-tight text-[12px] font-normal leading-[150%] text-white/70">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </DirectionalReveal>
    </section>
  );
}
