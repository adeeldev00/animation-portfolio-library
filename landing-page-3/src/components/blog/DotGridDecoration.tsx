interface DotGridDecorationProps {
  /** Positioning classes only (e.g. "absolute left-0 top-0 h-[300px] w-[300px]") */
  className: string;
  /** radial-gradient mask controlling where the dots fade out */
  maskImage: string;
}

export function DotGridDecoration({ className, maskImage }: DotGridDecorationProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1.2px, transparent 1.2px)',
        backgroundSize: '9.29px 9.29px',
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    />
  );
}
