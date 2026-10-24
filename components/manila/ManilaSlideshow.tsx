'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  Pause,
  Layers,
  ZoomIn,
  Building,
  GraduationCap,
  HeartPulse,
} from 'lucide-react';
import ZoomablePlanModal from './ZoomablePlanModal';
import SplittingTitle from '@/components/ui/SplittingTitle';

export interface SlideshowItem {
  id: string;
  name: string;
  distance: string;
  category: string;
  description: string;
  image: string;
}

interface ManilaSlideshowProps {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  items: SlideshowItem[];
  officialGraphicUrl?: string;
  officialGraphicTitle?: string;
  themeIcon?: 'neighborhood' | 'schools' | 'hospitals';
}

export default function ManilaSlideshow({
  id,
  tag,
  title,
  subtitle,
  items,
  officialGraphicUrl,
  officialGraphicTitle,
  themeIcon = 'neighborhood',
}: ManilaSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  const currentItem = items[currentIndex];

  const renderIcon = () => {
    switch (themeIcon) {
      case 'schools':
        return <GraduationCap className="w-4 h-4 text-gold-600" />;
      case 'hospitals':
        return <HeartPulse className="w-4 h-4 text-gold-600" />;
      default:
        return <Building className="w-4 h-4 text-gold-600" />;
    }
  };

  return (
    <section id={id} className="pt-8 sm:pt-10 pb-12 sm:pb-16 manila-section-container scroll-mt-20" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-50 text-gold-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-gold-200">
            {renderIcon()}
            <span>{tag}</span>
          </div>
          <SplittingTitle text={title} className="mt-1" />
          <p className="text-stone-600 text-sm mt-1.5 max-w-2xl leading-normal">
            {subtitle}
          </p>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-3">
          {officialGraphicUrl && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-stone-50 text-charcoal-900 border border-stone-300 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition"
            >
              <Layers className="w-3.5 h-3.5 text-gold-600" />
              <span>Official Map Graphic</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
            title={isPlaying ? 'Pause auto-play' : 'Play auto-play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slideshow Stage */}
      <div className="relative rounded-2xl overflow-hidden bg-charcoal-950 border border-charcoal-800 shadow-2xl group">
        <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden">
          {/* Background Image with smooth transition */}
          <div
            key={currentItem.id}
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100 group-hover:scale-105"
            style={{ backgroundImage: `url(${currentItem.image})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 via-transparent to-transparent hidden sm:block" />

          {/* Slide Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none z-20">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="pointer-events-auto p-3 rounded-full bg-charcoal-900/80 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-charcoal-700 backdrop-blur-sm transition-all transform hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="pointer-events-auto p-3 rounded-full bg-charcoal-900/80 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-charcoal-700 backdrop-blur-sm transition-all transform hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Current Slide Caption Card */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 pointer-events-none">
            <div className="max-w-3xl pointer-events-auto">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gold-400 text-charcoal-950 shadow">
                  {currentItem.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-charcoal-800/90 text-gold-300 border border-charcoal-700">
                  <MapPin className="w-3 h-3 mr-1 text-gold-400" />
                  {currentItem.distance} from Project
                </span>
                <span className="text-xs text-stone-300 ml-auto hidden sm:inline-block font-mono">
                  {currentIndex + 1} / {items.length}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                {currentItem.name}
              </h3>

              <p className="text-stone-200 text-xs sm:text-sm mt-2 leading-relaxed drop-shadow max-w-2xl">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="bg-charcoal-900/95 border-t border-charcoal-800 p-3 sm:p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-charcoal-700">
          <div className="flex items-center space-x-3 min-w-max">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                className={`relative flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                  idx === currentIndex
                    ? 'bg-gold-500/20 border-2 border-gold-400 text-white'
                    : 'bg-charcoal-800/60 border border-charcoal-700 text-stone-400 hover:text-stone-200 hover:bg-charcoal-800'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="max-w-[140px] truncate">
                  <span className="block text-xs font-semibold text-white truncate">
                    {item.name}
                  </span>
                  <span className="block text-[10px] text-gold-400 font-mono">
                    {item.distance}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Official Map Modal Lightbox */}
      {officialGraphicUrl && (
        <ZoomablePlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={officialGraphicTitle || title}
          subtitle="Official reference graphic and distance guide from developer documentation"
          imageUrl={officialGraphicUrl}
          altText={officialGraphicTitle || title}
        />
      )}
    </section>
  );
}
