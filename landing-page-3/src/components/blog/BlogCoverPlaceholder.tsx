import Image from 'next/image';
import cloudFrontLoader from '@/utils/cloudfront-loader';

export function BlogCoverPlaceholder() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-dark-card">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-glow-blue opacity-20 blur-[70px]" />
      <div className="absolute -right-8 -bottom-12 h-48 w-48 rounded-full bg-glow-blue opacity-[0.14] blur-[70px]" />
      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          loader={cloudFrontLoader}
          src="/images/logo-color.png"
          alt="ClearJournal"
          width={132}
          height={33}
          className="object-contain opacity-50"
        />
      </div>
    </div>
  );
}
