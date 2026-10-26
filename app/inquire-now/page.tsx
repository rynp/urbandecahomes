import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  HelpCircle,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import JsonLd from '@/components/JsonLd';
import { globalFaqs } from '@/data/faqs';
import { businessInfo } from '@/data/business';
import { constructMetadata } from '@/lib/seo';
import { getFaqSchema } from '@/lib/schema';

export const metadata: Metadata = constructMetadata({
  title: 'Urban Deca Homes Inquiry | Unit Availability & Viewing Schedule',
  description:
    'Submit an inquiry about Urban Deca Homes developments, unit options, financing computations, or schedule an on-site property viewing with an accredited specialist.',
  path: '/inquire-now',
  keywords: [
    'Urban Deca Homes inquiry',
    'schedule condo viewing',
    'available condo units Manila',
    'Urban Deca Homes computation sheet',
    'Urban Deca Homes customer service',
  ],
});

function InquiryContent() {
  return (
    <>
      <JsonLd data={getFaqSchema(globalFaqs)} />
      <Breadcrumbs items={[{ name: 'Inquire Now & FAQs', path: '/inquire-now' }]} />

      {/* Hero Header */}
      <section className="bg-charcoal-950 text-white py-14 sm:py-16 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-[#CE2029]/30 text-[#CE2029] text-xs font-semibold mb-4 font-logo">
            <ShieldCheck className="w-4 h-4 text-[#CE2029]" />
            <span>Direct Developer Sales Desk</span>
          </div>
          <h1 className="font-logo text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Inquire & Schedule Site Viewing
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Have questions about unit availability, monthly computations, or Pag-IBIG loan requirements? Submit your inquiry below for fast assistance.
          </p>
        </div>
      </section>

      {/* Main Grid: Form (7 cols) + Contact & FAQ (5 cols) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <InquiryForm
              title="Official Property Inquiry & Computation Request"
              subtitle="Fill out the form below. An accredited property specialist will get in touch with you directly."
            />
          </div>

          {/* Contact Details & Office Hours Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-2xl border border-[#EADBBD] p-6 shadow-sm space-y-4">
              <h3 className="font-logo text-lg font-bold text-[#3E1C15] border-b border-stone-100 pb-3">
                Need Faster Assistance?
              </h3>
              <p className="text-xs text-[#5C3D36] leading-relaxed">
                Our sales officers are available via phone, Viber, and WhatsApp during office hours to answer your questions in real-time.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href={`tel:${businessInfo.phones[0].value}`}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-stone-50 hover:bg-[#FAF5E6] border border-stone-200 hover:border-[#EADBBD] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3E1C15] text-[#FAF0C8] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#CE2029]" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#3E1C15] font-logo">Primary Sales Hotline</span>
                    <span className="block text-stone-500">{businessInfo.phones[0].display}</span>
                  </div>
                </a>

                <a
                  href={businessInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-stone-50 hover:bg-green-50 border border-stone-200 hover:border-green-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#3E1C15] font-logo">Official WhatsApp Chat</span>
                    <span className="block text-stone-500">Tap for instant messaging</span>
                  </div>
                </a>
              </div>

              <div className="p-3 bg-[#FAF5E6] rounded-lg border border-[#EADBBD] text-xs text-[#5C3D36] space-y-1">
                <div className="flex items-center font-semibold text-[#3E1C15] font-logo">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#CE2029]" />
                  <span>Viewing Hours:</span>
                </div>
                <div>{businessInfo.officeHours.days}: {businessInfo.officeHours.hours}</div>
                <div className="text-stone-400">{businessInfo.officeHours.closed}</div>
              </div>
            </div>

            {/* Why Inquire Directly */}
            <div className="bg-[#FAF5E6] rounded-2xl border border-[#EADBBD] p-6 space-y-3 text-xs text-[#3E1C15]">
              <h4 className="font-logo text-sm font-bold uppercase tracking-wider text-[#3E1C15]">
                Direct Developer Assurance
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#CE2029] mr-2 flex-shrink-0 mt-0.5" />
                  <span>No hidden brokerage fees or agent markups on published prices.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#CE2029] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Direct submission to Pag-IBIG Fund and accredited bank underwriting desks.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#CE2029] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Complimentary assisted site tours and model unit viewings.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQs Section - Dark Luxury Theme with Animated Mesh Gradient */}
      <section className="bg-[#0c0c10] py-20 sm:py-24 border-t border-white/10 relative overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Dynamic Multi-Stop Animated Gradient Mesh */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gradient-to-br from-[#CE2029]/25 via-[#CE2029]/10 to-transparent rounded-full blur-[100px] animate-gradient-shift pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[540px] h-[540px] bg-gradient-to-tl from-[#FAF0C8]/20 via-[#EADBBD]/10 to-transparent rounded-full blur-[110px] animate-gradient-shift-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial from-[#CE2029]/10 via-transparent to-transparent rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm mb-4 font-logo">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CE2029] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FAF0C8]">
                Buyer Guidance &amp; Policies
              </span>
            </div>
            <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-3.5 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about purchasing, financing, and moving into your Urban Deca Homes condominium.
            </p>
          </div>

          {/* Open FAQ Cards (No Accordion Effect) */}
          <div className="space-y-4 sm:space-y-5">
            {globalFaqs.map((faq, index) => {
              const indexNumber = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={faq.id}
                  className="group relative rounded-2xl bg-[#14141c]/90 hover:bg-[#181822] border border-white/10 hover:border-[#CE2029]/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_-6px_rgba(206,32,41,0.25)] hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 backdrop-blur-md overflow-hidden"
                >
                  {/* Ambient Multi-Stop Hover Glow Backdrop */}
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#CE2029]/30 via-[#FAF0C8]/25 to-[#CE2029]/30 opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none blur-[6px]" />

                  {/* Inner Corner Subtle Light Sheen */}
                  <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-[#CE2029]/15 via-[#FAF0C8]/10 to-transparent rounded-tr-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Left Vertical Active Indicator Bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3.5px] rounded-r-full bg-gradient-to-b from-[#CE2029] to-[#FAF0C8] opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  <div className="relative z-10">
                    {/* Category Pill */}
                    <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FAF0C8] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md mb-3 font-logo">
                      <HelpCircle className="w-3.5 h-3.5 text-[#CE2029]" />
                      <span>{faq.category}</span>
                    </div>

                    {/* Question Title with Monospace Index */}
                    <div className="flex items-start space-x-3.5 sm:space-x-4 mb-3">
                      <span className="font-mono text-xs sm:text-[13px] font-bold tracking-wider text-[#CE2029] pt-0.5 select-none">
                        {indexNumber}
                      </span>
                      <h3 className="font-logo text-[17px] sm:text-[19px] font-bold text-white group-hover:text-gold-200 transition-colors tracking-tight leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 my-3.5" />

                    {/* Full Visible Answer (No Accordion Collapse) */}
                    <p className="text-xs sm:text-sm text-stone-300 leading-[1.8] font-normal pl-7 sm:pl-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still Need Assistance Concierge Card */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#161620] via-[#1a1a24] to-[#161620] border border-white/10 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h4 className="font-logo text-lg sm:text-xl font-bold text-white">
                Have a specific question not covered here?
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-lg mx-auto leading-relaxed">
                Our accredited property specialists are on standby to provide personalized Pag-IBIG loan evaluations and answer unit availability inquiries.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6 font-logo">
                <a
                  href={`tel:${businessInfo.phones[0].value}`}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-charcoal-900 border border-white/15 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 mr-2 text-[#CE2029]" />
                  <span>Call Hotline: {businessInfo.phones[0].value}</span>
                </a>
                <a
                  href={businessInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm shadow-emerald-900/30"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function InquireNowPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-stone-500">Loading inquiry desk...</div>}>
      <InquiryContent />
    </Suspense>
  );
}
