import type { Metadata } from "next";
import { getAdminOrders } from "@/lib/db/adminOrders";
import { OrderListClient } from "./OrderListClient";

export const metadata: Metadata = { title: "Orders" };

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();
  const pending = orders.filter((o) => o.status === "pending").length;
  const confirmed = orders.filter((o) => o.status === "confirmed").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {orders.length} total · {pending} pending · {confirmed} confirmed ·{" "}
          {delivered} delivered
        </p>
      </div>

      <div className="mt-6">
        <OrderListClient orders={orders} />
      </div>
    </div>
  );
}
