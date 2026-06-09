import "server-only";

import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Brand, Product, Variant } from "@/lib/types";

// Read-only Supabase client for public product reads.
// Uses the publishable key, no cookies/session — works at build-time
// (generateStaticParams) and at request time alike.
let cachedClient: ReturnType<typeof createClient> | null = null;
function client() {
  if (!cachedClient) {
    cachedClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return cachedClient;
}

interface DbProductRow {
  id: string;
  sr_no: number;
  name: string;
  brand: Brand;
  product_line: string;
  category_slug: string;
  description: string;
  note: string | null;
  image: string | null;
  featured: boolean;
  hidden: boolean;
  details: Product["details"] | null;
  variants: {
    id: string;
    product_id: string;
    pack_size: string;
    retail_price: number;
    sales_tax: number;
    total_price: number;
    sort_order: number;
  }[];
  categories: { name: string } | null;
}

function toProduct(row: DbProductRow): Product {
  const variants: Variant[] = (row.variants ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => ({
      id: v.id,
      packSize: v.pack_size,
      retailPrice: Number(v.retail_price),
      salesTax: Number(v.sales_tax),
      totalPrice: Number(v.total_price),
      inStock: true,
    }));
  const prices = variants.map((v) => v.totalPrice);
  return {
    id: row.id,
    srNo: row.sr_no,
    name: row.name,
    brand: row.brand,
    productLine: row.product_line,
    categorySlug: row.category_slug,
    categoryName: row.categories?.name ?? "",
    description: row.description,
    note: row.note,
    image: row.image ?? undefined,
    variants,
    details: row.details ?? undefined,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
  };
}

const PRODUCT_SELECT = "*, variants (*), categories (name)";

// ─── Uncached implementations ─────────────────────────────────────────
async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await client()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("hidden", false)
    .order("sr_no");
  if (error) throw error;
  return (data as unknown as DbProductRow[]).map(toProduct);
}

async function fetchProductById(id: string): Promise<Product | undefined> {
  const { data, error } = await client()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .eq("hidden", false)
    .maybeSingle();
  if (error) throw error;
  return data ? toProduct(data as unknown as DbProductRow) : undefined;
}

async function fetchFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await client()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("hidden", false)
    .eq("featured", true)
    .order("sr_no");
  if (error) throw error;
  return (data as unknown as DbProductRow[]).map(toProduct);
}

async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  const { data, error } = await client()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("hidden", false)
    .eq("category_slug", slug)
    .order("sr_no");
  if (error) throw error;
  return (data as unknown as DbProductRow[]).map(toProduct);
}

async function fetchProductsByBrand(brand: Brand): Promise<Product[]> {
  const { data, error } = await client()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("hidden", false)
    .eq("brand", brand)
    .order("sr_no");
  if (error) throw error;
  return (data as unknown as DbProductRow[]).map(toProduct);
}

async function fetchProductsByCategoryAndBrand(
  slug: string,
  brand: Brand,
): Promise<Product[]> {
  const { data, error } = await client()
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("hidden", false)
    .eq("category_slug", slug)
    .eq("brand", brand)
    .order("sr_no");
  if (error) throw error;
  return (data as unknown as DbProductRow[]).map(toProduct);
}

async function fetchBrandsInCategory(slug: string): Promise<Brand[]> {
  const { data, error } = await client()
    .from("products")
    .select("brand")
    .eq("hidden", false)
    .eq("category_slug", slug);
  if (error) throw error;
  const set = new Set<Brand>();
  (data as { brand: Brand }[]).forEach((row) => set.add(row.brand));
  return Array.from(set);
}

async function fetchCategoryProductCount(slug: string): Promise<number> {
  const { count, error } = await client()
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("hidden", false)
    .eq("category_slug", slug);
  if (error) throw error;
  return count ?? 0;
}

async function fetchCountProductsByBrand(): Promise<Record<Brand, number>> {
  const { data, error } = await client()
    .from("products")
    .select("brand")
    .eq("hidden", false);
  if (error) throw error;
  const counts: Record<Brand, number> = { Neo: 0, Zen: 0, Nippon: 0 };
  (data as { brand: Brand }[]).forEach((row) => counts[row.brand]++);
  return counts;
}

// ─── Cached exports ───────────────────────────────────────────────────
// Products change occasionally. 1 min cache + immediate `revalidateTag`
// in admin save/delete/toggle actions for instant updates.
export const PRODUCTS_TAG = "products";
const TTL = 60;
const TAGS = { revalidate: TTL, tags: [PRODUCTS_TAG] };

export const getAllProducts = unstable_cache(
  fetchAllProducts,
  ["db:products:all"],
  TAGS,
);

export const getProductById = unstable_cache(
  fetchProductById,
  ["db:products:by-id"],
  TAGS,
);

export const getFeaturedProducts = unstable_cache(
  fetchFeaturedProducts,
  ["db:products:featured"],
  TAGS,
);

export const getProductsByCategory = unstable_cache(
  fetchProductsByCategory,
  ["db:products:by-category"],
  TAGS,
);

export const getProductsByBrand = unstable_cache(
  fetchProductsByBrand,
  ["db:products:by-brand"],
  TAGS,
);

export const getProductsByCategoryAndBrand = unstable_cache(
  fetchProductsByCategoryAndBrand,
  ["db:products:by-category-and-brand"],
  TAGS,
);

export const getBrandsInCategory = unstable_cache(
  fetchBrandsInCategory,
  ["db:products:brands-in-category"],
  TAGS,
);

export const getCategoryProductCount = unstable_cache(
  fetchCategoryProductCount,
  ["db:products:category-count"],
  TAGS,
);

export const countProductsByBrand = unstable_cache(
  fetchCountProductsByBrand,
  ["db:products:brand-counts"],
  TAGS,
);
