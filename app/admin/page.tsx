'use client';

import React, { useState, useEffect, useRef } from 'react';
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

  // Save All Changes
  async function handleSave() {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects }),
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
                  { id: 'units', label: '4. Unit Types & Specs', icon: Layers },
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

              {/* SECTION 4: UNIT TYPES & PRICING */}
              {activeSection === 'units' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-editorial text-2xl font-semibold text-white">Unit Configurations &amp; Layouts</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Configure floor area, bedroom count, pricing, and Pag-IBIG monthly estimates.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateActiveProject((p) => ({
                          ...p,
                          unitTypes: [
                            ...p.unitTypes,
                            {
                              id: `${p.slug}-unit-${Date.now()}`,
                              name: 'New Unit Cut',
                              category: '2-Bedroom',
                              areaSqm: 30.6,
                              bedrooms: 2,
                              bathrooms: 1,
                              balcony: true,
                              priceMinPhp: 2900000,
                              priceMaxPhp: 3200000,
                              estMonthlyPagIbigPhp: 15500,
                              status: 'Available',
                              features: ['2 Bedrooms', 'Tiled Bathroom', 'Balcony'],
                              description: 'Modern residential format designed for comfort.',
                            },
                          ],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ochre-500 hover:bg-ochre-600 text-charcoal-900 text-xs font-bold shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Unit Type</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activeProject.unitTypes.map((unit, idx) => (
                      <div
                        key={unit.id || idx}
                        className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-ochre-500/20 text-ochre-300 flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <input
                              type="text"
                              value={unit.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], name: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="bg-transparent border-b border-white/20 px-1 py-0.5 text-sm font-bold text-white focus:outline-none focus:border-ochre-400"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={unit.status}
                              onChange={(e) => {
                                const val = e.target.value as any;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], status: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white"
                            >
                              <option value="Available">Available</option>
                              <option value="Limited Availability">Limited Availability</option>
                              <option value="Sold Out">Sold Out</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                updateActiveProject((p) => ({
                                  ...p,
                                  unitTypes: p.unitTypes.filter((_, i) => i !== idx),
                                }));
                              }}
                              className="p-1.5 text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Category</label>
                            <select
                              value={unit.category}
                              onChange={(e) => {
                                const val = e.target.value as any;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], category: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                            >
                              <option value="Studio">Studio</option>
                              <option value="1-Bedroom">1-Bedroom</option>
                              <option value="2-Bedroom">2-Bedroom</option>
                              <option value="3-Bedroom">3-Bedroom</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Area (sqm)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={unit.areaSqm}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], areaSqm: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Bedrooms</label>
                            <input
                              type="number"
                              value={unit.bedrooms}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], bedrooms: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Bathrooms</label>
                            <input
                              type="number"
                              value={unit.bathrooms}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], bathrooms: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Price Min (PHP)</label>
                            <input
                              type="number"
                              value={unit.priceMinPhp}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], priceMinPhp: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Price Max (PHP)</label>
                            <input
                              type="number"
                              value={unit.priceMaxPhp}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], priceMaxPhp: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-gray-400 mb-1">Est. Pag-IBIG Monthly (PHP)</label>
                            <input
                              type="number"
                              value={unit.estMonthlyPagIbigPhp}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                updateActiveProject((p) => {
                                  const list = [...p.unitTypes];
                                  list[idx] = { ...list[idx], estMonthlyPagIbigPhp: val };
                                  return { ...p, unitTypes: list };
                                });
                              }}
                              className="w-full bg-[#14171A] border border-white/15 rounded-lg px-2.5 py-1.5 text-ochre-200 font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Unit Description</label>
                          <textarea
                            rows={2}
                            value={unit.description}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateActiveProject((p) => {
                                const list = [...p.unitTypes];
                                list[idx] = { ...list[idx], description: val };
                                return { ...p, unitTypes: list };
                              });
                            }}
                            className="w-full bg-[#14171A] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
