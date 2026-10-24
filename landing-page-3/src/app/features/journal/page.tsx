import type { Metadata } from 'next';
import JournalHero from '@/components/cj-website/journal-page/JournalHero';
import JournalValueProps from '@/components/cj-website/journal-page/JournalValueProps';
import FeatureSplit from '@/components/cj-website/journal-page/FeatureSplit';
import JournalProfitCaptureSection from '@/components/cj-website/journal-page/JournalProfitCaptureSection';
import TradeLogPanel from '@/components/cj-website/journal-page/TradeLogPanel';
import ComparisonSection from '@/components/cj-website/comparison-section';
import type { Row } from '@/components/cj-website/comparison-section';
import FaqSection from '@/components/cj-website/faq-section';
import type { Faq } from '@/components/cj-website/faq-section';
import FinalCta from '@/components/cj-website/final-cta';
import Footer from '@/components/cj-website/footer';
import { SITE_URL } from '@/lib/site';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: 'Crypto Trade Journal | Auto-Synced Trading Journal Tool',
  description:
    'Connect once and your trade history fills itself in — no manual entry, ever. See how much of each move you captured and what you left behind.',
  alternates: { canonical: `${SITE_URL}/features/journal` },
  robots: { index: true, follow: true },
};

const COMPARISON_ROWS: Row[] = [
  {
    feature: 'Automatic trade sync from exchange',
    spreadsheet: { type: 'cross' },
    generic: { type: 'text', value: 'Sometimes' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Profit-capture & exit-timing scoring',
    spreadsheet: { type: 'cross' },
    generic: { type: 'cross' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Real leverage from the exchange API',
    spreadsheet: { type: 'cross' },
    generic: { type: 'cross' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Per-setup & per-mistake P&L',
    spreadsheet: { type: 'text', value: 'Manual' },
    generic: { type: 'text', value: 'Basic' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Trade anatomy chart (entry, exit, best & worst point)',
    spreadsheet: { type: 'cross' },
    generic: { type: 'cross' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Notes linked to verified trades',
    spreadsheet: { type: 'cross' },
    generic: { type: 'text', value: 'Sometimes' },
    clearjournal: { type: 'check' },
  },
];

const JOURNAL_FAQS: Faq[] = [
  {
    question: 'Do I have to log trades manually?',
    answer:
      'Never. Connect once and your full history syncs automatically, with new trades appearing as they close — fees, funding, leverage and all.',
  },
  {
    question: "How do you know if I'm exiting too early?",
    answer:
      'Every trade records the best and worst price it hit while you were in it. ClearJournal compares your exit against that available move, so you see exactly how much of each trade you captured — and how much you left behind.',
  },
  {
    question: 'Does it show my real leverage?',
    answer:
      'Yes. Leverage is pulled directly from your exchange API for every trade — not estimated, not entered by hand.',
  },
  {
    question: 'Can I export my journal?',
    answer:
      'Yes. Filter or search your whole history, then download it to CSV or PDF in one click. Notes export to PDF too.',
  },
  {
    question: 'Are my notes private?',
    answer:
      'Completely. Notes are private by default and only visible to you — even if you share a verified public profile, your notes stay yours.',
  },
];

const JournalFeaturePage = () => {
  return (
    <div className="overflow-x-clip bg-landing-dark">
      <JournalHero />
      <JournalValueProps />

      <FeatureSplit
        badge="Trade Log"
        title={<>The journal that writes itself.</>}
        description="Connect once and every trade — across every account — lands in one log automatically, with the real leverage, fees, and funding pulled straight from the exchange. No manual entry, no gaps, nothing you'd conveniently forget to write down."
        bullets={[
          {
            bold: 'Auto-synced full history –',
            rest: 'entries, exits, fees, funding, all of it. No manual entry, ever.',
          },
          {
            bold: 'Real leverage on every trade –',
            rest: 'pulled straight from your exchange, not estimated.',
          },
          {
            bold: 'Trade anatomy –',
            rest: 'the best and worst point the trade ever hit, and the chart with your entry and exit marked.',
          },
          {
            bold: 'Open positions, live –',
            rest: 'unrealized P&L across every connected account in one view.',
          },
          {
            bold: 'Filter, search, export –',
            rest: 'slice your whole history and download it to CSV or PDF.',
          },
        ]}
        ctaLabel="Get Started"
        ctaHref="/register"
        panel={<TradeLogPanel />}
        imageSide="right"
      />

      <JournalProfitCaptureSection />

      <FeatureSplit
        badge="Tag Manager"
        title={<>Turn your mistakes into a system.</>}
        description="Tag trades by strategy, setup, and mistake — then watch the P&L attach itself. Within a week you can see which setups actually pay and which habits are quietly draining the account."
        bullets={[
          {
            bold: 'Strategies, setups, and mistakes –',
            rest: 'each with trades, total P&L, avg P&L, and win rate.',
          },
          { bold: 'Best setup and worst mistake –', rest: 'surfaced automatically.' },
          {
            bold: '"Needs attention" –',
            rest: 'flags the tags bleeding money before they bleed more.',
          },
          { bold: 'Click any tag –', rest: 'to see exactly which trades it covers.' },
        ]}
        ctaLabel="Try for Free"
        ctaHref="/register"
        image={{
          src: 'tag-manager.svg',
          alt: 'Tag manager with strategies, setups and mistake tags and entry criteria',
          width: 570,
          height: 600,
        }}
        imageFolder="journal"
        imageSide="left"
      />

      <FeatureSplit
        badge="Notebook"
        title={<>The half of the journal that&apos;s still yours.</>}
        description="The numbers tell you what happened. Your notes tell you why. Write freely, link any note to the exact trade it's about, tag it, and let AI Assist turn a rushed vent into a usable lesson."
        bullets={[
          {
            bold: 'A real rich-text notebook –',
            rest: 'organize notes into folders, favorite the ones that matter.',
          },
          { bold: 'Link any note to the verified trade –', rest: "it's about." },
          {
            bold: 'Tag notes – the same way you tag trades –',
            rest: 'setups, mistakes, lessons.',
          },
          {
            bold: 'AI Assist –',
            rest: 'to sharpen a rushed note, and one-click export to PDF.',
          },
        ]}
        ctaLabel="Get Started"
        ctaHref="/register"
        image={{
          src: 'notes-panel.svg',
          alt: 'Note linked to a verified BTC trade with tags, AI Assist and PDF export',
          width: 570,
          height: 600,
        }}
        imageFolder="journal"
        imageSide="right"
      />

      <ComparisonSection
        title={
          <>
            Most journals are where good
            <br />
            intentions go to die.
          </>
        }
        description="Because they make you do the work. ClearJournal does it for you and shows you things a manual log never could."
        rows={COMPARISON_ROWS}
      />

      <FaqSection faqs={JOURNAL_FAQS} />

      <FinalCta
        title={
          <>
            Your journal is already written.
            <br />
            Come read it.
          </>
        }
        description="Connect your exchange and your full, autopsied trade history is waiting in about two minutes."
        buttonText="Get Started for Free"
      />
      <Footer />
    </div>
  );
};

export default JournalFeaturePage;
