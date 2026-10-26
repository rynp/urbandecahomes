'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  Phone,
  Send,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageCircle,
  Building2,
  Calendar,
} from 'lucide-react';
import { businessInfo } from '@/data/business';
import { projects } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneClick = (phone: string) => {
    trackEvent({
      name: 'phone_click',
      params: { phone_number: phone, location_source: 'navbar_call_button' },
    });
  };

  const navLinks = [
    { name: 'Home', shortName: 'Home', href: '/' },
    ...projects.map((p) => ({
      name: p.name,
      shortName: p.slug === 'manila' ? 'Manila' : p.slug === 'ortigas' ? 'Ortigas' : 'Cubao',
      href: `/${p.slug}`,
    })),
  ];

  const quickNavLinks = [
    { name: 'Financing', href: '/details', desc: 'Calculator & Buyer Guides' },
    { name: 'Blog', href: '/news-and-promo', desc: 'News, Promos & Updates' },
    { name: '4PH Housing', href: '/4ph', desc: 'Government Subsidy Program' },
    { name: 'About Us', href: '/about-us', desc: 'Developer History & Vision' },
    { name: 'Contact Us', href: '/contact-us', desc: 'Sales Offices & Schedules' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled ? 'glass-header-scrolled py-2' : 'glass-header py-3'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Official Asset & Typography */}
          <Link
            href="/"
            className="flex items-center space-x-3.5 group focus:outline-none flex-shrink-0"
            title="Urban Deca Homes Philippines - Home"
          >
            <div className="relative flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Urban Deca Homes Official Logo"
                width={64}
                height={64}
                className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-xs"
                priority
              />
            </div>
            <div className="flex items-baseline space-x-1 sm:space-x-1.5">
              <span className="font-logo text-xl sm:text-2xl md:text-[26px] font-black tracking-tight text-[#CE2029] uppercase leading-none drop-shadow-xs">
                URBAN
              </span>
              <span className="font-logo text-xl sm:text-2xl md:text-[26px] font-black tracking-tight text-[#4A1E17] uppercase leading-none drop-shadow-xs">
                DECA
              </span>
              <span className="font-logo text-xl sm:text-2xl md:text-[26px] font-semibold tracking-tight text-[#4A1E17] uppercase leading-none drop-shadow-xs">
                HOMES
              </span>
            </div>
          </Link>

          {/* Desktop Unified Glassmorphic Dock Navigation */}
          <nav
            className="hidden lg:flex items-center glass-nav-dock space-x-1"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group glass-nav-item focus:outline-none ${
                    isActive ? 'glass-nav-item-active' : ''
                  }`}
                  title={link.name}
                >
                  {/* Active Glowing Dot Indicator */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CE2029] shadow-[0_0_8px_rgba(206,32,41,0.8)] mr-2 animate-pulse flex-shrink-0" />
                  )}

                  {/* Kinetic Dual-Deck Text Rolling Animation */}
                  <span className="kinetic-text-container font-logo tracking-tight">
                    <span className="kinetic-text-primary">
                      {link.shortName}
                    </span>
                    <span className="kinetic-text-reveal">
                      {link.shortName}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger & Primary Inquire CTA */}
          <div className="flex items-center space-x-3">
            <Link
              href="/inquire-now"
              onClick={() => {
                trackEvent({
                  name: 'inquiry_cta_click',
                  params: { location_source: 'navbar_desktop_inquire' },
                });
              }}
              className="hidden sm:inline-flex items-center justify-center space-x-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider glass-neumorph-primary rounded-full cursor-pointer whitespace-nowrap min-w-[124px]"
            >
              <span>Inquire</span>
              <Send className="w-3.5 h-3.5" />
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setQuickMenuOpen(!quickMenuOpen);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="glass-pill flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none rounded-full text-[#4A1E17] p-2"
                aria-label="Toggle Quick Actions & Menu"
                aria-expanded={quickMenuOpen || mobileMenuOpen}
              >
                <span
                  className={`h-[2px] bg-[#4A1E17] rounded-full transition-all duration-300 ${quickMenuOpen || mobileMenuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'
                    }`}
                />
                <span
                  className={`h-[2px] bg-[#4A1E17] rounded-full transition-all duration-300 ${quickMenuOpen || mobileMenuOpen ? 'w-5 -rotate-45' : 'w-3.5'
                    }`}
                />
              </button>

            {/* Desktop Quick Dropdown Menu in Glass Card */}
            <div
              className={`hidden lg:block absolute right-0 top-full pt-2.5 w-[380px] max-w-[90vw] transition-all duration-300 ease-out transform ${quickMenuOpen
                ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                : 'opacity-0 translate-y-2 invisible pointer-events-none'
                }`}
            >
              <div className="glass-card rounded-[28px] p-5 shadow-2xl">
                <div className="flex items-center space-x-3 pb-3.5 border-b border-amber-900/10">
                  <div className="relative flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Urban Deca Homes Logo"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain drop-shadow-xs"
                    />
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <span className="font-logo text-sm font-black text-[#CE2029] uppercase">URBAN</span>
                      <span className="font-logo text-sm font-black text-[#4A1E17] uppercase">DECA</span>
                      <span className="font-logo text-sm font-semibold text-[#4A1E17] uppercase">HOMES</span>
                    </div>
                    <span className="block text-[11px] text-[#CE2029] font-semibold">Metro Manila Sales Office</span>
                  </div>
                </div>

                {/* Primary Inquire Now & Call Us Buttons */}
                <div className="pt-3.5 space-y-2.5">
                  <Link
                    href="/inquire-now"
                    onClick={() => {
                      setQuickMenuOpen(false);
                      trackEvent({
                        name: 'inquiry_cta_click',
                        params: { location_source: 'navbar_quick_menu' },
                      });
                    }}
                    className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold uppercase tracking-wider glass-neumorph-primary rounded-2xl cursor-pointer"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>Inquire Now</span>
                  </Link>

                  <a
                    href={`tel:${businessInfo.phones[0].value}`}
                    onClick={() => {
                      setQuickMenuOpen(false);
                      handlePhoneClick(businessInfo.phones[0].value);
                    }}
                    className="w-full flex items-center justify-center px-4 py-3 text-xs font-semibold text-[#4A1E17] hover:text-[#CE2029] glass-pill rounded-2xl transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 mr-2 text-[#CE2029]" />
                    <span>Call Us ({businessInfo.phones[0].display})</span>
                  </a>

                  <a
                    href={businessInfo.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setQuickMenuOpen(false);
                      trackEvent({
                        name: 'messaging_click',
                        params: { channel: 'whatsapp', location_source: 'navbar_quick_menu' },
                      });
                    }}
                    className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-emerald-950 bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 hover:from-emerald-500/25 hover:to-emerald-400/20 rounded-2xl border border-emerald-500/30 shadow-[0_4px_12px_rgba(16,185,129,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Navigation Menu Options Under WhatsApp Button */}
                <div className="mt-3.5 pt-3 border-t border-amber-900/10">
                  <div className="px-2 pb-1.5 text-[11px] font-bold text-[#7A5B52] uppercase tracking-wider flex items-center justify-between">
                    <span>Navigation Menu</span>
                    <span className="text-[#CE2029] text-[10px] font-semibold">Deca Guides</span>
                  </div>
                  <div className="space-y-1">
                    {quickNavLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setQuickMenuOpen(false)}
                        className="group flex items-center justify-between px-3.5 py-2.5 rounded-2xl glass-pill mb-1.5 transition-all duration-200"
                      >
                        <div>
                          <span className="block text-sm font-semibold text-[#4A1E17] group-hover:text-[#CE2029] transition-colors">
                            {item.name}
                          </span>
                          <span className="block text-[11px] text-[#6E4F47] group-hover:text-[#4A1E17] transition-colors">
                            {item.desc}
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-full glass-logo-badge group-hover:bg-[#CE2029] group-hover:border-[#CE2029] flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-2">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#6B5A33] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-amber-900/10 text-[11px] text-[#6E4F47] space-y-1.5">
                  <div className="flex items-center text-[#6E4F47]">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-[#8A675F]" />
                    <span>Viewing Hours: {businessInfo.officeHours.days} ({businessInfo.officeHours.hours})</span>
                  </div>
                  <div className="flex items-center text-[#6E4F47]">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
                    <span>Pag-IBIG Accredited Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Drawer Navigation in Glass Card */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[88vh] opacity-100 py-3 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="glass-card rounded-[26px] p-4 space-y-3 overflow-y-auto max-h-[78vh] shadow-2xl">
            {/* Top Quick Actions: Inquire Now & Call Us Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-amber-900/10">
              <Link
                href="/inquire-now"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-2.5 text-xs font-bold uppercase tracking-wider glass-neumorph-primary rounded-2xl cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                <span>Inquire Now</span>
              </Link>
              <a
                href={`tel:${businessInfo.phones[0].value}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handlePhoneClick(businessInfo.phones[0].value);
                }}
                className="flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-[#4A1E17] hover:text-[#CE2029] glass-pill rounded-2xl transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
                <span>Call Us</span>
              </a>
            </div>

            <div className="px-1 text-xs font-bold tracking-wider text-[#7A5B52] uppercase flex items-center justify-between">
              <span>Explore Properties</span>
              <span className="text-[10px] text-[#CE2029] font-bold">Metro Manila</span>
            </div>

            <div className="space-y-1.5">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/${project.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-[#4A1E17] glass-pill rounded-2xl transition-all"
                >
                  <span>{project.name}</span>
                  <div className="w-7 h-7 rounded-full glass-logo-badge flex items-center justify-center flex-shrink-0 ml-2">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6B5A33]" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-amber-900/10 space-y-1">
              <div className="px-1 pb-1 text-xs font-bold tracking-wider text-[#7A6F5D] uppercase">
                Buyer Resources & Contact
              </div>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 text-sm font-medium text-[#453D30] hover:text-[#1F190D] hover:bg-[#FAF3DC]/60 rounded-xl transition-colors"
              >
                About Us & 8990 History
              </Link>
              <Link
                href="/details"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 text-sm font-medium text-[#453D30] hover:text-[#1F190D] hover:bg-[#FAF3DC]/60 rounded-xl transition-colors"
              >
                Financing & Buyer Guide
              </Link>
              <Link
                href="/4ph"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 text-sm font-medium text-[#453D30] hover:text-[#1F190D] hover:bg-[#FAF3DC]/60 rounded-xl transition-colors"
              >
                4PH Housing Program
              </Link>
              <Link
                href="/news-and-promo"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 text-sm font-medium text-[#453D30] hover:text-[#1F190D] hover:bg-[#FAF3DC]/60 rounded-xl transition-colors"
              >
                News & Promos
              </Link>
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 text-sm font-medium text-[#453D30] hover:text-[#1F190D] hover:bg-[#FAF3DC]/60 rounded-xl transition-colors"
              >
                Careers & Sales Recruitment
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 text-sm font-medium text-[#453D30] hover:text-[#1F190D] hover:bg-[#FAF3DC]/60 rounded-xl transition-colors"
              >
                Contact & Sales Offices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
