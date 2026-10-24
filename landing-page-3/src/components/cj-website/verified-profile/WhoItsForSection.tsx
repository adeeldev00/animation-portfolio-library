'use client';

import { SecurityCheckIcon, RankingIcon, UserGroupIcon } from 'hugeicons-react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp, landingSlideUpDelay } from '@/lib/animations';
import { SectionBadge } from './shared';

const CARDS = [
  {
    icon: SecurityCheckIcon,
    title: 'Traders tired of being doubted',
    text: 'Post a green week and half the replies call it fake. A verified profile ends the argument in one link - the numbers came from the exchange, not from you.',
  },
  {
    icon: RankingIcon,
    title: 'Competitive traders',
    text: "Climb a leaderboard ranked on verified P&L, not follower count. If you're actually good, this is where you prove it against everyone else.",
  },
  {
    icon: UserGroupIcon,
    title: 'Audience builders',
    text: 'Grow a following on proof, not hype. Put your verified profile in your bio and let the record do the talking.',
  },
];

export default function WhoItsForSection() {
  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        <DirectionalReveal
          variants={landingSlideUp}
          className="flex max-w-[660px] flex-col items-center gap-4 text-center"
        >
          <SectionBadge label="Who it's for" />

          <h2 className="font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[48px]">
            Built for traders who
            <br />
            need to be believed.
          </h2>

          <p className="max-w-[520px] font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            When &quot;trust me&quot; isn&apos;t enough, a verified record is the difference between
            a claim and proof.
          </p>
        </DirectionalReveal>

        <DirectionalReveal
          variants={landingSlideUpDelay}
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
        >
          {CARDS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col gap-8 rounded-[24px] p-7"
              style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.05)' }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-[12px]"
                style={{
                  background: 'rgba(93,128,255,0.08)',
                  border: '1px solid rgba(93,128,255,0.15)',
                }}
              >
                <Icon size={24} className="text-[#5D80FF]" />
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="font-inter-tight text-[22px] font-medium text-white sm:text-[24px]">
                  {title}
                </h3>
                <p className="font-inter-tight text-[15px] leading-[160%] font-normal text-white/50 sm:text-[16px]">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </DirectionalReveal>
      </div>
    </section>
  );
}
