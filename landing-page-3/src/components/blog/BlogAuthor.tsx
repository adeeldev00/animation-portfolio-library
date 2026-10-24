import Image from 'next/image';
import cloudFrontLoader from '@/utils/cloudfront-loader';

interface BlogAuthorProps {
  name: string;
  avatar?: string;
  readingTimeMin: number;
}

export function BlogAuthor({ name, avatar, readingTimeMin }: BlogAuthorProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        {avatar ? (
          <Image
            loader={cloudFrontLoader}
            src={avatar}
            alt={name}
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-glow-blue/20 text-[13px] font-medium text-glow-blue">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="font-inter-tight text-[16px] font-medium text-white">{name}</span>
      </div>
      <span className="font-inter-tight text-[14px] font-normal text-white/50">
        {readingTimeMin} min read
      </span>
    </div>
  );
}

export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
