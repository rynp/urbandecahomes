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
      <div className="bg-charcoal-850 p-8 sm:p-12 rounded-3xl border border-ochre-500/30 shadow-2xl text-center animate-fadeIn">
        <div className="w-16 h-16 bg-ochre-500/20 text-ochre-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-ochre-500/40">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-white">
          Tour Reservation Confirmed
        </h3>
        <p className="text-gray-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          Thank you, <span className="text-ochre-200 font-semibold">{formData.fullName}</span>! Your viewing request for{' '}
          <span className="text-white font-medium">{formData.unit}</span> has been logged with our Pasig sales pavilion.
        </p>

        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-4 bg-charcoal-800/90 border border-white/10 px-6 py-3.5 rounded-2xl text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-ochre-400" />
            <span>Target Date: <strong className="text-white">{formData.tourDate || 'Flexible Schedule'}</strong></span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div>
            <span>Financing: <strong className="text-ochre-200">{formData.financing}</strong></span>
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
            className="text-xs uppercase tracking-widest text-ochre-400 hover:text-ochre-300 underline underline-offset-4"
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
      className="bg-charcoal-850 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6"
    >
      {errorMessage && (
        <div className="p-3 bg-red-900/40 border border-red-500/40 rounded-xl text-red-200 text-xs text-center">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-ochre-400">*</span>
          </label>
          <input
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Maria Santos"
            className="w-full bg-charcoal-800 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-ochre-500 focus:ring-1 focus:ring-ochre-500 transition-colors"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Mobile Number <span className="text-ochre-400">*</span>
          </label>
          <input
            name="mobile"
            type="tel"
            required
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+63 917 123 4567"
            className="w-full bg-charcoal-800 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-ochre-500 focus:ring-1 focus:ring-ochre-500 transition-colors"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="maria@email.com"
            className="w-full bg-charcoal-800 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-ochre-500 focus:ring-1 focus:ring-ochre-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Preferred Unit Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Unit of Interest
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full bg-charcoal-800 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ochre-500 focus:ring-1 focus:ring-ochre-500 transition-colors cursor-pointer"
          >
            <option className="bg-charcoal-850">2-Bedroom Inner (30.60 sqm) • Starts ₱2.90M</option>
            <option className="bg-charcoal-850">2-Bedroom Corner (35.57 sqm) • Starts ₱3.40M</option>
            <option className="bg-charcoal-850">3-Bedroom Executive (42.00 sqm) • Starts ₱4.10M</option>
            <option className="bg-charcoal-850">Commercial / Retail Space Inquiry</option>
          </select>
        </div>

        {/* Preferred Tour Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Preferred Tour Date
          </label>
          <input
            name="tourDate"
            type="date"
            value={formData.tourDate}
            onChange={handleChange}
            className="w-full bg-charcoal-800 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ochre-500 focus:ring-1 focus:ring-ochre-500 transition-colors cursor-pointer"
          />
        </div>

        {/* Target Financing */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Target Financing
          </label>
          <select
            name="financing"
            value={formData.financing}
            onChange={handleChange}
            className="w-full bg-charcoal-800 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ochre-500 focus:ring-1 focus:ring-ochre-500 transition-colors cursor-pointer"
          >
            <option className="bg-charcoal-850">Pag-IBIG Fund (HDMF Loan)</option>
            <option className="bg-charcoal-850">Commercial Bank Financing</option>
            <option className="bg-charcoal-850">In-House Developer Financing</option>
            <option className="bg-charcoal-850">Spot Cash with Maximum Discount</option>
          </select>
        </div>
      </div>

      {/* Submit Button & Disclaimer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
        <p className="text-xs text-gray-400">
          Strictly no agent fee. Direct 8990 Holdings developer assistance &amp; turnkey warranty.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-ochre-500 hover:bg-ochre-600 disabled:opacity-50 text-charcoal-900 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-ochre-500/20 transform hover:-translate-y-0.5"
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Site Visit Schedule'}
        </button>
      </div>
    </form>
  );
}
