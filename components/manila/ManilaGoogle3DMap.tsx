'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  MapPin,
  Maximize2,
  ExternalLink,
  Layers,
  Globe,
  Navigation,
  Building2,
  Sparkles,
  RotateCw,
  Eye,
  CheckCircle2,
} from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-map-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'gmp-marker-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
    }
  }
}

interface ManilaGoogle3DMapProps {
  apiKey?: string;
}

export default function ManilaGoogle3DMap({ apiKey }: ManilaGoogle3DMapProps) {
  const [viewMode, setViewMode] = useState<'satellite' | 'street'>('satellite');
  const [zoomLevel, setZoomLevel] = useState<number>(17);
  const [tiltAngle, setTiltAngle] = useState<number>(65); // 3D isometric tilt for gmp-map-3d
  const [headingAngle, setHeadingAngle] = useState<number>(35);
  const [hasMap3DSupport, setHasMap3DSupport] = useState<boolean>(false);
  const map3dContainerRef = useRef<HTMLDivElement>(null);

  // Urban Deca Homes Manila Coordinates (Exact Vitas St, Tondo)
  const lat = 14.62553;
  const lng = 120.96279;

  // Google Maps API Key from props or environment variable
  const activeApiKey = apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Initialize official Photorealistic 3D Maps (<gmp-map-3d>) if API key is provided
  useEffect(() => {
    if (!activeApiKey) return;

    const scriptId = 'google-maps-3d-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${activeApiKey}&v=alpha&libraries=maps3d`;
      script.async = true;
      script.onload = () => {
        setHasMap3DSupport(true);
      };
      document.head.appendChild(script);
    } else {
      setHasMap3DSupport(true);
    }
  }, [activeApiKey]);

  // Google Earth 3D web URL
  const googleEarthUrl = `https://earth.google.com/web/search/Urban+Deca+Homes+Manila/@${lat},${lng},25a,600d,35y,${headingAngle}h,${tiltAngle}t,0r`;

  // Standard Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Urban+Deca+Homes+Manila,+Vitas+St,+Tondo,+Manila`;

  // Interactive Satellite Embed URL with high resolution centering on Urban Deca Homes Manila
  const mapEmbedUrl = `https://maps.google.com/maps?q=Urban+Deca+Homes+Manila,+Vitas+Street,+Tondo,+Manila&t=${
    viewMode === 'satellite' ? 'k' : 'm'
  }&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'satellite' ? 'street' : 'satellite'));
  };

  const rotateHeading = () => {
    setHeadingAngle((prev) => (prev + 45) % 360);
  };

  return (
    <div className="mt-8 bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden transition-all duration-300">
      {/* 3D Map Header */}
      <div className="p-5 sm:p-6 border-b border-stone-200 bg-gradient-to-r from-stone-50 via-white to-stone-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-gold-100/80 text-gold-900 text-[11px] font-bold uppercase tracking-wider border border-gold-300/60 mb-2">
              <Globe className="w-3 h-3 text-gold-700 animate-spin" style={{ animationDuration: '15s' }} />
              <span>Google 3D Aerial Perspective</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 tracking-tight flex items-center gap-2">
              <span>Urban Deca Homes Manila 3D Location</span>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Live Geo Position" />
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Photorealistic aerial view centered along Vitas Street, Tondo with 13 residential towers and Deca Mall.
            </p>
          </div>

          {/* Quick Perspective Switcher */}
          <div className="flex items-center gap-1.5 self-start sm:self-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={toggleViewMode}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'satellite'
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-charcoal-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>{viewMode === 'satellite' ? 'Satellite 3D' : 'Street Map'}</span>
            </button>
            <button
              type="button"
              onClick={rotateHeading}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-charcoal-900 hover:bg-white/80 transition-all"
              title="Heading Angle"
            >
              <RotateCw className="w-3.5 h-3.5 text-stone-500" />
              <span>{headingAngle}°</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewport Box */}
      <div className="relative h-[340px] sm:h-[400px] w-full bg-charcoal-950 overflow-hidden group">
        {/* Map Viewport Container */}
        <div className="w-full h-full">
          {/* Real Google Maps 3D Web Component if API key available and loaded */}
          {hasMap3DSupport && activeApiKey ? (
            <div ref={map3dContainerRef} className="w-full h-full">
              <gmp-map-3d
                center={`${lat},${lng},120`}
                tilt={tiltAngle}
                heading={headingAngle}
                range="850"
                style={{ width: '100%', height: '100%' }}
              >
                <gmp-marker-3d
                  position={`${lat},${lng},25`}
                  altitude-mode="RELATIVE_TO_GROUND"
                  title="Urban Deca Homes Manila"
                />
              </gmp-map-3d>
            </div>
          ) : (
            /* Photorealistic Google Maps Satellite Viewer */
            <iframe
              title="Urban Deca Homes Manila 3D Satellite Map View"
              src={mapEmbedUrl}
              className="w-full h-full border-0 filter contrast-[1.04]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>

        {/* 3D Deca Homes Manila Custom Marker Pin */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          {/* Animated 3D Floating Location Badge */}
          <div className="mb-2 px-3 py-1.5 rounded-xl bg-charcoal-950/95 backdrop-blur-md border border-gold-400/80 shadow-2xl text-center transform -translate-y-1 animate-bounce" style={{ animationDuration: '2.5s' }}>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#CE2029] animate-ping" />
              <span className="text-[11px] font-bold tracking-tight text-white font-logo">
                Urban Deca Homes Manila
              </span>
            </div>
            <div className="text-[9px] font-mono text-gold-400 mt-0.5">
              14.6255° N, 120.9628° E • Vitas St., Tondo
            </div>
          </div>

          {/* Deca Marker Pin & Ripple */}
          <div className="relative flex items-center justify-center">
            {/* Ground Radar Pulse Ring */}
            <div className="absolute w-12 h-12 rounded-full bg-[#CE2029]/30 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute w-8 h-8 rounded-full bg-gold-400/40 animate-pulse" />

            {/* Solid Pin Icon */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#CE2029] to-[#B51B23] shadow-xl border-2 border-white flex items-center justify-center text-white transform hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4 text-white" />
            </div>

            {/* Pin pointer tip */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#B51B23] rotate-45 border-r border-b border-white" />
          </div>
        </div>

        {/* Top-Right 3D HUD Tools */}
        <div className="absolute top-3 right-3 z-30 flex flex-col gap-2">
          {/* Open in Google Earth 3D Direct Fly-Through */}
          <a
            href={googleEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Launch Full 3D Flight in Google Earth"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-charcoal-900/90 hover:bg-charcoal-800 text-white text-[11px] font-semibold border border-charcoal-700 shadow-lg backdrop-blur-sm transition-all hover:scale-105"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span>Launch Google Earth 3D</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          {/* Get Driving Directions */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Get Navigation Directions"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-charcoal-900 text-[11px] font-semibold border border-stone-200 shadow-lg backdrop-blur-sm transition-all hover:scale-105"
          >
            <Navigation className="w-3.5 h-3.5 text-[#CE2029]" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Bottom-Left 3D Geo Telemetry Overlay */}
        <div className="absolute bottom-3 left-3 z-30 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-charcoal-950/85 backdrop-blur-md border border-charcoal-800 text-[10px] font-mono text-stone-300 space-y-0.5 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="text-gold-400 font-bold">DECA MANILA HUB</span>
              <span className="text-stone-500">•</span>
              <span>13 RESIDENTIAL TOWERS</span>
            </div>
            <div className="text-stone-400">
              LAT: 14.6255° N | LNG: 120.9628° E | ELEV: 12M
            </div>
          </div>
        </div>

        {/* Bottom-Right Zoom & View Controls */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.min(prev + 1, 20))}
            title="Zoom In"
            className="w-8 h-8 rounded-lg bg-charcoal-900/90 hover:bg-charcoal-800 text-white border border-charcoal-700 shadow-md flex items-center justify-center font-bold text-sm transition-all active:scale-95"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.max(prev - 1, 14))}
            title="Zoom Out"
            className="w-8 h-8 rounded-lg bg-charcoal-900/90 hover:bg-charcoal-800 text-white border border-charcoal-700 shadow-md flex items-center justify-center font-bold text-sm transition-all active:scale-95"
          >
            −
          </button>
        </div>
      </div>

      {/* 3D Location Highlights Strip below Map */}
      <div className="p-4 bg-[#FAF8F2] border-t border-[#EADBBD] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5C3D36]">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-[#CE2029] flex-shrink-0" />
          <span>
            <strong>Vitas Street:</strong> Gated private access roadway
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
          <span>
            <strong>Deca Mall Complex:</strong> Directly on property site
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span>
            <strong>NLEX Harbor Link:</strong> Rapid north expressway link
          </span>
        </div>
      </div>
    </div>
  );
}
