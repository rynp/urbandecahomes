'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Check,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function HeroVideo() {
  return (
    <section className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center text-[#1C1917] overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero-bg.jpg"
          alt="Urban Deca Homes - Filipino Family and Move-In Ready Communities"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-[center_20%] lg:object-center"
        />

        {/* Minimal Desktop Scrim: Feather-light left fade so the full city towers and family remain vividly clear */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#FAF8F3]/95 via-[#FAF8F3]/70 to-transparent w-3/5 pointer-events-none" />

        {/* Minimal Mobile Scrim: Soft bottom-up wash */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/80 to-[#FAF8F3]/30 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        <div className="max-w-2xl lg:max-w-2xl mx-auto lg:mx-0">
          {/* Top Emblem / Accreditation Pill */}
          <div className="flex justify-center lg:justify-start mb-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E7DFD3] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1F5938] animate-pulse" />
              <span className="font-logo text-[11px] font-bold uppercase tracking-wider text-[#1F5938]">
                Pag-IBIG Accredited • Ready For Occupancy
              </span>
            </div>
          </div>

          {/* Main H1 Title - Centered on mobile, clean branding with primary SEO keywords */}
          <h1 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1C1917] leading-[1.14] mb-4 text-center lg:text-left drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
            <span className="block">Urban Deca Homes</span>
            <span className="block text-[#CE2029]">
              Move-In Ready Condos
            </span>
          </h1>

          {/* Subtitle / Value Proposition with Monthly Affordability Anchor */}
          <div className="space-y-3 mb-6 sm:mb-8 text-center lg:text-left">
            <p className="text-sm sm:text-base text-[#292524] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
              Own a titled Metro Manila condo starting at <strong className="text-[#CE2029] font-bold">~₱12,500/month</strong> with 30-year Pag-IBIG financing and low ₱10,000 reservation fees. Built for Filipino families, minimum-wage earners, and OFWs.
            </p>

            {/* Quick Property Transit Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <Link
                href="/manila"
                className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-[#E7DFD3] text-[#1C1917] hover:text-[#CE2029] shadow-xs transition-colors"
              >
                <span className="font-bold text-[#CE2029] mr-1">Manila</span> Tondo • DECA Mall
              </Link>
              <Link
                href="/ortigas"
                className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-[#E7DFD3] text-[#1C1917] hover:text-[#CE2029] shadow-xs transition-colors"
              >
                <span className="font-bold text-[#CE2029] mr-1">Ortigas</span> Pasig • Lagoon Park
              </Link>
              <Link
                href="/cubao"
                className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-[#E7DFD3] text-[#1C1917] hover:text-[#CE2029] shadow-xs transition-colors"
              >
                <span className="font-bold text-[#CE2029] mr-1">Cubao</span> EDSA • Transit-Oriented
              </Link>
            </div>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-8">
            <a
              href="#featured-projects"
              onClick={() => {
                trackEvent({
                  name: 'inquiry_cta_click',
                  params: { location_source: 'hero_explore_projects', project_preference: 'general' },
                });
              }}
              className="btn-deca group inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#CE2029] hover:bg-[#B51B23] text-white text-xs sm:text-sm font-bold uppercase tracking-wider font-logo shadow-lg shadow-[#CE2029]/25 hover:shadow-xl transition-all duration-200"
            >
              <span>Explore 3 Developments</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <Link
              href="/inquire-now"
              onClick={() => {
                trackEvent({
                  name: 'inquiry_cta_click',
                  params: { location_source: 'hero_inquire_button', project_preference: 'general' },
                });
              }}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF8F3] text-[#1C1917] hover:text-[#CE2029] border border-[#E7DFD3] text-xs sm:text-sm font-bold uppercase tracking-wider font-logo shadow-xs hover:shadow-sm transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2 text-[#CE2029]" />
              <span>Schedule Free Site Tour</span>
            </Link>
          </div>

          {/* Trust Chips Strip */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs font-semibold text-[#57534E]">
            <div className="flex items-center px-3 py-1 rounded-lg bg-white/90 border border-[#E7DFD3] shadow-xs">
              <Check className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
              <span>₱10,000 Reservation</span>
            </div>
            <div className="flex items-center px-3 py-1 rounded-lg bg-white/90 border border-[#E7DFD3] shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#1F5938]" />
              <span>Pag-IBIG Loan up to 30 Yrs</span>
            </div>
            <div className="flex items-center px-3 py-1 rounded-lg bg-white/90 border border-[#E7DFD3] shadow-xs">
              <Building2 className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
              <span>Turnover-Ready Units</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
