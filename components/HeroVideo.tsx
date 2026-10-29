'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  KeyRound,
  ArrowDown,
  ShieldCheck,
  Check,
  Building2,
  Calendar,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function HeroVideo() {
  return (
    <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center text-[#3E1C15] overflow-hidden">
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
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white/45 via-white/20 to-transparent w-1/2 pointer-events-none" />

        {/* Minimal Mobile Scrim: Very soft, transparent wash so the image details stay crisp */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-t from-white/50 via-white/25 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        <div className="max-w-2xl lg:max-w-2xl mx-auto lg:mx-0">
          {/* Top Emblem / Icon Header Badge - Centered on mobile view */}
          <div className="flex justify-center lg:justify-start mb-3.5 sm:mb-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EADBBD] shadow-xs">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FAF0C8] flex items-center justify-center text-[#CE2029] flex-shrink-0">
                <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#CE2029]" />
              </div>
              <span className="font-logo text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#CE2029]">
                Urban Deca Homes Metro Manila
              </span>
            </div>
          </div>

          {/* Main H1 Title - Centered on mobile with "— Starts Here —" on second line, cleanly broken on desktop */}
          <h1 className="font-logo text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#3E1C15] leading-[1.18] mb-3 sm:mb-4 text-center lg:text-left drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)]">
            <span className="block">Your Future Home</span>
            <span className="block text-[#CE2029]">
              <span className="lg:hidden">— Starts Here —</span>
              <span className="hidden lg:inline whitespace-nowrap">— Starts Here</span>
            </span>
          </h1>

          {/* Subtitle Section - Centered on mobile view */}
          <div className="space-y-2.5 mb-6 sm:mb-8 text-center lg:text-left">
            <p className="text-xs sm:text-sm md:text-base text-[#3E1C15] font-bold leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
              Move-in-ready Metro Manila condos and beyond
            </p>

            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs font-bold text-[#CE2029] bg-white/95 backdrop-blur-md border border-[#EADBBD] px-3.5 py-1 rounded-full font-logo shadow-xs">
                <span>18+ Years</span>
                <span className="text-[#3E1C15]/30">•</span>
                <span>85,000+ Homes Delivered</span>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs md:text-sm text-[#4A261F] font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
              Quality • Affordable • Rent-to-Own Solutions for Filipino Families
            </p>
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
              className="inline-flex items-center justify-center px-6 py-3 sm:py-3.5 rounded-xl bg-[#CE2029] hover:bg-[#B51B23] text-white text-xs sm:text-sm font-bold uppercase tracking-wider font-logo shadow-lg shadow-[#CE2029]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Explore Communities</span>
              <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
            </a>

            <Link
              href="/inquire-now"
              onClick={() => {
                trackEvent({
                  name: 'inquiry_cta_click',
                  params: { location_source: 'hero_inquire_button', project_preference: 'general' },
                });
              }}
              className="inline-flex items-center justify-center px-6 py-3 sm:py-3.5 rounded-xl bg-white/90 hover:bg-white text-[#3E1C15] hover:text-[#CE2029] border border-[#EADBBD] text-xs sm:text-sm font-bold uppercase tracking-wider font-logo shadow-xs hover:shadow-sm transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2 text-[#CE2029]" />
              <span>Schedule Site Viewing</span>
            </Link>
          </div>

          {/* Trust Chips Strip - Centered on mobile view */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#5C3D36]">
            <div className="flex items-center px-2.5 py-1 rounded-lg bg-white/80 border border-[#EADBBD]/70 backdrop-blur-xs shadow-xs">
              <Check className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
              <span>₱10,000 Reservation</span>
            </div>
            <div className="flex items-center px-2.5 py-1 rounded-lg bg-white/80 border border-[#EADBBD]/70 backdrop-blur-xs shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
              <span>Pag-IBIG Terms (upto 30yrs)</span>
            </div>
            <div className="flex items-center px-2.5 py-1 rounded-lg bg-white/80 border border-[#EADBBD]/70 backdrop-blur-xs shadow-xs">
              <Building2 className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
              <span>Move-In Ready Units</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
