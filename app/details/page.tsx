import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  Building2,
  Users,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FinancingCalculator from '@/components/FinancingCalculator';
import InquiryForm from '@/components/InquiryForm';
import { financingOptions, fourStepProcess, documentChecklist } from '@/data/financing';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Urban Deca Homes Financing Options | Pag-IBIG & Bank Buyer Guide',
  description:
    'Comprehensive buyer guide to financing options at Urban Deca Homes. Compare Pag-IBIG Fund, bank financing, document checklists, and the 4-step homebuying process.',
  path: '/details',
  keywords: [
    'Urban Deca Homes payment terms',
    'Pag-IBIG condo financing',
    'Bank financing for condos Philippines',
    'Condo buying requirements Pag-IBIG',
    'Urban Deca Homes reservation process',
    'OFW condo financing requirements',
  ],
});

export default function DetailsAndFinancingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Financing & Buyer Guide', path: '/details' }]} />

      {/* Hero Header */}
      <section className="bg-charcoal-950 text-white py-16 sm:py-20 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-gold-500/40 text-gold-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Complete Homebuyer Resource</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Urban Deca Homes Financing & Buyer Guide
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Understanding your payment options shouldn&apos;t be complicated. Explore our approved financing channels, document checklists, and the step-by-step roadmap to owning your home.
          </p>
        </div>
      </section>

      {/* Financing Channels Side-by-Side Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
            Payment Options
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
            Compare Approved Financing Schemes
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Select the loan structure that best matches your monthly cash flow, employment type, and financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {financingOptions.map((opt) => (
            <div
              key={opt.id}
              id={opt.id}
              className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-charcoal-900 bg-gold-100 px-3 py-1 rounded-full mb-3">
                    {opt.badge}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">
                    {opt.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                {/* Key Numbers Grid */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Indicative Annual Rate:</span>
                    <span className="font-bold text-charcoal-900">{opt.interestRateAnnual}% fixed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Maximum Loan Term:</span>
                    <span className="font-bold text-charcoal-900">Up to {opt.maxTenureYears} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Min. Downpayment:</span>
                    <span className="font-bold text-charcoal-900">{opt.minDownpaymentPercent}% of TCP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Typical Processing:</span>
                    <span className="font-bold text-gold-700">{opt.processingTimeWeeks}</span>
                  </div>
                </div>

                {/* Pros List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-stone-700 block">
                    Key Advantages:
                  </span>
                  {opt.pros.map((pro, i) => (
                    <div key={i} className="flex items-start text-xs text-stone-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <Link
                  href={`/inquire-now?financing=${encodeURIComponent(opt.name)}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-90 rounded-lg shadow-sm transition-all"
                >
                  <span>Apply with {opt.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Homebuyer Process */}
      <section id="four-step-process" className="bg-stone-100/70 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-white px-3 py-1 rounded-full border border-stone-200">
              Step-by-Step Roadmap
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
              The 4-Step Journey to Owning Your Condo
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              From your initial model unit visit to holding the keys to your new home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourStepProcess.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full gold-gradient text-charcoal-900 font-bold flex items-center justify-center text-sm shadow">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-charcoal-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-400 uppercase block mb-1">
                    Documents Needed:
                  </span>
                  <ul className="text-[11px] text-stone-500 space-y-1">
                    {step.documentsNeeded.map((doc, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-gold-600 mr-1.5">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Checklist Tabs */}
      <section id="document-checklist" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
            Required Documents
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-2">
            Complete Homebuyer Document Checklist
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Prepare these essential papers before reservation to speed up your Pag-IBIG or bank loan processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Locally Employed */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-charcoal-900 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-charcoal-900">
                  Locally Employed
                </h3>
                <span className="text-xs text-stone-500">Private / Government</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-600">
              {documentChecklist.locallyEmployed.map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* OFWs & Seafarers */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-charcoal-900 font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-charcoal-900">
                  Overseas Filipino Workers
                </h3>
                <span className="text-xs text-stone-500">Landbased / Seafarers</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-600">
              {documentChecklist.ofw.map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Self-Employed */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-charcoal-900 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-charcoal-900">
                  Self-Employed & Business
                </h3>
                <span className="text-xs text-stone-500">Sole Proprietors / Freelancers</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-600">
              {documentChecklist.selfEmployed.map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FinancingCalculator />
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <InquiryForm
          title="Get a Pre-Qualification Assessment"
          subtitle="Our accredited financing documentation officers will evaluate your loan eligibility and compute your exact monthly amortization."
        />
      </section>
    </>
  );
}
