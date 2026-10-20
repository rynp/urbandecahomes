export interface FinancingOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  interestRateAnnual: number;
  maxTenureYears: number;
  minDownpaymentPercent: number;
  processingTimeWeeks: string;
  bestFor: string;
  pros: string[];
  cons: string[];
}

export const financingOptions: FinancingOption[] = [
  {
    id: 'pag-ibig',
    name: 'Pag-IBIG Fund Housing Loan',
    badge: 'Most Popular / Lowest Monthly Amortization',
    description: 'Government-backed housing financing through the Home Development Mutual Fund (HDMF). Provides the lowest fixed monthly amortizations and longest payment terms up to 30 years.',
    interestRateAnnual: 6.25, // current standard 3-year fixed rate
    maxTenureYears: 30,
    minDownpaymentPercent: 10,
    processingTimeWeeks: '4–8 weeks',
    bestFor: 'Active Pag-IBIG members, start-up families, minimum-to-middle income earners seeking predictable long-term payments.',
    pros: [
      'Extended loan tenure up to 30 years keeps monthly payments low',
      'Affordable interest rates with 1, 3, 5, 10-year fixing options',
      'Lower income requirements compared to private commercial banks',
      'Can be co-borrowed with spouse or direct relatives',
    ],
    cons: [
      'Requires active Pag-IBIG membership with at least 24 monthly savings contributions',
      'Standard government document verification turnaround',
    ],
  },
  {
    id: 'bank-financing',
    name: 'Commercial Bank Financing',
    badge: 'Fast Processing for High-Income Earners',
    description: 'Mortgage loans offered through accredited top-tier Philippine banks (BDO, BPI, Security Bank, China Bank, UnionBank).',
    interestRateAnnual: 7.0,
    maxTenureYears: 20,
    minDownpaymentPercent: 15,
    processingTimeWeeks: '2–4 weeks',
    bestFor: 'Professionals with established banking relationships, high credit scores, and capacity for higher monthly payments.',
    pros: [
      'Fast automated credit approval workflows',
      'Flexible loan terms (5 to 20 years)',
      'Potential relationship discounts on interest rates',
    ],
    cons: [
      'Stricter credit verification and higher gross income thresholds',
      'Shorter maximum loan terms (typically capped at 20–25 years)',
      'Additional bank processing and appraisal charges',
    ],
  },
  {
    id: 'in-house',
    name: 'In-House Developer Financing',
    badge: 'Guaranteed Approval / Minimal Requirements',
    description: 'Direct financing extended directly by 8990 Housing Development Corporation without third-party bank or government underwriting.',
    interestRateAnnual: 11.0,
    maxTenureYears: 10,
    minDownpaymentPercent: 20,
    processingTimeWeeks: '1–2 weeks',
    bestFor: 'Buyers with non-traditional income proof, foreign residents, or those needing immediate occupancy while working on bank/Pag-IBIG paperwork.',
    pros: [
      'Fastest approval with minimal document requirements',
      'No strict credit history or payslip hurdles',
      'Can be transitioned to Pag-IBIG or Bank loan later on',
    ],
    cons: [
      'Higher annual interest rates',
      'Shorter loan tenure (typically up to 5 to 10 years)',
      'Higher monthly amortizations',
    ],
  },
];

export interface BuyingStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  action: string;
  documentsNeeded: string[];
}

export const fourStepProcess: BuyingStep[] = [
  {
    step: 1,
    title: 'Project Inquiry & Site Viewing',
    duration: 'Day 1–3',
    description: 'Schedule a free guided site tour of your chosen development (Manila, Ortigas, or Cubao). Tour actual model units, inspect building amenities, and review sample computations tailored to your budget.',
    action: 'Schedule Free Viewing',
    documentsNeeded: ['1 Valid Government-Issued ID'],
  },
  {
    step: 2,
    title: 'Unit Reservation & Documentation',
    duration: 'Day 4–7',
    description: 'Select your preferred floor, building, and unit cut. Pay the initial reservation fee (starts at ₱10,000) to hold the unit and freeze the price, then complete the Buyer Information Sheet (BIS).',
    action: 'Pay Reservation Fee',
    documentsNeeded: [
      '2 Valid Government-Issued IDs (Passport, Driver’s License, UMID, SSS)',
      'Proof of Billing Address (Meralco, Maynilad, Telecom bill)',
      'Signed Reservation Agreement & Buyer Information Sheet',
    ],
  },
  {
    step: 3,
    title: 'Document Submission & Loan Processing',
    duration: 'Week 2–4',
    description: 'Submit your income documents to our accredited documentation team. We handle the submission, appraisal coordination, and liaison with Pag-IBIG Fund or partner banks on your behalf.',
    action: 'Submit Income Documents',
    documentsNeeded: [
      'Locally Employed: Latest 3 months payslips, Notarized Certificate of Employment with Compensation (COEC), latest ITR Form 2316',
      'OFWs: Valid Job Contract or POEA contract, latest 3 months proof of remittance, Passport copy with entry/exit stamps, Notarized Special Power of Attorney (SPA)',
      'Self-Employed: DTI / SEC Registration, latest 2 years Audited Financial Statements & ITR 1701, Bank Statements of last 6 months',
    ],
  },
  {
    step: 4,
    title: 'Loan Approval & Unit Turnover',
    duration: 'Week 5–8',
    description: 'Upon issuance of the Notice of Approval (NOA) and Letter of Guarantee (LOG), complete the unit acceptance walk-through. Receive your keys and official move-in clearance!',
    action: 'Receive Keys & Move In',
    documentsNeeded: [
      'Signed Loan Agreement Documents',
      'Post-Dated Checks (PDCs) or Auto-Debit Arrangement (ADA)',
      'Unit Acceptance and Punchlist Clearance Form',
    ],
  },
];

export const documentChecklist = {
  locallyEmployed: [
    '2 Valid Government IDs (Primary: Passport, Driver’s License, UMID, Postal ID, PRC)',
    '1 Month Latest Payslip (Certified true copy or digital payslip)',
    'Notarized Certificate of Employment and Compensation (COEC)',
    'Latest BIR Form 2316 (Income Tax Return)',
    'Proof of Billing Address (under buyer or immediate family name)',
    'Marriage Certificate (if married) or Birth Certificate (if single)',
    'Pag-IBIG Member Identification (MID) / Member’s Data Form (MDF)',
  ],
  ofw: [
    '2 Valid Government IDs (Passport + Philippine Government ID)',
    'Valid Employment Contract (POEA verified or consularized)',
    'Proof of Remittance (Last 3 consecutive months)',
    'Consularized or Apostilled Special Power of Attorney (SPA)',
    '2 Valid IDs of designated Attorney-in-Fact (SPA Representative)',
    'Pag-IBIG MID & record of 24 monthly contributions',
  ],
  selfEmployed: [
    '2 Valid Government IDs',
    'DTI Business Name Registration (Single Proprietorship) or SEC Papers (Corporation)',
    'Mayor’s Business Permit and Official Receipt',
    'Audited Financial Statements (Last 2 years with BIR receiving stamp)',
    'Income Tax Return (ITR Form 1701 with payment receipts)',
    'Bank Statements for the last 6 consecutive months',
  ],
};
