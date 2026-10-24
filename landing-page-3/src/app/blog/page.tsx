import type { Metadata } from 'next';
import { BlogFeaturedCard } from '@/components/blog/BlogFeaturedCard';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { CategoryTabs } from '@/components/blog/CategoryTabs';
import FinalCta from '@/components/cj-website/final-cta';
import { HeroGlow } from '@/components/cj-website/HeroGlow';
import { DUMMY_POSTS } from '@/data/dummy-posts';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog | ClearJournal',
  description: 'Trading guides, strategy insights, and crypto journaling tips from the ClearJournal team.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  const [featured, ...rest] = DUMMY_POSTS;
  const categories = Array.from(new Set(DUMMY_POSTS.map((p) => p.frontmatter.category)));

  return (
    <div className="relative overflow-x-clip bg-landing-dark">
      <HeroGlow />
      <div className="section-shell relative z-10 flex flex-col gap-16 px-5 pt-32 pb-24 lg:px-[100px]">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-inter-tight text-[40px] font-medium text-white lg:text-[56px]">
            The ClearJournal Blog
          </h1>
          <p className="mx-auto max-w-[560px] font-inter-tight text-[16px] text-white/70">
            Trading guides, strategy insights, and journaling tips.
          </p>
        </div>

        <CategoryTabs categories={categories} totalCount={DUMMY_POSTS.length} />

        <BlogFeaturedCard post={featured} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
      <FinalCta />
    </div>
  );
}
