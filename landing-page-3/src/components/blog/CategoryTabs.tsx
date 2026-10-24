'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  categories: string[];
  totalCount: number;
}

export function CategoryTabs({ categories, totalCount }: CategoryTabsProps) {
  const [active, setActive] = useState<string | null>(null);

  const tabs = [
    { label: `All (${totalCount})`, value: null },
    ...categories.map((c) => ({ label: c.charAt(0).toUpperCase() + c.slice(1), value: c })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <span className="font-inter-tight text-[20px] font-medium text-white">
        Filter by Category
      </span>
      <div className="flex flex-wrap items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {tabs.map((tab) => {
          const isActive = tab.value === active;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(tab.value)}
              className={cn(
                'cursor-pointer rounded-[12px] px-5 py-2 font-inter-tight text-[16px] whitespace-nowrap transition-colors duration-200',
                isActive
                  ? 'bg-white font-medium text-[#05060F]'
                  : 'bg-white/5 font-normal text-white/70 hover:bg-white/10'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
