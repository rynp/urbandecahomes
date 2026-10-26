'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Check,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  KeyRound,
  CheckCircle2,
  MapPin,
  Percent,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';

export default function HeroVideo() {
  const [activeSlug, setActiveSlug] = useState<'manila' | 'ortigas' | 'cubao'>('manila');
  const [pricingMode, setPricingMode] = useState<'monthly' | 'total'>('monthly');

  // Find active project or fallback to manila
  const currentProject = projects.find((p) => p.slug === activeSlug) || projects[0];

  // Exactly 4 cards for the reference layout grid
  const displayedUnits = currentProject.unitTypes.slice(0, 4);

  const projectTabs = [
    { slug: 'manila' as const, label: 'Manila', city: 'Tondo, Manila City' },
    { slug: 'ortigas' as const, label: 'Ortigas', city: 'Ortigas Ave. Ext., Pasig' },
    { slug: 'cubao' as const, label: 'Cubao', city: 'EDSA Aurora Blvd, QC' },
  ];

  const handleProjectChange = (slug: 'manila' | 'ortigas' | 'cubao') => {
    setActiveSlug(slug);
    trackEvent({
      name: 'project_view',
      params: { project_slug: slug, project_name: slug },
    });
  };

  return (
    <section className="relative min-h-fit py-12 sm:py-16 lg:py-20 hero-dimmer-yellow-base text-[#3E1C15] overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 cyber-grid-light opacity-30 pointer-events-none" />

      {/* Warm Ambient Radial Light Orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#DFBD58]/30 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#EBA226]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#CE2029]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section Matching Reference Layout */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          {/* Top Emblem / Icon Header */}
          <div className="flex items-center justify-center space-x-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-white/70 border border-white/80 shadow-xs flex items-center justify-center text-[#CE2029]">
              <KeyRound className="w-4 h-4 text-[#CE2029]" />
            </div>
            <span className="font-logo text-xs font-bold uppercase tracking-widest text-[#CE2029]">
              Urban Deca Homes Metro Manila
            </span>
          </div>

          {/* Main H1 Title */}
          <h1 className="font-logo text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#3E1C15] mb-3.5 leading-tight drop-shadow-xs">
            Your Future Home Begins From Here
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5C3D36] mb-8 leading-relaxed font-normal">
            Move-in ready and pre-selling condominium communities with fast-tracked 30-year Pag-IBIG financing starting at{' '}
            <strong className="text-[#CE2029] font-bold">₱9,800 / month</strong>.
          </p>

          {/* Centered Segmented Navigation Capsule: Manila, Ortigas, & Cubao */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-white/55 backdrop-blur-xl border border-white/80 shadow-[0_6px_24px_-4px_rgba(74,30,23,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)]">
            {projectTabs.map((tab) => {
              const isSelected = activeSlug === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => handleProjectChange(tab.slug)}
                  className={`relative flex items-center px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 font-logo ${
                    isSelected
                      ? 'bg-white text-[#CE2029] shadow-md shadow-[#CE2029]/15 border border-[#EADBBD]'
                      : 'text-[#4A1E17] hover:text-[#CE2029] hover:bg-white/40'
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CE2029] shadow-[0_0_8px_rgba(206,32,41,0.8)] mr-2 animate-pulse flex-shrink-0" />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subheader Row: Left Title & Right Payment Term Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 pt-4 border-t border-[#D8C28A]/60">
          <div>
            <h2 className="font-logo text-xl sm:text-2xl font-bold text-[#3E1C15] flex items-center">
              <span>{currentProject.name}</span>
              <span className="hidden sm:inline-block mx-2 text-[#9E8B62]">•</span>
              <span className="text-xs sm:text-sm font-normal text-[#6E4F47] hidden sm:inline-block">
                {currentProject.location.city}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6E4F47] mt-0.5">
              ₱10,000 Low Reservation Fee • Turnkey Units Delivered Move-In Ready
            </p>
          </div>

          {/* Pricing Mode Toggle: Monthly vs Total Price */}
          <div className="inline-flex items-center p-1 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setPricingMode('monthly')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all font-logo ${
                pricingMode === 'monthly'
                  ? 'bg-[#CE2029] text-white shadow-xs'
                  : 'text-[#4A1E17] hover:text-[#CE2029]'
              }`}
            >
              30-Yr Pag-IBIG Monthly
            </button>
            <button
              type="button"
              onClick={() => setPricingMode('total')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all font-logo ${
                pricingMode === 'total'
                  ? 'bg-[#CE2029] text-white shadow-xs'
                  : 'text-[#4A1E17] hover:text-[#CE2029]'
              }`}
            >
              Total Contract Price
            </button>
          </div>
        </div>

        {/* 4-Card Responsive Grid Matching the Kimi Reference Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {displayedUnits.map((unit) => {
            const isAvailable = unit.status !== 'Sold Out';
            const monthlyEst =
              unit.estMonthlyPagIbigPhp ||
              Math.round(((unit.loanableBalancePhp || unit.pricePhp || unit.priceMinPhp || 0) * 0.00506685));
            const priceFormatted =
              pricingMode === 'monthly'
                ? `₱${monthlyEst.toLocaleString()}`
                : `₱${(unit.priceMinPhp / 1000000).toFixed(2)}M`;

            const priceSublabel =
              pricingMode === 'monthly'
                ? 'Billed via Pag-IBIG (30 Years)'
                : `Reservation: ₱${(currentProject.reservationFeePhp || 10000).toLocaleString()}`;

            return (
              <div
                key={unit.id}
                className="glass-hero-card flex flex-col justify-between p-6 sm:p-7 rounded-3xl relative overflow-hidden"
              >
                {/* Top Section: Unit Name & Status Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-logo text-lg sm:text-xl font-extrabold text-[#3E1C15] leading-snug">
                      {unit.name.replace(/ \(Unit [A-Z]\)/, '')}
                    </h3>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 font-logo ${
                        isAvailable
                          ? 'bg-[#CE2029]/10 text-[#CE2029] border border-[#CE2029]/20'
                          : 'bg-stone-200 text-stone-600 border border-stone-300'
                      }`}
                    >
                      {unit.status}
                    </span>
                  </div>

                  {/* Tagline / Subtitle */}
                  <p className="text-xs text-[#6E4F47] font-medium mb-4">
                    {unit.areaSqm} sq.m • {unit.bedrooms === 0 ? 'Studio Suite' : `${unit.bedrooms}-Bedroom Plan`}
                  </p>

                  {/* Clean Hairline Separator Line */}
                  <div className="w-full h-px bg-[#EADBBD]/80 my-4" />

                  {/* Price Section */}
                  <div className="mb-5">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="font-logo text-3xl sm:text-4xl font-black text-[#3E1C15] tracking-tight">
                        {priceFormatted}
                      </span>
                      {pricingMode === 'monthly' && (
                        <span className="text-xs font-semibold text-[#6E4F47]">/ month</span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#7A5B52] block mt-1">
                      {priceSublabel}
                    </span>
                  </div>

                  {/* Full-Width Subscribe / Inquire Button */}
                  <Link
                    href={`/inquire-now?project=${currentProject.slug}&unit=${unit.id}`}
                    onClick={() =>
                      trackEvent({
                        name: 'inquiry_cta_click',
                        params: {
                          location_source: 'hero_plan_card',
                          project_preference: currentProject.slug,
                        },
                      })
                    }
                    className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 font-logo shadow-sm mb-6 ${
                      isAvailable
                        ? 'bg-[#CE2029] hover:bg-[#B51B23] text-white shadow-[#CE2029]/25 hover:shadow-md'
                        : 'bg-stone-300 text-stone-600 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    <span>{isAvailable ? 'Inquire This Unit' : 'Sold Out'}</span>
                    {isAvailable && <ArrowRight className="w-3.5 h-3.5 ml-1.5" />}
                  </Link>

                  {/* Bulleted Feature List with Checkmarks */}
                  <ul className="space-y-2.5 text-xs text-[#5C3D36]">
                    <li className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-[#CE2029] flex-shrink-0 mt-0.5" />
                      <span><strong>{unit.areaSqm} sq.m</strong> usable floor area</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-[#CE2029] flex-shrink-0 mt-0.5" />
                      <span>{unit.bedrooms === 0 ? 'Open living & studio cut' : `${unit.bedrooms} dedicated private bedrooms`}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-[#CE2029] flex-shrink-0 mt-0.5" />
                      <span>{unit.balcony ? 'Private balcony area included' : 'Precast insulated concrete walls'}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-[#CE2029] flex-shrink-0 mt-0.5" />
                      <span>Modular kitchen with granite sink</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-[#CE2029] flex-shrink-0 mt-0.5" />
                      <span>Finished toilet &amp; bath with ceramic tiles</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-[#CE2029] flex-shrink-0 mt-0.5" />
                      <span>Pag-IBIG 30-year takeout eligible</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-[#CE2029] flex-shrink-0 mt-0.5" />
                      <span>Smoke detector &amp; sprinkler equipped</span>
                    </li>
                  </ul>
                </div>

                {/* Card Footer Micro-Note */}
                <div className="mt-6 pt-3.5 border-t border-[#EADBBD]/60 flex items-center justify-between text-[11px] text-[#7A5B52]">
                  <span className="font-semibold text-[#8C5D08]">RFO / Move-In Ready</span>
                  <Link
                    href={`/${currentProject.slug}`}
                    className="text-[#CE2029] hover:underline font-bold"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Navigation Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5C3D36]">
            <div className="flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-[#CE2029]" />
              <span>Pag-IBIG Accredited Partner</span>
            </div>
            <div className="flex items-center">
              <Percent className="w-4 h-4 mr-1.5 text-[#EBA226]" />
              <span>25-Yr CTS Gold In-House Financing</span>
            </div>
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-1.5 text-[#3E1C15]" />
              <span>8990 Holdings, Inc. (PSE: HOUSE)</span>
            </div>
          </div>

          <Link
            href={`/${currentProject.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#CE2029] hover:text-[#B51B23] transition-colors font-logo whitespace-nowrap"
          >
            <span>Explore Full {currentProject.name} Masterplan</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
