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
} from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';
import ProjectCard from '@/components/ProjectCard';
import UnitComparison from '@/components/UnitComparison';
import FinancingCalculator from '@/components/FinancingCalculator';
import InquiryForm from '@/components/InquiryForm';
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

      {/* Trust & Accreditations Banner */}
      <section className="bg-charcoal-900 text-stone-300 py-6 border-y border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-gold-400">
                8990
              </span>
              <span className="text-xs text-stone-400 mt-0.5">
                Holdings, Inc. Developer
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-gold-400">
                ₱10,000
              </span>
              <span className="text-xs text-stone-400 mt-0.5">
                Low Reservation Fee
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-gold-400">
                Up to 30 Yrs
              </span>
              <span className="text-xs text-stone-400 mt-0.5">
                Pag-IBIG Loan Tenure
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-gold-400">
                100% RFO
              </span>
              <span className="text-xs text-stone-400 mt-0.5">
                Ready for Occupancy Options
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Condominium Developments */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full mb-3">
            <Building2 className="w-3.5 h-3.5 text-gold-600" />
            <span>Active Communities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Featured Metro Manila Condominium Projects
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Strategically located near major transit routes, business districts, and retail centers. Each community offers fully finished units ready for your family.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Why Choose Urban Deca Homes (Pillars) */}
      <section className="bg-stone-100/70 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              Price • Quality • Service
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-3">
              Why Everyday Filipinos Choose Urban Deca Homes
            </h2>
            <p className="text-stone-600 text-sm mt-3">
              Designed specifically to make quality condominium homeownership within reach of working families, BPO professionals, and OFWs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200 relative">
              <div className="w-12 h-12 rounded-xl gold-gradient text-charcoal-900 flex items-center justify-center mb-6 shadow">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                Unmatched Affordability & Low Cash-Out
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Unit reservations start from only ₱10,000, with monthly amortizations starting around ₱12,500/month via Pag-IBIG Fund. Low equity promotions allow buyers to allocate savings toward furnishings instead of prohibitive downpayments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200 relative">
              <div className="w-12 h-12 rounded-xl gold-gradient text-charcoal-900 flex items-center justify-center mb-6 shadow">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                Integrated Commercial Centers (DECA Mall)
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Both Urban Deca Homes Manila and Ortigas integrate dedicated commercial shopping strips and on-site DECA Malls. Residents enjoy immediate doorstep access to supermarkets, retail shops, dining, and daily household services.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200 relative">
              <div className="w-12 h-12 rounded-xl gold-gradient text-charcoal-900 flex items-center justify-center mb-6 shadow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                Accredited Pag-IBIG Documentation Team
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Avoid confusing red tape and bank bureaucracy. Our dedicated in-house documentation specialists assist you in compiling, evaluating, and submitting requirements directly to Pag-IBIG Fund for swift loan approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <UnitComparison />
      </section>

      {/* Interactive Financing Calculator Section */}
      <section id="calculator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FinancingCalculator />
      </section>

      {/* 4PH Housing Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

      {/* Buyer Testimonials & Real Stories */}
      <section className="bg-stone-100/60 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              Verified Homeowner Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-3">
              Hear From Our Community Residents
            </h2>
            <p className="text-stone-600 text-sm mt-3">
              Real stories from everyday Filipino homeowners who turned their dreams of city condo living into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-6">
                &ldquo;Dati nangungupahan lang kami sa Sampaloc na walang sariling paradahan at laging nag-aalala sa baha. Sa Urban Deca Homes Manila, nakakuha kami ng 2-bedroom unit sa Pag-IBIG na kasing presyo lang halos ng inuupahan namin noon. May mall pa sa baba!&rdquo;
              </p>
              <div>
                <span className="block text-sm font-bold text-charcoal-900">Eduardo & Marissa Ramos</span>
                <span className="block text-xs text-gold-700">Unit Owners • Urban Deca Homes Manila</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-6">
                &ldquo;Working in Ortigas CBD, I used to endure 2 to 3 hours of traffic everyday from Taytay. Having my own unit at Urban Deca Homes Ortigas along Ortigas Ave. Ext. gives me my weekends back. The 1.3-hectare park is peaceful and relaxing.&rdquo;
              </p>
              <div>
                <span className="block text-sm font-bold text-charcoal-900">Camille Anne Santos</span>
                <span className="block text-xs text-gold-700">BPO Team Leader • Urban Deca Homes Ortigas</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-6">
                &ldquo;As an OFW in Dubai, I wanted an investment along EDSA with guaranteed rental demand. Urban Deca Towers Cubao was affordable and the documentation through SPA was straightforward with the sales team.&rdquo;
              </p>
              <div>
                <span className="block text-sm font-bold text-charcoal-900">Rolando Dela Cruz</span>
                <span className="block text-xs text-gold-700">OFW Investor • Urban Deca Towers Cubao</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Conversion Inquiry Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <InquiryForm
          title="Reserve Your Unit or Request Free Computations"
          subtitle="Submit your details below to schedule a model unit viewing or receive an official Pag-IBIG computation sheet."
        />
      </section>

      {/* FAQ Preview Section */}
      <section className="bg-white py-20 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-3">
              Common Questions from Prospective Buyers
            </h2>
          </div>

          <div className="space-y-6">
            {previewFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
              >
                <h3 className="font-serif text-base font-bold text-charcoal-900">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/inquire-now"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold-800 hover:text-gold-900 hover:underline"
            >
              <span>View All Frequently Asked Questions & Financing Rules</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
