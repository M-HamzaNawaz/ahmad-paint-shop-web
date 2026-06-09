"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface CategoryInput {
  /** Present on edit. Original slug used as lookup. */
  originalSlug?: string;
  slug: string;
  name: string;
  description: string;
  gradient: string;
}

export interface ActionResult {
  error?: string;
  slug?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  return supabase;
}

export async function saveCategory(
  input: CategoryInput,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();

    const finalSlug = slugify(input.slug || input.name);
    if (!finalSlug) return { error: "Slug or name is required." };
    if (!input.name.trim()) return { error: "Name is required." };
    if (!input.gradient.trim()) return { error: "Gradient is required." };

    const isNew = !input.originalSlug;
    const isRename = !isNew && input.originalSlug !== finalSlug;

    // Refuse rename if any products use this category (FK is RESTRICT)
    if (isRename) {
      const { count } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("category_slug", input.originalSlug);
      if ((count ?? 0) > 0) {
        return {
          error: `${count} products still use the slug "${input.originalSlug}". Move them to another category before changing the slug.`,
        };
      }
      // And ensure new slug isn't taken
      const { data: clash } = await supabase
        .from("categories")
        .select("slug")
        .eq("slug", finalSlug)
        .maybeSingle();
      if (clash) {
        return {
          error: `The slug "${finalSlug}" is already taken by another category.`,
        };
      }
    }

    // Assign sort_order for new entries (append at end)
    let sort_order: number | undefined;
    if (isNew) {
      const { data: last } = await supabase
        .from("categories")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      sort_order = (((last?.sort_order as number | undefined) ?? -1) || -1) + 1;
    }

    const row = {
      slug: finalSlug,
      name: input.name.trim(),
      description: input.description.trim(),
      gradient: input.gradient.trim(),
      ...(sort_order !== undefined ? { sort_order } : {}),
    };

    if (isRename) {
      // Delete old + insert new (verified no products reference it)
      const { error: delErr } = await supabase
        .from("categories")
        .delete()
        .eq("slug", input.originalSlug);
      if (delErr) return { error: delErr.message };
      const { error: insErr } = await supabase.from("categories").insert(row);
      if (insErr) return { error: insErr.message };
    } else if (isNew) {
      const { error: insErr } = await supabase.from("categories").insert(row);
      if (insErr) return { error: insErr.message };
    } else {
      const { error: updErr } = await supabase
        .from("categories")
        .update(row)
        .eq("slug", input.originalSlug);
      if (updErr) return { error: updErr.message };
    }

    updateTag("categories");
    updateTag("products"); // products reference categories
    revalidatePath("/", "layout");
    return { slug: finalSlug };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export async function deleteCategory(slug: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();

    const { count } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("category_slug", slug);
    if ((count ?? 0) > 0) {
      return {
        error: `${count} products still use this category. Move or delete them first.`,
      };
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("slug", slug);
    if (error) return { error: error.message };

    updateTag("categories");
    updateTag("products"); // products reference categories
    revalidatePath("/", "layout");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}
