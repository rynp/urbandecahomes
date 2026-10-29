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
                ? 'bg-white border-[#EADBBD] shadow-[0_10px_30px_-6px_rgba(62,28,21,0.08)]'
                : 'bg-white/95 hover:bg-white border-[#EADBBD] hover:border-[#D4B455]/80 shadow-[0_2px_12px_-3px_rgba(62,28,21,0.04)] hover:shadow-[0_6px_20px_-4px_rgba(62,28,21,0.08)] hover:-translate-y-0.5'
            } border`}
            onClick={() => toggle(faq.id)}
          >

            {/* Left Vertical Active Indicator Bar */}
            <div
              className={`absolute left-0 top-3.5 bottom-3.5 w-[3.5px] rounded-r-full bg-[#CE2029] transition-all duration-300 ${
                isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
              }`}
            />

            {/* Card Content Container */}
            <div className="relative z-10 p-5 sm:p-6 lg:p-6.5 pl-6 sm:pl-7">
              {/* Optional Category Pill */}
              {showCategory && (
                <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#CE2029] mb-2 font-logo">
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
                        : 'text-[#9E8B62] group-hover:text-[#CE2029]'
                    }`}
                  >
                    {indexNumber}
                  </span>

                  {/* Question Title */}
                  <h3
                    className={`font-logo text-[15.5px] sm:text-[17px] font-bold tracking-tight leading-snug transition-colors duration-200 ${
                      isOpen
                        ? 'text-[#CE2029]'
                        : 'text-[#3E1C15] group-hover:text-[#CE2029]'
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
                      ? 'bg-[#CE2029] text-white rotate-180 shadow-md shadow-[#CE2029]/30 ring-2 ring-[#CE2029]/20'
                      : 'bg-[#FAF0C8] border border-[#EADBBD] text-[#3E1C15] group-hover:bg-[#CE2029] group-hover:text-white group-hover:border-[#CE2029]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </button>
              </div>

              {/* Smooth Grid Rows Accordion Animation */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-[#EADBBD]/70'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pl-7 sm:pl-8">
                    <p className="text-xs sm:text-sm text-[#5C3D36] leading-[1.8] font-normal">
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
