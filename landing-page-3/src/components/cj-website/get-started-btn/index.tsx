import React, { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { env } from '@/settings';

const GetStartedBtn = async ({ text }: { text?: string }) => {
  const session = await getSession();
  const isWaitList = env.ENABLE_WAITLIST === true;
  return (
    <Fragment>
      {session?.access_token && (
        <Link
          className={
            'mb-10 flex h-14 w-max shrink-0 items-center justify-center gap-1 rounded-full border border-gold bg-gold px-6 text-base font-semibold text-white'
          }
          href="/dashboard"
        >
          Go to Dashboard
          <ChevronRight strokeWidth={1.5} />
        </Link>
      )}
      {!session?.access_token && (
        <Fragment>
          {isWaitList && (
            <Link
              className={
                'mb-5 flex h-14 w-max shrink-0 items-center justify-center gap-1 rounded-full border border-gold bg-gold px-6 text-base font-bold text-white'
              }
              href="/waitlist"
            >
              Join Free Beta
              <ChevronRight strokeWidth={2} />
            </Link>
          )}
          {!isWaitList && (
            <Link
              className={
                'mb-10 flex h-14 w-max shrink-0 items-center justify-center gap-1 rounded-full border border-gold bg-gold px-6 text-base font-semibold text-white'
              }
              href={'/register'}
            >
              {text ? text : 'Get Started for Free'}
              <ChevronRight strokeWidth={1.5} />
            </Link>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default GetStartedBtn;
