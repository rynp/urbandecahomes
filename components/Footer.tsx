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
    <footer className="bg-[#F8F4E8] text-[#544D40] border-t border-[#E8DEC4] pt-16 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DFBD58] via-[#E59E38] to-[#DFBD58]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E8DEC4]">
          {/* Brand & Developer Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-sm border border-[#EADBBD] flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.jpg"
                  alt="Urban Deca Homes Official Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-logo text-xl font-black tracking-tight text-[#CE2029] uppercase leading-none">
                    URBAN
                  </span>
                  <span className="font-logo text-xl font-black tracking-tight text-[#4A1E17] uppercase leading-none">
                    DECA
                  </span>
                  <span className="font-logo text-xl font-semibold tracking-tight text-[#4A1E17] uppercase leading-none">
                    HOMES
                  </span>
                </div>
                <span className="block text-xs text-[#68453D] font-medium mt-1">
                  {businessInfo.legalDeveloper} • Pride, Quality, Service.
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#5C3D36] leading-relaxed max-w-sm">
              Providing accessible, high-quality, and move-in ready condominium communities across Metro Manila. Partnered with the Pag-IBIG Fund and DHSUD 4PH initiative to make Filipino homeownership attainable.
            </p>

            <div className="p-3.5 bg-[#FAF2DC] rounded-xl border border-[#E8DAB7] space-y-1">
              <div className="flex items-center text-xs font-semibold text-[#8C5D08]">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#B88A22]" />
                Pag-IBIG Accredited Developer Partner
              </div>
              <p className="text-[11px] text-[#6E4F47]">
                Enjoy fast-tracked loan verification and flexible 30-year terms for qualified Filipino members.
              </p>
            </div>
          </div>

          {/* Featured Properties */}
          <div>
            <h3 className="font-logo text-sm font-bold uppercase tracking-wider text-[#4A1E17] mb-4">
              Condominiums
            </h3>
            <ul className="space-y-2.5 text-sm">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/${project.slug}`}
                    className="flex items-center text-[#5C3D36] hover:text-[#CE2029] transition-colors font-medium"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#C29C35]" />
                    <span>{project.name}</span>
                  </Link>
                  <span className="block text-xs text-[#7A5B52] ml-4">
                    {project.location.city}
                  </span>
                </li>
              ))}
              <li>
                <Link
                  href="/4ph"
                  className="flex items-center text-[#CE2029] hover:text-[#B51B23] font-semibold transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#CE2029]" />
                  <span>4PH Housing Program</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Buyer Guides & Financing */}
          <div>
            <h3 className="font-logo text-sm font-bold uppercase tracking-wider text-[#4A1E17] mb-4">
              Financing & Guides
            </h3>
            <ul className="space-y-2.5 text-sm text-[#5C3D36]">
              <li>
                <Link href="/details" className="hover:text-[#CE2029] transition-colors">
                  Pag-IBIG Housing Guide
                </Link>
              </li>
              <li>
                <Link href="/details#bank-financing" className="hover:text-[#CE2029] transition-colors">
                  Commercial Bank Loans
                </Link>
              </li>
              <li>
                <Link href="/details#document-checklist" className="hover:text-[#CE2029] transition-colors">
                  Document Checklist
                </Link>
              </li>
              <li>
                <Link href="/details#four-step-process" className="hover:text-[#CE2029] transition-colors">
                  4-Step Buying Process
                </Link>
              </li>
              <li>
                <Link href="/inquire-now" className="hover:text-[#CE2029] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/news-and-promo" className="hover:text-[#CE2029] transition-colors">
                  Latest Promos & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Viewing Office */}
          <div>
            <h3 className="font-logo text-sm font-bold uppercase tracking-wider text-[#4A1E17] mb-4">
              Sales & Viewing
            </h3>
            <div className="space-y-3 text-xs text-[#544D40]">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-[#B88A22] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#241E15]">Main Office:</strong><br />
                  {businessInfo.headquarters.building}, {businessInfo.headquarters.street}, {businessInfo.headquarters.city}
                </span>
              </div>

              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-[#B88A22] flex-shrink-0" />
                <a
                  href={`tel:${businessInfo.phones[0].value}`}
                  className="hover:text-[#9E7A1F] font-semibold text-[#241E15]"
                >
                  {businessInfo.phones[0].display}
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-[#B88A22] flex-shrink-0" />
                <a
                  href={`mailto:${businessInfo.emails[0]}`}
                  className="hover:text-[#9E7A1F] text-[#241E15]"
                >
                  {businessInfo.emails[0]}
                </a>
              </div>

              <div className="flex items-start">
                <Clock className="w-4 h-4 mr-2 text-[#B88A22] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#241E15]">Viewing Hours:</strong><br />
                  {businessInfo.officeHours.days}<br />
                  {businessInfo.officeHours.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 text-xs text-[#6A6254] space-y-3">
          <div className="p-3.5 bg-[#F1EAD6] rounded-xl text-[11px] leading-relaxed border border-[#E0D5BD] text-[#5A5040]">
            <strong className="text-[#241E15]">Advisory & Real Estate Disclaimer:</strong> This portal serves as an informational and sales presentation resource for residential properties developed by {businessInfo.legalDeveloper}. Unit dimensions, floor plans, pricing, and promotional terms are based on prevailing project filings and are subject to change without prior notice. Final financing terms, monthly amortizations, and approvals remain subject to credit evaluation by the Pag-IBIG Fund (HDMF) or financing banks.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>
              &copy; {currentYear} {businessInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-[#6A6254]">
              <Link href="/details" className="hover:text-[#9E7A1F]">
                Financing Terms
              </Link>
              <Link href="/contact-us" className="hover:text-[#9E7A1F]">
                Contact
              </Link>
              <Link href="/jobs" className="hover:text-[#9E7A1F]">
                Careers
              </Link>
              <a
                href="https://8990holdings.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9E7A1F] inline-flex items-center font-medium"
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
