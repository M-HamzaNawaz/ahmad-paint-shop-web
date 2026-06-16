'use client';

import dynamic from 'next/dynamic';
import { PaintRollerIcon } from '@/components/Icons';

const FALLBACK_SWATCHES = [
  '#fca5a5',
  '#fdba74',
  '#fcd34d',
  '#bef264',
  '#86efac',
  '#5eead4',
  '#7dd3fc',
  '#93c5fd',
  '#c4b5fd',
  '#f0abfc',
  '#f9a8d4',
  '#d6d3d1',
];

/**
 * Static fallback shown while the 3D scene loads, and on devices/browsers
 * without WebGL or with reduced-motion preferences. Mirrors the original
 * decorative palette card so the hero never looks empty.
 */
function HeroFallback() {
  return (
    <div className="rounded-3xl border border-white bg-white/70 p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="font-bold text-zinc-900">Colour your space</p>
        <PaintRollerIcon className="h-6 w-6 text-primary" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {FALLBACK_SWATCHES.map((color) => (
          <div
            key={color}
            className="relative aspect-square rounded-xl shadow-inner ring-1 ring-black/5"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Hundreds of shades available in store across the Kaizen and Nippon
        ranges. Ask us on WhatsApp for shade cards.
      </p>
    </div>
  );
}

// Three.js is heavy and WebGL-only — never render it on the server, and
// lazy-load it so it stays out of the initial bundle.
const BubblesScene = dynamic(() => import('./BubblesScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function Hero3D() {
  return (
    <div className="relative h-[360px] w-full select-none sm:h-[420px] lg:h-[460px]">
      {/* Soft glow behind the bubbles */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-orange-200/40 blur-3xl"
      />
      <BubblesScene />
    </div>
  );
}
