import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';
import { card, CardDots } from '@/components/cj-website/stats-band';

export interface FeatureIconCard {
  icon: LucideIcon | ReactNode;
  title: string;
  description: string;
}

interface FeatureIconCardsProps {
  cards: FeatureIconCard[];
  columns?: 2 | 3 | 4;
}

export default function FeatureIconCards({ cards, columns = 4 }: FeatureIconCardsProps) {
  const gridClass =
    columns === 2
      ? 'grid grid-cols-1 gap-4 sm:grid-cols-2'
      : columns === 3
        ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="section-shell section-pad">
      <DirectionalReveal variants={landingSlideUp} className={gridClass}>
        {cards.map((item) => (
          <div key={item.title} className={card}>
            <CardDots />
            {/* Double-ring icon — outer glow ring + inner solid circle (matches ClearQuant AI page) */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(93, 128, 255, 0.2)' }}
            >
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#5D80FF]">
                {typeof item.icon === 'function' ? (
                  <item.icon size={16} strokeWidth={1.75} className="text-white opacity-90" />
                ) : (
                  item.icon
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-inter-tight text-[16px] leading-[150%] font-medium text-white">
                {item.title}
              </p>
              <p className="font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </DirectionalReveal>
    </section>
  );
}
