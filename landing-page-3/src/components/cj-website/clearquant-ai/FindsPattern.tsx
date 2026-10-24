import DirectionalReveal from '@/components/ui/DirectionalReveal';
import { landingSlideUp } from '@/lib/animations';
import { card, CardDots } from '@/components/cj-website/stats-band';
import {
  Activity01Icon,
  Dna01Icon,
  HierarchySquare02Icon,
  JusticeScale01Icon,
  Radar02Icon,
  UndoIcon,
} from 'hugeicons-react';

const FEATURES = [
  {
    icon: <Dna01Icon size={16} className="text-white opacity-90" />,
    title: 'Quant DNA',
    body: 'A behavioral fingerprint of how you actually trade — your risk habits, hold times, symbol bias, and execution tendencies, quantified.',
  },
  {
    icon: <Radar02Icon size={16} className="text-white opacity-90" />,
    title: 'Drift detection',
    body: "It learns your most profitable baseline, then catches the exact moment you drift off it — whether it's risk drift or execution drift.",
  },
  {
    icon: <JusticeScale01Icon size={16} className="text-white opacity-90" />,
    title: 'Decision quality vs outcome',
    body: "Separates skill from luck. A green trade isn't always a good decision — ClearQuant tells you which of your wins you actually earned.",
  },
  {
    icon: <UndoIcon size={16} className="text-white opacity-90" />,
    title: 'Counterfactual simulations',
    body: "'If you'd capped your average loss at baseline, your expectancy would be +0.19R.' Exact, deterministic numbers — never estimates.",
  },
  {
    icon: <HierarchySquare02Icon size={16} className="text-white opacity-90" />,
    title: 'Ranked drivers of change',
    body: "When your performance moves, it attributes the shift to specific causes ranked by impact — not vague commentary about 'discipline'.",
  },
  {
    icon: <Activity01Icon size={16} className="text-white opacity-90" />,
    title: 'ClearQuant Index',
    body: 'A single trend line for whether your trading is improving or deteriorating — tracked report over report, so you can see the direction.',
  },
];

export default function FindsPattern() {
  return (
    <section className="relative section-shell section-pad">
      {/* Background glow — straddles the seam between the header copy and the card grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[450px] right-[22%] -translate-y-[65%] rotate-[75deg] rounded-full bg-glow-blue opacity-30 blur-[100px]"
        style={{ width: 335, height: 304 }}
      />

      <DirectionalReveal
        variants={landingSlideUp}
        className="relative z-10 mx-auto mb-12 flex max-w-[704px] flex-col items-center gap-4 text-center"
      >
        <span
          className="inline-flex items-center rounded-[8px] border border-white/[0.05] px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
          }}
        >
          Under the hood
        </span>
        <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
          It finds the pattern
          <br />
          before you do.
        </h2>
        <p className="max-w-[540px] font-inter-tight text-[16px] leading-[150%] font-normal text-white/70 sm:text-[18px]">
          ClearQuant isn&apos;t a wrapper around a chatbot. It&apos;s a deterministic analytics
          engine that knows your history cold. Six things a generic AI will never do with your
          trades:
        </p>
      </DirectionalReveal>

      <DirectionalReveal
        variants={landingSlideUp}
        className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((f) => (
          <div key={f.title} className={card}>
            <CardDots />
            {/* Blue icon circle */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(93, 128, 255, 0.2)' }}
            >
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#5D80FF]">
                {f.icon}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-inter-tight text-[16px] leading-[150%] font-medium text-white">
                {f.title}
              </p>
              <p className="font-inter-tight text-[12px] leading-[150%] font-normal text-white/70">
                {f.body}
              </p>
            </div>
          </div>
        ))}
      </DirectionalReveal>
    </section>
  );
}
