'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  RevealSequence,
  SequenceBlock,
  SequenceDot,
  SequencePath,
  SequenceTyping,
} from '@/components/ui/RevealSequence';

// ─── Data ────────────────────────────────────────────────────────────────────

const SUCCESS = '#22C55E';
const DANGER = '#EF4444';

interface TableRow {
  symbol: 'BTC' | 'SUI' | 'ENA' | 'ETH';
  longPct: string;
  shortPct: string;
  /** Green bar width in px (track is 116.38px) */
  barWidth: number;
  winRate: string;
  pnl: string;
  pnlPositive: boolean;
  rowBg?: string;
}

const ROWS: TableRow[] = [
  {
    symbol: 'BTC',
    longPct: '76.47%',
    shortPct: '23.53%',
    barWidth: 91.24,
    winRate: '85.02%',
    pnl: '$21,845.67',
    pnlPositive: true,
    rowBg: 'rgba(34, 197, 94, 0.1)',
  },
  {
    symbol: 'SUI',
    longPct: '75%',
    shortPct: '25%',
    barWidth: 93.71,
    winRate: '75%',
    pnl: '$35.13',
    pnlPositive: true,
  },
  {
    symbol: 'ENA',
    longPct: '54.55%',
    shortPct: '45.45%',
    barWidth: 65.67,
    winRate: '52.56%',
    pnl: '-$218.46',
    pnlPositive: false,
  },
  {
    symbol: 'ETH',
    longPct: '32.26%',
    shortPct: '68.34%',
    barWidth: 40.6,
    winRate: '36.36%',
    pnl: '-$942.38',
    pnlPositive: false,
    rowBg: 'rgba(239, 68, 68, 0.1)',
  },
];

// ─── Coin icons ──────────────────────────────────────────────────────────────

