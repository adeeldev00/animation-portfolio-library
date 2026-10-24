import React from 'react';
import Image from 'next/image';
import { Clock, Cup, SafeHome, SecurityTime, TaskSquare, TickCircle } from 'iconsax-reactjs';
import cloudFrontLoader from '@/utils/cloudfront-loader';

const FeatureDetails = () => {
  return (
    <section className="mt-20 mb-32 px-5 text-[#101820] lg:px-6 xl:px-10 2xl:px-24">
      <h1 className="mb-3 text-center font-roobert text-4xl font-semibold md:text-5xl">
        Why Should I Start Journaling
      </h1>
      <h6 className="mx-auto max-w-4xl text-center font-roobert text-lg font-medium">
        Journaling is one the most crucial habits a trader needs to practice. There are numerous
        studies proving the countless benefits of journaling:
      </h6>

      <div className="relative mx-auto mt-6 p-3 sm:p-0">
        <div className="w-full">
          <Image
            loader={cloudFrontLoader}
            src={'/images/website/bg-gradient-1.png'}
            alt="Clear Journal"
            fill
            className="mt-28 max-h-[384px] object-fill"
          />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-4 lg:flex-row lg:flex-nowrap">
          <article className="w-full sm:w-1/2 md:w-[312px]">
            <div className="mb-9 w-full overflow-x-hidden rounded-xl border border-[#F3F4F6] bg-white! shadow-xs">
              <div className="relative h-48">
                <Image
                  loader={cloudFrontLoader}
                  src={'/images/website/pnl-overview.png'}
                  alt="PNL Overview feature in crypto trading journal"
                  fill
                  className="object-cover object-top-left"
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-left">
                <p className="mb-2 font-roobert text-base font-semibold">PNL Overview</p>
                <p className="font-roobert text-sm text-secondary-1">
                  Provides complete overview of PNL Performance
                </p>
              </div>
            </div>
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 pb-4">
                  <Cup size={24} className="text-brand" />
                  <p className="font-roobert text-base font-semibold">Be Your Own Advisor</p>
                </div>
                <p className="font-roobert text-sm font-medium text-secondary-1">
                  Documenting every trade can help define your strengths & weaknesses. Be your own
                  adviser and reinforce better trading skills.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 pb-4">
                  <TaskSquare size={24} className="text-brand" />
                  <p className="font-roobert text-base font-semibold">Risk Management</p>
                </div>
                <p className="font-roobert text-sm font-medium text-secondary-1">
                  A trading journal helps you see where you might be making mistakes with the
                  handling of risk.
                </p>
              </div>
            </div>
          </article>
          <article className="w-full sm:w-1/2 md:w-[312px] xl:w-[476px]">
            <div className="mb-9 overflow-hidden rounded-xl border border-[#F3F4F6] bg-white! shadow-xs">
              <div className="relative h-48 bg-white p-4">
                <Image
                  loader={cloudFrontLoader}
                  src={'/images/website/open-future.png'}
                  alt="Open Future Positions feature in crypto trading journal"
                  fill
                  className="object-cover object-top-left p-6 pr-0"
                  loading="lazy"
                />
              </div>
              <div className="bg-white! p-6 text-left">
                <p className="mb-2 font-roobert text-base font-semibold">Open Future Positions</p>
                <p className="max-w-[380px] font-roobert text-sm text-secondary-1">
                  Seamlessly interoperate transactions for efficiency and speed.
                </p>
              </div>
            </div>
            <div className="px-6">
              <div className="mb-8">
                <div className="flex items-center gap-2 pb-4">
                  <TickCircle size={24} className="text-brand" />
                  <p className="font-roobert text-base font-semibold">Learn From Mistakes</p>
                </div>
                <p className="min-h-[60px] font-roobert text-sm font-medium text-secondary-1">
                  Track your progress, as well as study mistakes made when entering or exiting a
                  trade.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 pb-4">
                  <SafeHome size={24} className="text-brand" />
                  <p className="font-roobert text-base font-semibold">Centralised Trading</p>
                </div>
                <p className="font-roobert text-sm font-medium text-secondary-1">
                  Automatically journal and record all your trades in one place
                </p>
              </div>
            </div>
          </article>
          <article className="w-full sm:w-full md:w-[312px]">
            <div className="mb-9 w-full overflow-hidden rounded-xl border border-[#F3F4F6] bg-white shadow-xs">
              <div className="relative h-48">
                <Image
                  loader={cloudFrontLoader}
                  src={'/images/website/stat-overview.png'}
                  alt="Statistical Overview feature in crypto trading journal"
                  fill
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-left">
                <p className="mb-2 font-roobert text-base font-semibold">Statistical Overview</p>
                <p className="font-roobert text-sm text-secondary-1">
                  A more secure contract platform for superchain interoperability.
                </p>
              </div>
            </div>
            <div className="">
              <div className="mb-8">
                <div className="flex items-center gap-2 pb-4">
                  <SecurityTime size={24} className="text-brand" />
                  <p className="font-roobert text-base font-semibold">Strengthen Discipline</p>
                </div>
                <p className="min-h-[60px] font-roobert text-sm font-medium text-secondary-1">
                  Keep your emotions in check, and become more aware of your trading consequences.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 pb-4">
                  <Clock size={24} className="text-brand" />
                  <p className="font-roobert text-base font-semibold">Saves Time</p>
                </div>
                <p className="font-roobert text-sm font-medium text-secondary-1">
                  Save countless hours and import past trades in a click.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeatureDetails;
