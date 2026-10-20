'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Play,
  Pause,
} from 'lucide-react';
import { businessInfo } from '@/data/business';
import { trackEvent } from '@/lib/analytics';

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-charcoal-950 text-white overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0">
        {/* Background Image / Poster Fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')",
          }}
        />

        {/* Video Background (simulated through loop or lightweight player) */}
        {isPlaying && (
          <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-charcoal-900 via-transparent to-charcoal-900" />
          </div>
        )}

        {/* Deep dark gradient overlay for maximum typographic contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/70 to-charcoal-950/80" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Top Tag & Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-charcoal-800/90 border border-gold-500/40 text-gold-400 text-xs font-semibold mb-6 shadow-sm backdrop-blur-sm animate-fadeIn">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>Move-In Ready Condos • Pag-IBIG Accredited Partner</span>
        </div>

        {/* Main H1 - High-Value Real Estate Search Intent */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
          Affordable Move-In Ready <br className="hidden sm:inline" />
          <span className="gold-gradient-text">Condominiums in Metro Manila</span>
        </h1>

        {/* Subhead with verified value propositions */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 mb-8 leading-relaxed font-normal">
          Own a high-quality 2-Bedroom or Studio condo in{' '}
          <strong className="text-white">Tondo Manila</strong>,{' '}
          <strong className="text-white">Ortigas Pasig</strong>, or{' '}
          <strong className="text-white">Cubao Quezon City</strong>. Low cash-out promos, reservation starting from{' '}
          <span className="text-gold-400 font-semibold">₱10,000</span>, and Pag-IBIG loan terms up to 30 years.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/inquire-now"
            onClick={() =>
              trackEvent({
                name: 'inquiry_cta_click',
                params: { location_source: 'hero_primary_button' },
              })
            }
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow-lg hover:shadow-gold-500/20 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span>Inquire Now & View Units</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/details#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-charcoal-800/80 hover:bg-charcoal-800 border border-stone-600 hover:border-gold-400 rounded-lg backdrop-blur-sm transition-all"
          >
            <Calculator className="w-4 h-4 mr-2 text-gold-400" />
            <span>Monthly Amortization Calculator</span>
          </Link>
        </div>

        {/* Trust & Location Chips */}
        <div className="pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span>₱10k Reservation Fee</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span>Up to 30-Yr Pag-IBIG Term</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span>Integrated DECA Malls</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span>OFW Assistance Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
