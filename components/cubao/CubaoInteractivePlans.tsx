'use client';

import React, { useState } from 'react';
import {
  Compass,
  Layers,
  ZoomIn,
  Home,
  Maximize2,
  CheckCircle,
} from 'lucide-react';
import ZoomablePlanModal from '@/components/manila/ZoomablePlanModal';

export default function CubaoInteractivePlans() {
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
      id: 'studio-a',
      name: 'Studio Unit Layout (Type A)',
      area: '13.06 sq.m.',
      type: 'Micro Studio',
      image: '/images/cubao/unit-layout-studio-a.png',
      blueprintImage: '/images/cubao/unit-layout-studio-b.png',
      description:
        'Ergonomic urban micro-living studio cut with integrated sleeping and study zone, private toilet & bath, and kitchenette counter.',
      inclusions: [
        'Integrated Sleeping & Work Space',
        'Granite Kitchen Counter & Sink',
        'Tiled Toilet & Bath with Shower',
        'AC Wall Sleeve & 220V Outlet',
      ],
    },
    {
      id: 'studio-b',
      name: 'Studio Architectural Elevation (Type B)',
      area: '13.06 sq.m.',
      type: 'Studio Elevation',
      image: '/images/cubao/unit-layout-studio-b.png',
      blueprintImage: '/images/cubao/unit-layout-studio-a.png',
      description:
        'Detailed architectural section illustrating vertical space optimization, overhead cabinetry, window placements, and plumbing lines.',
      inclusions: [
        'Optimized Vertical Storage Cut',
        'Vitrified Ceramic Floor Tiles',
        'Ceiling Fire Sprinkler & Smoke Sensor',
        'Window Blinds & Exhaust Provisions',
      ],
    },
    {
      id: '1br-a',
      name: '1-Bedroom Suite (Type A)',
      area: '16.08 sq.m.',
      type: '1-Bedroom Suite',
      image: '/images/cubao/unit-layout-1br-a.png',
      blueprintImage: '/images/cubao/unit-layout-1br-b.png',
      description:
        'Smart 1-bedroom configuration providing an independent partitioned bedroom retreat, living study area, and complete turnkey bathroom.',
      inclusions: [
        'Partitioned Private Bedroom Zone',
        'Dedicated Living & Study Area',
        'Granite Countertop Kitchenette',
        'Pre-Wired Electrical & TV Cable',
      ],
    },
    {
      id: '1br-b',
      name: '1-Bedroom Architectural Plan (Type B)',
      area: '16.08 sq.m.',
      type: '1-Bedroom Plan',
      image: '/images/cubao/unit-layout-1br-b.png',
      blueprintImage: '/images/cubao/unit-layout-1br-a.png',
      description:
        'Comprehensive architectural layout schematic displaying exact room dimensions, electrical outlets, and interior wall partitions.',
      inclusions: [
        'Detailed Dimension Floor Plan',
        'Drywall Room Separator Wall',
        'Full Ceramic Bathroom Tiling',
        'Plumbing Grease Interceptor',
      ],
    },
  ];

  return (
    <>
      {/* 1. SITE DEVELOPMENT PLAN SECTION */}
      <section id="site-development-plan" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Compass className="w-3.5 h-3.5 text-gold-600" />
            <span>46-Storey Skyscraper Masterplan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Site Development Plan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Directly fronting EDSA in Cubao, Quezon City, Urban Deca Towers is an imposing 46-storey residential skyscraper featuring ground-floor commercial retail, basement parking, and a covered porte-cochère drop-off.
          </p>
        </div>

        {/* Masterplan Blueprint Showcase Box */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Blueprint Graphic Preview (8 cols) */}
          <div
            onClick={() =>
              openPlan(
                'Site Development Plan',
                'Urban Deca Towers Cubao • 46-Storey Skyscraper along EDSA',
                '/images/cubao/site-development-plan.png'
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
              src="/images/cubao/site-development-plan.png"
              alt="Urban Deca Towers Cubao Site Development Plan"
              className="max-h-[440px] max-w-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-2xl"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div className="px-5 py-2.5 rounded-full bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center space-x-2 transform scale-95 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-4 h-4" />
                <span>Click to Zoom In & Pan Site Plan</span>
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
                  Tower Highlights
                </span>
                <h3 className="font-serif text-xl font-bold text-charcoal-900 mt-1">
                  46 Storeys on EDSA
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>46-Storey Skyscraper:</strong> Iconic high-rise presence along the central EDSA Cubao thoroughfare.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>12 High-Speed Elevators:</strong> Massive 1,350 kg capacity each with zoned dispatch systems.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>2 Commercial Floors:</strong> Ground-level retail stores and 2nd-floor laundromat and resident services.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Emergency Power:</strong> Standby generators powering elevators, common lighting, and refrigerator outlets.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() =>
                  openPlan(
                    'Site Development Plan',
                    'Urban Deca Towers Cubao • 46-Storey Skyscraper along EDSA',
                    '/images/cubao/site-development-plan.png'
                  )
                }
                className="w-full flex items-center justify-center space-x-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-xl shadow transition"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Open & Zoom Site Plan</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openPlan(
                    'Building Floor Plan Schematic',
                    'Urban Deca Towers Cubao • Tower Core & Elevator Distribution',
                    '/images/cubao/building-floor-plan.png'
                  )
                }
                className="w-full flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition"
              >
                <Layers className="w-4 h-4 text-gold-600" />
                <span>View Building Floor Plan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUILDING FLOOR PLAN SECTION */}
      <section id="typical-floor-plan" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-stone-100/60 border-y border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Layers className="w-3.5 h-3.5 text-gold-600" />
            <span>Skyscraper Floor Plate & Circulation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Building Floor Plans by Zone
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Engineered with a high-capacity 12-elevator central core, fire-rated dual stairwells, and zoned floor plates optimized for low, mid, and high-rise residences.
          </p>
        </div>

        {/* Floor Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Low Zone Floor Plan */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between p-5 space-y-4">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-gold-900">
                Low Zone Levels
              </span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Podium & Low Floors
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct accessibility to commercial amenities, laundromat, and basement parking elevators.
              </p>
              <div
                onClick={() =>
                  openPlan(
                    'Low Zone Floor Plan',
                    'Urban Deca Towers Cubao • Low Level Distribution',
                    '/images/cubao/floor-plan-low.png'
                  )
                }
                className="relative h-48 bg-stone-950 rounded-xl overflow-hidden flex items-center justify-center p-2 cursor-zoom-in group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cubao/floor-plan-low.png"
                  alt="Low Zone Floor Plan"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-full bg-gold-400 text-charcoal-950 font-bold text-[11px] uppercase flex items-center space-x-1">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openPlan(
                  'Low Zone Floor Plan',
                  'Urban Deca Towers Cubao • Low Level Distribution',
                  '/images/cubao/floor-plan-low.png'
                )
              }
              className="w-full py-2 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-stone-100 hover:bg-gold-400 rounded-lg transition"
            >
              Zoom Low-Zone Plan
            </button>
          </div>

          {/* Mid Zone Floor Plan */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between p-5 space-y-4">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-gold-900">
                Mid Zone Levels
              </span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Mid-Rise Tower Floors
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Centralized high-speed elevator stops, cross-ventilation shafts, and balanced floor occupancy.
              </p>
              <div
                onClick={() =>
                  openPlan(
                    'Mid Zone Floor Plan',
                    'Urban Deca Towers Cubao • Mid Level Distribution',
                    '/images/cubao/floor-plan-mid.png'
                  )
                }
                className="relative h-48 bg-stone-950 rounded-xl overflow-hidden flex items-center justify-center p-2 cursor-zoom-in group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cubao/floor-plan-mid.png"
                  alt="Mid Zone Floor Plan"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-full bg-gold-400 text-charcoal-950 font-bold text-[11px] uppercase flex items-center space-x-1">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openPlan(
                  'Mid Zone Floor Plan',
                  'Urban Deca Towers Cubao • Mid Level Distribution',
                  '/images/cubao/floor-plan-mid.png'
                )
              }
              className="w-full py-2 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-stone-100 hover:bg-gold-400 rounded-lg transition"
            >
              Zoom Mid-Zone Plan
            </button>
          </div>

          {/* High Zone Floor Plan */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between p-5 space-y-4">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-gold-900">
                High Zone Levels
              </span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Penthouse & High Floors
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Spectacular panoramic views of Metro Manila skyline, Sierra Madre mountains, and Ortigas.
              </p>
              <div
                onClick={() =>
                  openPlan(
                    'High Zone Floor Plan',
                    'Urban Deca Towers Cubao • High Level Distribution',
                    '/images/cubao/floor-plan-high.png'
                  )
                }
                className="relative h-48 bg-stone-950 rounded-xl overflow-hidden flex items-center justify-center p-2 cursor-zoom-in group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cubao/floor-plan-high.png"
                  alt="High Zone Floor Plan"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-full bg-gold-400 text-charcoal-950 font-bold text-[11px] uppercase flex items-center space-x-1">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openPlan(
                  'High Zone Floor Plan',
                  'Urban Deca Towers Cubao • High Level Distribution',
                  '/images/cubao/floor-plan-high.png'
                )
              }
              className="w-full py-2 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-stone-100 hover:bg-gold-400 rounded-lg transition"
            >
              Zoom High-Zone Plan
            </button>
          </div>
        </div>
      </section>

      {/* 3. UNIT LAYOUT SECTION */}
      <section id="unit-layout" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Home className="w-3.5 h-3.5 text-gold-600" />
            <span>Micro-Living Blueprints</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Unit Layout Plans & Elevation Cuts
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Click on any unit layout or elevation cut to open the high-definition interactive blueprint viewer where you can zoom in, pan, and examine all room dimensions.
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
                      `Floor Area: ${unit.area} • Urban Deca Towers Cubao`,
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
                      `Floor Area: ${unit.area} • Urban Deca Towers Cubao`,
                      unit.image
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-xl shadow transition"
                >
                  <ZoomIn className="w-3.5 h-3.5 mr-1.5" />
                  <span>Zoom & Pan Layout</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openPlan(
                      `${unit.name} (Blueprint Elevation)`,
                      `Floor Area: ${unit.area} • Urban Deca Towers Cubao`,
                      unit.blueprintImage
                    )
                  }
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-charcoal-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition"
                >
                  Blueprint View
                </button>
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
