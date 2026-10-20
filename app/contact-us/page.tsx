import React from 'react';
import type { Metadata } from 'next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  MessageCircle,
  Building2,
  ExternalLink,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ViewingScheduler from '@/components/ViewingScheduler';
import InquiryForm from '@/components/InquiryForm';
import { businessInfo } from '@/data/business';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Urban Deca Homes | Sales Office Locations & Hotlines',
  description:
    'Contact Urban Deca Homes sales offices in Manila, Ortigas, and Cubao. Find office addresses, viewing schedules, phone numbers, and WhatsApp inquiry links.',
  path: '/contact-us',
  keywords: [
    'Urban Deca Homes contact number',
    'Urban Deca Homes office address',
    'Urban Deca Homes Manila sales office',
    'Urban Deca Homes Ortigas office',
    'Urban Deca Towers Cubao contact',
  ],
});

export default function ContactUsPage() {
  const offices = [
    {
      title: 'Headquarters & Manila Sales Office',
      building: 'G/F Deca Mall',
      street: 'Velasquez St. corner Vitas St., Tondo',
      city: 'Manila City, Metro Manila',
      hours: 'Mon–Sat: 9:00 AM – 5:00 PM',
      phone: businessInfo.phones[0].display,
      phoneValue: businessInfo.phones[0].value,
      projectFocus: 'Urban Deca Homes Manila & 4PH Program Desk',
    },
    {
      title: 'Ortigas Community Sales Office',
      building: 'Urban Deca Homes Ortigas Clubhouse',
      street: 'Ortigas Avenue Extension, Brgy. Rosario',
      city: 'Pasig City, Metro Manila',
      hours: 'Mon–Sat: 9:00 AM – 5:00 PM',
      phone: businessInfo.phones[1].display,
      phoneValue: businessInfo.phones[1].value,
      projectFocus: 'Urban Deca Homes Ortigas (13-Ha Community)',
    },
    {
      title: 'Cubao Sales & Viewing Desk',
      building: 'Urban Deca Towers Ground Floor Lobby',
      street: 'EDSA corner Ignacio Diaz St., Cubao',
      city: 'Quezon City, Metro Manila',
      hours: 'Mon–Sat: 9:00 AM – 5:00 PM',
      phone: businessInfo.phones[0].display,
      phoneValue: businessInfo.phones[0].value,
      projectFocus: 'Urban Deca Towers Cubao Transit Micro-Condos',
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: 'Contact Us', path: '/contact-us' }]} />

      {/* Hero Header */}
      <section className="bg-charcoal-950 text-white py-14 sm:py-16 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-gold-500/40 text-gold-400 text-xs font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            <span>Customer Service & Sales Desks</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Contact Urban Deca Homes
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Connect with our sales specialists, visit an on-site property office, or schedule a personalized model unit viewing across Metro Manila.
          </p>
        </div>
      </section>

      {/* Office Locations Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
            Sales & Viewing Desks
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
            Visit Our On-Site Sales Offices
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            All offices are open Monday to Saturday with accredited property specialists ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-charcoal-900 shadow-sm">
                  <MapPin className="w-5 h-5 text-charcoal-900" />
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal-900">
                    {office.title}
                  </h3>
                  <span className="text-xs text-gold-700 font-semibold block mt-0.5">
                    {office.projectFocus}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                  <p>
                    <strong className="text-stone-800">Address:</strong><br />
                    {office.building}, {office.street}, {office.city}
                  </p>

                  <p>
                    <strong className="text-stone-800">Hours:</strong><br />
                    {office.hours}
                  </p>

                  <p>
                    <strong className="text-stone-800">Telephone Hotline:</strong><br />
                    <a
                      href={`tel:${office.phoneValue}`}
                      className="font-bold text-charcoal-900 hover:text-gold-700"
                    >
                      {office.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100">
                <a
                  href={`tel:${office.phoneValue}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-charcoal-900 bg-stone-100 hover:bg-gold-100 hover:text-gold-900 rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-gold-600" />
                  <span>Call This Office</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Scheduler & Contact Form Grid */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <ViewingScheduler />
            </div>

            <div className="lg:col-span-6">
              <InquiryForm
                title="Send a Direct Message"
                subtitle="Submit an inquiry to our central customer care team. We will review your questions and respond promptly."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Digital Direct Channels Bar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-3">
          Prefer Instant Digital Messaging?
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mb-8">
          Connect directly via Viber or WhatsApp to chat with our accredited sales specialists or receive digital brochures instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={businessInfo.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={businessInfo.socialLinks.viber}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider bg-purple-700 text-white rounded-lg hover:bg-purple-800 shadow transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            <span>Connect on Viber</span>
          </a>

          <a
            href={`mailto:${businessInfo.emails[0]}`}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider bg-charcoal-900 text-white rounded-lg hover:bg-charcoal-800 shadow transition-colors"
          >
            <Mail className="w-4 h-4 mr-2 text-gold-400" />
            <span>Email Inquiries</span>
          </a>
        </div>
      </section>
    </>
  );
}
