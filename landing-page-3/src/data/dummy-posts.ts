export interface DummyPost {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    category: string;
    coverImage?: string;
    author: { name: string; avatar?: string };
    publishedAt: string;
  };
  readingTimeMin: number;
}

export const DUMMY_POSTS: DummyPost[] = [
  {
    slug: 'crypto-tax-guide-traders',
    frontmatter: {
      title: 'A Trader’s Guide to Crypto Taxes',
      description:
        'What every active trader needs to know before tax season — cost basis, wash sales, and record-keeping that actually holds up.',
      category: 'tax',
      author: { name: 'ClearJournal Team' },
      publishedAt: '2026-04-03T00:00:00.000Z',
    },
    readingTimeMin: 7,
  },
  {
    slug: 'crypto-futures-trading-metrics',
    frontmatter: {
      title: 'The Metrics That Actually Predict Futures Trading Success',
      description:
        'Win rate is a vanity metric. Here’s what to track instead if you want to know whether your edge is real.',
      category: 'guides',
      author: { name: 'ClearJournal Team' },
      publishedAt: '2026-05-11T00:00:00.000Z',
    },
    readingTimeMin: 9,
  },
  {
    slug: 'journaling-habit-that-sticks',
    frontmatter: {
      title: 'Building a Trade Journaling Habit That Actually Sticks',
      description:
        'Most traders quit journaling within two weeks. Here’s a lighter workflow that survives contact with a losing streak.',
      category: 'psychology',
      author: { name: 'ClearJournal Team' },
      publishedAt: '2026-06-02T00:00:00.000Z',
    },
    readingTimeMin: 6,
  },
];
