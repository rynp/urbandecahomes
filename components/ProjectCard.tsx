'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Home, CheckCircle2, Bed, Bath, Ruler, ChevronDown } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showAllDeliverables, setShowAllDeliverables] = useState(false);
  const availableUnits = project.unitTypes.filter((u) => u.status !== 'Sold Out');
  const lowestMonthly = Math.min(...availableUnits.map((u) => u.estMonthlyPagIbigPhp));

  // Data-driven specifications
  const minBeds = Math.min(...availableUnits.map((u) => u.bedrooms));
  const maxBeds = Math.max(...availableUnits.map((u) => u.bedrooms));
  const bedDisplay =
    minBeds === maxBeds ? `${minBeds} bed` : `${minBeds} - ${maxBeds} bed`;

  const minBaths = Math.min(...availableUnits.map((u) => u.bathrooms));
  const maxBaths = Math.max(...availableUnits.map((u) => u.bathrooms));
  const bathDisplay =
    minBaths === maxBaths ? `${minBaths} bath` : `${minBaths} - ${maxBaths} bath`;

  const minArea = Math.min(...availableUnits.map((u) => u.areaSqm));
  const maxArea = Math.max(...availableUnits.map((u) => u.areaSqm));
  const areaDisplay =
    minArea === maxArea ? `${minArea} sqm` : `${minArea} - ${maxArea} sqm`;

  return (
    <article className="futuristic-card cyber-corner bg-white rounded-2xl shadow-lg border border-stone-200/90 overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:border-gold-400/50 self-start">
      {/* Property Visual Header */}
      <div className="relative h-64 w-full overflow-hidden bg-charcoal-900">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        {/* Futuristic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/30 to-transparent pointer-events-none" />

        {/* Top Badges (Preserved for later use) */}
        {/*
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 text-[11px] font-black uppercase tracking-wider text-charcoal-950 gold-gradient rounded-full shadow-md flex items-center space-x-1">
              <span>{project.badge}</span>
            </span>
          </div>
        </div>
        */}

        {/* Bottom Card Title & Location */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md group-hover:text-gold-300 transition-colors">
            {project.name}
          </h3>
          <p className="flex items-center text-xs text-stone-300 mt-1.5">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#eb6753] flex-shrink-0 animate-pulse" />
            <span className="truncate">{project.location.address}</span>
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white to-stone-50/60">
        {/* Pricing Highlights in Futuristic Glass Box */}
        <div className="p-3.5 rounded-xl bg-stone-100/70 border border-stone-200/80 backdrop-blur-sm space-y-2">
          {/* Contract Price Block */}
          <div>
            {/* Header Line: Label on Left, Financing Logos on Right */}
            <div className="flex items-center justify-between relative">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                Contract Price (TCP)
              </span>

              {/* Financing Partner Logos: overlapping top, zero effect on label container height */}
              <div className="flex items-center gap-1.5 flex-shrink-0 -mt-2.5 -mr-0.5">
                <img
                  src="/images/partners/security-bank.svg"
                  alt="Security Bank"
                  title="Security Bank"
                  className="w-5 h-5 rounded object-contain shadow-2xs badge-seq-sec hover:scale-110 transition-transform"
                  width={20}
                  height={20}
                />
                <img
                  src="/images/partners/bpi.svg"
                  alt="BPI"
                  title="BPI"
                  className="w-5 h-5 rounded object-contain shadow-2xs badge-seq-bpi hover:scale-110 transition-transform"
                  width={20}
                  height={20}
                />
                <img
                  src="/images/partners/bdo.svg"
                  alt="BDO"
                  title="BDO"
                  className="w-5 h-5 rounded object-contain shadow-2xs badge-seq-bdo hover:scale-110 transition-transform"
                  width={20}
                  height={20}
                />
                <img
                  src="/images/partners/pag-ibig.svg"
                  alt="Pag-IBIG Fund"
                  title="Pag-IBIG Fund"
                  className="w-5 h-5 rounded object-contain shadow-2xs badge-seq-pag hover:scale-110 transition-transform"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            {/* Price Value: Proportional top and bottom spacing */}
            <span className="text-base sm:text-lg font-extrabold text-charcoal-900 block leading-tight mt-2.5 sm:mt-3 mb-0.5 whitespace-nowrap">
              {project.priceRangeFormatted}
            </span>
          </div>

          {/* Bottom Row: Monthly Amortization Full Width on One Line */}
          <div className="pt-2 border-t border-stone-200/60 flex items-center space-x-1.5 whitespace-nowrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 whitespace-nowrap">
              Est. Monthly Amort:
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#eb6753] whitespace-nowrap">
              From ~₱{lowestMonthly.toLocaleString()}/mo
            </span>
          </div>
        </div>

        {/* Unit Specifications (Bedrooms, Bathrooms, AreaSqm) */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 text-xs sm:text-[13px] text-stone-700 font-medium whitespace-nowrap">
          <div className="flex items-center space-x-1.5 flex-shrink-0 whitespace-nowrap">
            <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600 flex-shrink-0" />
            <span className="whitespace-nowrap">{bedDisplay}</span>
          </div>
          <span className="text-stone-300 select-none flex-shrink-0">|</span>
          <div className="flex items-center space-x-1.5 flex-shrink-0 whitespace-nowrap">
            <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600 flex-shrink-0" />
            <span className="whitespace-nowrap">{bathDisplay}</span>
          </div>
          <span className="text-stone-300 select-none flex-shrink-0">|</span>
          <div className="flex items-center space-x-1.5 flex-shrink-0 whitespace-nowrap">
            <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600 flex-shrink-0" />
            <span className="whitespace-nowrap">{areaDisplay}</span>
          </div>
        </div>

        {/* Deliverables with See More Toggle */}
        <div className="pt-1">
          <div className="space-y-1.5 text-xs text-stone-600 transition-all duration-300">
            {(showAllDeliverables ? project.deliverables : project.deliverables.slice(0, 3)).map(
              (deliverable) => (
                <div key={deliverable} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{deliverable}</span>
                </div>
              )
            )}
          </div>

          {project.deliverables.length > 3 && (
            <div className="flex justify-center mt-2.5">
              <button
                type="button"
                onClick={() => setShowAllDeliverables(!showAllDeliverables)}
                className="inline-flex items-center justify-center text-[11px] font-semibold text-[#eb6753] hover:text-[#d85542] transition-colors py-1 px-3 rounded-full hover:bg-[#eb6753]/5"
              >
                <span>{showAllDeliverables ? 'See less' : 'See more'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                    showAllDeliverables ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
          <Link
            href={`/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-stone-100 hover:bg-stone-200 hover:text-black rounded-xl transition-all group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          <Link
            href={`/inquire-now?project=${project.slug}`}
            className="flex-1 btn-futuristic inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#d85542] rounded-xl shadow-md shadow-[#eb6753]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Inquire</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