const CoinIcon = ({ symbol }: { symbol: TableRow['symbol'] }) => {
  const size = 28.87;
  switch (symbol) {
    case 'BTC':
      return (
        <svg width={size} height={size} viewBox="0 0 29 29" className="shrink-0">
          <defs>
            <linearGradient id="edgeBtcGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F9AA4B" />
              <stop offset="100%" stopColor="#F7931A" />
            </linearGradient>
          </defs>
          <circle cx="14.5" cy="14.5" r="14.5" fill="url(#edgeBtcGrad)" />
          <text
            x="14.5"
            y="20"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#FFFFFF"
            fontFamily="Inter Tight, sans-serif"
          >
            ₿
          </text>
        </svg>
      );
    case 'SUI':
      return (
        <svg width={size} height={size} viewBox="0 0 29 29" className="shrink-0">
          <circle cx="14.5" cy="14.5" r="14.5" fill="#4CA3FF" />
          <path
            d="M14.5 6.2c3.3 3.9 5 6.5 5 8.9a5 5 0 1 1-10 0c0-2.4 1.7-5 5-8.9z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'ENA':
      return (
        <svg width={size} height={size} viewBox="0 0 29 29" className="shrink-0">
          <defs>
            <radialGradient id="edgeEnaGrad" cx="0.5" cy="0.15" r="1">
              <stop offset="3%" stopColor="rgba(58,58,58,0.9)" />
              <stop offset="100%" stopColor="rgba(28,28,28,0.9)" />
            </radialGradient>
          </defs>
          <circle cx="14.5" cy="14.5" r="14.5" fill="url(#edgeEnaGrad)" stroke="#111111" />
          <text
            x="14.5"
            y="19.5"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#FFFFFF"
            fontFamily="Inter Tight, sans-serif"
          >
            Σ
          </text>
        </svg>
      );
    case 'ETH':
      return (
        <svg width={size} height={size} viewBox="0 0 29 29" className="shrink-0">
          <path d="M14.5 3.5 L8.6 14.1 L14.5 17.6 L20.4 14.1 Z" fill="#8C8C8C" />
          <path d="M14.5 3.5 L14.5 17.6 L20.4 14.1 Z" fill="#6E6E6E" />
          <path d="M14.5 19.3 L8.6 15.8 L14.5 25.5 L20.4 15.8 Z" fill="#8C8C8C" />
          <path d="M14.5 19.3 L14.5 25.5 L20.4 15.8 Z" fill="#6E6E6E" />
        </svg>
      );
  }
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * EdgeTableMockup — Analytics section visual (Figma "Frame 2147231708").
 *
 * Animation sequence (each step chains off the previous one):
 * 0  "WHERE YOUR EDGE LIVES" types out
 * 1  its subheading fades in
 * 2  table shell (border + header) draws in
 * 3-6 rows appear one by one (BTC → SUI → ENA → ETH)
 * 7  green connector line draws
 * 8  red connector line draws
 * 9  "WHERE YOU GIVE IT BACK" types out
 * 10 its subheading fades in
 */
export default function EdgeTableMockup() {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const parentWidth = containerRef.current?.parentElement?.getBoundingClientRect().width || 570;
      const scaleByWidth = parentWidth < 610 ? Math.max(0.5, (parentWidth - 32) / 570) : 1;
      const maxHeight = window.innerHeight * 0.7;
      const scaleByHeight = maxHeight < 600 ? Math.max(0.5, maxHeight / 600) : 1;
      setScale(Math.min(scaleByWidth, scaleByHeight));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        margin: scale !== 1 ? `0 0 ${-600 * (1 - scale)}px 0` : '0',
      }}
    >
      <RevealSequence
        className="relative shrink-0 overflow-hidden rounded-[24px] border border-white/[0.05] bg-[#0A0B14]"
        style={{ width: 570, height: 600, isolation: 'isolate' }}
      >
        {/* Blue glow (Vector 1) */}
        <div
          className="pointer-events-none absolute bg-[#5D80FF] opacity-[0.28] blur-[150px]"
          style={{
            width: 512.79,
            height: 464.46,
            right: -58.86,
            bottom: -9.26,
            transform: 'rotate(75deg)',
            zIndex: 0,
          }}
        />

        {/* Connector lines (steps 7 & 8) — above the table so end dots sit on the rows */}
        <svg
          className="pointer-events-none absolute inset-0 z-30"
          width="570"
          height="600"
          viewBox="0 0 570 600"
          fill="none"
        >
          {/* Green: from top label, down the left side, then right into the BTC coin icon */}
          <SequenceDot index={7} cx={100} cy={82} fill={SUCCESS} />
          <SequencePath
            index={7}
            d="M 100 82 H 32 Q 22 82 22 92 V 222 Q 22 232 32 232 H 72"
            stroke={SUCCESS}
            duration={0.35}
          />
          <SequenceDot index={7} cx={76} cy={232} fill={SUCCESS} delay={0.3} />
          {/* Red: from beside the ETH coin icon, left + down + right toward the bottom label */}
          <SequenceDot index={8} cx={104} cy={404} fill={DANGER} />
          <SequencePath
            index={8}
            d="M 100 404 H 72 Q 62 404 62 414 V 509 Q 62 519 72 519 H 150"
            stroke={DANGER}
            duration={0.35}
          />
        </svg>

        {/* Top annotation (steps 0–1) */}
        <div
          className="absolute z-20 flex flex-col gap-0.5"
          style={{ left: 108, top: 58, width: 316 }}
        >
          <SequenceTyping
            index={0}
            text="WHERE YOUR EDGE LIVES"
            speed={12}
            className="font-inter-tight text-[16px] leading-[150%] font-medium text-[#22C55E] uppercase"
          />
          <SequenceBlock index={1} duration={0.2}>
            <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white/70">
              High win rate, strong gain vs loss, positive Total PnL.
            </p>
          </SequenceBlock>
        </div>

        {/* Skewed table (steps 2–6) */}
        <SequenceBlock
          index={2}
          duration={0.3}
          y={16}
          scale={0.96}
          className="absolute z-20"
          style={{
            width: 434.83,
            left: 'calc(50% - 434.83px/2 + 15px)',
            top: 'calc(50% - 271.6px/2 - 7.51px)',
          }}
        >
          {/* Only the trade table floats — connectors and labels stay still */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Skew lives on this inner div — framer-motion animates the outer one's transform */}
            <div
              className="flex flex-col overflow-hidden rounded-[7.2px] border-[1.35px] border-white/[0.05] bg-[#0A0B14]/85 backdrop-blur-[2px]"
              style={{ transform: 'matrix(1, -0.04, 0.18, 0.98, 0, 0)' }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between gap-[14.43px] border-b-[1.35px] border-white/[0.05] bg-white/[0.05]"
                style={{ padding: '10.83px 14.43px' }}
              >
                <span className="flex-1 font-inter-tight text-[12.63px] leading-[150%] text-white/70">
                  Symbol/Size
                </span>
                <span className="flex-1 font-inter-tight text-[12.63px] leading-[150%] text-white/70">
                  Long vs Short
                </span>
                <span className="w-[72px] font-inter-tight text-[12.63px] leading-[150%] text-white/70">
                  Win Rate
                </span>
                <span className="w-[72px] font-inter-tight text-[12.63px] leading-[150%] text-white/70">
                  Total PnL
                </span>
              </div>

              {/* Rows — steps 3,4,5,6 */}
              {ROWS.map((row, i) => (
                <SequenceBlock
                  key={row.symbol}
                  index={3 + i}
                  duration={0.15}
                  y={8}
                  className="flex items-center justify-between gap-[14.43px] border-b-[1.35px] border-white/[0.05] p-[14.43px] last:border-b-0"
                  style={{ background: row.rowBg ?? 'rgba(255, 255, 255, 0.01)' }}
                >
                  {/* Symbol */}
                  <div className="flex flex-1 items-center gap-[10.83px]">
                    <CoinIcon symbol={row.symbol} />
                    <span className="font-inter-tight text-[12.63px] leading-[150%] text-white">
                      {row.symbol}
                    </span>
                  </div>

                  {/* Long vs Short */}
                  <div className="flex flex-1 flex-col gap-[3.6px] pr-[14.43px]">
                    <div className="flex w-[116px] items-center justify-between">
                      <span className="font-inter-tight text-[10.83px] leading-[150%] font-medium text-[#22C55E]">
                        {row.longPct}
                      </span>
                      <span className="font-inter-tight text-[10.83px] leading-[150%] font-medium text-[#EF4444]">
                        {row.shortPct}
                      </span>
                    </div>
                    <div className="relative h-[3.6px] w-[116px] overflow-hidden rounded-full bg-[#EF4444]/50">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-[#22C55E]"
                        style={{ width: row.barWidth }}
                      />
                    </div>
                  </div>

                  {/* Win Rate */}
                  <span className="w-[72px] font-inter-tight text-[12.63px] leading-[150%] font-medium text-white">
                    {row.winRate}
                  </span>

                  {/* Total PnL */}
                  <span
                    className="w-[72px] font-inter-tight text-[12.63px] leading-[150%] font-medium"
                    style={{ color: row.pnlPositive ? SUCCESS : DANGER }}
                  >
                    {row.pnl}
                  </span>
                </SequenceBlock>
              ))}
            </div>
          </motion.div>
        </SequenceBlock>

        {/* Bottom annotation (steps 9–10) */}
        <div
          className="absolute z-20 flex flex-col gap-0.5"
          style={{ left: 160, top: 495, width: 370 }}
        >
          <SequenceTyping
            index={9}
            text="WHERE YOU GIVE IT BACK"
            speed={12}
            className="font-inter-tight text-[16px] leading-[150%] font-medium text-[#EF4444] uppercase"
          />
          <SequenceBlock index={10} duration={0.2} advanceOnComplete={false}>
            <p className="font-inter-tight text-[14px] leading-[150%] font-normal text-white/70">
              Weaker win rate, higher loss vs gain, negative or low Total Pnl.
            </p>
          </SequenceBlock>
        </div>
      </RevealSequence>
    </div>
  );
}
