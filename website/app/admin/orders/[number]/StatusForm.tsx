"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { OrderStatus } from "@/lib/db/adminOrders";
import { Dropdown, type DropdownOption } from "@/components/Dropdown";
import { updateOrderStatus } from "../actions";

const STATUS_OPTIONS: DropdownOption<OrderStatus>[] = [
  { value: "pending", label: "Pending — awaiting confirmation" },
  { value: "confirmed", label: "Confirmed — accepted" },
  { value: "delivered", label: "Delivered — completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function StatusForm({
  orderNumber,
  status: initial,
}: {
  orderNumber: string;
  status: OrderStatus;
}) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<OrderStatus>(initial);

  function save(next: OrderStatus) {
    // Optimistic — dropdown shows new value instantly.
    setStatus(next);
    startTransition(async () => {
      const result = await updateOrderStatus(orderNumber, next);
      if (result.error) {
        toast.error("Update failed", { description: result.error });
        setStatus(initial);
        return;
      }
      toast.success(`Status updated to ${next}`);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <Dropdown
        value={status}
        onChange={save}
        options={STATUS_OPTIONS}
        ariaLabel="Order status"
      />
      {pending ? (
        <span className="text-xs text-zinc-500">Saving…</span>
      ) : null}
    </div>
  );
}
