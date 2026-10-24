import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp, landingSlideUpDelay } from '@/lib/animations';
import { card, CardDots } from '@/components/cj-website/stats-band';
import { SectionBadge } from './shared';

function XMarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5L15 15M5 15L15 5" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CheckMarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10.5L8.5 15L16 6"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CARDS = [
  {
    icon: <XMarkIcon />,
    title: 'A screenshot',
    text: 'Croppable. Editable. Could be a demo account, a lucky day, or pure Photoshop. Impossible for anyone to verify - so it proves nothing.',
  },
  {
    icon: <CheckMarkIcon />,
    title: 'A ClearJournal profile',
    text: 'Pulled live from your exchange over a read-only key. Real leverage, open positions, full history stamped "Verified on CJ" and checkable by anyone. It can\'t be edited, because you never typed it in.',
  },
];

export default function ProblemSection() {
  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        <DirectionalReveal
          variants={landingSlideUp}
          className="flex max-w-[760px] flex-col items-center gap-4 text-center"
        >
          <SectionBadge label="The problem" />

          <h2 className="font-inter-tight text-[36px] leading-[110%] font-normal text-white sm:text-[48px]">
            In crypto, everyone&apos;s up
            <br />
            400% on Twitter.
          </h2>

          <p className="max-w-[720px] font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
            Cropped screenshots, demo accounts passed off as real, PnL cards anyone can edit in
            seconds. The whole game runs on proof nobody can check - so nobody believes anybody.
            ClearJournal replaces it with proof nobody can fake.
          </p>
        </DirectionalReveal>

        <DirectionalReveal
          variants={landingSlideUpDelay}
          className="grid w-full max-w-[1140px] grid-cols-1 gap-6 md:grid-cols-2"
        >
          {CARDS.map((item) => (
            <div key={item.title} className={card} style={{ padding: '32px', gap: '40px' }}>
              <CardDots />

              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#5D80FF]/20">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5D80FF]">
                  {item.icon}
                </span>
              </span>

              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="font-inter-tight text-[24px] font-medium text-white sm:text-[28px]">
                  {item.title}
                </h3>
                <p className="font-inter-tight text-[16px] leading-[160%] font-normal text-white/50 sm:text-[18px]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </DirectionalReveal>
      </div>
    </section>
  );
}
