'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import cloudFrontLoader from '@/utils/cloudfront-loader';
import { cn } from '@/lib/utils';
import DynamicCTA from '../dynamic-cta';
import { SECTIONS } from '@/data/elevate-strategy-data';
import ConicGradientCard from '@/components/ui/ConicGradientCard';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { staggerContainer, fadeInLeft, fadeInLeftDelay, fadeInRight } from '@/lib/animations';

const DEFAULT_IMAGE_STYLE: React.CSSProperties = {
  width: 'calc(100% + 110px)',
  height: '626px',
  top: '152px',
  left: '-55px',
};

const ElevateStrategy = () => {
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative w-full overflow-visible px-4 py-[60px] text-white sm:px-10 lg:px-20 lg:py-[100px]">
      <div className="container mx-auto mb-20 px-4">
        <div className="sticky top-0 z-60 bg-landing-dark/80 py-6 backdrop-blur-md transition-all duration-300 lg:py-10">
          <DirectionalReveal
            variants={fadeInLeft}
            className="bg-gradient-text-white-gray bg-clip-text font-roobert text-[36px] leading-tight font-semibold tracking-[-0.96px] text-transparent text-white md:text-[48px] lg:text-left"
          >
            Elevate Your Trading Strategy
          </DirectionalReveal>
        </div>

        <div className="mt-8 flex flex-col gap-12 lg:flex-row">
          <div className="hidden lg:block lg:w-[180px]">
            <DirectionalReveal
              className="sticky top-[160px] flex flex-col gap-4"
              variants={staggerContainer}
              custom={0.15}
            >
              {SECTIONS.map((section) => {
                const isActive = activeTab === section.id;
                return (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleNavClick(e, section.id)}
                    variants={fadeInLeft}
                    className={cn(
                      'relative flex h-[52px] w-[180px] items-center justify-start rounded-full px-[24px] font-roobert text-[16px] transition-colors duration-300',
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/60'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 z-0 rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{
                          border: '1px solid transparent',
                          background: `
                            linear-gradient(hsl(var(--landing-dark)), hsl(var(--landing-dark))) padding-box, 
                            conic-gradient(from 0deg at 50% 50%, 
                              rgba(255, 255, 255, 0) -54.98deg, 
                              #FDBD5C 52.13deg, 
                              rgba(253, 189, 92, 0.4) 125.06deg, 
                              rgba(255, 255, 255, 0) 235.09deg, 
                              rgba(255, 255, 255, 0) 305.02deg, 
                              #FDBD5C 412.13deg) border-box
                          `,
                        }}
                      />
                    )}
                    <span className="relative z-10">{section.tabLabel}</span>
                  </motion.a>
                );
              })}
            </DirectionalReveal>
          </div>

          <div className="flex flex-1 flex-col gap-[120px]">
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-[180px]">
                <div className="mb-10 max-w-[988px]">
                  <DirectionalReveal
                    variants={fadeInLeft}
                    className="mb-4 bg-gradient-text-white-gray bg-clip-text font-roobert text-[32px] leading-tight font-medium tracking-[-0.56px] text-transparent"
                  >
                    {section.heading}
                  </DirectionalReveal>
                  <DirectionalReveal
                    variants={fadeInLeftDelay}
                    className="max-w-[800px] font-roobert text-[18px] leading-[28px] font-normal text-white/60"
                  >
                    {section.description}
                  </DirectionalReveal>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {section.cards.map((card, idx) => (
                    <DirectionalReveal key={idx} variants={idx === 0 ? fadeInLeft : fadeInRight}>
                      <ConicGradientCard
                        className="flex min-h-[700px] w-full flex-col p-[32px]"
                        style={{
                          borderRadius: '16px',
                          borderWidth: '0.5px',
                        }}
                      >
                        <div className="relative z-20 flex max-w-[418px] flex-col gap-[24px]">
                          <div>
                            <span className="inline-block rounded-md bg-[#FDBD5C]/10 px-3 py-1 font-roobert text-[12px] font-medium text-[#FDBD5C]">
                              {card.badge}
                            </span>
                            <h4 className="mt-4 font-roobert text-[24px] font-semibold text-white">
                              {card.title}
                            </h4>
                          </div>
                          <p className="font-roobert text-[18px] leading-[28px] font-normal text-white/60">
                            {card.description}
                          </p>
                        </div>

                        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[16px]">
                          <div
                            className="absolute"
                            style={{
                              ...DEFAULT_IMAGE_STYLE,
                              ...card.imageStyle,
                            }}
                          >
                            {idx === 0 && (
                              <div
                                className="absolute z-30 rounded-full bg-[#165DFF] opacity-[0.40] blur-[100px]"
                                style={{
                                  width: '350px',
                                  height: '400px',
                                  top: '26px',
                                  left: '-114px',
                                }}
                              />
                            )}
                            {idx === 1 && (
                              <div
                                className="absolute z-30 rounded-full bg-[#165DFF] opacity-[0.40] blur-[120px]"
                                style={{
                                  width: '350px',
                                  height: '400px',
                                  top: '-39px',
                                  left: '352px',
                                }}
                              />
                            )}

                            <Image
                              src={card.image}
                              alt={card.title}
                              loader={cloudFrontLoader}
                              fill
                              className={cn(
                                'object-top transition-transform duration-700 hover:scale-105',
                                card.objectFit === 'cover' ? 'object-cover' : 'object-contain'
                              )}
                              priority
                            />
                          </div>
                        </div>
                      </ConicGradientCard>
                    </DirectionalReveal>
                  ))}
                </div>

                <DirectionalReveal variants={fadeInLeft} className="mt-12">
                  <DynamicCTA text="Join Free Beta" href="/waitlist" />
                </DirectionalReveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElevateStrategy;
