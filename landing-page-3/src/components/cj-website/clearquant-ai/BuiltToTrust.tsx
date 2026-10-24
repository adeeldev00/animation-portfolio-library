import Image from 'next/image';
import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';
import { NoPredictAnimation } from './NoPredictAnimation';
import { DeterministicAnimation } from './DeterministicAnimation';
import { SaysLessAnimation } from './SaysLessAnimation';

const CARDS: {
  img: string | null;
  Illustration?: () => React.JSX.Element;
  title: string;
  body: string;
}[] = [
  {
    img: null,
    Illustration: DeterministicAnimation,
    title: 'Deterministic',
    body: 'Run the same report twice on the same data and you get identical numbers. No drift, no "creative" re-interpretation. Trust over time.',
  },
  {
    img: '/clearquantAi-trust-card2.png',
    title: 'Verified data only',
    body: 'It reads your real exchange history and never invents a number. If something can\'t be computed, it simply says "Insufficient data."',
  },
  {
    img: null,
    Illustration: NoPredictAnimation,
    title: 'It will not predict',
    body: 'No signals, no entries, no exits, no market calls. ClearQuant analyzes the trader, not the market — by design, not limitation.',
  },
  {
    img: null,
    Illustration: SaysLessAnimation,
    title: 'Says less on purpose',
    body: 'It knows more than it shows — surfacing only the top few highest-impact findings, then stopping. No wall of insight.',
  },
];

export default function BuiltToTrust() {
  return (
    <section className="relative section-shell overflow-hidden section-pad">
      <div className="flex flex-col items-center gap-[60px]">
        {/* Header — Figma Frame 2147231451: max-w 507px, gap 16px, centered */}
        <DirectionalReveal variants={landingSlideUp}>
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Badge */}
            <div className="inline-flex items-center rounded-[8px] border-[1.5px] border-white/5 bg-linear-to-b from-white/[0.02] to-white/10 px-2 py-1 font-inter-tight text-[12px] text-white/70">
              Why you can trust it
            </div>

            {/* Heading — 48px, weight 400, line-height 100% */}
            <h2 className="max-w-[507px] font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
              Built to be trusted,
              <br />
              not just smart.
            </h2>

            {/* Body — 18px, line-height 150%, white/70 */}
            <p className="max-w-[507px] font-inter-tight text-[15px] leading-[150%] text-white/70 sm:text-[18px]">
              Most &ldquo;AI&rdquo; tools are confidently wrong. ClearQuant is the opposite —
              bounded, deterministic, and grounded in data you can verify.
            </p>
          </div>
        </DirectionalReveal>

        {/* 2×2 Card grid — Figma Frame 2147231516: gap 24px */}
        <div className="relative w-full">
          {/* Figma Vector 1 — blue glow centred on the cards' top edge, so it
              washes up behind the header copy and is masked by the cards below. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-[22%] h-[260px] w-[335px] -translate-y-1/2 rounded-full bg-glow-blue opacity-25 blur-[100px]"
          />

          <div className="relative z-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {CARDS.map(({ img, Illustration, title, body }) => (
              <DirectionalReveal key={title} variants={landingSlideUp}>
                <div className="flex h-full flex-col gap-4 rounded-[24px] border border-white/[0.05] bg-dark-card p-8">
                  {/* Illustration — Figma: h-256px, rounded-[16px] */}
                  <div className="relative h-[256px] w-full overflow-hidden rounded-[16px] bg-[#080912]">
                    {Illustration && <Illustration />}
                    {img && (
                      <Image
                        src={img}
                        alt={title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 608px"
                      />
                    )}
                  </div>

                  {/* Text — Figma Frame 2147231515: gap 8px */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-inter-tight text-[24px] leading-[150%] font-medium text-white">
                      {title}
                    </h3>
                    <p className="font-inter-tight text-[16px] leading-[150%] text-white/70">
                      {body}
                    </p>
                  </div>
                </div>
              </DirectionalReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
