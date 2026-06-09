import "server-only";

import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

/** Shop config shape used across the customer-facing site. */
export interface ShopSettings {
  name: string;
  tagline: string;
  supplier: string;
  whatsapp: string;
  whatsappDisplay: string;
  address: string;
  hours: string;
  taxNote: string;
  priceListDate: string;
}

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

interface DbSettingsRow {
  shop_name: string;
  supplier: string;
  whatsapp: string;
  whatsapp_display: string;
  address: string;
  hours: string;
  tax_note: string;
  price_list_date: string;
}

async function fetchSettings(): Promise<ShopSettings> {
  const { data, error } = await client()
    .from("settings")
    .select(
      "shop_name, supplier, whatsapp, whatsapp_display, address, hours, tax_note, price_list_date",
    )
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    throw new Error(
      "Settings row missing — re-run supabase/migrations/0001_initial.sql.",
    );
  }
  const row = data as DbSettingsRow;
  return {
    name: row.shop_name,
    // Tagline still hardcoded — the column isn't in the migrated schema yet
    // (it's in 0003_settings_tagline.sql which is optional to apply).
    tagline: "Quality Paints — Kaizen & Nippon",
    supplier: row.supplier,
    whatsapp: row.whatsapp,
    whatsappDisplay: row.whatsapp_display,
    address: row.address,
    hours: row.hours,
    taxNote: row.tax_note,
    priceListDate: row.price_list_date,
  };
}

export const SETTINGS_TAG = "settings";

// Settings rarely change. Cache for 5 minutes; admin save invalidates immediately.
export const getSettings = unstable_cache(
  fetchSettings,
  ["db:settings"],
  { revalidate: 300, tags: [SETTINGS_TAG] },
);
