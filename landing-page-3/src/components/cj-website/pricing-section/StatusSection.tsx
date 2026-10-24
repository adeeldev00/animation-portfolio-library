import Alert from '@/components/common/Alert';

import { LoaderCircle } from 'lucide-react';
import React from 'react';

interface StatusSectionProps {
  title?: string;
  message?: string;
  isLoading?: boolean;
  isError?: boolean;
  as?: 'h1' | 'h2';
}

const StatusSection: React.FC<StatusSectionProps> = ({
  title = 'Our Pricing Plans for You',
  message,
  isLoading,
  isError,
  as: HeadingTag = 'h1',
}) => {
  return (
    <section className="bg-transparents mt-10 mb-52 px-5 text-white lg:px-6 xl:px-10 2xl:px-24">
      <HeadingTag className="mb-3 text-center font-roobert text-3xl font-semibold sm:text-4xl md:text-5xl">
        {title}
      </HeadingTag>

      {isLoading && (
        <div className="mt-20 flex items-center justify-center">
          <LoaderCircle size={60} className="animate-spin text-gold" />
        </div>
      )}

      {isError && (
        <Alert title="" description="Unable to load pricing plans. Please try again later." />
      )}

      {!isLoading && !isError && message && (
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-600">{message}</p>
        </div>
      )}
    </section>
  );
};

export default StatusSection;
