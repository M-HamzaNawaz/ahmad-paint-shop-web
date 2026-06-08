import "server-only";

import { createClient } from "@/lib/supabase/server";

export interface Settings {
  shopName: string;
  supplier: string;
  whatsapp: string;
  whatsappDisplay: string;
  address: string;
  hours: string;
  taxNote: string;
  priceListDate: string;
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

function toSettings(row: DbSettingsRow): Settings {
  return {
    shopName: row.shop_name,
    supplier: row.supplier,
    whatsapp: row.whatsapp,
    whatsappDisplay: row.whatsapp_display,
    address: row.address,
    hours: row.hours,
    taxNote: row.tax_note,
    priceListDate: row.price_list_date,
  };
}

export async function getAdminSettings(): Promise<Settings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Settings row missing — re-run the migration.");
  return toSettings(data as DbSettingsRow);
}
