'use client';

import WebsiteImage from '@/components/cj-website/WebsiteImage';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { fadeInUp } from '@/lib/animations';

export default function JournalProfitCaptureSection() {
  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        <DirectionalReveal
          variants={fadeInUp}
          className="flex max-w-[660px] flex-col items-center gap-4 text-center"
        >
          <span
            className="inline-flex items-center rounded-[8px] border border-white/[0.05] px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
            }}
          >
            Profit capture
          </span>

          <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
            Did you catch the move or just survive it?
          </h2>

          <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            ClearJournal scores how much of each trade&apos;s available move you actually captured.
            It&apos;s the gap between a journal that records your P&amp;L and one that shows you the
            profit you keep leaving on the table.
          </p>
        </DirectionalReveal>

        <DirectionalReveal variants={fadeInUp} className="w-full max-w-[612px]">
          <WebsiteImage
            folder="journal"
            src="profile-capture-panel.svg"
            alt="Profit capture efficiency panel with average run, drawdown and capture score"
            width={612}
            height={547}
            className="w-full"
          />
        </DirectionalReveal>
      </div>
    </section>
  );
}
