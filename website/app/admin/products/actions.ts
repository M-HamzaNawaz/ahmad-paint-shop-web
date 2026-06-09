"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Brand } from "@/lib/types";

export interface VariantInput {
  pack_size: string;
  total_price: number;
}

export interface ProductInput {
  /** Set for edits, omitted for new products (id is auto-generated). */
  id?: string;
  name: string;
  brand: Brand;
  product_line: string;
  category_slug: string;
  description: string;
  note: string;
  image: string;
  featured: boolean;
  hidden: boolean;
  variants: VariantInput[];
}

export interface ActionResult {
  error?: string;
  productId?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateProductId(name: string, productLine: string): string {
  const base = slugify(name);
  return productLine.trim() ? `${base}-${slugify(productLine)}` : base;
}

function computeVariantPrices(totalPrice: number) {
  const retail_price = Math.round((totalPrice / 1.18) * 100) / 100;
  const sales_tax = Math.round((totalPrice - retail_price) * 100) / 100;
  return { retail_price, sales_tax };
}

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  return supabase;
}

export async function saveProduct(input: ProductInput): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();

    // Validate
    if (!input.name.trim()) return { error: "Name is required." };
    if (!input.category_slug) return { error: "Category is required." };
    if (input.variants.length === 0) {
      return { error: "Add at least one pack size." };
    }
    for (const v of input.variants) {
      if (!v.pack_size.trim()) return { error: "Every pack must have a size." };
      if (!Number.isFinite(v.total_price) || v.total_price <= 0) {
        return { error: "Every pack must have a positive price." };
      }
    }

    const productId =
      input.id ?? generateProductId(input.name, input.product_line);
    const isNew = !input.id;

    // For new products, append at end of the sort order
    let sr_no: number | undefined;
    if (isNew) {
      const { data } = await supabase
        .from("products")
        .select("sr_no")
        .order("sr_no", { ascending: false })
        .limit(1)
        .maybeSingle();
      sr_no = (((data?.sr_no as number | undefined) ?? 0) || 0) + 1;
    }

    const productRow = {
      id: productId,
      name: input.name.trim(),
      brand: input.brand,
      product_line: input.product_line.trim(),
      category_slug: input.category_slug,
      description: input.description.trim(),
      note: input.note.trim() || null,
      image: input.image.trim() || null,
      featured: input.featured,
      hidden: input.hidden,
      ...(sr_no !== undefined ? { sr_no } : {}),
    };

    const { error: prodErr } = await supabase
      .from("products")
      .upsert(productRow);
    if (prodErr) return { error: prodErr.message };

    // Sync variants: delete all + re-insert. Simpler than diffing and
    // safe because variants are scoped to their product.
    const { error: delErr } = await supabase
      .from("variants")
      .delete()
      .eq("product_id", productId);
    if (delErr) return { error: delErr.message };

    const variantRows = input.variants.map((v, i) => {
      const { retail_price, sales_tax } = computeVariantPrices(v.total_price);
      return {
        id: `${productId}__v${i + 1}`,
        product_id: productId,
        pack_size: v.pack_size.trim(),
        retail_price,
        sales_tax,
        total_price: v.total_price,
        sort_order: i,
      };
    });
    const { error: varErr } = await supabase
      .from("variants")
      .insert(variantRows);
    if (varErr) return { error: varErr.message };

    updateTag("products");
    revalidatePath("/", "layout");
    return { productId };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return { error: error.message };
    updateTag("products");
    revalidatePath("/", "layout");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export async function toggleProductField(
  id: string,
  field: "hidden" | "featured",
  value: boolean,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();
    const { error } = await supabase
      .from("products")
      .update({ [field]: value })
      .eq("id", id);
    if (error) return { error: error.message };
    updateTag("products");
    revalidatePath("/", "layout");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}
