import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Brand, Product, Variant } from "@/lib/types";

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
    pack_size: string;
    retail_price: number;
    sales_tax: number;
    total_price: number;
    sort_order: number;
  }[];
  categories: { name: string } | null;
}

/** A Product with admin-only fields surfaced. */
export interface AdminProduct extends Product {
  hidden: boolean;
  featured: boolean;
}

function toAdminProduct(row: DbProductRow): AdminProduct {
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
    hidden: row.hidden,
    featured: row.featured,
  };
}

const PRODUCT_SELECT = "*, variants (*), categories (name)";

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("sr_no");
  if (error) throw error;
  return (data as unknown as DbProductRow[]).map(toAdminProduct);
}

export async function getAdminProductById(
  id: string,
): Promise<AdminProduct | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toAdminProduct(data as unknown as DbProductRow) : undefined;
}
