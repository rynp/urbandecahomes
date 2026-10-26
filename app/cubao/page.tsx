import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Building2,
  CheckCircle2,
  ShoppingBag,
  Zap,
  ArrowRight,
  Check,
  ArrowUpCircle,
  Train,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FinancingCalculator from '@/components/FinancingCalculator';
import InquiryForm from '@/components/InquiryForm';
import ViewingScheduler from '@/components/ViewingScheduler';
import JsonLd from '@/components/JsonLd';
import { getProjectBySlug } from '@/data/projects';
import { constructMetadata } from '@/lib/seo';
import { getProjectApartmentComplexSchema } from '@/lib/schema';
import CubaoGoogleMap from '@/components/cubao/CubaoGoogleMap';
import ManilaSlideshow from '@/components/manila/ManilaSlideshow';
import ManilaListingCards from '@/components/manila/ManilaListingCards';
import CubaoInteractivePlans from '@/components/cubao/CubaoInteractivePlans';
import {
  cubaoNeighborhoodItems,
  cubaoSchoolItems,
  cubaoHospitalItems,
  cubaoProjectFeatureItems,
  cubaoUnitSpecificationItems,
  cubaoFacilityItems,
} from '@/data/cubaoSectionsData';

const project = getProjectBySlug('cubao')!;

export const metadata: Metadata = constructMetadata({
  title: project.metaTitle,
  description: project.metaDescription,
  path: `/${project.slug}`,
  keywords: [
    'Urban Deca Towers Cubao',
    'Condo in Cubao Quezon City',
    'Studio condo in Cubao',
    'Condo along EDSA Cubao',
    'Affordable micro condo Manila',
    'Condo near MRT Cubao',
    'Araneta City condo',
  ],
});

