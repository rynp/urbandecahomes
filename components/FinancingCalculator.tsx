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
    <div className="futuristic-card cyber-corner bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden">
      {/* Header */}
      <div className="relative bg-charcoal-950 text-white p-6 sm:p-8 overflow-hidden cyber-grid">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#eb6753]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#e8cf7b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#eb6753] mb-2 uppercase tracking-widest bg-charcoal-900/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
              <Calculator className="w-3.5 h-3.5 text-[#eb6753] animate-pulse" />
              <span>Real-Time Mortgage Estimator</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pag-IBIG &amp; Bank Monthly Amortization Calculator
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1.5 max-w-xl leading-relaxed">
              Estimate your monthly amortization and required gross household income to own a unit across Urban Deca developments with instant computation algorithms.
            </p>
          </div>

          {/* Loan Scheme Selector */}
          <div className="flex rounded-xl bg-charcoal-900/90 p-1.5 border border-white/10 backdrop-blur-md self-start lg:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => {
                setLoanType('pag-ibig');
                if (termYears > 30) setTermYears(30);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                loanType === 'pag-ibig'
                  ? 'bg-[#eb6753] text-white shadow-lg shadow-[#eb6753]/30'
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
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                loanType === 'bank'
                  ? 'bg-[#eb6753] text-white shadow-lg shadow-[#eb6753]/30'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Bank Loan (7.00%)
            </button>
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Select Sample Unit Price Presets:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handlePricePreset(1900000)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  tcp === 1900000
                    ? 'border-gold-600 bg-gold-50 text-gold-900 shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="block font-bold">₱1.90M</span>
                <span className="text-[10px] text-stone-500">Cubao Studio</span>
              </button>

              <button
                type="button"
                onClick={() => handlePricePreset(2400000)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  tcp === 2400000
                    ? 'border-gold-600 bg-gold-50 text-gold-900 shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="block font-bold">₱2.40M</span>
                <span className="text-[10px] text-stone-500">Manila 2-BR</span>
              </button>

              <button
                type="button"
                onClick={() => handlePricePreset(2900000)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  tcp === 2900000
                    ? 'border-gold-600 bg-gold-50 text-gold-900 shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="block font-bold">₱2.90M</span>
                <span className="text-[10px] text-stone-500">Ortigas 2-BR</span>
              </button>

              <button
                type="button"
                onClick={() => handlePricePreset(3550000)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  tcp === 3550000
                    ? 'border-gold-600 bg-gold-50 text-gold-900 shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="block font-bold">₱3.55M</span>
                <span className="text-[10px] text-stone-500">Ortigas Corner</span>
              </button>
            </div>
          </div>

          {/* Total Contract Price Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="custom-tcp" className="text-sm font-semibold text-charcoal-900">
                Total Contract Price (TCP):
              </label>
              <span className="text-base font-bold text-charcoal-900">
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
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>₱1.5M</span>
              <span>₱3.0M</span>
              <span>₱5.0M</span>
            </div>
          </div>

          {/* Downpayment Percentage */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="downpayment-percent" className="text-sm font-semibold text-charcoal-900">
                Downpayment / Equity:
              </label>
              <span className="text-sm font-bold text-gold-800">
                {dpPercent}% ({formatPhp(result.downpaymentAmount)})
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 20].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDpPercent(pct)}
                  className={`py-2 text-xs font-bold rounded border ${
                    dpPercent === pct
                      ? 'bg-gold-100 border-gold-600 text-gold-900'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {pct}% Downpayment
                </button>
              ))}
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="loan-tenure" className="text-sm font-semibold text-charcoal-900">
                Loan Term (Years):
              </label>
              <span className="text-sm font-bold text-charcoal-900">
                {termYears} Years ({termYears * 12} Months)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 30].map((years) => {
                const disabled = loanType === 'bank' && years > 20;
                return (
                  <button
                    key={years}
                    type="button"
                    disabled={disabled}
                    onClick={() => setTermYears(years)}
                    className={`py-2 text-xs font-bold rounded border transition-colors ${
                      disabled
                        ? 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400'
                        : termYears === years
                        ? 'bg-charcoal-900 text-white border-charcoal-900'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {years} Years
                  </button>
                );
              })}
            </div>
            {loanType === 'bank' && (
              <span className="text-[11px] text-stone-400 mt-1 block">
                * Commercial bank mortgage terms are typically capped at 20 years.
              </span>
            )}
          </div>
        </div>

        {/* Results Card Column (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden cyber-grid">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#eb6753]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#eb6753] flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#eb6753] animate-ping" />
                <span>Computed Monthly Overview</span>
              </span>
              <span className="text-[10px] text-stone-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Pag-IBIG Benchmark
              </span>
            </div>

            {/* Big Amortization Number in Glass HUD */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-inner text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#eb6753]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                Total Estimated Monthly
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-300 to-[#eb6753] font-serif block mt-1 tracking-tight">
                {formatPhp(result.totalMonthlyPayment)}
              </span>
              <span className="text-[11px] text-stone-400 mt-1 block">
                Includes estimated MRI &amp; Fire Insurance reserve
              </span>
            </div>

            {/* Line Item Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-300 pt-3 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Principal &amp; Interest Amortization:</span>
                <span className="font-semibold text-white">
                  {formatPhp(result.monthlyAmortization)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Est. MRI &amp; Fire Insurance:</span>
                <span className="font-semibold text-white">
                  ~{formatPhp(result.estMriAndFireInsurance)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Net Loanable Balance:</span>
                <span className="font-semibold text-gold-300">
                  {formatPhp(result.loanableAmount)}
                </span>
              </div>
            </div>

            {/* Income Qualification Box */}
            <div className="bg-charcoal-900/90 p-4 rounded-xl border border-gold-500/30 backdrop-blur-md">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-gold-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Required Gross Monthly Income</span>
              </div>
              <span className="text-lg font-bold text-white block">
                {formatPhp(result.requiredGrossMonthlyIncome)} / month
              </span>
              <p className="text-[11px] text-stone-400 mt-1 leading-normal">
                Based on Pag-IBIG&apos;s 35% debt-to-income benchmark. Income can be combined with a spouse or immediate family co-borrower.
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 mt-5 border-t border-white/10 relative z-10">
            <Link
              href={`/inquire-now?project=${initialProject}&price=${tcp}`}
              className="w-full btn-futuristic inline-flex items-center justify-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#eb6753] hover:bg-[#d85542] rounded-xl shadow-lg shadow-[#eb6753]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get Formal Computation Sheet</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
            <span className="block text-center text-[10px] text-stone-400 mt-2">
              * Official computations will be verified by accredited property specialists.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
