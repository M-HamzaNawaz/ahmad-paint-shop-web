import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { CartItem } from "@/lib/types";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "delivered"
  | "cancelled";

export interface AdminOrder {
  orderNumber: string;
  customerName: string;
  customerWhatsapp: string;
  customerAddress: string;
  customerNotes: string | null;
  items: CartItem[];
  totalItems: number;
  orderTotal: number;
  status: OrderStatus;
  createdAt: string;
}

interface DbOrderRow {
  order_number: string;
  customer_name: string;
  customer_whatsapp: string;
  customer_address: string;
  customer_notes: string | null;
  items: CartItem[];
  total_items: number;
  order_total: number;
  status: OrderStatus;
  created_at: string;
}

function toOrder(row: DbOrderRow): AdminOrder {
  return {
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerWhatsapp: row.customer_whatsapp,
    customerAddress: row.customer_address,
    customerNotes: row.customer_notes,
    items: row.items ?? [],
    totalItems: row.total_items,
    orderTotal: Number(row.order_total),
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function getAdminOrders(): Promise<AdminOrder[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as unknown as DbOrderRow[]).map(toOrder);
}

export async function getAdminOrderByNumber(
  orderNumber: string,
): Promise<AdminOrder | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .maybeSingle();
  if (error) throw error;
  return data ? toOrder(data as unknown as DbOrderRow) : undefined;
}
