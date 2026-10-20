import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Building2,
  CheckCircle2,
  ShoppingBag,
  Waves,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Home,
  Check,
  Compass,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FinancingCalculator from '@/components/FinancingCalculator';
import InquiryForm from '@/components/InquiryForm';
import ViewingScheduler from '@/components/ViewingScheduler';
import JsonLd from '@/components/JsonLd';
import { getProjectBySlug } from '@/data/projects';
import { constructMetadata } from '@/lib/seo';
import { getProjectApartmentComplexSchema } from '@/lib/schema';

const project = getProjectBySlug('manila')!;

export const metadata: Metadata = constructMetadata({
  title: project.metaTitle,
  description: project.metaDescription,
  path: `/${project.slug}`,
  keywords: [
    'Urban Deca Homes Manila',
    'Condo in Tondo Manila',
    'Pag-IBIG condo Manila',
    'Rent to Own Manila',
    'Vitas Street Tondo condo',
    'Deca Mall Manila condo',
    'Affordable 2 bedroom condo Manila',
  ],
});

export default function ManilaProjectPage() {
  if (!project) notFound();

  return (
    <>
      <JsonLd data={getProjectApartmentComplexSchema(project)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: project.name, path: `/${project.slug}` }]} />

      {/* Project Hero Header */}
      <section className="relative bg-charcoal-950 text-white py-16 sm:py-24 border-b border-charcoal-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35]"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/80 to-charcoal-950/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-400 text-charcoal-900 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow">
              <Building2 className="w-3.5 h-3.5" />
              <span>{project.badge}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              {project.headline}
            </h1>

            <p className="flex items-center text-sm sm:text-base text-stone-200 mb-6">
              <MapPin className="w-4 h-4 mr-2 text-gold-400 flex-shrink-0" />
              <span>{project.location.address}</span>
            </p>

            <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-charcoal-900/90 border border-charcoal-700 max-w-xl mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                  Price Range (TCP)
                </span>
                <span className="text-xl font-bold text-white">
                  {project.priceRangeFormatted}
                </span>
              </div>
              <div className="border-l border-charcoal-700 pl-6">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                  Monthly (Pag-IBIG)
                </span>
                <span className="text-xl font-bold text-gold-400">
                  From ~₱12,500/mo
                </span>
              </div>
              <div className="border-l border-charcoal-700 pl-6">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                  Reservation Fee
                </span>
                <span className="text-base font-bold text-white">
                  ₱{project.reservationFeePhp.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#inquire"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition-all"
              >
                Inquire & View Pricing
              </a>
              <a
                href="#units"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-charcoal-800 hover:bg-charcoal-700 border border-stone-600 rounded-lg transition-all"
              >
                Explore 2-Bedroom Units
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview & Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
                Development Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
                Urban Waterfront Living in the Heart of Tondo
              </h2>
            </div>

            {project.overview.map((paragraph, index) => (
              <p key={index} className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Key Project Specs Table */}
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 grid grid-cols-2 gap-4">
              {project.specifications.map((spec) => (
                <div key={spec.label}>
                  <span className="text-xs font-medium text-stone-500 block">
                    {spec.label}
                  </span>
                  <span className="text-sm font-bold text-charcoal-900 block mt-0.5">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Turnkey Deliverables Checklist */}
            <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="font-serif text-base font-bold text-charcoal-900 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-gold-600" />
                <span>Move-In Ready Turnkey Deliverables</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-3.5 h-3.5 mr-1.5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Visual Showcase Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Community Photographs & Renderings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.galleryImages.map((img, idx) => (
                <div key={idx} className="group relative rounded-lg overflow-hidden bg-stone-100 shadow-sm border border-stone-200">
                  <div
                    className="h-44 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${img.url})` }}
                  />
                  <div className="p-2 bg-white text-[11px] text-stone-600 border-t border-stone-100">
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Viewing CTA Box */}
            <div className="p-5 rounded-xl gold-gradient text-charcoal-900 space-y-2 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider block">
                Free Site Tour Available
              </span>
              <h4 className="font-serif text-base font-bold">
                Visit Actual Model Units on Vitas St.
              </h4>
              <p className="text-xs text-charcoal-800 leading-normal">
                Our sales office is open Monday to Saturday from 9:00 AM to 5:00 PM for private model unit viewings.
              </p>
              <a
                href="#scheduler"
                className="inline-block mt-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-charcoal-900 text-white rounded hover:bg-charcoal-800 transition-colors"
              >
                Schedule Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Available Unit Floor Plans */}
      <section id="units" className="bg-stone-100/70 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              Floor Plans & Cuts
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
              Available Unit Categories & Specifications
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              All units are fully tiled and turn-key finished with private balconies and windows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.unitTypes.map((unit) => {
              const isSoldOut = unit.status === 'Sold Out';
              return (
                <div
                  key={unit.id}
                  className={`bg-white rounded-xl border p-6 flex flex-col justify-between shadow-sm ${
                    isSoldOut
                      ? 'opacity-60 border-stone-200 bg-stone-50/70'
                      : 'border-stone-200 hover:border-gold-400 hover:shadow-md transition-all'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-charcoal-900">
                          {unit.name}
                        </h3>
                        <span className="text-xs text-stone-500 font-medium">
                          {unit.bedrooms} Bedroom(s) • {unit.bathrooms} Toilet & Bath
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                          unit.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : unit.status === 'Limited Availability'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {unit.status}
                      </span>
                    </div>

                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs text-stone-500">Floor Area:</span>
                        <span className="text-sm font-bold text-charcoal-900">{unit.areaSqm} sq.m.</span>
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs text-stone-500">Price Range:</span>
                        <span className="text-sm font-bold text-charcoal-900">
                          ₱{(unit.priceMinPhp / 1000000).toFixed(2)}M – ₱{(unit.priceMaxPhp / 1000000).toFixed(2)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-stone-500">Est. Pag-IBIG:</span>
                        <span className="text-sm font-bold text-gold-700">
                          From ~₱{unit.estMonthlyPagIbigPhp.toLocaleString()}/mo
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {unit.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-bold uppercase text-stone-400 block">
                        Unit Inclusions:
                      </span>
                      {unit.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-center text-xs text-stone-600">
                          <Check className="w-3 h-3 text-gold-600 mr-1.5 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-stone-100">
                    {isSoldOut ? (
                      <span className="block text-center text-xs text-stone-400 font-medium py-2">
                        Unit Category Sold Out
                      </span>
                    ) : (
                      <a
                        href={`#inquire`}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-90 rounded-md shadow-sm transition-all"
                      >
                        <span>Reserve This Unit</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Amenities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
            Lifestyle Facilities
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
            Complete Community Amenities in Tondo
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Enjoy full resort lifestyle comforts, sports facilities, and shopping right within your secured gated community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.amenities.map((amenity) => (
            <div key={amenity.name} className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-charcoal-900 mb-3 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-charcoal-900" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                {amenity.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Location Proximity & Map Guide */}
      <section className="bg-stone-100/60 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
                  Strategic Proximity
                </span>
                <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
                  Minutes from Divisoria, Port Area & University Belt
                </h2>
                <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                  Located along Vitas Street, Urban Deca Homes Manila provides convenient access to Manila&apos;s commercial hubs, transit lines, and schools without long daily commutes.
                </p>
              </div>

              <div className="space-y-3">
                {project.location.landmarks.map((l) => (
                  <div key={l.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200 text-xs sm:text-sm">
                    <span className="font-semibold text-charcoal-900">{l.name}</span>
                    <span className="text-xs font-bold text-gold-800 bg-gold-50 px-2.5 py-1 rounded">
                      {l.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div id="scheduler">
                <ViewingScheduler />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Component */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FinancingCalculator initialPrice={2400000} initialProject="manila" />
      </section>

      {/* Lead Capture Form */}
      <section id="inquire" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <InquiryForm
          initialProject="manila"
          title="Inquire About Urban Deca Homes Manila"
          subtitle="Get an official computation sheet for 2-bedroom units or check available tower floors with our Tondo sales desk."
        />
      </section>
    </>
  );
}
