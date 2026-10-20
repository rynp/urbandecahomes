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
    <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="bg-charcoal-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center text-xs font-semibold text-gold-400 mb-2 uppercase tracking-wider">
              <Calculator className="w-4 h-4 mr-1.5" />
              <span>Mortgage Estimator</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pag-IBIG & Bank Monthly Calculator
            </h3>
            <p className="text-sm text-stone-300 mt-1 max-w-xl">
              Estimate your monthly amortization and required gross household income to own a unit at Urban Deca Homes.
            </p>
          </div>

          {/* Loan Scheme Selector */}
          <div className="flex rounded-lg bg-charcoal-800 p-1 border border-charcoal-700 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setLoanType('pag-ibig');
                if (termYears > 30) setTermYears(30);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all ${
                loanType === 'pag-ibig'
                  ? 'gold-gradient text-charcoal-900 shadow'
                  : 'text-stone-300 hover:text-white'
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
              className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all ${
                loanType === 'bank'
                  ? 'gold-gradient text-charcoal-900 shadow'
                  : 'text-stone-300 hover:text-white'
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
        <div className="lg:col-span-5 bg-stone-50 rounded-xl p-6 border border-stone-200 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              Estimated Monthly Breakdown
            </span>

            {/* Big Amortization Number */}
            <div className="bg-white p-5 rounded-lg border border-gold-200 shadow-sm text-center">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                Total Estimated Monthly
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-gold-700 font-serif block mt-1">
                {formatPhp(result.totalMonthlyPayment)}
              </span>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Includes estimated MRI & Fire Insurance reserve
              </span>
            </div>

            {/* Line Item Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Principal & Interest Amortization:</span>
                <span className="font-semibold text-charcoal-900">
                  {formatPhp(result.monthlyAmortization)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Est. MRI & Fire Insurance:</span>
                <span className="font-semibold text-charcoal-900">
                  ~{formatPhp(result.estMriAndFireInsurance)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Net Loanable Balance:</span>
                <span className="font-semibold text-charcoal-900">
                  {formatPhp(result.loanableAmount)}
                </span>
              </div>
            </div>

            {/* Income Qualification Box */}
            <div className="bg-gold-50/70 p-4 rounded-lg border border-gold-200/80">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-gold-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-gold-700" />
                <span>Required Gross Monthly Income</span>
              </div>
              <span className="text-lg font-bold text-charcoal-900 block">
                {formatPhp(result.requiredGrossMonthlyIncome)} / month
              </span>
              <p className="text-[11px] text-stone-600 mt-1 leading-normal">
                Based on Pag-IBIG&apos;s 35% debt-to-income benchmark. Income can be combined with a spouse or immediate family co-borrower.
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 mt-4 border-t border-stone-200">
            <Link
              href={`/inquire-now?project=${initialProject}&price=${tcp}`}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 gold-gradient hover:opacity-95 rounded-lg shadow transition-all"
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
