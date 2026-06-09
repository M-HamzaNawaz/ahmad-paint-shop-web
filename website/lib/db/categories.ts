import "server-only";

import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Category } from "@/lib/types";

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

interface DbCategoryRow {
  slug: string;
  name: string;
  description: string;
  gradient: string;
  sort_order: number;
}

function toCategory(row: DbCategoryRow): Category {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    gradient: row.gradient,
  };
}

const CATEGORY_SELECT = "slug, name, description, gradient, sort_order";

// ─── Uncached implementations ─────────────────────────────────────────
async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await client()
    .from("categories")
    .select(CATEGORY_SELECT)
    .order("sort_order");
  if (error) throw error;
  return (data as DbCategoryRow[]).map(toCategory);
}

async function fetchCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  const { data, error } = await client()
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? toCategory(data as DbCategoryRow) : undefined;
}

async function fetchCategorySlugs(): Promise<string[]> {
  const { data, error } = await client()
    .from("categories")
    .select("slug")
    .order("sort_order");
  if (error) throw error;
  return (data as { slug: string }[]).map((r) => r.slug);
}

// ─── Cached exports ───────────────────────────────────────────────────
// Categories rarely change. 5 min cache + immediate `revalidateTag` in
// admin actions when categories are added/edited/deleted.
const CATEGORY_TAG = "categories";
const TTL = 300;

export const getCategories = unstable_cache(
  fetchCategories,
  ["db:categories:all"],
  { revalidate: TTL, tags: [CATEGORY_TAG] },
);

export const getCategoryBySlug = unstable_cache(
  fetchCategoryBySlug,
  ["db:categories:by-slug"],
  { revalidate: TTL, tags: [CATEGORY_TAG] },
);

export const getCategorySlugs = unstable_cache(
  fetchCategorySlugs,
  ["db:categories:slugs"],
  { revalidate: TTL, tags: [CATEGORY_TAG] },
);
