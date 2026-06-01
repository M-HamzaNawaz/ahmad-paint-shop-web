// Product catalogue for Ahmad Paint House.
// Data extracted from the Kaizen Paint Consumer Price List (effective 20 April 2026).
// All prices in PKR. `totalPrice` is the customer-facing price (retail + 18% tax).
//
// NOTE: For the live version, this data will be served from the database and
// managed through the Admin Panel. This file is the catalogue seed.

import type { Brand, Category, Product, Variant } from "./types";
import { PRODUCT_DETAILS } from "./productDetails";
import { PRODUCT_IMAGES } from "./productImages";
import { NIPPON_RAW_PRODUCTS } from "./nipponProducts";

export const CATEGORIES: Category[] = [
  {
    slug: "interior-emulsions",
    name: "Interior Emulsions",
    description: "Smooth, washable wall paints for beautiful interior surfaces.",
    gradient: "from-sky-100 to-blue-200",
  },
  {
    slug: "exterior-emulsions",
    name: "Exterior Emulsions",
    description: "Weather-resistant paints that protect outside walls from sun and rain.",
    gradient: "from-emerald-100 to-teal-200",
  },
  {
    slug: "enamels",
    name: "Enamels",
    description: "Glossy and matt finishes for wood and metal surfaces.",
    gradient: "from-violet-100 to-purple-200",
  },
  {
    slug: "putty",
    name: "Putty",
    description: "Wall putty for a smooth, level surface before painting.",
    gradient: "from-amber-100 to-yellow-200",
  },
  {
    slug: "primers",
    name: "Primers",
    description: "Base coats that seal surfaces and improve paint adhesion.",
    gradient: "from-rose-100 to-red-200",
  },
  {
    slug: "wood-care",
    name: "Wood Care",
    description: "Sealers, lacquers and varnishes that protect and enhance timber.",
    gradient: "from-orange-100 to-amber-200",
  },
  {
    slug: "others",
    name: "Others",
    description: "Specialty products including decorative texture finishes.",
    gradient: "from-zinc-100 to-slate-200",
  },
];

export interface RawVariant {
  packSize: string;
  /** Pre-tax price — computed from totalPrice when omitted. */
  retailPrice?: number;
  /** 18% tax amount — computed from totalPrice when omitted. */
  salesTax?: number;
  /** Customer-facing price, inclusive of tax. */
  totalPrice: number;
}

export interface RawProduct {
  srNo: number;
  name: string;
  /** Product code (e.g. "N920"), or "" for products without a code. */
  productLine: string;
  categorySlug: string;
  brand: Brand;
  note: string | null;
  description: string;
  variants: RawVariant[];
  /** Optional product photo path, e.g. "/products/foo.jpg". */
  image?: string;
}

