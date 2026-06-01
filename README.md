# Ahmad Paint Shop — Website Project

Documentation package for the Ahmad Paint Shop e-commerce website — an online
catalogue of Kaizen Paint (NEO & ZEN) products with cart and WhatsApp ordering.

## Files in this folder

| File | What it is |
|------|------------|
| **[DOCUMENTATION.md](DOCUMENTATION.md)** | The complete build specification — features, screens, admin panel, WhatsApp ordering, database schema, roadmap and costs. **Start here.** |
| **[products.json](products.json)** | The full product catalogue (7 categories, 31 products, 67 pack sizes) in machine-readable form, ready to load into the database. |

## In one paragraph

A modern, responsive website where customers browse the paint catalogue, add
products to a cart, and place an order — **no sign-up or account needed**. Placing
an order opens WhatsApp on the customer's phone with a pre-filled order message
addressed to the shop (**0346-8803287**) — the customer just taps Send. The shop
owner uses an Admin Panel (the only login on the site) to add products and update
prices with no developer help. Every order is also saved in the Admin Panel as a
record.

## Recommended technology

Next.js + Tailwind CSS (website) · Supabase (database, admin login, image storage) ·
Vercel (hosting) · WhatsApp Click-to-Chat (ordering). All run on free tiers at
single-shop scale — see the cost section in the documentation.

## Status

📄 **Documentation phase.** This package is the specification. The next step is to
review/approve it, then begin development per the roadmap in the documentation
(estimated ~5 weeks for one developer).
