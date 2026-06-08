"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AdminOrder, OrderStatus } from "@/lib/db/adminOrders";
import { Dropdown, type DropdownOption } from "@/components/Dropdown";
import { SearchIcon } from "@/components/Icons";
import { formatPrice } from "@/lib/format";
import { deleteOrder } from "./actions";
import { StatusBadge, formatOrderDate } from "./shared";

type StatusFilter = "all" | OrderStatus;

const STATUS_OPTIONS: DropdownOption<StatusFilter>[] = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function OrderListClient({ orders }: { orders: AdminOrder[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      const text =
        `${o.orderNumber} ${o.customerName} ${o.customerWhatsapp} ${o.customerAddress}`.toLowerCase();
      return text.includes(q);
    });
  }, [orders, status, query]);

  async function handleDelete(orderNumber: string) {
    if (!confirm(`Delete order ${orderNumber}? This can't be undone.`)) return;
    setPendingId(orderNumber);
    const result = await deleteOrder(orderNumber);
    setPendingId(null);
    if (result.error) {
      toast.error("Delete failed", { description: result.error });
      return;
    }
    toast.success("Order deleted");
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-60 flex-1">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order #, name, phone or address…"
            className="w-full rounded-full border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <Dropdown
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
          ariaLabel="Filter by status"
        />
      </div>

      <p className="mt-3 text-sm text-zinc-500">
        Showing{" "}
        <span className="font-semibold text-zinc-800">{filtered.length}</span>{" "}
        of {orders.length}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <p className="font-semibold text-zinc-800">
            {orders.length === 0
              ? "No orders yet."
              : "No orders match the filters."}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {orders.length === 0
              ? "Orders placed through the customer site will appear here."
              : "Try adjusting your search or status filter."}
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full min-w-200 text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Order #</th>
                <th className="px-4 py-3 font-semibold">Placed</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 text-center font-semibold">Items</th>
                <th className="px-4 py-3 text-right font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((o) => (
                <tr
                  key={o.orderNumber}
                  className={pendingId === o.orderNumber ? "opacity-50" : ""}
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-zinc-900">
                    {o.orderNumber}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    {formatOrderDate(o.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-zinc-900">
                      {o.customerName}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {o.customerWhatsapp}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-zinc-600">
                    {o.totalItems}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-zinc-900">
                    {formatPrice(o.orderTotal)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/orders/${o.orderNumber}`}
                        className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(o.orderNumber)}
                        disabled={pendingId === o.orderNumber}
                        className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
