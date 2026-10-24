'use client';

import Link from 'next/link';
import Image from 'next/image';
import WebsiteImage from '@/components/cj-website/WebsiteImage';
import { ArrowUpRight } from 'lucide-react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { fadeInLeft, fadeInRight } from '@/lib/animations';

function BulletCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0">
      <circle cx="10" cy="10" r="9.25" stroke="#22C55E" strokeWidth="1.5" opacity="0.6" />
      <path
        d="M6.5 10L9 12.5L13.5 7.5"
        stroke="#22C55E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type FeatureBullet = { bold: string; rest: string };

interface FeatureSplitProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  bullets: FeatureBullet[];
  ctaLabel: string;
  ctaHref: string;
  image?: { src: string; alt: string; width: number; height: number };
  imageFolder?: 'analytics' | 'journal';
  panel?: React.ReactNode;
  imageSide?: 'left' | 'right';
}

export default function FeatureSplit({
  badge,
  title,
  description,
  bullets,
  ctaLabel,
  ctaHref,
  image,
  imageFolder,
  panel,
  imageSide = 'right',
}: FeatureSplitProps) {
  const textVariants = imageSide === 'right' ? fadeInLeft : fadeInRight;
  const imageVariants = imageSide === 'right' ? fadeInRight : fadeInLeft;

  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[100px]">
        <DirectionalReveal
          variants={textVariants}
          className={`flex w-full flex-col gap-8 lg:w-1/2 ${imageSide === 'left' ? 'lg:order-2' : ''}`}
        >
          <div className="flex flex-col gap-4">
            <span
              className="inline-flex w-fit items-center rounded-[8px] border border-white/[0.05] px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
              }}
            >
              {badge}
            </span>

            <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
              {title}
            </h2>

            <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
              {description}
            </p>

            <ul className="flex flex-col">
              {bullets.map((bullet, i) => (
                <li
                  key={bullet.bold}
                  className={`flex items-center gap-3 border-b border-white/[0.05] py-4 ${
                    i === 0 ? 'border-t' : ''
                  }`}
                >
                  <BulletCheckIcon />
                  <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white/50">
                    <span className="font-medium text-white">{bullet.bold}</span> {bullet.rest}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={ctaHref}
            className="group relative flex h-11 w-fit items-center gap-3 rounded-[12px] bg-glow-blue py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white shadow-[0px_3px_6px_rgba(93,128,255,0.2),0px_11px_11px_rgba(93,128,255,0.17),0px_25px_15px_rgba(93,128,255,0.1)] transition-shadow hover:shadow-[0px_6px_10px_rgba(93,128,255,0.28),0px_15px_18px_rgba(93,128,255,0.22),0px_30px_22px_rgba(93,128,255,0.14)]"
          >
            <span>{ctaLabel}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
              <ArrowUpRight
                size={24}
                strokeWidth={2.25}
                className="text-glow-blue transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </DirectionalReveal>

        <DirectionalReveal
          variants={imageVariants}
          className={`w-full lg:w-1/2 ${imageSide === 'left' ? 'lg:order-1' : ''}`}
        >
          {panel ??
            (image &&
              (imageFolder ? (
                <WebsiteImage
                  folder={imageFolder}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="mx-auto w-full max-w-[570px] lg:max-w-none"
                />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="mx-auto w-full max-w-[570px] lg:max-w-none"
                />
              )))}
        </DirectionalReveal>
      </div>
    </section>
  );
}
