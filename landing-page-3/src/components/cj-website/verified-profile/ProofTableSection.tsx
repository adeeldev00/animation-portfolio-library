import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { fadeInLeft, fadeInRight } from '@/lib/animations';
import { SectionBadge } from './shared';

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

const ROWS = [
  'Pulled live from the exchange',
  'Impossible to edit or crop',
  'Shows real leverage & open positions',
  'Full history, not one lucky green day',
  'Verifiable by anyone, anytime',
];

export default function ProofTableSection() {
  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        <DirectionalReveal
          variants={fadeInLeft}
          className="flex max-w-[720px] flex-col items-center gap-4 text-center"
        >
          <SectionBadge label="Why Clear Journal?" />

          <h2 className="font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[48px]">
            The end of &quot;trust me, bro.&quot;
          </h2>

          <p className="max-w-[640px] font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            Anyone can post a winning screenshot. ClearJournal proves your performance with
            complete, verified, and uneditable data pulled directly from your exchange.
          </p>
        </DirectionalReveal>

        <DirectionalReveal variants={fadeInRight} className="w-full overflow-x-auto">
          <div className="relative min-w-[560px]">
            {/* Base table — feature labels + "A screenshot" column */}
            <div
              className="overflow-hidden rounded-[16px]"
              style={{ border: '1.5px solid rgba(255,255,255,0.05)' }}
            >
              {/* Header row */}
              <div className="flex h-14">
                <div
                  className="flex w-[47%] shrink-0 items-center px-6"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1.5px solid rgba(255,255,255,0.1)',
                  }}
                />
                <div
                  className="flex flex-1 items-center justify-center px-4"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1.5px solid rgba(255,255,255,0.1)',
                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span className="font-inter-tight text-[14px] font-medium text-white sm:text-[16px]">
                    A screenshot
                  </span>
                </div>
                {/* Spacer under the floating column */}
                <div className="w-[26.5%] shrink-0" />
              </div>

              {/* Data rows */}
              {ROWS.map((feature, i) => {
                const isLast = i === ROWS.length - 1;
                const rowBorder = isLast ? undefined : '1.5px solid rgba(255,255,255,0.05)';

                return (
                  <div key={feature} className="flex h-[68px]">
                    <div
                      className="flex w-[47%] shrink-0 items-center px-6"
                      style={{ borderBottom: rowBorder }}
                    >
                      <span className="font-inter-tight text-[13px] leading-[150%] font-medium text-white sm:text-[16px]">
                        {feature}
                      </span>
                    </div>
                    <div
                      className="flex flex-1 items-center justify-center px-4"
                      style={{
                        borderBottom: rowBorder,
                        borderLeft: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <CrossIcon />
                    </div>
                    <div className="w-[26.5%] shrink-0" />
                  </div>
                );
              })}
            </div>

            {/* ClearJournal column — floating rounded card overhanging the table */}
            <div
              className="absolute inset-y-0 right-0 flex w-[26.5%] flex-col overflow-hidden rounded-r-[16px]"
              style={{
                background: '#12152A',
                boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
              }}
            >
              <div
                className="flex h-14 items-center justify-center rounded-tr-[16px] px-4"
                style={{ background: '#5D80FF' }}
              >
                <span className="font-inter-tight text-[14px] font-medium text-white sm:text-[16px]">
                  ClearJournal
                </span>
              </div>

              {ROWS.map((feature, i) => (
                <div
                  key={feature}
                  className="flex h-[68px] items-center justify-center px-4"
                  style={{
                    borderBottom:
                      i === ROWS.length - 1 ? undefined : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <CheckIcon />
                </div>
              ))}
            </div>
          </div>
        </DirectionalReveal>
      </div>
    </section>
  );
}
