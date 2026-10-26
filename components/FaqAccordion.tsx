'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/data/faqs';

interface FaqAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
  showCategory?: boolean;
}

export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  showCategory = false,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenIndex >= 0 && items[defaultOpenIndex] ? items[defaultOpenIndex].id : null
  );

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {items.map((faq, index) => {
        const isOpen = openId === faq.id;
        const indexNumber = String(index + 1).padStart(2, '0');

        return (
          <div
            key={faq.id}
            className={`group relative rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
              isOpen
                ? 'bg-[#181822] border-[#CE2029]/60 shadow-[0_16px_40px_-10px_rgba(206,32,41,0.25)] ring-1 ring-[#CE2029]/30'
                : 'bg-[#14141c]/90 hover:bg-[#181822] border-white/10 hover:border-[#CE2029]/45 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_-6px_rgba(206,32,41,0.2)] hover:-translate-y-0.5'
            } border backdrop-blur-md`}
            onClick={() => toggle(faq.id)}
          >
            {/* Ambient Multi-Stop Hover Glow Backdrop */}
            <div
              className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#CE2029]/30 via-[#FAF0C8]/25 to-[#CE2029]/30 transition-opacity duration-500 pointer-events-none blur-[6px] ${
                isOpen ? 'opacity-90' : 'opacity-0 group-hover:opacity-100'
              }`}
            />

            {/* Inner Corner Subtle Light Sheen */}
            <div
              className={`absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-[#CE2029]/15 via-[#FAF0C8]/10 to-transparent rounded-tr-2xl pointer-events-none transition-opacity duration-500 ${
                isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            />

            {/* Left Vertical Active Indicator Bar */}
            <div
              className={`absolute left-0 top-3.5 bottom-3.5 w-[3.5px] rounded-r-full bg-gradient-to-b from-[#CE2029] to-[#FAF0C8] transition-all duration-300 ${
                isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
              }`}
            />

            {/* Card Content Container */}
            <div className="relative z-10 p-5 sm:p-6 lg:p-6.5 pl-6 sm:pl-7">
              {/* Optional Category Pill */}
              {showCategory && (
                <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FAF0C8] mb-2 font-logo">
                  <HelpCircle className="w-3.5 h-3.5 text-[#CE2029]" />
                  <span>{faq.category}</span>
                </div>
              )}

              {/* Accordion Trigger Header */}
              <div className="w-full flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3.5 sm:space-x-4 min-w-0 flex-1">
                  {/* High-End Monospace Index Pill */}
                  <span
                    className={`font-mono text-xs sm:text-[13px] font-bold tracking-wider pt-0.5 transition-colors duration-200 select-none ${
                      isOpen
                        ? 'text-[#CE2029]'
                        : 'text-stone-400 group-hover:text-[#CE2029]'
                    }`}
                  >
                    {indexNumber}
                  </span>

                  {/* Question Title */}
                  <h3
                    className={`font-logo text-[16px] sm:text-[18px] font-bold tracking-tight leading-snug transition-colors duration-200 ${
                      isOpen
                        ? 'text-white drop-shadow-sm'
                        : 'text-stone-100 group-hover:text-white'
                    }`}
                  >
                    {faq.question}
                  </h3>
                </div>

                {/* Precision Chevron Indicator */}
                <button
                  type="button"
                  aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                  aria-expanded={isOpen}
                  className={`flex-shrink-0 w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#CE2029] text-white rotate-180 shadow-md shadow-[#CE2029]/40 ring-2 ring-[#CE2029]/30'
                      : 'bg-white/10 border border-white/10 text-stone-300 group-hover:border-[#CE2029]/50 group-hover:text-white group-hover:bg-[#CE2029]/20'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </button>
              </div>

              {/* Smooth Grid Rows Accordion Animation */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pl-7 sm:pl-8">
                    <p className="text-xs sm:text-sm text-stone-300 leading-[1.8] font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
