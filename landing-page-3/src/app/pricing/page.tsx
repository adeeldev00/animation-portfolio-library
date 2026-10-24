import type { Metadata } from 'next';
import ComparePlansSection from '@/components/cj-website/compare-plans';
import FaqSection from '@/components/cj-website/faq-section';
import FinalCta from '@/components/cj-website/final-cta';
import Footer from '@/components/cj-website/footer';
import PricingHero from '@/components/cj-website/pricing-hero';
import WhyClearJournal from '@/components/cj-website/why-clear-journal';
import { getSession } from '@/lib/auth';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing | ClearJournal',
  description: 'Simple, transparent pricing for every kind of trader.',
  alternates: { canonical: `${SITE_URL}/pricing` },
};

const PricingPage = async () => {
  const session = await getSession();

  return (
    <div className="relative isolate overflow-x-clip bg-landing-dark">
      <PricingHero session={session} />
      <ComparePlansSection />
      <WhyClearJournal />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
};

export default PricingPage;
