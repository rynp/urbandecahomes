import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Building2,
  CheckCircle2,
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
                13-Hectare Masterplanned Community • Pasig City
              </div>

              <h1 className="font-logo text-4xl sm:text-5xl xl:text-6xl text-[#3E1C15] font-extrabold tracking-tight leading-[1.08]">
                Spacious Suburban Living by the <span className="text-[#CE2029]">Ortigas CBD Corridor</span>.
              </h1>

              <p className="text-[#5C3D36] text-base leading-relaxed max-w-xl font-normal">
                Urban Deca Homes Ortigas redefines eastern Metro Manila living. A sprawling 13-hectare integrated community featuring 22 mid-rise buildings, 4 high-speed elevators per tower, a 1.3-hectare central Lagoon Park, and an on-site Deca Community Mall right along Ortigas Avenue Extension in Pasig City.
              </p>

              {/* Architectural Spec Strip / Project Stats Bar */}
              <div className="grid grid-cols-4 gap-3 py-4 border-y border-[#E8DAB7] bg-white/70 backdrop-blur-md rounded-xl px-4 shadow-sm">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#7A5B52] font-semibold">Masterplan</span>
                  <span className="text-lg font-bold text-[#3E1C15] tracking-tight">13.0 Ha</span>
                  <span className="block text-[11px] text-[#7A5B52]">Total Land Area</span>
                </div>
                <div className="border-l border-[#EADBBD] pl-3">
                  <span className="block text-[10px] uppercase tracking-widest text-[#7A5B52] font-semibold">Towers</span>
                  <span className="text-lg font-bold text-[#3E1C15] tracking-tight">22 Buildings</span>
                  <span className="block text-[11px] text-[#7A5B52]">4 Lifts Per Tower</span>
                </div>
                <div className="border-l border-[#EADBBD] pl-3">
                  <span className="block text-[10px] uppercase tracking-widest text-[#7A5B52] font-semibold">Turnover</span>
                  <span className="text-lg font-bold text-[#CE2029] tracking-tight">100% Turnkey</span>
                  <span className="block text-[11px] text-[#7A5B52]">Fully Finished Ready</span>
                </div>
                <div className="border-l border-[#EADBBD] pl-3">
                  <span className="block text-[10px] uppercase tracking-widest text-[#7A5B52] font-semibold">Status</span>
                  <span className="text-lg font-bold text-[#89B533] tracking-tight">RFO</span>
                  <span className="block text-[11px] text-[#7A5B52]">Ready for Occupancy</span>
                </div>
              </div>

              {/* Quick Pag-IBIG Estimator Box */}
              <div className="p-4 rounded-xl bg-white/90 border border-[#E8DAB7] shadow-md flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#CE2029] font-bold">
                    Quick Pag-IBIG Estimator
                  </span>
                  <div className="text-lg font-bold text-[#3E1C15] flex items-baseline gap-2">
                    <span>₱15,800</span>
                    <span className="text-xs text-[#6E4F47] font-normal">/ mo. starting amortization</span>
                  </div>
                  <p className="text-[11px] text-[#6E4F47]">
                    Estimated based on 30-year Pag-IBIG Fund loan for 2-Bedroom unit
                  </p>
                </div>
                <a
                  href="#units"
                  className="shrink-0 px-4 py-2.5 rounded-lg bg-[#FAF0C8] hover:bg-[#F5E3A3] text-[#8C5D08] font-bold text-xs tracking-wider uppercase border border-[#DFBD58] transition-all shadow-sm"
                >
                  Compare Units →
                </a>
              </div>

              {/* Trust badges row */}
              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-[#5C3D36]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CE2029]" />
                  <span>Pag-IBIG / Bank / In-House</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#CE2029]" />
                  <span>Perpetual Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-[#89B533]" />
                  <span>1.3-Ha Lagoon Park</span>
                </div>
              </div>
            </div>

            {/* Right Column: Immersive Editorial Architectural Photo Gallery Grid (6 cols) */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-12 gap-3.5 relative">
                {/* Large Main Building Exterior Feature */}
                <div className="col-span-12 relative rounded-2xl overflow-hidden group shadow-2xl border border-white/10 aspect-[16/9] bg-charcoal-900">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('/images/ortigas/hero.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                      Actual Masterplan Facade
                    </span>
                    <span className="px-2.5 py-1 rounded bg-ochre-500/90 text-charcoal-900 text-[11px] font-bold">
                      13-Hectare Gated Perimeter
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold">22 Mid-Rise Residences in Pasig</p>
                      <p className="text-gray-300 text-xs">Features 1.3-ha lagoon park, wide tree-lined walkways, and 4 lifts per tower</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-mono">
                      Phase 1 &amp; 2 RFO
                    </span>
                  </div>
                </div>

                {/* Thumbnail 1: Living Area */}
                <div className="col-span-4 relative rounded-xl overflow-hidden group border border-white/10 aspect-[4/3] bg-charcoal-900">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/model-unit-living.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white">
                    Tiled Living &amp; Dining
                  </span>
                </div>

                {/* Thumbnail 2: Kitchen Area */}
                <div className="col-span-4 relative rounded-xl overflow-hidden group border border-white/10 aspect-[4/3] bg-charcoal-900">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/model-unit-kitchen.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white">
                    Modular Kitchen Area
                  </span>
                </div>

                {/* Thumbnail 3: Turnkey Bathroom */}
                <div className="col-span-4 relative rounded-xl overflow-hidden group border border-white/10 aspect-[4/3] bg-charcoal-900">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('/images/ortigas/turnover-bathroom.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white">
                    Finished T&amp;B Fixtures
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. INTERACTIVE UNIT LAYOUT & FLOORPLAN SELECTOR             */}
      {/* ============================================================ */}
      <OrtigasUnitFloorplanSelector />

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
