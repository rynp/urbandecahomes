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
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-gold-500/40 text-gold-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Developer Sales Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
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
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-charcoal-900 border-b border-stone-100 pb-3">
                Need Faster Assistance?
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our sales officers are available via phone, Viber, and WhatsApp during office hours to answer your questions in real-time.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href={`tel:${businessInfo.phones[0].value}`}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-stone-50 hover:bg-gold-50 border border-stone-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-charcoal-900 text-gold-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-charcoal-900">Primary Sales Hotline</span>
                    <span className="block text-stone-500">{businessInfo.phones[0].display}</span>
                  </div>
                </a>

                <a
                  href={businessInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-stone-50 hover:bg-green-50 border border-stone-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-charcoal-900">Official WhatsApp Chat</span>
                    <span className="block text-stone-500">Tap for instant messaging</span>
                  </div>
                </a>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex items-center font-semibold text-charcoal-900">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-gold-600" />
                  <span>Viewing Hours:</span>
                </div>
                <div>{businessInfo.officeHours.days}: {businessInfo.officeHours.hours}</div>
                <div className="text-stone-400">{businessInfo.officeHours.closed}</div>
              </div>
            </div>

            {/* Why Inquire Directly */}
            <div className="bg-gold-50 rounded-2xl border border-gold-200 p-6 space-y-3 text-xs text-gold-950">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-900">
                Direct Developer Assurance
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 mr-2 flex-shrink-0 mt-0.5" />
                  <span>No hidden brokerage fees or agent markups on published prices.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Direct submission to Pag-IBIG Fund and accredited bank underwriting desks.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Complimentary assisted site tours and model unit viewings.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQs Section */}
      <section className="bg-white py-20 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
              Buyer Questions
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Everything you need to know about purchasing, financing, and moving into your Urban Deca Homes condominium.
            </p>
          </div>

          <div className="space-y-4">
            {globalFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
              >
                <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{faq.category}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-charcoal-900">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
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
