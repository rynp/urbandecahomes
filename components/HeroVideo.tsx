'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  Building2,
  Sparkles,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function HeroVideo() {
  return (
    <section className="relative min-h-fit sm:min-h-[620px] lg:min-h-[700px] flex items-center justify-center bg-charcoal-950 text-white overflow-hidden">
      {/* Background Media with Cyber-Grid Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.38] transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')",
          }}
        />

        {/* Futuristic Cyber-Grid Blueprint Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />

        {/* Ambient Glowing Atmospheric Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#eb6753]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-gold-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

        {/* Deep Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/80" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 sm:pt-16 sm:pb-8 text-center">
        {/* Live Status Radar Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold mb-4 sm:mb-6 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar flex-shrink-0 mr-1" />
          <span className="text-stone-300">Updated Inventory for</span>
          <Link
            href="/manila"
            className="text-white hover:text-gold-300 font-bold underline decoration-gold-400/50 hover:decoration-gold-300 transition-colors"
          >
            Manila
          </Link>
          <span className="text-stone-400">,</span>
          <Link
            href="/ortigas"
            className="text-white hover:text-gold-300 font-bold underline decoration-gold-400/50 hover:decoration-gold-300 transition-colors"
          >
            Ortigas
          </Link>
          <span className="text-stone-400">,</span>
          <Link
            href="/cubao"
            className="text-white hover:text-gold-300 font-bold underline decoration-gold-400/50 hover:decoration-gold-300 transition-colors"
          >
            Cubao
          </Link>
        </div>

        {/* Main Title with Holographic Gold Gradient */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
          Ready for Occupancy <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-[#eb6753]">
            Condominiums in <span className="whitespace-nowrap">Metro Manila</span>
          </span>

        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-sm sm:text-lg text-stone-300 mb-6 sm:mb-10 leading-relaxed font-normal">
          Pioneering industrialized precast architecture and flexible 30-year homeownership. Explore high-quality units in{' '}
          <strong className="text-white">Manila</strong>,{' '}
          <strong className="text-white">Ortigas</strong>, and{' '}
          <strong className="text-white">Cubao</strong> starting from{' '}
          <span className="text-gold-400 font-bold">₱10,000</span> reservation.
        </p>

        {/* Direct Project Navigation Buttons with Glow-Pulse Hover */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto w-full">
          <Link
            href="/manila"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white glass-pill border border-white/20 shadow-lg glow-pulse-hover group"
          >
            <Building2 className="w-4 h-4 mr-2 text-[#eb6753] group-hover:scale-110 transition-transform" />
            <span>DecaHomes -Manila</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 text-stone-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/ortigas"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white glass-pill border border-white/20 shadow-lg glow-pulse-hover group"
          >
            <Building2 className="w-4 h-4 mr-2 text-gold-400 group-hover:scale-110 transition-transform" />
            <span>DecaHome -Ortigas</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 text-stone-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/cubao"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white glass-pill border border-white/20 shadow-lg glow-pulse-hover group"
          >
            <Building2 className="w-4 h-4 mr-2 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>DecaHome - Cubao</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 text-stone-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2 sm:mb-4">
          <Link
            href="/inquire-now"
            onClick={() =>
              trackEvent({
                name: 'inquiry_cta_click',
                params: { location_source: 'hero_primary_button' },
              })
            }
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#f05a3e] rounded-xl shadow-xl shadow-[#eb6753]/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>Inquire Now &amp; View Units</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/details#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold text-stone-200 hover:text-white glass-pill rounded-xl transition-all"
          >
            <Calculator className="w-4 h-4 mr-2 text-gold-400" />
            <span>Monthly Amortization Calculator</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
