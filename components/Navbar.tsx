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
        { name: 'About Us & 8990 History', href: '/about-us' },
        { name: 'Contact & Office Hours', href: '/contact-us' },
      ],
    },
    { name: 'About Us', href: '/about-us', hasDropdown: false },
    { name: 'Contact US', href: '/contact-us', hasDropdown: false },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled ? 'glass-header-scrolled py-2.5' : 'glass-header py-3.5'
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
              <div className="flex items-baseline space-x-1.5">
                <span className="font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase leading-none drop-shadow-sm">
                  Urban Deca
                </span>
                <span className="font-sans text-lg md:text-xl font-bold tracking-tight text-[#eb6753] uppercase leading-none drop-shadow-sm">
                  Homes
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-stone-300 font-medium mt-1">
                Price, Quality, Service.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Glassmorphism Pills */}
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-2" aria-label="Main Navigation">
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
                      className={`group flex items-center space-x-1.5 px-3.5 py-2 text-sm rounded-full transition-all duration-200 ${link.isOpen
                        ? 'glass-pill-active font-semibold'
                        : 'glass-pill font-medium text-stone-200 hover:text-white'
                        }`}
                      aria-expanded={link.isOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${link.isOpen ? 'rotate-180 text-white' : 'text-stone-300 group-hover:text-white'
                          }`}
                      />
                    </button>

                    {/* Wide Dropdown Menu in Premium Glass Card */}
                    <div
                      className={`absolute left-0 top-full pt-2.5 w-[420px] max-w-[90vw] transition-all duration-300 ease-out transform ${link.isOpen
                        ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                        : 'opacity-0 translate-y-2 invisible pointer-events-none'
                        }`}
                    >
                      <div className="glass-card rounded-2xl p-4 overflow-hidden">
                        {/* Dropdown Header */}
                        <div className="px-3 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-white/10 flex items-center justify-between">
                          <span>{link.name === 'Listings' ? 'Active Communities' : 'Resources & Guides'}</span>
                          <span className="text-[#eb6753] text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#eb6753]/15 border border-[#eb6753]/30">
                            Metro Manila
                          </span>
                        </div>

                        {/* Dropdown Items with Redirection Icon */}
                        <div className="mt-2 space-y-1">
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => link.setIsOpen?.(false)}
                              className="group flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
                            >
                              <span className="text-sm font-semibold text-white group-hover:text-[#eb6753] transition-colors whitespace-nowrap drop-shadow-sm">
                                {sub.name}
                              </span>
                              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#eb6753] group-hover:border-[#eb6753] flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-4">
                                <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Inquire Now & Call Us Action Buttons */}
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
                            className="flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#f05a3e] rounded-xl shadow-lg shadow-[#eb6753]/30 transition-all transform hover:-translate-y-0.5"
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
                            className="flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-stone-200 hover:text-white glass-pill rounded-xl transition-all"
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
                  className={`flex items-center space-x-1.5 px-4 py-2 text-sm rounded-full transition-all duration-200 ${isActive
                    ? 'glass-pill-active font-semibold'
                    : 'glass-pill font-medium text-stone-200 hover:text-white'
                    }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger (2-Line Glassmorphic Hamburger) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setQuickMenuOpen(!quickMenuOpen);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="glass-pill flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none rounded-full text-white p-2"
              aria-label="Toggle Quick Actions & Menu"
              aria-expanded={quickMenuOpen || mobileMenuOpen}
            >
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${quickMenuOpen || mobileMenuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'
                  }`}
              />
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${quickMenuOpen || mobileMenuOpen ? 'w-5 -rotate-45' : 'w-3.5'
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
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-white/20 flex-shrink-0 shadow-sm">
                    <Image
                      src="/logo.jpg"
                      alt="Urban Deca Homes Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white uppercase drop-shadow-sm">Urban Deca Homes</span>
                    <span className="block text-[11px] text-[#eb6753] font-semibold">Metro Manila Sales Office</span>
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
                    className="w-full flex items-center justify-center px-4 py-3 text-xs font-semibold text-stone-200 hover:text-white glass-pill rounded-xl transition-colors"
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
                    className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 rounded-xl border border-emerald-500/30 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <div className="mt-3.5 pt-3 border-t border-white/10 text-[11px] text-stone-300 space-y-1.5">
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

      {/* Mobile Drawer Navigation in Glass Card */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/10 ${mobileMenuOpen ? 'max-h-[85vh] opacity-100 py-4 mt-2.5 glass-card' : 'max-h-0 opacity-0 pointer-events-none'
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
              className="flex items-center justify-center px-3 py-2.5 text-xs font-semibold text-stone-200 hover:text-white glass-pill rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#eb6753]" />
              <span>Call Us</span>
            </a>
          </div>

          <div className="px-2 py-1 text-xs font-bold tracking-wider text-stone-400 uppercase flex items-center justify-between">
            <span>Explore Properties</span>
            <span className="text-[10px] text-[#eb6753] font-bold">Metro Manila</span>
          </div>

          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${project.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            >
              <span>{project.name}</span>
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-300" />
              </div>
            </Link>
          ))}

          <div className="pt-3 border-t border-white/10">
            <div className="px-2 py-1 text-xs font-bold tracking-wider text-stone-400 uppercase">
              Buyer Resources & Contact
            </div>
            <Link
              href="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              About Us & 8990 History
            </Link>
            <Link
              href="/details"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Financing & Buyer Guide
            </Link>
            <Link
              href="/4ph"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              4PH Housing Program
            </Link>
            <Link
              href="/news-and-promo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              News & Promos
            </Link>
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Careers & Sales Recruitment
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Contact & Sales Offices
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
