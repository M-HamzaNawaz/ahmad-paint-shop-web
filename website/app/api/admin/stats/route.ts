import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET /api/admin/stats — small payload (just counts) for sidebar badges
 *  and live indicators. Auth-gated. */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { count: pendingOrders } = await supabase
    .from("orders")
    .select("order_number", { count: "exact", head: true })
    .eq("status", "pending");

  return NextResponse.json({
    pendingOrders: pendingOrders ?? 0,
  });
}
