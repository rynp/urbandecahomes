'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Search,
  Sparkles,
  Building2,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';

export default function HeroVideo() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent({
      name: 'hero_property_search',
      params: { location: selectedLocation, type: selectedType, budget: selectedBudget },
    });

    if (selectedLocation !== 'all') {
      router.push(`/${selectedLocation}`);
    } else {
      const target = document.getElementById('developments');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/inquire-now');
      }
    }
  };

  return (
    <section className="relative min-h-[660px] lg:min-h-[760px] flex items-center justify-center bg-charcoal-950 text-white overflow-hidden">
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Live Status Radar Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold mb-6 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar flex-shrink-0" />
          <span className="text-stone-200">
            Live 2026 Inventory • Pag-IBIG 30-Yr Fast Track Available
          </span>
          <span className="hidden sm:inline-block text-[#eb6753] font-bold">• Metro Manila</span>
        </div>

        {/* Main Title with Holographic Gold Gradient */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
          Futuristic Living &amp; Move-In Ready <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-[#eb6753]">
            Condominiums in Metro Manila
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-300 mb-10 leading-relaxed font-normal">
          Pioneering industrialized precast architecture and flexible 30-year homeownership. Explore high-quality units in{' '}
          <strong className="text-white">Manila</strong>,{' '}
          <strong className="text-white">Ortigas</strong>, and{' '}
          <strong className="text-white">Cubao</strong> starting from{' '}
          <span className="text-gold-400 font-bold">₱10,000</span> reservation.
        </p>

        {/* Futuristic Floating Interactive Search & Filter Bar */}
        <form
          onSubmit={handleSearch}
          className="glass-card rounded-2xl p-3 sm:p-4 mb-12 max-w-4xl mx-auto text-left shadow-2xl border border-white/15"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Location Selector */}
            <div className="sm:col-span-4 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 ml-1 flex items-center">
                <MapPin className="w-3 h-3 text-[#eb6753] mr-1" />
                <span>Prime Location</span>
              </label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/10 focus:border-[#eb6753] rounded-xl px-3.5 py-2.5 text-xs text-white appearance-none cursor-pointer focus:outline-none transition-colors"
                >
                  <option value="all" className="bg-charcoal-900 text-white">All Metro Manila Projects</option>
                  <option value="manila" className="bg-charcoal-900 text-white">Urban Deca Homes Manila (Tondo)</option>
                  <option value="ortigas" className="bg-charcoal-900 text-white">Urban Deca Homes Ortigas (Pasig)</option>
                  <option value="cubao" className="bg-charcoal-900 text-white">Urban Deca Towers Cubao (QC)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Unit Configuration Selector */}
            <div className="sm:col-span-3 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 ml-1 flex items-center">
                <Building2 className="w-3 h-3 text-gold-400 mr-1" />
                <span>Unit Cut</span>
              </label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/10 focus:border-[#eb6753] rounded-xl px-3.5 py-2.5 text-xs text-white appearance-none cursor-pointer focus:outline-none transition-colors"
                >
                  <option value="all" className="bg-charcoal-900 text-white">All Unit Types</option>
                  <option value="studio" className="bg-charcoal-900 text-white">Studio (13 - 22.9 sqm)</option>
                  <option value="1br" className="bg-charcoal-900 text-white">1-Bedroom (26.8 sqm)</option>
                  <option value="2br" className="bg-charcoal-900 text-white">2-Bedroom (30.6 - 36.5 sqm)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Budget Range Selector */}
            <div className="sm:col-span-3 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 ml-1 flex items-center">
                <Layers className="w-3 h-3 text-gold-400 mr-1" />
                <span>Budget (TCP)</span>
              </label>
              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/10 focus:border-[#eb6753] rounded-xl px-3.5 py-2.5 text-xs text-white appearance-none cursor-pointer focus:outline-none transition-colors"
                >
                  <option value="all" className="bg-charcoal-900 text-white">Any Price Range</option>
                  <option value="under2m" className="bg-charcoal-900 text-white">Under ₱2.0M</option>
                  <option value="2m-3m" className="bg-charcoal-900 text-white">₱2.0M - ₱3.0M</option>
                  <option value="above3m" className="bg-charcoal-900 text-white">₱3.0M &amp; Above</option>
                </select>
                <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 pt-2 sm:pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#f05a3e] rounded-xl shadow-lg shadow-[#eb6753]/30 transition-all transform hover:-translate-y-0.5"
              >
                <Search className="w-3.5 h-3.5 mr-1.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>

        {/* Quick Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
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

        {/* Futuristic Floating KPI Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-4 text-center futuristic-card">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-gold-400">
              100,000+
            </span>
            <span className="block text-[11px] text-stone-300 font-medium uppercase tracking-wider mt-1">
              Homes Delivered
            </span>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center futuristic-card">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-[#eb6753]">
              ₱10,000
            </span>
            <span className="block text-[11px] text-stone-300 font-medium uppercase tracking-wider mt-1">
              Reservation Promo
            </span>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center futuristic-card">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-gold-400">
              8 Days
            </span>
            <span className="block text-[11px] text-stone-300 font-medium uppercase tracking-wider mt-1">
              Precast Speed
            </span>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center futuristic-card">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">
              Up to 30 Yrs
            </span>
            <span className="block text-[11px] text-stone-300 font-medium uppercase tracking-wider mt-1">
              Pag-IBIG Financing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
