'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Move,
  Download,
} from 'lucide-react';

interface ZoomablePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  imageUrl: string;
  altText: string;
}

export default function ZoomablePlanModal({
  isOpen,
  onClose,
  title,
  subtitle,
  imageUrl,
  altText,
}: ZoomablePlanModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 0.6);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, resetZoom]);

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      resetZoom();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, resetZoom]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.15, 4));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.15, 0.6);
        if (next <= 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/90 backdrop-blur-md p-2 sm:p-4 select-none animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full h-[94vh] max-w-6xl bg-charcoal-900 border border-charcoal-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800 bg-charcoal-900/95 z-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
              Interactive Architectural Viewer
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-stone-300 mt-0.5">{subtitle}</p>
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-charcoal-800 rounded-lg p-1 border border-charcoal-700 shadow-sm">
              <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Zoom Out"
                disabled={scale <= 0.6}
                className="p-2 text-stone-200 hover:text-white hover:bg-charcoal-700 rounded disabled:opacity-40 transition"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="px-2.5 py-1 text-xs font-mono font-bold text-gold-400 min-w-[56px] text-center">
                {Math.round(scale * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Zoom In"
                disabled={scale >= 4}
                className="p-2 text-stone-200 hover:text-white hover:bg-charcoal-700 rounded disabled:opacity-40 transition"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-charcoal-700 mx-1" />

              <button
                type="button"
                onClick={resetZoom}
                aria-label="Reset View"
                className="p-2 text-stone-200 hover:text-white hover:bg-charcoal-700 rounded transition"
                title="Reset View (0)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="p-2 text-stone-200 hover:text-white hover:bg-charcoal-700 rounded transition hidden sm:inline-flex"
                title="Fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-stone-200 hover:text-white hover:bg-charcoal-700 rounded transition"
                title="Open Original Image"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2.5 rounded-lg bg-charcoal-800 hover:bg-red-950 text-stone-300 hover:text-red-300 border border-charcoal-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Area */}
        <div
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`relative flex-1 bg-stone-950 overflow-hidden flex items-center justify-center ${
            scale > 1
              ? isDragging
                ? 'cursor-grabbing'
                : 'cursor-grab'
              : 'cursor-zoom-in'
          }`}
          onClick={() => {
            if (scale === 1) handleZoomIn();
          }}
        >
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Zoomable Image Container */}
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            className="flex items-center justify-center p-4 max-w-full max-h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={altText}
              draggable={false}
              className="max-h-[78vh] max-w-[90vw] object-contain rounded-md shadow-2xl pointer-events-none select-none"
            />
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-charcoal-900/80 border border-charcoal-700 text-[11px] text-stone-300 pointer-events-none flex items-center space-x-2 backdrop-blur-sm">
            <Move className="w-3.5 h-3.5 text-gold-400" />
            <span>
              {scale > 1
                ? 'Click & drag to pan • Scroll to zoom • Press Esc to close'
                : 'Click image or use controls to zoom • Double click to enlarge'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
