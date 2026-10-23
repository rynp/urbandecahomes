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
import UnitComparison from '@/components/UnitComparison';
import FinancingCalculator from '@/components/FinancingCalculator';
import InquiryForm from '@/components/InquiryForm';
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
      <section className="pt-10 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-left max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#eb6753] bg-[#eb6753]/10 border border-[#eb6753]/20 px-3.5 py-1.5 rounded-full mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#eb6753]" />
            <span>Active Metro Manila Communities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 tracking-tight">
            Featured Projects in Metro Manila
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3 whitespace-nowrap truncate sm:whitespace-normal">
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

      {/* Unit Comparison Section */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <UnitComparison />
      </section>

      {/* Interactive Financing Calculator Section */}
      <section id="calculator" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <FinancingCalculator />
      </section>

      {/* Main Conversion Inquiry Form Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-gradient-to-r from-[#eb6753]/10 via-gold-400/10 to-[#eb6753]/10 rounded-full blur-3xl pointer-events-none" />
        <InquiryForm
          title="Reserve Your Unit or Request Free Computations"
          subtitle="Submit your details below to schedule a model unit viewing or receive an official Pag-IBIG computation sheet."
        />
      </section>


      {/* Buyer Testimonials & Real Stories Component */}
      <TestimonialsSection />

      {/* Why Choose Urban Deca Homes (Pillars) */}
      <section className="bg-gradient-to-b from-stone-100/90 via-stone-50/60 to-stone-100/90 py-16 sm:py-20 border-y border-stone-200/90 relative overflow-hidden cyber-grid-light">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#eb6753]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#e8cf7b]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-2xs text-[#eb6753] text-xs font-bold uppercase tracking-widest mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Price • Quality • Service</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 tracking-tight leading-tight">
              Why Everyday Filipinos Choose Urban Deca Homes
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3.5 leading-relaxed max-w-2xl mx-auto">
              Designed specifically to make quality condominium homeownership within reach of working families, BPO professionals, and OFWs with move-in ready ease.
            </p>
          </div>

          {/* 3 Immersive Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Affordability */}
            <div className="group relative rounded-3xl bg-white border border-stone-200/90 shadow-md hover:shadow-2xl hover:border-charcoal-800 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              {/* Outer Ambient Hover Glow Backdrop */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-charcoal-700/20 via-gold-400/25 to-[#eb6753]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />

              <div>
                {/* Visual Image Stage */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-charcoal-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[1.05]"
                    style={{ backgroundImage: `url('/images/ortigas/model-unit-living.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/20 to-black/30" />

                  {/* Top Floating Feature Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-charcoal-950/85 backdrop-blur-md text-white border border-white/15 shadow-sm inline-flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eb6753] animate-pulse" />
                      <span>₱10,000 Reservation</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 bg-charcoal-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-gold-400/30">
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
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#eb6753] to-[#d85542] text-white flex items-center justify-center shadow-lg shadow-[#eb6753]/35 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Percent className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="px-6 pt-3 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#eb6753] block mb-1">
                    Financing Advantage
                  </span>
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-charcoal-900 mb-2.5 group-hover:text-charcoal-950 transition-colors leading-snug">
                    Unmatched Affordability &amp; Low Cash-Out
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4">
                    Unit reservations start from only ₱10,000, with monthly amortizations starting around ₱12,500/month via Pag-IBIG Fund. Low equity promotions allow buyers to allocate savings toward furnishings instead of prohibitive downpayments.
                  </p>

                  {/* Scannable Micro-Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      ₱10,000 Reservation
                    </span>
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      From ~₱12.5k/mo
                    </span>
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      Up to 30-Yr Terms
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-3">
                <Link
                  href="/#calculator"
                  className="w-full inline-flex items-center justify-between pt-3.5 border-t border-stone-100 text-xs font-bold uppercase tracking-wider text-charcoal-900 group-hover:text-charcoal-950 transition-colors"
                >
                  <span>Estimate Monthly Amort</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 group-hover:bg-charcoal-900 group-hover:text-gold-400 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Card 2: Commercial Centers */}
            <div className="group relative rounded-3xl bg-white border border-stone-200/90 shadow-md hover:shadow-2xl hover:border-charcoal-800 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              {/* Outer Ambient Hover Glow Backdrop */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-charcoal-700/20 via-gold-400/25 to-[#eb6753]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />

              <div>
                {/* Visual Image Stage */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-charcoal-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[1.05]"
                    style={{ backgroundImage: `url('/images/manila/community-mall.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/20 to-black/30" />

                  {/* Top Floating Feature Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-charcoal-950/85 backdrop-blur-md text-white border border-white/15 shadow-sm inline-flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                      <span>On-Site DECA Mall</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 bg-charcoal-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-gold-400/30">
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
                  <div className="w-12 h-12 rounded-2xl gold-gradient text-charcoal-950 flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShoppingBag className="w-6 h-6 text-charcoal-950" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="px-6 pt-3 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 block mb-1">
                    Lifestyle Convenience
                  </span>
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-charcoal-900 mb-2.5 group-hover:text-charcoal-950 transition-colors leading-snug">
                    Integrated Commercial Centers (DECA Mall)
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4">
                    Both Urban Deca Homes Manila and Ortigas integrate dedicated commercial shopping strips and on-site DECA Malls. Residents enjoy immediate doorstep access to supermarkets, retail shops, dining, and daily household services.
                  </p>

                  {/* Scannable Micro-Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      0 Mins Footbridge
                    </span>
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      Supermarket &amp; Retail
                    </span>
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      Restaurants &amp; Cafes
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-3">
                <Link
                  href="/manila"
                  className="w-full inline-flex items-center justify-between pt-3.5 border-t border-stone-100 text-xs font-bold uppercase tracking-wider text-charcoal-900 group-hover:text-charcoal-950 transition-colors"
                >
                  <span>Explore Mall &amp; Amenities</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 group-hover:bg-charcoal-900 group-hover:text-gold-400 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Card 3: Pag-IBIG Documentation */}
            <div className="group relative rounded-3xl bg-white border border-stone-200/90 shadow-md hover:shadow-2xl hover:border-charcoal-800 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              {/* Outer Ambient Hover Glow Backdrop */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-charcoal-700/20 via-gold-400/25 to-[#eb6753]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />

              <div>
                {/* Visual Image Stage */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-charcoal-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[1.05]"
                    style={{ backgroundImage: `url('/images/ortigas/amenity-admin-office.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/20 to-black/30" />

                  {/* Top Floating Feature Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-charcoal-950/85 backdrop-blur-md text-white border border-white/15 shadow-sm inline-flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Accredited Pag-IBIG Team</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 bg-charcoal-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-gold-400/30">
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
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-charcoal-800 to-charcoal-950 text-gold-400 border border-gold-400/30 flex items-center justify-center shadow-lg shadow-black/35 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6 text-gold-400" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="px-6 pt-3 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-700 block mb-1">
                    Hassle-Free Processing
                  </span>
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-charcoal-900 mb-2.5 group-hover:text-charcoal-950 transition-colors leading-snug">
                    Accredited Pag-IBIG Documentation Team
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4">
                    Avoid confusing red tape and bank bureaucracy. Our dedicated in-house documentation specialists assist you in compiling, evaluating, and submitting requirements directly to Pag-IBIG Fund for swift loan approval.
                  </p>

                  {/* Scannable Micro-Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      Direct Pag-IBIG Link
                    </span>
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      SPA Assistance for OFWs
                    </span>
                    <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/80">
                      Step-by-Step Approval
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-3">
                <Link
                  href="/inquire-now"
                  className="w-full inline-flex items-center justify-between pt-3.5 border-t border-stone-100 text-xs font-bold uppercase tracking-wider text-charcoal-900 group-hover:text-charcoal-950 transition-colors"
                >
                  <span>Request Loan Assistance</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 group-hover:bg-charcoal-900 group-hover:text-gold-400 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100,000+ Families Housed Social Proof Banner */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl gold-gradient text-charcoal-900 flex items-center justify-center flex-shrink-0 shadow">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-charcoal-900">
                100,000+ Filipino Families Housed Nationwide
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Join our flourishing communities across Metro Manila. Low reservations, flexible Pag-IBIG terms, and doorstep retail centers.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-3 w-full md:w-auto">
            <Link
              href="/inquire-now"
              className="w-full md:w-auto btn-futuristic inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#d85542] rounded-xl shadow-md shadow-[#eb6753]/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Share Inquiries</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4PH Housing Banner */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl gold-gradient p-8 sm:p-12 text-charcoal-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-charcoal-900 text-gold-400 text-xs font-bold uppercase tracking-wider rounded-full">
              National Housing Program
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Pambansang Pabahay para sa Pilipino (4PH) at Urban Deca Homes
            </h3>
            <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-medium">
              Qualified minimum-wage earners and entry-level employees can avail of subsidized interest rates and extended Pag-IBIG loan terms at Urban Deca Homes Manila in Tondo.
            </p>
          </div>

          <Link
            href="/4ph"
            className="flex-shrink-0 inline-flex items-center px-8 py-4 text-xs font-bold uppercase tracking-wider bg-charcoal-900 text-white hover:bg-charcoal-800 rounded-lg shadow transition-all transform hover:-translate-y-0.5"
          >
            <span>Learn About 4PH Program</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* FAQ Preview Section - Dark Theme with Animated Mesh Gradient */}
      <section className="bg-[#0c0c10] py-20 sm:py-24 border-t border-white/10 relative overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Dynamic Multi-Stop Animated Gradient Mesh */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gradient-to-br from-[#eb6753]/25 via-[#eb6753]/10 to-transparent rounded-full blur-[100px] animate-gradient-shift pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[540px] h-[540px] bg-gradient-to-tl from-[#e8cf7b]/20 via-[#d4b455]/10 to-transparent rounded-full blur-[110px] animate-gradient-shift-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial from-[#eb6753]/10 via-transparent to-transparent rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb6753] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Common Questions from Prospective Buyers
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-3.5 max-w-2xl mx-auto leading-relaxed">
              Clear guidance on unit reservations, Pag-IBIG loan approvals, turnover timelines, and monthly amortizations.
            </p>
          </div>

          <FaqAccordion items={previewFaqs} />

          <div className="text-center mt-12 sm:mt-14">
            <Link
              href="/inquire-now"
              className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#181820] hover:bg-[#eb6753] border border-white/15 hover:border-[#eb6753] text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-black/40 hover:shadow-[0_0_35px_rgba(235,103,83,0.65),0_0_15px_rgba(235,103,83,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md overflow-hidden"
            >
              {/* Subtle light shimmer sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              <span className="relative z-10">Explore All FAQs &amp; Financing Guidelines</span>
              <ArrowRight className="relative z-10 w-4 h-4 text-gold-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
