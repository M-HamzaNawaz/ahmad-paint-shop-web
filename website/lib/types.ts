// Shared TypeScript types for Ahmad Paint House.

export type Brand = "Neo" | "Zen" | "Nippon";

export interface Variant {
  /** Unique id for this pack-size option. */
  id: string;
  /** e.g. "1 Ltr", "20 Kgs". */
  packSize: string;
  /** Pre-tax price from the Kaizen price list. */
  retailPrice: number;
  /** 18% sales tax amount. */
  salesTax: number;
  /** Customer-facing selling price (retail + tax). */
  totalPrice: number;
  inStock: boolean;
}

/** A single paint colour / shade. */
export interface ColorShade {
  name: string;
  /** Shade number, e.g. "2201". */
  code: string;
  /** Approximate hex colour for display. */
  hex: string;
}

/** A named group of colour shades, e.g. "Standard Shades". */
export interface ColorGroup {
  label: string;
  /** True for metallic shades (rendered with a sheen). */
  metallic?: boolean;
  shades: ColorShade[];
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

/** Rich detail for a product — features, specs and colour shades. */
export interface ProductDetails {
  overview?: string;
  features?: ProductFeature[];
  specs?: ProductSpec[];
  recommendedAreas?: string;
  colorGroups?: ColorGroup[];
}

export interface Product {
  /** URL slug, e.g. "neo-stain-guard-n920". */
  id: string;
  /** Serial number from the price list. */
  srNo: number;
  name: string;
  /** Kaizen product code, e.g. "N920". */
  productLine: string;
  brand: Brand;
  categorySlug: string;
  categoryName: string;
  /** Special availability note, if any. */
  note: string | null;
  description: string;
  variants: Variant[];
  /** Lowest pack price. */
  minPrice: number;
  /** Highest pack price. */
  maxPrice: number;
  /** Optional rich detail (features, specs, colours). */
  details?: ProductDetails;
  /** Optional product photo path, e.g. "/products/neo-stain-guard.jpg". */
  image?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Tailwind gradient classes for the category tile / placeholder. */
  gradient: string;
}

export interface CartItem {
  /** Unique per variant + colour combination. */
  lineId: string;
  variantId: string;
  productId: string;
  productName: string;
  productLine: string;
  brand: Brand;
  packSize: string;
  unitPrice: number;
  quantity: number;
  /** Chosen colour, if the product has colour shades. */
  colorName?: string;
  colorCode?: string;
  colorHex?: string;
}

export interface OrderCustomer {
  name: string;
  whatsapp: string;
  address: string;
  notes: string;
}

export interface Order {
  orderNumber: string;
  /** ISO timestamp. */
  createdAt: string;
  items: CartItem[];
  totalItems: number;
  orderTotal: number;
  customer: OrderCustomer;
}
