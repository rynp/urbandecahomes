'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, BadgeCheck, Quote, MapPin, Sparkles, Building2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { homeownerTestimonials, Testimonial } from '@/data/testimonials';

export default function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    { label: 'All Stories', count: homeownerTestimonials.length, value: 'All' },
    { label: 'Manila Residents', count: homeownerTestimonials.filter((t) => t.category === 'Manila').length, value: 'Manila' },
    { label: 'Ortigas Residents', count: homeownerTestimonials.filter((t) => t.category === 'Ortigas').length, value: 'Ortigas' },
    { label: 'Cubao Residents', count: homeownerTestimonials.filter((t) => t.category === 'Cubao').length, value: 'Cubao' },
    { label: 'OFWs & Investors', count: homeownerTestimonials.filter((t) => t.category === 'OFW').length, value: 'OFW' },
  ];

  const filteredTestimonials =
    activeCategory === 'All'
      ? homeownerTestimonials
      : homeownerTestimonials.filter((t) => t.category === activeCategory);

  return (
    <section className="bg-stone-100/70 py-24 border-y border-stone-200/90 relative overflow-hidden cyber-grid-light">
      {/* Ambient background glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#eb6753]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#e8cf7b]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-[#eb6753] text-xs font-bold uppercase tracking-widest mb-3">
            <BadgeCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Homeowner Stories ({homeownerTestimonials.length} Reviews)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 tracking-tight">
            Hear From Our Community Residents
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3.5 leading-relaxed max-w-2xl mx-auto">
            Real experiences from everyday Filipino families, healthcare workers, BPO team leaders, and OFWs who turned their dreams of city condominium ownership into reality.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-charcoal-900 text-white shadow-md shadow-charcoal-900/20 scale-105'
                      : 'bg-white text-stone-600 hover:text-charcoal-900 hover:bg-stone-50 border border-stone-200/80 shadow-2xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-[#eb6753] text-white' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonials Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTestimonials.map((t) => {
            const isHovered = hoveredCard === t.id;

            return (
              <div
                key={t.id}
                onMouseEnter={() => setHoveredCard(t.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="futuristic-card cyber-corner bg-white rounded-2xl p-6 border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Card Bar: Rating & Highlight Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-100">
                    <div className="flex items-center space-x-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                      ))}
                      <span className="text-[11px] font-bold text-charcoal-800 ml-1">5.0</span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Verified Owner</span>
                    </span>
                  </div>

                  {/* Highlight pill */}
                  <div className="mt-3.5 mb-3 inline-block">
                    <span className="text-[11px] font-bold text-[#eb6753] bg-[#eb6753]/10 px-2.5 py-1 rounded-md border border-[#eb6753]/20 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-[#eb6753]" />
                      <span>{t.highlight}</span>
                    </span>
                  </div>

                  {/* Quote with subtle decorative quote mark */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-stone-200 absolute -top-1 -left-1 opacity-60 pointer-events-none group-hover:text-gold-200 transition-colors" />
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic relative z-10 pl-2">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Homeowner Identity & Avatar Profile */}
                <div className="pt-4 border-t border-stone-100 flex items-center space-x-3.5">
                  {/* Avatar Container with Specular Ring & Fallback */}
                  <div className="relative w-12 h-12 rounded-full flex-shrink-0 p-0.5 bg-gradient-to-tr from-[#eb6753] via-gold-400 to-[#eb6753] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-charcoal-900 relative">
                      <Image
                        src={t.avatar}
                        alt={`${t.name} - ${t.project}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    {/* Verified Badge Icon Over Avatar */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-xs" title="Verified Homeowner">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Name, Role & Community */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-bold text-charcoal-900 truncate block group-hover:text-[#eb6753] transition-colors">
                        {t.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium block truncate">
                      {t.role}
                    </span>
                    <span className="text-[10px] font-bold text-gold-700 block truncate mt-0.5">
                      {t.project} • {t.unitType}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Social Proof Metrics */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl gold-gradient text-charcoal-900 flex items-center justify-center flex-shrink-0 shadow">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-charcoal-900">
                100,000+ Filipino Families Housed Nationwide
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Join our flourishing communities across Metro Manila. Low reservations, flexible Pag-IBIG terms, and doorstep retail centers.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-3 w-full md:w-auto">
            <a
              href="/inquire-now"
              className="w-full md:w-auto btn-futuristic inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#d85542] rounded-xl shadow-md shadow-[#eb6753]/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Share Inquiries</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
