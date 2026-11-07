import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Building2,
  ShoppingBag,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Check,
  TreePine,
  Sparkles,
  Calculator,
  Download,
  ExternalLink,
  Store,
  Navigation,
  School,
  HeartPulse,
  Waves,
  Car,
  Clock,
  Phone,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FinancingCalculator from '@/components/FinancingCalculator';
import InquiryForm from '@/components/InquiryForm';
import OrtigasBookingForm from '@/components/ortigas/OrtigasBookingForm';
import JsonLd from '@/components/JsonLd';
import { getProjectBySlug, getProjectPriceRange } from '@/data/projects';
import { constructMetadata } from '@/lib/seo';
import { getProjectApartmentComplexSchema } from '@/lib/schema';
import OrtigasGoogleMap from '@/components/ortigas/OrtigasGoogleMap';
import OrtigasInteractivePlans from '@/components/ortigas/OrtigasInteractivePlans';
import OrtigasUnitFloorplanSelector from '@/components/ortigas/OrtigasUnitFloorplanSelector';
import OrtigasHeroGallery from '@/components/ortigas/OrtigasHeroGallery';
import ManilaSlideshow from '@/components/manila/ManilaSlideshow';
import {
  ortigasNeighborhoodItems,
  ortigasSchoolItems,
  ortigasHospitalItems,
} from '@/data/ortigasSectionsData';

const project = getProjectBySlug('ortigas')!;

export const metadata: Metadata = constructMetadata({
  title: project.metaTitle,
  description: project.metaDescription,
  path: `/${project.slug}`,
  keywords: [
    'Urban Deca Homes Ortigas',
    'Condo in Pasig City',
    'Condo near Ortigas Avenue Extension',
    'Affordable condo Pasig',
    'Pag-IBIG condo Pasig',
    'Condo near Eastwood City',
    '2 bedroom condo Ortigas Pasig',
    'Lagoon park condo Pasig',
  ],
});

