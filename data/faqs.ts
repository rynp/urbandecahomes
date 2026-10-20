export interface FAQItem {
  id: string;
  category: 'General' | 'Financing' | 'Requirements' | 'Turnover & Living';
  question: string;
  answer: string;
}

export const globalFaqs: FAQItem[] = [
  {
    id: 'locations-available',
    category: 'General',
    question: 'Where are the active Urban Deca Homes developments located in Metro Manila?',
    answer: 'Urban Deca Homes currently offers prime residential condominium developments in three key locations: (1) Urban Deca Homes Manila located on Vitas Street, Tondo, Manila City (with an on-site DECA Mall); (2) Urban Deca Homes Ortigas along Ortigas Avenue Extension, Brgy. Rosario, Pasig City (featuring a 1.3-hectare Lagoon Park); and (3) Urban Deca Towers Cubao located directly along EDSA corner Ignacio Diaz St., Cubao, Quezon City (directly connected to MRT-3 and LRT-2 transit hubs).',
  },
  {
    id: 'ready-for-occupancy',
    category: 'General',
    question: 'Are the condominium units Ready for Occupancy (RFO)?',
    answer: 'Yes! All three developments have completed, fully finished towers that are classified as Ready for Occupancy (RFO). Once your loan approval documents (Notice of Approval from Pag-IBIG or Bank Letter of Guarantee) are processed and cleared, you can complete the unit inspection walk-through and receive your keys to move in.',
  },
  {
    id: 'pagibig-eligibility',
    category: 'Financing',
    question: 'How do I qualify for Pag-IBIG housing loan financing?',
    answer: 'To qualify for Pag-IBIG Fund housing financing: (1) You must be an active Pag-IBIG member with at least 24 monthly savings contributions (lump-sum contribution payment is allowed); (2) You must not be more than 65 years old at the date of loan application and not more than 70 years old upon loan maturity; (3) You must have legal capacity to acquire real property; (4) You must pass satisfactory background, employment, and credit checks; and (5) You must have no outstanding Pag-IBIG housing loan that is in default.',
  },
  {
    id: 'monthly-amortization-calc',
    category: 'Financing',
    question: 'How much is the average monthly amortization for a 2-bedroom unit?',
    answer: 'At Urban Deca Homes Manila, a standard 2-bedroom unit (30.60 sqm) starts at approximately ₱12,500 to ₱15,000 per month under a 30-year Pag-IBIG housing loan term. At Urban Deca Homes Ortigas, 2-bedroom units start at around ₱15,800 to ₱19,000 per month depending on whether you choose an inner unit (30.60 sqm) or a corner unit (35.57 sqm). At Urban Deca Towers Cubao, compact studio units start from approximately ₱12,800 per month.',
  },
  {
    id: 'reservation-fee',
    category: 'Financing',
    question: 'How much is the unit reservation fee, and is it refundable?',
    answer: 'The initial reservation fee starts at only ₱10,000 for standard residential units (₱10,000 to ₱20,000 for Cubao towers). The reservation fee holds your specific unit and locks in the total contract price. Please note that the reservation fee is strictly non-refundable and non-transferable, but it is fully credited as part of your total purchase downpayment.',
  },
  {
    id: 'ofw-buyers',
    category: 'Requirements',
    question: 'Can Overseas Filipino Workers (OFWs) buy a unit even while working abroad?',
    answer: 'Yes, thousands of OFWs have successfully purchased units at Urban Deca Homes! An OFW buyer simply assigns an authorized representative (Attorney-in-Fact) in the Philippines using a consularized or apostilled Special Power of Attorney (SPA). Your designated representative can assist with site inspections, document submissions, and reservation agreements on your behalf.',
  },
  {
    id: 'required-income',
    category: 'Requirements',
    question: 'What is the minimum gross monthly income required to get approved?',
    answer: 'For a Pag-IBIG loan on an entry-level unit requiring an estimated ₱12,500 monthly payment, Pag-IBIG guidelines stipulate that the monthly amortization should not exceed 35% of your gross monthly income. This means a gross monthly household income of approximately ₱36,000 to ₱40,000 is required. If your individual income falls below this, Pag-IBIG allows you to combine income with up to two co-borrowers (such as a spouse, parent, sibling, or child).',
  },
  {
    id: 'unit-finishes',
    category: 'Turnover & Living',
    question: 'What are the turnover unit deliverables and finishes?',
    answer: 'Units at Urban Deca Homes are delivered fully finished (turnkey), including: painted interior walls and ceilings, durable ceramic tile flooring, kitchen base cabinet with granite/tile countertop and stainless steel sink, complete toilet and bath with ceramic tiles, toilet bowl, shower set, and lavatory, provision for a window-type air conditioner, individual electric and water meters, and safety smoke detectors and fire sprinklers.',
  },
  {
    id: 'condo-dues',
    category: 'Turnover & Living',
    question: 'How much are the monthly condominium association dues?',
    answer: 'Condominium association dues at Urban Deca Homes are among the most reasonable in Metro Manila because of the medium-rise building format. Association dues typically range from approximately ₱45 to ₱65 per square meter per month, which funds 24/7 security personnel, common area electricity and lighting, elevator maintenance, trash collection, and upkeep of amenities like the swimming pool and parks.',
  },
  {
    id: 'pet-policy',
    category: 'Turnover & Living',
    question: 'Are pets allowed in Urban Deca Homes communities?',
    answer: 'Yes, small domesticated pets (dogs and cats) are permitted in accordance with the community’s House Rules and Property Management Association guidelines (typically limited to 1–2 small pets per unit with proper rabies vaccination records).',
  },
];
