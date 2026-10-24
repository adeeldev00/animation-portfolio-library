import { DotGrid } from '@/components/ui/DotGrid';

interface Props {
  heightPx?: number;
}

const HeroDotBackdrop = ({ heightPx = 900 }: Props) => {
  return (
    <DotGrid
      dotSize={4}
      gap={20}
      baseColor="#2F293A"
      activeColor="#5D80FF"
      proximity={140}
      shockRadius={250}
      shockStrength={5}
      resistance={750}
      returnDuration={1.5}
      disableClick
      className="!absolute inset-x-0 top-0 z-[5] p-0!"
      style={{
        height: `${heightPx}px`,
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
      }}
    />
  );
};

export default HeroDotBackdrop;
