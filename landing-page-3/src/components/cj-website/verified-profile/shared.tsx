import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives for the Verified Profile (Public Journal) marketing page
// ─────────────────────────────────────────────────────────────────────────────

export function SectionBadge({ label, dot = false }: { label: string; dot?: boolean }) {
  return (
    <span
      className="font-inter-tight inline-flex w-fit items-center gap-1 rounded-[8px] border border-white/[0.05] px-2 py-1 text-[12px] font-normal text-white/70"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
      }}
    >
      {dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-glow-blue" />}
      {label}
    </span>
  );
}

export function PrimaryCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="font-inter-tight group relative flex h-11 w-fit items-center gap-3 rounded-[12px] bg-[#5D80FF] py-[2px] pl-4 pr-[2px] text-[16px] font-medium text-white shadow-[0px_3px_6px_rgba(93,128,255,0.2),0px_11px_11px_rgba(93,128,255,0.17),0px_25px_15px_rgba(93,128,255,0.1)] transition-shadow hover:shadow-[0px_6px_10px_rgba(93,128,255,0.28),0px_15px_18px_rgba(93,128,255,0.22),0px_30px_22px_rgba(93,128,255,0.14)]"
    >
      <span>{label}</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
        <ArrowUpRight
          size={22}
          strokeWidth={2.25}
          className="text-[#5D80FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}

export function GreenCheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="mt-[2px] shrink-0"
    >
      <circle cx="10" cy="10" r="8" stroke="#22C55E" strokeWidth="1.25" />
      <path
        d="M6.75 10L9 12.25L13.25 7.75"
        stroke="#22C55E"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckList({ items }: { items: { label: string; text: string }[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, i) => (
        <li
          key={item.label}
          className="flex items-start gap-3 py-4"
          style={{
            borderBottom: i === items.length - 1 ? undefined : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <GreenCheckIcon />
          <p className="font-inter-tight text-[16px] font-normal leading-[150%] text-white/50">
            <span className="font-medium text-white">{item.label} - </span>
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function VerifiedBadgeIcon({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#5D80FF]"
      style={{ width: size, height: size }}
    >
      <svg width={size / 2} height={size * 0.375} viewBox="0 0 8 6" fill="none" aria-hidden>
        <path
          d="M1 3L3 5L7 1"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// White dot grid + blue glow. The dot field is a 301px square whose cloud is
// centered slightly right of the card center, per the Figma for this page.
export function CardDots({ topOffset = 24 }: { topOffset?: number }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute left-[calc(50%+73px)] top-[calc(50%-22.5px)] h-[301px] w-[301px] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.35) 2.4px, transparent 2.4px)',
          backgroundSize: '14.44px 14.44px',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 h-32 w-32 rounded-full opacity-20 blur-3xl"
        style={{ top: topOffset - 72, background: 'rgba(93, 128, 255, 0.3)' }}
      />
    </>
  );
}

// ClearJournal ring mark (same geometry as the landing orb mark)
export function CjRingMark({
  size = 20,
  color = 'rgba(255,255,255,0.6)',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M19.33 3.8 A13.4 13.4 0 0 1 30.2 14.67"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 20.24 A13.4 13.4 0 0 1 19.33 30.2"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14.67 30.2 A13.4 13.4 0 0 1 14.67 3.8"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