const KAIZEN_RAW_PRODUCTS: RawProduct[] = [
  {
    srNo: 1,
    name: "Neo Stain Guard",
    productLine: "N920",
    categorySlug: "interior-emulsions",
    brand: "Neo",
    note: null,
    description:
      "Premium stain-resistant interior emulsion that keeps walls looking fresh and is easy to wipe clean.",
    variants: [
      { packSize: "1 Ltr", retailPrice: 1758.47, salesTax: 316.53, totalPrice: 2075 },
      { packSize: "4 Ltrs", retailPrice: 6475.42, salesTax: 1165.58, totalPrice: 7641 },
      { packSize: "16 Ltrs", retailPrice: 25461.86, salesTax: 4583.14, totalPrice: 30045 },
    ],
  },
  {
    srNo: 2,
    name: "Neo Silk Water Matt",
    productLine: "N941",
    categorySlug: "interior-emulsions",
    brand: "Neo",
    note: "Only available on K-Spectrum",
    description:
      "Silky matt finish interior emulsion that gives walls a soft, elegant and smooth look.",
    variants: [
      { packSize: "1 Ltr", retailPrice: 1554.24, salesTax: 279.76, totalPrice: 1834 },
      { packSize: "4 Ltrs", retailPrice: 5718.64, salesTax: 1029.36, totalPrice: 6748 },
      { packSize: "16 Ltrs", retailPrice: 22167.8, salesTax: 3990.2, totalPrice: 26158 },
    ],
  },
  {
    srNo: 3,
    name: "Neo Premium Interior Emulsion",
    productLine: "N930",
    categorySlug: "interior-emulsions",
    brand: "Neo",
    note: null,
    description:
      "High-quality interior emulsion offering excellent coverage and a smooth matt finish.",
    variants: [
      { packSize: "1 Ltr", retailPrice: 1207.63, salesTax: 217.37, totalPrice: 1425 },
      { packSize: "4 Ltrs", retailPrice: 4420.34, salesTax: 795.66, totalPrice: 5216 },
      { packSize: "16 Ltrs", retailPrice: 17170.34, salesTax: 3090.66, totalPrice: 20261 },
    ],
  },
  {
    srNo: 4,
    name: "Neo Interior Plastic Emulsion",
    productLine: "N949",
    categorySlug: "interior-emulsions",
    brand: "Neo",
    note: "Available only in selective shades",
    description:
      "Durable plastic emulsion for interior walls with a smooth, washable finish.",
    variants: [
      { packSize: "0.91 Ltrs", retailPrice: 908.47, salesTax: 163.53, totalPrice: 1072 },
      { packSize: "3.64 Ltrs", retailPrice: 3894.92, salesTax: 701.08, totalPrice: 4596 },
      { packSize: "14.56 Ltrs", retailPrice: 14382.2, salesTax: 2588.8, totalPrice: 16971 },
    ],
  },
  {
    srNo: 5,
    name: "Zen Wall Care Interior Emulsion",
    productLine: "N950",
    categorySlug: "interior-emulsions",
    brand: "Zen",
    note: null,
    description:
      "Economical interior emulsion that gives walls a clean, even and pleasant finish.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 671.19, salesTax: 120.81, totalPrice: 792 },
      { packSize: "3.64 Ltrs", retailPrice: 2481.36, salesTax: 446.64, totalPrice: 2928 },
      { packSize: "14.56 Ltrs", retailPrice: 9155.08, salesTax: 1647.92, totalPrice: 10803 },
    ],
  },
  {
    srNo: 6,
    name: "Zen Interior Emulsion",
    productLine: "N914",
    categorySlug: "interior-emulsions",
    brand: "Zen",
    note: null,
    description:
      "Value interior emulsion for budget-friendly wall painting with a neat finish.",
    variants: [
      { packSize: "1.5 Kgs", retailPrice: 571.19, salesTax: 102.81, totalPrice: 674 },
      { packSize: "6 Kgs", retailPrice: 1941.53, salesTax: 349.47, totalPrice: 2291 },
      { packSize: "24 Kgs", retailPrice: 7396.61, salesTax: 1331.39, totalPrice: 8728 },
    ],
  },
  {
    srNo: 7,
    name: "Neo Premium Exterior Emulsion",
    productLine: "N925",
    categorySlug: "exterior-emulsions",
    brand: "Neo",
    note: null,
    description:
      "Weather-resistant exterior emulsion that protects outside walls against sun and rain.",
    variants: [
      { packSize: "1 Ltr", retailPrice: 1450.85, salesTax: 261.15, totalPrice: 1712 },
      { packSize: "4 Ltrs", retailPrice: 5335.59, salesTax: 960.41, totalPrice: 6296 },
      { packSize: "16 Ltrs", retailPrice: 20662.71, salesTax: 3719.29, totalPrice: 24382 },
    ],
  },
  {
    srNo: 8,
    name: "Neo Power Guard",
    productLine: "N945",
    categorySlug: "exterior-emulsions",
    brand: "Neo",
    note: "Available only in selective shades",
    description:
      "Tough exterior coating with extra protection against harsh weather conditions.",
    variants: [
      { packSize: "4 Ltrs", retailPrice: 4166.95, salesTax: 750.05, totalPrice: 4917 },
      { packSize: "16 Ltrs", retailPrice: 15885.59, salesTax: 2859.41, totalPrice: 18745 },
    ],
  },
  {
    srNo: 9,
    name: "Neo Premium Matt Enamel",
    productLine: "N312",
    categorySlug: "enamels",
    brand: "Neo",
    note: null,
    description:
      "Premium matt enamel for wood and metal surfaces with a smooth, non-glossy finish.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 1650.85, salesTax: 297.15, totalPrice: 1948 },
      { packSize: "3.64 Ltrs", retailPrice: 6048.31, salesTax: 1088.69, totalPrice: 7137 },
    ],
  },
  {
    srNo: 10,
    name: "Neo Premium Gloss Metallic Finish",
    productLine: "N421",
    categorySlug: "enamels",
    brand: "Neo",
    note: null,
    description:
      "Eye-catching metallic gloss enamel for decorative wood and metal surfaces.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 1169.49, salesTax: 210.51, totalPrice: 1380 },
      { packSize: "3.64 Ltrs", retailPrice: 4220.34, salesTax: 759.66, totalPrice: 4980 },
    ],
  },
  {
    srNo: 11,
    name: "Neo Super Premium Enamel",
    productLine: "N310",
    categorySlug: "enamels",
    brand: "Neo",
    note: "Only available on K-Spectrum",
    description:
      "Top-tier enamel delivering a hard, durable and high-gloss finish on wood and metal.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 1301.69, salesTax: 234.31, totalPrice: 1536 },
      { packSize: "3.64 Ltrs", retailPrice: 4835.59, salesTax: 870.41, totalPrice: 5706 },
    ],
  },
  {
    srNo: 12,
    name: "Zen Gloss Enamel",
    productLine: "N311",
    categorySlug: "enamels",
    brand: "Zen",
    note: "Standard shades",
    description:
      "Glossy enamel for wood and metal surfaces with a bright, durable shine.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 1077.97, salesTax: 194.03, totalPrice: 1272 },
      { packSize: "3.64 Ltrs", retailPrice: 4121.19, salesTax: 741.81, totalPrice: 4863 },
    ],
  },
  {
    srNo: 12,
    name: "Zen Gloss Enamel - Special Shades",
    productLine: "N311",
    categorySlug: "enamels",
    brand: "Zen",
    note: "Orange, Signal Red, New Signal Red, Signal Green, Golden Yellow",
    description:
      "Zen Gloss Enamel in vivid special shades — a bright, durable, high-gloss finish.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 1207.63, salesTax: 217.37, totalPrice: 1425 },
      { packSize: "3.64 Ltrs", retailPrice: 4514.41, salesTax: 812.59, totalPrice: 5327 },
    ],
  },
  {
    srNo: 13,
    name: "Neo Premium Sheesha Wall Putty",
    productLine: "N963",
    categorySlug: "putty",
    brand: "Neo",
    note: null,
    description:
      "Premium wall putty for an ultra-smooth, glass-like wall surface before painting.",
    variants: [
      { packSize: "20 Kgs", retailPrice: 6101.69, salesTax: 1098.31, totalPrice: 7200 },
    ],
  },
  {
    srNo: 14,
    name: "Neo Premium Exterior Wall Putty",
    productLine: "N958",
    categorySlug: "putty",
    brand: "Neo",
    note: null,
    description:
      "Weather-resistant wall putty for smoothing exterior walls before painting.",
    variants: [
      { packSize: "20 Kgs", retailPrice: 7070.34, salesTax: 1272.66, totalPrice: 8343 },
    ],
  },
  {
    srNo: 15,
    name: "Neo Premium Wall Putty",
    productLine: "N957",
    categorySlug: "putty",
    brand: "Neo",
    note: null,
    description:
      "Premium putty that levels interior walls for a flawless paint finish.",
    variants: [
      { packSize: "20 Kgs", retailPrice: 6073.73, salesTax: 1093.27, totalPrice: 7167 },
    ],
  },
  {
    srNo: 16,
    name: "Zen Wall Putty Plus",
    productLine: "N962",
    categorySlug: "putty",
    brand: "Zen",
    note: null,
    description:
      "Value wall putty that smooths walls evenly for a clean paint finish.",
    variants: [
      { packSize: "5 Kgs", retailPrice: 1235.59, salesTax: 222.41, totalPrice: 1458 },
      { packSize: "20 Kgs", retailPrice: 4340.68, salesTax: 781.32, totalPrice: 5122 },
    ],
  },
  {
    srNo: 18,
    name: "Zen Putty",
    productLine: "N959-0088",
    categorySlug: "putty",
    brand: "Zen",
    note: null,
    description: "Economical wall putty for everyday wall preparation.",
    variants: [
      { packSize: "18 Kgs", retailPrice: 3739.83, salesTax: 673.17, totalPrice: 4413 },
    ],
  },
  {
    srNo: 19,
    name: "Zen Putty (Fragrant & White Drummie)",
    productLine: "N959-0090",
    categorySlug: "putty",
    brand: "Zen",
    note: null,
    description:
      "Wall putty with a pleasant fragrance and a clean white finish.",
    variants: [
      { packSize: "18 Kgs", retailPrice: 3964.41, salesTax: 713.59, totalPrice: 4678 },
    ],
  },
  {
    srNo: 20,
    name: "Neo Wall Primer (Oil)",
    productLine: "N515",
    categorySlug: "primers",
    brand: "Neo",
    note: null,
    description:
      "Oil-based wall primer that seals surfaces for stronger paint adhesion.",
    variants: [
      { packSize: "0.91 Ltrs", retailPrice: 1172.88, salesTax: 211.12, totalPrice: 1384 },
      { packSize: "3.64 Ltrs", retailPrice: 4190.68, salesTax: 754.32, totalPrice: 4945 },
      { packSize: "14.56 Ltrs", retailPrice: 15721.19, salesTax: 2829.81, totalPrice: 18551 },
    ],
  },
  {
    srNo: 21,
    name: "Neo Water Based Primer",
    productLine: "N915",
    categorySlug: "primers",
    brand: "Neo",
    note: null,
    description:
      "Water-based primer for quick-drying surface preparation before painting.",
    variants: [
      { packSize: "4 Ltrs", retailPrice: 3114.41, salesTax: 560.59, totalPrice: 3675 },
      { packSize: "16 Ltrs", retailPrice: 11876.27, salesTax: 2137.73, totalPrice: 14014 },
    ],
  },
  {
    srNo: 22,
    name: "Neo Red Oxide Primer",
    productLine: "N530",
    categorySlug: "primers",
    brand: "Neo",
    note: null,
    description:
      "Anti-rust red oxide primer that protects metal surfaces before painting.",
    variants: [
      { packSize: "0.91 Ltrs", retailPrice: 838.14, salesTax: 150.86, totalPrice: 989 },
      { packSize: "3.64 Ltrs", retailPrice: 3080.51, salesTax: 554.49, totalPrice: 3635 },
    ],
  },
  {
    srNo: 23,
    name: "ZEN WB Wall Primer & Sealer",
    productLine: "N915-0086",
    categorySlug: "primers",
    brand: "Zen",
    note: null,
    description:
      "Water-based primer and sealer that prepares and seals walls in one product.",
    variants: [
      { packSize: "3.64 Ltrs", retailPrice: 1547.46, salesTax: 278.54, totalPrice: 1826 },
      { packSize: "14.56 Ltrs", retailPrice: 5444.07, salesTax: 979.93, totalPrice: 6424 },
    ],
  },
  {
    srNo: 24,
    name: "Neo Wood Thinner",
    productLine: "N841",
    categorySlug: "wood-care",
    brand: "Neo",
    note: null,
    description:
      "Thinner for adjusting the consistency of wood-care products.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 887.29, salesTax: 159.71, totalPrice: 1047 },
      { packSize: "3.64 Ltrs", retailPrice: 3188.98, salesTax: 574.02, totalPrice: 3763 },
    ],
  },
  {
    srNo: 25,
    name: "Neo Premium Wood Sealer",
    productLine: "N015",
    categorySlug: "wood-care",
    brand: "Neo",
    note: null,
    description:
      "Wood sealer that prepares timber surfaces for lacquer or varnish.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 1734.75, salesTax: 312.25, totalPrice: 2047 },
      { packSize: "3.64 Ltrs", retailPrice: 6577.12, salesTax: 1183.88, totalPrice: 7761 },
    ],
  },
  {
    srNo: 26,
    name: "Neo Premium Wood Lacquer Matt",
    productLine: "N018-3333",
    categorySlug: "wood-care",
    brand: "Neo",
    note: null,
    description:
      "Premium matt lacquer that protects wood with a natural, non-glossy finish.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 2155.08, salesTax: 387.92, totalPrice: 2543 },
      { packSize: "3.64 Ltrs", retailPrice: 7746.61, salesTax: 1394.39, totalPrice: 9141 },
    ],
  },
  {
    srNo: 27,
    name: "Neo Wood Lacquer Gloss",
    productLine: "N018-3332",
    categorySlug: "wood-care",
    brand: "Neo",
    note: null,
    description:
      "Glossy wood lacquer that protects and enhances timber with a rich shine.",
    variants: [
      { packSize: "0.91 Ltr", retailPrice: 2155.08, salesTax: 387.92, totalPrice: 2543 },
      { packSize: "3.64 Ltrs", retailPrice: 7746.61, salesTax: 1394.39, totalPrice: 9141 },
    ],
  },
  {
    srNo: 28,
    name: "Neo Varnish",
    productLine: "N105-0120",
    categorySlug: "wood-care",
    brand: "Neo",
    note: null,
    description:
      "Protective varnish that gives wood a durable, attractive coating.",
    variants: [
      { packSize: "0.75 Ltr", retailPrice: 1023.73, salesTax: 184.27, totalPrice: 1208 },
      { packSize: "3.00 Ltrs", retailPrice: 3661.02, salesTax: 658.98, totalPrice: 4320 },
    ],
  },
  {
    srNo: 29,
    name: "Neo Timber Varnish - Gloss",
    productLine: "N105-0121",
    categorySlug: "wood-care",
    brand: "Neo",
    note: null,
    description:
      "Glossy timber varnish for long-lasting protection and shine on wood.",
    variants: [
      { packSize: "1 Ltr", retailPrice: 1662.71, salesTax: 299.29, totalPrice: 1962 },
    ],
  },
  {
    srNo: 30,
    name: "Neo Timber Varnish - Matt",
    productLine: "N105-0122",
    categorySlug: "wood-care",
    brand: "Neo",
    note: null,
    description:
      "Matt timber varnish for natural-looking, durable wood protection.",
    variants: [
      { packSize: "1 Ltr", retailPrice: 2641.53, salesTax: 475.47, totalPrice: 3117 },
    ],
  },
  {
    srNo: 31,
    name: "Zen Texture",
    productLine: "N965",
    categorySlug: "others",
    brand: "Zen",
    note: null,
    description:
      "Decorative texture coating for stylish, patterned wall finishes.",
    variants: [
      { packSize: "20 Kgs", retailPrice: 5384.75, salesTax: 969.25, totalPrice: 6354 },
    ],
  },
];

