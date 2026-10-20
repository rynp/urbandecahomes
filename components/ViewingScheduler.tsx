'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, Users } from 'lucide-react';
import { projects } from '@/data/projects';
import { businessInfo } from '@/data/business';
import { trackEvent } from '@/lib/analytics';

export default function ViewingScheduler() {
  const [selectedProject, setSelectedProject] = useState('manila');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [visitorCount, setVisitorCount] = useState('1–2 Persons');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentProject = projects.find((p) => p.slug === selectedProject);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !selectedDate) {
      setErrorMessage('Please provide your name, phone number, and preferred date.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      trackEvent({
        name: 'viewing_request_success',
        params: { project_slug: selectedProject },
      });

      setIsBooked(true);
    } catch (err) {
      setErrorMessage('Unable to book viewing. Please contact our hotline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-8 text-center animate-fadeIn">
        <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
          Site Tour Appointment Reserved!
        </h4>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
          Thank you, <strong className="text-charcoal-900">{name}</strong>. Your model unit viewing at{' '}
          <strong className="text-charcoal-900">{currentProject?.name}</strong> has been logged for{' '}
          <strong className="text-charcoal-900">{selectedDate} at {selectedTime}</strong>.
        </p>
        <div className="p-4 bg-white rounded-lg border border-stone-200 max-w-sm mx-auto text-xs text-stone-600 text-left mb-6 space-y-1.5">
          <div><strong className="text-stone-800">Location:</strong> {currentProject?.location.address}</div>
          <div><strong className="text-stone-800">Meeting Point:</strong> On-site Sales Office Guardhouse</div>
          <div><strong className="text-stone-800">What to Bring:</strong> 1 Valid Government ID for visitor gate pass</div>
        </div>
        <button
          type="button"
          onClick={() => setIsBooked(false)}
          className="text-xs text-stone-400 hover:text-stone-600 underline"
        >
          Book another schedule
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8">
      <div className="flex items-center space-x-2 text-xs font-semibold text-gold-700 uppercase tracking-wider mb-2">
        <Calendar className="w-4 h-4" />
        <span>Complimentary Model Unit Tour</span>
      </div>
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 mb-2">
        Book an On-Site Property Viewing
      </h3>
      <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
        Experience actual finishes, tour building amenities, and inspect available floor units accompanied by an accredited property specialist.
      </p>

      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleBooking} className="space-y-4">
        {/* Project Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
            Choose Development:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProject(p.slug)}
                className={`p-3 text-left rounded-lg border transition-all ${
                  selectedProject === p.slug
                    ? 'border-gold-600 bg-gold-50/80 shadow-sm'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <span className="block text-xs font-bold text-charcoal-900">{p.name}</span>
                <span className="text-[10px] text-stone-500">{p.location.city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date, Time, Visitors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
              Preferred Date *
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
              Preferred Time Slot
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 font-medium"
            >
              <option value="10:00 AM">Morning (10:00 AM)</option>
              <option value="01:30 PM">Afternoon (1:30 PM)</option>
              <option value="03:30 PM">Late Afternoon (3:30 PM)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
              Visitors Count
            </label>
            <select
              value={visitorCount}
              onChange={(e) => setVisitorCount(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 font-medium"
            >
              <option value="1–2 Persons">1–2 Persons</option>
              <option value="3–4 Persons">3–4 Persons (Family)</option>
              <option value="5+ Persons">5+ Persons Group</option>
            </select>
          </div>
        </div>

        {/* Guest Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              placeholder="e.g. John Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              placeholder="0917-xxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition-all"
          >
            {isSubmitting ? 'Reserving Schedule...' : 'Confirm Free Site Tour Appointment'}
          </button>
          <span className="block text-center text-[11px] text-stone-500 mt-1.5">
            Free of charge • Model unit visits available Monday to Saturday
          </span>
        </div>
      </form>
    </div>
  );
}
