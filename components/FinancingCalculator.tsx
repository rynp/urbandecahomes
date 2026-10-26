'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { calculateAmortization, formatPhp } from '@/lib/calculator';
import { trackEvent } from '@/lib/analytics';

interface FinancingCalculatorProps {
  initialPrice?: number;
  initialProject?: string;
}

export default function FinancingCalculator({
  initialPrice = 2400000,
  initialProject = 'manila',
}: FinancingCalculatorProps) {
  const [tcp, setTcp] = useState<number>(initialPrice);
  const [dpPercent, setDpPercent] = useState<number>(10);
  const [termYears, setTermYears] = useState<number>(30);
  const [loanType, setLoanType] = useState<'pag-ibig' | 'bank'>('pag-ibig');

  const interestRate = loanType === 'pag-ibig' ? 6.25 : 7.0;

  const result = useMemo(() => {
    return calculateAmortization({
      totalContractPrice: tcp,
      downpaymentPercent: dpPercent,
      loanTermYears: termYears,
      interestRateAnnual: interestRate,
    });
  }, [tcp, dpPercent, termYears, interestRate]);

  const handlePricePreset = (price: number) => {
    setTcp(price);
    trackEvent({
      name: 'calculator_use',
      params: { tcp: price, term_years: termYears },
    });
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden">
      {/* Header with Dark Luxury Theme */}
      <div className="relative bg-[#111111] bg-gradient-to-br from-charcoal-950 via-[#18181c] to-charcoal-950 text-white p-6 sm:p-8 lg:p-10 overflow-hidden border-b border-charcoal-800">
        {/* Subtle Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#CE2029]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 left-1/3 w-72 h-72 bg-[#FAF0C8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#CE2029] mb-3 uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-sm font-logo">
              <Calculator className="w-3.5 h-3.5 text-[#CE2029] animate-pulse" />
              <span>Real-Time Mortgage Estimator</span>
            </div>
            <h2 className="font-logo text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Pag-IBIG &amp; Bank Monthly Amortization Calculator
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl leading-relaxed">
              Estimate your monthly amortization, downpayment schedule, and required gross household income to own an Urban Deca home with live computations.
            </p>
          </div>

          {/* Loan Scheme Selector */}
          <div className="flex rounded-2xl bg-[#1c1c22] p-1.5 border border-white/15 backdrop-blur-md self-start lg:self-auto shadow-inner font-logo">
            <button
              type="button"
              onClick={() => {
                setLoanType('pag-ibig');
                if (termYears > 30) setTermYears(30);
              }}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                loanType === 'pag-ibig'
                  ? 'bg-[#CE2029] text-white shadow-lg shadow-[#CE2029]/35 ring-1 ring-white/20'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Pag-IBIG Fund (6.25%)
            </button>
            <button
              type="button"
              onClick={() => {
                setLoanType('bank');
                if (termYears > 20) setTermYears(20);
              }}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                loanType === 'bank'
                  ? 'bg-[#CE2029] text-white shadow-lg shadow-[#CE2029]/35 ring-1 ring-white/20'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Commercial Bank (7.00%)
            </button>
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-7">
          {/* Quick Presets */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-900">
                Sample Unit Price Presets:
              </label>
              <span className="text-[11px] text-stone-400 font-medium">Click to auto-populate</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { price: 1900000, label: '₱1.90M', desc: 'Cubao Studio' },
                { price: 2400000, label: '₱2.40M', desc: 'Manila 2-BR' },
                { price: 2900000, label: '₱2.90M', desc: 'Ortigas 2-BR' },
                { price: 3550000, label: '₱3.55M', desc: 'Ortigas Corner' },
              ].map((preset) => {
                const isSelected = tcp === preset.price;
                return (
                  <button
                    key={preset.price}
                    type="button"
                    onClick={() => handlePricePreset(preset.price)}
                    className={`py-3 px-3 text-xs rounded-xl border transition-all duration-300 text-center relative overflow-hidden group ${
                      isSelected
                        ? 'border-gold-500 bg-gold-50/70 text-charcoal-950 shadow-md ring-2 ring-gold-400/40'
                        : 'border-stone-200 bg-stone-50/80 text-stone-700 hover:bg-stone-100/90 hover:border-stone-300'
                    }`}
                  >
                    <span className={`block font-extrabold text-sm transition-colors ${isSelected ? 'text-charcoal-950' : 'group-hover:text-charcoal-900'}`}>
                      {preset.label}
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5 font-medium">{preset.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total Contract Price Input */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="custom-tcp" className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                Total Contract Price (TCP):
              </label>
              <span className="text-lg sm:text-xl font-extrabold text-charcoal-950 font-serif">
                {formatPhp(tcp)}
              </span>
            </div>
            <input
              id="custom-tcp"
              type="range"
              min="1500000"
              max="5000000"
              step="50000"
              value={tcp}
              onChange={(e) => setTcp(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#CE2029] focus:outline-none"
            />
            <div className="flex justify-between text-[11px] font-semibold text-stone-400 mt-2 font-logo">
              <span>₱1.50M</span>
              <span>₱3.00M</span>
              <span>₱5.00M</span>
            </div>
          </div>

          {/* Downpayment Percentage */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="downpayment-percent" className="text-xs font-bold uppercase tracking-wider text-charcoal-900 font-logo">
                Downpayment / Equity:
              </label>
              <span className="text-xs font-bold text-[#CE2029] bg-[#FAF5E6] px-2.5 py-1 rounded-md border border-[#EADBBD] font-logo">
                {dpPercent}% = {formatPhp(result.downpaymentAmount)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 font-logo">
              {[10, 15, 20].map((pct) => {
                const isSelected = dpPercent === pct;
                const dpAmount = (tcp * pct) / 100;
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDpPercent(pct)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#CE2029] border-[#CE2029] text-white font-bold shadow-sm shadow-[#CE2029]/20'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 font-medium'
                    }`}
                  >
                    <span className="block text-xs font-bold">{pct}% Equity</span>
                    <span className="text-[10px] opacity-80 block mt-0.5">₱{(dpAmount / 1000).toFixed(0)}k</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="loan-tenure" className="text-xs font-bold uppercase tracking-wider text-charcoal-900 font-logo">
                Loan Term:
              </label>
              <span className="text-xs font-bold text-charcoal-900 bg-stone-100 px-2.5 py-1 rounded-md font-logo">
                {termYears} Years ({termYears * 12} Mos)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2.5 font-logo">
              {[10, 15, 20, 30].map((years) => {
                const disabled = loanType === 'bank' && years > 20;
                const isSelected = termYears === years;
                return (
                  <button
                    key={years}
                    type="button"
                    disabled={disabled}
                    onClick={() => setTermYears(years)}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all duration-300 ${
                      disabled
                        ? 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                        : isSelected
                        ? 'bg-[#3E1C15] text-white border-[#3E1C15] shadow-md shadow-black/15'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {years} Years
                  </button>
                );
              })}
            </div>
            {loanType === 'bank' && (
              <span className="text-[11px] text-stone-400 mt-2 block">
                * Commercial bank mortgage terms are typically capped at a maximum of 20 years.
              </span>
            )}
          </div>
        </div>

        {/* Results Card Column (5 Cols) */}
        <div className="lg:col-span-5 bg-[#141418] bg-gradient-to-br from-[#141418] via-[#1a1a22] to-[#141418] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Cyber Grid Overlay */}
          <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#CE2029]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FAF0C8]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between font-logo">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#CE2029] flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#CE2029] animate-pulse" />
                <span>Estimated Financing Summary</span>
              </span>
              <span className="text-[10px] text-[#FAF0C8] bg-white/10 px-2.5 py-1 rounded-md border border-white/15 font-bold uppercase tracking-wider">
                {loanType === 'pag-ibig' ? 'Pag-IBIG @ 6.25%' : 'Bank @ 7.00%'}
              </span>
            </div>

            {/* Big Amortization Hero Box */}
            <div className="bg-[#1e1e26] p-6 rounded-2xl border border-white/15 shadow-inner text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                Total Estimated Monthly
              </span>
              
              {/* High-Contrast Crystal-Clear Hero Number */}
              <div className="flex items-baseline justify-center text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-logo tracking-tight mt-1">
                <span className="text-[#CE2029] mr-1 text-2xl sm:text-3xl lg:text-4xl">₱</span>
                <span className="text-white drop-shadow-sm">{result.totalMonthlyPayment.toLocaleString('en-PH')}</span>
                <span className="text-xs sm:text-sm font-logo font-semibold text-stone-400 ml-1.5">/ mo</span>
              </div>

              <span className="text-[11px] text-stone-300 mt-2 block">
                Includes estimated MRI &amp; Fire Insurance reserve
              </span>
            </div>

            {/* Line Item Breakdown */}
            <div className="space-y-3 text-xs text-stone-300 pt-3 border-t border-white/10 font-logo">
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Principal &amp; Interest Amortization:</span>
                <span className="font-bold text-white text-sm">
                  {formatPhp(result.monthlyAmortization)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Est. MRI &amp; Fire Insurance:</span>
                <span className="font-bold text-white text-sm">
                  ~{formatPhp(result.estMriAndFireInsurance)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Net Loanable Balance:</span>
                <span className="font-bold text-[#FAF0C8] text-sm">
                  {formatPhp(result.loanableAmount)}
                </span>
              </div>
            </div>

            {/* Income Qualification Box */}
            <div className="bg-[#1e1e26] p-4 sm:p-5 rounded-2xl border border-[#CE2029]/30 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#FAF0C8] mb-1.5 font-logo">
                <ShieldCheck className="w-4 h-4 text-[#CE2029] flex-shrink-0" />
                <span>Required Gross Monthly Household Income</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white flex items-baseline space-x-1.5 font-logo">
                <span>{formatPhp(result.requiredGrossMonthlyIncome)}</span>
                <span className="text-xs font-normal text-stone-400">/ month</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1.5 leading-relaxed">
                Based on Pag-IBIG&apos;s 35% debt-to-income benchmark. Income can be combined with a legal spouse or immediate family co-borrower.
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 mt-6 border-t border-white/10 relative z-10">
            <Link
              href={`/inquire-now?project=${initialProject}&price=${tcp}`}
              className="w-full inline-flex items-center justify-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#CE2029] hover:bg-[#B51B23] rounded-xl shadow-lg shadow-[#CE2029]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 font-logo"
            >
              <span>Get Formal Computation Sheet</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <span className="block text-center text-[10px] text-stone-400 mt-2.5">
              * Official computations will be prepared &amp; verified by accredited property specialists.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
