'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Send, X, MessageSquare } from 'lucide-react';
import { businessInfo } from '@/data/business';
import { trackEvent } from '@/lib/analytics';

export default function FloatingQuickContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
      {/* Expanded Quick Contact Actions */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 w-72 mb-2 animate-fadeIn space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
              Quick Property Inquiry
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-charcoal-900"
              aria-label="Close Quick Inquiries"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-500 leading-normal">
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
            className="flex items-center space-x-3 p-2.5 rounded-xl bg-stone-50 hover:bg-gold-50 border border-stone-200 hover:border-gold-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-charcoal-900 text-gold-400 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-charcoal-900">Call Sales Hotline</span>
              <span className="block text-[11px] text-stone-500">{businessInfo.phones[0].display}</span>
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
              <span className="block text-xs font-bold text-charcoal-900">Chat on WhatsApp</span>
              <span className="block text-[11px] text-stone-500">Instant agent chat</span>
            </div>
          </a>

          <Link
            href="/inquire-now"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center p-2.5 rounded-xl gold-gradient text-charcoal-900 text-xs font-bold uppercase tracking-wider shadow-sm hover:opacity-95"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>Open Inquiry Form</span>
          </Link>
        </div>
      )}

      {/* Primary Floating Toggle Button */}
      <div className="relative">
        {/* Radar Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#eb6753] animate-ping opacity-30 pointer-events-none" />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#eb6753] to-[#ff7a66] text-white shadow-2xl shadow-[#eb6753]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none border-2 border-white/20"
          aria-label="Open Quick Contact Assistant"
          title="Contact Sales Specialist"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse" />}
        </button>
      </div>
    </div>
  );
}
