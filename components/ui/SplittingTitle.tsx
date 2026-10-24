'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SplittingTitleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  baseDelayMs?: number;
  durationMs?: number;
}

export default function SplittingTitle({
  text,
  className = '',
  as: Component = 'h2',
  id,
  baseDelayMs = 500, // 0.5 second delay before running the animation
  durationMs = 1300,  // Slow, cinematic animation
}: SplittingTitleProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const [inFocus, setInFocus] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInFocus(true);
          } else {
            // Immediate reset when scrolled out of view
            setInFocus(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split into words for graceful typographic animation
  const words = text.split(' ');

  return (
    <Component
      ref={containerRef}
      id={id}
      className={`font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight leading-tight ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block overflow-hidden mr-[0.25em] align-baseline pb-[0.06em]"
        >
          <span
            className="inline-block transition-all transform will-change-transform"
            style={{
              transitionDuration: inFocus ? `${durationMs}ms` : '200ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: inFocus ? `${baseDelayMs + wordIndex * 80}ms` : '0ms',
              transform: inFocus ? 'translate3d(0, 0, 0)' : 'translate3d(0, 125%, 0)',
              opacity: inFocus ? 1 : 0,
              filter: inFocus ? 'blur(0px)' : 'blur(2px)',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
