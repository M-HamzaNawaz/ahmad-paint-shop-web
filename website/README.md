# Ahmad Paint House — Website

Customer-facing e-commerce website for Ahmad Paint House, built with **Next.js 16**,
**TypeScript** and **Tailwind CSS v4**. Catalogue of Kaizen NEO & ZEN paints with
cart and WhatsApp ordering.

## Run the website

```bash
cd website
npm install      # first time only
npm run dev      # start the development server
```

Then open **http://localhost:3000**.

Other commands:

```bash
npm run build    # production build
npm start        # run the production build
npm run lint     # check code
```

## What works (Phase 1 — customer site)

- **Home page** — hero, categories, featured products, how-to-order.
- **Catalogue** — all 31 products, 7 category pages, live search, brand filter, sort.
- **Product pages** — pack-size selector, full pricing table, related products.
- **Cart** — add / update / remove items, saved in the browser (localStorage).
- **Checkout** — enter name, WhatsApp number and address (no account needed).
- **WhatsApp order** — placing an order opens WhatsApp with the order pre-filled,
  addressed to the shop (0346-8803287). The customer just taps Send.
- **Order confirmation** page with the order summary.
- Fully **responsive** (mobile-first) and works without any backend.

## Project structure

```
website/
├── app/                  # Pages (Next.js App Router)
│   ├── page.tsx           # Home
│   ├── products/          # All products
│   ├── category/[slug]/   # Category pages
│   ├── product/[id]/      # Product detail
│   ├── cart/ checkout/    # Cart & checkout
│   ├── order/[number]/    # Order confirmation
│   └── about/             # About & contact
├── components/            # UI components (Header, Footer, cart, etc.)
└── lib/
    ├── catalog.ts         # Product catalogue (Kaizen price list)
    ├── shop.ts            # Shop config — name, WhatsApp number, address
    ├── whatsapp.ts        # WhatsApp order message + link
    └── ...
```

## Common edits

- **Shop details / WhatsApp number** — edit `lib/shop.ts`.
- **Products & prices** — edit `lib/catalog.ts` (until the Admin Panel is added).

## Next phase

The **Admin Panel** (manage products, prices and orders) and a live database
require a Supabase project — see `../DOCUMENTATION.md`, sections 9–13.
