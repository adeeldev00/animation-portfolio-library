import { AiMagicIcon, Analytics01Icon, GridViewIcon, Radar02Icon } from 'hugeicons-react';
import FeatureIconCards from '@/components/cj-website/feature-icon-cards';
import type { FeatureIconCard } from '@/components/cj-website/feature-icon-cards';

const CARDS: FeatureIconCard[] = [
  {
    icon: <GridViewIcon size={16} className="text-white opacity-90" />,
    title: 'Every angle, automatically',
    description: 'Symbol, session, day, and setup. Every trade is sliced the moment it closes.',
  },
  {
    icon: <Radar02Icon size={16} className="text-white opacity-90" />,
    title: 'Find the setups that pay',
    description: 'Identify the patterns making you money, and the ones quietly draining your edge.',
  },
  {
    icon: <Analytics01Icon size={16} className="text-white opacity-90" />,
    title: 'See when you win and lose',
    description:
      'Break down your P&L by days, hours, and trading sessions to spot your best conditions.',
  },
  {
    icon: <AiMagicIcon size={16} className="text-white opacity-90" />,
    title: 'ClearQuant explains the why',
    description:
      'Our built-in trading analyst, turning every result into an actionable explanation.',
  },
];

export default function AnalyticsFeatureCards() {
  return <FeatureIconCards cards={CARDS} />;
}
