// Central shop configuration.
// Update these values to change shop details across the whole website.

export const SHOP = {
  name: "Ahmad Paint House",
  tagline: "Quality Paints — Kaizen & Nippon",
  supplier: "Kaizen & Nippon Paint",

  // Admin WhatsApp number that receives every order.
  // International format (no '+', no leading 0) — required for wa.me links.
  // 0346-8803287  ->  92 346 8803287
  whatsapp: "923468803287",
  whatsappDisplay: "0346-8803287",

  // Shop contact details — update with the real address.
  address: "Lahore, Pakistan",
  hours: "Monday – Saturday, 9:00 AM – 8:00 PM",

  // Price list reference (shown as a small banner).
  priceListDate: "20 April 2026",
  taxNote: "All prices include 18% sales tax · Subject to stock availability",
} as const;
