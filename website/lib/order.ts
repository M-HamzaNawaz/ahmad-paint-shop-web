// Order number generation and local order history.
// Orders are kept in the browser (localStorage) so the customer can see a
// confirmation. In the live version, orders are also saved to the database.

import type { Order } from "./types";

const STORAGE_KEY = "aps_orders";
const MAX_STORED = 20;

/** Generate an order number like "APS-20260521-0007". */
export function generateOrderNumber(): string {
  const d = new Date();
  const stamp =
    `${d.getFullYear()}` +
    `${String(d.getMonth() + 1).padStart(2, "0")}` +
    `${String(d.getDate()).padStart(2, "0")}`;
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `APS-${stamp}-${rand}`;
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const next = [order, ...getOrders()].slice(0, MAX_STORED);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage errors (e.g. private browsing).
  }
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return getOrders().find((o) => o.orderNumber === orderNumber);
}
