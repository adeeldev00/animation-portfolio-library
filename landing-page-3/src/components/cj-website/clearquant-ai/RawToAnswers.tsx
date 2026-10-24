'use client';

import { useEffect, useRef, useState } from 'react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { GradientTracing } from '@/components/ui/GradientTracing';
import { landingSlideUp } from '@/lib/animations';

const STEPS = [
  {
    n: 1,
    title: 'Connect your exchange',
    body: 'Sync trades automatically via read-only API. Your full history populates in minutes.',
  },
  {
    n: 2,
    title: 'AI analyzes every trade',
    body: 'Patterns, risk concentration, and edge are recalculated continuously as new trades close.',
  },
  {
    n: 3,
    title: 'Get insights, ask anything',
    body: 'Open the dashboard to see what matters, or ask Clearquant a direct question any time.',
  },
];

const CYCLE_INTERVAL = 3000;

function StepConnector({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1240);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => observer.disconnect();
  }, []);

  const circleSize = 56;
  const halfCircle = circleSize / 2;
  const totalWidth = containerWidth;

  // Circle centers at 0%, 50%, 100% of total width
  const positions = [halfCircle, totalWidth / 2, totalWidth - halfCircle];

  // Two segment line spans between circle edges
  const seg1Start = positions[0] + halfCircle;
  const seg1End = positions[1] - halfCircle;
  const seg2Start = positions[1] + halfCircle;
  const seg2End = positions[2] - halfCircle;

  const seg1Width = seg1End - seg1Start;
  const seg2Width = seg2End - seg2Start;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: circleSize }}>
      {/* Segment 1 line */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: seg1Start, width: seg1Width }}
      >
        <GradientTracing
          width={seg1Width}
          height={4}
          baseColor="#5D80FF"
          gradientColors={['#5D80FF', '#5D80FF', '#9E00FF']}
          animationDuration={2.5}
          strokeWidth={1.5}
        />
      </div>

      {/* Segment 2 line */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: seg2Start, width: seg2Width }}
      >
        <GradientTracing
          width={seg2Width}
          height={4}
          baseColor="#5D80FF"
          gradientColors={['#5D80FF', '#5D80FF', '#9E00FF']}
          animationDuration={2.5}
          strokeWidth={1.5}
        />
      </div>

      {/* Step circles */}
      {positions.map((cx, i) => (
        <div
          key={i}
          className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-500"
          style={{
            left: cx,
            width: circleSize,
            height: circleSize,
            background: '#05060F',
            borderRadius: '50%',
            border: `1.5px solid ${activeIndex === i ? 'rgba(93,128,255,0.9)' : 'rgba(93,128,255,0.4)'}`,
            boxShadow: activeIndex === i ? '0 0 16px rgba(93,128,255,0.4)' : 'none',
          }}
        >
          <span
            className="text-center font-inter-tight font-medium transition-colors duration-500"
            style={{
              fontSize: 20,
              lineHeight: '150%',
              color: activeIndex === i ? '#5D80FF' : 'rgba(93,128,255,0.6)',
            }}
          >
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RawToAnswers() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        {/* Header */}
        <DirectionalReveal variants={landingSlideUp}>
          <div className="flex w-full max-w-[660px] flex-col items-center gap-4 text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center justify-center gap-1 px-2 py-1"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.1) 100%)',
                border: '1.5px solid rgba(255,255,255,0.05)',
                borderRadius: 8,
              }}
            >
              <span
                className="font-inter-tight font-normal"
                style={{ fontSize: 12, lineHeight: '150%', color: 'rgba(255,255,255,0.7)' }}
              >
                How it works
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-inter-tight font-normal text-white"
              style={{ fontSize: 'clamp(36px, 5vw, 48px)', lineHeight: '100%' }}
            >
              From raw trades to real answers.
            </h2>

            {/* Subtitle */}
            <p
              className="font-inter-tight font-normal"
              style={{ fontSize: 18, lineHeight: '150%', color: 'rgba(255,255,255,0.7)' }}
            >
              No setup, no manual tagging required. Clearquant AI works with the data you&apos;re
              already logging.
            </p>
          </div>
        </DirectionalReveal>

        {/* Connector + Cards */}
        <div className="flex w-full max-w-[1240px] flex-col gap-6">
          {/* Animated step connector */}
          <StepConnector activeIndex={activeIndex} />

          {/* Step cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={step.n}
                  onClick={() => setActiveIndex(i)}
                  className="text-left transition-all duration-500 focus:outline-hidden"
                  style={{
                    background: '#0A0B14',
                    border: `1.5px solid ${isActive ? 'rgba(93,128,255,0.8)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 24,
                    padding: '32px 8px',
                    boxShadow: isActive
                      ? '0 0 32px rgba(93,128,255,0.15), inset 0 0 0 1px rgba(93,128,255,0.15)'
                      : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div className="flex flex-col items-start gap-2 px-4">
                    <h3
                      className="w-full text-center font-inter-tight font-medium text-white transition-colors duration-300"
                      style={{ fontSize: 24, lineHeight: '150%' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="w-full text-center font-inter-tight font-normal transition-colors duration-300"
                      style={{ fontSize: 16, lineHeight: '150%', color: 'rgba(255,255,255,0.7)' }}
                    >
                      {step.body}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
