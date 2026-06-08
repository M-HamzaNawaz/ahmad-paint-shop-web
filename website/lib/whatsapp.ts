// Builds the WhatsApp order message and click-to-chat link.
// When the customer places an order, their WhatsApp opens with this message
// pre-filled, addressed to the shop. They just tap Send.

import { formatDateTime, formatPrice } from "./format";
import type { Order } from "./types";

/** Minimal shop info needed by the WhatsApp helpers. */
export interface ShopInfo {
  /** Shop name — shown in the message header. */
  name: string;
  /** International format, no '+', no leading 0 — e.g. "923468803287". */
  whatsapp: string;
}

/** Build the formatted order message (WhatsApp uses *text* for bold). */
export function buildOrderMessage(order: Order, shop: ShopInfo): string {
  const lines: string[] = [];

  lines.push(`🎨 *New Order — ${shop.name}*`);
  lines.push(`Order #: ${order.orderNumber}`);
  lines.push(`Date: ${formatDateTime(order.createdAt)}`);
  lines.push("");

  lines.push("👤 *Customer*");
  lines.push(`Name: ${order.customer.name}`);
  lines.push(`WhatsApp: ${order.customer.whatsapp}`);
  lines.push(`Address: ${order.customer.address}`);
  if (order.customer.notes.trim()) {
    lines.push(`Notes: ${order.customer.notes.trim()}`);
  }
  lines.push("");

  lines.push("🛒 *Items*");
  order.items.forEach((item, index) => {
    const codePart = item.productLine ? ` (${item.productLine})` : "";
    lines.push(
      `${index + 1}. ${item.productName} — ${item.packSize}${codePart}`,
    );
    if (item.colorName) {
      lines.push(`   Colour: ${item.colorName} (${item.colorCode})`);
    }
    lines.push(
      `   Qty ${item.quantity} × ${formatPrice(item.unitPrice)} = ${formatPrice(
        item.unitPrice * item.quantity,
      )}`,
    );
  });
  lines.push("");

  lines.push(`*Total Items:* ${order.totalItems}`);
  lines.push(`*Order Total:* ${formatPrice(order.orderTotal)}`);
  lines.push("");
  lines.push("Please confirm availability, final price and delivery. Thank you! 🙏");

  return lines.join("\n");
}

/** Build the wa.me click-to-chat URL with the order message pre-filled. */
export function buildWhatsAppUrl(order: Order, shop: ShopInfo): string {
  const message = buildOrderMessage(order, shop);
  return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Plain wa.me link to the shop (no message) — used for general contact. */
export function shopWhatsAppUrl(
  shop: Pick<ShopInfo, "whatsapp">,
  text?: string,
): string {
  const base = `https://wa.me/${shop.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
