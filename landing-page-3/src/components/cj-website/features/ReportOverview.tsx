import Image from 'next/image';
import GetStartedBtn from '../get-started-btn';
import cloudFrontLoader from '@/utils/cloudfront-loader';

export default function ReportOverview() {
  return (
    <div className="mx-auto mb-20 max-w-7xl px-4 text-[#101820]">
      <h5 className="mb-4 text-center font-roobert text-3xl font-semibold md:text-4xl lg:text-5xl">
        Overview Report & Trade Report
      </h5>
      <p className="mx-auto mb-5 text-center font-roobert text-base font-medium md:text-lg">
        Identify patterns of success and failure through our fully automated journaling & trade
        analytics platform.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-3xl bg-[#F6F9FF] p-4 sm:p-6 md:p-8">
          <div className="relative aspect-auto h-[437px] w-full">
            <Image
              loader={cloudFrontLoader}
              src={'/images/website/report-overview-2.png'}
              alt="Journal Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center justify-center rounded-3xl bg-[#F6F9FF] p-4 sm:p-6 md:p-8">
          <div className="relative aspect-auto h-[437px] w-full">
            <Image
              loader={cloudFrontLoader}
              src={'/images/website/report-overview-1.png'}
              alt="Journal Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center text-center">
        <GetStartedBtn />
      </div>
    </div>
  );
}
