import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  Home,
  Check,
  Users,
  FileText,
  ArrowRight,
  Phone,
  MessageCircle,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import { businessInfo } from '@/data/business';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Urban Deca Homes Manila 4PH | Pambansang Pabahay Program Information',
  description:
    'Alamin ang Pambansang Pabahay para sa Pilipino (4PH) program sa Urban Deca Homes Manila sa Vitas St., Tondo. Studio condo (22.95 sqm) para sa minimum wage earners at Pag-IBIG members.',
  path: '/4ph',
  keywords: [
    '4PH housing program Manila',
    'Urban Deca Homes 4PH',
    '4PH eligibility requirements',
    'Pambansang Pabahay para sa Pilipino',
    'Affordable condo Tondo Manila 4PH',
    'Pag-IBIG 4PH housing loan',
  ],
});

export default function Program4PHPage() {
  const qualifications = [
    'Pilipinong mamamayan na nasa legal na edad (at least 18 years old)',
    'Aktibong miyembro ng Pag-IBIG Fund (may hindi bababa sa 24 na buwanang kontribusyon)',
    'Walang kasalukuyang Pag-IBIG housing loan na may default o hindi nababayaran',
    'Minimum wage earner, pampubliko o pribadong empleyado, o OFW',
    'Pumasa sa pamantayan ng DHSUD at Pag-IBIG eligibility verification',
  ];

  const requirements = [
    '2 Valid Government-Issued IDs (Passport, Driver’s License, UMID, SSS, Postal ID, o Voter’s ID)',
    'Latest 1 Month Payslip o Certificate of Employment with Compensation (COEC)',
    'Proof of Billing (Meralco, Maynilad, o Barangay Certificate)',
    'Pag-IBIG Member Identification (MID) / Member’s Data Form (MDF)',
    'Marriage Certificate (kung may asawa) o Birth Certificate (kung single)',
    'Para sa OFW: Valid Job Contract / POEA clearance at Notarized SPA para sa kinatawan sa Pilipinas',
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: '4PH Housing Program', path: '/4ph' }]} />

      {/* Hero Header */}
      <section className="bg-charcoal-950 text-white py-16 sm:py-20 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-gold-500/40 text-gold-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Pambansang Pabahay para sa Pilipino (4PH)</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Pambansang Pabahay sa <br />
            <span className="gold-gradient-text">Urban Deca Homes Manila</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Magkaroon ng sariling disente at de-kalidad na condominium sa Tondo, Manila sa pamamagitan ng subsidiya ng pamahalaan at abot-kayang Pag-IBIG housing loan.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#rehistro"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition-all"
            >
              Magpa-rehistro at Mag-Inquire
            </a>
            <a
              href="#studio-unit"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-charcoal-800 hover:bg-charcoal-700 border border-stone-600 rounded-lg transition-all"
            >
              Tingnan ang Studio Unit (22.95 sqm)
            </a>
          </div>
        </div>
      </section>

      {/* Program Summary & Value */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
                Tungkol sa Programa
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
                Paano Gumagana ang 4PH Program para sa Ordinaryong Pilipino?
              </h2>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Ang <strong>Pambansang Pabahay para sa Pilipino (4PH)</strong> ay ang pambansang programa ng pamahalaan sa ilalim ng Department of Human Settlements and Urban Development (DHSUD) katuwang ang Pag-IBIG Fund upang matugunan ang kakulangan sa pabahay sa bansa.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Sa pamamagitan ng subsidiya sa interes mula sa pambansang gobyerno, napapababa ang buwanang hulog sa Pag-IBIG loan, kaya ang mga minimum wage earners, kawani ng gobyerno, pribadong manggagawa, at mga ordinaryong pamilya ay may kakayahang magmay-ari ng sariling titulo sa halip na habang-buhay na mangupahan.
            </p>

            <div className="p-4 bg-gold-50 rounded-xl border border-gold-200 text-xs text-gold-950 space-y-1">
              <strong className="block font-serif text-sm font-bold text-gold-900">
                Lokasyon ng Proyekto:
              </strong>
              <p>
                Urban Deca Homes Manila, Vitas Street, Tondo, Manila City (katabi ng DECA Mall, malapit sa North Harbor, Divisoria, at Tutuban).
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 border-b border-stone-100 pb-3">
              Pangunahing Bentahe ng 4PH:
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Mababang Buwanang Hulog:</strong> Mas mababa kaysa sa karaniwang commercial bank rates dahil sa subsidiya ng gobyerno.
                </span>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Hanggang 30 Taong Pagbabayad:</strong> Pinapahaba ang termino sa Pag-IBIG upang maging magaan sa buwanang suweldo.
                </span>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Move-in Ready Turnkey:</strong> May sariling banyo, lababo, tiled floor, at fire protection systems pagka-turnover.
                </span>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Kompletong Komunidad:</strong> May shopping mall, swimming pool, basketball court, at 24/7 security.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Unit Presentation */}
      <section id="studio-unit" className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              Pabahay Model Unit
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
              Studio Unit (Humigit-kumulang 22.95 sq.m.)
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Idinisenyo para sa mag-asawa, solo worker, o maliit na pamilya na nais ng sariling tahanan sa Maynila.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2">
            <div
              className="h-72 md:h-full w-full bg-cover bg-center min-h-[280px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80')",
              }}
            />

            <div className="p-8 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-800 bg-gold-50 px-2.5 py-1 rounded">
                  Urban Deca Homes Manila • Tondo
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-2">
                  Studio Unit Deliverables
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Ang bawat unit ay buong-buong tapos (fully finished) pagka-turnover upang hindi na kailangang gumastos ng malaki sa paunang pagpapagawa bago lumipat.
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0" />
                  <span>Sukat: Humigit-kumulang 22.95 square meters</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0" />
                  <span>Ceramic tile flooring sa buong sala at tulugan</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0" />
                  <span>Kumpletong toilet at bath na may ceramic tiles at gripo</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0" />
                  <span>Kusina na may stainless sink at granite base cabinet</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0" />
                  <span>Provision para sa window-type aircon at exhaust fan</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0" />
                  <span>May automatic fire sprinkler at smoke alarm detector</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <a
                  href="#rehistro"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-90 rounded-lg shadow-sm transition-all"
                >
                  <span>Mag-inquire para sa 4PH Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Documentary Requirements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Qualifications */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-charcoal-900 font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Sino ang Pwedeng Mag-Apply?
                </h3>
                <span className="text-xs text-stone-500">Qualifications & Eligibility</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
              {qualifications.map((q, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mr-2.5 flex-shrink-0 mt-0.5" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentary Requirements */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-charcoal-900 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Mga Dokumentong Kailangan
                </h3>
                <span className="text-xs text-stone-500">Initial Document Checklist</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 mr-2.5 flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Registration & Assistance Form */}
      <section id="rehistro" className="bg-stone-100/70 py-16 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm
            initialProject="manila"
            title="Rehistrasyon at Pag-Inquire sa 4PH Housing"
            subtitle="Ipasok ang iyong detalye upang maasikaso ng ating accredited documentation officers ang iyong pre-qualification sa Pag-IBIG 4PH program."
          />
        </div>
      </section>
    </>
  );
}
