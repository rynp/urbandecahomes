'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Building, Sparkles, Send } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function MobileFloatingNav() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState<number>(380);

  // Totally remove on admin page
  const isAdmin = pathname?.startsWith('/admin');

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

        {/* Elevated "Inquire Now" Action Button in the scooped notch */}
        <Link
          href="/inquire-now"
          onClick={() => {
            trackEvent({
              name: 'inquiry_cta_click',
              params: { location_source: 'mobile_floating_nav', project_preference: 'general' },
            });
          }}
          className="absolute -top-3.5 z-20 flex flex-col items-center group focus:outline-none"
          style={{
            left: `${cx - 26}px`,
            width: '52px',
          }}
          aria-label="Inquire Now - Contact Sales and Tour Reservation"
        >
          {/* Circular Button */}
          <div
            className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 border-2 active:scale-95 ${
              isInquireActive
                ? 'bg-gradient-to-tr from-[#CE2029] via-[#B51B23] to-[#E5383B] text-white border-white shadow-lg shadow-[#CE2029]/40 scale-105 ring-2 ring-[#FAF0C8]'
                : 'bg-gradient-to-tr from-[#CE2029] to-[#E5383B] text-white border-white shadow-md shadow-[#CE2029]/30 group-hover:scale-105'
            }`}
          >
            <Send className="w-5 h-5 -rotate-12 translate-x-0.5 -translate-y-0.5" />
          </div>

          {/* Label below the circle, styled matching reference image */}
          <span
            className={`mt-1 text-[9.5px] font-bold tracking-tight uppercase font-logo text-center whitespace-nowrap leading-none transition-colors ${
              isInquireActive ? 'text-[#CE2029]' : 'text-[#3E1C15]'
            }`}
          >
            Inquire Now
          </span>
        </Link>

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
    </nav>
  );
}
