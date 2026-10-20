'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react';
import { groupOfCompanies } from '@/data/company';

export default function GroupOfCompanies() {
  return (
    <section className="py-24 bg-stone-50 text-charcoal-900 relative" id="group-of-companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#eb6753]" />
            <span>The 8990 Group of Companies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal-900 mb-4">
            A Multi-Brand Real Estate Powerhouse
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Under the strategic stewardship of publicly listed <strong>8990 Holdings, Inc. (PSE: HOUSE)</strong>, our diversified portfolio spans affordable community subdivisions, urban mid-rises, transit skyscrapers, and premier mountain luxury townships.
          </p>
        </div>

        {/* 4 Group of Companies Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {groupOfCompanies.map((company) => (
            <div
              key={company.id}
              className="group bg-white rounded-3xl p-8 border border-stone-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Logo Banner & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-100">
                  {/* Clean Logo Image Box */}
                  <div className="w-40 h-24 rounded-2xl bg-white border border-stone-200/70 p-2 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-[#eb6753]/40 transition-colors">
                    <Image
                      src={company.logo}
                      alt={`${company.name} Official Logo`}
                      width={160}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Badge & Category */}
                  <div className="flex flex-col sm:items-end">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#eb6753]/10 text-[#eb6753] border border-[#eb6753]/20 mb-1.5">
                      {company.badge}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      {company.category}
                    </span>
                  </div>
                </div>

                {/* Company Title & Subtitle */}
                <div className="mt-6 mb-4">
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900 group-hover:text-[#eb6753] transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-700 mt-1">
                    {company.subtitle}
                  </p>
                </div>

                {/* Company Narrative */}
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {company.description}
                </p>

                {/* Strategic Highlights */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Key Strengths & Portfolio:
                  </h4>
                  {company.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start text-xs text-stone-700 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-[#eb6753] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Flagship Projects Chips */}
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Flagship Developments:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.projects.map((proj, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[11px] font-medium bg-stone-100 text-charcoal-800 px-2.5 py-1 rounded-lg border border-stone-200/80"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  8990 Holdings Subsidiary
                </span>
                <Link
                  href="/inquire-now"
                  className="inline-flex items-center text-xs font-bold text-[#eb6753] hover:text-[#f05a3e] group-hover:underline transition-colors"
                >
                  <span>Explore Inquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Statement */}
        <div className="mt-16 p-8 rounded-3xl bg-charcoal-900 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Public Governance & Corporate Integrity</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Built on Financial Strength and Public Accountability
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              With audited quarterly reporting under the Securities and Exchange Commission (SEC) and the Philippine Stock Exchange (PSE), homebuyers and institutional lenders partner with the 8990 Group with total confidence.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href="/inquire-now"
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#f05a3e] rounded-xl shadow-lg shadow-[#eb6753]/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Project Tour</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link
              href="/details"
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold text-stone-300 bg-charcoal-800 hover:bg-charcoal-700 rounded-xl border border-charcoal-700 transition-colors"
            >
              <span>Financing Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
