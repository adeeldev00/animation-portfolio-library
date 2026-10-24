import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { calculateDiscountedPrice, type PlanDiscount } from '@/lib/discount-utils';

function TickCircle() {
  const color = 'rgba(255,255,255,0.8)';
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="mt-[2px] shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1" />
      <path
        d="M6.5 10L9 12.5L13.5 7.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PricingPlanCardProps {
  planName: string;
  description: string;
  price: number;
  billing: 'monthly' | 'annual';
  monthlyPrice?: number | null;
  annualPrice?: number | null;
  features: { text: string }[];
  highlighted?: boolean;
  isLoading?: boolean;
  ctaLabel?: string;
  onCtaClick: () => void;
  discount?: PlanDiscount | null;
}

export default function PricingPlanCard({
  planName,
  description,
  price,
  billing,
  monthlyPrice = null,
  annualPrice = null,
  features,
  highlighted = false,
  isLoading = false,
  ctaLabel = 'Start Free Trial',
  onCtaClick,
  discount = null,
}: PricingPlanCardProps) {
  const tierBorder = highlighted ? 'rgba(93,128,255,0.2)' : 'rgba(255,255,255,0.2)';
  const tierColor = highlighted ? '#5D80FF' : '#FFFFFF';
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
  const displayPrice = fmt(price);

  // On yearly billing, lead with the discounted per-month price (annual / 12) and
  // strike through the regular monthly price, while keeping the full annual total
  // visible for transparency.
  const showYearlyDiscount =
    billing === 'annual' &&
    monthlyPrice != null &&
    annualPrice != null &&
    annualPrice < monthlyPrice * 12;
  const discountedAnnual =
    annualPrice != null && discount
      ? calculateDiscountedPrice(annualPrice, discount.discount_amount)
      : annualPrice;
  const effectiveMonthly = discountedAnnual != null ? discountedAnnual / 12 : price;
  const discountedPrice = discount
    ? calculateDiscountedPrice(price, discount.discount_amount)
    : price;

  return (
    <div
      className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[32px] p-6"
      style={{
        background: '#0A0B14',
        border: highlighted
          ? '1.5px solid rgba(93,128,255,0.2)'
          : '1.5px solid rgba(255,255,255,0.05)',
        isolation: 'isolate',
      }}
    >
      {highlighted && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] rounded-[32px]"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(180deg, rgba(93,128,255,0.7) 0%, rgba(93,128,255,0) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full opacity-45 blur-[100px]"
        style={{
          width: 320,
          height: 305,
          background: '#5D80FF',
          right: -30,
          top: 78,
          transform: 'rotate(75deg)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex flex-col gap-12">
        <span
          className="inline-flex h-[50px] w-fit min-w-[128px] items-center justify-center self-start rounded-[40px] px-2.5 font-inter-tight text-[16px] leading-none font-medium"
          style={{ border: `1px solid ${tierBorder}`, color: tierColor }}
        >
          {planName}
        </span>

        <p className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/80">
          {description}
        </p>

        {discount && (
          <span
            className="-mb-10 inline-flex w-fit items-center rounded-full px-3 py-1 font-inter-tight text-[13px] font-medium text-white"
            style={{ background: 'rgba(93,128,255,0.25)' }}
          >
            {fmt(discount.discount_percentage)}% off
          </span>
        )}

        {showYearlyDiscount ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2.5">
              <span className="font-inter-tight text-[56px] leading-none font-medium text-white">
                ${fmt(effectiveMonthly)}
              </span>
              <span className="font-inter-tight text-[18px] font-normal text-white/50">/month</span>
              <span className="font-inter-tight text-[20px] font-normal text-white/40 line-through">
                ${fmt(monthlyPrice as number)}
              </span>
            </div>
            <span className="font-inter-tight text-[14px] font-normal text-white/50">
              Billed annually at{' '}
              {discount && (
                <span className="text-white/40 line-through">${fmt(annualPrice as number)}</span>
              )}{' '}
              <span className="text-glow-blue">${fmt(discountedAnnual as number)}/year</span>
            </span>
          </div>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="font-inter-tight text-[56px] leading-none font-medium text-white">
              ${discount ? fmt(discountedPrice) : displayPrice}
            </span>
            <span className="font-inter-tight text-[18px] font-normal text-white/50">
              /{billing === 'monthly' ? 'month' : 'year'}
            </span>
            {discount && (
              <span className="font-inter-tight text-[20px] font-normal text-white/40 line-through">
                ${displayPrice}
              </span>
            )}
          </div>
        )}

        <ul className="flex flex-col gap-4">
          {features.map((f) => (
            <li key={f.text} className="flex items-start gap-3">
              <TickCircle />
              <span className="font-inter-tight text-[16px] leading-[150%] font-normal text-white/80">
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-0">
        <div
          className="mb-8 h-px w-full opacity-30"
          style={{ background: 'rgba(255,255,255,0.3)' }}
        />

        <button
          type="button"
          onClick={onCtaClick}
          disabled={isLoading}
          className={[
            'font-inter-tight group flex items-center justify-between rounded-[16px] py-[4px] pl-4 pr-[4px] transition-shadow disabled:cursor-not-allowed disabled:opacity-70',
            highlighted
              ? 'shadow-[0px_3px_6px_rgba(93,128,255,0.2),0px_11px_11px_rgba(93,128,255,0.17),0px_25px_15px_rgba(93,128,255,0.1)] hover:shadow-[0px_6px_10px_rgba(93,128,255,0.28),0px_15px_18px_rgba(93,128,255,0.22),0px_30px_22px_rgba(93,128,255,0.14)]'
              : 'hover:brightness-110',
          ].join(' ')}
          style={{ background: highlighted ? '#5D80FF' : 'rgba(255,255,255,0.10)' }}
        >
          <span className="flex-1 text-center text-[16px] font-medium text-white">
            {isLoading ? 'Processing...' : ctaLabel}
          </span>
          <span
            className="flex h-14 w-14 items-center justify-center rounded-[12px]"
            style={{ background: highlighted ? '#FFFFFF' : 'rgba(255,255,255,0.05)' }}
          >
            {isLoading ? (
              <LoaderCircle
                size={20}
                className={`animate-spin ${highlighted ? 'text-glow-blue' : 'text-white'}`}
              />
            ) : (
              <ArrowUpRight
                size={24}
                strokeWidth={2.25}
                className={`transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  highlighted ? 'text-glow-blue' : 'text-white'
                }`}
              />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
