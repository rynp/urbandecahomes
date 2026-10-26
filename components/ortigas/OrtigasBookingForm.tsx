'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Send, Clock, User, Phone, Mail } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function OrtigasBookingForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    unit: '2-Bedroom Inner (30.60 sqm) • Starts ₱2.90M',
    tourDate: '',
    financing: 'Pag-IBIG Fund (HDMF Loan)',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.mobile.trim()) {
      setErrorMessage('Please provide both your full name and mobile number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      trackEvent({
        name: 'viewing_request_success',
        params: {
          project_slug: 'ortigas',
        },
      });

      setIsBooked(true);
    } catch (err) {
      setErrorMessage('Something went wrong. Please call our sales desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EADBBD] shadow-xl text-center animate-fadeIn">
        <div className="w-16 h-16 bg-[#CE2029]/10 text-[#CE2029] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#CE2029]/25">
          <CheckCircle2 className="w-9 h-9 text-[#CE2029]" />
        </div>
        <h3 className="font-logo text-2xl sm:text-3xl font-extrabold text-[#3E1C15]">
          Tour Reservation Confirmed
        </h3>
        <p className="text-[#5C3D36] text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          Thank you, <span className="text-[#CE2029] font-bold">{formData.fullName}</span>! Your viewing request for{' '}
          <span className="text-[#3E1C15] font-semibold">{formData.unit}</span> has been logged with our Pasig sales pavilion.
        </p>

        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-4 bg-[#FAF5E6] border border-[#EADBBD] px-6 py-3.5 rounded-2xl text-xs text-[#5C3D36]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#CE2029]" />
            <span>Target Date: <strong className="text-[#3E1C15]">{formData.tourDate || 'Flexible Schedule'}</strong></span>
          </div>
          <span className="hidden sm:inline text-[#D5CBB3]">•</span>
          <div>
            <span>Financing: <strong className="text-[#CE2029] font-bold">{formData.financing}</strong></span>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setIsBooked(false);
              setFormData({
                fullName: '',
                mobile: '',
                email: '',
                unit: '2-Bedroom Inner (30.60 sqm) • Starts ₱2.90M',
                tourDate: '',
                financing: 'Pag-IBIG Fund (HDMF Loan)',
              });
            }}
            className="text-xs uppercase tracking-widest text-[#CE2029] hover:text-[#B51B23] font-bold underline underline-offset-4"
          >
            Schedule Another Visit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#EADBBD] shadow-xl space-y-6"
    >
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-red-700 text-xs text-center font-medium">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-[#3E1C15] mb-1.5 uppercase tracking-wider font-logo">
            Full Name <span className="text-[#CE2029]">*</span>
          </label>
          <input
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Maria Santos"
            className="w-full bg-[#FCFAF2] border border-[#E0D5B8] rounded-xl px-4 py-3 text-sm text-[#3E1C15] placeholder-[#9E9584] focus:outline-none focus:border-[#CE2029] focus:ring-1 focus:ring-[#CE2029] transition-colors"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-bold text-[#3E1C15] mb-1.5 uppercase tracking-wider font-logo">
            Mobile Number <span className="text-[#CE2029]">*</span>
          </label>
          <input
            name="mobile"
            type="tel"
            required
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+63 917 123 4567"
            className="w-full bg-[#FCFAF2] border border-[#E0D5B8] rounded-xl px-4 py-3 text-sm text-[#3E1C15] placeholder-[#9E9584] focus:outline-none focus:border-[#CE2029] focus:ring-1 focus:ring-[#CE2029] transition-colors"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-[#3E1C15] mb-1.5 uppercase tracking-wider font-logo">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="maria@email.com"
            className="w-full bg-[#FCFAF2] border border-[#E0D5B8] rounded-xl px-4 py-3 text-sm text-[#3E1C15] placeholder-[#9E9584] focus:outline-none focus:border-[#CE2029] focus:ring-1 focus:ring-[#CE2029] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Preferred Unit Type */}
        <div>
          <label className="block text-xs font-bold text-[#3E1C15] mb-1.5 uppercase tracking-wider font-logo">
            Unit of Interest
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full bg-[#FCFAF2] border border-[#E0D5B8] rounded-xl px-4 py-3 text-sm text-[#3E1C15] focus:outline-none focus:border-[#CE2029] focus:ring-1 focus:ring-[#CE2029] transition-colors cursor-pointer"
          >
            <option>2-Bedroom Inner (30.60 sqm) • Starts ₱2.90M</option>
            <option>2-Bedroom Corner (35.57 sqm) • Starts ₱3.40M</option>
            <option>3-Bedroom Executive (42.00 sqm) • Starts ₱4.10M</option>
            <option>Commercial / Retail Space Inquiry</option>
          </select>
        </div>

        {/* Preferred Tour Date */}
        <div>
          <label className="block text-xs font-bold text-[#3E1C15] mb-1.5 uppercase tracking-wider font-logo">
            Preferred Tour Date
          </label>
          <input
            name="tourDate"
            type="date"
            value={formData.tourDate}
            onChange={handleChange}
            className="w-full bg-[#FCFAF2] border border-[#E0D5B8] rounded-xl px-4 py-3 text-sm text-[#3E1C15] focus:outline-none focus:border-[#CE2029] focus:ring-1 focus:ring-[#CE2029] transition-colors cursor-pointer"
          />
        </div>

        {/* Target Financing */}
        <div>
          <label className="block text-xs font-bold text-[#3E1C15] mb-1.5 uppercase tracking-wider font-logo">
            Target Financing
          </label>
          <select
            name="financing"
            value={formData.financing}
            onChange={handleChange}
            className="w-full bg-[#FCFAF2] border border-[#E0D5B8] rounded-xl px-4 py-3 text-sm text-[#3E1C15] focus:outline-none focus:border-[#CE2029] focus:ring-1 focus:ring-[#CE2029] transition-colors cursor-pointer"
          >
            <option>Pag-IBIG Fund (HDMF Loan)</option>
            <option>Commercial Bank Financing</option>
            <option>In-House Developer Financing</option>
            <option>Spot Cash with Maximum Discount</option>
          </select>
        </div>
      </div>

      {/* Submit Button & Disclaimer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DEC4]">
        <p className="text-xs text-[#5C3D36]">
          Strictly no agent fee. Direct 8990 Holdings developer assistance &amp; turnkey warranty.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#CE2029] hover:bg-[#B51B23] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-[#CE2029]/25 transform hover:-translate-y-0.5"
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Site Visit Schedule'}
        </button>
      </div>
    </form>
  );
}
