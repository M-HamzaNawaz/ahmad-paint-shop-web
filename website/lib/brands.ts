// Shared brand metadata — used by the brand picker, switcher and home page.

import type { Brand } from "./types";

export interface BrandInfo {
  key: Brand;
  /** URL slug, e.g. "neo". */
  slug: string;
  /** Display label, e.g. "NEO". */
  label: string;
  company: string;
  blurb: string;
  /** Tailwind gradient classes for the brand card. */
  card: string;
}

export const BRANDS: BrandInfo[] = [
  {
    key: "Neo",
    slug: "neo",
    label: "NEO",
    company: "by Kaizen Paint",
    blurb:
      "Premium interior & exterior emulsions, enamels, putty and wood care.",
    card: "from-orange-500 to-orange-600",
  },
  {
    key: "Zen",
    slug: "zen",
    label: "ZEN",
    company: "by Kaizen Paint",
    blurb:
      "Smart-value emulsions, enamels, putty and primers for every budget.",
    card: "from-red-500 to-red-600",
  },
  {
    key: "Nippon",
    slug: "nippon",
    label: "Nippon",
    company: "Nippon Paint",
    blurb: "Trusted Japanese-technology paints, primers and coatings.",
    card: "from-blue-500 to-blue-600",
  },
];

const BY_KEY = Object.fromEntries(BRANDS.map((b) => [b.key, b])) as Record<
  Brand,
  BrandInfo
>;

const BY_SLUG: Record<string, Brand> = {
  neo: "Neo",
  zen: "Zen",
  nippon: "Nippon",
};

export function brandInfo(key: Brand): BrandInfo {
  return BY_KEY[key];
}

/** Resolve a URL value to a brand, "all", or null (no/invalid value). */
export function resolveBrand(
  value: string | null | undefined,
): Brand | "all" | null {
  if (!value) return null;
  const v = value.toLowerCase();
  if (v === "all") return "all";
  return BY_SLUG[v] ?? null;
}
