"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/db/adminOrders";

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

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_number", orderNumber);
    if (error) return { error: error.message };
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderNumber}`);
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export async function deleteOrder(
  orderNumber: string,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth();
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("order_number", orderNumber);
    if (error) return { error: error.message };
    revalidatePath("/admin/orders");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}
