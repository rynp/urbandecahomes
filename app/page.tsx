import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  BadgeCheck,
  Percent,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Waves,
  MapPin,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';
import ProjectCard from '@/components/ProjectCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/JsonLd';
import { projects } from '@/data/projects';
import { globalFaqs } from '@/data/faqs';
import { businessInfo } from '@/data/business';
import { constructMetadata } from '@/lib/seo';
import { getFaqSchema } from '@/lib/schema';

export const metadata: Metadata = constructMetadata({
  title: 'Urban Deca Homes Philippines | Affordable Condominium Developments',
  description:
    'Explore Urban Deca Homes developments in Manila, Ortigas, and Cubao. Learn about available 2-bedroom and studio units, Pag-IBIG financing options, and property inquiries.',
  path: '/',
});

export default function HomePage() {
  const previewFaqs = globalFaqs.slice(0, 5);

  return (
    <>
      <JsonLd data={getFaqSchema(previewFaqs)} />

      {/* Hero Section */}
      <HeroVideo />

      {/* Featured Condominium Developments */}
      <section id="featured-projects" className="pt-10 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-left max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#CE2029] bg-[#CE2029]/10 border border-[#CE2029]/20 px-3.5 py-1.5 rounded-full mb-3 font-logo">
            <Building2 className="w-3.5 h-3.5 text-[#CE2029]" />
            <span>Units Ready - For You!</span>
          </div>
          <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E1C15] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-[#5C3D36] text-xs sm:text-sm mt-2 sm:mt-3 whitespace-nowrap truncate sm:whitespace-normal">
            Fully finished, move-in ready condos across Metro Manila.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5 xl:gap-8 items-start">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 100,000+ Families Housed Social Proof Banner (Moved below Featured Projects) */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EADBBD] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CE2029] to-[#B51B23] text-white flex items-center justify-center flex-shrink-0 shadow">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-logo text-lg font-extrabold text-[#3E1C15]">
                100,000+ Filipino Families Housed Nationwide
              </h4>
              <p className="text-xs text-[#5C3D36] mt-0.5">
                Join our flourishing communities across Metro Manila. Low reservations, flexible Pag-IBIG terms, and doorstep retail centers.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-3 w-full md:w-auto">
            <Link
              href="/inquire-now"
              className="w-full md:w-auto btn-futuristic inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-md shadow-[#CE2029]/25 transition-all transform hover:-translate-y-0.5 font-logo"
            >
              <span>Share Inquiries</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Urban Deca Homes (Pillars) */}
      <section className="bg-gradient-to-b from-[#FAF5E6]/90 via-[#FAF8F2] to-[#FAF5E6]/90 py-16 sm:py-20 border-y border-[#EADBBD] relative overflow-hidden cyber-grid-light">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#CE2029]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#FAF0C8] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#EADBBD] shadow-2xs text-[#CE2029] text-xs font-bold uppercase tracking-widest mb-3.5 font-logo">
              <Sparkles className="w-3.5 h-3.5 text-[#CE2029]" />
              <span>Pride • Quality • Service</span>
            </div>
            <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E1C15] tracking-tight leading-tight">
              Why Everyday Filipinos Choose Urban Deca Homes
            </h2>
            <p className="text-[#5C3D36] text-sm sm:text-base mt-3.5 leading-relaxed max-w-2xl mx-auto">
              Designed specifically to make quality condominium homeownership within reach of working families, BPO professionals, and OFWs with move-in ready ease.
            </p>
          </div>

          {/* 3 Immersive Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Affordability */}
            <div className="group relative rounded-3xl bg-white border border-[#EADBBD] shadow-md hover:shadow-xl hover:border-[#D4B455] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
              <div>
                {/* Visual Image Stage */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-charcoal-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[1.05]"
                    style={{ backgroundImage: `url('/images/features/affordability-consultation.png')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/20 to-black/30" />

                  {/* Top Floating Feature Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-charcoal-950/85 backdrop-blur-md text-white border border-white/15 shadow-sm inline-flex items-center space-x-1.5 font-logo">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CE2029] animate-pulse" />
                      <span>₱10,000 Reservation</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF0C8] bg-charcoal-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20 font-logo">
                      01
                    </span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <span className="text-xs font-semibold text-white/90 drop-shadow">
                      Fully Finished Turnkey Living
                    </span>
                  </div>
                </div>

                {/* Floating Icon Badge overlapping junction */}
                <div className="relative -mt-6 ml-6 z-20">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CE2029] to-[#B51B23] text-white flex items-center justify-center shadow-lg shadow-[#CE2029]/35 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Percent className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="px-6 pt-3 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#CE2029] block mb-1 font-logo">
                    Financing Advantage
                  </span>
                  <h3 className="font-logo text-xl sm:text-[22px] font-extrabold text-[#3E1C15] mb-2.5 group-hover:text-[#CE2029] transition-colors leading-snug">
                    Unmatched Affordability &amp; Low Cash-Out
                  </h3>
                  <p className="text-[#5C3D36] text-xs sm:text-[13px] leading-relaxed mb-4">
                    Unit reservations start from only ₱10,000, with monthly amortizations starting around ₱12,500/month via Pag-IBIG Fund. Low equity promotions allow buyers to allocate savings toward furnishings instead of prohibitive downpayments.
                  </p>

                  {/* Scannable Micro-Pills */}
                  <div className="flex flex-wrap gap-1.5 font-logo">
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      ₱10,000 Reservation
                    </span>
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      From ~₱12.5k/mo
                    </span>
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      Up to 30-Yr Terms
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-3">
                <Link
                  href="/inquire-now"
                  className="w-full inline-flex items-center justify-between pt-3.5 border-t border-[#EADBBD] text-xs font-bold uppercase tracking-wider text-[#3E1C15] hover:text-[#CE2029] transition-colors font-logo"
                >
                  <span>Request Official Computation</span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF5E6] text-[#3E1C15] group-hover:bg-[#CE2029] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Card 2: Commercial Centers */}
            <div className="group relative rounded-3xl bg-white border border-[#EADBBD] shadow-md hover:shadow-xl hover:border-[#D4B455] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
              <div>
                {/* Visual Image Stage */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-charcoal-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[1.05]"
                    style={{ backgroundImage: `url('/images/features/commercial-mall-lifestyle.png')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/20 to-black/30" />

                  {/* Top Floating Feature Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-charcoal-950/85 backdrop-blur-md text-white border border-white/15 shadow-sm inline-flex items-center space-x-1.5 font-logo">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EBA226] animate-pulse" />
                      <span>On-Site DECA Mall</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF0C8] bg-charcoal-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20 font-logo">
                      02
                    </span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <span className="text-xs font-semibold text-white/90 drop-shadow">
                      Doorstep Supermarkets &amp; Dining
                    </span>
                  </div>
                </div>

                {/* Floating Icon Badge overlapping junction */}
                <div className="relative -mt-6 ml-6 z-20">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EBA226] to-[#CE2029] text-white flex items-center justify-center shadow-lg shadow-[#EBA226]/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="px-6 pt-3 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#EBA226] block mb-1 font-logo">
                    Lifestyle Convenience
                  </span>
                  <h3 className="font-logo text-xl sm:text-[22px] font-extrabold text-[#3E1C15] mb-2.5 group-hover:text-[#CE2029] transition-colors leading-snug">
                    Integrated Commercial Centers (DECA Mall)
                  </h3>
                  <p className="text-[#5C3D36] text-xs sm:text-[13px] leading-relaxed mb-4">
                    Both Urban Deca Homes Manila and Ortigas integrate dedicated commercial shopping strips and on-site DECA Malls. Residents enjoy immediate doorstep access to supermarkets, retail shops, dining, and daily household services.
                  </p>

                  {/* Scannable Micro-Pills */}
                  <div className="flex flex-wrap gap-1.5 font-logo">
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      0 Mins Footbridge
                    </span>
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      Supermarket &amp; Retail
                    </span>
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      Restaurants &amp; Cafes
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-3">
                <Link
                  href="/manila"
                  className="w-full inline-flex items-center justify-between pt-3.5 border-t border-[#EADBBD] text-xs font-bold uppercase tracking-wider text-[#3E1C15] hover:text-[#CE2029] transition-colors font-logo"
                >
                  <span>Explore Mall &amp; Amenities</span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF5E6] text-[#3E1C15] group-hover:bg-[#CE2029] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Card 3: Pag-IBIG Documentation */}
            <div className="group relative rounded-3xl bg-white border border-[#EADBBD] shadow-md hover:shadow-xl hover:border-[#D4B455] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
              <div>
                {/* Visual Image Stage */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-charcoal-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[1.05]"
                    style={{ backgroundImage: `url('/images/features/pagibig-documentation.png')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/20 to-black/30" />

                  {/* Top Floating Feature Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-charcoal-950/85 backdrop-blur-md text-white border border-white/15 shadow-sm inline-flex items-center space-x-1.5 font-logo">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Accredited Pag-IBIG Team</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF0C8] bg-charcoal-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20 font-logo">
                      03
                    </span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <span className="text-xs font-semibold text-white/90 drop-shadow">
                      Hassle-Free In-House Processing
                    </span>
                  </div>
                </div>

                {/* Floating Icon Badge overlapping junction */}
                <div className="relative -mt-6 ml-6 z-20">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A1E17] to-[#3E1C15] text-[#FAF0C8] border border-[#CE2029]/30 flex items-center justify-center shadow-lg shadow-black/35 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6 text-[#FAF0C8]" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="px-6 pt-3 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A1E17] block mb-1 font-logo">
                    Hassle-Free Processing
                  </span>
                  <h3 className="font-logo text-xl sm:text-[22px] font-extrabold text-[#3E1C15] mb-2.5 group-hover:text-[#CE2029] transition-colors leading-snug">
                    Accredited Pag-IBIG Documentation Team
                  </h3>
                  <p className="text-[#5C3D36] text-xs sm:text-[13px] leading-relaxed mb-4">
                    Avoid confusing red tape and bank bureaucracy. Our dedicated in-house documentation specialists assist you in compiling, evaluating, and submitting requirements directly to Pag-IBIG Fund for swift loan approval.
                  </p>

                  {/* Scannable Micro-Pills */}
                  <div className="flex flex-wrap gap-1.5 font-logo">
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      Direct Pag-IBIG Link
                    </span>
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      SPA Assistance for OFWs
                    </span>
                    <span className="text-[11px] font-semibold text-[#3E1C15] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD]">
                      Step-by-Step Approval
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-3">
                <Link
                  href="/inquire-now"
                  className="w-full inline-flex items-center justify-between pt-3.5 border-t border-[#EADBBD] text-xs font-bold uppercase tracking-wider text-[#3E1C15] hover:text-[#CE2029] transition-colors font-logo"
                >
                  <span>Request Loan Assistance</span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF5E6] text-[#3E1C15] group-hover:bg-[#CE2029] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Testimonials & Real Stories Component */}
      <TestimonialsSection />

      {/* 4PH Housing Banner */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-[#FAF0C8] via-[#FAF5E6] to-[#FAF0C8] border border-[#EADBBD] p-8 sm:p-12 text-[#3E1C15] flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#3E1C15] text-[#FAF0C8] text-xs font-bold uppercase tracking-wider rounded-full font-logo">
              National Housing Program
            </span>
            <h3 className="font-logo text-2xl sm:text-3xl font-extrabold tracking-tight text-[#3E1C15]">
              Pambansang Pabahay para sa Pilipino (4PH) at Urban Deca Homes
            </h3>
            <p className="text-sm sm:text-base text-[#5C3D36] leading-relaxed font-medium">
              Qualified minimum-wage earners and entry-level employees can avail of subsidized interest rates and extended Pag-IBIG loan terms at Urban Deca Homes Manila in Tondo.
            </p>
          </div>

          <Link
            href="/4ph"
            className="flex-shrink-0 inline-flex items-center px-8 py-4 text-xs font-bold uppercase tracking-wider bg-[#CE2029] text-white hover:bg-[#B51B23] rounded-xl shadow transition-all transform hover:-translate-y-0.5 font-logo shadow-[#CE2029]/25"
          >
            <span>Learn About 4PH Program</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* FAQ Preview Section - Light Theme matching Brand Palette */}
      <section className="bg-gradient-to-b from-[#FAF8F2] via-[#FAF5E6]/50 to-[#FAF8F2] py-20 sm:py-24 border-t border-[#EADBBD] relative overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 cyber-grid-light opacity-25 pointer-events-none" />

        {/* Ambient Warm Glows */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gradient-to-br from-[#FAF0C8]/40 via-[#FAF5E6]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[540px] h-[540px] bg-gradient-to-tl from-[#e8cf7b]/20 via-[#d4b455]/10 to-transparent rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#EADBBD] shadow-xs mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CE2029] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#CE2029] font-logo">
                Knowledge Base &amp; Buyer Guide
              </span>
            </div>
            <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E1C15] tracking-tight leading-tight">
              Frequently Ask Questions (FAQ)
            </h2>
            <p className="text-[#5C3D36] text-sm sm:text-base mt-3.5 max-w-2xl mx-auto leading-relaxed">
              Clear guidance on unit reservations, Pag-IBIG loan approvals, turnover timelines, and monthly amortizations.
            </p>
          </div>

          <FaqAccordion items={previewFaqs} />

          <div className="text-center mt-12 sm:mt-14">
            <Link
              href="/inquire-now"
              className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#CE2029] hover:bg-[#B51B23] border border-[#CE2029] text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#CE2029]/25 hover:shadow-2xl hover:shadow-[#CE2029]/35 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] font-logo"
            >
              <span className="relative z-10">Explore All FAQs &amp; Financing Guidelines</span>
              <ArrowRight className="relative z-10 w-4 h-4 text-white transition-all duration-300 transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
