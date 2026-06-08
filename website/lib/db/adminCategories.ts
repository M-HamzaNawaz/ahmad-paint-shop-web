import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";

interface DbCategoryRow {
  slug: string;
  name: string;
  description: string;
  gradient: string;
  sort_order: number;
}

export interface AdminCategory extends Category {
  productCount: number;
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const supabase = await createClient();

  const [{ data: categoriesData, error: catErr }, { data: productsData }] =
    await Promise.all([
      supabase
        .from("categories")
        .select("slug, name, description, gradient, sort_order")
        .order("sort_order"),
      supabase.from("products").select("category_slug"),
    ]);
  if (catErr) throw catErr;

  // Tally product counts per category in JS — simpler than RPC.
  const counts = new Map<string, number>();
  for (const row of (productsData ?? []) as { category_slug: string }[]) {
    counts.set(row.category_slug, (counts.get(row.category_slug) ?? 0) + 1);
  }

  return (categoriesData as DbCategoryRow[]).map((row) => ({
    slug: row.slug,
    name: row.name,
    description: row.description,
    gradient: row.gradient,
    productCount: counts.get(row.slug) ?? 0,
  }));
}

export async function getAdminCategoryBySlug(
  slug: string,
): Promise<AdminCategory | undefined> {
  const supabase = await createClient();
  const [{ data: row, error }, { count }] = await Promise.all([
    supabase
      .from("categories")
      .select("slug, name, description, gradient, sort_order")
      .eq("slug", slug)
      .maybeSingle(),
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("category_slug", slug),
  ]);
  if (error) throw error;
  if (!row) return undefined;
  const r = row as DbCategoryRow;
  return {
    slug: r.slug,
    name: r.name,
    description: r.description,
    gradient: r.gradient,
    productCount: count ?? 0,
  };
}
