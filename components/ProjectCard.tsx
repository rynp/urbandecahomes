'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  ArrowRight,
  Bed,
  Bath,
  Ruler,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showAllDeliverables, setShowAllDeliverables] = useState(false);
  const availableUnits = project.unitTypes.filter((u) => u.status !== 'Sold Out');
  const getUnitMonthly = (u: any) =>
    u.estMonthlyPagIbigPhp ||
    Math.round((u.loanableBalancePhp || u.pricePhp || u.priceMinPhp || 0) * 0.00506685);
  const monthlies = availableUnits.map(getUnitMonthly).filter((m) => m > 0);
  const lowestMonthly = monthlies.length > 0 ? Math.min(...monthlies) : 0;

  // Data-driven specifications
  const minBeds = availableUnits.length > 0 ? Math.min(...availableUnits.map((u) => u.bedrooms)) : 0;
  const maxBeds = availableUnits.length > 0 ? Math.max(...availableUnits.map((u) => u.bedrooms)) : 0;
  const bedDisplay =
    minBeds === maxBeds
      ? minBeds === 0
        ? 'Studio'
        : `${minBeds} Bed`
      : minBeds === 0
      ? `Studio - ${maxBeds} Bed`
      : `${minBeds} - ${maxBeds} Bed`;

  const minBaths = availableUnits.length > 0 ? Math.min(...availableUnits.map((u) => u.bathrooms)) : 1;
  const maxBaths = availableUnits.length > 0 ? Math.max(...availableUnits.map((u) => u.bathrooms)) : 1;
  const bathDisplay = minBaths === maxBaths ? `${minBaths} Bath` : `${minBaths} - ${maxBaths} Bath`;

  const minArea = availableUnits.length > 0 ? Math.min(...availableUnits.map((u) => u.areaSqm)) : 0;
  const maxArea = availableUnits.length > 0 ? Math.max(...availableUnits.map((u) => u.areaSqm)) : 0;
  const areaDisplay = minArea === maxArea ? `${minArea} sqm` : `${minArea} - ${maxArea} sqm`;

  return (
    <article className="bg-white rounded-2xl border border-[#E7DFD3] shadow-sm hover:shadow-xl hover:border-[#CE2029]/35 overflow-hidden flex flex-col group transition-all duration-300 self-start">
      {/* Property Visual Header (16:10 aspect ratio) */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#1C1917]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        {/* Soft Contrast Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="badge-pagibig bg-white/95 backdrop-blur-md shadow-xs">
            RFO • Pag-IBIG
          </span>

          <span className="inline-flex items-center text-[10.5px] font-bold text-white bg-[#CE2029] px-2.5 py-1 rounded-full shadow-xs font-logo uppercase tracking-wider">
            ₱{project.reservationFeePhp.toLocaleString()} Res.
          </span>
        </div>

        {/* Bottom Card Title & Location */}
        <div className="absolute bottom-3.5 left-4 right-4 text-white z-10">
          <h3 className="font-logo text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md group-hover:text-[#FAF0C8] transition-colors">
            {project.name}
          </h3>
          <p className="flex items-center text-xs text-stone-200 mt-1">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#CE2029] flex-shrink-0" />
            <span className="truncate">{project.location.address}</span>
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        {/* Financial Passport Box */}
        <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E7DFD3] space-y-2.5">
          {/* Monthly Amortization Highlight (Primary Decision Number) */}
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] font-logo">
              Est. Monthly Amortization
            </span>
            <span className="text-base sm:text-lg font-black text-[#CE2029] font-logo">
              ~₱{lowestMonthly.toLocaleString()}
              <span className="text-xs font-normal text-[#78716C]">/mo</span>
            </span>
          </div>

          {/* Total Contract Price & Integrated Financing Partner Logos */}
          <div className="pt-2 border-t border-[#E7DFD3]/80 flex items-center justify-between">
            <div>
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#78716C] block font-logo">
                Contract Price (TCP)
              </span>
              <span className="text-sm font-bold text-[#1C1917] font-logo">
                {project.priceRangeFormatted}
              </span>
            </div>

            {/* Clean, Non-overlapping Partner Logos */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <img
                src="/images/partners/pag-ibig.svg"
                alt="Pag-IBIG Fund"
                title="Pag-IBIG Fund"
                className="w-6 h-6 rounded object-contain badge-seq-pag transition-transform hover:scale-110"
                width={24}
                height={24}
              />
              <img
                src="/images/partners/security-bank.svg"
                alt="Security Bank"
                title="Security Bank"
                className="w-6 h-6 rounded object-contain badge-seq-sec transition-transform hover:scale-110"
                width={24}
                height={24}
              />
              <img
                src="/images/partners/bpi.svg"
                alt="BPI"
                title="BPI"
                className="w-6 h-6 rounded object-contain badge-seq-bpi transition-transform hover:scale-110"
                width={24}
                height={24}
              />
              <img
                src="/images/partners/bdo.svg"
                alt="BDO"
                title="BDO"
                className="w-6 h-6 rounded object-contain badge-seq-bdo transition-transform hover:scale-110"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        {/* Project Tagline / Unique Signature Feature */}
        <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
          {project.tagline}
        </p>

        {/* Clean Spec Chips Row */}
        <div className="flex items-center justify-between py-2 text-xs text-[#44403C] font-semibold border-y border-[#E7DFD3]/70">
          <div className="flex items-center space-x-1.5">
            <Bed className="w-3.5 h-3.5 text-[#CE2029]" />
            <span>{bedDisplay}</span>
          </div>
          <span className="text-[#D6D3D1] select-none">•</span>
          <div className="flex items-center space-x-1.5">
            <Bath className="w-3.5 h-3.5 text-[#CE2029]" />
            <span>{bathDisplay}</span>
          </div>
          <span className="text-[#D6D3D1] select-none">•</span>
          <div className="flex items-center space-x-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#CE2029]" />
            <span>{areaDisplay}</span>
          </div>
        </div>

        {/* Deliverables Collapsible */}
        <div className="space-y-1.5">
          <div className="space-y-1.5 text-xs text-[#57534E]">
            {(showAllDeliverables ? project.deliverables : project.deliverables.slice(0, 3)).map(
              (deliverable) => (
                <div key={deliverable} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5938] flex-shrink-0" />
                  <span className="truncate">{deliverable}</span>
                </div>
              )
            )}
          </div>

          {project.deliverables.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllDeliverables(!showAllDeliverables)}
              className="inline-flex items-center text-[11px] font-bold text-[#CE2029] hover:text-[#B51B23] transition-colors pt-1 font-logo"
            >
              <span>{showAllDeliverables ? 'Show less features' : `+${project.deliverables.length - 3} more unit features`}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                  showAllDeliverables ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Action Links */}
        <div className="pt-3 border-t border-[#E7DFD3] flex items-center justify-between gap-2.5">
          <Link
            href={`/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1917] bg-[#FAF8F3] hover:bg-[#F4EFE6] hover:text-[#CE2029] rounded-xl transition-all group/btn font-logo border border-[#E7DFD3]"
          >
            <span>View Units</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>

          <Link
            href={`/inquire-now?project=${project.slug}`}
            className="flex-1 btn-deca inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-md shadow-[#CE2029]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-logo"
          >
            <span>Book Tour</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

