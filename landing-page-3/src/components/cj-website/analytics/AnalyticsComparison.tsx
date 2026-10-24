import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { fadeInLeft, fadeInRight, fadeInUp } from '@/lib/animations';

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12L10 17L19 7"
        stroke="#22C55E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-30">
      <path d="M6 6L18 18M6 18L18 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type Cell = { type: 'check' } | { type: 'cross' } | { type: 'text'; value: string };

type Row = {
  feature: string;
  spreadsheet: Cell;
  generic: Cell;
  clearjournal: Cell;
};

const ROWS: Row[] = [
  {
    feature: 'Auto-sliced by symbol, session & setup',
    spreadsheet: { type: 'text', value: 'Manual' },
    generic: { type: 'text', value: 'Basic' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Day-of-week & hour-of-day breakdowns',
    spreadsheet: { type: 'cross' },
    generic: { type: 'text', value: 'Basic' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Calendar P&L (month / year / day)',
    spreadsheet: { type: 'cross' },
    generic: { type: 'text', value: 'Sometimes' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Funding & fee accounting',
    spreadsheet: { type: 'text', value: 'Manual' },
    generic: { type: 'text', value: 'Basic' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Limit vs market order analysis',
    spreadsheet: { type: 'cross' },
    generic: { type: 'text', value: 'Basic' },
    clearjournal: { type: 'check' },
  },
  {
    feature: 'Plain-language "why" from an AI',
    spreadsheet: { type: 'cross' },
    generic: { type: 'cross' },
    clearjournal: { type: 'check' },
  },
];

function RenderCell({ cell }: { cell: Cell }) {
  if (cell.type === 'check') return <CheckIcon />;
  if (cell.type === 'cross') return <CrossIcon />;
  return (
    <span className="font-inter-tight text-[16px] font-normal text-white opacity-30">
      {cell.value}
    </span>
  );
}

export default function AnalyticsComparison() {
  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        {/* Header */}
        <DirectionalReveal
          variants={fadeInLeft}
          className="flex max-w-[660px] flex-col items-center gap-4 text-center"
        >
          <span
            className="inline-flex items-center rounded-[8px] border border-white/[0.05] px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
            }}
          >
            Why Clear Journal?
          </span>

          <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
            Know what happened. Change what happens next.
          </h2>

          <p className="max-w-[600px] font-inter-tight text-[15px] leading-[150%] text-white/70 sm:text-[18px]">
            Compare spreadsheets, generic journals, and ClearJournal side by side to see how raw
            trade data becomes clear, actionable insights that improve your next decision.
          </p>
        </DirectionalReveal>

        {/* Table — scrollable on mobile */}
        <DirectionalReveal variants={fadeInRight} className="w-full overflow-x-auto">
          <div
            className="min-w-[640px] overflow-hidden rounded-[16px]"
            style={{ border: '1.5px solid rgba(255,255,255,0.05)' }}
          >
            {/* Header row */}
            <div className="flex">
              <div
                className="flex w-[41%] shrink-0 items-center px-4 py-4"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderBottom: '1.5px solid rgba(255,255,255,0.1)',
                }}
              />
              <div
                className="flex flex-1 items-center justify-center px-4 py-4"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderBottom: '1.5px solid rgba(255,255,255,0.1)',
                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span className="font-inter-tight text-[14px] font-medium text-white sm:text-[16px]">
                  Spreadsheet
                </span>
              </div>
              <div
                className="flex flex-1 items-center justify-center px-4 py-4"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderBottom: '1.5px solid rgba(255,255,255,0.1)',
                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span className="font-inter-tight text-[14px] font-medium text-white sm:text-[16px]">
                  Generic Journal
                </span>
              </div>
              <div
                className="flex flex-1 items-center justify-center px-4 py-4"
                style={{
                  background: '#5D80FF',
                  borderBottom: '1.5px solid rgba(255,255,255,0.1)',
                  borderLeft: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span className="font-inter-tight text-[14px] font-medium text-white sm:text-[16px]">
                  ClearJournal
                </span>
              </div>
            </div>

            {/* Data rows */}
            {ROWS.map((row, i) => {
              const isLast = i === ROWS.length - 1;
              const rowBorder = isLast ? undefined : '1.5px solid rgba(255,255,255,0.05)';

              return (
                <div key={row.feature} className="flex">
                  <div
                    className="flex w-[41%] shrink-0 items-center px-4 py-[22px]"
                    style={{ borderBottom: rowBorder }}
                  >
                    <span className="font-inter-tight text-[13px] leading-[150%] font-medium text-white sm:text-[16px]">
                      {row.feature}
                    </span>
                  </div>
                  <div
                    className="flex flex-1 items-center justify-center px-4 py-[22px]"
                    style={{
                      borderBottom: rowBorder,
                      borderLeft: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <RenderCell cell={row.spreadsheet} />
                  </div>
                  <div
                    className="flex flex-1 items-center justify-center px-4 py-[22px]"
                    style={{
                      borderBottom: rowBorder,
                      borderLeft: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <RenderCell cell={row.generic} />
                  </div>
                  <div
                    className="flex flex-1 items-center justify-center px-4 py-[22px]"
                    style={{
                      background: 'rgba(93,128,255,0.10)',
                      borderBottom: rowBorder,
                      borderLeft: '1px solid rgba(93,128,255,0.15)',
                    }}
                  >
                    <RenderCell cell={row.clearjournal} />
                  </div>
                </div>
              );
            })}
          </div>
        </DirectionalReveal>

        {/* CTA */}
        <DirectionalReveal variants={fadeInUp}>
          <Link
            href="/register"
            className="group relative flex h-11 items-center gap-3 rounded-[12px] bg-[#5D80FF] py-[2px] pr-[2px] pl-4 font-inter-tight text-[16px] font-medium text-white shadow-[0px_3px_6px_rgba(93,128,255,0.2),0px_11px_11px_rgba(93,128,255,0.17),0px_25px_15px_rgba(93,128,255,0.1)] transition-shadow hover:shadow-[0px_6px_10px_rgba(93,128,255,0.28),0px_15px_18px_rgba(93,128,255,0.22),0px_30px_22px_rgba(93,128,255,0.14)]"
          >
            <span>Try It Today</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
              <ArrowUpRight
                size={22}
                strokeWidth={2.25}
                className="text-[#5D80FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </DirectionalReveal>
      </div>
    </section>
  );
}