export default function CubaoProjectPage() {
  if (!project) notFound();

  return (
    <>
      <JsonLd data={getProjectApartmentComplexSchema(project)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: project.name, path: `/${project.slug}` }]} />

      {/* Hero Banner */}
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
                  Studio Starting TCP
                </span>
                <span className="text-xl font-bold text-white">
                  From ~₱1,900,000
                </span>
              </div>
              <div className="border-l border-charcoal-700 pl-6">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                  Est. Monthly
                </span>
                <span className="text-xl font-bold text-gold-400">
                  From ~₱12,800/mo
                </span>
              </div>
              <div className="border-l border-charcoal-700 pl-6">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                  Elevators
                </span>
                <span className="text-base font-bold text-white">
                  12 High-Speed
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#inquire"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition-all"
              >
                Inquire on Available Units
              </a>
              <a
                href="#units"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-charcoal-800 hover:bg-charcoal-700 border border-stone-600 rounded-lg transition-all"
              >
                View Studio & 1-BR Floor Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Building Overview & Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
                Urban Micro-Living
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
                Live Steps from MRT-3 Cubao and Araneta City
              </h2>
            </div>

            {project.overview.map((paragraph, index) => (
              <p key={index} className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}

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

            <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="font-serif text-base font-bold text-charcoal-900 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-gold-600" />
                <span>Finished Studio & 1-Bedroom Inclusions</span>
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

          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Tower Renderings & Model Unit Gallery
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

            <div className="p-5 rounded-xl gold-gradient text-charcoal-900 space-y-2 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider block">
                Free Tower Viewing
              </span>
              <h4 className="font-serif text-base font-bold">
                Tour Actual Cubao Studio Units
              </h4>
              <p className="text-xs text-charcoal-800 leading-normal">
                Inspect high-floor skyline views and ergonomic studio layouts directly along EDSA.
              </p>
              <a
                href="#scheduler"
                className="inline-block mt-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-charcoal-900 text-white rounded hover:bg-charcoal-800 transition-colors"
              >
                Schedule Cubao Visit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Available Unit Cuts */}
      <section id="units" className="bg-stone-100/70 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              Micro-Living Configurations
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
              Available Studio & 1-Bedroom Units
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Tailored for young professionals and smart rental investors seeking prime transit accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {project.unitTypes.map((unit) => {
              const isSoldOut = unit.status === 'Sold Out';
              return (
                <div
                  key={unit.id}
                  className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:border-gold-400 hover:shadow-md transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-charcoal-900">
                          {unit.name}
                        </h3>
                        <span className="text-xs text-stone-500 font-medium">
                          {unit.bedrooms > 0 ? `${unit.bedrooms} Bedroom` : 'Open Studio'} • {unit.bathrooms} Bath
                        </span>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase bg-green-100 text-green-800">
                        {unit.status}
                      </span>
                    </div>

                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs text-stone-500">Floor Area:</span>
                        <span className="text-sm font-bold text-charcoal-900">{unit.areaSqm} sq.m.</span>
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs text-stone-500">
                          {unit.priceMaxPhp && unit.priceMaxPhp !== (unit.pricePhp ?? unit.priceMinPhp) ? 'Price Range:' : 'Price:'}
                        </span>
                        <span className="text-sm font-bold text-charcoal-900">
                          {unit.priceMaxPhp && unit.priceMaxPhp !== (unit.pricePhp ?? unit.priceMinPhp)
                            ? `₱${((unit.pricePhp ?? unit.priceMinPhp) / 1000000).toFixed(2)}M – ₱${(unit.priceMaxPhp / 1000000).toFixed(2)}M`
                            : `₱${((unit.pricePhp ?? unit.priceMinPhp) / 1000000).toFixed(2)}M`}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-stone-500">Est. Monthly:</span>
                        <span className="text-sm font-bold text-gold-700">
                          From ~₱{(unit.estMonthlyPagIbigPhp || Math.round(((unit.loanableBalancePhp || unit.pricePhp || unit.priceMinPhp || 0) * 0.00506685))).toLocaleString()}/mo
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {unit.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-bold uppercase text-stone-400 block">
                        Features:
                      </span>
                      {unit.features.map((f, i) => (
                        <div key={i} className="flex items-center text-xs text-stone-600">
                          <Check className="w-3 h-3 text-gold-600 mr-1.5 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-stone-100">
                    <a
                      href="#inquire"
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-90 rounded-md shadow-sm transition-all"
                    >
                      <span>Inquire About {unit.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Building Amenities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
            Tower Infrastructure
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
            Modern Facilities for Fast-Paced City Living
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Equipped with 12 elevators, commercial retail ground floors, and 100% emergency backup power.
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

      {/* PROJECT FEATURES SECTION */}
      <ManilaListingCards
        id="project-features"
        tag="46-Storey Skyscraper Amenities"
        title="Project Features"
        subtitle="Designed for dynamic urban life with high-density vertical engineering, commercial retail podiums, and robust community security."
        items={cubaoProjectFeatureItems}
        referenceGraphicUrl="/images/cubao/site-development-plan.png"
        referenceGraphicTitle="Cubao Tower Development Plan"
      />

      {/* UNIT SPECIFICATIONS SECTION */}
      <section className="bg-stone-100/60 border-y border-stone-200">
        <ManilaListingCards
          id="unit-specifications"
          tag="Turnkey Micro-Living Inclusions"
          title="Unit Specifications"
          subtitle="Every studio and 1-bedroom unit at Urban Deca Towers Cubao is delivered turnkey finished with vitrified tiles, granite kitchen counters, tiled bathrooms, and smoke sensors."
          items={cubaoUnitSpecificationItems}
          referenceGraphicUrl="/images/cubao/building-floor-plan.png"
          referenceGraphicTitle="Typical Floor Layout Schematic"
        />
      </section>

      {/* FACILITIES AND SERVICES SECTION */}
      <ManilaListingCards
        id="facilities-and-services"
        tag="Building Infrastructure & Systems"
        title="Facilities and Services"
        subtitle="Engineered with 12 high-speed passenger elevators, 100% emergency backup power (covering refrigerator and lighting per unit), 24/7 CCTV, and commercial laundry services."
        items={cubaoFacilityItems}
        referenceGraphicUrl="/images/cubao/facilities-overview.png"
        referenceGraphicTitle="Tower Facilities & Elevator Bank Schematic"
      />

      {/* SITE DEVELOPMENT PLAN, TYPICAL FLOOR PLAN, UNIT LAYOUT WITH ZOOM MODAL */}
      <CubaoInteractivePlans />

      {/* Transit & Landmarks */}
      <section className="bg-stone-100/60 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
                  Unbeatable EDSA Connectivity
                </span>
                <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
                  Direct Access to MRT-3 & LRT-2 Transit
                </h2>
                <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                  Located along EDSA corner Ignacio Diaz St. in Cubao, Quezon City. Walk directly to MRT-3 Cubao, Farmers Market, and Gateway Mall via covered pedestrian overpasses.
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

      {/* LOCATION GOOGLE MAP SECTION */}
      <CubaoGoogleMap />

      {/* NEIGHBORHOOD SLIDESHOW SECTION */}
      <div className="bg-stone-100/60 border-y border-stone-200">
        <ManilaSlideshow
          id="neighborhood"
          tag="EDSA & Araneta City Commercial Hub"
          title="Neighborhood"
          subtitle="Explore prime retail centers, entertainment arenas, dining capitals, and corporate BPO hubs within minutes of Urban Deca Towers Cubao."
          items={cubaoNeighborhoodItems}
          officialGraphicUrl="/images/cubao/neighborhood-map.png"
          officialGraphicTitle="Araneta City Vicinity Map"
          themeIcon="neighborhood"
        />
      </div>

      {/* SCHOOLS NEARBY SLIDESHOW SECTION */}
      <ManilaSlideshow
        id="schools-nearby"
        tag="Academic Centers & Universities"
        title="Schools Nearby"
        subtitle="Convenient access to top Quezon City and U-Belt colleges, preparatory schools, technological institutes, and transit-connected universities."
        items={cubaoSchoolItems}
        officialGraphicUrl="/images/cubao/schools-map.png"
        officialGraphicTitle="Academic Institutions Map"
        themeIcon="schools"
      />

      {/* HOSPITALS NEARBY SLIDESHOW SECTION */}
      <div className="bg-stone-100/60 border-y border-stone-200">
        <ManilaSlideshow
          id="hospitals-nearby"
          tag="Healthcare & Medical Centers"
          title="Hospitals Nearby"
          subtitle="Immediate proximity to world-class tertiary hospitals, specialty diagnostic centers, and healthcare complexes along EDSA and E. Rodriguez Ave."
          items={cubaoHospitalItems}
          officialGraphicUrl="/images/cubao/hospitals-map.png"
          officialGraphicTitle="Hospitals & Medical Centers Map"
          themeIcon="hospitals"
        />
      </div>

      {/* Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FinancingCalculator initialPrice={1900000} initialProject="cubao" />
      </section>

      {/* Lead Capture Form */}
      <section id="inquire" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <InquiryForm
          initialProject="cubao"
          title="Inquire About Urban Deca Towers Cubao"
          subtitle="Check available high-floor studio and 1-bedroom units or request an official computation sheet."
        />
      </section>
    </>
  );
}
