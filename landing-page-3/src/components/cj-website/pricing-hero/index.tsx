import Navbar from '../navbar-v1';
import PricingHeroContent from './PricingHeroContent';
import { HeroGlow } from '../HeroGlow';
import HeroDotBackdrop from '../HeroDotBackdrop';
import type { SessionPayload } from '@/lib/auth';

interface Props {
  session: SessionPayload | null;
}

export default function PricingHero({ session }: Props) {
  return (
    <div className="relative w-full">
      <HeroDotBackdrop heightPx={900} />
      <HeroGlow beamE={{ left: 'calc(50% + 577.77px)', top: 835.25 }} />

      <Navbar />

      <PricingHeroContent session={session} />
    </div>
  );
}
