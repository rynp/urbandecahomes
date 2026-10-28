'use client';

import React, { useState, useMemo } from 'react';
import {
  Download,
  Check,
  Building2,
  Layers,
  ArrowRight,
  Maximize2,
  Sparkles,
  Compass,
  ChevronDown,
} from 'lucide-react';
import type { Project } from '@/data/projects';
import { getProjectBySlug } from '@/data/projects';

interface UnitPlanData {
  id: string;
  badge: string;
  name: string;
  sqm: string;
  bedrooms: number;
  bathrooms: number;
  desc: string;
  tcp: string;
  monthly: string;
  specs: { label: string; value: string }[];
}

const unitData: Record<string, UnitPlanData> = {
  '2br-inner': {
    id: '2br-inner',
    badge: '2-BEDROOM INNER CONFIGURATION',
    name: '2-Bedroom Inner Turnkey Unit',
    sqm: '30.60',
    bedrooms: 2,
    bathrooms: 1,
    desc: 'Practical 30.60 sqm 2-bedroom home providing independent bedrooms, quiet mid-corridor location, excellent heat insulation, and private balcony access.',
    tcp: '₱2,900,000',
    monthly: '₱15,800',
    specs: [
      { label: 'Floor Finish', value: '400mm × 400mm Ceramic Tiles' },
      { label: 'Wall Deliverable', value: 'Painted Smooth Masonry Walls' },
      { label: 'Toilet & Bath', value: 'Complete Tiled w/ Water Heater Slot' },
      { label: 'Safety Features', value: 'Smoke Detector & Auto Sprinkler' },
      { label: 'Ceiling Height', value: '2.65m Clear Finished Height' },
      { label: 'Balcony', value: 'Included w/ Steel Protective Railings' },
    ],
  },
  '2br-corner': {
    id: '2br-corner',
    badge: '2-BEDROOM CORNER / DELUXE',
    name: '2-Bedroom Corner Unit (Type A/C)',
    sqm: '35.57',
    bedrooms: 2,
    bathrooms: 1,
    desc: 'Corner 35.57 sqm cut designed for young families requiring extra room for children or a dedicated remote-work station, with dual-aspect exterior windows.',
    tcp: '₱3,400,000',
    monthly: '₱18,500',
    specs: [
      { label: 'Floor Finish', value: '400mm × 400mm Ceramic Tiles' },
      { label: 'Window Exposure', value: 'Dual-Aspect Corner Windows' },
      { label: 'Toilet & Bath', value: 'Complete Tiled w/ Water Heater Slot' },
      { label: 'Safety Features', value: 'Smoke Detector & Auto Sprinkler' },
      { label: 'Ceiling Height', value: '2.65m Clear Finished Height' },
      { label: 'Balcony', value: 'Extended Corner Balcony' },
    ],
  },
  '3br': {
    id: '3br',
    badge: '3-BEDROOM EXECUTIVE',
    name: '3-Bedroom Executive Suite',
    sqm: '42.00',
    bedrooms: 3,
    bathrooms: 2,
    desc: 'Spacious 42.00 sqm format featuring a dedicated master suite, two guest/kids bedrooms, two complete bathrooms, and expansive central living hall.',
    tcp: '₱4,100,000',
    monthly: '₱23,500',
    specs: [
      { label: 'Floor Finish', value: '400mm × 400mm Ceramic Tiles' },
      { label: 'Wall Deliverable', value: 'Painted Smooth Masonry Walls' },
      { label: 'Bathrooms', value: '2 Full Finished Bathrooms' },
      { label: 'Safety Features', value: 'Smoke Detector & Auto Sprinkler' },
      { label: 'Ceiling Height', value: '2.65m Clear Finished Height' },
      { label: 'Balcony', value: 'Dual Access Private Balcony' },
    ],
  },
};

interface OrtigasUnitFloorplanSelectorProps {
  project?: Project;
}

