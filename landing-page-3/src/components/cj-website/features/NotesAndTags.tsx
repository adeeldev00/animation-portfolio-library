import Image from 'next/image';
import { TickSquare } from 'iconsax-reactjs';
import GetStartedBtn from '../get-started-btn';
import cloudFrontLoader from '@/utils/cloudfront-loader';

export default function NotesAndTags() {
  return (
    <div className="mx-auto mb-16 max-w-7xl px-4 text-[#101820]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="relative aspect-auto h-[480px] w-full">
            <Image
              loader={cloudFrontLoader}
              src={'/images/website/notes-tags.png'}
              alt="Journal Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="rounded-3xl px-4 py-8 sm:px-6 md:px-8 md:py-14">
          <div className="mb-6 md:mb-10">
            <h5 className="mb-3 font-roobert text-3xl font-semibold md:mb-4 md:text-4xl lg:text-5xl">
              Notes & Tags
            </h5>
            <p className="mb-4 font-roobert text-base font-medium md:text-lg">
              Create & manage Notes & tags with your trades.
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            {['Create a Thread of Notes', 'Tag Your Trades', 'Analyse Your Tags'].map(
              (item, idx) => {
                return (
                  <div key={idx} className="mb-3 flex items-center gap-3">
                    <TickSquare className="size-4 text-brand md:size-5" />
                    <p className="font-roobert text-base font-medium md:text-lg">{item}</p>
                  </div>
                );
              }
            )}
          </div>

          <GetStartedBtn />
        </div>
      </div>
    </div>
  );
}
