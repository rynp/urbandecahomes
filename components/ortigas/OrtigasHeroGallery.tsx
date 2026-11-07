'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  MapPin,
  ZoomIn,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Navigation,
  Compass,
  Layers,
} from 'lucide-react';
import ZoomablePlanModal from '@/components/manila/ZoomablePlanModal';

interface OrtigasHeroGalleryProps {
  project: {
    name: string;
    heroImage: string;
    sitePlan?: string;
    typicalFloorPlan?: string;
    galleryImages: { url: string; alt: string; caption: string }[];
    location?: {
      address?: string;
      city?: string;
      coordinates?: { lat: number; lng: number };
    };
  };
}

export default function OrtigasHeroGallery({ project }: OrtigasHeroGalleryProps) {
  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringMain, setIsHoveringMain] = useState(false);

  // Modal States
  const [zoomModal, setZoomModal] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    imageUrl: string;
    altText: string;
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    imageUrl: '',
    altText: '',
  });

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapModalView, setMapModalView] = useState<'interactive' | 'vicinity'>('interactive');

  // Prepare slides list: Hero image followed by project gallery images
  const slides = useMemo(() => {
    const list: {
      url: string;
      alt: string;
      title: string;
      caption: string;
      badge: string;
    }[] = [];

    // First slide: Main Hero Exterior
    if (project.heroImage) {
      list.push({
        url: project.heroImage,
        alt: `${project.name} Actual Masterplan Facade`,
        title: '22 Mid-Rise Residences in Pasig',
        caption: 'Features 1.3-ha lagoon park, wide tree-lined walkways, and 4 lifts per tower',
        badge: 'Actual Masterplan Facade',
      });
    }

    // Subsequent slides from project.galleryImages
    if (project.galleryImages && project.galleryImages.length > 0) {
      project.galleryImages.forEach((img, idx) => {
        list.push({
          url: img.url,
          alt: img.alt || `${project.name} Gallery Photo ${idx + 1}`,
          title: img.alt || `${project.name} Feature View`,
          caption: img.caption || 'Modern residential spaces and world-class integrated amenities',
          badge: `Gallery Asset ${idx + 1} of ${project.galleryImages.length}`,
        });
      });
    }

    return list;
  }, [project.heroImage, project.galleryImages, project.name]);

  // Slideshow effect: Wait 10 seconds before running, then transition smoothly every 5.5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    let intervalId: NodeJS.Timeout | null = null;

    // Wait exactly 10 seconds (10000ms) on page load before starting the slideshow
    const initialDelayTimer = setTimeout(() => {
      // Advance to next slide once the 10s wait expires
      setCurrentSlide((prev) => (prev + 1) % slides.length);

      // Start continuous interval every 5.5 seconds
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5500);
    }, 10000);

    return () => {
      clearTimeout(initialDelayTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [slides.length]);

  const handlePrevSlide = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    },
    [slides.length]
  );

  const handleNextSlide = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    },
    [slides.length]
  );

  // Open Zoom Modal
  const openZoomModal = (title: string, subtitle: string, imageUrl: string, altText: string) => {
    setZoomModal({
      isOpen: true,
      title,
      subtitle,
      imageUrl,
      altText,
    });
  };

  const closeZoomModal = () => {
    setZoomModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Keyboard navigation for Map Modal
  useEffect(() => {
    if (!isMapModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMapModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMapModalOpen]);

  const sitePlanUrl = project.sitePlan || '/images/ortigas/site-development-plan.png';
  const typicalFloorPlanUrl = project.typicalFloorPlan || '/images/ortigas/typical-floor-plan.png';
  const mapCenterLat = project.location?.coordinates?.lat || 14.5888;
  const mapCenterLng = project.location?.coordinates?.lng || 121.0925;

  return (
    <>
      <div className="relative -mx-4 sm:-mx-6 lg:mx-0 rounded-none lg:rounded-[2rem] p-0 lg:p-2 bg-transparent lg:bg-[#EFE8D8]/80 border-0 lg:border border-[#DFD3BE] shadow-none lg:shadow-[0_16px_36px_-12px_rgba(50,25,18,0.08)] backdrop-blur-none lg:backdrop-blur-md flex flex-col h-full">
        {/* ============================================================ */}
        {/* 1. Large Main Building Feature with 10s Delay Slideshow      */}
        {/* ============================================================ */}
        <div
          className="relative rounded-none lg:rounded-[calc(2rem-6px)] xl:rounded-[calc(2rem-8px)] overflow-hidden group shadow-xl border-y lg:border border-white/10 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[480px] bg-charcoal-900 cursor-pointer select-none"
          onMouseEnter={() => setIsHoveringMain(true)}
          onMouseLeave={() => setIsHoveringMain(false)}
          onClick={() =>
            openZoomModal(
              slides[currentSlide]?.title || 'Urban Deca Homes Ortigas',
              slides[currentSlide]?.caption || 'Masterplan Exterior & Community Gallery',
              slides[currentSlide]?.url || project.heroImage,
              slides[currentSlide]?.alt || 'Property Photo'
            )
          }
        >
          {/* Stacked Crossfading Slides */}
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.url + idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div
                  className={`w-full h-full bg-cover bg-center transition-transform duration-1000 ${
                    isActive ? 'scale-100' : 'scale-105'
                  }`}
                  style={{ backgroundImage: `url('${slide.url}')` }}
                />
              </div>
            );
          })}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 z-10 pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20 shadow-sm">
              {slides[currentSlide]?.badge || 'Actual Masterplan Facade'}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-ochre-500/95 text-charcoal-900 text-[11px] font-bold shadow-sm">
              13-Hectare Gated Perimeter
            </span>
          </div>

          {/* Manual Arrow Controls (revealed on hover) */}
          {slides.length > 1 && (
            <div
              className={`absolute inset-y-0 inset-x-2 flex items-center justify-between z-20 pointer-events-none transition-opacity duration-300 ${
                isHoveringMain ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous image"
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/85 hover:scale-105 transition-all shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next image"
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/85 hover:scale-105 transition-all shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Bottom Captions & Slide Indicators */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20 gap-4 pointer-events-none">
            <div className="max-w-lg min-w-0">
              <p className="text-white text-sm sm:text-base font-semibold leading-tight drop-shadow-md truncate">
                {slides[currentSlide]?.title}
              </p>
              <p className="text-gray-300 text-xs mt-1 leading-snug drop-shadow line-clamp-2">
                {slides[currentSlide]?.caption}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-mono border border-white/10 shadow-sm">
                Phase 1 &amp; 2 RFO
              </span>

              {/* Slide Progress Dots */}
              {slides.length > 1 && (
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide(i);
                      }}
                      aria-label={`Jump to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'w-5 bg-ochre-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ZOOMABLE PLAN MODAL (Site Plan, Typical Floor Plan, or Hero) */}
      {/* ============================================================ */}
      <ZoomablePlanModal
        isOpen={zoomModal.isOpen}
        onClose={closeZoomModal}
        title={zoomModal.title}
        subtitle={zoomModal.subtitle}
        imageUrl={zoomModal.imageUrl}
        altText={zoomModal.altText}
      />

      {/* ============================================================ */}
      {/* POPUP BIGGER MAP MODAL                                       */}
      {/* ============================================================ */}
      {isMapModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fadeIn"
          onClick={() => setIsMapModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full h-[90vh] max-w-5xl bg-[#1A1D20] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white"
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-[#14171A]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ochre-500/20 border border-ochre-500/30 text-ochre-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-ochre-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
                      Urban Deca Homes Ortigas
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-ochre-500/20 text-ochre-300 border border-ochre-500/30">
                      Pasig City
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Ortigas Avenue Extension, Brgy. Rosario, Pasig City • Coordinates: {mapCenterLat.toFixed(4)}° N, {mapCenterLng.toFixed(4)}° E
                  </p>
                </div>
              </div>

              {/* View Switcher & Close */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="inline-flex p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setMapModalView('interactive')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      mapModalView === 'interactive'
                        ? 'bg-ochre-500 text-charcoal-900 font-bold shadow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Interactive Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapModalView('vicinity')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      mapModalView === 'vicinity'
                        ? 'bg-ochre-500 text-charcoal-900 font-bold shadow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Vicinity Blueprint</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close Map Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Map Body */}
            <div className="relative flex-1 w-full bg-[#14171A] overflow-hidden">
              {mapModalView === 'interactive' ? (
                <iframe
                  title="Urban Deca Homes Ortigas Expanded Google Map"
                  src={`https://www.google.com/maps?q=Urban+Deca+Homes+Ortigas,+Ortigas+Avenue+Extension,+Rosario,+Pasig&output=embed&z=16`}
                  className="w-full h-full border-0 filter contrast-[1.02]"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-4 bg-[#14171A]">
                  <img
                    src="/images/ortigas/vicinity-map.png"
                    alt="Urban Deca Homes Ortigas Vicinity Map"
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer: Fast Transit Landmarks & External Links */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-[#14171A] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-gray-400">
                <span className="text-[11px] uppercase font-mono text-ochre-400 font-bold">Key Hubs:</span>
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                  Ortigas CBD <strong className="text-ochre-300 ml-1">15–20 mins</strong>
                </span>
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                  Eastwood City <strong className="text-ochre-300 ml-1">10–15 mins</strong>
                </span>
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                  SM East Ortigas <strong className="text-ochre-300 ml-1">5 mins</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=Urban+Deca+Homes+Ortigas,+Ortigas+Ave+Ext,+Pasig`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ochre-500 hover:bg-ochre-600 text-charcoal-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-ochre-500/20"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`https://www.google.com/maps?q=Urban+Deca+Homes+Ortigas,+Ortigas+Avenue+Extension,+Rosario,+Pasig`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors border border-white/15"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
