import Image from 'next/image';
import GetStartedBtn from '../get-started-btn';
import cloudFrontLoader from '@/utils/cloudfront-loader';

export default function ImportOneCick() {
  return (
    <div className="mx-auto mb-20 max-w-7xl px-4 text-[#101820]">
      <h5 className="mb-4 text-center font-roobert text-3xl font-semibold md:text-4xl lg:text-5xl">
        Import In One Click
      </h5>
      <p className="mx-auto mb-5 max-w-3xl text-center font-roobert text-base font-medium md:text-lg">
        Just a Click away from all of your reports.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-center rounded-3xl bg-[#F6F9FF] px-4 py-8 sm:px-6 md:px-8 md:py-14">
          <div className="mb-6 md:mb-10">
            <h5 className="mb-3 font-roobert text-3xl font-semibold md:mb-4 md:text-4xl lg:text-5xl">
              Pull Trade Data From Connected Exchanges
            </h5>
            <p className="mb-4 font-roobert text-base font-medium md:text-lg">
              Select from your connected exchanges, and instantly pull trade data to pre-populate
              new journal entries.
            </p>
          </div>

          <GetStartedBtn />
        </div>

        <div className="flex items-center justify-center rounded-3xl bg-[#F6F9FF] p-4 sm:p-6 md:p-8">
          <div className="relative h-[480px] w-full md:h-full">
            <Image
              loader={cloudFrontLoader}
              src={'/images/website/api-manage.png'}
              alt="Journal Image"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
