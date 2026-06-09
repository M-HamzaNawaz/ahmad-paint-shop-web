import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAdminOrders } from "@/lib/db/adminOrders";

/** GET /api/admin/orders — returns all orders. Used by React Query for
 *  live-refresh on the admin orders list. Auth-gated. */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await getAdminOrders();
  return NextResponse.json(orders);
}
