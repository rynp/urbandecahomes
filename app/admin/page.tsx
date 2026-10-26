'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  KeyRound,
  Save,
  Download,
  Upload,
  Eye,
  EyeOff,
  ExternalLink,
  Plus,
  Trash2,
  MapPin,
  Image as ImageIcon,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  LogOut,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  Check,
  Compass,
  FileCode,
  Video,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  SlidersHorizontal,
  Filter,
  RotateCcw,
} from 'lucide-react';
import type { Project, UnitType, Amenity } from '@/data/projects';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Projects Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string>('ortigas');
  const [activeSection, setActiveSection] = useState<
    'general' | 'images' | 'location' | 'units' | 'amenities' | 'faqs' | 'seo' | 'guide'
  >('general');

  // UI / Status State
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [gitSyncConfigured, setGitSyncConfigured] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGalleryIndex, setUploadingGalleryIndex] = useState<number | null>(null);
  const [collapsedSubsections, setCollapsedSubsections] = useState<Record<string, boolean>>({});

  // Unit Configurations Filter & Sort State
  const [unitSort, setUnitSort] = useState<'default' | 'id-asc' | 'id-desc' | 'price-asc' | 'price-desc'>('default');
  const [filterBuilding, setFilterBuilding] = useState<string>('');
  const [filterBedrooms, setFilterBedrooms] = useState<string>('');
  const [filterZone, setFilterZone] = useState<string>('');
  const [filterZoneType, setFilterZoneType] = useState<string>('');

  // Reset filters when switching active project
  useEffect(() => {
    setFilterBuilding('');
    setFilterBedrooms('');
    setFilterZone('');
    setFilterZoneType('');
    setUnitSort('default');
  }, [activeProjectSlug]);

  function isSubsectionOpen(unitKey: string, sectionKey: 'pricing' | 'layout' | 'photos') {
    return collapsedSubsections[`${unitKey}-${sectionKey}`] !== false;
  }

  function toggleSubsection(unitKey: string, sectionKey: 'pricing' | 'layout' | 'photos') {
    setCollapsedSubsections((prev) => {
      const key = `${unitKey}-${sectionKey}`;
      const current = prev[key] !== false;
      return { ...prev, [key]: !current };
    });
  }

  function toggleAllSubsections(open: boolean) {
    if (!activeProject) return;
    const nextState: Record<string, boolean> = {};
    activeProject.unitTypes.forEach((u, i) => {
      const key = u.id || `unit-${i}`;
      nextState[`${key}-pricing`] = open;
      nextState[`${key}-layout`] = open;
      nextState[`${key}-photos`] = open;
    });
    setCollapsedSubsections(nextState);
  }

  const fileInputHeroRef = useRef<HTMLInputElement>(null);
  const fileInputGalleryRef = useRef<HTMLInputElement>(null);
  const fileInputImportRef = useRef<HTMLInputElement>(null);

  // Check auth and load projects on mount
  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch('/api/admin/auth');
        const authData = await authRes.json();
        setIsAuthenticated(authData.authenticated);

        if (authData.authenticated) {
          await loadProjects();
        }
      } catch (err) {
        console.error('Init error:', err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  async function loadProjects() {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.success && data.projects) {
        setProjects(data.projects);
        setGitSyncConfigured(Boolean(data.gitSyncConfigured));
        if (data.projects.length > 0 && !activeProjectSlug) {
          setActiveProjectSlug(data.projects[0].slug);
        }
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  }

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError('Please enter the admin passcode.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        await loadProjects();
      } else {
        setAuthError(data.message || 'Incorrect passcode. Try deca2026 or check your environment.');
      }
    } catch (err: any) {
      setAuthError('Unable to connect to authentication service.');
    } finally {
      setAuthLoading(false);
    }
  }

  // Handle Logout
  async function handleLogout() {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } finally {
      setIsAuthenticated(false);
      setPasscode('');
    }
  }

  // Active Project Reference & Mutator
  const activeProject = projects.find((p) => p.slug === activeProjectSlug) || projects[0];

  function updateActiveProject(updater: (prev: Project) => Project) {
    setProjects((prev) =>
      prev.map((p) => (p.slug === activeProjectSlug ? updater({ ...p }) : p))
    );
  }

  // Unit Management Helpers
  const updateUnit = (unitKey: string, updater: (prevUnit: UnitType) => UnitType) => {
    updateActiveProject((p) => ({
      ...p,
      unitTypes: p.unitTypes.map((u, i) => {
        const key = u.id || `unit-${i}`;
        return key === unitKey ? updater(u) : u;
      }),
    }));
  };

  const deleteUnit = (unitKey: string) => {
    updateActiveProject((p) => ({
      ...p,
      unitTypes: p.unitTypes.filter((u, i) => (u.id || `unit-${i}`) !== unitKey),
    }));
  };

  const handleAddNewUnit = () => {
    if (!activeProject) return;
    const newId = `${activeProject.slug}-unit-${Date.now()}`;
    const basePrice = 2900000;
    const resFee = activeProject.reservationFeePhp || 10000;
    const discount = 0;

    const newUnit: UnitType = {
      id: newId,
      name: 'New Unit Cut',
      buildingName: '',
      zone: '',
      zoneLabel: '',
      zoneType: '',
      unitLayout: '',
      floorPlan: '',
      video: '',
      gallery1: '',
      gallery2: '',
      gallery3: '',
      gallery4: '',
      gallery5: '',
      category: '2-Bedroom',
      areaSqm: 30.6,
      bedrooms: 2,
      bathrooms: 1,
      balcony: true,
      pricePhp: basePrice,
      priceMinPhp: basePrice,
      reservationFeePhp: resFee,
      discountPhp: discount,
      loanableBalancePhp: Math.max(0, basePrice - resFee - discount),
      pagibigInterestRate: 4.5,
      status: 'Available',
      features: ['2 Bedrooms', 'Tiled Bathroom', 'Balcony'],
      description: 'Modern residential format designed for comfort.',
    };

    // Prepend to top of unitTypes array
    updateActiveProject((p) => ({
      ...p,
      unitTypes: [newUnit, ...p.unitTypes],
    }));

    // Reset filters and sort to default so the newly added unit is at the very top of the list!
    setFilterBuilding('');
    setFilterBedrooms('');
    setFilterZone('');
    setFilterZoneType('');
    setUnitSort('default');

    // Ensure all subsections are open for this new unit
    setCollapsedSubsections((prev) => ({
      ...prev,
      [`${newId}-pricing`]: true,
      [`${newId}-layout`]: true,
      [`${newId}-photos`]: true,
    }));
  };

  const resetFiltersAndSort = () => {
    setFilterBuilding('');
    setFilterBedrooms('');
    setFilterZone('');
    setFilterZoneType('');
    setUnitSort('default');
  };

  // Derive unique options for filters
  const uniqueBuildings = useMemo(() => {
    if (!activeProject?.unitTypes) return [];
    const set = new Set<string>();
    activeProject.unitTypes.forEach((u) => {
      const b = (u.buildingName || '').trim();
      if (b) set.add(b);
    });
    return Array.from(set).sort();
  }, [activeProject?.unitTypes]);

  const uniqueBedrooms = useMemo(() => {
    if (!activeProject?.unitTypes) return [];
    const set = new Set<number>();
    activeProject.unitTypes.forEach((u) => {
      if (typeof u.bedrooms === 'number' && !isNaN(u.bedrooms)) set.add(u.bedrooms);
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [activeProject?.unitTypes]);

  const uniqueZones = useMemo(() => {
    if (!activeProject?.unitTypes) return [];
    const set = new Set<string>();
    activeProject.unitTypes.forEach((u) => {
      const z = (u.zone || '').trim();
      if (z) set.add(z);
    });
    return Array.from(set).sort();
  }, [activeProject?.unitTypes]);

  const uniqueZoneTypes = useMemo(() => {
    if (!activeProject?.unitTypes) return [];
    const set = new Set<string>();
    activeProject.unitTypes.forEach((u) => {
      const zt = (u.zoneType || '').trim();
      if (zt) set.add(zt);
    });
    return Array.from(set).sort();
  }, [activeProject?.unitTypes]);

  // Filtered & Sorted Units
  const filteredAndSortedUnits = useMemo(() => {
    if (!activeProject?.unitTypes) return [];
    let list = [...activeProject.unitTypes];

    // Filter by Building Name
    if (filterBuilding) {
      list = list.filter(
        (u) => (u.buildingName || '').trim().toLowerCase() === filterBuilding.trim().toLowerCase()
      );
    }

    // Filter by Bedroom Count
    if (filterBedrooms !== '') {
      const count = parseInt(filterBedrooms, 10);
      list = list.filter((u) => u.bedrooms === count);
    }

    // Filter by Zone
    if (filterZone) {
      list = list.filter(
        (u) => (u.zone || '').trim().toLowerCase() === filterZone.trim().toLowerCase()
      );
    }

    // Filter by Zone Type
    if (filterZoneType) {
      list = list.filter(
        (u) => (u.zoneType || '').trim().toLowerCase() === filterZoneType.trim().toLowerCase()
      );
    }

    // Sorting
    if (unitSort === 'id-asc') {
      list.sort((a, b) =>
        (a.id || '').localeCompare(b.id || '', undefined, { numeric: true, sensitivity: 'base' })
      );
    } else if (unitSort === 'id-desc') {
      list.sort((a, b) =>
        (b.id || '').localeCompare(a.id || '', undefined, { numeric: true, sensitivity: 'base' })
      );
    } else if (unitSort === 'price-asc') {
      list.sort((a, b) => {
        const pa = Number(a.pricePhp ?? a.priceMinPhp ?? 0);
        const pb = Number(b.pricePhp ?? b.priceMinPhp ?? 0);
        return pa - pb;
      });
    } else if (unitSort === 'price-desc') {
      list.sort((a, b) => {
        const pa = Number(a.pricePhp ?? a.priceMinPhp ?? 0);
        const pb = Number(b.pricePhp ?? b.priceMinPhp ?? 0);
        return pb - pa;
      });
    }

    return list;
  }, [
    activeProject?.unitTypes,
    filterBuilding,
    filterBedrooms,
    filterZone,
    filterZoneType,
    unitSort,
  ]);

  // Save All Changes
  async function handleSave() {
    setIsSaving(true);
    setStatusMessage(null);

    // Calculate Loanable Balance = Price - Reservation Fee - Discount and enforce default values for all units
    const projectsToSave = projects.map((p) => ({
      ...p,
      unitTypes: p.unitTypes.map((unit) => {
        const price = Number(unit.pricePhp ?? unit.priceMinPhp ?? 0);
        const reservationFee = Number(
          unit.reservationFeePhp !== undefined
            ? unit.reservationFeePhp
            : p.reservationFeePhp || 10000
        );
        const discount = Number(unit.discountPhp ?? 0);
        const loanableBalance = Math.max(0, price - reservationFee - discount);
        const pagibigRate =
          unit.pagibigInterestRate !== undefined && !isNaN(Number(unit.pagibigInterestRate))
            ? Number(unit.pagibigInterestRate)
            : 4.5;

        const { priceMaxPhp, estMonthlyPagIbigPhp, ...restUnit } = unit;

        return {
          ...restUnit,
          name: unit.name || 'Unit',
          pricePhp: price,
          priceMinPhp: price,
          reservationFeePhp: reservationFee,
          discountPhp: discount,
          loanableBalancePhp: loanableBalance,
          pagibigInterestRate: pagibigRate,
          buildingName: unit.buildingName || '',
          zone: unit.zone || '',
          zoneLabel: unit.zoneLabel || '',
          zoneType: unit.zoneType || '',
          unitLayout: unit.unitLayout || '',
          floorPlan: unit.floorPlan || '',
          video: unit.video || '',
          gallery1: unit.gallery1 || '',
          gallery2: unit.gallery2 || '',
          gallery3: unit.gallery3 || '',
          gallery4: unit.gallery4 || '',
          gallery5: unit.gallery5 || '',
        };
      }),
    }));

    setProjects(projectsToSave);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: projectsToSave }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: data.message || 'Changes saved successfully!',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Failed to save changes.',
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'Network error while saving changes.',
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMessage(null), 6000);
    }
  }

  // Export JSON Backup
  function handleExportJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `decahomes-projects-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // Import JSON Backup
  function handleImportJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          setStatusMessage({
            type: 'success',
            text: `Imported ${parsed.length} projects successfully! Click "Save All Changes" to persist.`,
          });
        } else {
          setStatusMessage({ type: 'error', text: 'Invalid JSON format: array expected.' });
        }
      } catch (err) {
        setStatusMessage({ type: 'error', text: 'Failed to parse JSON file.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // Image Upload Handler
  async function handleImageUpload(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data.url;
      } else {
        alert(data.message || 'Upload failed');
        return null;
      }
    } catch (err) {
      alert('Error uploading file');
      return null;
    }
  }

  // Upload Hero Image
  async function onHeroFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    const url = await handleImageUpload(file);
    if (url) {
      updateActiveProject((prev) => ({ ...prev, heroImage: url }));
    }
    setUploadingHero(false);
    e.target.value = '';
  }

  // Upload Gallery Image
  async function onGalleryFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || uploadingGalleryIndex === null) return;

    const targetIdx = uploadingGalleryIndex;
    const url = await handleImageUpload(file);
    if (url) {
      updateActiveProject((prev) => {
        const newGallery = [...prev.galleryImages];
        if (newGallery[targetIdx]) {
          newGallery[targetIdx] = { ...newGallery[targetIdx], url };
        }
        return { ...prev, galleryImages: newGallery };
      });
    }
    setUploadingGalleryIndex(null);
    e.target.value = '';
  }

  // -------------------------------------------------------------
  // RENDER: Loading Screen
  // -------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#14171A] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-ochre-400 animate-spin" />
          <p className="text-sm font-mono text-gray-400">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: Passcode Login Modal / Lock Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#14171A] text-white flex items-center justify-center p-4">
        {/* Architectural Ambient Glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-ochre-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-[#1A1D20] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-ochre-500/15 border border-ochre-500/30 text-ochre-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ochre-300 font-bold">
              Secure Administration
            </span>
            <h1 className="font-editorial text-3xl font-medium text-white mt-1">
              Urban Deca Homes
            </h1>
            <p className="text-gray-400 text-xs mt-2">
              Enter your passcode to manage property details, photos, and location coordinates.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-ochre-500 focus:ring-1 focus:ring-ochre-500 pr-11 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-ochre-500 hover:bg-ochre-600 disabled:opacity-50 text-charcoal-900 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-ochre-500/20 transform hover:-translate-y-0.5"
            >
              {authLoading ? 'Verifying...' : 'Unlock Admin Portal'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-gray-400">
              Default passcode: <code className="text-ochre-300 font-mono">deca2026</code>
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Customizable via <code className="text-gray-300 font-mono">ADMIN_PASSCODE</code> in Netlify env.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: Main Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#14171A] text-white">
      {/* Hidden file inputs for uploads */}
      <input
        type="file"
        ref={fileInputHeroRef}
        onChange={onHeroFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputGalleryRef}
        onChange={onGalleryFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputImportRef}
        onChange={handleImportJson}
        accept=".json"
        className="hidden"
      />

      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1A1D20]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ochre-500/20 border border-ochre-500/40 text-ochre-300 flex items-center justify-center font-bold text-sm">
              UD
            </div>
            <div>
              <span className="text-xs font-bold text-white block">UDH Portfolio Manager</span>
              <span className="text-[10px] text-gray-400 font-mono">Database-Free Flat File CMS</span>
            </div>
            {gitSyncConfigured && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                ● GitHub Git-Sync Active
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ochre-500 hover:bg-ochre-600 disabled:opacity-50 text-charcoal-900 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-ochre-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              title="Download backup projects.json"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-ochre-300" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputImportRef.current?.click()}
              title="Import projects.json backup"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-ochre-300" />
              <span>Import</span>
            </button>

            {activeProject && (
              <Link
                href={`/${activeProject.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-all"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-200 text-xs font-medium border border-red-500/30 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Status Notification Toast */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-sm animate-fadeIn ${
            statusMessage.type === 'success'
              ? 'bg-emerald-900/90 border-emerald-500/50 text-emerald-100'
              : 'bg-red-900/90 border-red-500/50 text-red-100'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Project Selector Bar */}
        <div className="bg-[#1A1D20] p-3 rounded-2xl border border-white/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {projects.map((proj) => (
              <button
                key={proj.slug}
                type="button"
                onClick={() => setActiveProjectSlug(proj.slug)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeProjectSlug === proj.slug
                    ? 'bg-ochre-500 text-charcoal-900 shadow-md font-bold'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{proj.name}</span>
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>Slug:</span>
            <code className="text-ochre-300 font-mono bg-black/40 px-2 py-0.5 rounded">
              /{activeProject?.slug}
            </code>
          </div>
        </div>

        {activeProject ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar: Section Sub-Navigation (3 cols) */}
            <aside className="lg:col-span-3">
              <div className="bg-[#1A1D20] rounded-2xl border border-white/10 p-3 sticky top-24 space-y-1">
                {[
                  { id: 'general', label: '1. General & Pricing', icon: Building2 },
                  { id: 'images', label: '2. Images & Gallery', icon: ImageIcon },
                  { id: 'location', label: '3. Map & Location', icon: MapPin },
                  { id: 'units', label: '4. Unit Configuration', icon: Layers },
                  { id: 'amenities', label: '5. Amenities', icon: Sparkles },
                  { id: 'faqs', label: '6. Overview & FAQs', icon: HelpCircle },
                  { id: 'seo', label: '7. SEO & Meta Tags', icon: FileCode },
                  { id: 'guide', label: '8. Netlify Deployment Guide', icon: Compass },
                ].map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSection(sec.id as any)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                        activeSection === sec.id
                          ? 'bg-ochre-500/20 text-ochre-200 border border-ochre-500/40 font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Panel: Content Section Form (9 cols) */}
            <main className="lg:col-span-9 bg-[#1A1D20] rounded-3xl border border-white/10 p-6 sm:p-8">
              {/* SECTION 1: GENERAL & PRICING */}
              {activeSection === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-editorial text-2xl font-semibold text-white">General Information &amp; Pricing</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Update the core branding, property headlines, status, and price numbers for {activeProject.name}.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Project Display Name</label>
                      <input
                        type="text"
                        value={activeProject.name}
                        onChange={(e) => updateActiveProject((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Badge Pill Text</label>
                      <input
                        type="text"
                        value={activeProject.badge}
                        onChange={(e) => updateActiveProject((p) => ({ ...p, badge: e.target.value }))}
                        className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Tagline</label>
                    <input
                      type="text"
                      value={activeProject.tagline}
                      onChange={(e) => updateActiveProject((p) => ({ ...p, tagline: e.target.value }))}
                      className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Hero Headline</label>
                    <textarea
                      rows={2}
                      value={activeProject.headline}
                      onChange={(e) => updateActiveProject((p) => ({ ...p, headline: e.target.value }))}
                      className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Property Type</label>
                      <select
                        value={activeProject.propertyType}
                        onChange={(e) => updateActiveProject((p) => ({ ...p, propertyType: e.target.value as any }))}
                        className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                      >
                        <option value="Mid-Rise Condominium">Mid-Rise Condominium</option>
                        <option value="High-Rise Tower">High-Rise Tower</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Construction Status</label>
                      <select
                        value={activeProject.constructionStatus}
                        onChange={(e) => updateActiveProject((p) => ({ ...p, constructionStatus: e.target.value as any }))}
                        className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                      >
                        <option value="Ready for Occupancy (RFO)">Ready for Occupancy (RFO)</option>
                        <option value="Pre-Selling & RFO">Pre-Selling &amp; RFO</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                    <span className="text-xs uppercase tracking-wider text-ochre-300 font-bold block">
                      Pricing &amp; Amortization Ranges
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Formatted Range</label>
                        <input
                          type="text"
                          value={activeProject.priceRangeFormatted}
                          onChange={(e) => updateActiveProject((p) => ({ ...p, priceRangeFormatted: e.target.value }))}
                          placeholder="₱2,900,000 – ₱4,200,000"
                          className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Min Price (PHP)</label>
                        <input
                          type="number"
                          value={activeProject.priceMinPhp}
                          onChange={(e) => updateActiveProject((p) => ({ ...p, priceMinPhp: Number(e.target.value) }))}
                          className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Max Price (PHP)</label>
                        <input
                          type="number"
                          value={activeProject.priceMaxPhp}
                          onChange={(e) => updateActiveProject((p) => ({ ...p, priceMaxPhp: Number(e.target.value) }))}
                          className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Reservation Fee (PHP)</label>
                      <input
                        type="number"
                        value={activeProject.reservationFeePhp}
                        onChange={(e) => updateActiveProject((p) => ({ ...p, reservationFeePhp: Number(e.target.value) }))}
                        className="w-full sm:w-1/3 bg-[#14171A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: IMAGES & GALLERY */}
              {activeSection === 'images' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-editorial text-2xl font-semibold text-white">Hero &amp; Gallery Imagery</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Manage visual assets. You can upload images directly or enter any custom image URL / path.
                    </p>
                  </div>

                  {/* Hero Image Block */}
                  <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-ochre-300 font-bold">
                        Main Hero Image
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputHeroRef.current?.click()}
                        disabled={uploadingHero}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ochre-500/20 hover:bg-ochre-500/30 text-ochre-200 text-xs font-semibold border border-ochre-500/30"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingHero ? 'Uploading...' : 'Upload New Hero'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-5 relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/40">
                        {activeProject.heroImage && (
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${activeProject.heroImage}')` }}
                          />
                        )}
                      </div>
                      <div className="md:col-span-7 space-y-2">
                        <label className="block text-[11px] text-gray-400">Hero Image URL or Local Path</label>
                        <input
                          type="text"
                          value={activeProject.heroImage}
                          onChange={(e) => updateActiveProject((p) => ({ ...p, heroImage: e.target.value }))}
                          className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2 text-xs text-white"
                        />
                        <p className="text-[11px] text-gray-500">
                          Supports local paths like <code className="text-gray-300">/images/ortigas/hero.jpg</code> or external URLs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Images List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-ochre-300 font-bold">
                        Gallery Photos ({activeProject.galleryImages.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateActiveProject((p) => ({
                            ...p,
                            galleryImages: [
                              ...p.galleryImages,
                              {
                                url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                                alt: 'New property image',
                                caption: 'Property feature photo description',
                              },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Gallery Image</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {activeProject.galleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                        >
                          <div className="md:col-span-3 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-black/40">
                            {img.url && (
                              <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${img.url}')` }}
                              />
                            )}
                          </div>

                          <div className="md:col-span-8 space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={img.url}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateActiveProject((p) => {
                                    const next = [...p.galleryImages];
                                    next[idx] = { ...next[idx], url: val };
                                    return { ...p, galleryImages: next };
                                  });
                                }}
                                placeholder="Image URL / path..."
                                className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setUploadingGalleryIndex(idx);
                                  fileInputGalleryRef.current?.click();
                                }}
                                className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs rounded-xl shrink-0 border border-white/10"
                              >
                                Upload
                              </button>
                            </div>

                            <input
                              type="text"
                              value={img.alt}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateActiveProject((p) => {
                                  const next = [...p.galleryImages];
                                  next[idx] = { ...next[idx], alt: val };
                                  return { ...p, galleryImages: next };
                                });
                              }}
                              placeholder="Alt text (for accessibility and SEO)..."
                              className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                            />

                            <input
                              type="text"
                              value={img.caption}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateActiveProject((p) => {
                                  const next = [...p.galleryImages];
                                  next[idx] = { ...next[idx], caption: val };
                                  return { ...p, galleryImages: next };
                                });
                              }}
                              placeholder="Caption displayed below photo..."
                              className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-gray-300"
                            />
                          </div>

                          <div className="md:col-span-1 flex md:justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                updateActiveProject((p) => ({
                                  ...p,
                                  galleryImages: p.galleryImages.filter((_, i) => i !== idx),
                                }));
                              }}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-xl"
                              title="Delete photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: MAP & LOCATION */}
              {activeSection === 'location' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-editorial text-2xl font-semibold text-white">Location, Map &amp; Landmarks</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Edit GPS coordinates, physical address, and commute landmark distances.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Full Street Address</label>
                      <input
                        type="text"
                        value={activeProject.location.address}
                        onChange={(e) =>
                          updateActiveProject((p) => ({
                            ...p,
                            location: { ...p.location, address: e.target.value },
                          }))
                        }
                        className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Barangay</label>
                      <input
                        type="text"
                        value={activeProject.location.barangay}
                        onChange={(e) =>
                          updateActiveProject((p) => ({
                            ...p,
                            location: { ...p.location, barangay: e.target.value },
                          }))
                        }
                        className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">City</label>
                      <input
                        type="text"
                        value={activeProject.location.city}
                        onChange={(e) =>
                          updateActiveProject((p) => ({
                            ...p,
                            location: { ...p.location, city: e.target.value },
                          }))
                        }
                        className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Coordinates Panel */}
                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-ochre-300 font-bold">
                        Map GPS Coordinates
                      </span>
                      <a
                        href={`https://www.google.com/maps?q=${activeProject.location.coordinates.lat},${activeProject.location.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ochre-200 hover:text-white flex items-center gap-1"
                      >
                        <span>Test in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Latitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={activeProject.location.coordinates.lat}
                          onChange={(e) =>
                            updateActiveProject((p) => ({
                              ...p,
                              location: {
                                ...p.location,
                                coordinates: { ...p.location.coordinates, lat: parseFloat(e.target.value) || 0 },
                              },
                            }))
                          }
                          className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Longitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={activeProject.location.coordinates.lng}
                          onChange={(e) =>
                            updateActiveProject((p) => ({
                              ...p,
                              location: {
                                ...p.location,
                                coordinates: { ...p.location.coordinates, lng: parseFloat(e.target.value) || 0 },
                              },
                            }))
                          }
                          className="w-full bg-[#14171A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nearby Landmarks Manager */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-ochre-300 font-bold">
                        Nearby Landmarks &amp; Commute Times ({activeProject.location.landmarks.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateActiveProject((p) => ({
                            ...p,
                            location: {
                              ...p.location,
                              landmarks: [
                                ...p.location.landmarks,
                                { name: 'New Landmark Hub', distance: '10 mins', type: 'Mall' },
                              ],
                            },
                          }))
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Landmark</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {activeProject.location.landmarks.map((lm, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white/[0.02] border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                        >
                          <div className="sm:col-span-5">
                            <input
                              type="text"
                              value={lm.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateActiveProject((p) => {
                                  const list = [...p.location.landmarks];
                                  list[idx] = { ...list[idx], name: val };
                                  return { ...p, location: { ...p.location, landmarks: list } };
                                });
                              }}
                              placeholder="Landmark name..."
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <input
                              type="text"
                              value={lm.distance}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateActiveProject((p) => {
                                  const list = [...p.location.landmarks];
                                  list[idx] = { ...list[idx], distance: val };
                                  return { ...p, location: { ...p.location, landmarks: list } };
                                });
                              }}
                              placeholder="e.g. 5 mins (1.2 km)"
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <select
                              value={lm.type}
                              onChange={(e) => {
                                const val = e.target.value as any;
                                updateActiveProject((p) => {
                                  const list = [...p.location.landmarks];
                                  list[idx] = { ...list[idx], type: val };
                                  return { ...p, location: { ...p.location, landmarks: list } };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            >
                              <option value="Transit">Transit</option>
                              <option value="Mall">Mall</option>
                              <option value="CBD">CBD</option>
                              <option value="School">School</option>
                              <option value="Hospital">Hospital</option>
                            </select>
                          </div>

                          <div className="sm:col-span-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                updateActiveProject((p) => ({
                                  ...p,
                                  location: {
                                    ...p.location,
                                    landmarks: p.location.landmarks.filter((_, i) => i !== idx),
                                  },
                                }));
                              }}
                              className="p-1.5 text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: UNIT CONFIGURATION */}
              {activeSection === 'units' && (
                <div className="space-y-6">
                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-editorial text-2xl font-semibold text-white">Unit Configuration</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Configure floor area, bedroom count, pricing, loanable balance, and Pag-IBIG monthly estimates.
                      </p>
                    </div>

                    {/* Action Buttons Group */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleAddNewUnit}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ochre-500 hover:bg-ochre-400 text-charcoal-900 text-xs font-bold shadow-md shadow-ochre-500/20 transition-all whitespace-nowrap"
                        title="Add new unit cut at the top of the list"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>AddNew</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleAllSubsections(false)}
                        className="inline-flex items-center px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors whitespace-nowrap"
                        title="Collapse Pricing, Layout, and Photos for all units"
                      >
                        Collapse All
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleAllSubsections(true)}
                        className="inline-flex items-center px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors whitespace-nowrap"
                        title="Expand Pricing, Layout, and Photos for all units"
                      >
                        Expand All
                      </button>
                    </div>
                  </div>

                  {/* Filters & Sorting Toolbar */}
                  <div className="bg-[#1A1D20] border border-white/10 rounded-2xl p-4 space-y-3.5 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-ochre-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Filter &amp; Sort Units
                        </span>
                        <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                          Showing {filteredAndSortedUnits.length} of {activeProject.unitTypes.length} units
                        </span>
                      </div>

                      {(filterBuilding || filterBedrooms !== '' || filterZone || filterZoneType || unitSort !== 'default') && (
                        <button
                          type="button"
                          onClick={resetFiltersAndSort}
                          className="inline-flex items-center gap-1.5 text-xs text-ochre-400 hover:text-ochre-300 font-semibold transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Filters &amp; Sort</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                      {/* 1. Sorting */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1 flex items-center gap-1">
                          <ArrowUpDown className="w-3 h-3 text-ochre-400" />
                          Sort By
                        </label>
                        <select
                          value={unitSort}
                          onChange={(e) => setUnitSort(e.target.value as any)}
                          className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="default">Default Order</option>
                          <option value="id-asc">ID: Ascending (A → Z)</option>
                          <option value="id-desc">ID: Descending (Z → A)</option>
                          <option value="price-asc">Price: Lowest to Highest</option>
                          <option value="price-desc">Price: Highest to Lowest</option>
                        </select>
                      </div>

                      {/* 2. Filter: Building Name */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-ochre-400" />
                          Building Name
                        </label>
                        <select
                          value={filterBuilding}
                          onChange={(e) => setFilterBuilding(e.target.value)}
                          className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="">All Buildings</option>
                          {uniqueBuildings.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 3. Filter: Bedroom Count */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-ochre-400" />
                          Bedroom Count
                        </label>
                        <select
                          value={filterBedrooms}
                          onChange={(e) => setFilterBedrooms(e.target.value)}
                          className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="">All Bedrooms</option>
                          {uniqueBedrooms.map((beds) => (
                            <option key={beds} value={String(beds)}>
                              {beds === 0 ? 'Studio / 0 BR' : beds === 1 ? '1 Bedroom' : `${beds} Bedrooms`}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 4. Filter: Zone */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-ochre-400" />
                          Zone
                        </label>
                        <select
                          value={filterZone}
                          onChange={(e) => setFilterZone(e.target.value)}
                          className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="">All Zones</option>
                          {uniqueZones.map((z) => (
                            <option key={z} value={z}>
                              {z}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 5. Filter: Zone Type */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1 flex items-center gap-1">
                          <Compass className="w-3 h-3 text-ochre-400" />
                          Zone Type
                        </label>
                        <select
                          value={filterZoneType}
                          onChange={(e) => setFilterZoneType(e.target.value)}
                          className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="">All Zone Types</option>
                          {uniqueZoneTypes.map((zt) => (
                            <option key={zt} value={zt}>
                              {zt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Units List */}
                  {filteredAndSortedUnits.length === 0 ? (
                    <div className="p-10 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-2xl space-y-3">
                      <Filter className="w-8 h-8 text-gray-500 mx-auto" />
                      <p className="text-sm font-medium text-gray-300">No units match the selected filters.</p>
                      <p className="text-xs text-gray-500">Try adjusting or clearing your filters to see more units.</p>
                      <button
                        type="button"
                        onClick={resetFiltersAndSort}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors mt-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-ochre-400" />
                        <span>Reset All Filters</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredAndSortedUnits.map((unit, idx) => {
                        const unitKey = unit.id || `unit-${idx}`;
                        const isPricingOpen = isSubsectionOpen(unitKey, 'pricing');
                        const isLayoutOpen = isSubsectionOpen(unitKey, 'layout');
                        const isPhotosOpen = isSubsectionOpen(unitKey, 'photos');

                        const curPrice = Number(unit.pricePhp ?? unit.priceMinPhp ?? 0);
                        const curResFee = Number(
                          unit.reservationFeePhp !== undefined
                            ? unit.reservationFeePhp
                            : activeProject.reservationFeePhp || 10000
                        );
                        const curDiscount = Number(unit.discountPhp ?? 0);
                        const curLoanable = Math.max(0, curPrice - curResFee - curDiscount);
                        const curRate =
                          unit.pagibigInterestRate !== undefined && !isNaN(Number(unit.pagibigInterestRate))
                            ? Number(unit.pagibigInterestRate)
                            : 4.5;

                        return (
                          <div
                            key={unit.id || idx}
                            className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4 hover:border-white/20 transition-all"
                          >
                            {/* Unit Top Bar with Index Badge, Unit Name input, Unit ID input, Status and Delete */}
                            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-3">
                              <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                                <span className="w-7 h-7 rounded-lg bg-ochre-500/20 text-ochre-300 flex items-center justify-center text-xs font-bold shrink-0">
                                  #{idx + 1}
                                </span>
                                <div className="flex-1">
                                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
                                    Unit Name <span className="text-ochre-400 font-semibold">(Editable)</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={unit.name}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateUnit(unitKey, (u) => ({ ...u, name: val }));
                                    }}
                                    placeholder="e.g. 2-Bedroom Regular (Unit A)"
                                    className="w-full bg-[#14171A] border border-white/20 hover:border-white/40 focus:border-ochre-400 rounded-lg px-2.5 py-1 text-sm font-bold text-white focus:outline-none transition-colors"
                                  />
                                </div>
                                <div className="w-40 sm:w-48">
                                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
                                    Unit ID <span className="text-gray-500 font-mono">(Unique)</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={unit.id || ''}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateUnit(unitKey, (u) => ({ ...u, id: val }));
                                    }}
                                    placeholder="e.g. manila-2br-a"
                                    className="w-full bg-[#14171A] border border-white/20 hover:border-white/40 focus:border-ochre-400 rounded-lg px-2.5 py-1 text-xs font-mono text-ochre-300/90 focus:outline-none transition-colors"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
                                    Availability
                                  </label>
                                  <select
                                    value={unit.status}
                                    onChange={(e) => {
                                      const val = e.target.value as any;
                                      updateUnit(unitKey, (u) => ({ ...u, status: val }));
                                    }}
                                    className="bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white"
                                  >
                                    <option value="Available">Available</option>
                                    <option value="Limited Availability">Limited Availability</option>
                                    <option value="Sold Out">Sold Out</option>
                                  </select>
                                </div>

                                <div className="pt-3.5">
                                  <button
                                    type="button"
                                    onClick={() => deleteUnit(unitKey)}
                                    className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors"
                                    title="Delete Unit Type"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Building, Zoning & Specifications */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 text-xs">
                              {/* Left: Building & Zoning Attributes (6 cols) */}
                              <div className="lg:col-span-6 p-3.5 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                                <div className="text-[10px] uppercase font-bold tracking-wider text-ochre-300 flex items-center gap-1.5">
                                  <Building2 className="w-3.5 h-3.5 text-ochre-400" />
                                  <span>Building &amp; Zone Classification</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {/* Col 1: Zone, and Zone Label below the zone field */}
                                  <div className="space-y-2.5">
                                    <div>
                                      <label className="block text-[11px] text-gray-300 font-medium mb-1">
                                        Zone
                                      </label>
                                      <input
                                        type="text"
                                        value={unit.zone || ''}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          updateUnit(unitKey, (u) => ({ ...u, zone: val }));
                                        }}
                                        placeholder="e.g. Zone 1 / North Wing"
                                        className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white"
                                      />
                                    </div>
                                    {/* Zone Label field - below the "zone" field */}
                                    <div>
                                      <label className="block text-[11px] text-gray-300 font-medium mb-1">
                                        Zone Label
                                      </label>
                                      <input
                                        type="text"
                                        value={unit.zoneLabel || ''}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          updateUnit(unitKey, (u) => ({ ...u, zoneLabel: val }));
                                        }}
                                        placeholder="e.g. Waterfront View / Prime Cut"
                                        className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white"
                                      />
                                    </div>
                                  </div>

                                  {/* Col 2: Building Name and Zone Type */}
                                  <div className="space-y-2.5">
                                    <div>
                                      <label className="block text-[11px] text-gray-300 font-medium mb-1">
                                        Building Name
                                      </label>
                                      <input
                                        type="text"
                                        value={unit.buildingName || ''}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          updateUnit(unitKey, (u) => ({ ...u, buildingName: val }));
                                        }}
                                        placeholder="e.g. Tower 1 / Building A"
                                        className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[11px] text-gray-300 font-medium mb-1">
                                        Zone Type
                                      </label>
                                      <input
                                        type="text"
                                        value={unit.zoneType || ''}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          updateUnit(unitKey, (u) => ({ ...u, zoneType: val }));
                                        }}
                                        placeholder="e.g. Residential / High-Rise"
                                        className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Unit Dimensions & Layout Specs (6 cols) */}
                              <div className="lg:col-span-6 p-3.5 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                                <div className="text-[10px] uppercase font-bold tracking-wider text-ochre-300 flex items-center gap-1.5">
                                  <Layers className="w-3.5 h-3.5 text-ochre-400" />
                                  <span>Unit Dimensions &amp; Room Layout</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[11px] text-gray-300 font-medium mb-1">Category</label>
                                    <select
                                      value={unit.category}
                                      onChange={(e) => {
                                        const val = e.target.value as any;
                                        updateUnit(unitKey, (u) => ({ ...u, category: val }));
                                      }}
                                      className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white"
                                    >
                                      <option value="Studio">Studio</option>
                                      <option value="1-Bedroom">1-Bedroom</option>
                                      <option value="2-Bedroom">2-Bedroom</option>
                                      <option value="3-Bedroom">3-Bedroom</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[11px] text-gray-300 font-medium mb-1">Area (sqm)</label>
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={unit.areaSqm}
                                      onChange={(e) => {
                                        const val = parseFloat(e.target.value) || 0;
                                        updateUnit(unitKey, (u) => ({ ...u, areaSqm: val }));
                                      }}
                                      className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white font-mono"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] text-gray-300 font-medium mb-1">Bedrooms</label>
                                    <input
                                      type="number"
                                      value={unit.bedrooms}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        updateUnit(unitKey, (u) => ({ ...u, bedrooms: val }));
                                      }}
                                      className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] text-gray-300 font-medium mb-1">Bathrooms</label>
                                    <input
                                      type="number"
                                      value={unit.bathrooms}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        updateUnit(unitKey, (u) => ({ ...u, bathrooms: val }));
                                      }}
                                      className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-white"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* FINANCIAL BREAKDOWN: Price, Reservation Fee, Discount, Loanable Balance, Pag-IBIG Rate */}
                            <div className="rounded-2xl bg-charcoal-900/80 border border-white/10 overflow-hidden transition-all">
                              {/* Toggle Header Bar */}
                              <button
                                type="button"
                                onClick={() => toggleSubsection(unitKey, 'pricing')}
                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer select-none"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-ochre-400"></span>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-ochre-300">
                                    Pricing &amp; Financing Breakdown
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2">
                                  {!isPricingOpen && (
                                    <span className="hidden sm:inline-block text-[11px] font-mono text-ochre-300/80 mr-1">
                                      Price: ₱{curPrice.toLocaleString()} · Loanable: ₱{curLoanable.toLocaleString()}
                                    </span>
                                  )}
                                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                    {isPricingOpen ? 'Hide' : 'Show'}
                                  </span>
                                  {isPricingOpen ? (
                                    <ChevronUp className="w-4 h-4 text-ochre-400" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </button>

                              {/* Collapsible Content */}
                              {isPricingOpen && (
                                <div className="p-4 sm:p-5 pt-0 border-t border-white/5 space-y-4">
                                  {/* ROW 1: Contract Deductions (3 Columns) */}
                                  <div className="space-y-2 pt-4">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                      1. Contract Price &amp; Deductions
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                                      {/* Price */}
                                      <div className="space-y-1.5">
                                        <label className="block text-[11px] font-medium text-gray-300">
                                          Price (PHP)
                                        </label>
                                        <div className="relative">
                                          <input
                                            type="number"
                                            value={curPrice}
                                            onChange={(e) => {
                                              const val = Math.max(0, parseInt(e.target.value) || 0);
                                              updateUnit(unitKey, (u) => {
                                                const rf = Number(
                                                  u.reservationFeePhp !== undefined
                                                    ? u.reservationFeePhp
                                                    : activeProject.reservationFeePhp || 10000
                                                );
                                                const dc = Number(u.discountPhp ?? 0);
                                                return {
                                                  ...u,
                                                  pricePhp: val,
                                                  priceMinPhp: val,
                                                  loanableBalancePhp: Math.max(0, val - rf - dc),
                                                };
                                              });
                                            }}
                                            placeholder="0"
                                            className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400/30 rounded-lg px-3 py-2 text-white font-mono text-xs transition-colors"
                                          />
                                        </div>
                                      </div>

                                      {/* Reservation Fee */}
                                      <div className="space-y-1.5">
                                        <label className="block text-[11px] font-medium text-gray-300">
                                          Reservation Fee (PHP)
                                        </label>
                                        <div className="relative">
                                          <input
                                            type="number"
                                            value={curResFee}
                                            onChange={(e) => {
                                              const val = Math.max(0, parseInt(e.target.value) || 0);
                                              updateUnit(unitKey, (u) => {
                                                const pr = Number(u.pricePhp ?? u.priceMinPhp ?? 0);
                                                const dc = Number(u.discountPhp ?? 0);
                                                return {
                                                  ...u,
                                                  reservationFeePhp: val,
                                                  loanableBalancePhp: Math.max(0, pr - val - dc),
                                                };
                                              });
                                            }}
                                            placeholder="0"
                                            className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400/30 rounded-lg px-3 py-2 text-white font-mono text-xs transition-colors"
                                          />
                                        </div>
                                      </div>

                                      {/* Discount */}
                                      <div className="space-y-1.5">
                                        <label className="block text-[11px] font-medium text-gray-300">
                                          Discount (PHP)
                                        </label>
                                        <div className="relative">
                                          <input
                                            type="number"
                                            value={curDiscount}
                                            onChange={(e) => {
                                              const val = Math.max(0, parseInt(e.target.value) || 0);
                                              updateUnit(unitKey, (u) => {
                                                const pr = Number(u.pricePhp ?? u.priceMinPhp ?? 0);
                                                const rf = Number(
                                                  u.reservationFeePhp !== undefined
                                                    ? u.reservationFeePhp
                                                    : activeProject.reservationFeePhp || 10000
                                                );
                                                return {
                                                  ...u,
                                                  discountPhp: val,
                                                  loanableBalancePhp: Math.max(0, pr - rf - val),
                                                };
                                              });
                                            }}
                                            placeholder="0"
                                            className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400/30 rounded-lg px-3 py-2 text-white font-mono text-xs transition-colors"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* ROW 2: Loanable Balance & Financing Terms (2 Columns) */}
                                  <div className="space-y-2 pt-3 border-t border-white/10">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                      2. Loanable Balance &amp; Pag-IBIG Terms
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                                      {/* Loanable Balance */}
                                      <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5">
                                          <label className="text-[11px] font-bold text-ochre-300 whitespace-nowrap">
                                            Loanable Balance (PHP)
                                          </label>
                                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-ochre-500/20 text-ochre-300 font-bold tracking-wider">
                                            AUTO
                                          </span>
                                        </div>
                                        <div className="w-full bg-[#14171A] border border-ochre-500/40 rounded-lg px-3 py-2 text-ochre-200 font-mono font-bold text-xs sm:text-sm shadow-inner">
                                          ₱{curLoanable.toLocaleString()}
                                        </div>
                                      </div>

                                      {/* Pag-IBIG Interest Rate */}
                                      <div className="space-y-1.5">
                                        <label className="block text-[11px] font-medium text-gray-300">
                                          Pag-IBIG Interest Rate (%)
                                        </label>
                                        <div className="relative">
                                          <input
                                            type="number"
                                            step="0.01"
                                            value={curRate}
                                            onChange={(e) => {
                                              const val = parseFloat(e.target.value) || 0;
                                              updateUnit(unitKey, (u) => ({ ...u, pagibigInterestRate: val }));
                                            }}
                                            placeholder="4.5"
                                            className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400/30 rounded-lg px-3 py-2 text-white font-mono text-xs pr-7 transition-colors"
                                          />
                                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 pointer-events-none">
                                            %
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* UNIT MEDIA: Unit Layout Image Upload, Floor Plan Image Upload & Video Upload */}
                            <div className="rounded-2xl bg-charcoal-900/60 border border-white/10 overflow-hidden transition-all">
                              {/* Toggle Header Bar */}
                              <button
                                type="button"
                                onClick={() => toggleSubsection(unitKey, 'layout')}
                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer select-none"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-ochre-400"></span>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-ochre-300">
                                    Unit Layout, Floor Plan &amp; Walkthrough Video
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2">
                                  {!isLayoutOpen && (
                                    <span className="hidden sm:inline-block text-[11px] font-mono text-gray-400 mr-1">
                                      {unit.unitLayout ? 'Layout ✓' : 'No Layout'} · {unit.floorPlan ? 'Plan ✓' : 'No Plan'} · {unit.video ? 'Video ✓' : 'No Video'}
                                    </span>
                                  )}
                                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                    {isLayoutOpen ? 'Hide' : 'Show'}
                                  </span>
                                  {isLayoutOpen ? (
                                    <ChevronUp className="w-4 h-4 text-ochre-400" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </button>

                              {/* Collapsible Content */}
                              {isLayoutOpen && (
                                <div className="p-4 sm:p-5 pt-0 border-t border-white/5 space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4">
                                    {/* Left Column: Unit Layout + Floor Plan (below Unit Layout) */}
                                    <div className="space-y-4">
                                      {/* Unit Layout - Image upload field */}
                                      <div className="p-3.5 rounded-xl bg-[#14171A] border border-white/10 space-y-3">
                                        <div className="flex items-center justify-between">
                                          <label className="text-[11px] font-semibold text-gray-200 flex items-center gap-1.5">
                                            <ImageIcon className="w-3.5 h-3.5 text-ochre-400" />
                                            <span>Unit Layout</span>
                                          </label>
                                          {unit.unitLayout && (
                                            <button
                                              type="button"
                                              onClick={() => updateUnit(unitKey, (u) => ({ ...u, unitLayout: '' }))}
                                              className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                                            >
                                              Clear Layout
                                            </button>
                                          )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                          {/* Layout Preview Frame */}
                                          <div className="w-24 h-20 rounded-lg bg-black/40 border border-white/15 overflow-hidden shrink-0 flex items-center justify-center relative">
                                            {unit.unitLayout ? (
                                              <img
                                                src={unit.unitLayout}
                                                alt={`${unit.name} Layout`}
                                                className="w-full h-full object-contain p-1"
                                              />
                                            ) : (
                                              <div className="text-center p-1">
                                                <ImageIcon className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                                                <span className="text-[9px] text-gray-500 block">No Layout</span>
                                              </div>
                                            )}
                                          </div>

                                          <div className="flex-1 space-y-2">
                                            <input
                                              type="text"
                                              value={unit.unitLayout || ''}
                                              onChange={(e) => {
                                                const val = e.target.value;
                                                updateUnit(unitKey, (u) => ({ ...u, unitLayout: val }));
                                              }}
                                              placeholder="Layout image path or URL"
                                              className="w-full bg-[#1A1D20] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                                            />

                                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ochre-500/20 hover:bg-ochre-500/30 text-ochre-300 text-xs font-semibold border border-ochre-500/30 cursor-pointer transition-colors">
                                              <Upload className="w-3.5 h-3.5" />
                                              <span>Upload Layout Image</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={async (e) => {
                                                  const file = e.target.files?.[0];
                                                  if (!file) return;
                                                  const url = await handleImageUpload(file);
                                                  if (url) {
                                                    updateUnit(unitKey, (u) => ({ ...u, unitLayout: url }));
                                                  }
                                                  e.target.value = '';
                                                }}
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Floor Plan - (put below Unit Layout) Image upload field */}
                                      <div className="p-3.5 rounded-xl bg-[#14171A] border border-white/10 space-y-3">
                                        <div className="flex items-center justify-between">
                                          <label className="text-[11px] font-semibold text-gray-200 flex items-center gap-1.5">
                                            <ImageIcon className="w-3.5 h-3.5 text-ochre-400" />
                                            <span>Floor Plan</span>
                                          </label>
                                          {unit.floorPlan && (
                                            <button
                                              type="button"
                                              onClick={() => updateUnit(unitKey, (u) => ({ ...u, floorPlan: '' }))}
                                              className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                                            >
                                              Clear Floor Plan
                                            </button>
                                          )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                          {/* Floor Plan Preview Frame */}
                                          <div className="w-24 h-20 rounded-lg bg-black/40 border border-white/15 overflow-hidden shrink-0 flex items-center justify-center relative">
                                            {unit.floorPlan ? (
                                              <img
                                                src={unit.floorPlan}
                                                alt={`${unit.name} Floor Plan`}
                                                className="w-full h-full object-contain p-1"
                                              />
                                            ) : (
                                              <div className="text-center p-1">
                                                <ImageIcon className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                                                <span className="text-[9px] text-gray-500 block">No Floor Plan</span>
                                              </div>
                                            )}
                                          </div>

                                          <div className="flex-1 space-y-2">
                                            <input
                                              type="text"
                                              value={unit.floorPlan || ''}
                                              onChange={(e) => {
                                                const val = e.target.value;
                                                updateUnit(unitKey, (u) => ({ ...u, floorPlan: val }));
                                              }}
                                              placeholder="Floor plan image path or URL"
                                              className="w-full bg-[#1A1D20] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                                            />

                                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ochre-500/20 hover:bg-ochre-500/30 text-ochre-300 text-xs font-semibold border border-ochre-500/30 cursor-pointer transition-colors">
                                              <Upload className="w-3.5 h-3.5" />
                                              <span>Upload Floor Plan</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={async (e) => {
                                                  const file = e.target.files?.[0];
                                                  if (!file) return;
                                                  const url = await handleImageUpload(file);
                                                  if (url) {
                                                    updateUnit(unitKey, (u) => ({ ...u, floorPlan: url }));
                                                  }
                                                  e.target.value = '';
                                                }}
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Column: Walkthrough Video */}
                                    <div className="p-3.5 rounded-xl bg-[#14171A] border border-white/10 space-y-3 flex flex-col justify-between">
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <label className="text-[11px] font-semibold text-gray-200 flex items-center gap-1.5">
                                            <Video className="w-3.5 h-3.5 text-ochre-400" />
                                            <span>Walkthrough Video</span>
                                          </label>
                                          {unit.video && (
                                            <button
                                              type="button"
                                              onClick={() => updateUnit(unitKey, (u) => ({ ...u, video: '' }))}
                                              className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                                            >
                                              Clear Video
                                            </button>
                                          )}
                                        </div>

                                        <div className="w-full h-44 rounded-lg bg-black/40 border border-white/15 overflow-hidden flex items-center justify-center relative">
                                          {unit.video ? (
                                            <video
                                              src={unit.video}
                                              className="w-full h-full object-cover"
                                              controls
                                              muted
                                              playsInline
                                            />
                                          ) : (
                                            <div className="text-center p-2">
                                              <Video className="w-7 h-7 text-gray-600 mx-auto mb-1.5" />
                                              <span className="text-[10px] text-gray-500 block">No Video Loaded</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="space-y-2 pt-2">
                                        <input
                                          type="text"
                                          value={unit.video || ''}
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            updateUnit(unitKey, (u) => ({ ...u, video: val }));
                                          }}
                                          placeholder="Video URL or upload file"
                                          className="w-full bg-[#1A1D20] border border-white/15 focus:border-ochre-400 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                                        />

                                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ochre-500/20 hover:bg-ochre-500/30 text-ochre-300 text-xs font-semibold border border-ochre-500/30 cursor-pointer transition-colors w-full justify-center">
                                          <Upload className="w-3.5 h-3.5" />
                                          <span>Upload Video (MP4/WebM)</span>
                                          <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                              const file = e.target.files?.[0];
                                              if (!file) return;
                                              const url = await handleImageUpload(file);
                                              if (url) {
                                                updateUnit(unitKey, (u) => ({ ...u, video: url }));
                                              }
                                              e.target.value = '';
                                            }}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* UNIT PHOTO GALLERY: 5 Dedicated Image Upload Slots */}
                            <div className="rounded-2xl bg-charcoal-900/60 border border-white/10 overflow-hidden transition-all">
                              {/* Toggle Header Bar */}
                              <button
                                type="button"
                                onClick={() => toggleSubsection(unitKey, 'photos')}
                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer select-none"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-ochre-400"></span>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-ochre-300">
                                    Unit Photo Gallery (5 Photos)
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2">
                                  {!isPhotosOpen && (
                                    <span className="hidden sm:inline-block text-[11px] font-mono text-gray-400 mr-1">
                                      {[unit.gallery1, unit.gallery2, unit.gallery3, unit.gallery4, unit.gallery5].filter(Boolean).length} of 5 Photos Set
                                    </span>
                                  )}
                                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                    {isPhotosOpen ? 'Hide' : 'Show'}
                                  </span>
                                  {isPhotosOpen ? (
                                    <ChevronUp className="w-4 h-4 text-ochre-400" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </button>

                              {/* Collapsible Content */}
                              {isPhotosOpen && (
                                <div className="p-4 sm:p-5 pt-0 border-t border-white/5 space-y-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs pt-4">
                                    {(
                                      [
                                        { key: 'gallery1' as const, label: 'Gallery 1', val: unit.gallery1 },
                                        { key: 'gallery2' as const, label: 'Gallery 2', val: unit.gallery2 },
                                        { key: 'gallery3' as const, label: 'Gallery 3', val: unit.gallery3 },
                                        { key: 'gallery4' as const, label: 'Gallery 4', val: unit.gallery4 },
                                        { key: 'gallery5' as const, label: 'Gallery 5', val: unit.gallery5 },
                                      ] as const
                                    ).map((g) => (
                                      <div
                                        key={g.key}
                                        className="p-3 rounded-xl bg-[#14171A] border border-white/10 space-y-2 flex flex-col justify-between"
                                      >
                                        <div>
                                          <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-[11px] font-semibold text-gray-200 flex items-center gap-1">
                                              <ImageIcon className="w-3 h-3 text-ochre-400" />
                                              <span>{g.label}</span>
                                            </label>
                                            {g.val && (
                                              <button
                                                type="button"
                                                onClick={() => updateUnit(unitKey, (u) => ({ ...u, [g.key]: '' }))}
                                                className="text-[9px] text-red-400 hover:text-red-300 transition-colors"
                                              >
                                                Clear
                                              </button>
                                            )}
                                          </div>

                                          {/* Thumbnail Preview */}
                                          <div className="w-full h-24 rounded-lg bg-black/40 border border-white/15 overflow-hidden flex items-center justify-center relative mb-2">
                                            {g.val ? (
                                              <img
                                                src={g.val}
                                                alt={`${unit.name} ${g.label}`}
                                                className="w-full h-full object-cover"
                                              />
                                            ) : (
                                              <div className="text-center p-1">
                                                <ImageIcon className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                                                <span className="text-[9px] text-gray-500 block">No Image</span>
                                              </div>
                                            )}
                                          </div>

                                          {/* URL/Path text input */}
                                          <input
                                            type="text"
                                            value={g.val || ''}
                                            onChange={(e) => {
                                              const newVal = e.target.value;
                                              updateUnit(unitKey, (u) => ({ ...u, [g.key]: newVal }));
                                            }}
                                            placeholder={`${g.label} URL / path`}
                                            className="w-full bg-[#1A1D20] border border-white/15 focus:border-ochre-400 rounded-lg px-2 py-1 text-[11px] text-white font-mono"
                                          />
                                        </div>

                                        {/* Upload Button */}
                                        <label className="w-full inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-ochre-500/20 hover:bg-ochre-500/30 text-ochre-300 text-[11px] font-semibold border border-ochre-500/30 cursor-pointer transition-colors mt-2">
                                          <Upload className="w-3 h-3" />
                                          <span>Upload Photo</span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                              const file = e.target.files?.[0];
                                              if (!file) return;
                                              const url = await handleImageUpload(file);
                                              if (url) {
                                                updateUnit(unitKey, (u) => ({ ...u, [g.key]: url }));
                                              }
                                              e.target.value = '';
                                            }}
                                          />
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Unit Description */}
                            <div>
                              <label className="block text-[11px] text-gray-400 mb-1">Unit Description</label>
                              <textarea
                                rows={2}
                                value={unit.description}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateUnit(unitKey, (u) => ({ ...u, description: val }));
                                }}
                                className="w-full bg-[#14171A] border border-white/15 focus:border-ochre-400 rounded-lg px-3 py-1.5 text-xs text-white"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 5: AMENITIES */}
              {activeSection === 'amenities' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-editorial text-2xl font-semibold text-white">Community Amenities</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Manage recreational amenities and infrastructure highlights for {activeProject.name}.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateActiveProject((p) => ({
                          ...p,
                          amenities: [
                            ...p.amenities,
                            {
                              name: 'New Amenity',
                              description: 'Amenity description highlights.',
                              iconName: 'Sparkles',
                            },
                          ],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ochre-500 hover:bg-ochre-600 text-charcoal-900 text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Amenity</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProject.amenities.map((am, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={am.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveProject((p) => {
                                const list = [...p.amenities];
                                list[idx] = { ...list[idx], name: val };
                                return { ...p, amenities: list };
                              });
                            }}
                            className="bg-transparent border-b border-white/20 text-sm font-bold text-white focus:outline-none focus:border-ochre-400 w-3/4"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              updateActiveProject((p) => ({
                                ...p,
                                amenities: p.amenities.filter((_, i) => i !== idx),
                              }));
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={am.description}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveProject((p) => {
                                const list = [...p.amenities];
                                list[idx] = { ...list[idx], description: val };
                                return { ...p, amenities: list };
                              });
                            }}
                            className="w-full bg-[#14171A] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Icon Name</label>
                          <input
                            type="text"
                            value={am.iconName}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveProject((p) => {
                                const list = [...p.amenities];
                                list[idx] = { ...list[idx], iconName: val };
                                return { ...p, amenities: list };
                              });
                            }}
                            placeholder="ShoppingBag, Waves, TreePine, Activity, ShieldCheck..."
                            className="w-full bg-[#14171A] border border-white/15 rounded-lg px-3 py-1 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 6: OVERVIEW & FAQS */}
              {activeSection === 'faqs' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-editorial text-2xl font-semibold text-white">Project Overview &amp; FAQs</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Edit editorial overview paragraphs and buyer questions for {activeProject.name}.
                    </p>
                  </div>

                  {/* Overview Paragraphs */}
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider text-ochre-300 font-bold block">
                      Overview Paragraphs ({activeProject.overview.length})
                    </span>
                    {activeProject.overview.map((para, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <textarea
                          rows={3}
                          value={para}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateActiveProject((p) => {
                              const list = [...p.overview];
                              list[idx] = val;
                              return { ...p, overview: list };
                            });
                          }}
                          className="w-full bg-[#14171A] border border-white/15 rounded-xl p-3 text-xs text-white leading-relaxed"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateActiveProject((p) => ({
                              ...p,
                              overview: p.overview.filter((_, i) => i !== idx),
                            }));
                          }}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateActiveProject((p) => ({
                          ...p,
                          overview: [...p.overview, 'New descriptive overview paragraph about the development.'],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>

                  {/* FAQs List */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-ochre-300 font-bold">
                        Frequently Asked Questions ({activeProject.faqs.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateActiveProject((p) => ({
                            ...p,
                            faqs: [
                              ...p.faqs,
                              { question: 'New Question?', answer: 'Detailed answer regarding financing or property policy.' },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add FAQ</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {activeProject.faqs.map((faq, idx) => (
                        <div key={idx} className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateActiveProject((p) => {
                                  const list = [...p.faqs];
                                  list[idx] = { ...list[idx], question: val };
                                  return { ...p, faqs: list };
                                });
                              }}
                              placeholder="Question..."
                              className="w-5/6 bg-[#14171A] border border-white/15 rounded-lg px-3 py-1.5 text-xs font-bold text-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updateActiveProject((p) => ({
                                  ...p,
                                  faqs: p.faqs.filter((_, i) => i !== idx),
                                }));
                              }}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveProject((p) => {
                                const list = [...p.faqs];
                                list[idx] = { ...list[idx], answer: val };
                                return { ...p, faqs: list };
                              });
                            }}
                            placeholder="Answer..."
                            className="w-full bg-[#14171A] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-gray-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 7: SEO & META TAGS */}
              {activeSection === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-editorial text-2xl font-semibold text-white">Search Engine Optimization (SEO)</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Customize how {activeProject.name} appears in Google Search, social shares, and browser tabs.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-gray-300 uppercase">Meta Title Tag</label>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {activeProject.metaTitle.length} chars (Target: 50–60)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={activeProject.metaTitle}
                      onChange={(e) => updateActiveProject((p) => ({ ...p, metaTitle: e.target.value }))}
                      className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-gray-300 uppercase">Meta Description</label>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {activeProject.metaDescription.length} chars (Target: 140–160)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={activeProject.metaDescription}
                      onChange={(e) => updateActiveProject((p) => ({ ...p, metaDescription: e.target.value }))}
                      className="w-full bg-[#14171A] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-ochre-500"
                    />
                  </div>

                  {/* Google Search Result Preview Card */}
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block mb-2">Google SERP Snippet Preview</span>
                    <div className="text-xs text-emerald-400 font-mono">https://urbandecahomes.com/{activeProject.slug}</div>
                    <div className="text-base text-blue-400 font-medium hover:underline cursor-pointer">
                      {activeProject.metaTitle || activeProject.name}
                    </div>
                    <div className="text-xs text-gray-300 line-clamp-2">
                      {activeProject.metaDescription || activeProject.tagline}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 8: NETLIFY DEPLOYMENT GUIDE */}
              {activeSection === 'guide' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-editorial text-2xl font-semibold text-white">Netlify Deployment &amp; Git-Sync Setup</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      How your database-free admin panel works seamlessly on Netlify with zero hosting fees.
                    </p>
                  </div>

                  <div className="p-5 bg-ochre-500/10 border border-ochre-500/30 rounded-2xl space-y-3">
                    <h3 className="text-sm font-bold text-ochre-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-ochre-400" />
                      Two Operating Modes
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Because Netlify functions run in read-only containers, changes made in this admin panel can be saved in two ways:
                    </p>
                    <ul className="text-xs space-y-2 text-gray-300 pl-4 list-disc">
                      <li>
                        <strong>Mode 1: Automated Git-Backed CMS (Recommended)</strong> — Add a free GitHub Personal Access Token to Netlify environment variables. Whenever you click <em>Save All Changes</em>, the system commits directly to your GitHub repo, triggering an automatic Netlify redeployment within seconds!
                      </li>
                      <li>
                        <strong>Mode 2: Local File Mode &amp; Export</strong> — When developing locally on your computer, changes write directly to <code className="text-ochre-200">data/projects.json</code> and <code className="text-ochre-200">public/images/uploads/</code>. You can also click <em>Export JSON</em> anytime to download a backup.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Netlify Environment Variables Checklist
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-[#14171A] border border-white/10 rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <code className="text-ochre-300 font-bold">ADMIN_PASSCODE</code>
                          <span className="text-[10px] text-gray-400">Required</span>
                        </div>
                        <p className="text-gray-400">
                          The secret passcode used to unlock this <code className="text-white">/admin</code> page. Defaults to <code className="text-white">deca2026</code> if not specified.
                        </p>
                      </div>

                      <div className="p-3 bg-[#14171A] border border-white/10 rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <code className="text-ochre-300 font-bold">GITHUB_TOKEN</code>
                          <span className="text-[10px] text-gray-400">Optional for Netlify Auto-Deploy</span>
                        </div>
                        <p className="text-gray-400">
                          A free GitHub Personal Access Token (classic with <code className="text-white">repo</code> scope or fine-grained token with Contents read/write) to enable live commits on Netlify.
                        </p>
                      </div>

                      <div className="p-3 bg-[#14171A] border border-white/10 rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <code className="text-ochre-300 font-bold">GITHUB_REPO</code>
                          <span className="text-[10px] text-gray-400">Optional (Defaults to rynp/urbandecahomes)</span>
                        </div>
                        <p className="text-gray-400">
                          Your repository path e.g. <code className="text-white">rynp/urbandecahomes</code>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">No project selected.</div>
        )}
      </div>
    </div>
  );
}
