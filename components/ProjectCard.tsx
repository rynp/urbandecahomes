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
  const getUnitMonthly = (u: any) =>
    u.estMonthlyPagIbigPhp || Math.round(((u.loanableBalancePhp || u.pricePhp || u.priceMinPhp || 0) * 0.00506685));
  const monthlies = availableUnits.map(getUnitMonthly).filter((m) => m > 0);
  const lowestMonthly = monthlies.length > 0 ? Math.min(...monthlies) : 0;

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
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[1.12] contrast-[1.02]"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        {/* Futuristic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/20 to-transparent pointer-events-none" />

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
          <h3 className="font-logo text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-md group-hover:text-[#FAF0C8] transition-colors">
            {project.name}
          </h3>
          <p className="flex items-center text-xs text-stone-200 mt-1.5">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#CE2029] flex-shrink-0 animate-pulse" />
            <span className="truncate">{project.location.address}</span>
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 lg:p-4.5 xl:p-6 flex-1 flex flex-col justify-between space-y-4 lg:space-y-3.5 xl:space-y-5 bg-gradient-to-b from-white to-[#FAF5E6]/40">
        {/* Pricing Highlights in Futuristic Glass Box */}
        <div className="p-3.5 lg:p-3 xl:p-3.5 rounded-xl bg-[#FAF5E6]/70 border border-[#EADBBD] backdrop-blur-sm space-y-2">
          {/* Contract Price Block */}
          <div>
            {/* Header Line: Label on Left, Financing Logos on Right */}
            <div className="flex items-center justify-between relative">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6E5D] block font-logo">
                Contract Price (TCP)
              </span>

              {/* Financing Partner Logos: a bit bigger, slightly overlapping the main contract price top border */}
              <div className="flex items-center gap-1.5 flex-shrink-0 -mt-5 -mr-0.5 relative z-10">
                <img
                  src="/images/partners/security-bank.svg"
                  alt="Security Bank"
                  title="Security Bank"
                  className="w-[26px] h-[26px] rounded object-contain shadow-xs badge-seq-sec transition-transform cursor-pointer"
                  width={26}
                  height={26}
                />
                <img
                  src="/images/partners/bpi.svg"
                  alt="BPI"
                  title="BPI"
                  className="w-[26px] h-[26px] rounded object-contain shadow-xs badge-seq-bpi transition-transform cursor-pointer"
                  width={26}
                  height={26}
                />
                <img
                  src="/images/partners/bdo.svg"
                  alt="BDO"
                  title="BDO"
                  className="w-[26px] h-[26px] rounded object-contain shadow-xs badge-seq-bdo transition-transform cursor-pointer"
                  width={26}
                  height={26}
                />
                <img
                  src="/images/partners/pag-ibig.svg"
                  alt="Pag-IBIG Fund"
                  title="Pag-IBIG Fund"
                  className="w-[26px] h-[26px] rounded object-contain shadow-xs badge-seq-pag transition-transform cursor-pointer"
                  width={26}
                  height={26}
                />
              </div>
            </div>

            {/* Price Value: Proportional top and bottom spacing */}
            <span className="text-base lg:text-[15px] xl:text-lg font-extrabold text-[#3E1C15] block leading-tight mt-2.5 sm:mt-3 mb-0.5 whitespace-nowrap font-logo">
              {project.priceRangeFormatted}
            </span>
          </div>

          {/* Bottom Row: Monthly Amortization Full Width on One Line */}
          <div className="pt-2 border-t border-[#E8DEC4] flex items-center justify-between gap-1 whitespace-nowrap">
            <span className="text-[10px] lg:text-[9.5px] xl:text-[10px] font-bold uppercase tracking-wider lg:tracking-tight xl:tracking-wider text-[#7A6E5D] whitespace-nowrap flex-shrink-0 font-logo">
              Est. Monthly Amort:
            </span>
            <span className="text-xs lg:text-[11.5px] xl:text-sm font-bold text-[#CE2029] whitespace-nowrap flex-shrink-0 font-logo">
              From ~₱{lowestMonthly.toLocaleString()}/mo
            </span>
          </div>
        </div>

        {/* Unit Specifications (Bedrooms, Bathrooms, AreaSqm) */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 lg:space-x-1.5 xl:space-x-2.5 text-xs lg:text-[11.5px] xl:text-[13px] text-[#5C3D36] font-medium whitespace-nowrap">
          <div className="flex items-center space-x-1 lg:space-x-1 xl:space-x-1.5 flex-shrink-0 whitespace-nowrap">
            <Bed className="w-3.5 h-3.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-[#8C766F] flex-shrink-0" />
            <span className="whitespace-nowrap">{bedDisplay}</span>
          </div>
          <span className="text-[#D5CBB3] select-none flex-shrink-0">|</span>
          <div className="flex items-center space-x-1 lg:space-x-1 xl:space-x-1.5 flex-shrink-0 whitespace-nowrap">
            <Bath className="w-3.5 h-3.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-[#8C766F] flex-shrink-0" />
            <span className="whitespace-nowrap">{bathDisplay}</span>
          </div>
          <span className="text-[#D5CBB3] select-none flex-shrink-0">|</span>
          <div className="flex items-center space-x-1 lg:space-x-1 xl:space-x-1.5 flex-shrink-0 whitespace-nowrap">
            <Ruler className="w-3.5 h-3.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-[#8C766F] flex-shrink-0" />
            <span className="whitespace-nowrap">{areaDisplay}</span>
          </div>
        </div>

        {/* Deliverables with See More Toggle */}
        <div className="pt-1">
          <div className="space-y-1.5 text-xs text-[#5C3D36] transition-all duration-300">
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
                className="inline-flex items-center justify-center text-[11px] font-bold text-[#CE2029] hover:text-[#B51B23] transition-colors py-1 px-3 rounded-full hover:bg-[#CE2029]/10 font-logo"
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
        <div className="pt-4 border-t border-[#E8DEC4] flex items-center justify-between gap-3">
          <Link
            href={`/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#3E1C15] bg-[#FAF5E6] hover:bg-[#FAF0C8] hover:text-[#CE2029] rounded-xl transition-all group/btn font-logo border border-[#EADBBD]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          <Link
            href={`/inquire-now?project=${project.slug}`}
            className="flex-1 btn-futuristic inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-md shadow-[#CE2029]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-logo"
          >
            <span>Inquire</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

