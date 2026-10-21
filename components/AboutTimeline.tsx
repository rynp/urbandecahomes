'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Award,
  TrendingUp,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { companyTimeline, CompanyMilestone } from '@/data/company';

export default function AboutTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeYear, setActiveYear] = useState<string>(companyTimeline[0].year);

  const categories = ['All', 'Milestone', 'Innovation', 'Expansion', 'Finance'];

  const filteredMilestones =
    selectedCategory === 'All'
      ? companyTimeline
      : companyTimeline.filter((m) => m.category === selectedCategory);

  return (
    <section className="py-24 bg-charcoal-950 text-white relative overflow-hidden cyber-grid" id="timeline">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#eb6753]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-charcoal-800/90 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4 shadow-sm backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>24+ Years of Nation-Building History</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Our Journey: Housing the Filipino People
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From our humble beginnings in 2002 to becoming one of the country&apos;s premier publicly listed real estate conglomerates (PSE: HOUSE), trace the innovations, milestones, and masterplans that built over 100,000 homes.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#eb6753] text-white shadow-lg shadow-[#eb6753]/30 scale-105'
                    : 'bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white border border-white/10'
                }`}
              >
                {cat === 'All' ? 'All Milestones' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Spine and Cards */}
        <div className="relative mt-12 max-w-5xl mx-auto">
          {/* Glowing Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#eb6753] via-gold-400 to-[#eb6753] transform -translate-x-1/2 opacity-70" />

          <div className="space-y-12 sm:space-y-16">
            {filteredMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  onMouseEnter={() => setActiveYear(milestone.year)}
                >
                  {/* Timeline Node on Spine */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-charcoal-900 border-2 border-[#eb6753] flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-[#eb6753]/40 z-20 transition-transform duration-300 group-hover:scale-125">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eb6753] animate-pulse" />
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Milestone Card Content */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div
                      className={`futuristic-card cyber-corner group p-6 sm:p-7 rounded-2xl bg-charcoal-900/90 border transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[#eb6753]/15 backdrop-blur-md ${
                        activeYear === milestone.year
                          ? 'border-[#eb6753]/60 ring-1 ring-[#eb6753]/40'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Top Badges */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-3 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl font-serif font-bold text-[#eb6753] tracking-tight">
                          {milestone.year}
                        </span>
                        {milestone.badge && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-stone-200 border border-white/10">
                            {milestone.badge}
                          </span>
                        )}
                        {milestone.stats && (
                          <span className="text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                            {milestone.stats}
                          </span>
                        )}
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                        {milestone.title}
                      </h3>

                      {/* Milestone Description */}
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast-Track Summary Box */}
        <div className="mt-20 p-8 rounded-3xl bg-charcoal-900/90 border border-gold-500/30 text-center max-w-4xl mx-auto shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>The 8990 Legacy Continues</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
            Over Two Decades of Uncompromised Quality & Trust
          </h3>
          <p className="text-stone-300 text-sm max-w-2xl mx-auto leading-relaxed mb-6">
            From revolutionary pre-cast engineering to pioneering CTS Gold financing and DHSUD 4PH partnership, 8990 Holdings, Inc. remains steadfast in its national mission of housing the Filipino people.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-200">
            <span className="flex items-center bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 mr-2 text-[#eb6753]" />
              DHSUD Accredited Developer
            </span>
            <span className="flex items-center bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
              <Award className="w-4 h-4 mr-2 text-gold-400" />
              Consistent Top Pag-IBIG Partner
            </span>
            <span className="flex items-center bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
              <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" />
              PSE: HOUSE Listed Entity
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
