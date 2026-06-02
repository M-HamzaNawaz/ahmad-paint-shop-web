/**
 * One-time seed — populates the Supabase tables with the existing static
 * catalogue from lib/catalog.ts + lib/shop.ts.
 *
 * Run with:   npm run seed
 *
 * Re-runs are safe (uses upsert), so you can run it again if you tweak
 * the source data before fully cutting over to the database.
 */

import { createClient } from "@supabase/supabase-js";
import { CATEGORIES, getAllProducts, getFeaturedProducts } from "../lib/catalog";
import { SHOP } from "../lib/shop";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in env.\n" +
      "   Make sure both are set in .env.local, then run: npm run seed",
  );
  process.exit(1);
}

if (secretKey.includes("PASTE_YOUR")) {
  console.error(
    "❌ SUPABASE_SECRET_KEY is still the placeholder.\n" +
      "   Open .env.local and replace it with the real `sb_secret_…` key\n" +
      "   from Supabase → Project Settings → API → Secret keys.",
  );
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const featuredIds = new Set(getFeaturedProducts().map((p) => p.id));

  // 1. Categories
  console.log("→ Seeding categories…");
  const categoryRows = CATEGORIES.map((c, i) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    gradient: c.gradient,
    sort_order: i,
  }));
  const { error: catErr } = await supabase
    .from("categories")
    .upsert(categoryRows, { onConflict: "slug" });
  if (catErr) throw catErr;
  console.log(`  ✓ ${categoryRows.length} categories`);

  // 2. Products
  console.log("→ Seeding products…");
  const allProducts = getAllProducts();
  const productRows = allProducts.map((p) => ({
    id: p.id,
    sr_no: p.srNo,
    name: p.name,
    brand: p.brand,
    product_line: p.productLine,
    category_slug: p.categorySlug,
    description: p.description,
    note: p.note,
    image: p.image ?? null,
    featured: featuredIds.has(p.id),
    hidden: false,
    details: p.details ?? null,
  }));
  const { error: prodErr } = await supabase
    .from("products")
    .upsert(productRows, { onConflict: "id" });
  if (prodErr) throw prodErr;
  console.log(`  ✓ ${productRows.length} products`);

  // 3. Variants
  console.log("→ Seeding variants…");
  const variantRows = allProducts.flatMap((p) =>
    p.variants.map((v, i) => ({
      id: v.id,
      product_id: p.id,
      pack_size: v.packSize,
      retail_price: v.retailPrice,
      sales_tax: v.salesTax,
      total_price: v.totalPrice,
      sort_order: i,
    })),
  );
  const { error: varErr } = await supabase
    .from("variants")
    .upsert(variantRows, { onConflict: "id" });
  if (varErr) throw varErr;
  console.log(`  ✓ ${variantRows.length} variants`);

  // 4. Settings (single row — the migration inserted defaults; this updates them
  //    to match the current values in lib/shop.ts)
  console.log("→ Seeding settings…");
  const { error: setErr } = await supabase
    .from("settings")
    .update({
      shop_name: SHOP.name,
      supplier: SHOP.supplier,
      whatsapp: SHOP.whatsapp,
      whatsapp_display: SHOP.whatsappDisplay,
      address: SHOP.address,
      hours: SHOP.hours,
      tax_note: SHOP.taxNote,
      price_list_date: SHOP.priceListDate,
    })
    .eq("id", 1);
  if (setErr) throw setErr;
  console.log("  ✓ settings");

  console.log("\n✅ Seed complete.");
}

main().catch((e: unknown) => {
  console.error("\n❌ Seed failed:", e);
  process.exit(1);
});
