import "server-only";

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

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await client()
    .from("categories")
    .select(CATEGORY_SELECT)
    .order("sort_order");
  if (error) throw error;
  return (data as DbCategoryRow[]).map(toCategory);
}

export async function getCategoryBySlug(
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

export async function getCategorySlugs(): Promise<string[]> {
  const { data, error } = await client()
    .from("categories")
    .select("slug")
    .order("sort_order");
  if (error) throw error;
  return (data as { slug: string }[]).map((r) => r.slug);
}