export default function OrtigasUnitFloorplanSelector({ project: propProject }: OrtigasUnitFloorplanSelectorProps = {}) {
  const project = propProject || getProjectBySlug('ortigas')!;

  const distinctBedTypes = useMemo(() => {
    if (!project?.unitTypes || project.unitTypes.length === 0) {
      return ['2-Bedroom', '3-Bedroom'];
    }
    const types = project.unitTypes
      .map((u) => u.category || (u.bedrooms ? `${u.bedrooms}-Bedroom` : ''))
      .filter(Boolean);
    const unique = Array.from(new Set(types));
    return unique.length > 0 ? unique : ['2-Bedroom', '3-Bedroom'];
  }, [project]);

  const [selectedBedType, setSelectedBedType] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedZoneType, setSelectedZoneType] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'2br-inner' | '2br-corner' | '3br'>('2br-inner');
  const [downloadNotice, setDownloadNotice] = useState(false);

  const activeUnit = unitData[activeTab] || unitData['2br-inner'];

  const handleBedTypeChange = (newBedType: string) => {
    setSelectedBedType(newBedType);
    if (newBedType.includes('3')) {
      setActiveTab('3br');
    } else if (newBedType.includes('2')) {
      setActiveTab(selectedZoneType === 'Outer' ? '2br-corner' : '2br-inner');
    }
  };

  const handleZoneTypeChange = (newType: string) => {
    setSelectedZoneType(newType);
    if (newType === 'Outer') {
      if (!selectedBedType || selectedBedType.includes('2')) {
        setActiveTab('2br-corner');
      }
    } else if (newType === 'Inner') {
      if (!selectedBedType || selectedBedType.includes('2')) {
        setActiveTab('2br-inner');
      }
    }
  };

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="units">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8DEC4]">
        <div className="max-w-xl">
          <span className="text-[#CE2029] tracking-widest uppercase font-bold text-xs">
            Architectural Blueprint &amp; Specs
          </span>
          <h2 className="font-logo text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#3E1C15] mt-1 tracking-tight leading-tight">
            Available Units
          </h2>
          <p className="text-[#5C3D36] text-sm mt-1.5 leading-normal font-medium">
            All unit viewings require prior coordination with an authorized representative; please ensure punctuality for the confirmed schedule.
          </p>
        </div>

        {/* Filter Controls Bar: Bed Type Selection Box + Zone Dropdown + Zone Type Dropdown */}
        <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
          {/* Bed Type Selection Box */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#FAF3DE]/90 rounded-lg border border-[#EADBBD] shadow-xs">
            <label
              htmlFor="bed-type-filter"
              className="text-[10px] font-mono uppercase font-bold text-[#7A5B52] pl-2 pr-0.5 whitespace-nowrap cursor-pointer"
            >
              Bed Type:
            </label>
            <div className="relative">
              <select
                id="bed-type-filter"
                value={selectedBedType}
                onChange={(e) => handleBedTypeChange(e.target.value)}
                className="appearance-none bg-white text-[#3E1C15] font-semibold text-xs py-1.5 pl-3 pr-7 rounded-md border border-[#DFBD58]/70 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#CE2029] cursor-pointer hover:border-[#DFBD58] transition-colors"
              >
                <option value="" className="text-[#7A5B52] font-medium py-1">
                  Select Type
                </option>
                {distinctBedTypes.map((type) => (
                  <option key={type} value={type} className="text-[#3E1C15] font-medium py-1">
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A5B52] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>
          </div>

          {/* Zone Filter Dropdown */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#FAF3DE]/90 rounded-lg border border-[#EADBBD] shadow-xs">
            <label
              htmlFor="zone-filter"
              className="text-[10px] font-mono uppercase font-bold text-[#7A5B52] pl-2 pr-0.5 whitespace-nowrap cursor-pointer"
            >
              Zone:
            </label>
            <div className="relative">
              <select
                id="zone-filter"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="appearance-none bg-white text-[#3E1C15] font-semibold text-xs py-1.5 pl-3 pr-7 rounded-md border border-[#DFBD58]/70 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#CE2029] cursor-pointer hover:border-[#DFBD58] transition-colors"
              >
                <option value="" className="text-[#7A5B52] font-medium py-1">
                  Select
                </option>
                {['Low Zone', 'Mid Zone', 'High Zone'].map((zone) => (
                  <option key={zone} value={zone} className="text-[#3E1C15] font-medium py-1">
                    {zone}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A5B52] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>
          </div>

          {/* Zone Type Filter Dropdown */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#FAF3DE]/90 rounded-lg border border-[#EADBBD] shadow-xs">
            <label
              htmlFor="type-filter"
              className="text-[10px] font-mono uppercase font-bold text-[#7A5B52] pl-2 pr-0.5 whitespace-nowrap cursor-pointer"
            >
              Type:
            </label>
            <div className="relative">
              <select
                id="type-filter"
                value={selectedZoneType}
                onChange={(e) => handleZoneTypeChange(e.target.value)}
                className="appearance-none bg-white text-[#3E1C15] font-semibold text-xs py-1.5 pl-3 pr-7 rounded-md border border-[#DFBD58]/70 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#CE2029] cursor-pointer hover:border-[#DFBD58] transition-colors"
              >
                <option value="" className="text-[#7A5B52] font-medium py-1">
                  Select
                </option>
                {['Inner', 'Outer'].map((type) => (
                  <option key={type} value={type} className="text-[#3E1C15] font-medium py-1">
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A5B52] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Unit Presentation Container */}
      <div className="bg-white rounded-3xl border border-[#EADBBD] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left (7 cols): Interactive SVG Floor Plan Display Panel */}
        <div className="lg:col-span-7 bg-[#FCFAF2] p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EADBBD] relative grid-lines">
          <div className="flex items-center justify-between z-10 mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2.5 py-1 bg-white border border-[#E0D5B8] rounded text-[11px] font-mono font-medium text-[#544D40] shadow-sm">
                SCALE: 1:50 METRIC
              </span>
              <span className="inline-block px-2.5 py-1 bg-[#FAF0C8] border border-[#DFBD58] rounded text-[11px] font-mono font-medium text-[#543E08]">
                {activeTab === '2br-corner' ? 'DUAL-ASPECT CORNER WINDOWS' : 'EAST/WEST VENTILATION'}
              </span>
            </div>
            <span className="text-xs text-[#8A8274] font-mono">SPEC-ID: UDH-ORT-V2</span>
          </div>

          {/* Dynamic Floor Plan Graphic Container */}
          <div className="py-6 flex items-center justify-center min-h-[320px]">
            {/* 2-BEDROOM INNER PLAN SVG */}
            {activeTab === '2br-inner' && (
              <div className="w-full max-w-md transition-all duration-300 animate-fadeIn">
                <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 420 320">
                  {/* Outer boundary */}
                  <rect x="20" y="20" width="380" height="280" rx="8" fill="#ffffff" stroke="#1f2937" strokeWidth="3" />
                  <rect x="25" y="25" width="370" height="270" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Bedroom 1 (Master) */}
                  <rect x="210" y="25" width="185" height="135" fill="#FAFAFA" stroke="#1f2937" strokeWidth="2" />
                  <text x="225" y="50" className="text-[11px] font-bold fill-gray-800">MASTER BEDROOM</text>
                  <text x="225" y="65" className="text-[9px] font-mono fill-gray-400">11.40 sqm</text>
                  <rect x="240" y="75" width="100" height="75" rx="3" fill="#EEF2F6" stroke="#94A3B8" strokeWidth="1.2" />
                  <rect x="250" y="80" width="35" height="18" rx="2" fill="#CBD5E1" />
                  <rect x="295" y="80" width="35" height="18" rx="2" fill="#CBD5E1" />

                  {/* Bedroom 2 */}
                  <rect x="210" y="160" width="185" height="135" fill="#FAFAFA" stroke="#1f2937" strokeWidth="2" />
                  <text x="225" y="185" className="text-[11px] font-bold fill-gray-800">BEDROOM 2</text>
                  <text x="225" y="200" className="text-[9px] font-mono fill-gray-400">8.20 sqm</text>
                  <rect x="255" y="210" width="75" height="75" rx="3" fill="#EEF2F6" stroke="#94A3B8" strokeWidth="1.2" />

                  {/* Bathroom */}
                  <rect x="25" y="25" width="95" height="115" fill="#F8FAFC" stroke="#1f2937" strokeWidth="2" />
                  <text x="45" y="60" className="text-[11px] font-mono fill-gray-600 font-bold">T&amp;B</text>
                  <circle cx="70" cy="85" r="12" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />

                  {/* Kitchen Area */}
                  <rect x="25" y="140" width="105" height="55" fill="#FFFBEB" stroke="#1f2937" strokeWidth="1.5" />
                  <text x="35" y="172" className="text-[10px] font-mono fill-ochre-800 font-bold">KITCHEN</text>
                  <circle cx="95" cy="168" r="6" fill="none" stroke="#DC2626" strokeWidth="1.2" />

                  {/* Living & Dining Area */}
                  <text x="135" y="55" className="text-[11px] font-bold fill-gray-800">LIVING &amp; DINING</text>
                  <rect x="130" y="70" width="70" height="50" rx="3" fill="#F1F5F9" stroke="#94A3B8" />

                  {/* Balcony / Window */}
                  <line x1="398" y1="40" x2="398" y2="260" stroke="#0ea5e9" strokeWidth="6" />
                  <text x="290" y="285" className="text-[9px] font-sans fill-sky-600 font-semibold tracking-wider">▲ BREEZE BALCONY</text>

                  {/* Main Entry Swing */}
                  <path d="M 25 260 Q 70 260 70 215" fill="none" stroke="#94A3B8" strokeDasharray="3 3" />
                  <line x1="25" y1="260" x2="25" y2="215" stroke="#1e293b" strokeWidth="3" />
                  <text x="35" y="280" className="text-[9px] font-mono fill-gray-500">MAIN ENTRY</text>
                </svg>
              </div>
            )}

            {/* 2-BEDROOM CORNER PLAN SVG */}
            {activeTab === '2br-corner' && (
              <div className="w-full max-w-md transition-all duration-300 animate-fadeIn">
                <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 420 320">
                  <rect x="20" y="20" width="380" height="280" rx="8" fill="#ffffff" stroke="#1f2937" strokeWidth="3" />

                  {/* Corner Windows on North and East */}
                  <line x1="20" y1="20" x2="400" y2="20" stroke="#0ea5e9" strokeWidth="4" />
                  <line x1="398" y1="20" x2="398" y2="280" stroke="#0ea5e9" strokeWidth="6" />

                  {/* Master Bedroom Corner */}
                  <rect x="210" y="25" width="185" height="145" fill="#FAFAFA" stroke="#1f2937" strokeWidth="2" />
                  <text x="225" y="50" className="text-[11px] font-bold fill-gray-800">CORNER MASTER SUITE</text>
                  <text x="225" y="65" className="text-[9px] font-mono fill-sky-600">Dual Window Exposure</text>
                  <rect x="245" y="80" width="105" height="80" rx="3" fill="#EEF2F6" stroke="#94A3B8" strokeWidth="1.2" />

                  {/* Bedroom 2 */}
                  <rect x="210" y="170" width="185" height="125" fill="#FAFAFA" stroke="#1f2937" strokeWidth="2" />
                  <text x="225" y="195" className="text-[11px] font-bold fill-gray-800">BEDROOM 2 / OFFICE</text>
                  <rect x="255" y="210" width="85" height="70" rx="3" fill="#EEF2F6" stroke="#94A3B8" strokeWidth="1.2" />

                  {/* Living and Dining */}
                  <text x="50" y="55" className="text-[12px] font-bold fill-gray-800">CORNER LIVING ROOM</text>
                  <rect x="40" y="70" width="110" height="55" rx="3" fill="#F1F5F9" stroke="#94A3B8" />

                  {/* Kitchen */}
                  <rect x="25" y="145" width="115" height="60" fill="#FFFBEB" stroke="#1f2937" strokeWidth="1.5" />
                  <text x="40" y="180" className="text-[10px] font-mono fill-ochre-800 font-bold">GRANITE KITCHEN</text>

                  {/* Bathroom */}
                  <rect x="145" y="145" width="60" height="115" fill="#F8FAFC" stroke="#1f2937" strokeWidth="2" />
                  <text x="155" y="195" className="text-[10px] font-mono fill-gray-600 font-bold">BATH</text>

                  {/* Balcony tag */}
                  <text x="280" y="285" className="text-[9px] font-sans fill-sky-600 font-semibold tracking-wider">▲ PANORAMIC BALCONY</text>
                </svg>
              </div>
            )}

            {/* 3-BEDROOM PLAN SVG */}
            {activeTab === '3br' && (
              <div className="w-full max-w-md transition-all duration-300 animate-fadeIn">
                <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 420 320">
                  <rect x="20" y="20" width="380" height="280" rx="8" fill="#ffffff" stroke="#1f2937" strokeWidth="3" />

                  {/* Bedroom 1 Master */}
                  <rect x="250" y="25" width="145" height="110" fill="#FAFAFA" stroke="#1f2937" strokeWidth="2" />
                  <text x="260" y="50" className="text-[10px] font-bold fill-gray-800">MASTER SUITE</text>
                  <rect x="270" y="60" width="85" height="65" rx="3" fill="#EEF2F6" stroke="#94A3B8" />

                  {/* Bedroom 2 */}
                  <rect x="250" y="135" width="145" height="80" fill="#FAFAFA" stroke="#1f2937" strokeWidth="1.5" />
                  <text x="260" y="160" className="text-[10px] font-bold fill-gray-800">BEDROOM 2</text>

                  {/* Bedroom 3 */}
                  <rect x="250" y="215" width="145" height="80" fill="#FAFAFA" stroke="#1f2937" strokeWidth="1.5" />
                  <text x="260" y="240" className="text-[10px] font-bold fill-gray-800">BEDROOM 3</text>

                  {/* Living and Dining */}
                  <text x="40" y="50" className="text-[12px] font-bold fill-gray-800">EXECUTIVE LIVING HALL</text>
                  <rect x="35" y="65" width="130" height="60" rx="3" fill="#F1F5F9" stroke="#94A3B8" />

                  {/* 2 Bathrooms */}
                  <rect x="175" y="135" width="70" height="75" fill="#F8FAFC" stroke="#1f2937" strokeWidth="1.5" />
                  <text x="185" y="175" className="text-[9px] font-mono fill-gray-600 font-bold">BATH 1</text>
                  <rect x="175" y="215" width="70" height="80" fill="#F8FAFC" stroke="#1f2937" strokeWidth="1.5" />
                  <text x="185" y="255" className="text-[9px] font-mono fill-gray-600 font-bold">BATH 2</text>

                  {/* Kitchen */}
                  <rect x="25" y="145" width="140" height="65" fill="#FFFBEB" stroke="#1f2937" strokeWidth="1.5" />
                  <text x="40" y="180" className="text-[10px] font-mono fill-ochre-800 font-bold">CHEF'S KITCHEN</text>

                  <line x1="398" y1="30" x2="398" y2="280" stroke="#0ea5e9" strokeWidth="6" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200/80 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-sky-500 rounded-sm" />
              <span>External Window Ventilation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-ochre-500 rounded-sm" />
              <span>Finished Wet Areas</span>
            </div>
            <span className="font-mono text-[11px]">CAD Drawing rev 2024</span>
          </div>
        </div>

        {/* Right (5 cols): Specification Matrix & Interactive Amortization Calculator */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Title & Dynamic Area Badge */}
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-[#FAF0C8] text-[#543E08] border border-[#DFBD58] mb-2">
                  {activeUnit.badge}
                </span>
                <h3 className="font-logo text-2xl font-bold text-[#3E1C15]">
                  {activeUnit.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-[#3E1C15]">
                  {activeUnit.sqm}
                </span>
                <span className="text-xs text-[#7A5B52] block">SQUARE METERS</span>
              </div>
            </div>

            <p className="text-xs text-[#5C3D36] mt-2 leading-relaxed">
              {activeUnit.desc}
            </p>

            {/* Specifications Table */}
            <div className="mt-6 border border-[#EADBBD] rounded-xl overflow-hidden bg-[#FCFAF2] text-xs">
              <div className="divide-y divide-[#EADBBD]">
                {activeUnit.specs.map((item, index) => (
                  <div key={index} className="flex justify-between py-2.5 px-3.5">
                    <span className="text-[#7A5B52]">{item.label}</span>
                    <span className="font-semibold text-[#3E1C15]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financing & Price Amortization Panel */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-b from-[#FAF4E2] to-[#F5ECCE] border border-[#E8DAB2] text-[#3E1C15] space-y-3 shadow-sm">
              <div className="flex justify-between items-center border-b border-[#DFD1A5] pb-2">
                <span className="text-xs font-medium text-[#5C3D36]">Total Contract Price (TCP est.)</span>
                <span className="text-base font-bold text-[#CE2029]">
                  {activeUnit.tcp}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div>
                  <span className="text-[#7A5B52] block text-[11px]">Reservation Fee</span>
                  <span className="font-bold text-[#3E1C15]">₱10,000 only</span>
                </div>
                <div>
                  <span className="text-[#7A5B52] block text-[11px]">Downpayment Term</span>
                  <span className="font-bold text-[#3E1C15]">Flexible Equity Spread</span>
                </div>
              </div>

              {/* Estimated Monthly Pill */}
              <div className="bg-[#FEFDF9] p-3 rounded-lg flex items-center justify-between border border-[#E2D2A4] shadow-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#CE2029] font-bold block">
                    Estimated Pag-IBIG Monthly
                  </span>
                  <span className="text-xl font-black text-[#3E1C15]">
                    {activeUnit.monthly}
                    <span className="text-xs font-normal text-[#7A5B52]">/mo</span>
                  </span>
                </div>
                <span className="text-[10px] text-right text-[#7A5B52]">
                  30 Years term<br />6.25% repricing
                </span>
              </div>
            </div>
          </div>

          {/* Download Blueprint & Schedule Button */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#inquire"
              className="flex-1 text-center bg-[#CE2029] hover:bg-[#B51B23] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all hover:shadow-[#CE2029]/25"
            >
              Inquire About This Unit
            </a>
            <button
              type="button"
              onClick={handleDownload}
              className="p-3 border border-[#E0D5B8] hover:border-[#CFA93A] rounded-xl text-[#544D40] hover:bg-[#FAF5E6] transition-colors"
              title="Download Spec Sheet PDF"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>

          {downloadNotice && (
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center animate-fadeIn">
              ✓ Spec sheet blueprint requested! Our team will provide the brochure packet upon inquiry.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
