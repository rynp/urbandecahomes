'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Building, Sparkles, Send } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import InquiryForm from '@/components/InquiryForm';

export default function MobileFloatingNav() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState<number>(380);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Totally remove on admin page
  const isAdmin = pathname?.startsWith('/admin');

  // Determine current project context for pre-populating form
  const currentSlug = pathname?.includes('ortigas')
    ? 'ortigas'
    : pathname?.includes('cubao')
    ? 'cubao'
    : 'manila';

  // Prevent background scrolling when sheet is open
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Global listener for custom open triggers across the app
  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener('open-mobile-inquire', handleOpen);
    return () => window.removeEventListener('open-mobile-inquire', handleOpen);
  }, []);

  // Close modal when navigating to another route
  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  // Measure bar width dynamically so the SVG curve is pixel-perfect across all mobile widths
  useEffect(() => {
    if (!barRef.current) return;
    const updateWidth = () => {
      if (barRef.current) {
        const measured = Math.round(barRef.current.offsetWidth);
        if (measured > 0) {
          setBarWidth(measured);
        }
      }
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(barRef.current);
    return () => ro.disconnect();
  }, []);

  if (isAdmin) {
    return null;
  }

  // Navigation Items
  const standardTabs = [
    {
      name: 'Manila',
      href: '/manila',
      icon: Building2,
      active: pathname === '/manila',
    },
    {
      name: 'Ortigas',
      href: '/ortigas',
      icon: Building,
      active: pathname === '/ortigas',
    },
    {
      name: 'Cubao',
      href: '/cubao',
      icon: Sparkles,
      active: pathname === '/cubao',
    },
  ];

  const isInquireActive = pathname === '/inquire-now';

  // Geometry parameters: 0 bottom margin, flat bottom sitting flush against viewport bottom
  const H = 64;
  const rTop = 22;
  const rBottom = 0;

  // The elevated button center (positioned on the right side)
  const cx = barWidth - 52;
  const scoopStart = cx - 38;
  const scoopEnd = cx + 36;
  const cradleRadius = 29;

  // Calculate dynamic SVG path matching the reference image's scooped notch
  const generatePath = () => {
    let d = `M 0 ${rTop} `;
    d += `A ${rTop} ${rTop} 0 0 1 ${rTop} 0 `;
    d += `L ${scoopStart} 0 `;
    // Smooth bezier curve down into the scoop cradle
    d += `C ${scoopStart + 12} 0, ${cx - 26} 10, ${cx - 21} 21 `;
    // Arc under the elevated circle button
    d += `A ${cradleRadius} ${cradleRadius} 0 0 0 ${cx + 21} 21 `;
    // Smooth bezier curve back up to the top edge
    d += `C ${cx + 26} 10, ${scoopEnd - 10} 0, ${scoopEnd} 0 `;

    // Top-right corner
    if (scoopEnd < barWidth - rTop) {
      d += `L ${barWidth - rTop} 0 `;
    }
    const effectiveRRight = Math.min(rTop, Math.max(8, barWidth - scoopEnd));
    d += `A ${effectiveRRight} ${effectiveRRight} 0 0 1 ${barWidth} ${effectiveRRight} `;

    // Right edge down to bottom
    d += `L ${barWidth} ${H} `;

    // Flat bottom edge (zero margin/padding gap below)
    d += `L 0 ${H} `;

    d += 'Z';
    return d;
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="block md:hidden fixed z-40 bottom-0 inset-x-0 w-full max-w-lg mx-auto select-none"
    >
      <div
        ref={barRef}
        className="relative w-full filter drop-shadow-[0_-5px_18px_rgba(62,28,21,0.12)]"
        style={{ height: `${H}px` }}
      >
        {/* Organic SVG Background with the reference scoop curve */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox={`0 0 ${barWidth} ${H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={generatePath()}
            fill="#FFFFFF"
            stroke="#EADBBD"
            strokeWidth="1.25"
          />
        </svg>

        {/* Elevated "Inquire Now" Action Button in the scooped notch - Opens Bottom Sheet Popup */}
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            trackEvent({
              name: 'inquiry_cta_click',
              params: { location_source: 'mobile_floating_nav_popup', project_preference: currentSlug },
            });
          }}
          className="absolute -top-3.5 z-20 flex flex-col items-center group focus:outline-none cursor-pointer"
          style={{
            left: `${cx - 26}px`,
            width: '52px',
          }}
          aria-label="Inquire Now - Open Instant Mobile Inquiry Form"
        >
          {/* Circular Button */}
          <div
            className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 border-2 active:scale-95 ${
              isModalOpen || isInquireActive
                ? 'bg-gradient-to-tr from-[#CE2029] via-[#B51B23] to-[#E5383B] text-white border-white shadow-lg shadow-[#CE2029]/40 scale-105 ring-2 ring-[#FAF0C8]'
                : 'bg-gradient-to-tr from-[#CE2029] to-[#E5383B] text-white border-white shadow-md shadow-[#CE2029]/30 group-hover:scale-105'
            }`}
          >
            <Send className="w-5 h-5 -translate-x-[1px] translate-y-[1px]" />
          </div>

          {/* Label below the circle, styled matching reference image */}
          <span
            className={`mt-1 text-[9.5px] font-bold tracking-tight uppercase font-logo text-center whitespace-nowrap leading-none transition-colors ${
              isModalOpen || isInquireActive ? 'text-[#CE2029]' : 'text-[#3E1C15]'
            }`}
          >
            Inquire Now
          </span>
        </button>

        {/* Standard Links: Manila, Ortigas, Cubao */}
        <div
          className="relative z-10 h-full flex items-center"
          style={{ paddingRight: '88px', paddingLeft: '8px' }}
        >
          {standardTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.active;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center py-1.5 focus:outline-none group active:scale-95 transition-transform"
              >
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-[#CE2029] bg-[#FAF0C8]/60 shadow-xs'
                      : 'text-[#685854] group-hover:text-[#3E1C15] group-hover:bg-stone-100/60'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                  {active && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#CE2029]" />
                  )}
                </div>

                <span
                  className={`mt-0.5 text-[10.5px] tracking-tight font-logo leading-none transition-colors ${
                    active
                      ? 'font-bold text-[#CE2029]'
                      : 'font-medium text-[#5C4D49] group-hover:text-[#3E1C15]'
                  }`}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Inquire Bottom Sheet Popup */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col justify-end select-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Up Bottom Sheet Card */}
          <div className="relative z-10 w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl border-t border-x border-[#E7DFD3] max-h-[92dvh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
            {/* Drag Handle Indicator */}
            <div
              className="w-12 h-1 rounded-full bg-stone-300 mx-auto my-2.5 flex-shrink-0 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
              title="Close form"
            />

            {/* Scrollable Form Container */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <InquiryForm
                isModal
                initialProject={currentSlug}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
