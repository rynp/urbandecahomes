'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  type LucideIcon,
  Trees,
  Sparkles,
  ClipboardList,
  Warehouse,
  Map,
  Layers,
  LayoutGrid,
  Building2,
  GraduationCap,
  HeartPulse,
  MapPin,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
  { id: 'amenities', label: 'Amenities', icon: Trees },
  { id: 'project-features', label: 'Features', icon: Sparkles },
  { id: 'unit-specifications', label: 'Unit Specifications', icon: ClipboardList },
  { id: 'facilities-and-services', label: 'Facilities', icon: Warehouse },
  { id: 'site-plan', label: 'Site Plan', icon: Map },
  { id: 'floor-plan', label: 'Floor Plan', icon: Layers },
  { id: 'unit-layout', label: 'Unit Layout', icon: LayoutGrid },
  { id: 'neighborhood', label: 'Neighborhood', icon: Building2 },
  { id: 'schools-nearby', label: 'Schools', icon: GraduationCap },
  { id: 'hospitals-nearby', label: 'Hospitals', icon: HeartPulse },
  { id: 'google-map', label: 'Google Map', icon: MapPin },
];

export default function ManilaSidebarNav() {
  const [activeId, setActiveId] = useState<string>('');
  const [clickingId, setClickingId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(68);
  const [isBreadcrumbVisible, setIsBreadcrumbVisible] = useState<boolean>(true);
  const [windowHeight, setWindowHeight] = useState<number>(800);

  // Smooth scroll to section on top with navbar offset
  const scrollToSection = useCallback((id: string) => {
    setClickingId(id);
    setActiveId(id);
    setTimeout(() => setClickingId(null), 300);

    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 64; // Offset for sticky navbar
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Track sticky header height and breadcrumb visibility
  useEffect(() => {
    const updateLayout = () => {
      if (typeof window !== 'undefined') {
        setWindowHeight(window.innerHeight);

        const headerEl = document.querySelector('header');
        const hHeight = headerEl ? headerEl.offsetHeight : 68;
        setHeaderHeight(hHeight);

        const breadcrumbEl = document.getElementById('page-breadcrumbs');
        if (breadcrumbEl) {
          const rect = breadcrumbEl.getBoundingClientRect();
          // Breadcrumb is considered not visible once its bottom edge scrolls behind/above the sticky header
          setIsBreadcrumbVisible(rect.bottom > hHeight);
        } else {
          setIsBreadcrumbVisible(window.scrollY < 60);
        }
      }
    };

    window.addEventListener('scroll', updateLayout, { passive: true });
    window.addEventListener('resize', updateLayout);
    updateLayout();
    return () => {
      window.removeEventListener('scroll', updateLayout);
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  // Track active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 80;
      const scrollPos = window.scrollY + headerOffset;

      for (let i = sidebarItems.length - 1; i >= 0; i--) {
        const item = sidebarItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveId(item.id);
            return;
          }
        }
      }
      setActiveId('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When breadcrumb is not visible, position sidebar with 40px clear room below floating header navigation
  const sidebarTop = isBreadcrumbVisible
    ? Math.max(130, Math.floor(windowHeight / 2 - 255))
    : headerHeight + 40;

  return (
    <>
      {/* 1. Collapsed Dock Handle (pinned to the leftmost screen edge when hidden) */}
      <div
        style={{
          top: `${sidebarTop}px`,
        }}
        className={`hidden md:flex fixed left-0 z-40 transition-all duration-300 ease-out ${
          isCollapsed
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          aria-label="Show section navigation"
          title="Show section navigation"
          className="group relative flex flex-col items-center gap-2 py-3 px-2 rounded-r-2xl bg-white/95 backdrop-blur-xl border-y border-r border-stone-200/90 shadow-xl shadow-black/10 hover:translate-x-1 hover:bg-stone-50 hover:border-gold-300/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6753]"
        >
          {/* Pulsing indicator dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eb6753] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#eb6753]" />
          </span>

          {/* Icon + Vertical Label + Chevron */}
          <div className="flex flex-col items-center gap-1.5 text-stone-500 group-hover:text-charcoal-900 transition-colors">
            <Compass className="w-4 h-4 text-[#eb6753]" strokeWidth={2} />
            <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold tracking-widest uppercase text-stone-500 group-hover:text-charcoal-900 transition-colors py-1 select-none">
              Sections
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#eb6753] group-hover:translate-x-0.5 transition-all" strokeWidth={2.5} />
          </div>

          {/* Hover Tooltip */}
          <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-white bg-charcoal-900 rounded-lg shadow-lg">
              Show Section Navigation
            </span>
            {/* Tooltip arrow pointing left */}
            <span className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-charcoal-900 rotate-45" />
          </div>
        </button>
      </div>

      {/* 2. Expanded Navigation Sidebar */}
      <nav
        aria-label="Section navigation"
        style={{
          left: 'max(14px, calc((100vw - 1280px) / 2 - 50px))',
          top: `${sidebarTop}px`,
        }}
        className={`hidden md:flex fixed z-40 flex-col items-center gap-1 py-3 px-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-stone-200/80 shadow-xl shadow-black/8 transition-all duration-300 ease-out ${
          isCollapsed
            ? '-translate-x-24 opacity-0 pointer-events-none'
            : 'translate-x-0 opacity-100 pointer-events-auto'
        }`}
      >
        {/* Top accent / Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
          className="group relative w-7 h-7 rounded-full bg-gradient-to-br from-[#eb6753] to-[#d85542] shadow-md shadow-[#eb6753]/30 flex items-center justify-center mb-1.5 transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none"
        >
          <span className="w-2 h-2 rounded-full bg-white/95 group-hover:hidden transition-all" />
          <ArrowUp className="w-3.5 h-3.5 text-white hidden group-hover:block transition-all" strokeWidth={2.5} />

          {/* Tooltip */}
          <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-white bg-charcoal-900 rounded-lg shadow-lg">
              Back to Top
            </span>
            <span className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-charcoal-900 rotate-45" />
          </div>
        </button>

        {/* Thin separator */}
        <div className="w-5 h-px bg-stone-200/80 mb-0.5" />

        {/* Navigation Icons */}
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const isClicking = clickingId === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                title={item.label}
                aria-label={item.label}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6753] ${
                  isClicking
                    ? 'scale-90 bg-stone-200/80'
                    : isActive
                    ? 'bg-stone-100 text-[#eb6753] shadow-sm font-semibold scale-105'
                    : 'text-stone-400 hover:text-charcoal-900 hover:bg-stone-100/80'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2 : 1.6} />
              </button>

              {/* Tooltip to the right pointing left */}
              <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-white bg-charcoal-900 rounded-lg shadow-lg">
                  {item.label}
                </span>
                <span className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-charcoal-900 rotate-45" />
              </div>
            </div>
          );
        })}

        {/* Thin separator */}
        <div className="w-5 h-px bg-stone-200/80 my-0.5" />

        {/* Collapse / Hide Toggle Button */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            title="Hide navigation"
            aria-label="Hide navigation"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-400 hover:text-charcoal-900 hover:bg-stone-100/90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb6753] active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          </button>

          {/* Tooltip */}
          <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-white bg-charcoal-900 rounded-lg shadow-lg">
              Hide Navigation
            </span>
            <span className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-charcoal-900 rotate-45" />
          </div>
        </div>
      </nav>
    </>
  );
}
