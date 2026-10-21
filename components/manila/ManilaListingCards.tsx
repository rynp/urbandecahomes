'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Wrench,
  Check,
  Layers,
  ZoomIn,
} from 'lucide-react';
import ZoomablePlanModal from './ZoomablePlanModal';

export interface ListingCardItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  badge?: string;
  bullets?: string[];
}

interface ManilaListingCardsProps {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  items: ListingCardItem[];
  themeColor?: 'gold' | 'charcoal' | 'emerald';
  referenceGraphicUrl?: string;
  referenceGraphicTitle?: string;
  secondaryGraphicUrl?: string;
  secondaryGraphicTitle?: string;
}

export default function ManilaListingCards({
  id,
  tag,
  title,
  subtitle,
  items,
  referenceGraphicUrl,
  referenceGraphicTitle,
  secondaryGraphicUrl,
  secondaryGraphicTitle,
}: ManilaListingCardsProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>('');

  const openModal = (url: string, planTitle: string) => {
    setModalImage(url);
    setModalTitle(planTitle);
  };

  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>{tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            {title}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Reference Graphics Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {referenceGraphicUrl && (
            <button
              type="button"
              onClick={() =>
                openModal(referenceGraphicUrl, referenceGraphicTitle || title)
              }
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-stone-50 text-charcoal-900 border border-stone-300 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition"
            >
              <Layers className="w-3.5 h-3.5 text-gold-600" />
              <span>{referenceGraphicTitle || 'Reference Schematic'}</span>
            </button>
          )}

          {secondaryGraphicUrl && (
            <button
              type="button"
              onClick={() =>
                openModal(
                  secondaryGraphicUrl,
                  secondaryGraphicTitle || 'Additional Details'
                )
              }
              className="inline-flex items-center space-x-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-charcoal-900 border border-stone-300 rounded-lg text-xs font-bold uppercase tracking-wider transition"
            >
              <ZoomIn className="w-3.5 h-3.5 text-stone-600" />
              <span>{secondaryGraphicTitle || 'Details Blueprint'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-charcoal-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />

              {/* Badge Tag */}
              {item.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-charcoal-900/90 text-gold-400 border border-charcoal-700 backdrop-blur-sm shadow">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Quick Click-to-Enlarge Trigger */}
              <button
                type="button"
                onClick={() => openModal(item.image, item.title)}
                aria-label={`View enlarged image of ${item.title}`}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-charcoal-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-500 hover:text-charcoal-950 shadow"
                title="View enlarged image"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card Content & Caption */}
            <div className="flex-1 p-5 flex flex-col justify-between space-y-3 bg-white">
              <div>
                <h3 className="font-serif text-base font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-1.5">
                  {item.caption}
                </p>
              </div>

              {/* Inclusions checklist if provided */}
              {item.bullets && item.bullets.length > 0 && (
                <div className="pt-3 border-t border-stone-100 space-y-1 text-[11px] text-stone-500">
                  {item.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="w-3 h-3 text-gold-600 mr-1.5 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {modalImage && (
        <ZoomablePlanModal
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
          title={modalTitle}
          subtitle="Official property specifications & developer documentation"
          imageUrl={modalImage}
          altText={modalTitle}
        />
      )}
    </section>
  );
}
