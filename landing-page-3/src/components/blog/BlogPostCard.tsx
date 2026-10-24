import Link from 'next/link';
import Image from 'next/image';
import cloudFrontLoader from '@/utils/cloudfront-loader';
import { BlogAuthor, formatBlogDate } from './BlogAuthor';
import { BlogCoverPlaceholder } from './BlogCoverPlaceholder';
import { DotGridDecoration } from './DotGridDecoration';
interface Post {
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

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function BlogPostCard({ post }: { post: Post }) {
  const { frontmatter, slug, readingTimeMin } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-[24px]"
      style={{ border: '1.5px solid rgba(255,255,255,0.05)' }}
    >
      {/* Cover image */}
      <div className="relative h-[240px] w-full shrink-0 overflow-hidden bg-dark-card sm:h-[320px]">
        {frontmatter.coverImage ? (
          <Image
            loader={cloudFrontLoader}
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <BlogCoverPlaceholder />
        )}

        <DotGridDecoration
          className="absolute top-0 left-0 h-[300px] w-[300px]"
          maskImage="radial-gradient(120px 120px at 0% 0%, black, transparent 75%)"
        />

        <DotGridDecoration
          className="absolute top-0 right-0 h-[300px] w-[300px]"
          maskImage="radial-gradient(120px 120px at 100% 0%, black, transparent 75%)"
        />

        {/* Title + author overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="flex w-full max-w-[280px] flex-col items-center gap-4">
            <span className="rounded-[8px] border-[1.5px] border-white/20 px-[10px] py-[2px] font-inter-tight text-[14px] leading-[150%] font-normal text-glow-blue">
              {capitalize(frontmatter.category)}
            </span>
            <h3 className="font-inter-tight text-[24px] leading-[1.1] font-medium text-white capitalize lg:text-[32px]">
              {frontmatter.title}
            </h3>
            <div className="flex items-center gap-3">
              {frontmatter.author.avatar ? (
                <Image
                  loader={cloudFrontLoader}
                  src={frontmatter.author.avatar}
                  alt={frontmatter.author.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-glow-blue/20 text-[13px] font-medium text-glow-blue">
                  {frontmatter.author.name.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="font-inter-tight text-[16px] font-medium text-white">
                {frontmatter.author.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-1 flex-col gap-6 bg-elevated p-6"
        style={{ borderTop: '1.5px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-between font-inter-tight text-[14px]">
          <span className="font-normal text-white/50">
            {formatBlogDate(frontmatter.publishedAt)}
          </span>
          <span className="font-medium text-glow-blue">{capitalize(frontmatter.category)}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-inter-tight text-[22px] leading-[1.3] font-medium text-white transition-colors group-hover:text-white lg:text-[24px]">
            {frontmatter.title}
          </h3>
          <p className="line-clamp-2 font-inter-tight text-[16px] leading-[1.5] font-normal text-white/70">
            {frontmatter.description}
          </p>
        </div>

        <BlogAuthor
          name={frontmatter.author.name}
          avatar={frontmatter.author.avatar}
          readingTimeMin={readingTimeMin}
        />
      </div>
    </Link>
  );
}
