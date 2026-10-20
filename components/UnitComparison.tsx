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
    <div className="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden">
      {/* Header & Filter Tabs */}
      <div className="p-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
            Compare Unit Layouts & Specifications
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Compare floor cuts, pricing, and monthly amortizations across Metro Manila developments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilterChange(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                filterCategory === cat
                  ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-sm'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
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
            <tr className="bg-stone-100/70 border-b border-stone-200 text-charcoal-900 uppercase font-serif tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Unit Configuration</th>
              <th className="py-3.5 px-4">Development & City</th>
              <th className="py-3.5 px-4 text-center">Floor Area</th>
              <th className="py-3.5 px-4">Price Range (TCP)</th>
              <th className="py-3.5 px-4">Est. Monthly (Pag-IBIG)</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Inquire</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredUnits.map((unit) => {
              const isSoldOut = unit.status === 'Sold Out';
              return (
                <tr
                  key={unit.id}
                  className={`hover:bg-gold-50/50 transition-colors ${
                    isSoldOut ? 'opacity-60 bg-stone-50/60' : ''
                  }`}
                >
                  {/* Unit Name */}
                  <td className="py-4 px-4 font-semibold text-charcoal-900">
                    <span className="block text-sm font-bold">{unit.name}</span>
                    <span className="text-xs text-stone-500">{unit.bedrooms} BR • {unit.bathrooms} Bath</span>
                  </td>

                  {/* Project */}
                  <td className="py-4 px-4">
                    <Link
                      href={`/${unit.projectSlug}`}
                      className="font-medium text-charcoal-900 hover:text-gold-700 underline-offset-2 hover:underline block"
                    >
                      {unit.projectName}
                    </Link>
                    <span className="text-xs text-stone-400">{unit.city}</span>
                  </td>

                  {/* Floor Area */}
                  <td className="py-4 px-4 text-center font-bold text-charcoal-900">
                    {unit.areaSqm} sqm
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 font-semibold text-charcoal-900">
                    ₱{(unit.priceMinPhp / 1000000).toFixed(2)}M – ₱{(unit.priceMaxPhp / 1000000).toFixed(2)}M
                  </td>

                  {/* Monthly Amortization */}
                  <td className="py-4 px-4 font-bold text-gold-700">
                    ~₱{unit.estMonthlyPagIbigPhp.toLocaleString()}/mo
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                        unit.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : unit.status === 'Limited Availability'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {unit.status}
                    </span>
                  </td>

                  {/* Action Link */}
                  <td className="py-4 px-4 text-right">
                    {isSoldOut ? (
                      <span className="text-xs text-stone-400 italic">Sold Out</span>
                    ) : (
                      <Link
                        href={`/inquire-now?project=${unit.projectSlug}&unit=${unit.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase gold-gradient text-charcoal-900 rounded hover:opacity-90 shadow-sm transition-all"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
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
