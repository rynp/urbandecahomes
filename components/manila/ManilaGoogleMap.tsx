'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  ExternalLink,
  ZoomIn,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import ZoomablePlanModal from './ZoomablePlanModal';
import SplittingTitle from '@/components/ui/SplittingTitle';

export default function ManilaGoogleMap() {
  const [activeTab, setActiveTab] = useState<'google' | 'vicinity'>('google');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exact Google Maps embed URL for Urban Deca Homes Manila
  const mapEmbedUrl =
    'https://www.google.com/maps?q=Urban+Deca+Homes+Manila,+Vitas+Street,+Tondo,+Manila&output=embed&z=16';
  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Urban+Deca+Homes+Manila,+Vitas+St,+Tondo,+Manila';

  return (
    <section id="google-map" className="pt-8 sm:pt-10 pb-12 sm:pb-16 manila-section-container scroll-mt-20">
      {/* Section Header */}
      <div className="text-left max-w-2xl mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
          <MapPin className="w-3.5 h-3.5 text-gold-600" />
          <span>Building Location & Vicinity Guide</span>
        </div>
        <SplittingTitle text="Strategic Waterfront Location in Tondo, Manila" className="mt-1" />
        <p className="text-stone-600 text-sm mt-1.5 leading-normal">
          Directly along Vitas Street with rapid links to North Harbor, Divisoria, and NLEX.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-start mt-5">
          <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setActiveTab('google')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'google'
                  ? 'bg-charcoal-900 text-white shadow'
                  : 'text-stone-600 hover:text-charcoal-900'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-gold-400" />
              <span>Interactive Google Map</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vicinity')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'vicinity'
                  ? 'bg-charcoal-900 text-white shadow'
                  : 'text-stone-600 hover:text-charcoal-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>Official Vicinity Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-charcoal-900">
        {activeTab === 'google' ? (
          <div className="relative w-full h-[520px] sm:h-[600px]">
            {/* Google Maps Iframe */}
            <iframe
              title="Urban Deca Homes Manila Google Map"
              src={mapEmbedUrl}
              className="w-full h-full border-0 filter contrast-[1.02]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Building Pointer Card */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-sm bg-charcoal-950/95 backdrop-blur-md text-white p-5 rounded-xl border border-charcoal-700 shadow-2xl z-10 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0 text-charcoal-900 shadow">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                    Property Location
                  </span>
                  <h3 className="font-serif text-base font-bold leading-snug">
                    Urban Deca Homes Manila
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 flex items-start">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span>Vitas St., Tondo, Manila City (Brgy. 105)</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-charcoal-800 pt-3 text-[11px] text-stone-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Coordinates:</span>
                  <span className="font-mono text-gold-400">14.6225° N, 120.9575° E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Community:</span>
                  <span>13 Mid-Rise Towers + Deca Mall</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5" />
                  <span>Get Directions</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTab('vicinity')}
                  className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-200 bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 rounded-lg transition"
                  title="View Vicinity Blueprint"
                >
                  <Layers className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-[520px] sm:h-[600px] bg-stone-900 flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/manila/vicinity-map.png"
              alt="Urban Deca Homes Manila Official Vicinity Map"
              className="max-h-full max-w-full object-contain cursor-zoom-in rounded-lg shadow-lg hover:opacity-95 transition"
              onClick={() => setIsModalOpen(true)}
            />

            <div className="absolute bottom-6 right-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-charcoal-900/90 text-white rounded-lg text-xs font-bold uppercase tracking-wider border border-charcoal-700 hover:bg-charcoal-800 shadow-lg backdrop-blur-sm transition"
              >
                <ZoomIn className="w-4 h-4 text-gold-400" />
                <span>Zoom In / Fullscreen</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick Highlights Bar */}
        <div className="bg-charcoal-950 border-t border-charcoal-800 p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Deca Mall On-Site (550 m)</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Vitas Aquatic Center (400 m)</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Manila North Harbor (1.4 km)</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Direct NLEX Harbor Link</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vicinity Modal */}
      <ZoomablePlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Urban Deca Homes Manila Vicinity Map"
        subtitle="Official road networks, arterial access, and landmark distances"
        imageUrl="/images/manila/vicinity-map.png"
        altText="Urban Deca Homes Manila Vicinity Map"
      />
    </section>
  );
}
