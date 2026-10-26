import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Award,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Phone,
  FileText,
  Percent,
  Check,
  Users,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AboutTimeline from '@/components/AboutTimeline';
import GroupOfCompanies from '@/components/GroupOfCompanies';
import JsonLd from '@/components/JsonLd';
import { companyOverview } from '@/data/company';
import { businessInfo } from '@/data/business';
import { constructMetadata } from '@/lib/seo';
import { getOrganizationSchema } from '@/lib/schema';

export const metadata: Metadata = constructMetadata({
  title: 'About Us | 8990 Holdings & Urban Deca Homes Corporate Profile',
  description:
    'Discover the legacy of 8990 Holdings, Inc. and Urban Deca Homes. Over 24+ years of housing the Filipino people with 100,000+ homes built across the Philippines, precast engineering, and PSE: HOUSE listing.',
  path: '/about-us',
  keywords: [
    'About Urban Deca Homes',
    '8990 Holdings Inc profile',
    'PSE HOUSE real estate developer',
    'Deca Homes corporate history',
    'Philippine mass housing developer',
    'Urban Deca Towers Cubao developer',
    'Monterrazas de Cebu 8990',
  ],
});

export default function AboutUsPage() {
  const orgSchema = getOrganizationSchema();

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Urban Deca Homes & 8990 Holdings, Inc.',
    description:
      'Corporate history, leadership, and multi-brand real estate portfolio of 8990 Holdings, Inc. and Urban Deca Homes.',
    url: 'https://urbandecahomes.properties/about-us',
    mainEntity: orgSchema,
  };

  return (
    <>
      <JsonLd data={aboutSchema} />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'About Us', path: '/about-us' }]} />

      {/* Hero Section with Beautiful Heroshot of Successful Real Estate Developer */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-charcoal-950 text-white overflow-hidden">
        {/* Background Image / Heroshot of Corporate Boardroom & Metro Skyline */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-developer-hero.jpg"
            alt="8990 Holdings Executive Leadership & Masterplan Architecture"
            fill
            priority
            className="object-cover object-center filter brightness-[0.45] transform scale-105 transition-transform duration-1000"
          />
          {/* Deep dark gradient overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/80" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-charcoal-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Top Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-charcoal-900/90 border border-[#EBA226]/40 text-[#EBA226] text-xs font-bold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-md animate-fadeIn">
            <ShieldCheck className="w-4 h-4 text-[#EBA226]" />
            <span>8990 Holdings, Inc. • PSE: HOUSE Listed Developer</span>
          </div>

          {/* Main H1 */}
          <h1 className="font-logo text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
            Housing the Filipino People with{' '}
            <span className="text-[#CE2029]">Pride, Quality &amp; Service</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-200 mb-10 leading-relaxed font-normal">
            Born out of a national commitment to resolve the Philippine housing shortage, 8990 Holdings, Inc. has pioneered industrialized precast construction, 25-year CTS Gold mortgage solutions, and delivered over 100,000+ homes and condominium units nationwide.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="#timeline"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-xl shadow-[#CE2029]/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Our History</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="#group-of-companies"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 backdrop-blur-md transition-colors"
            >
              <span>Group of Companies</span>
            </Link>
          </div>

          {/* 4 Floating Core Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {companyOverview.coreStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-charcoal-900/80 border border-white/10 backdrop-blur-md shadow-xl text-left"
              >
                <div className="text-2xl sm:text-3xl font-logo font-black text-[#EBA226] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-stone-400 mt-1 leading-snug">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Narrative & Heritage Section */}
      <section className="py-24 bg-[#FAF8F2] text-[#3E1C15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF0C8] border border-[#EADBBD] text-[#4A1E17] text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-[#CE2029]" />
                <span>Our Heritage &amp; Commitment</span>
              </div>

              <h2 className="font-logo text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3E1C15] leading-tight">
                Empowering Filipino Families Through Accessible Homeownership
              </h2>

              <p className="text-[#5C3D36] text-base leading-relaxed">
                Established in the early 2000s, <strong>8990 Housing Development Corporation</strong> was founded with an unshakeable conviction: <em>every Filipino deserves a structurally sound, dignified home to call their own.</em>
              </p>

              <p className="text-[#5C3D36] text-base leading-relaxed">
                Rather than treating affordable housing as a compromised compromise, 8990 modernized the industry. Under veteran engineering leadership, we introduced heavy-duty pre-cast concrete wall technology capable of constructing a durable residential unit in a record <strong>8 days</strong>. Locations were selected strategically near commercial hubs and transit avenues, ensuring families never sacrificed livelihood for shelter.
              </p>

              <p className="text-[#5C3D36] text-base leading-relaxed">
                To solve the financing barrier, 8990 established <strong>CTS Gold</strong>, the country&apos;s first in-house 25-year mortgage program patterned after the Pag-IBIG Fund. As our footprint expanded from Davao and Cebu into Metro Manila, we birthed <strong>Urban Deca Homes</strong> (mid-rise condominium masterplans) and <strong>Urban Deca Towers</strong> (transit-oriented urban skyscrapers).
              </p>

              {/* Quote Highlight */}
              <div className="p-6 rounded-2xl bg-[#FAF5E6] border-l-4 border-[#CE2029] border border-[#EADBBD] shadow-sm">
                <blockquote className="text-base font-logo italic font-medium text-[#3E1C15] leading-relaxed">
                  &ldquo;Despite our triumphs and growth into a publicly listed enterprise, 8990 has kept its feet firmly on the ground. We remain true to our core promise: building quality, affordable houses that ordinary Filipino salary earners can cherish as a true home.&rdquo;
                </blockquote>
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#A5680E]">
                  — 8990 Holdings, Inc. Corporate Charter
                </div>
              </div>
            </div>

            {/* Right Card Column - E-E-A-T & Trust Proof */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#2A140E] text-white rounded-3xl p-8 border border-[#4A251C] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-[#CE2029]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center space-x-3 pb-6 border-b border-[#4A251C]">
                  <div className="w-12 h-12 rounded-xl bg-[#CE2029] flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-logo text-xl font-bold text-white">Publicly Listed Trust</h3>
                    <p className="text-xs text-[#EBA226] font-semibold uppercase tracking-wider">
                      Philippine Stock Exchange (HOUSE)
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start text-xs sm:text-sm text-stone-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">SEC &amp; PSE Full Disclosure</strong>
                      Quarterly audited financial statements, public corporate governance, and institutional accountability.
                    </div>
                  </div>

                  <div className="flex items-start text-xs sm:text-sm text-stone-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Top Pag-IBIG Fund Partner</strong>
                      Ranked among the nation&apos;s highest-volume loan verification and takeout developer partners.
                    </div>
                  </div>

                  <div className="flex items-start text-xs sm:text-sm text-stone-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">DHSUD 4PH Program Accreditation</strong>
                      Direct collaborator under the Pambansang Pabahay para sa Pilipino national housing mandate.
                    </div>
                  </div>

                  <div className="flex items-start text-xs sm:text-sm text-stone-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Major Commercial Bank Ties</strong>
                      Accredited with BDO, BPI, Security Bank, China Bank, and UnionBank for flexible end-buyer home financing.
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#4A251C]">
                  <Link
                    href="/inquire-now"
                    className="w-full flex items-center justify-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 mr-2" />
                    <span>Inquire with Developer Sales</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group of Companies Showcase (Featuring the 4 Reference Logos) */}
      <GroupOfCompanies />

      {/* Animated Company History Timeline Section */}
      <AboutTimeline />

      {/* Corporate Value Pillars */}
      <section className="py-24 bg-[#FAF8F2] text-[#3E1C15] border-t border-[#EADBBD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#CE2029] bg-[#CE2029]/10 px-3.5 py-1.5 rounded-full border border-[#CE2029]/20 font-logo">
              The Deca Quality Promise
            </span>
            <h2 className="font-logo text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3E1C15] mt-4 mb-4">
              Why Hundreds of Thousands Choose Urban Deca Homes
            </h2>
            <p className="text-[#5C3D36] text-sm sm:text-base leading-relaxed">
              Every home and condominium unit developed by 8990 Holdings is built upon four uncompromised pillars of engineering, financial accessibility, location advantage, and community wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyOverview.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#FAF5E6] border border-[#EADBBD] hover:border-[#CE2029]/40 hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#CE2029]/10 group-hover:bg-[#CE2029] flex items-center justify-center text-[#CE2029] group-hover:text-white transition-colors mb-6 shadow-sm">
                  {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                  {idx === 1 && <Percent className="w-6 h-6" />}
                  {idx === 2 && <MapPin className="w-6 h-6" />}
                  {idx === 3 && <Building2 className="w-6 h-6" />}
                </div>
                <h3 className="font-logo text-xl font-bold text-[#3E1C15] mb-3 group-hover:text-[#CE2029] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C3D36] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Direct Consultation CTA Banner */}
      <section className="bg-[#2A140E] text-white py-20 border-t border-[#4A251C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#EBA226]/40 text-[#EBA226] text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-[#EBA226]" />
            <span>Own a Piece of the 8990 Legacy</span>
          </div>

          <h2 className="font-logo text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Start Your Journey to Homeownership Today
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-10">
            Whether you are seeking a move-in ready studio in Tondo Manila, a 2-bedroom community condominium along Ortigas Avenue Extension, or an urban micro-living high rise in Cubao, our certified sales specialists are ready to guide your verification and viewing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/inquire-now"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-xl shadow-[#CE2029]/30 transition-all transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4 mr-2" />
              <span>Submit Property Inquiry</span>
            </Link>

            <a
              href={`tel:${businessInfo.phones[0].value}`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-wider text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-[#CE2029]" />
              <span>Call Hotline: {businessInfo.phones[0].display}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
