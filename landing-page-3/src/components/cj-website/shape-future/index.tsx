import cloudFrontLoader from '@/utils/cloudfront-loader';
import Image from 'next/image';
import GetStartedBtn from '../get-started-btn';
import Exchanges from '../hero-section/Exchanges';

export default function ShapeFuture() {
  return (
    <div className="relative container mx-auto scale-100 overflow-hidden rounded-3xl bg-brand text-[#101820] md:scale-90">
      <div className="pointer-events-none absolute top-0 z-0 h-[580px] w-full">
        <Image
          loader={cloudFrontLoader}
          src={'/images/website/future-bg.png'}
          alt="Crypto Journal"
          fill
          className="object-cover opacity-80"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-3xl py-16 pb-12">
        <div className="max-w-4xl pb-10">
          <h2 className="bg-gradient-text bg-clip-text px-4 pb-1 text-center text-5xl leading-tight font-bold text-transparent md:text-[72px] md:leading-tight">
            Shape Your Trading
            <br />
            Future with Clear Journal
          </h2>
        </div>

        <div className="mb-10">
          <Exchanges />
        </div>

        <GetStartedBtn />
      </div>
    </div>
  );
}
