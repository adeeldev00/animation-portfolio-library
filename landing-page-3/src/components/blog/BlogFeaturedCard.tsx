import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
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

export function BlogFeaturedCard({ post }: { post: Post }) {
  const { frontmatter, slug, readingTimeMin } = post;

  return (
    <div
      className="group relative flex w-full flex-col overflow-hidden rounded-[24px] lg:flex-row"
      style={{ border: '1.5px solid rgba(255,255,255,0.05)' }}
    >
      {/* Cover image */}
      <div className="relative h-[240px] w-full shrink-0 bg-dark-card sm:h-[320px] lg:h-auto lg:w-[57%]">
        {frontmatter.coverImage ? (
          <Image
            loader={cloudFrontLoader}
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <BlogCoverPlaceholder />
        )}

        <DotGridDecoration
          className="absolute top-0 left-0 h-[300px] w-[300px]"
          maskImage="radial-gradient(120px 120px at 0% 0%, black, transparent 75%)"
        />

        <DotGridDecoration
          className="absolute top-[-20px] left-[360px] h-[365px] w-[364px]"
          maskImage="radial-gradient(260px 260px at 100% 0%, black 0%, black 40%, transparent 100%)"
        />

        {/* Title + author overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center lg:p-10">
          <div className="flex w-full max-w-[393px] flex-col items-center gap-6">
            <span className="rounded-[8px] border-[1.5px] border-white/20 px-[10px] py-[2px] font-inter-tight text-[14px] leading-[150%] font-normal text-glow-blue">
              {capitalize(frontmatter.category)}
            </span>
            <h3 className="font-inter-tight text-[24px] leading-[1.15] font-medium text-white capitalize lg:text-[32px]">
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

      {/* Content panel */}
      <div className="relative flex flex-1 flex-col justify-between gap-8 overflow-hidden bg-elevated p-6 lg:p-8">
        <DotGridDecoration
          className="absolute right-0 bottom-0 h-[300px] w-[300px]"
          maskImage="radial-gradient(120px 120px at 100% 100%, black, transparent 75%)"
        />
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between font-inter-tight text-[14px]">
            <span className="font-normal text-white/50">
              {formatBlogDate(frontmatter.publishedAt)}
            </span>
            <span className="font-medium text-glow-blue">{capitalize(frontmatter.category)}</span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-inter-tight text-[26px] leading-[1.1] font-medium text-white capitalize lg:text-[38px]">
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

        <Link
          href={`/blog/${slug}`}
          className="relative z-10 flex w-fit items-center gap-3 rounded-[12px] bg-white/10 py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white backdrop-blur-[12px] transition-colors hover:bg-white/15"
        >
          <span>Read the Article</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/5">
            <ArrowRight
              size={22}
              strokeWidth={2}
              className="text-white transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
