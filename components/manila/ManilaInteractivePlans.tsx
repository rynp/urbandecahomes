'use client';

import React, { useState } from 'react';
import {
  Compass,
  Layers,
  ZoomIn,
  Expand,
  Building,
  Home,
  Maximize2,
  CheckCircle,
  Video,
} from 'lucide-react';
import ZoomablePlanModal from './ZoomablePlanModal';
import SplittingTitle from '@/components/ui/SplittingTitle';

export default function ManilaInteractivePlans() {
  const [activeModal, setActiveModal] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    imageUrl: string;
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    imageUrl: '',
  });

  const openPlan = (title: string, subtitle: string, imageUrl: string) => {
    setActiveModal({
      isOpen: true,
      title,
      subtitle,
      imageUrl,
    });
  };

  const closeModal = () => {
    setActiveModal((prev) => ({ ...prev, isOpen: false }));
  };

  const unitLayouts = [
    {
      id: 'studio',
      name: 'Studio Unit Layout',
      area: '22.95 sq.m.',
      type: 'Studio',
      image: '/images/manila/unit-layout-studio.png',
      videoThumbnail: '/images/manila/video-studio.jpg',
      description:
        'Efficient open-concept layout with integrated sleeping, living, and dining zone, private toilet & bath, and full-service kitchen counter.',
      inclusions: [
        'Open Living & Sleeping Area',
        'Kitchen Counter with Granite Top',
        'Tiled Toilet & Bath with Exhaust',
        'Balcony Provision with Louver Blinds',
      ],
    },
    {
      id: '1br',
      name: '1-Bedroom Unit Layout',
      area: '27.42 sq.m.',
      type: '1-Bedroom',
      image: '/images/manila/unit-layout-1br.png',
      videoThumbnail: '/images/manila/video-1br.jpg',
      description:
        'Dedicated private master bedroom with separate living lounge, modern dining nook, turnkey kitchen deliverables, and panoramic window ventilation.',
      inclusions: [
        'Enclosed Private Master Bedroom',
        'Spacious Central Living Lounge',
        'Dining & Kitchenette Area',
        'Finished Ceramic Floor Tiles',
      ],
    },
    {
      id: '2br-a',
      name: '2-Bedroom Regular (Type A)',
      area: '30.60 sq.m.',
      type: '2-Bedroom',
      image: '/images/manila/unit-layout-2br-a.png',
      videoThumbnail: '/images/manila/video-2br-regular.jpg',
      description:
        'The most popular family cut in Urban Deca Homes Manila featuring two comfortable bedrooms, separate dining and living spaces, and turnkey move-in finishes.',
      inclusions: [
        'Master Bedroom + Second Bedroom',
        'Living & Dining Room Suite',
        'Granite Kitchen Counter & Sink',
        'Individual Utility Metering',
      ],
    },
    {
      id: '2br-b',
      name: '2-Bedroom Corner (Type B)',
      area: '32.17 sq.m.',
      type: '2-Bedroom Corner',
      image: '/images/manila/unit-layout-2br-b.png',
      videoThumbnail: '/images/manila/video-2br-corner.jpg',
      description:
        'Premium corner-end unit with dual-aspect exterior windows providing abundant daylight, enhanced cross-ventilation, and extra bedroom privacy.',
      inclusions: [
        'Dual-Window Corner Master Bedroom',
        'Second Bedroom with Natural Light',
        'Generous Living / Lounge Space',
        'Complete Ceramic Tiled Bath',
      ],
    },
  ];

  return (
    <>
      {/* 1. SITE DEVELOPMENT PLAN SECTION */}
      <section id="site-plan" className="pt-8 sm:pt-10 pb-12 sm:pb-16 manila-section-container border-t border-stone-200 scroll-mt-20">
        <div className="text-left max-w-2xl mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Compass className="w-3.5 h-3.5 text-gold-600" />
            <span>Master Community Masterplan</span>
          </div>
          <SplittingTitle text="Site Development Plan" className="mt-1" />
          <p className="text-stone-600 text-sm mt-1.5 leading-normal">
            An 8.4-hectare master-planned community featuring 13 mid-rise residential towers and Deca Mall.
          </p>
        </div>

        {/* Masterplan Blueprint Showcase Box */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Blueprint Graphic Preview (8 cols) */}
          <div
            onClick={() =>
              openPlan(
                'Site Development Plan',
                'Urban Deca Homes Manila • 13 Residential Towers & Deca Mall Complex',
                '/images/manila/site-development-plan.png'
              )
            }
            className="lg:col-span-8 relative bg-stone-950 min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-6 cursor-zoom-in group overflow-hidden"
          >
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/manila/site-development-plan.png"
              alt="Urban Deca Homes Manila Site Development Plan"
              className="max-h-[440px] max-w-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-2xl"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div className="px-5 py-2.5 rounded-full bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center space-x-2 transform scale-95 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-4 h-4" />
                <span>Click to Zoom In & Pan Masterplan</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-md bg-charcoal-900/90 text-[11px] font-mono text-gold-400 border border-charcoal-700 pointer-events-none flex items-center space-x-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Interactive Zoom Available</span>
            </div>
          </div>

          {/* Masterplan Highlights & Legend (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 block">
                  Project Highlights
                </span>
                <h3 className="font-serif text-xl font-bold text-charcoal-900 mt-1">
                  13 Mid-Rise Towers & Mall
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>13 Mid-Rise Buildings:</strong> 8 to 13 storeys each with dual elevators and wide corridors.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>On-Site Deca Mall:</strong> 18,000 sqm retail center with supermarket, dining, and shops.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Central Amenity Core:</strong> Resort swimming pool, covered basketball court, and pocket parks.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Dedicated Parking:</strong> Surface and multilevel parking spaces with wide driveway lanes.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6">
              <button
                type="button"
                onClick={() =>
                  openPlan(
                    'Site Development Plan',
                    'Urban Deca Homes Manila • 13 Residential Towers & Deca Mall Complex',
                    '/images/manila/site-development-plan.png'
                  )
                }
                className="w-full flex items-center justify-center space-x-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-xl shadow transition"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Open & Zoom Site Plan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TYPICAL FLOOR PLAN SECTION */}
      <section id="floor-plan" className="pt-8 sm:pt-10 pb-12 sm:pb-16 manila-section-container bg-stone-100/60 border-y border-stone-200 scroll-mt-20">
        <div className="text-left max-w-2xl mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Layers className="w-3.5 h-3.5 text-gold-600" />
            <span>Building Architecture & Layout</span>
          </div>
          <SplittingTitle text="Typical Building Floor Plan" className="mt-1" />
          <p className="text-stone-600 text-sm mt-1.5 leading-normal">
            Dual-elevator tower floor plates engineered for natural ventilation and daylight.
          </p>
        </div>

        {/* Floor Plan Card */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Highlights Left (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-white border-b lg:border-b-0 lg:border-r border-stone-200 order-2 lg:order-1">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 block">
                  Tower Level Layout
                </span>
                <h3 className="font-serif text-xl font-bold text-charcoal-900 mt-1">
                  Engineered for Comfort & Safety
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Dual Passenger Elevators:</strong> Fast, centralized vertical transport in every residential tower.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Single-Loaded & Breezy Corridors:</strong> Well-ventilated hallways with cross-draft airflow.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Dual Fire Exit Stairs:</strong> Pressurized, fire-rated emergency exit stairs at both wings.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Centralized Utility Chutes:</strong> Garbage collection and utility metering shafts on every floor.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6">
              <button
                type="button"
                onClick={() =>
                  openPlan(
                    'Typical Floor Plan',
                    'Urban Deca Homes Manila • Mid-Rise Tower Typical Level Floor Plan',
                    '/images/manila/typical-floor-plan.png'
                  )
                }
                className="w-full flex items-center justify-center space-x-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-xl shadow transition"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Open & Zoom Floor Plan</span>
              </button>
            </div>
          </div>

          {/* Floor Plan Graphic (8 cols) */}
          <div
            onClick={() =>
              openPlan(
                'Typical Floor Plan',
                'Urban Deca Homes Manila • Mid-Rise Tower Typical Level Floor Plan',
                '/images/manila/typical-floor-plan.png'
              )
            }
            className="lg:col-span-8 relative bg-stone-950 min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-6 cursor-zoom-in group overflow-hidden order-1 lg:order-2"
          >
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/manila/typical-floor-plan.png"
              alt="Urban Deca Homes Manila Typical Floor Plan"
              className="max-h-[440px] max-w-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-2xl"
            />

            <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div className="px-5 py-2.5 rounded-full bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center space-x-2 transform scale-95 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-4 h-4" />
                <span>Click to Zoom In & Inspect Floor Plan</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-charcoal-900/90 text-[11px] font-mono text-gold-400 border border-charcoal-700 pointer-events-none flex items-center space-x-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Click to Zoom</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UNIT LAYOUT SECTION */}
      <section id="unit-layout" className="pt-8 sm:pt-10 pb-12 sm:pb-16 manila-section-container scroll-mt-20">
        <div className="text-left max-w-2xl mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Home className="w-3.5 h-3.5 text-gold-600" />
            <span>Interactive Unit Blueprints</span>
          </div>
          <SplittingTitle text="Unit Layout Plans & Turnover Cuts" className="mt-1" />
          <p className="text-stone-600 text-sm mt-1.5 leading-normal">
            Interactive architectural unit cuts for Studio, 1-Bedroom, and 2-Bedroom layouts.
          </p>
        </div>

        {/* Unit Layouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {unitLayouts.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-md hover:shadow-2xl hover:border-gold-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Blueprint Interactive Header / Image */}
                <div
                  onClick={() =>
                    openPlan(
                      unit.name,
                      `Floor Area: ${unit.area} • Urban Deca Homes Manila`,
                      unit.image
                    )
                  }
                  className="relative h-64 sm:h-72 w-full bg-stone-950 flex items-center justify-center p-4 cursor-zoom-in group overflow-hidden"
                >
                  {/* Grid background */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 filter contrast-[1.05]"
                  />

                  <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="px-4 py-2 rounded-full bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow flex items-center space-x-1.5">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to Zoom Layout</span>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-400 text-charcoal-950 shadow">
                      {unit.type}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-charcoal-900/90 text-white border border-charcoal-700">
                      {unit.area}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-xl font-bold text-charcoal-900">
                      {unit.name}
                    </h3>
                    <span className="text-xs text-gold-700 font-bold">
                      {unit.area}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {unit.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-stone-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                      Layout Inclusions & Cuts:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {unit.inclusions.map((inc, i) => (
                        <div
                          key={i}
                          className="flex items-center text-xs text-stone-700"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-gold-600 mr-1.5 flex-shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openPlan(
                      unit.name,
                      `Floor Area: ${unit.area} • Urban Deca Homes Manila`,
                      unit.image
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-xl shadow transition"
                >
                  <ZoomIn className="w-3.5 h-3.5 mr-1.5" />
                  <span>Zoom & Pan Layout</span>
                </button>

                <a
                  href="#inquire"
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-charcoal-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition"
                >
                  Inquire
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shared Interactive Zoom Modal */}
      <ZoomablePlanModal
        isOpen={activeModal.isOpen}
        onClose={closeModal}
        title={activeModal.title}
        subtitle={activeModal.subtitle}
        imageUrl={activeModal.imageUrl}
        altText={activeModal.title}
      />
    </>
  );
}
