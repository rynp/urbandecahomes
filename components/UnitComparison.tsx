'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Building2, Bed, BedDouble, Bath, Layers, ArrowUpRight, Home } from 'lucide-react';
import { projects } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';

export default function UnitComparison() {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Flatten all unit types with parent project details
  const allUnits = projects.flatMap((p) =>
    p.unitTypes.map((u) => ({
      ...u,
      projectName: p.name,
      projectSlug: p.slug,
      city: p.location.city,
    }))
  );

  const filteredUnits = allUnits.filter((u) => {
    if (filterCategory === 'All') return true;
    return u.category === filterCategory;
  });

  const categoryFilters = [
    {
      id: 'All',
      label: 'All',
      title: 'All Units',
      icon: null,
    },
    {
      id: 'Studio',
      label: null,
      title: 'Studio Units',
      icon: Home,
    },
    {
      id: '1-Bedroom',
      label: '1',
      title: '1-Bedroom Units',
      icon: Bed,
    },
    {
      id: '2-Bedroom',
      label: '2',
      title: '2-Bedroom Units',
      icon: BedDouble,
    },
  ];

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return allUnits.length;
    return allUnits.filter((u) => u.category === cat).length;
  };

  const handleFilterChange = (cat: string) => {
    setFilterCategory(cat);
    trackEvent({
      name: 'unit_comparison_filter',
      params: { category: cat },
    });
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
      {/* Ambient Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#eb6753]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Filter Controls */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 border-b border-stone-200/80 bg-gradient-to-r from-stone-50/90 via-white to-stone-50/90 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-stone-200/90 text-[#eb6753] text-[11px] font-bold uppercase tracking-widest shadow-2xs mb-3">
            <Sparkles className="w-3 h-3 text-gold-500 animate-pulse" />
            <span>Interactive Floor Specifications</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-900 tracking-tight leading-tight">
            Compare Unit Layouts &amp; Monthly Amortizations
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Side-by-side comparison of floor cuts, total contract prices, and estimated Pag-IBIG monthly amortizations across Metro Manila locations.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center flex-nowrap shrink-0 gap-1.5 p-1.5 bg-stone-100 rounded-2xl border border-stone-200/80 self-start lg:self-auto shadow-inner overflow-x-auto scrollbar-none">
          {categoryFilters.map((cat) => {
            const isActive = filterCategory === cat.id;
            const count = getCategoryCount(cat.id);
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterChange(cat.id)}
                title={cat.title}
                aria-label={cat.title}
                className={`group flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-charcoal-900 text-white shadow-md shadow-black/15'
                    : 'text-stone-600 hover:text-charcoal-900 hover:bg-white/90'
                }`}
              >
                <span className="inline-flex items-center space-x-1">
                  {cat.label && <span>{cat.label}</span>}
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/20 text-gold-300'
                      : 'bg-stone-200/70 text-stone-500 group-hover:bg-stone-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-charcoal-950 text-white uppercase font-sans tracking-wider text-[11px] border-b-2 border-gold-500/40">
              <th className="py-4 px-6 font-bold">Unit Configuration</th>
              <th className="py-4 px-6 font-bold">Development &amp; City</th>
              <th className="py-4 px-6 font-bold text-center">Floor Area</th>
              <th className="py-4 px-6 font-bold">Price Range (TCP)</th>
              <th className="py-4 px-6 font-bold">Est. Monthly (Pag-IBIG)</th>
              <th className="py-4 px-6 font-bold text-center">Status</th>
              <th className="py-4 px-6 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white">
            {filteredUnits.map((unit) => {
              const isSoldOut = unit.status === 'Sold Out';
              return (
                <tr
                  key={unit.id}
                  className={`transition-all duration-200 group ${
                    isSoldOut
                      ? 'opacity-60 bg-stone-50/70'
                      : 'hover:bg-gradient-to-r hover:from-amber-50/40 hover:via-white hover:to-amber-50/20'
                  }`}
                >
                  {/* Unit Name & Spec */}
                  <td className="py-4 px-6 font-semibold text-charcoal-900">
                    <span className="block text-sm font-bold text-charcoal-900 group-hover:text-[#eb6753] transition-colors">
                      {unit.name}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center space-x-1 text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        <BedDouble className="w-3 h-3 text-stone-400" />
                        <span>{unit.bedrooms === 0 ? 'Studio' : `${unit.bedrooms} BR`}</span>
                      </span>
                      <span className="inline-flex items-center space-x-1 text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        <Bath className="w-3 h-3 text-stone-400" />
                        <span>{unit.bathrooms} Bath</span>
                      </span>
                    </div>
                  </td>

                  {/* Project & City */}
                  <td className="py-4 px-6">
                    <Link
                      href={`/${unit.projectSlug}`}
                      className="font-bold text-charcoal-900 hover:text-gold-700 inline-flex items-center space-x-1 group/link"
                    >
                      <span>{unit.projectName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/link:text-gold-700 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                    <span className="text-xs text-stone-400 block mt-0.5 font-medium">
                      {unit.city}
                    </span>
                  </td>

                  {/* Floor Area */}
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-stone-100 border border-stone-200/80 rounded-lg text-xs font-extrabold text-charcoal-900">
                      {unit.areaSqm} sqm
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 font-bold text-charcoal-900 whitespace-nowrap">
                    ₱{(unit.priceMinPhp / 1000000).toFixed(2)}M – ₱{(unit.priceMaxPhp / 1000000).toFixed(2)}M
                  </td>

                  {/* Monthly Amortization */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="font-extrabold text-[#eb6753] text-sm sm:text-[15px] block">
                      ~₱{unit.estMonthlyPagIbigPhp.toLocaleString()}/mo
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      30-Yr Pag-IBIG Term
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center space-x-1.5 px-3 py-1 text-[11px] font-bold rounded-full border shadow-2xs ${
                        unit.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : unit.status === 'Limited Availability'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          unit.status === 'Available'
                            ? 'bg-emerald-500 animate-pulse'
                            : unit.status === 'Limited Availability'
                            ? 'bg-amber-500'
                            : 'bg-stone-400'
                        }`}
                      />
                      <span>{unit.status}</span>
                    </span>
                  </td>

                  {/* Action Link */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {isSoldOut ? (
                      <span className="text-xs text-stone-400 italic font-medium px-3 py-1.5 bg-stone-100 rounded-xl inline-block">
                        Sold Out
                      </span>
                    ) : (
                      <Link
                        href={`/inquire-now?project=${unit.projectSlug}&unit=${unit.id}`}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-charcoal-900 hover:bg-[#eb6753] rounded-xl shadow-sm transition-all duration-300 transform group-hover:scale-[1.02] hover:shadow-md"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Banner */}
      <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-gold-500" />
          <span>Indicative amortizations based on 30-year Pag-IBIG term at 6.25% interest. Official terms subject to loan approval.</span>
        </div>
        <Link
          href="#calculator"
          className="text-xs font-bold text-charcoal-900 hover:text-[#eb6753] underline underline-offset-4 flex items-center space-x-1 transition-colors whitespace-nowrap"
        >
          <span>Calculate Custom Amortization</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

