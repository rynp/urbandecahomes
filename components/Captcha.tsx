'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, RotateCw, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

export interface CaptchaProps {
  onVerify: (verified: boolean) => void;
  error?: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
}

interface Challenge {
  num1: number;
  num2: number;
  operator: '+' | '-';
  answer: number;
  token: string;
}

export default function Captcha({
  onVerify,
  error,
  theme = 'light',
  compact = false,
}: CaptchaProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  // Generate randomized challenge
  const generateChallenge = useCallback(() => {
    setIsVerified(false);
    setUserInput('');
    setLocalError(null);
    onVerify(false);

    const isAddition = Math.random() > 0.3;
    let n1: number;
    let n2: number;
    let ans: number;
    const op: '+' | '-' = isAddition ? '+' : '-';

    if (isAddition) {
      n1 = Math.floor(Math.random() * 12) + 3; // 3 to 14
      n2 = Math.floor(Math.random() * 9) + 2;  // 2 to 10
      ans = n1 + n2;
    } else {
      n1 = Math.floor(Math.random() * 12) + 10; // 10 to 21
      n2 = Math.floor(Math.random() * 8) + 1;   // 1 to 8
      ans = n1 - n2;
    }

    const token = Math.random().toString(36).substring(2, 9);
    setChallenge({ num1: n1, num2: n2, operator: op, answer: ans, token });
  }, [onVerify]);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRotating(true);
    generateChallenge();
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);
    setLocalError(null);

    if (!challenge) return;

    const parsed = parseInt(val.trim(), 10);
    if (!isNaN(parsed) && parsed === challenge.answer) {
      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);
        setIsVerified(true);
        onVerify(true);
      }, 350);
    } else {
      setIsVerified(false);
      onVerify(false);
      if (val.trim().length >= challenge.answer.toString().length) {
        setLocalError('Incorrect answer. Please try again.');
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        compact ? 'p-3' : 'p-4'
      } ${
        isVerified
          ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-700/50'
          : error || localError
          ? 'bg-red-50/70 border-red-300 dark:bg-red-950/20 dark:border-red-700/50'
          : isDark
          ? 'bg-charcoal-900/90 border-charcoal-700'
          : 'bg-stone-50/90 border-stone-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-1.5">
          {isVerified ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
          )}
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isVerified
                ? 'text-emerald-700 dark:text-emerald-300'
                : isDark
                ? 'text-stone-300'
                : 'text-charcoal-900'
            }`}
          >
            Human Verification Check
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[11px] text-stone-600 font-medium">
          <Lock className="w-3 h-3 text-stone-600" />
          <span>Anti-Bot Shield</span>
        </div>
      </div>

      {/* Challenge Row */}
      {isVerified ? (
        <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-emerald-100/60 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>Human verification confirmed. You may now submit the form.</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="text-[10px] text-emerald-700 hover:underline ml-2 flex-shrink-0"
            title="Reset verification"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Arithmetic Challenge Box */}
            <div
              className={`select-none flex items-center justify-center px-3.5 py-2 rounded-lg font-mono text-sm font-bold tracking-wider shadow-inner ${
                isDark
                  ? 'bg-charcoal-950 text-gold-300 border border-charcoal-700'
                  : 'bg-white text-charcoal-900 border border-stone-300 shadow-stone-100'
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 0)',
                backgroundSize: '6px 6px',
              }}
            >
              {challenge ? (
                <span>
                  {challenge.num1} {challenge.operator} {challenge.num2} = ?
                </span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            {/* Answer Input */}
            <div className="relative flex-1 min-w-[110px]">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Enter answer"
                className={`w-full px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  error || localError
                    ? 'border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-400'
                    : isDark
                    ? 'bg-charcoal-950 border-charcoal-700 text-white placeholder-stone-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30'
                    : 'bg-white border-stone-300 text-charcoal-900 placeholder-stone-500 focus:border-[#CE2029] focus:ring-2 focus:ring-[#CE2029]/25'
                }`}
                aria-label="Captcha security calculation answer"
              />
              {isChecking && (
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 border-2 border-[#CE2029] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Refresh Challenge Button */}
            <button
              type="button"
              onClick={handleRefresh}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isDark
                  ? 'bg-charcoal-800 border-charcoal-700 text-stone-300 hover:text-white hover:bg-charcoal-700'
                  : 'bg-white border-stone-300 text-stone-600 hover:text-charcoal-900 hover:bg-stone-100'
              }`}
              title="Get a new math verification challenge"
              aria-label="Refresh captcha security question"
            >
              <RotateCw
                className={`w-4 h-4 transition-transform duration-500 ${
                  isRotating ? 'rotate-180 text-[#CE2029]' : ''
                }`}
              />
            </button>
          </div>

          {/* Validation Feedback */}
          {(localError || error) && (
            <div className="flex items-center space-x-1 text-xs text-red-600 dark:text-red-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{localError || error}</span>
            </div>
          )}

          <div className="text-[11px] text-stone-600">
            Please solve the math puzzle above to verify human submission and prevent automated spam.
          </div>
        </div>
      )}
    </div>
  );
}
