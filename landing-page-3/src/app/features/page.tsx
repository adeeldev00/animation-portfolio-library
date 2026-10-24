import type { Metadata } from 'next';
import React from 'react';
import Hero from '@/components/cj-website/hero-section/FeaturesHero';
import FeatureDetails from '@/components/cj-website/feature-details';
import ImportOneCick from '@/components/cj-website/features/ImportOneCick';
import NotesAndTags from '@/components/cj-website/features/NotesAndTags';
import TagReports from '@/components/cj-website/features/TagReports';
import ReportOverview from '@/components/cj-website/features/ReportOverview';
import ShapeFuture from '@/components/cj-website/shape-future';
import Footer from '@/components/cj-website/footer';
import { SITE_URL } from '@/lib/site';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: 'Features | ClearJournal',
  description: 'Everything you need to journal, analyze, and improve your trading.',
  alternates: { canonical: `${SITE_URL}/features` },
};

function Features() {
  return (
    <div className="bg-white">
      <Hero
        title="Trade Journaling made simple & hassle free"
        description="ClearJournal makes journaling trades seamless through automation. The idea behind trade journaling is to record your trades for later performance analysis. This helps identify strengths/weaknesses in your trading, to increase your confidence and win rate."
      />
      <FeatureDetails />
      <ImportOneCick />
      <NotesAndTags />
      <TagReports />
      <ReportOverview />
      <ShapeFuture />
      <Footer />
    </div>
  );
}

export default Features;
