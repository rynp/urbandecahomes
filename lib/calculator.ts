export interface CalculationResult {
  totalContractPrice: number;
  downpaymentPercent: number;
  downpaymentAmount: number;
  loanableAmount: number;
  loanTermYears: number;
  interestRateAnnual: number;
  monthlyAmortization: number;
  estMriAndFireInsurance: number;
  totalMonthlyPayment: number;
  requiredGrossMonthlyIncome: number;
}

export function calculateAmortization({
  totalContractPrice,
  downpaymentPercent = 10,
  loanTermYears = 30,
  interestRateAnnual = 6.25,
}: {
  totalContractPrice: number;
  downpaymentPercent?: number;
  loanTermYears?: number;
  interestRateAnnual?: number;
}): CalculationResult {
  const safeTcp = Math.max(500000, totalContractPrice);
  const dpPct = Math.min(50, Math.max(5, downpaymentPercent));
  const termYears = Math.min(30, Math.max(5, loanTermYears));
  const annualRate = Math.max(1, interestRateAnnual);

  const downpaymentAmount = safeTcp * (dpPct / 100);
  const loanableAmount = safeTcp - downpaymentAmount;

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = termYears * 12;

  // Standard amort formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyAmortization = 0;
  if (monthlyRate === 0) {
    monthlyAmortization = loanableAmount / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyAmortization = (loanableAmount * (monthlyRate * factor)) / (factor - 1);
  }

  // Estimated MRI (Mortgage Redemption Insurance) and Fire Insurance (~0.025% of loan per month)
  const estMriAndFireInsurance = Math.round(loanableAmount * 0.00035);
  const totalMonthlyPayment = Math.round(monthlyAmortization + estMriAndFireInsurance);

  // Pag-IBIG requirement: Monthly amortization should not exceed 35% of Gross Monthly Income
  const requiredGrossMonthlyIncome = Math.round(totalMonthlyPayment / 0.35);

  return {
    totalContractPrice: safeTcp,
    downpaymentPercent: dpPct,
    downpaymentAmount: Math.round(downpaymentAmount),
    loanableAmount: Math.round(loanableAmount),
    loanTermYears: termYears,
    interestRateAnnual: annualRate,
    monthlyAmortization: Math.round(monthlyAmortization),
    estMriAndFireInsurance,
    totalMonthlyPayment,
    requiredGrossMonthlyIncome,
  };
}

export function formatPhp(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
}
