"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Settings } from "@/lib/db/adminSettings";

export interface ActionResult {
  error?: string;
}

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  return supabase;
}

export async function saveSettings(input: Settings): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();

    if (!input.shopName.trim()) return { error: "Shop name is required." };
    if (!input.whatsapp.trim()) return { error: "WhatsApp number is required." };

    const digits = input.whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      return { error: "WhatsApp number must be 10-15 digits." };
    }

    const { error } = await supabase
      .from("settings")
      .update({
        shop_name: input.shopName.trim(),
        supplier: input.supplier.trim(),
        whatsapp: digits,
        whatsapp_display: input.whatsappDisplay.trim(),
        address: input.address.trim(),
        hours: input.hours.trim(),
        tax_note: input.taxNote.trim(),
        price_list_date: input.priceListDate.trim(),
      })
      .eq("id", 1);

    if (error) return { error: error.message };

    updateTag("settings");
    revalidatePath("/", "layout");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}
