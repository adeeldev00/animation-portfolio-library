import { publicEnvVars } from '@/settings';

const CDN_BASE = `${publicEnvVars.NEXT_PUBLIC_CLOUDFRONT_URL}/public/website-content`;

interface Beam {
  left: string;
  top: number;
  rotate: number;
  variant: 'lg' | 'sm';
}

/**
 * Ambient blue glow beams for marketing hero sections, reproduced 1:1 from the
 * Figma "Glow" group. Each beam is a 37.87×833 ellipse with the Gaussian blur
 * baked into the exported SVG (lg = 300px blur padding, sm = 160px). Beams are
 * anchored by their center so the position matches Figma's rotated bounding box.
 */
interface HeroGlowProps {
  beamE?: { left: string; top: number };
  /**
   * Elongates each beam so the glow bleeds further down past a short hero
   * into the content that follows (e.g. legal pages), instead of fading out
   * right at the hero's own natural height. Leave off for heroes already
   * sized to match the beams' natural ~833px reach.
   */
  stretch?: boolean;
}

export function HeroGlow({ beamE, stretch }: HeroGlowProps) {
  const beamLength = stretch ? 2600 : 833;
  const beams: Beam[] = [
    { left: 'calc(50% - 4.06px)', top: 106.25, rotate: 0, variant: 'lg' },
    { left: 'calc(50% - 554.75px)', top: 139.45, rotate: -32.42, variant: 'lg' },
    { left: 'calc(50% - 670.75px)', top: 394.75, rotate: -32.42, variant: 'lg' },
    { left: 'calc(50% + 557.25px)', top: 138.25, rotate: 32, variant: 'lg' },
  ];

  if (beamE) {
    beams.push({ left: beamE.left, top: beamE.top, rotate: 32, variant: 'sm' });
  }

  return (
    <>
      {beams.map((beam, i) => {
        const pad = beam.variant === 'lg' ? 300 : 160;
        const src = beam.variant === 'lg' ? `${CDN_BASE}/beam.svg` : `${CDN_BASE}/beam-sm.svg`;
        return (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute z-0 w-[37.87px]"
            style={{
              left: beam.left,
              top: `${beam.top}px`,
              height: beamLength,
              transform: `translate(-50%, -50%) rotate(${beam.rotate}deg)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="absolute max-w-none"
              style={{
                left: -pad,
                top: -pad,
                width: 37.87 + pad * 2,
                height: beamLength + pad * 2,
              }}
            />
          </div>
        );
      })}
    </>
  );
}
