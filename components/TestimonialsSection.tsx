'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BadgeCheck, Building2, ChevronRight, ChevronLeft } from 'lucide-react';
import { homeownerTestimonials } from '@/data/testimonials';

// Fallback background image if a testimonial does not have one
const DEFAULT_BG_IMAGE = '/images/testimonials/testimonial-1.jpg';

// Helper to format surname as initial (e.g. "Camille Anne Santos" -> "Camille Anne S.")
function formatSurnameToInitial(name: string): string {
  const trimmed = name.trim();
  if (/Dela\s+Cruz$/i.test(trimmed)) {
    return trimmed.replace(/Dela\s+Cruz$/i, 'D.');
  }
  if (/Del\s+Rosario$/i.test(trimmed)) {
    return trimmed.replace(/Del\s+Rosario$/i, 'D.');
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length <= 1) return name;
  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(' ')} ${last[0].toUpperCase()}.`;
}

// Helper to format category unit badge to show area and unit type with bedroom count (e.g. "Manila • 2-Bedroom", "Cubao • Studio")
function formatLocationBadge(project: string, unitType: string): string {
  let area = 'Manila';
  if (/Ortigas/i.test(project)) area = 'Ortigas';
  else if (/Cubao/i.test(project)) area = 'Cubao';
  else if (/Manila/i.test(project)) area = 'Manila';

  let unit = 'Bedroom';
  const bedroomMatch = unitType.match(/(\d+)\s*-?\s*bedroom/i);
  if (bedroomMatch) {
    unit = `${bedroomMatch[1]}-Bedroom`;
  } else if (/Studio/i.test(unitType)) {
    unit = 'Studio';
  } else if (/Bedroom/i.test(unitType)) {
    unit = 'Bedroom';
  }

  return `${area} • ${unit}`;
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = homeownerTestimonials.length;

  // Track window resize to calibrate responsive 3D card spacing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay with hover pause
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  // Touch Swipe Handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 45) {
      prev();
    } else if (diff < -45) {
      next();
    }
    touchStartX.current = null;
  };

  // Compute 3D Coverflow position style for each card
  const getCardStyle = (offset: number) => {
    const isDesktop = windowWidth >= 1024;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    const isSmallTablet = windowWidth >= 640 && windowWidth < 768;

    // Step distances between card centers
    const step1 = isDesktop ? 295 : isTablet ? 220 : isSmallTablet ? 180 : 135;
    const step2 = isDesktop ? 515 : isTablet ? 385 : isSmallTablet ? 320 : 250;

    // 1. Active center card
    if (offset === 0) {
      return {
        transform: 'translate(-50%, -50%) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'none',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 20px rgba(235, 103, 83, 0.15)',
        pointerEvents: 'auto' as const,
      };
    }

    // 2. Immediate right card (+1)
    if (offset === 1) {
      return {
        transform: `translate(calc(-50% + ${step1}px), -50%) scale(0.8)`,
        zIndex: 20,
        opacity: 0.88,
        filter: 'none',
        boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
        pointerEvents: 'auto' as const,
      };
    }

    // 3. Immediate left card (-1)
    if (offset === -1) {
      return {
        transform: `translate(calc(-50% - ${step1}px), -50%) scale(0.8)`,
        zIndex: 20,
        opacity: 0.88,
        filter: 'none',
        boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
        pointerEvents: 'auto' as const,
      };
    }

    // 4. Outer right card (+2) - visible on tablet and desktop (showing 5 cards)
    if (offset === 2) {
      const isVisible = windowWidth >= 640;
      return {
        transform: `translate(calc(-50% + ${step2}px), -50%) scale(0.62)`,
        zIndex: 10,
        opacity: isVisible ? 0.55 : 0,
        filter: isVisible ? 'blur(1.5px)' : 'none',
        boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.2)',
        pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
      };
    }

    // 5. Outer left card (-2) - visible on tablet and desktop (showing 5 cards)
    if (offset === -2) {
      const isVisible = windowWidth >= 640;
      return {
        transform: `translate(calc(-50% - ${step2}px), -50%) scale(0.62)`,
        zIndex: 10,
        opacity: isVisible ? 0.55 : 0,
        filter: isVisible ? 'blur(1.5px)' : 'none',
        boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.2)',
        pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
      };
    }

    // Hidden cards outside the visible 5-card viewport
    const hiddenDir = offset > 0 ? 1 : -1;
    return {
      transform: `translate(calc(-50% + ${hiddenDir * (step2 + 160)}px), -50%) scale(0.4)`,
      zIndex: 0,
      opacity: 0,
      filter: 'blur(3px)',
      boxShadow: 'none',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <section className="bg-stone-100/70 py-12 sm:py-16 border-y border-stone-200/90 relative overflow-hidden cyber-grid-light">
      {/* Ambient background glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#eb6753]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#e8cf7b]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-[#eb6753] text-xs font-bold uppercase tracking-widest mb-3">
            <BadgeCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Homeowner Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 tracking-tight">
            Hear From Our Community Residents
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3.5 leading-relaxed max-w-2xl mx-auto">
            Real experiences from everyday Filipino families, healthcare workers, BPO team leaders, and OFWs who turned their dreams of city condominium ownership into reality.
          </p>
        </div>

        {/* 3D Coverflow 5-Card Stage Container */}
        <div
          className="relative w-full h-[470px] sm:h-[500px] md:h-[530px] lg:h-[560px] overflow-hidden select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Circular Left Previous Navigation Arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md text-charcoal-900 shadow-xl border border-stone-200/80 flex items-center justify-center cursor-pointer z-40 hover:scale-110 active:scale-95 hover:bg-[#eb6753] hover:text-white hover:border-[#eb6753] transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Circular Right Next Navigation Arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md text-charcoal-900 shadow-xl border border-stone-200/80 flex items-center justify-center cursor-pointer z-40 hover:scale-110 active:scale-95 hover:bg-[#eb6753] hover:text-white hover:border-[#eb6753] transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Testimonial Cards Rendered in 3D Stack */}
          {homeownerTestimonials.map((t, index) => {
            // Calculate shortest circular offset from active card
            let offset = index - activeIndex;
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            const isCenter = offset === 0;

            return (
              <div
                key={t.id}
                onClick={() => {
                  if (!isCenter) setActiveIndex(index);
                }}
                style={{
                  ...getCardStyle(offset),
                  transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s ease, filter 0.45s ease, box-shadow 0.45s ease',
                  willChange: 'transform, opacity, filter',
                }}
                className={`absolute left-1/2 top-1/2 w-[82vw] max-w-[320px] sm:w-[285px] md:w-[310px] lg:w-[350px] h-[430px] sm:h-[460px] md:h-[490px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none bg-charcoal-950 border border-white/10 group`}
              >
                {/* Full-Bleed Handover Photo (Slightly Brighter with enhanced clarity) */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 brightness-[1.20] contrast-[1.03] saturate-[1.04]"
                  style={{
                    backgroundImage: `url(${t.bgImage || DEFAULT_BG_IMAGE})`,
                  }}
                />

                {/* Bottom Gradient Overlay for Text Contrast */}
                <div className="absolute bottom-0 left-0 right-0 h-[58%] sm:h-[55%] bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent pointer-events-none" />

                {/* Bottom Text Content (matching Framer reference typography) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 z-10 flex flex-col justify-end">
                  {/* Category / Unit Badge: Area and simplified Unit Type (e.g. "Manila • Bedroom") */}
                  <div className="mb-2">
                    <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#eb6753] bg-charcoal-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 inline-flex items-center space-x-1.5 shadow-sm">
                      <span>{formatLocationBadge(t.project, t.unitType)}</span>
                    </span>
                  </div>

                  {/* Author Name */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight leading-tight mb-1 drop-shadow-sm">
                    {formatSurnameToInitial(t.name)}
                  </h3>

                  {/* Role / Profession */}
                  <p className="text-xs text-stone-300 font-medium mb-2.5">
                    {t.role}
                  </p>

                  {/* Quoted Message (compact font size without toggle button) */}
                  <p className="text-[11px] sm:text-xs text-stone-100/95 leading-relaxed italic font-light drop-shadow">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          {homeownerTestimonials.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-7 bg-[#eb6753] shadow-xs'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            );
          })}
        </div>

        {/* Bottom Social Proof Metrics */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
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