export default function OrtigasProjectPage() {
  if (!project) notFound();

  const { minPricePhp, maxPricePhp, minReservationFeePhp, maxDiscountPhp } = getProjectPriceRange(project);

  return (
    <>
      <JsonLd data={getProjectApartmentComplexSchema(project)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: project.name, path: `/${project.slug}` }]} />

      {/* ============================================================ */}
      {/* 1. FULL-BLEED EDITORIAL SPLIT HERO SECTION                   */}
      {/* ============================================================ */}
        <section className="relative bg-gradient-to-b from-[#FAF4E2] via-[#FDF9ED] to-[#F7F0D8] text-[#241E15] border-b border-[#E8DEC2] overflow-hidden" id="overview">
          {/* Ambient architectural radial glow */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#DFBD58]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#F5E3A3]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-y-6 gap-x-8 lg:gap-x-10 xl:gap-x-12 items-stretch">
                {/* 1. Header (Badge, Title, Subtitle) */}
                <div className="lg:col-start-1 lg:col-span-5 lg:row-start-1 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CE2029]/10 border border-[#CE2029]/20 text-[#CE2029] text-[11px] font-bold tracking-widest uppercase font-mono shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#CE2029] animate-pulse" />
                    {project.badge || 'Ready For Occupancy · Pasig City'}
                  </div>

                  <h1 className="font-logo text-3xl sm:text-4xl xl:text-[42px] text-[#2C1810] font-black tracking-tight leading-[1.12]">
                    {project.headline}
                  </h1>

                  <p className="text-[#6B4F46] text-sm sm:text-base leading-relaxed font-medium max-w-xl">
                    {project.tagline}
                  </p>
                </div>

                {/* 2. Gallery: On mobile view, sits right below the subtitle; On desktop, sits on the right across rows 1 & 2 */}
                <div className="lg:col-start-6 lg:col-span-7 lg:row-start-1 lg:row-span-2 flex flex-col">
                  <OrtigasHeroGallery project={project} />
                </div>

                {/* 3. Double-Bezel Investment Prospectus Card: On mobile, sits below the gallery; On desktop, sits on the left below subtitle */}
                <div className="lg:col-start-1 lg:col-span-5 lg:row-start-2 flex flex-col justify-end">
                  <div className="rounded-[2rem] p-1.5 sm:p-2 bg-[#EFE8D8]/80 border border-[#DFD3BE] shadow-[0_16px_36px_-12px_rgba(50,25,18,0.08)] backdrop-blur-md">
                    <div className="relative rounded-[calc(2rem-6px)] sm:rounded-[calc(2rem-8px)] bg-gradient-to-br from-white/95 via-[#FCFAF5]/95 to-[#FAF5E8]/90 pt-3 sm:pt-3.5 px-5 sm:px-6 pb-5 sm:pb-6 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_1px_3px_rgba(50,25,18,0.04)] space-y-4">
                      {/* 3D Folded Ribbon Badge: Aligned on the border of inner container (Reference Image 1) */}
                      {maxDiscountPhp > 0 && (
                        <div className="absolute -top-3.5 right-5 sm:right-7 z-30 pointer-events-none select-none">
                          {/* Left Fold-under 3D Shadow (Connecting directly to the inner container border) */}
                          <div
                            className="absolute -left-2.5 top-0 w-2.5 h-3.5 bg-gradient-to-br from-[#6B060D] to-[#3B0206]"
                            style={{
                              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                            }}
                          />

                          {/* Elongated Ribbon Main Body */}
                          <div
                            className="relative w-[88px] sm:w-[96px] pt-3 pb-7 sm:pb-8 bg-gradient-to-b from-[#EF233C] via-[#CE2029] to-[#990E17] text-white text-center flex flex-col items-center justify-center rounded-t-sm shadow-[0_12px_24px_rgba(180,20,30,0.42),0_4px_8px_rgba(0,0,0,0.22)]"
                            style={{
                              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), 50% 100%, 0 calc(100% - 15px))',
                            }}
                          >
                            {/* Top Fold Highlight */}
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

                            {/* Glossy Diagonal Satin Sheen */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/16 to-transparent pointer-events-none" />

                            {/* Ribbon Content: Static Text "Limited Promo Discount" */}
                            <div className="relative z-10 px-1.5 flex flex-col items-center text-center">
                              <span className="text-[8px] sm:text-[8.5px] font-black uppercase tracking-wider text-white/95 leading-tight font-mono">
                                LIMITED PROMO
                              </span>
                              <span className="text-[13px] sm:text-[14.5px] font-black uppercase tracking-tight text-white font-logo leading-tight drop-shadow-sm mt-1">
                                DISCOUNT
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Stacked Financial Metrics: TCP on top, Reservation Fee below */}
                      <div className="space-y-3 pr-20 sm:pr-28">
                        {/* Units TCP Range Block (Dynamic from UnitTypes) */}
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FBF0CB] border border-[#DFBD58]/40 text-[#8C5D08] font-bold text-[10px] sm:text-[11px] tracking-wider uppercase font-mono shadow-sm">
                            Units TCP Range
                          </span>
                          <div className="flex flex-row items-start gap-3.5 sm:gap-6 mt-1.5">
                            <div className="shrink-0">
                              <span className="text-xs sm:text-sm font-semibold text-[#7A5B52] block">
                                From
                              </span>
                              <div
                                className="text-lg sm:text-xl xl:text-2xl font-bold text-[#2C1810] tracking-tight leading-tight whitespace-nowrap"
                                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                              >
                                ₱{minPricePhp.toLocaleString()}
                              </div>
                            </div>
                            {minPricePhp !== maxPricePhp && (
                              <div className="shrink-0">
                                <span className="text-xs sm:text-sm font-semibold text-[#7A5B52] block">
                                  To
                                </span>
                                <div
                                  className="text-lg sm:text-xl xl:text-2xl font-bold text-[#2C1810] tracking-tight leading-tight whitespace-nowrap"
                                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                                >
                                  ₱{maxPricePhp.toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Reservation Fee Block (Re-aligned below TCP with matching badge and "For as low as" label) */}
                        <div className="pt-2.5 border-t border-[#E8DAB7]/60">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FBF0CB] border border-[#DFBD58]/40 text-[#8C5D08] font-bold text-[10px] sm:text-[11px] tracking-wider uppercase font-mono shadow-sm">
                            Reservation Fee
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-[#7A5B52] block mt-1">
                            For as low as
                          </span>
                          <div
                            className="text-xl sm:text-2xl xl:text-[26px] font-bold text-[#CE2029] tracking-tight leading-tight"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                          >
                            ₱{minReservationFeePhp.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Promo Ribbon Banner Styled After Reference Image */}
                      {maxDiscountPhp > 0 && (
                        <div className="relative flex items-center justify-between px-5 sm:px-7 py-2.5 select-none filter drop-shadow-[0_4px_12px_rgba(234,88,12,0.25)]">
                          {/* SVG Vector Notched Ribbon Background with Inset White Stroke */}
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            preserveAspectRatio="none"
                            viewBox="0 0 400 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <linearGradient id="promoRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F59E0B" />
                                <stop offset="28%" stopColor="#EA580C" />
                                <stop offset="68%" stopColor="#E11D48" />
                                <stop offset="100%" stopColor="#CE2029" />
                              </linearGradient>
                            </defs>
                            {/* Outer Notched Ribbon Body */}
                            <polygon
                              points="0,0 400,0 388,22 400,44 0,44 12,22"
                              fill="url(#promoRibbonGrad)"
                            />
                            {/* Inner Inset Hairline Stroke */}
                            <polygon
                              points="3.5,2.5 396.5,2.5 385,22 396.5,41.5 3.5,41.5 15,22"
                              fill="none"
                              stroke="rgba(255, 255, 255, 0.85)"
                              strokeWidth="1.2"
                            />
                          </svg>

                          <span className="relative z-10 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] min-w-0">
                            <Sparkles className="w-3.5 h-3.5 text-white shrink-0 drop-shadow" />
                            <span className="truncate">Limited Promo Discount Up To:</span>
                          </span>
                          <strong
                            className="relative z-10 shrink-0 text-xs sm:text-sm md:text-[15px] font-black text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                          >
                            ₱{maxDiscountPhp.toLocaleString()}
                          </strong>
                        </div>
                      )}

                      {/* Temporarily Hidden Architectural Specifications Grid (Preserved for re-enabling) */}
                      {false && (
                        <div className="pt-3.5 border-t border-[#E8DAB7]/70 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider text-[#7A5B52] font-bold font-mono">
                              Key Development Specs
                            </span>
                            <span className="text-[10px] text-[#A08279] font-medium font-mono">
                              13-Ha Masterplan
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5">
                            {project.specifications.map((spec) => (
                              <div key={spec.label} className="flex items-start gap-2 text-xs">
                                <div className="w-4 h-4 rounded-full bg-[#CE2029]/10 border border-[#CE2029]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#CE2029]">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                                <div className="min-w-0">
                                  <span className="text-[10px] uppercase tracking-wider text-[#7A5B52] font-semibold block leading-tight truncate">
                                    {spec.label}
                                  </span>
                                  <span className="text-xs font-bold text-[#2C1810] leading-snug line-clamp-1">
                                    {spec.value}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Financing Options & Partner Badges (Enlarged Typography & Partner Icons) */}
                      <div className="pt-3.5 border-t border-[#E8DAB7]/70 flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <span className="text-xs sm:text-[13px] uppercase tracking-wider text-[#7A5B52] font-bold font-mono block">
                            Financing Accepted
                          </span>
                          <span className="text-xs sm:text-sm text-[#3E1C15] font-semibold block mt-0.5">
                            Pag-IBIG &amp; Major Banks
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all" title="Pag-IBIG Fund">
                            <img src="/images/partners/pag-ibig.svg" alt="Pag-IBIG Fund" className="w-full h-full object-contain" width={34} height={34} />
                          </div>
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all" title="Security Bank">
                            <img src="/images/partners/security-bank.svg" alt="Security Bank" className="w-full h-full object-contain" width={34} height={34} />
                          </div>
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all" title="BPI">
                            <img src="/images/partners/bpi.svg" alt="BPI" className="w-full h-full object-contain" width={34} height={34} />
                          </div>
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all" title="BDO">
                            <img src="/images/partners/bdo.svg" alt="BDO" className="w-full h-full object-contain" width={34} height={34} />
                          </div>
                        </div>
                      </div>

                      {/* Button-in-Button Nested Candy Gloss CTA */}
                      <div className="pt-2">
                        <a
                          href="#inquire"
                          className="group relative overflow-hidden flex items-center justify-between w-full px-5 py-3 rounded-full text-white font-bold text-sm tracking-wide border border-[#FF5C67]/45 shadow-[0_6px_20px_rgba(206,32,41,0.36),0_2px_4px_rgba(0,0,0,0.16),inset_0_1px_1.5px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(120,5,15,0.4)] hover:shadow-[0_8px_26px_rgba(206,32,41,0.48),0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_1.5px_rgba(255,255,255,0.85),inset_0_-2px_4px_rgba(120,5,15,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 select-none"
                          style={{
                            background: 'linear-gradient(180deg, #ED2B38 0%, #CE2029 48%, #A8121B 100%)',
                          }}
                        >
                          {/* Candy Gloss Curved Top Reflection */}
                          <div
                            className="absolute top-0 inset-x-0 h-[48%] pointer-events-none rounded-t-full"
                            style={{
                              background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.10) 100%)',
                            }}
                          />

                          {/* Top Specular Hairline Highlight */}
                          <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/85 to-transparent pointer-events-none" />

                          <span className="relative z-10 font-semibold tracking-wider uppercase text-xs sm:text-[13px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                            Schedule Site Viewing / Inquire
                          </span>
                          <div className="relative z-10 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:bg-white group-hover:text-[#CE2029] group-hover:translate-x-1 shadow-sm transition-all duration-300">
                            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#CE2029] transition-colors" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* ============================================================ */}
        {/* 2. INTERACTIVE UNIT LAYOUT & FLOORPLAN SELECTOR             */}
        {/* ============================================================ */}
        <OrtigasUnitFloorplanSelector project={project} />

        {/* ============================================================ */}
        {/* 3. CURATED AMENITIES & INTEGRATED LIFESTYLE GRID             */}
        {/* ============================================================ */}
        <section className="py-20 bg-[#FAF5E6] border-y border-[#E8DEC4]" id="amenities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#CE2029] uppercase tracking-widest text-xs font-bold">
                Community Infrastructure
              </span>
              <h2 className="font-logo text-4xl lg:text-5xl font-extrabold text-[#3E1C15] mt-1">
                Curated Everyday Conveniences
              </h2>
              <p className="text-[#5C3D36] text-sm mt-3">
                Enjoy full resort amenities and integrated retail right inside the secure 13-hectare perimeter, designed for family well-being and active recreation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Amenity Card 1: 1.3-Hectare Lagoon Park */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EADBBD] shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative bg-stone-100">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/amenity-pool-lagoon.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold px-2.5 py-0.5 rounded bg-[#FAF0C8] border border-[#DFBD58] text-[#543E08]">
                    Doorstep Nature Sanctuary
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#241E15]">1.3-Hectare Central Lagoon Park</h3>
                  <p className="text-xs text-[#544D40] mt-1.5 leading-relaxed">
                    Reflection ponds, lush open lawns, and perimeter jogging trails provide refreshing open spaces rare for Metro Manila condo developments.
                  </p>
                </div>
              </div>

              {/* Amenity Card 2: Community Mall */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EADBBD] shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative bg-stone-100">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/amenity-community-mall.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/20">
                    Integrated Retail Hub
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#241E15]">Deca Community Mall</h3>
                  <p className="text-xs text-[#544D40] mt-1.5 leading-relaxed">
                    Supermarket, dining options, laundry hubs, pharmacies, and daily service shops right on site. Complete your daily errands without getting into city traffic.
                  </p>
                </div>
              </div>

              {/* Amenity Card 3: Grand Clubhouse */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EADBBD] shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative bg-stone-100">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/amenity-clubhouse-exterior.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/20">
                    Social Celebrations
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#241E15]">Grand Multipurpose Clubhouse</h3>
                  <p className="text-xs text-[#544D40] mt-1.5 leading-relaxed">
                    Spacious air-conditioned halls and outdoor pavilions for family milestones, birthdays, corporate meetings, and community gatherings.
                  </p>
                </div>
              </div>

              {/* Amenity Card 4: Covered Basketball Court */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EADBBD] shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative bg-stone-100">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/amenity-basketball-court.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/20">
                    Active Recreation
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#241E15]">Covered Basketball Court</h3>
                  <p className="text-xs text-[#544D40] mt-1.5 leading-relaxed">
                    Standard regulation court shielded from both monsoon rains and midday sun for year-round sports, fitness training, and friendly tournaments.
                  </p>
                </div>
              </div>

              {/* Amenity Card 5: Children's Playground */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EADBBD] shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative bg-stone-100">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/amenity-playground.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/20">
                    Safe &amp; Soft Paved
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#241E15]">Children&apos;s Outdoor Playground</h3>
                  <p className="text-xs text-[#544D40] mt-1.5 leading-relaxed">
                    Equipped with soft-fall rubberized surfaces, slides, monkey bars, and swings set inside a vehicle-free gated zone protected from street traffic.
                  </p>
                </div>
              </div>

              {/* Amenity Card 6: 24/7 Gated Security & RFID */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EADBBD] shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative bg-stone-100">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/amenity-admin-office.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white px-2.5 py-0.5 rounded bg-emerald-600 text-white">
                    24/7 Gated Security
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#241E15]">RFID Boom Barriers &amp; CCTV</h3>
                  <p className="text-xs text-[#544D40] mt-1.5 leading-relaxed">
                    Round-the-clock security personnel, automated RFID gate access, perimeter security walls, and continuous CCTV coverage across all tower lobbies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. TECHNICAL SCHEMATICS & PLANS (WITH ZOOMABLE MODAL)        */}
        {/* ============================================================ */}
        <OrtigasInteractivePlans />

        {/* ============================================================ */}
        {/* 5. INTERACTIVE NEIGHBORHOOD MAP & COMMUTE GUIDE             */}
        {/* ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="location">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Commute Details & Proximity Tags (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-ochre-700 tracking-widest uppercase font-bold text-xs">
                  Unmatched Pasig Connectivity
                </span>
                <h2 className="font-editorial text-4xl lg:text-5xl font-semibold text-charcoal-900 mt-1">
                  Minutes to Key CBDs &amp; Transit
                </h2>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  Situated directly along Ortigas Avenue Extension in Rosario, Pasig City with rapid links to C-5, Amang Rodriguez, and East Bank Road. Enjoy effortless travel to Ortigas Center, Eastwood City, and Bonifacio Global City.
                </p>
              </div>

              {/* Proximity Time Cards */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-ochre-500/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-ochre-100 flex items-center justify-center text-ochre-800">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">SM City East Ortigas</h4>
                      <p className="text-[11px] text-gray-500">Groceries, retail &amp; department stores</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                    5 mins
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-ochre-500/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Eastwood City Cyberpark</h4>
                      <p className="text-[11px] text-gray-500">Major BPO business district &amp; dining</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold font-mono">
                    10–15 mins
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-ochre-500/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Ortigas Center CBD</h4>
                      <p className="text-[11px] text-gray-500">Megamall, Galleria &amp; corporate headquarters</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                    15–20 mins
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-ochre-500/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-800">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">The Medical City Pasig</h4>
                      <p className="text-[11px] text-gray-500">World-class tertiary medical institution</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-bold font-mono">
                    15 mins
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-ochre-500/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-800">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Bonifacio Global City (BGC)</h4>
                      <p className="text-[11px] text-gray-500">Direct transit via C-5 corridor</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold font-mono">
                    25–30 mins
                  </span>
                </div>
              </div>
            </div>

            {/* Stylized Interactive Visual Neighborhood Map (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl p-6 lg:p-8 text-white min-h-[460px] flex flex-col justify-between">
                {/* Map Background Stylized Vector Art */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="ortigas-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#ortigas-grid)" />
                  {/* Marikina / Pasig River waterway vector */}
                  <path d="M 0 120 Q 140 180 200 460 L 0 460 Z" fill="#0369a1" opacity="0.35" />
                  {/* Main Highways (Ortigas Ave Ext & C-5) */}
                  <path d="M 60 460 L 220 200 L 480 80" fill="none" stroke="#f59e0b" strokeWidth="4" opacity="0.8" />
                  <path d="M 120 0 L 160 460" fill="none" stroke="#f59e0b" strokeWidth="3" opacity="0.6" />
                  <path d="M 90 260 L 520 290" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.4" />
                </svg>

                {/* Top Map Meta */}
                <div className="relative z-10 flex justify-between items-center flex-wrap gap-2">
                  <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-semibold tracking-wider">PROJECT SITE: ORTIGAS AVE EXT., PASIG</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">14.5888° N, 121.0925° E</span>
                </div>

                {/* Stylized Map Pin Landmarks */}
                <div className="relative z-10 my-10 space-y-6">
                  {/* Target Project Pin */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ochre-500 to-amber-600 flex items-center justify-center text-charcoal-900 shadow-xl ring-4 ring-ochre-500/30">
                      <Building2 className="w-6 h-6 text-charcoal-900" />
                    </div>
                    <div className="bg-charcoal-800/90 backdrop-blur-md p-3 rounded-xl border border-ochre-500/40">
                      <span className="text-[10px] uppercase font-bold text-ochre-400 tracking-wider">You Are Here</span>
                      <p className="text-sm font-bold text-white">Urban Deca Homes Ortigas Sales Pavilion</p>
                      <p className="text-xs text-gray-300">Model units and completed Lagoon Park open for private tours</p>
                    </div>
                  </div>

                  {/* Surrounding Hotspots */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-cyan-400 font-mono">WEST CORRIDOR</span>
                      <p className="text-xs font-bold mt-0.5">Ortigas CBD &amp; C-5 Road</p>
                      <p className="text-[11px] text-gray-400">Direct UV Express and bus lines outside gate</p>
                    </div>
                    <div className="bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-amber-400 font-mono">EAST CORRIDOR</span>
                      <p className="text-xs font-bold mt-0.5">Rizal Growth Corridor &amp; C-6</p>
                      <p className="text-[11px] text-gray-400">Rapid access to Taytay, Cainta &amp; Antipolo</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Coordinates / Google Map Shortcut */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
                  <span className="text-gray-300">Sales Office Open Mon-Sat 9AM–5PM (Ortigas Ave Ext, Pasig)</span>
                  <a
                    className="inline-flex items-center gap-1.5 text-ochre-200 hover:text-white font-medium"
                    href="https://www.google.com/maps/dir/?api=1&destination=Urban+Deca+Homes+Ortigas,+Ortigas+Avenue+Extension,+Rosario,+Pasig"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Full Google Map Section */}
        <OrtigasGoogleMap />

        {/* ============================================================ */}
        {/* 6. NEIGHBORHOOD, SCHOOLS & HOSPITALS SLIDESHOWS              */}
        {/* ============================================================ */}
        <div className="bg-[#FAF5E6] border-y border-[#E8DEC4]">
          <ManilaSlideshow
            id="neighborhood"
            tag="Pasig & Ortigas Commercial Corridor"
            title="Neighborhood"
            subtitle="Discover premier retail centers, major CBD employment hubs, scenic riverfront developments, and transit terminals surrounding Urban Deca Homes Ortigas."
            items={ortigasNeighborhoodItems}
            officialGraphicUrl="/images/ortigas/vicinity-map.png"
            officialGraphicTitle="Ortigas Corridor Vicinity Map"
            themeIcon="neighborhood"
          />
        </div>

        <ManilaSlideshow
          id="schools-nearby"
          tag="Academic Centers & Universities"
          title="Schools Nearby"
          subtitle="Unmatched proximity to reputable Catholic colleges, prestigious international institutions, science high schools, and respected universities in Pasig."
          items={ortigasSchoolItems}
          officialGraphicUrl="/images/ortigas/location-map.png"
          officialGraphicTitle="Schools Location Map"
          themeIcon="schools"
        />

        <div className="bg-[#FAF5E6] border-y border-[#E8DEC4]">
          <ManilaSlideshow
            id="hospitals-nearby"
            tag="Healthcare & Medical Centers"
            title="Hospitals Nearby"
            subtitle="Direct access to 14 distinguished medical institutions, including JCI-accredited tertiary hospitals, specialized maternal clinics, and general health centers."
            items={ortigasHospitalItems}
            officialGraphicUrl="/images/ortigas/access-routes.png"
            officialGraphicTitle="Hospitals & Arterial Routes Map"
            themeIcon="hospitals"
          />
        </div>

        {/* ============================================================ */}
        {/* 7. DEDICATED SITE VISIT BOOKING MODULE                       */}
        {/* ============================================================ */}
        <section className="py-20 bg-gradient-to-b from-[#FAF4E2] to-[#F3E9CD] text-[#3E1C15] border-y border-[#E2D5B4] relative overflow-hidden" id="booking-drawer">
          {/* Decorative background seal */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-[#DFBD58]/20 pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[#CE2029] font-bold uppercase tracking-widest text-xs">
                Direct Developer Tour
              </span>
              <h2 className="font-logo text-4xl lg:text-5xl font-extrabold mt-1 text-[#3E1C15]">
                Book Your Actual Model Unit Viewing
              </h2>
              <p className="text-[#5C3D36] text-xs sm:text-sm mt-2 leading-relaxed">
                Experience the space firsthand. Our licensed in-house property advisors will guide you through actual finished deliverables, financing computation, and document processing.
              </p>
            </div>

            {/* Interactive Booking Form */}
            <OrtigasBookingForm />
          </div>
        </section>

        {/* Interactive Financing Calculator Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="calculator">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              Smart Mortgage Estimator
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-2">
              Calculate Your Monthly Amortization
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Customize your downpayment and loan tenure across Pag-IBIG Fund, commercial banks, or in-house developer financing.
            </p>
          </div>
          <FinancingCalculator initialPrice={2900000} initialProject="ortigas" />
        </section>

        {/* Lead Capture Form Section */}
        <section id="inquire" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <InquiryForm
            initialProject="ortigas"
            title="Inquire About Urban Deca Homes Ortigas"
            subtitle="Request a sample computation sheet for 2-bedroom units or check available building phases with our Pasig sales team."
          />
        </section>
      </>
      );
}
