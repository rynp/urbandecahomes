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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF5E6] border border-[#EADBBD] text-[#CE2029] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm font-logo">
            <Layers className="w-3.5 h-3.5 text-[#CE2029]" />
            <span>The 8990 Group of Companies</span>
          </div>
          <h2 className="font-logo text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#3E1C15] mb-4">
            A Multi-Brand Real Estate Powerhouse
          </h2>
          <p className="text-[#5C3D36] text-sm sm:text-base leading-relaxed">
            Under the strategic stewardship of publicly listed <strong>8990 Holdings, Inc. (PSE: HOUSE)</strong>, our diversified portfolio spans affordable community subdivisions, urban mid-rises, transit skyscrapers, and premier mountain luxury townships.
          </p>
        </div>

        {/* 4 Group of Companies Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {groupOfCompanies.map((company) => (
            <div
              key={company.id}
              className="futuristic-card cyber-corner group bg-white rounded-3xl p-8 border border-[#EADBBD] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                {/* Logo Banner & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-100">
                  {/* Clean Logo Image Box */}
                  <div className="w-40 h-24 rounded-2xl bg-white border border-[#EADBBD] p-2 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-[#CE2029]/40 transition-colors">
                    <Image
                      src={company.logo}
                      alt={`${company.name} Official Logo`}
                      width={160}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Badge & Category */}
                  <div className="flex flex-col sm:items-end font-logo">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#CE2029]/10 text-[#CE2029] border border-[#CE2029]/20 mb-1.5">
                      {company.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#5C3D36]">
                      {company.category}
                    </span>
                  </div>
                </div>

                {/* Company Title & Subtitle */}
                <div className="mt-6 mb-4">
                  <h3 className="font-logo text-2xl font-extrabold text-[#3E1C15] group-hover:text-[#CE2029] transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#CE2029] mt-1 font-logo">
                    {company.subtitle}
                  </p>
                </div>

                {/* Company Narrative */}
                <p className="text-[#5C3D36] text-sm leading-relaxed mb-6">
                  {company.description}
                </p>

                {/* Strategic Highlights */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6E5D] font-logo">
                    Key Strengths & Portfolio:
                  </h4>
                  {company.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start text-xs text-[#5C3D36] leading-normal font-logo">
                      <CheckCircle2 className="w-4 h-4 text-[#CE2029] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Flagship Projects Chips */}
                <div className="pt-4 border-t border-[#EADBBD]/60">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#7A6E5D] mb-2 font-logo">
                    Flagship Developments:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 font-logo">
                    {company.projects.map((proj, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[11px] font-medium bg-[#FAF5E6] text-[#3E1C15] px-2.5 py-1 rounded-lg border border-[#EADBBD]"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-6 border-t border-[#EADBBD]/60 flex items-center justify-between font-logo">
                <span className="text-xs font-bold text-[#7A6E5D] uppercase tracking-wider">
                  8990 Holdings Subsidiary
                </span>
                <Link
                  href="/inquire-now"
                  className="inline-flex items-center text-xs font-bold text-[#CE2029] hover:text-[#B51B23] group-hover:underline transition-colors"
                >
                  <span>Explore Inquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Statement */}
        <div className="mt-16 p-8 rounded-3xl bg-[#141418] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-[#FAF0C8] text-xs font-bold uppercase tracking-wider font-logo">
              <ShieldCheck className="w-4 h-4 text-[#CE2029]" />
              <span>Public Governance & Corporate Integrity</span>
            </div>
            <h3 className="font-logo text-2xl font-extrabold text-white">
              Built on Financial Strength and Public Accountability
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              With audited quarterly reporting under the Securities and Exchange Commission (SEC) and the Philippine Stock Exchange (PSE), homebuyers and institutional lenders partner with the 8990 Group with total confidence.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto font-logo">
            <Link
              href="/inquire-now"
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-lg shadow-[#CE2029]/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Project Tour</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link
              href="/details"
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold text-stone-300 bg-[#24242e] hover:bg-[#2c2c38] rounded-xl border border-white/10 transition-colors"
            >
              <span>Financing Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
