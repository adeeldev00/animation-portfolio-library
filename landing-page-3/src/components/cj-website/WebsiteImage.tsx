import Image from 'next/image';
import cloudFrontLoader from '@/utils/cloudfront-loader';
import type { ComponentProps } from 'react';

const CDN_BASE = '/website-content';

type WebsiteImageProps = Omit<ComponentProps<typeof Image>, 'loader'> & {
  folder: 'analytics' | 'journal';
};

/**
 * Drop-in Next.js Image for marketing page assets hosted on S3/CloudFront.
 * Pass `folder` + a bare filename (or sub-path) in `src` — the component
 * prepends the correct S3 prefix and wires up cloudFrontLoader automatically.
 *
 * S3 structure: public/website-content/{folder}/{src}
 *
 * Usage:
 *   <WebsiteImage folder="analytics" src="hero-visual.svg" width={1240} height={497} alt="…" />
 *   <WebsiteImage folder="journal"   src="hero.svg"        width={1240} height={600} alt="…" />
 */
export default function WebsiteImage({ folder, src, ...rest }: WebsiteImageProps) {
  const resolvedSrc =
    typeof src === 'string' && !src.startsWith('http')
      ? `${CDN_BASE}/${folder}/${src.replace(/^\//, '')}`
      : src;

  return <Image loader={cloudFrontLoader} src={resolvedSrc} {...rest} />;
}
