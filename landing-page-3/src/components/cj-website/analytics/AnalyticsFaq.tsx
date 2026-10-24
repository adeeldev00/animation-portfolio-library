'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import DirectionalReveal from '@/components/ui/DirectionalReveal';

const slideUpLeft: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideUpRight: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

const FAQS = [
  {
    question: 'Do I have to set any of this up?',
    answer:
      'No. Every breakdown, report, and calendar view is generated automatically from the trades already syncing into ClearJournal. Nothing to configure.',
  },
  {
    question: 'Can I see performance by symbol and session?',
    answer:
      'Yes. Every trade is sliced by symbol, session, day, and setup the moment it closes — with win rate, profit factor, and net P&L on each slice.',
  },
  {
    question: 'Does it track funding and fees?',
    answer:
      'Yes. Net funding and net fees are totalled across every trade — paid vs received — so the P&L you see is what actually reached your account.',
  },
  {
    question: 'Is the calendar included?',
    answer:
      'Yes. Month, year, and day calendar views map every winning and losing day, plus weekly and quarterly breakdowns — included on every plan.',
  },
  {
    question: 'Can I export my reports?',
    answer:
      'Yes. Export any date range to CSV in one click — monthly reports, per-trade breakdowns, and cross-analysis tables included.',
  },
];

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="w-full rounded-[12px] p-6"
      style={{ background: '#0A0B14', border: '1.5px solid rgba(255,255,255,0.05)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 text-left"
      >
        <span className="flex-1 font-inter-tight text-[16px] leading-[150%] font-semibold text-white sm:text-[18px]">
          {question}
        </span>
        {open ? (
          <Minus size={24} className="shrink-0 text-white" strokeWidth={1.5} />
        ) : (
          <Plus size={24} className="shrink-0 text-white" strokeWidth={1.5} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pt-4 pr-10 font-inter-tight text-[14px] leading-[150%] font-medium text-white/70">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AnalyticsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-shell section-pad">
      <div className="flex flex-col gap-12 lg:flex-row lg:justify-center lg:gap-[120px]">
        {/* Left — badge + title */}
        <DirectionalReveal
          variants={slideUpLeft}
          className="flex w-full flex-col gap-4 lg:w-[308px] lg:shrink-0"
        >
          <span
            className="inline-flex w-fit items-center rounded-[8px] border border-white/[0.05] px-2 py-1 font-inter-tight text-[12px] font-normal text-white/70"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.10) 100%)',
            }}
          >
            FAQ
          </span>

          <h2 className="font-inter-tight text-[36px] leading-[100%] font-normal text-white sm:text-[48px]">
            Quick Answers
          </h2>
        </DirectionalReveal>

        {/* Right — accordion */}
        <DirectionalReveal
          variants={slideUpRight}
          className="flex w-full max-w-[812px] flex-col gap-3"
        >
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </DirectionalReveal>
      </div>
    </section>
  );
}
