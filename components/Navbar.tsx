'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
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
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
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
    { name: 'Home', href: '/', hasDropdown: false },
    {
      name: 'Listings',
      href: '#',
      hasDropdown: true,
      isOpen: propertiesDropdownOpen,
      setIsOpen: setPropertiesDropdownOpen,
      subItems: projects.map((p) => ({
        name: p.name,
        href: `/${p.slug}`,
      })),
    },
    { name: 'Financing', href: '/details', hasDropdown: false },
    { name: '4PH Housing', href: '/4ph', hasDropdown: false },
    {
      name: 'Blog',
      href: '/news-and-promo',
      hasDropdown: true,
      isOpen: resourcesDropdownOpen,
      setIsOpen: setResourcesDropdownOpen,
      subItems: [
        { name: 'News & Promos', href: '/news-and-promo' },
        { name: 'Careers & Sales Recruitment', href: '/jobs' },
        { name: 'Contact & Office Hours', href: '/contact-us' },
      ],
    },
    { name: 'Contact', href: '/contact-us', hasDropdown: false },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-[#0f1117]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-2.5'
          : 'bg-[#0f1117]/80 lg:bg-[#0f1117]/60 backdrop-blur-sm border-b border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Official Generated Asset & Typography */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none flex-shrink-0"
            title="Urban Deca Homes Philippines - Home"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden bg-white p-0.5 shadow-md shadow-black/40 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="Urban Deca Homes Official Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className="font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase leading-none">
                  Urban Deca
                </span>
                <span className="font-sans text-lg md:text-xl font-bold tracking-tight text-[#eb6753] uppercase leading-none">
                  Homes
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-stone-300 font-medium mt-1">
                Pride, Quality, Service.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.setIsOpen?.(true)}
                    onMouseLeave={() => link.setIsOpen?.(false)}
                  >
                    <button
                      type="button"
                      onClick={() => link.setIsOpen?.(!link.isOpen)}
                      className={`group flex items-center space-x-1.5 px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                        link.isOpen
                          ? 'bg-white/15 text-white shadow-sm'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                      aria-expanded={link.isOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-white/70 transition-transform duration-300 group-hover:text-white ${
                          link.isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>

                    {/* Wide Dropdown Menu without text wrapping, with clean redirection icons */}
                    <div
                      className={`absolute left-0 top-full pt-2 w-[420px] max-w-[90vw] transition-all duration-300 ease-out transform ${
                        link.isOpen
                          ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                          : 'opacity-0 translate-y-2 invisible pointer-events-none'
                      }`}
                    >
                      <div className="bg-[#151821]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-4 ring-1 ring-black/20 overflow-hidden">
                        {/* Dropdown Header */}
                        <div className="px-3 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-white/10 flex items-center justify-between">
                          <span>{link.name === 'Listings' ? 'Active Communities' : 'Resources & Guides'}</span>
                          <span className="text-[#eb6753] text-xs font-bold">Metro Manila</span>
                        </div>

                        {/* Dropdown Items with Redirection Icon */}
                        <div className="mt-2 space-y-1.5">
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => link.setIsOpen?.(false)}
                              className="group flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                            >
                              <span className="text-sm font-semibold text-white group-hover:text-[#eb6753] transition-colors whitespace-nowrap">
                                {sub.name}
                              </span>
                              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#eb6753]/20 flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-4">
                                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#eb6753] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Inquire Now & Call Us Buttons */}
                        <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-3">
                          <Link
                            href="/inquire-now"
                            onClick={() => {
                              link.setIsOpen?.(false);
                              trackEvent({
                                name: 'inquiry_cta_click',
                                params: { location_source: 'navbar_dropdown' },
                              });
                            }}
                            className="flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#f05a3e] rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                          >
                            <Send className="w-3.5 h-3.5 mr-1.5" />
                            <span>Inquire Now</span>
                          </Link>
                          <a
                            href={`tel:${businessInfo.phones[0].value}`}
                            onClick={() => {
                              link.setIsOpen?.(false);
                              handlePhoneClick(businessInfo.phones[0].value);
                            }}
                            className="flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/15 transition-all"
                          >
                            <Phone className="w-3.5 h-3.5 mr-1.5 text-[#eb6753]" />
                            <span>Call Us</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm border border-white/10 font-semibold'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger (2-Line Hamburger opening Quick Menu with Inquire Now & Call Us) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setQuickMenuOpen(!quickMenuOpen);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none rounded-full hover:bg-white/10 transition-colors p-2 text-white"
              aria-label="Toggle Quick Actions & Menu"
              aria-expanded={quickMenuOpen || mobileMenuOpen}
            >
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${
                  quickMenuOpen || mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
                }`}
              />
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${
                  quickMenuOpen || mobileMenuOpen ? 'w-6 -rotate-45' : 'w-4'
                }`}
              />
            </button>

            {/* Desktop Quick Dropdown Menu */}
            <div
              className={`hidden lg:block absolute right-0 top-full pt-2 w-[380px] max-w-[90vw] transition-all duration-300 ease-out transform ${
                quickMenuOpen
                  ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                  : 'opacity-0 translate-y-2 invisible pointer-events-none'
              }`}
            >
              <div className="bg-[#151821]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-4 ring-1 ring-black/20">
                <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-white/20 flex-shrink-0">
                    <Image
                      src="/logo.jpg"
                      alt="Urban Deca Homes Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white uppercase">Urban Deca Homes</span>
                    <span className="block text-[11px] text-[#eb6753] font-medium">Metro Manila Sales Office</span>
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
                    className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#f05a3e] rounded-xl shadow-lg shadow-[#eb6753]/30 transition-all transform hover:-translate-y-0.5"
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
                    className="w-full flex items-center justify-center px-4 py-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/15 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2 text-[#eb6753]" />
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
                    className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 rounded-xl border border-emerald-500/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-stone-400 space-y-1">
                  <div className="flex items-center text-stone-300">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                    <span>Viewing Hours: {businessInfo.officeHours.days} ({businessInfo.officeHours.hours})</span>
                  </div>
                  <div className="flex items-center text-stone-300">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#eb6753]" />
                    <span>Pag-IBIG Accredited Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Redirection Icons & Inquire Now / Call Us Buttons */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/10 bg-[#0f1117]/95 backdrop-blur-2xl ${
          mobileMenuOpen ? 'max-h-[85vh] opacity-100 py-4 mt-3' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-2 overflow-y-auto max-h-[75vh]">
          {/* Top Quick Actions: Inquire Now & Call Us Buttons */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            <Link
              href="/inquire-now"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center px-3 py-2.5 text-xs font-bold uppercase bg-[#eb6753] hover:bg-[#f05a3e] text-white rounded-xl shadow-md transition-all"
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
              className="flex items-center justify-center px-3 py-2.5 text-xs font-semibold bg-white/10 hover:bg-white/15 text-white rounded-xl border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#eb6753]" />
              <span>Call Us</span>
            </a>
          </div>

          <div className="px-2 py-1 text-xs font-bold tracking-wider text-stone-400 uppercase flex items-center justify-between">
            <span>Explore Properties</span>
            <span className="text-[10px] text-[#eb6753]">Metro Manila</span>
          </div>

          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${project.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <span>{project.name}</span>
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </Link>
          ))}

          <div className="pt-3 border-t border-white/10">
            <div className="px-2 py-1 text-xs font-bold tracking-wider text-stone-400 uppercase">
              Buyer Resources & Contact
            </div>
            <Link
              href="/details"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Financing & Buyer Guide
            </Link>
            <Link
              href="/4ph"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              4PH Housing Program
            </Link>
            <Link
              href="/news-and-promo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              News & Promos
            </Link>
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Careers & Sales Recruitment
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Contact & Sales Offices
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
