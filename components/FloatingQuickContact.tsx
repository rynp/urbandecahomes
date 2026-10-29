'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Send, X, MessageSquare } from 'lucide-react';
import { businessInfo } from '@/data/business';
import { trackEvent } from '@/lib/analytics';

export default function FloatingQuickContact() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Totally remove on admin page
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    // Hidden on mobile view, visible on md (tablet/desktop) and above
    <div className="hidden md:flex flex-col items-end space-y-2 fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Contact Actions */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 w-72 mb-2 animate-fadeIn space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 font-logo">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E1C15]">
              Quick Property Inquiry
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-[#3E1C15]"
              aria-label="Close Quick Inquiries"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5C3D36] leading-normal">
            Need immediate assistance with unit availability or computation sheets? Connect directly:
          </p>

          <a
            href={`tel:${businessInfo.phones[0].value}`}
            onClick={() => {
              trackEvent({
                name: 'phone_click',
                params: { phone_number: businessInfo.phones[0].value, location_source: 'floating_widget' },
              });
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-stone-50 hover:bg-[#FAF5E6] border border-stone-200 hover:border-[#EADBBD] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#3E1C15] text-[#FAF0C8] flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-[#CE2029]" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#3E1C15] font-logo">Call Sales Hotline</span>
              <span className="block text-[11px] text-[#5C3D36]">{businessInfo.phones[0].display}</span>
            </div>
          </a>

          <a
            href={businessInfo.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent({
                name: 'messaging_click',
                params: { channel: 'whatsapp', location_source: 'floating_widget' },
              });
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-stone-50 hover:bg-green-50 border border-stone-200 hover:border-green-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#3E1C15] font-logo">Chat on WhatsApp</span>
              <span className="block text-[11px] text-[#5C3D36]">Instant agent chat</span>
            </div>
          </a>

          <Link
            href="/inquire-now"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center p-2.5 rounded-xl bg-[#CE2029] hover:bg-[#B51B23] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all font-logo"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>Open Inquiry Form</span>
          </Link>
        </div>
      )}

      {/* Primary Floating Toggle Button */}
      <div className="relative">
        {/* Radar Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#CE2029] animate-ping opacity-30 pointer-events-none" />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#CE2029] to-[#E5383B] text-white shadow-2xl shadow-[#CE2029]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none border-2 border-white/20"
          aria-label="Open Quick Contact Assistant"
          title="Contact Sales Specialist"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse" />}
        </button>
      </div>
    </div>
  );
}
