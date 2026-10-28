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
import { getProjectBySlug } from '@/data/projects';
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

  const maxDiscountPhp = Math.max(
    ...(project.unitTypes?.map((u) => Number(u.discountPhp) || 0) || [0]),
    0
  );

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Content & Fast Stats (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CE2029]/10 border border-[#CE2029]/25 text-[#CE2029] text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#CE2029] animate-pulse" />
                {project.badge}
              </div>

              <h1 className="font-logo text-2xl sm:text-3xl lg:text-[34px] xl:text-4xl text-[#3E1C15] font-extrabold tracking-tight leading-[1.18] sm:leading-[1.15]">
                {project.headline}
              </h1>

              <p className="text-[#6E4F47] text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {project.tagline}
              </p>

              {/* Pricing, Reservation & Financing Highlights Container (Glassmorphism-Neumorphism UI/UX) */}
              <div className="rounded-2xl bg-gradient-to-br from-white/95 via-white/85 to-[#FAF5E6]/90 backdrop-blur-xl border border-white/90 shadow-[6px_6px_24px_rgba(74,30,23,0.06),-4px_-4px_16px_rgba(255,255,255,0.95),inset_0_1px_2px_rgba(255,255,255,1)] p-4 sm:p-5 space-y-4">
                {/* Top Row: Minimum TCP Starts at & Reservation Fee */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Left Column: Minimum TCP Starts at */}
                  <div className="sm:border-r sm:border-[#E8DAB7]/70 sm:shadow-[1px_0_0_rgba(255,255,255,0.9)] sm:pr-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF0C8] border border-[#DFBD58]/40 text-[#8C5D08] font-bold text-[10px] sm:text-[11px] tracking-wider uppercase font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(140,93,8,0.1)]">
                      Minimum TCP Starts at
                    </span>
                    <div className="text-2xl sm:text-[28px] font-extrabold text-[#3E1C15] tracking-tight mt-1 font-logo leading-tight">
                      <span className="text-sm font-semibold text-[#7A5B52] mr-1">From ~</span>
                      ₱{project.priceMinPhp.toLocaleString()}
                    </div>
                  </div>

                  {/* Right Column: Reservation for only */}
                  <div className="sm:pl-2">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A5B52] font-bold font-mono block">
                      Reservation for only
                    </span>
                    <div className="text-2xl sm:text-[28px] font-extrabold text-[#CE2029] tracking-tight mt-1 font-logo leading-tight">
                      ₱{project.reservationFeePhp.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Max Discount & Financing Accepted */}
                <div className="pt-3.5 border-t border-[#E8DAB7]/70 shadow-[0_1px_0_rgba(255,255,255,0.9)] grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Left Column: Discount as high as */}
                  <div className="border-l-3 border-[#CE2029] pl-3 sm:border-r sm:border-[#E8DAB7]/70 sm:shadow-[1px_0_0_rgba(255,255,255,0.9)] sm:pr-4">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A5B52] font-bold font-mono block">
                      Discount as high as
                    </span>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#3E1C15] tracking-tight mt-0.5 font-logo">
                      ₱{maxDiscountPhp.toLocaleString()}
                    </div>
                  </div>

                  {/* Right Column: Financing Accepted with Partner Logos */}
                  <div className="sm:pl-2">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A5B52] font-bold font-mono block mb-2">
                      Financing Accepted
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-[34px] h-[34px] rounded-xl bg-white p-1 flex items-center justify-center border border-[#EADBBD]/60 shadow-[2px_2px_6px_rgba(74,30,23,0.06),-2px_-2px_6px_rgba(255,255,255,0.95)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        <img
                          src="/images/partners/pag-ibig.svg"
                          alt="Pag-IBIG Fund"
                          title="Pag-IBIG Fund"
                          className="w-full h-full object-contain"
                          width={28}
                          height={28}
                        />
                      </div>
                      <div className="w-[34px] h-[34px] rounded-xl bg-white p-1 flex items-center justify-center border border-[#EADBBD]/60 shadow-[2px_2px_6px_rgba(74,30,23,0.06),-2px_-2px_6px_rgba(255,255,255,0.95)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        <img
                          src="/images/partners/security-bank.svg"
                          alt="Security Bank"
                          title="Security Bank"
                          className="w-full h-full object-contain"
                          width={28}
                          height={28}
                        />
                      </div>
                      <div className="w-[34px] h-[34px] rounded-xl bg-white p-1 flex items-center justify-center border border-[#EADBBD]/60 shadow-[2px_2px_6px_rgba(74,30,23,0.06),-2px_-2px_6px_rgba(255,255,255,0.95)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        <img
                          src="/images/partners/bpi.svg"
                          alt="BPI"
                          title="BPI"
                          className="w-full h-full object-contain"
                          width={28}
                          height={28}
                        />
                      </div>
                      <div className="w-[34px] h-[34px] rounded-xl bg-white p-1 flex items-center justify-center border border-[#EADBBD]/60 shadow-[2px_2px_6px_rgba(74,30,23,0.06),-2px_-2px_6px_rgba(255,255,255,0.95)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        <img
                          src="/images/partners/bdo.svg"
                          alt="BDO"
                          title="BDO"
                          className="w-full h-full object-contain"
                          width={28}
                          height={28}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Specifications Checklist */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#E8DAB7]/80 shadow-[0_4px_20px_-4px_rgba(74,30,23,0.06)] space-y-3">
                <div className="pb-2 border-b border-[#E8DAB7]/60">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A5B52] font-bold">
                    Project Specifications
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 pt-0.5">
                  {project.specifications.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`flex items-start gap-2.5 text-xs ${
                        index === project.specifications.length - 1 && project.specifications.length % 2 !== 0
                          ? 'sm:col-span-2'
                          : ''
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-[#CE2029]/10 border border-[#CE2029]/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#CE2029]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-[#7A5B52] font-semibold block leading-tight">
                          {spec.label}
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-[#3E1C15] leading-snug">
                          {spec.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Immersive Editorial Architectural Photo Gallery Grid (6 cols) */}
            <div className="lg:col-span-6">
              <OrtigasHeroGallery project={project} />
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
