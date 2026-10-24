import type { Metadata } from 'next';
import ClearQuantHero from '@/components/cj-website/hero-section/ClearQuantHero';
import StatsBand from '@/components/cj-website/stats-band';
import type { StatItem } from '@/components/cj-website/stats-band';
import PersonalizedIntelligence from '@/components/cj-website/clearquant-ai/PersonalizedIntelligence';
import NotAChatbot from '@/components/cj-website/clearquant-ai/NotAChatbot';
import RawToAnswers from '@/components/cj-website/clearquant-ai/RawToAnswers';
import FindsPattern from '@/components/cj-website/clearquant-ai/FindsPattern';
import InsightReport from '@/components/cj-website/clearquant-ai/InsightReport';
import BuiltToTrust from '@/components/cj-website/clearquant-ai/BuiltToTrust';
import CQComparison from '@/components/cj-website/clearquant-ai/CQComparison';
import DataStaysYours from '@/components/cj-website/clearquant-ai/DataStaysYours';
import CQFaqSection from '@/components/cj-website/clearquant-ai/CQFaqSection';
import FinalCta from '@/components/cj-website/final-cta';
import Footer from '@/components/cj-website/footer';
import { SITE_URL } from '@/lib/site';
import TrustSecurity from '@/components/cj-website/trust-security';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: 'AI Crypto Trading Analyst | ClearQuant AI by ClearJournal',
  description:
    'ClearQuant AI reads your verified trade history and tells you exactly why your performance is changing. No predictions, no signals, just truth.',
  alternates: { canonical: `${SITE_URL}/clearquant-ai` },
  robots: { index: true, follow: true },
};

const CQ_STATS: StatItem[] = [
  {
    value: '2.4M+',
    label: 'Trades analyzed',
    description:
      'Every trade helps ClearQuant uncover meaningful patterns, surface behavioral edge, and reveal what actually drives your long-term performance.',
  },
  {
    value: '11,000+',
    label: 'Active traders',
    description:
      'Join thousands of traders building better habits through AI-powered journaling, performance insights, and consistent self-review.',
  },
  {
    value: '38%',
    label: 'Win rate improvement',
    description:
      'Users who consistently review their data with ClearQuant discover stronger setups, reduce emotional mistakes, and improve execution.',
  },
  {
    value: '<2 sec',
    label: 'Insight generation time',
    description:
      'Connect your account and get instant AI-powered performance breakdowns — no manual spreadsheets, no calculations.',
  },
];

const ClearQuantAiPage = async () => {
  return (
    <div className="overflow-x-clip bg-landing-dark">
      <ClearQuantHero />
      <PersonalizedIntelligence />
      <StatsBand stats={CQ_STATS} showExchanges={false} />
      <NotAChatbot />
      <RawToAnswers />
      <FindsPattern />
      <InsightReport />
      <BuiltToTrust />
      <CQComparison />
      <TrustSecurity />
      {/* <DataStaysYours /> Commented by the client on 29-09-26. */}
      <CQFaqSection />
      <FinalCta
        title={
          <>
            Run your first report
            <br />
            in two minutes.
          </>
        }
        description="Connect your exchange. ClearQuant reads the rest and tells you the truth."
        buttonText="Try ClearQuant AI free"
      />
      <Footer />
    </div>
  );
};

export default ClearQuantAiPage;