/** All raw products — Kaizen (NEO & ZEN) followed by Nippon Paint. */
const RAW_PRODUCTS: RawProduct[] = [
  ...KAIZEN_RAW_PRODUCTS,
  ...NIPPON_RAW_PRODUCTS,
];

/** Convert a string into a URL-safe slug. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORY_NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name]),
);

/** Built product list with generated ids and price ranges. */
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((raw) => {
  const id = raw.productLine
    ? `${slugify(raw.name)}-${slugify(raw.productLine)}`
    : slugify(raw.name);
  const variants: Variant[] = raw.variants.map((v, index) => {
    const totalPrice = v.totalPrice;
    const retailPrice =
      v.retailPrice ?? Math.round((totalPrice / 1.18) * 100) / 100;
    const salesTax =
      v.salesTax ?? Math.round((totalPrice - retailPrice) * 100) / 100;
    return {
      id: `${id}__v${index + 1}`,
      packSize: v.packSize,
      retailPrice,
      salesTax,
      totalPrice,
      inStock: true,
    };
  });
  const prices = variants.map((v) => v.totalPrice);
  return {
    id,
    srNo: raw.srNo,
    name: raw.name,
    productLine: raw.productLine,
    brand: raw.brand,
    categorySlug: raw.categorySlug,
    categoryName: CATEGORY_NAME_BY_SLUG[raw.categorySlug] ?? raw.categorySlug,
    note: raw.note,
    description: raw.description,
    variants,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    details: PRODUCT_DETAILS[id],
    image: raw.image ?? PRODUCT_IMAGES[id],
  };
});

