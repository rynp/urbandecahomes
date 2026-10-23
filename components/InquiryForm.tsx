'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import Captcha from '@/components/Captcha';
import { projects } from '@/data/projects';
import { businessInfo } from '@/data/business';
import { trackEvent } from '@/lib/analytics';

interface InquiryFormProps {
  initialProject?: string;
  initialUnit?: string;
  title?: string;
  subtitle?: string;
}

export default function InquiryForm({
  initialProject,
  initialUnit,
  title = 'Schedule a Site Viewing & Inquire',
  subtitle = 'Speak with an accredited Urban Deca Homes property specialist. Get official computation sheets and check real-time unit availability.',
}: InquiryFormProps) {
  const [selectedProject, setSelectedProject] = useState<string>(initialProject || 'manila');
  const [selectedUnit, setSelectedUnit] = useState<string>(initialUnit || '');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [financingScheme, setFinancingScheme] = useState('Pag-IBIG Fund');
  const [buyerType, setBuyerType] = useState('Locally Employed');
  const [preferredContact, setPreferredContact] = useState<'Phone' | 'Viber' | 'WhatsApp' | 'Email'>('Viber');
  const [notes, setNotes] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available units for currently selected project
  const currentProjectObj = projects.find((p) => p.slug === selectedProject);
  const availableUnits = currentProjectObj?.unitTypes.filter((u) => u.status !== 'Sold Out') || [];

  useEffect(() => {
    if (initialProject) setSelectedProject(initialProject);
    if (initialUnit) setSelectedUnit(initialUnit);
  }, [initialProject, initialUnit]);

  // Reset selected unit if project changes and current unit is not in new project
  const handleProjectChange = (slug: string) => {
    setSelectedProject(slug);
    setSelectedUnit('');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 10) {
      newErrors.mobileNumber = 'Please enter a valid mobile number (e.g. 0917-123-4567).';
    }
    if (!privacyAgreed) {
      newErrors.privacy = 'Please accept the privacy policy to submit your inquiry.';
    }
    if (!isCaptchaVerified) {
      newErrors.captcha = 'Please solve the human verification check before submitting.';
    }
    if (honeypot) {
      newErrors.spam = 'Spam detected.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      trackEvent({
        name: 'inquiry_submit_error',
        params: { error_field: Object.keys(errors)[0] || 'validation' },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate secure server-side transmission or CRM endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));

      trackEvent({
        name: 'inquiry_submit_success',
        params: {
          project: selectedProject,
          financing_preference: financingScheme,
        },
      });

      setIsSubmitted(true);
    } catch (err) {
      setErrors({ submit: 'An unexpected error occurred. Please call our hotline directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 sm:p-10 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
          Inquiry Successfully Received!
        </h3>
        <p className="text-stone-600 max-w-md mx-auto text-sm mb-6 leading-relaxed">
          Thank you, <strong className="text-charcoal-900">{fullName}</strong>. An accredited Urban Deca Homes property specialist has been assigned to prepare your computation sheet for{' '}
          <strong className="text-charcoal-900">{currentProjectObj?.name}</strong>.
        </p>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 max-w-md mx-auto text-xs text-stone-600 mb-6 space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-stone-500">Preferred Channel:</span>
            <span className="font-semibold text-charcoal-900">{preferredContact}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Target Financing:</span>
            <span className="font-semibold text-charcoal-900">{financingScheme}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Expected Response:</span>
            <span className="font-semibold text-green-700">Within 30–60 minutes (during office hours)</span>
          </div>
        </div>

        {/* Immediate Assistance Channels */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${businessInfo.phones[0].value}`}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-charcoal-900 text-white rounded-lg hover:bg-charcoal-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mr-2 text-gold-400" />
            <span>Call Hotline Now</span>
          </a>

          <a
            href={businessInfo.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-2" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFullName('');
            setEmail('');
            setMobileNumber('');
            setNotes('');
            setPrivacyAgreed(false);
            setIsCaptchaVerified(false);
          }}
          className="mt-6 text-xs text-stone-400 hover:text-stone-600 underline block mx-auto"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden">
      {/* Form Header with Dark Luxury Theme */}
      <div className="relative bg-[#111111] bg-gradient-to-br from-charcoal-950 via-[#18181c] to-charcoal-950 text-white p-6 sm:p-8 lg:p-10 overflow-hidden border-b border-charcoal-800">
        {/* Subtle Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#eb6753]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-gold-400 mb-3 uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>Official Developer Sales Desk • 0% Broker Fee</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {/* 3-Step Concierge Reassurance Pill Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2.5 text-xs text-stone-300 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <span className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                1
              </span>
              <span className="font-medium text-stone-200">Select Unit &amp; Budget</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-stone-300 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <span className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                2
              </span>
              <span className="font-medium text-stone-200">Free Pag-IBIG Pre-Qual</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-stone-300 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <span className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                3
              </span>
              <span className="font-medium text-stone-200">Official Computation in 1 Hr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-6" noValidate>
        {/* Anti-spam Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website_url"
            tabIndex={-1}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* Project & Unit Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="inquiry-project" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Select Development *
            </label>
            <select
              id="inquiry-project"
              value={selectedProject}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-stone-50/80 border border-stone-300/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb6753]/30 focus:border-[#eb6753] font-medium transition-all"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.name} ({p.location.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inquiry-unit" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Preferred Unit Type
            </label>
            <select
              id="inquiry-unit"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-stone-50/80 border border-stone-300/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb6753]/30 focus:border-[#eb6753] font-medium transition-all"
            >
              <option value="">Any Available Unit / Undecided</option>
              {availableUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.areaSqm} sqm)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Info: Full Name & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="inquiry-name" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Full Name *
            </label>
            <input
              id="inquiry-name"
              type="text"
              placeholder="e.g. Maria Santos"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full px-4 py-3 text-sm bg-stone-50/80 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? 'border-red-400 focus:ring-red-400/30'
                  : 'border-stone-300/90 focus:border-[#eb6753] focus:ring-[#eb6753]/30'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="inquiry-mobile" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Mobile Contact Number *
            </label>
            <input
              id="inquiry-mobile"
              type="tel"
              placeholder="e.g. 0917 123 4567"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className={`w-full px-4 py-3 text-sm bg-stone-50/80 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.mobileNumber
                  ? 'border-red-400 focus:ring-red-400/30'
                  : 'border-stone-300/90 focus:border-[#eb6753] focus:ring-[#eb6753]/30'
              }`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1.5">{errors.mobileNumber}</p>
            )}
          </div>
        </div>

        {/* Email & Financing Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="inquiry-email" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Email Address *
            </label>
            <input
              id="inquiry-email"
              type="email"
              placeholder="maria@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 text-sm bg-stone-50/80 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-400 focus:ring-red-400/30'
                  : 'border-stone-300/90 focus:border-[#eb6753] focus:ring-[#eb6753]/30'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="inquiry-financing" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Financing Preference
            </label>
            <select
              id="inquiry-financing"
              value={financingScheme}
              onChange={(e) => setFinancingScheme(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-stone-50/80 border border-stone-300/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb6753]/30 focus:border-[#eb6753] font-medium transition-all"
            >
              <option value="Pag-IBIG Fund">Pag-IBIG Housing Loan (Most Popular)</option>
              <option value="Bank Financing">Commercial Bank Financing</option>
              <option value="In-House Financing">In-House Developer Loan</option>
              <option value="4PH Government Subsidy">4PH Government Housing Program</option>
              <option value="Spot Cash">Spot Cash / Deferred Payment</option>
            </select>
          </div>
        </div>

        {/* Buyer Type & Preferred Communication */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="inquiry-buyer-type" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Employment / Buyer Category
            </label>
            <select
              id="inquiry-buyer-type"
              value={buyerType}
              onChange={(e) => setBuyerType(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-stone-50/80 border border-stone-300/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb6753]/30 focus:border-[#eb6753] font-medium transition-all"
            >
              <option value="Locally Employed">Locally Employed (Private / Government)</option>
              <option value="OFW / Seafarer">Overseas Filipino Worker (OFW / Seafarer)</option>
              <option value="Self-Employed / Business">Business Owner / Freelancer</option>
              <option value="First-Time Buyer">First-Time Homebuyer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
              Preferred Contact Channel
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Viber', 'WhatsApp', 'Phone', 'Email'] as const).map((channel) => {
                const isSelected = preferredContact === channel;
                return (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setPreferredContact(channel)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 text-center ${
                      isSelected
                        ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-md shadow-black/15 ring-1 ring-black/20'
                        : 'bg-stone-50/80 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-charcoal-900'
                    }`}
                  >
                    {channel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="inquiry-notes" className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1.5">
            Questions, Desired Move-in Date, or Special Requests (Optional)
          </label>
          <textarea
            id="inquiry-notes"
            rows={3}
            placeholder="e.g. Inquiring about low cash-out promos, scheduling Saturday 2 PM site tour, or checking Pag-IBIG loan eligibility..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-stone-50/80 border border-stone-300/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb6753]/30 focus:border-[#eb6753] transition-all"
          />
        </div>

        {/* Privacy Consent */}
        <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/80">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#eb6753] rounded border-stone-300 focus:ring-[#eb6753]"
            />
            <span className="text-xs text-stone-600 leading-relaxed">
              I consent to the collection and processing of my contact information by Urban Deca Homes property specialists solely for scheduling site viewings and providing official price computations in compliance with the Philippine Data Privacy Act of 2012 (R.A. 10173).
            </span>
          </label>
          {errors.privacy && (
            <p className="text-red-500 text-xs mt-1.5">{errors.privacy}</p>
          )}
        </div>

        {/* Human Verification Captcha */}
        <div>
          <Captcha
            onVerify={(verified) => {
              setIsCaptchaVerified(verified);
              if (verified) {
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.captcha;
                  return copy;
                });
              }
            }}
            error={errors.captcha}
          />
        </div>

        {/* Submit Button & Reassurance */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-6 py-4 text-sm font-bold uppercase tracking-wider text-charcoal-950 gold-gradient hover:opacity-95 rounded-xl shadow-lg shadow-gold-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 group"
          >
            {isSubmitting ? (
              <span>Transmitting Inquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                <span>Submit Inquiry &amp; Request Official Computation</span>
              </>
            )}
          </button>
          
          {/* Trust Credentials Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[11px] text-stone-500 mt-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Licensed PRC &amp; DHSUD Specialists</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span>Direct Developer Rates (0% Markup)</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>Fast 30-Min Priority Response</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
