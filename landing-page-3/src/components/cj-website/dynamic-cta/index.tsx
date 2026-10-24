'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import cloudFrontLoader from '@/utils/cloudfront-loader';

interface DynamicCTAProps {
  text: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const DynamicCTA: React.FC<DynamicCTAProps> = ({ text, icon, href, onClick, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClasses =
    'relative z-10 flex h-[52px] items-center justify-center gap-2 rounded-full px-8 font-roobert text-[16px] font-medium text-white transition-all duration-300 hover:scale-105';

  const buttonStyles: React.CSSProperties = {
    // background: isHovered ? 'rgba(2, 6, 23, 0.2)' : 'hsl(var(--landing-dark))',
    boxShadow: isHovered ? '0px 16px 64px 0px rgba(253, 189, 92, 0.25)' : 'none',
    backdropFilter: isHovered ? 'blur(10px)' : 'none',
    border: 'none',
  };

  const renderContent = () => (
    <>
      <div
        className={cn(
          'pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out',
          isHovered ? 'scale-105 rotate-30 opacity-100' : 'scale-50 opacity-0'
        )}
      >
        <Image
          src="/images/website/landing-page/cta-btn-animation.png"
          alt="CTA Animation"
          fill
          sizes="200px"
          className="object-contain"
          loader={cloudFrontLoader}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: '1px',
          background: `conic-gradient(from 179.78deg at 50% 50%, 
            rgba(255, 255, 255, 0.07) -54.98deg, 
            #FDBD5C 52.13deg, 
            rgba(255, 255, 255, 0.04) 125.06deg, 
            #FFFFFF 235.09deg, 
            rgba(255, 255, 255, 0.07) 305.02deg, 
            #FDBD5C 412.13deg)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {text}
        {icon && (
          <span
            className={cn(
              'flex items-center transition-transform duration-300',
              isHovered && 'translate-x-1'
            )}
          >
            {icon}
          </span>
        )}
      </span>
    </>
  );

  return (
    <div
      className={cn('group relative inline-block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {href ? (
        <Link href={href} className={buttonClasses} style={buttonStyles}>
          {renderContent()}
        </Link>
      ) : (
        <button onClick={onClick} className={buttonClasses} style={buttonStyles}>
          {renderContent()}
        </button>
      )}
    </div>
  );
};

export default DynamicCTA;
