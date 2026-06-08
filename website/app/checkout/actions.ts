"use server";

import { createClient } from "@supabase/supabase-js";
import type { Order } from "@/lib/types";

export interface SubmitResult {
  error?: string;
  orderNumber?: string;
}

/**
 * Saves a customer order to Supabase. Called from CheckoutForm right
 * after WhatsApp opens — runs in the background, doesn't block the user.
 * Uses the anon role; RLS allows public inserts on `orders`.
 */
export async function submitOrder(order: Order): Promise<SubmitResult> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { error } = await supabase.from("orders").insert({
      order_number: order.orderNumber,
      customer_name: order.customer.name,
      customer_whatsapp: order.customer.whatsapp,
      customer_address: order.customer.address,
      customer_notes: order.customer.notes || null,
      items: order.items,
      total_items: order.totalItems,
      order_total: order.orderTotal,
      status: "pending",
    });

    if (error) return { error: error.message };
    return { orderNumber: order.orderNumber };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Submission failed" };
  }
}
