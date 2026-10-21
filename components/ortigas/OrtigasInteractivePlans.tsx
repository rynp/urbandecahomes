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

export default function OrtigasInteractivePlans() {
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
      id: '2br-a',
      name: '2-Bedroom Type A Layout',
      area: '30.60 sq.m.',
      type: '2-Bedroom Regular',
      image: '/images/ortigas/unit-layout-2br-a.jpg',
      diagramImage: '/images/ortigas/floor-cut-2br-a.png',
      description:
        'Smart, functional layout featuring two comfortable bedrooms, separate dining and living zones, complete kitchen counter, and private balcony.',
      inclusions: [
        'Master Bedroom + Second Bedroom',
        'Open Living & Dining Lounge',
        'Granite Kitchen Counter & Sink',
        'Private Outdoor Balcony with Railing',
      ],
    },
    {
      id: '2br-b',
      name: '2-Bedroom Inner (Type B)',
      area: '30.60 sq.m.',
      type: '2-Bedroom Inner',
      image: '/images/ortigas/unit-layout-2br-b.jpg',
      diagramImage: '/images/ortigas/floor-cut-2br-b.png',
      description:
        'Quiet mid-corridor cut with excellent interior thermal comfort, spacious closet niches, ceramic tile flooring, and fully tiled bath.',
      inclusions: [
        'Two Independent Bedroom Cuts',
        'Thermal Insulation & Quiet Location',
        'Complete Ceramic Tiled Bath',
        'Dedicated AC Wall Opening Provisions',
      ],
    },
    {
      id: '2br-c',
      name: '2-Bedroom Corner (Type C)',
      area: '35.57 sq.m.',
      type: '2-Bedroom Corner',
      image: '/images/ortigas/unit-layout-2br-c.jpg',
      diagramImage: '/images/ortigas/floor-cut-2br-c.png',
      description:
        'Spacious corner unit boasting dual-window exterior exposure, superior natural cross-ventilation, generous living area, and private balcony.',
      inclusions: [
        'Dual-Aspect Window Exposure',
        'Expanded 35.57 sqm Floor Plate',
        'Superior Cross-Ventilation Airflow',
        'Private View Balcony',
      ],
    },
    {
      id: '3br-a',
      name: '3-Bedroom Family (Type A)',
      area: '42.07 sq.m.',
      type: '3-Bedroom Suite',
      image: '/images/ortigas/unit-layout-3br-a.jpg',
      diagramImage: '/images/ortigas/floor-cut-3br-a.png',
      description:
        'Ideal growing family suite with 3 separate bedrooms, expanded dining and living hall, full bath, and premium turnkey finishes.',
      inclusions: [
        'Master Suite + 2 Guest Bedrooms',
        'Generous Living & Dining Room',
        'Full Kitchen Cabinetry & Counter',
        'Spacious Private Balcony',
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
            <span>13-Hectare Enclave Masterplan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Site Development Plan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            A master-planned 13-hectare residential enclave in Pasig City comprising 22 mid-rise buildings, a dedicated 1.3-hectare Lagoon Park, on-site Deca Community Mall, and resort amenities.
          </p>
        </div>

        {/* Masterplan Blueprint Showcase Box */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Blueprint Graphic Preview (8 cols) */}
          <div
            onClick={() =>
              openPlan(
                'Site Development Plan',
                'Urban Deca Homes Ortigas • 13 Hectares, 22 Towers, & 1.3-Ha Lagoon Park',
                '/images/ortigas/site-development-plan.png'
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
              src="/images/ortigas/site-development-plan.png"
              alt="Urban Deca Homes Ortigas Site Development Plan"
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
                  22 Mid-Rise Towers & Lagoon
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>22 Residential Towers:</strong> 13 storeys each, equipped with 4 high-speed elevators per tower.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>1.3-Hectare Lagoon Park:</strong> Sprawling reflection ponds, resort swimming pool, and jogging trails.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Deca Community Mall:</strong> Commercial complex at the entrance along Ortigas Ave Extension.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Gated Enclave:</strong> 24/7 security, controlled boom barriers, and multi-level parking structures.
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
                    'Urban Deca Homes Ortigas • 13 Hectares, 22 Towers, & 1.3-Ha Lagoon Park',
                    '/images/ortigas/site-development-plan.png'
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
                    'Building Phases Blueprint',
                    'Urban Deca Homes Ortigas • Tower Clusters & Phasing Plan',
                    '/images/ortigas/building-phases.png'
                  )
                }
                className="w-full flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition"
              >
                <Layers className="w-4 h-4 text-gold-600" />
                <span>View Building Phases Plan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TYPICAL FLOOR PLAN SECTION */}
      <section id="typical-floor-plan" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-stone-100/60 border-y border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Layers className="w-3.5 h-3.5 text-gold-600" />
            <span>Building Architecture & Circulation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Typical Building Floor Plan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Designed for superior comfort with 4 centralized high-speed elevator banks, cross-ventilated single-loaded hallways, and pressurized dual emergency fire exits.
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
                  Engineered with 4 Elevators
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>4 High-Speed Elevators:</strong> Rapid vertical transit per residential building with minimal waiting.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Naturally Ventilated Corridors:</strong> Breezy, single-loaded hallway design promoting fresh air circulation.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Dual Enclosed Fire Exits:</strong> Pressurized, fire-rated emergency exit stairs on opposing building wings.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Dedicated Utility Shafts:</strong> Individual electrical and water meter monitoring per unit floor.
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
                    'Urban Deca Homes Ortigas • Mid-Rise Tower Typical Level Floor Plan',
                    '/images/ortigas/typical-floor-plan.png'
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
                'Urban Deca Homes Ortigas • Mid-Rise Tower Typical Level Floor Plan',
                '/images/ortigas/typical-floor-plan.png'
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
              src="/images/ortigas/typical-floor-plan.png"
              alt="Urban Deca Homes Ortigas Typical Floor Plan"
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
      <section id="unit-layout" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            <Home className="w-3.5 h-3.5 text-gold-600" />
            <span>Interactive Unit Blueprints</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Unit Layout Plans & Floor Configurations
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Click on any unit layout plan to open the high-definition interactive blueprint viewer where you can zoom in, pan, and examine all room dimensions.
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
                      `Floor Area: ${unit.area} • Urban Deca Homes Ortigas`,
                      unit.diagramImage
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
                    src={unit.diagramImage}
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
                      `Floor Area: ${unit.area} • Urban Deca Homes Ortigas`,
                      unit.diagramImage
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
                      `${unit.name} (Architectural Cut)`,
                      `Floor Area: ${unit.area} • Urban Deca Homes Ortigas`,
                      unit.image
                    )
                  }
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-charcoal-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition"
                >
                  Elevation Cut
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
