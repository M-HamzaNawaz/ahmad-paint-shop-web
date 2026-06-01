"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "./Icons";

const slides = [
  {
    src: "/slider/01-store.png",
    title: "Genuine Kaizen & Nippon",
    subtitle: "Authorised retailer — every product, every shade, all in one shop.",
  },
  {
    src: "/slider/02-family.png",
    title: "Make every room yours",
    subtitle: "Premium emulsions for a fresh look that lasts.",
  },
  {
    src: "/slider/03-professional.png",
    title: "Trusted by professionals",
    subtitle: "From small touch-ups to large projects — built for every job.",
  },
  {
    src: "/slider/04-community.png",
    title: "Colour for every space",
    subtitle: "Quality paints for homes, shops and creative projects.",
  },
];

const AUTOPLAY_MS = 6000;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const goTo = useCallback((index: number) => {
    const c = containerRef.current;
    if (!c) return;
    const target = c.children[index] as HTMLElement | undefined;
    if (!target) return;
    c.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  // Auto-advance — pauses on hover (desktop) via pausedRef.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((i) => {
        const next = (i + 1) % slides.length;
        goTo(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [goTo]);

  // Sync the active dot when the user swipes/scrolls manually.
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Array.from(c.children).indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { root: c, threshold: [0, 0.6, 1] },
    );
    Array.from(c.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-12 pt-6"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-zinc-900/10 ring-1 ring-black/5">
        {/* Slides */}
        <div
          ref={containerRef}
          className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="relative aspect-[16/9] w-full shrink-0 snap-center sm:aspect-[21/10] lg:aspect-[21/9]"
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                preload={i === 0}
              />
              {/* Bottom gradient + caption */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
                <h3 className="max-w-2xl text-2xl font-extrabold leading-tight text-white drop-shadow md:text-4xl lg:text-5xl">
                  {slide.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow md:text-base lg:text-lg">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next — desktop only (mobile uses native swipe) */}
        <button
          type="button"
          onClick={() => goTo((active - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-zinc-800 shadow-lg backdrop-blur-md transition hover:bg-white md:flex"
        >
          <ArrowRightIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => goTo((active + 1) % slides.length)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-zinc-800 shadow-lg backdrop-blur-md transition hover:bg-white md:flex"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>

        {/* Indicators */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full bg-white transition-all duration-300 ${
                i === active
                  ? "w-8 opacity-100"
                  : "w-2 opacity-60 hover:opacity-90"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
