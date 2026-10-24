'use client';

import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { fadeInLeft, fadeInRight } from '@/lib/animations';

// ─── Icons ───────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function DashIcon() {
  return <span className="font-inter-tight text-[16px] text-white/30">—</span>;
}

// ─── Data ────────────────────────────────────────────────────────────────────

type Cell = { type: 'check' } | { type: 'dash' } | { type: 'text'; value: string };

interface Row {
  feature: string;
  essential: Cell;
  pro: Cell;
  advanced: Cell;
}

const check: Cell = { type: 'check' };
const dash: Cell = { type: 'dash' };
const text = (value: string): Cell => ({ type: 'text', value });

const ROWS: Row[] = [
  {
    feature: 'Connected accounts',
    essential: text('1 account'),
    pro: text('1 account per exchange'),
    advanced: text('5 accounts per exchange'),
  },
  { feature: 'Dashboard', essential: check, pro: check, advanced: check },
  {
    feature: 'Trade journal - notes, tags & trade tracking',
    essential: check,
    pro: check,
    advanced: check,
  },
  {
    feature: 'Core analytics - win rate, P&L, profit factor, R:R',
    essential: check,
    pro: check,
    advanced: check,
  },
  {
    feature: 'Advanced analytics - symbol & tag reports, limit-vs-market, fees & funding',
    essential: dash,
    pro: check,
    advanced: check,
  },
  { feature: 'Calendar view', essential: dash, pro: check, advanced: check },
  {
    feature: 'Reporting & export',
    essential: text('Overview only'),
    pro: text('Full + PDF/CSV'),
    advanced: text('Full + PDF/CSV'),
  },
  {
    feature: 'ClearQuant AI',
    essential: dash,
    pro: text('Included (capped)*'),
    advanced: text('Higher usage*'),
  },
  {
    feature: 'Public journal + verified profile',
    essential: check,
    pro: check,
    advanced: check,
  },
  {
    feature: 'Multi-account & cross-account analytics',
    essential: dash,
    pro: dash,
    advanced: check,
  },
  { feature: 'Encrypted storage & 2FA', essential: check, pro: check, advanced: check },
  {
    feature: 'Support',
    essential: text('Email'),
    pro: text('Priority'),
    advanced: text('Priority'),
  },
];

// ─── Cell renderer ───────────────────────────────────────────────────────────

function RenderCell({ cell }: { cell: Cell }) {
  if (cell.type === 'check') return <CheckIcon />;
  if (cell.type === 'dash') return <DashIcon />;

  const noteIndex = cell.value.indexOf('(');
  const mainPart = noteIndex !== -1 ? cell.value.slice(0, noteIndex) : cell.value;
  const notePart = noteIndex !== -1 ? cell.value.slice(noteIndex) : '';

  return (
    <span className="text-center font-inter-tight text-[16px] leading-[150%] font-normal text-white">
      {mainPart}
      {notePart && <span className="text-white/30">{notePart}</span>}
    </span>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ComparePlansSection() {
  return (
    <section className="relative section-shell section-pad">
      <div className="relative z-10 flex flex-col items-center gap-[60px]">
        <DirectionalReveal
          variants={fadeInLeft}
          className="flex max-w-[600px] flex-col items-center gap-4 text-center"
        >
          <span className="inline-flex items-center rounded-[8px] border border-white/5 bg-linear-to-b from-white/[0.02] to-white/10 px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70">
            Comparison
          </span>

          <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
            Compare Plans
          </h2>

          <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            Every feature, side by side - choose what matches your trading.
          </p>
        </DirectionalReveal>

        <div className="flex w-full flex-col items-center gap-6">
          <DirectionalReveal variants={fadeInRight} className="w-full overflow-x-auto">
            <div className="min-w-[720px] overflow-hidden rounded-[16px] border-[1.5px] border-white/5">
              {/* Header row */}
              <div className="flex items-stretch border-b-[1.5px] border-white/10 bg-dark-band">
                <div className="flex w-[40%] shrink-0 items-center px-6 py-4">
                  <span className="font-inter-tight text-[16px] font-medium text-white sm:text-[20px]">
                    Feature
                  </span>
                </div>
                {(['Essential', 'Pro', 'Advanced'] as const).map((label) => (
                  <div
                    key={label}
                    className={`flex flex-1 items-center justify-center p-4 ${
                      label === 'Pro' ? 'bg-glow-blue' : ''
                    }`}
                  >
                    <span className="font-inter-tight text-[16px] font-medium text-white sm:text-[20px]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feature rows */}
              {ROWS.map((row) => (
                <div
                  key={row.feature}
                  className="flex items-stretch border-b-[1.5px] border-white/5 last:border-b-0"
                >
                  <div className="flex w-[40%] shrink-0 items-center px-6 py-6">
                    <span className="font-inter-tight text-[16px] leading-[150%] font-normal text-white">
                      {row.feature}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center justify-center px-4 py-6">
                    <RenderCell cell={row.essential} />
                  </div>
                  <div className="flex flex-1 items-center justify-center bg-glow-blue/10 px-4 py-6">
                    <RenderCell cell={row.pro} />
                  </div>
                  <div className="flex flex-1 items-center justify-center px-4 py-6">
                    <RenderCell cell={row.advanced} />
                  </div>
                </div>
              ))}
            </div>
          </DirectionalReveal>

          <p className="max-w-[980px] text-center font-inter-tight text-[14px] leading-[150%] font-normal text-white/50">
            ClearQuant AI usage limits are generous and still being finalized - Pro includes a full
            monthly allowance; Advanced a higher one.
          </p>
        </div>
      </div>
    </section>
  );
}
