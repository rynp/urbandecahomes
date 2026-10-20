'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Clock,
  Menu,
  X,
  Building2,
  ChevronDown,
  ShieldCheck,
  Calendar,
  Send,
  MessageCircle,
} from 'lucide-react';
import { businessInfo } from '@/data/business';
import { projects } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const handlePhoneClick = (phone: string) => {
    trackEvent({
      name: 'phone_click',
      params: { phone_number: phone, location_source: 'navbar' },
    });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'Developments',
      href: '#',
      hasDropdown: true,
      subItems: projects.map((p) => ({
        name: p.name,
        href: `/${p.slug}`,
        badge: p.badge,
        city: p.location.city,
      })),
    },
    { name: 'Financing Guide', href: '/details' },
    { name: '4PH Housing', href: '/4ph' },
    { name: 'News & Promos', href: '/news-and-promo' },
    { name: 'Careers', href: '/jobs' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      {/* Top Utility Announcement Bar */}
      <div className="bg-charcoal-900 text-stone-300 text-xs py-2 px-4 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gold-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Pag-IBIG Accredited Developer Partner
            </span>
            <span className="hidden md:flex items-center text-stone-400">
              <Clock className="w-3.5 h-3.5 mr-1 text-gold-400" />
              Viewing Hours: {businessInfo.officeHours.days} ({businessInfo.officeHours.hours})
            </span>
          </div>

          <div className="flex items-center space-x-3 text-stone-300">
            <a
              href={`tel:${businessInfo.phones[0].value}`}
              onClick={() => handlePhoneClick(businessInfo.phones[0].value)}
              className="flex items-center hover:text-gold-400 transition-colors"
              title="Call Sales Hotline"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-gold-400" />
              <span className="font-semibold">{businessInfo.phones[0].display}</span>
            </a>
            <span className="text-stone-600">|</span>
            <a
              href={businessInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  name: 'messaging_click',
                  params: { channel: 'whatsapp', location_source: 'navbar_top' },
                })
              }
              className="flex items-center hover:text-green-400 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1 text-green-400" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-gold-500 rounded"
            title="Urban Deca Homes Philippines - Home"
          >
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-charcoal-900 shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-charcoal-900" />
            </div>
            <div>
              <span className="block font-serif text-lg md:text-xl font-bold tracking-wider text-charcoal-900 uppercase">
                Urban Deca Homes
              </span>
              <span className="block text-[10px] tracking-widest text-stone-500 uppercase font-medium">
                8990 Holdings, Inc. • Metro Manila
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setPropertiesDropdownOpen(true)}
                    onMouseLeave={() => setPropertiesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setPropertiesDropdownOpen(!propertiesDropdownOpen)}
                      className="flex items-center px-3 py-2 text-sm font-medium text-stone-700 hover:text-gold-700 rounded-md transition-colors"
                      aria-expanded={propertiesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4 ml-1 text-stone-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {propertiesDropdownOpen && (
                      <div className="absolute left-0 mt-0 w-80 bg-white rounded-lg shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn">
                        <div className="px-3 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                          Active Condominium Communities
                        </div>
                        {link.subItems?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setPropertiesDropdownOpen(false)}
                            className="block px-4 py-3 hover:bg-gold-50 transition-colors group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-charcoal-900 group-hover:text-gold-800">
                                {sub.name}
                              </span>
                              <span className="text-[10px] bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full font-medium">
                                {sub.badge}
                              </span>
                            </div>
                            <span className="block text-xs text-stone-500 mt-0.5">
                              {sub.city}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-gold-800 font-semibold bg-gold-50'
                      : 'text-stone-700 hover:text-gold-700 hover:bg-stone-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call-to-Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/inquire-now"
              onClick={() =>
                trackEvent({
                  name: 'inquiry_cta_click',
                  params: { location_source: 'navbar_button' },
                })
              }
              className="inline-flex items-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-md shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              <span>Inquire Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/inquire-now"
              className="px-3 py-1.5 text-xs font-bold uppercase text-charcoal-900 gold-gradient rounded"
            >
              Inquire
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:text-charcoal-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white shadow-xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-1">
            <div className="px-3 py-2 text-xs font-bold tracking-wider text-stone-400 uppercase">
              Featured Developments
            </div>
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/${project.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-charcoal-900 rounded-md hover:bg-gold-50"
              >
                <span>{project.name}</span>
                <span className="text-[10px] bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full font-medium">
                  {project.location.city}
                </span>
              </Link>
            ))}

            <div className="pt-2 border-t border-stone-100">
              <div className="px-3 py-2 text-xs font-bold tracking-wider text-stone-400 uppercase">
                Information & Resources
              </div>
              <Link
                href="/details"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded"
              >
                Financing & Buyer Guide
              </Link>
              <Link
                href="/4ph"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded"
              >
                4PH Housing Program
              </Link>
              <Link
                href="/news-and-promo"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded"
              >
                News & Promos
              </Link>
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded"
              >
                Careers & Sales Recruitment
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded"
              >
                Contact & Office Details
              </Link>
            </div>

            <div className="pt-4 mt-2 border-t border-stone-200 space-y-2">
              <Link
                href="/inquire-now"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold uppercase gold-gradient text-charcoal-900 rounded-md shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Property Inquiry
              </Link>
              <a
                href={`tel:${businessInfo.phones[0].value}`}
                onClick={() => handlePhoneClick(businessInfo.phones[0].value)}
                className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-stone-100 text-charcoal-900 rounded-md hover:bg-stone-200"
              >
                <Phone className="w-4 h-4 mr-2 text-gold-600" />
                Call {businessInfo.phones[0].display}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
