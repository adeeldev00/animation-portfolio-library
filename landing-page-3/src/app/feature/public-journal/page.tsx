import type { Metadata } from 'next';
import Footer from '@/components/cj-website/footer';
import FaqSection from '@/components/cj-website/faq-section';
import FinalCta from '@/components/cj-website/final-cta';
import VerifiedProfileHero from '@/components/cj-website/verified-profile/Hero';
import ProblemSection from '@/components/cj-website/verified-profile/ProblemSection';
import ProfileShowcaseSection from '@/components/cj-website/verified-profile/ProfileShowcaseSection';
import FeedSection from '@/components/cj-website/verified-profile/FeedSection';
import WhoItsForSection from '@/components/cj-website/verified-profile/WhoItsForSection';
import ControlSection from '@/components/cj-website/verified-profile/ControlSection';
import ProofTableSection from '@/components/cj-website/verified-profile/ProofTableSection';
import { SITE_URL } from '@/lib/site';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: 'Public Trading Journal — Live, Verified Trading Proof',
  description:
    'Every ClearJournal profile is built live from your exchange — real trades, real P&L, stamped Verified. Share proof nobody can fake.',
  alternates: { canonical: `${SITE_URL}/feature/public-journal` },
  robots: { index: true, follow: true },
};

const VerifiedPage = () => {
  return (
    <div className="relative isolate overflow-x-clip bg-landing-dark">
      <VerifiedProfileHero />
      <ProblemSection />
      <ProfileShowcaseSection />
      <FeedSection />
      <WhoItsForSection />
      <ControlSection />
      <ProofTableSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
};

export default VerifiedPage;
