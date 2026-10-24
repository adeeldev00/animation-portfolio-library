import type { Metadata } from 'next';
import AnalyticsHero from '@/components/cj-website/hero-section/AnalyticsHero';
import AnalyticsFeatureCards from '@/components/cj-website/analytics/AnalyticsFeatureCards';
import AnalyticsFeatureSections from '@/components/cj-website/analytics/AnalyticsFeatureSections';
import AnalyticsComparison from '@/components/cj-website/analytics/AnalyticsComparison';
import AnalyticsFaq from '@/components/cj-website/analytics/AnalyticsFaq';
import FinalCta from '@/components/cj-website/final-cta';
import Footer from '@/components/cj-website/footer';
import { SITE_URL } from '@/lib/site';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: 'Analytics & Reporting — Find out where your edge lives',
  description:
    'ClearJournal slices your trading history by symbol, session, and setup so you see which version of you actually makes money. Try it free.',
  alternates: { canonical: `${SITE_URL}/trading-analytics` },
  robots: { index: true, follow: true },
};

const AnalyticsPage = () => {
  return (
    <div className="overflow-x-clip bg-landing-dark">
      <AnalyticsHero />
      <AnalyticsFeatureCards />
      <AnalyticsFeatureSections />
      <AnalyticsComparison />
      <AnalyticsFaq />
      <FinalCta
        title={
          <>
            Find your edge. Then
            <br />
            trade only that.
          </>
        }
        description="Connect your exchange and see exactly where your money is made and lost in about two minutes."
        buttonText="Get Started for Free"
      />
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
