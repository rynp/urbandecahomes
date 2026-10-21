'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Award,
  DollarSign,
  CheckCircle2,
  Upload,
  Send,
  Building2,
  Users,
  ShieldCheck,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import Captcha from '@/components/Captcha';
import { jobPostings } from '@/data/jobs';
import { businessInfo } from '@/data/business';
import { getJobPostingSchema } from '@/lib/schema';

export default function JobsPage() {
  const [selectedPosition, setSelectedPosition] = useState(jobPostings[0].title);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [experienceSummary, setExperienceSummary] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) {
      setErrorMessage('Please complete all required fields (Name, Email, Phone Number).');
      return;
    }

    if (!isCaptchaVerified) {
      setErrorMessage('Please solve the human verification check before submitting.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <Breadcrumbs items={[{ name: 'Careers & Recruitment', path: '/jobs' }]} />

      {/* Hero Header */}
      <section className="bg-charcoal-950 text-white py-14 sm:py-16 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-gold-500/40 text-gold-400 text-xs font-semibold mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Sales & Career Opportunities</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Build a High-Earning Career with Urban Deca Homes
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Join the fastest-selling affordable condominium sales force in Metro Manila. Enjoy competitive allowances, fast-track commissions, and accredited PRC training.
          </p>
        </div>
      </section>

      {/* Perks Ribbon */}
      <section className="bg-stone-100 py-6 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-charcoal-900 font-semibold">
          <div className="flex items-center justify-center space-x-2">
            <DollarSign className="w-4 h-4 text-gold-700" />
            <span>High Uncapped Commissions</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 text-gold-700" />
            <span>Free PRC Sales Accreditation</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Users className="w-4 h-4 text-gold-700" />
            <span>Fast-Growing Professional Network</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Building2 className="w-4 h-4 text-gold-700" />
            <span>Active RFO Condominium Inventory</span>
          </div>
        </div>
      </section>

      {/* Job Openings List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
            Available Positions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
            Open Real Estate Career Roles
          </h2>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {jobPostings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <JsonLd data={getJobPostingSchema(job)} />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold text-gold-800 bg-gold-50 px-2.5 py-0.5 rounded">
                      {job.department}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs text-stone-500">{job.employmentType}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
                    {job.title}
                  </h3>
                  <span className="text-xs text-stone-500 block mt-1">
                    Location: {job.location}
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] font-bold text-stone-400 uppercase block">
                    Compensation
                  </span>
                  <span className="text-sm font-bold text-gold-800">
                    {job.salaryOrCommission}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {job.overview}
              </p>

              {/* Responsibilities & Qualifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {job.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                    Requirements:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {job.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  Applications accepted until {job.closingDate}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPosition(job.title);
                    const el = document.getElementById('application-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-90 rounded-md shadow-sm transition-all"
                >
                  Apply For This Position
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="bg-stone-100/70 py-16 border-t border-stone-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-3 py-1 rounded-full">
                Candidate Intake
              </span>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-2">
                Submit Your Career Application
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Selected candidates will be invited for an interview and sales orientation.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-green-50 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-green-900">
                  Application Submitted!
                </h4>
                <p className="text-xs text-green-800 leading-relaxed">
                  Thank you for applying for the <strong className="text-charcoal-900">{selectedPosition}</strong> role. Our recruitment team will review your credentials and contact you via phone or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
                    Position Applied For *
                  </label>
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 font-medium"
                  >
                    {jobPostings.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
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
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
                    Resume / Curriculum Vitae (PDF/Doc)
                  </label>
                  <div className="border border-dashed border-stone-300 rounded-lg p-4 text-center bg-stone-50 hover:bg-stone-100 transition-colors">
                    <Upload className="w-5 h-5 text-stone-400 mx-auto mb-1" />
                    <label className="cursor-pointer text-xs font-bold text-gold-800 hover:underline">
                      <span>{resumeFileName || 'Choose resume file to upload'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="block text-[10px] text-stone-400 mt-0.5">
                      Accepted formats: PDF, DOC, DOCX up to 5MB
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-1">
                    Brief Summary of Relevant Experience
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your background in sales, marketing, customer service, or real estate..."
                    value={experienceSummary}
                    onChange={(e) => setExperienceSummary(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                {/* Human Verification Captcha */}
                <div className="pt-1">
                  <Captcha
                    compact
                    onVerify={(verified) => {
                      setIsCaptchaVerified(verified);
                      if (verified && errorMessage.includes('human verification')) {
                        setErrorMessage('');
                      }
                    }}
                    error={errorMessage.includes('human verification') ? errorMessage : undefined}
                  />
                </div>

                {errorMessage && !errorMessage.includes('human verification') && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
