import FeatureIconCards from '@/components/cj-website/feature-icon-cards';
import type { FeatureIconCard } from '@/components/cj-website/feature-icon-cards';
import { AiMagicIcon, Analytics01Icon, Note01Icon, Search02Icon } from 'hugeicons-react';

const CARDS: FeatureIconCard[] = [
  {
    icon: <Note01Icon size={16} className="text-white opacity-90" />,
    title: 'A journal that keeps itself',
    description: 'Connect once and automatically capture every trade without manual logging.',
  },
  {
    icon: <Search02Icon size={16} className="text-white opacity-90" />,
    title: 'Understand every loss',
    description: 'Every trade is analyzed to reveal the patterns behind your wins and losses.',
  },
  {
    icon: <Analytics01Icon size={16} className="text-white opacity-90" />,
    title: 'Know the move you left behind',
    description: 'Measure how much profit you captured and identify missed opportunities.',
  },
  {
    icon: <AiMagicIcon size={16} className="text-white opacity-90" />,
    title: 'ClearQuant reads all of it',
    description: 'Your built-in AI analyst explains every trade with clear, actionable insights.',
  },
];

export default function JournalValueProps() {
  return <FeatureIconCards cards={CARDS} />;
}
