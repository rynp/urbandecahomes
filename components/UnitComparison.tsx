'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, Filter } from 'lucide-react';
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

  const categories = ['All', 'Studio', '1-Bedroom', '2-Bedroom'];

  const handleFilterChange = (cat: string) => {
    setFilterCategory(cat);
    trackEvent({
      name: 'unit_comparison_filter',
      params: { category: cat },
    });
  };

  return (
    <div className="futuristic-card cyber-corner-gold bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
      {/* Header & Filter Tabs */}
      <div className="p-6 sm:p-8 border-b border-stone-200/90 bg-gradient-to-r from-stone-50 via-white to-stone-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#eb6753] mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#eb6753] animate-pulse" />
            <span>Interactive Floor Specifications</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
            Compare Unit Layouts &amp; Monthly Amortizations
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Compare floor cuts, pricing, and monthly amortizations across Metro Manila developments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 self-start md:self-auto bg-stone-100 p-1.5 rounded-2xl border border-stone-200/80">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                filterCategory === cat
                  ? 'bg-charcoal-900 text-white shadow-md'
                  : 'text-stone-600 hover:text-charcoal-900 hover:bg-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-charcoal-950 text-white uppercase font-sans tracking-wider text-[11px] border-b border-charcoal-800">
              <th className="py-4 px-5 font-bold">Unit Configuration</th>
              <th className="py-4 px-5 font-bold">Development &amp; City</th>
              <th className="py-4 px-5 font-bold text-center">Floor Area</th>
              <th className="py-4 px-5 font-bold">Price Range (TCP)</th>
              <th className="py-4 px-5 font-bold">Est. Monthly (Pag-IBIG)</th>
              <th className="py-4 px-5 font-bold text-center">Status</th>
              <th className="py-4 px-5 font-bold text-right">Inquire</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white">
            {filteredUnits.map((unit) => {
              const isSoldOut = unit.status === 'Sold Out';
              return (
                <tr
                  key={unit.id}
                  className={`hover:bg-amber-50/40 transition-colors group ${
                    isSoldOut ? 'opacity-60 bg-stone-50/70' : ''
                  }`}
                >
                  {/* Unit Name */}
                  <td className="py-4 px-5 font-semibold text-charcoal-900">
                    <span className="block text-sm font-bold group-hover:text-[#eb6753] transition-colors">{unit.name}</span>
                    <span className="text-xs text-stone-500">{unit.bedrooms} BR • {unit.bathrooms} Bath</span>
                  </td>

                  {/* Project */}
                  <td className="py-4 px-5">
                    <Link
                      href={`/${unit.projectSlug}`}
                      className="font-medium text-charcoal-900 hover:text-gold-700 underline-offset-2 hover:underline block"
                    >
                      {unit.projectName}
                    </Link>
                    <span className="text-xs text-stone-400">{unit.city}</span>
                  </td>

                  {/* Floor Area */}
                  <td className="py-4 px-5 text-center font-bold text-charcoal-900">
                    <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-xs font-bold text-charcoal-800 inline-block">
                      {unit.areaSqm} sqm
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-5 font-semibold text-charcoal-900">
                    ₱{(unit.priceMinPhp / 1000000).toFixed(2)}M – ₱{(unit.priceMaxPhp / 1000000).toFixed(2)}M
                  </td>

                  {/* Monthly Amortization */}
                  <td className="py-4 px-5 font-extrabold text-[#eb6753]">
                    ~₱{unit.estMonthlyPagIbigPhp.toLocaleString()}/mo
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5 text-center">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 text-[11px] font-bold rounded-full border ${
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
                  <td className="py-4 px-5 text-right">
                    {isSoldOut ? (
                      <span className="text-xs text-stone-400 italic">Sold Out</span>
                    ) : (
                      <Link
                        href={`/inquire-now?project=${unit.projectSlug}&unit=${unit.id}`}
                        className="btn-futuristic inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#d85542] rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3 h-3 ml-1.5" />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