// ---- Query helpers -------------------------------------------------------

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === slug);
}

export function getProductsByBrand(brand: Brand): Product[] {
  return PRODUCTS.filter((p) => p.brand === brand);
}

export function getProductsByCategoryAndBrand(
  categorySlug: string,
  brand: Brand,
): Product[] {
  return PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && p.brand === brand,
  );
}

/** Brands that have at least one product in a category (ordered Neo, Zen, Nippon). */
export function getBrandsInCategory(categorySlug: string): Brand[] {
  const order: Brand[] = ["Neo", "Zen", "Nippon"];
  const present = new Set(
    getProductsByCategory(categorySlug).map((p) => p.brand),
  );
  return order.filter((b) => present.has(b));
}

export function getCategoryProductCount(slug: string): number {
  return PRODUCTS.filter((p) => p.categorySlug === slug).length;
}

const FEATURED_IDS = [
  "neo-stain-guard-n920",
  "neo-premium-interior-emulsion-n930",
  "nippon-spot-less-matt-emulsion",
  "neo-premium-exterior-emulsion-n925",
  "nippon-weatherbond",
  "neo-premium-matt-enamel-n312",
  "nippon-satin-glo-matt-enamel",
  "neo-premium-wall-putty-n957",
  "nippon-perfect-emulsion",
  "neo-wall-primer-oil-n515",
  "zen-interior-emulsion-n914",
  "neo-premium-wood-sealer-n015",
];

export function getFeaturedProducts(): Product[] {
  return FEATURED_IDS.map((id) => getProductById(id)).filter(
    (p): p is Product => Boolean(p),
  );
}

export function getVariant(
  product: Product,
  variantId: string,
): Variant | undefined {
  return product.variants.find((v) => v.id === variantId);
}
