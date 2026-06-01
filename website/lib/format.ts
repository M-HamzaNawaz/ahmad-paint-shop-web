// Formatting helpers.

/** Format a number as a PKR price, e.g. 7641 -> "Rs 7,641". */
export function formatPrice(amount: number): string {
  return "Rs " + Math.round(amount).toLocaleString("en-US");
}

/** Format an ISO timestamp, e.g. "21 May 2026, 3:42 PM". */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
