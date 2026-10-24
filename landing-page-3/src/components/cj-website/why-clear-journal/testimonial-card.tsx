import { Star, UserRound } from 'lucide-react';

export function TestimonialCard() {
  return (
    <div className="relative h-full overflow-hidden rounded-[24px] bg-brand-gradient text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1.5px)',
          backgroundSize: '9.29px 9.29px',
          maskImage: 'radial-gradient(circle at 70% 67%, black 0%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 67%, black 0%, transparent 60%)',
        }}
      />

      {/* Content - with relative positioning to appear above background */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="px-8 py-8">
          <p className="mb-8 font-inter-tight text-[22px] leading-[150%] font-normal sm:text-[26px]">
            "I stopped second-guessing my trades once I saw the numbers clearly. My win rate
            improved by 30%."
          </p>
        </div>

        <div className="relative flex gap-2 overflow-hidden px-10 py-7">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
            <UserRound size={30} strokeWidth={1.5} className="shrink-0 text-white" />
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-1.5" role="img" aria-label="Rated 5 out of 5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="shrink-0 fill-rating-star text-rating-star" />
              ))}
            </div>
            <p className="font-inter-tight text-[14px] leading-[150%] font-normal sm:text-[16px]">
              Verified Beta Tester
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
