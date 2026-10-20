import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { businessInfo } from '@/data/business';
import { projects } from '@/data/projects';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-charcoal-900 text-stone-300 border-t-4 border-gold-500 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-800">
          {/* Brand & Developer Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow border border-white/20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.jpg"
                  alt="Urban Deca Homes Official Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-sans text-xl font-bold tracking-tight text-white uppercase leading-none">
                    Urban Deca
                  </span>
                  <span className="font-sans text-xl font-bold tracking-tight text-[#eb6753] uppercase leading-none">
                    Homes
                  </span>
                </div>
                <span className="block text-xs text-stone-400 font-medium mt-1">
                  {businessInfo.legalDeveloper} • Price, Quality, Service.
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Providing accessible, high-quality, and move-in ready condominium communities across Metro Manila. Partnered with the Pag-IBIG Fund and DHSUD 4PH initiative to make Filipino homeownership attainable.
            </p>

            <div className="p-3 bg-charcoal-800 rounded-lg border border-charcoal-700 space-y-1">
              <div className="flex items-center text-xs font-semibold text-gold-400">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                Pag-IBIG Accredited Developer Partner
              </div>
              <p className="text-[11px] text-stone-400">
                Enjoy fast-tracked loan verification and flexible 30-year terms for qualified Filipino members.
              </p>
            </div>
          </div>

          {/* Featured Properties */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Condominiums
            </h3>
            <ul className="space-y-2.5 text-sm">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/${project.slug}`}
                    className="flex items-center hover:text-gold-400 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-gold-500" />
                    <span>{project.name}</span>
                  </Link>
                  <span className="block text-xs text-stone-500 ml-4">
                    {project.location.city}
                  </span>
                </li>
              ))}
              <li>
                <Link
                  href="/4ph"
                  className="flex items-center text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-gold-500" />
                  <span>4PH Housing Program</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Buyer Guides & Financing */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Financing & Guides
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/details" className="hover:text-gold-400 transition-colors">
                  Pag-IBIG Housing Guide
                </Link>
              </li>
              <li>
                <Link href="/details#bank-financing" className="hover:text-gold-400 transition-colors">
                  Commercial Bank Loans
                </Link>
              </li>
              <li>
                <Link href="/details#document-checklist" className="hover:text-gold-400 transition-colors">
                  Document Checklist
                </Link>
              </li>
              <li>
                <Link href="/details#four-step-process" className="hover:text-gold-400 transition-colors">
                  4-Step Buying Process
                </Link>
              </li>
              <li>
                <Link href="/inquire-now" className="hover:text-gold-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/news-and-promo" className="hover:text-gold-400 transition-colors">
                  Latest Promos & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Viewing Office */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Sales & Viewing
            </h3>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-200">Main Office:</strong><br />
                  {businessInfo.headquarters.building}, {businessInfo.headquarters.street}, {businessInfo.headquarters.city}
                </span>
              </div>

              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gold-500 flex-shrink-0" />
                <a
                  href={`tel:${businessInfo.phones[0].value}`}
                  className="hover:text-gold-400 font-semibold text-stone-200"
                >
                  {businessInfo.phones[0].display}
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gold-500 flex-shrink-0" />
                <a
                  href={`mailto:${businessInfo.emails[0]}`}
                  className="hover:text-gold-400"
                >
                  {businessInfo.emails[0]}
                </a>
              </div>

              <div className="flex items-start">
                <Clock className="w-4 h-4 mr-2 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Viewing Hours:</strong><br />
                  {businessInfo.officeHours.days}<br />
                  {businessInfo.officeHours.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 text-xs text-stone-500 space-y-3">
          <div className="p-3 bg-charcoal-800/60 rounded text-[11px] leading-relaxed border border-charcoal-800">
            <strong>Advisory & Real Estate Disclaimer:</strong> This portal serves as an informational and sales presentation resource for residential properties developed by {businessInfo.legalDeveloper}. Unit dimensions, floor plans, pricing, and promotional terms are based on prevailing project filings and are subject to change without prior notice. Final financing terms, monthly amortizations, and approvals remain subject to credit evaluation by the Pag-IBIG Fund (HDMF) or financing banks.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>
              &copy; {currentYear} {businessInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-stone-400">
              <Link href="/details" className="hover:text-gold-400">
                Financing Terms
              </Link>
              <Link href="/contact-us" className="hover:text-gold-400">
                Contact
              </Link>
              <Link href="/jobs" className="hover:text-gold-400">
                Careers
              </Link>
              <a
                href="https://8990holdings.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 inline-flex items-center"
              >
                <span>8990 Holdings Corporate</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
