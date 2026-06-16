'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * Wraps content in a pointer-driven 3D tilt. As the cursor moves over the
 * element it rotates toward the cursor in perspective, lifts slightly, and
 * shows a soft moving glare. Pure CSS transforms — no WebGL, cheap enough
 * to use on every card across the site.
 *
 * Tilt is disabled automatically on touch / coarse-pointer devices and when
 * the user prefers reduced motion (handled via the `(hover:hover)` /
 * `prefers-reduced-motion` checks below), so mobile taps stay unaffected.
 */
export function Tilt3D({
  children,
  className = '',
  /** Max rotation in degrees at the edges. */
  max = 10,
  /** Lift toward the viewer, in px. */
  lift = 8,
  /** Show the moving glare highlight. */
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  lift?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef<boolean | null>(null);

  function tiltAllowed() {
    if (enabledRef.current === null) {
      enabledRef.current =
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return enabledRef.current;
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !tiltAllowed()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * 2 * max;
    const rotateX = (0.5 - py) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px)`;
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)`;
    }
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  }

  const style: CSSProperties = {
    transformStyle: 'preserve-3d',
    transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative ${className}`}
      style={style}
    >
      {children}
      {glare ? (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{ mixBlendMode: 'soft-light' }}
        />
      ) : null}
    </div>
  );
}
