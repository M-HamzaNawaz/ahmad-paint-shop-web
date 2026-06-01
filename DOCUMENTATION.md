# Ahmad Paint Shop — Website Project Documentation

**Document version:** 1.0
**Date:** 21 May 2026
**Prepared for:** Ahmad Paint Shop
**Product catalogue source:** Kaizen Paint (PVT) Limited — Consumer Price List, effective 20 April 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Goals & Success Criteria](#2-goals--success-criteria)
3. [User Roles](#3-user-roles)
4. [Feature List](#4-feature-list)
5. [Technology Stack & Architecture](#5-technology-stack--architecture)
6. [Site Map & Pages](#6-site-map--pages)
7. [User Flows](#7-user-flows)
8. [WhatsApp Ordering — Detailed Design](#8-whatsapp-ordering--detailed-design)
9. [Database Schema](#9-database-schema)
10. [Admin Panel Specification](#10-admin-panel-specification)
11. [UI / UX Design Guidelines](#11-ui--ux-design-guidelines)
12. [Security & Permissions](#12-security--permissions)
13. [Setup & Deployment](#13-setup--deployment)
14. [Development Roadmap](#14-development-roadmap)
15. [Cost Estimate](#15-cost-estimate)
16. [Future Enhancements](#16-future-enhancements)
17. [Appendix A — Product Catalogue Data](#appendix-a--product-catalogue-data)
18. [Appendix B — Glossary](#appendix-b--glossary)

---

## 1. Project Overview

Ahmad Paint Shop sells **Kaizen Paint** products (NEO and ZEN brands) — interior and
exterior emulsions, enamels, putty, primers, wood-care products and more. Today the
catalogue and prices live in a printed PDF price list that changes every few months.

This project delivers a **modern, mobile-friendly e-commerce website** that:

- Displays the full product catalogue in an attractive, easy-to-browse layout.
- Lets the shop owner (admin) **add new products and update prices** without touching code.
- Lets customers **browse, add products to a cart, and place an order** — no sign-up or account needed.
- Sends every order **straight to the shop's WhatsApp** (`0346-8803287`) as a neatly
  formatted message, sent from the customer's own WhatsApp number.

There is **no online payment**. The website is a digital catalogue + ordering tool.
Price negotiation, payment, and delivery are handled by the shop over WhatsApp/phone,
exactly as they happen today — the website simply removes the paperwork and phone-tag.

### What this document is

This is a **complete build specification**. It describes *what* will be built and
*how* it should work, in enough detail for a developer to implement it and for the
shop owner to understand and approve it before any code is written.

---

## 2. Goals & Success Criteria

### Business goals

| Goal | How the website achieves it |
|------|------------------------------|
| Customers can see products & prices any time | Public online catalogue, always up to date |
| Stop reprinting/sharing PDF price lists | Admin updates prices in seconds; site reflects instantly |
| Make ordering easier | Add-to-cart + one-tap WhatsApp order |
| Look professional & trustworthy | Modern, clean, branded design |
| Work for everyone | Fully responsive — phone, tablet, desktop |

### Success criteria (the website is "done" when…)

- [ ] All 31 products from the price list are live, with correct pack sizes & prices.
- [ ] A customer can build a cart and place an order in under 2 minutes — no account needed.
- [ ] Placing an order opens WhatsApp with a complete, correctly formatted order message addressed to `0346-8803287`.
- [ ] The admin can add a product, edit a price, and hide/show a product — all from the browser, with no developer help.
- [ ] The site loads quickly and is fully usable on a low-cost Android phone.
- [ ] Every order is also saved in the admin panel as a backup record.

---

## 3. User Roles

The website has **two** types of users. **Customers do not need an account** —
there is no sign-up or login for customers at all.

### 3.1 Customer (no account needed)
- Can browse all categories and products.
- Can see prices and pack sizes.
- Can add items to the cart and change quantities.
- Can place an order: at checkout they enter their name, WhatsApp number and
  delivery address, then send the order via WhatsApp.
- No password, no profile, no login — anyone can order in seconds.

### 3.2 Admin (the shop owner / staff)
- Logs in through a private admin login to reach the **Admin Panel**.
- Manages products, pack sizes, prices, categories and product images.
- Views and manages all orders placed on the website.
- Updates shop settings (WhatsApp number, shop info, price-list effective date).

> **Note:** Only the admin has a login. There is no public sign-up. The first
> admin login is set up once during installation; any further admin logins are
> added directly in Supabase.

---

## 4. Feature List

### 4.1 Customer-facing features

**Catalogue & browsing**
- Home page with hero banner, featured categories, and highlighted products.
- 7 category pages: Interior Emulsions, Exterior Emulsions, Enamels, Putty, Primers, Wood Care, Others.
- Product cards showing name, brand (NEO / ZEN), image, product code, and price range.
- Product detail page with all pack sizes, per-pack prices, and any special note
  (e.g. *"Only available on K-Spectrum"*, *"Available only in selective shades"*).
- **Search** by product name or product code (e.g. "N920", "putty", "exterior").
- **Filters**: by category, by brand (NEO / ZEN), and sort by price (low→high / high→low).

**Cart**
- Add a specific pack size of a product to the cart.
- Change quantity, remove items.
- Cart persists in the browser (so it survives a page refresh).
- Live cart total, item count badge in the header.

**Ordering**
- Checkout page: review items and enter name, WhatsApp number and delivery address.
- "Place Order on WhatsApp" button → opens WhatsApp with the order pre-filled.
- Order is saved to the admin panel at the same time as a backup record.
- On-screen order confirmation with the order number.

**Information pages**
- About / Contact (shop address, phone, WhatsApp, map, opening hours).
- A visible note that prices include 18% sales tax and may change with government notification.

### 4.2 Admin-facing features

**Dashboard**
- Counts: total products, total orders, pending orders, today's orders.
- List of the most recent orders with quick status access.

**Product management**
- Add / edit / delete products.
- Each product: name, category, brand, product code, description, note, image.
- Manage **pack-size variants** per product, each with its own price and stock status.
- Mark a product **active / inactive** (inactive = hidden from the website).
- Mark a pack size **in stock / out of stock**.

**Price updates** *(core requirement)*
- Edit any price inline.
- **Bulk price update**: upload a new price-list file (CSV) to update many prices at once when Kaizen issues a new list.
- A "Price list effective date" field shown as a small banner on the website.

**Category management**
- Add / rename / reorder categories.

**Order management**
- View all orders with customer details and full item list.
- Change order status: *Pending → Confirmed → Delivered* (or *Cancelled*).
- Re-open the WhatsApp conversation for any order.
- Search / filter orders by status, date, or customer.

**Settings**
- Shop name, address, phone, opening hours.
- Admin WhatsApp number (currently `0346-8803287`).
- Price-list effective date shown on the website.

---

## 5. Technology Stack & Architecture

The recommended stack is **modern, low-cost, and low-maintenance**. It can run for
free at small scale and requires no server administration.

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend framework | **Next.js (React)** | Fast, modern, SEO-friendly, industry standard |
| Styling | **Tailwind CSS** | Rapid, consistent, responsive design |
| UI components | **shadcn/ui** | Clean, accessible, ready-made components |
| Backend / Database | **Supabase** (PostgreSQL) | Database + Auth + file storage in one, generous free tier |
| Authentication | **Supabase Auth** | Secure login for the admin only — no customer accounts |
| Image storage | **Supabase Storage** | Stores product photos |
| Hosting (website) | **Vercel** | Free tier, automatic deployment, fast globally |
| Ordering channel | **WhatsApp Click-to-Chat** (`wa.me`) | Free, no API needed, works on every phone |
| Version control | **Git + GitHub** | Code backup and history |

### Architecture diagram

```
                    ┌──────────────────────────┐
                    │   Customer's Browser /    │
                    │   Mobile (Next.js app)    │
                    └────────────┬─────────────┘
                                 │
                 browse / cart / login / checkout
                                 │
                    ┌────────────▼─────────────┐
                    │     Vercel (hosting)      │
                    │   Next.js website + API   │
                    └────────────┬─────────────┘
                                 │
              read products  │  save orders / users
                                 │
                    ┌────────────▼─────────────┐
                    │        Supabase           │
                    │  PostgreSQL DB + Auth +   │
                    │  Storage (product images) │
                    └───────────────────────────┘

   On "Place Order":  Browser ──opens──▶ WhatsApp ──message──▶ Shop (0346-8803287)
```

### Why no online payments

The customer asked only for WhatsApp-based ordering. Skipping payment gateways
keeps the project simple, free of bank/merchant fees and approvals, and matches
how the shop already does business. Payment can be added later if needed.

---

## 6. Site Map & Pages

### Public / customer pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Hero, categories, featured products |
| Category | `/category/[slug]` | All products in one category |
| All products | `/products` | Full catalogue with search & filters |
| Product detail | `/product/[id]` | One product, all pack sizes & prices |
| Cart | `/cart` | Review and edit cart |
| Checkout | `/checkout` | Enter contact details, place WhatsApp order |
| Order confirmation | `/order/[number]` | Shows the placed order number |
| About / Contact | `/about` | Shop info, map, contact |

### Admin pages

| Page | Path | Purpose |
|------|------|---------|
| Admin login | `/admin/login` | Private login for the shop owner / staff |
| Admin dashboard | `/admin` | Summary & recent orders |
| Products | `/admin/products` | Product list & management |
| Add / edit product | `/admin/products/[id]` | Product + pack-size editor |
| Bulk price update | `/admin/products/import` | CSV upload to update prices |
| Categories | `/admin/categories` | Manage categories |
| Orders | `/admin/orders` | All orders |
| Order detail | `/admin/orders/[id]` | One order, change status |
| Settings | `/admin/settings` | Shop & WhatsApp settings |

---

## 7. User Flows

### 7.1 Browse → Cart → Order (customer)

```
1. Customer lands on Home page.
2. Picks a category (e.g. "Interior Emulsions") or uses search.
3. Opens a product → chooses a pack size (e.g. "Neo Stain Guard — 4 Ltrs").
4. Clicks "Add to Cart". Cart badge updates.
5. Repeats for other products.
6. Opens the Cart → adjusts quantities → clicks "Checkout".
7. On Checkout: enters name, WhatsApp number and delivery address.
8. Clicks "Place Order on WhatsApp".
9. Order is saved; WhatsApp opens with the full order message pre-filled.
10. Customer taps Send in WhatsApp → message reaches the shop.
11. Website shows an order confirmation with the order number.
```

### 7.2 Admin updates a price

```
1. Admin logs in → goes to Admin Panel → Products.
2. Finds the product (search or category filter).
3. Opens it → edits the price of a pack size → Saves.
4. The new price is live on the website immediately.
```

### 7.3 Admin adds a new product

```
1. Admin → Products → "Add Product".
2. Fills: name, category, brand, product code, description, note, image.
3. Adds one or more pack sizes, each with its price.
4. Sets the product "Active" → Saves.
5. Product appears on the website right away.
```

### 7.4 Admin handles an order

```
1. New order arrives on WhatsApp AND in Admin → Orders (status: Pending).
2. Admin replies to the customer on WhatsApp to confirm stock/price/delivery.
3. Admin sets status to "Confirmed", then "Delivered" once handed over.
```

---

## 8. WhatsApp Ordering — Detailed Design

This is the heart of the project, so it is specified in full.

### 8.1 How it works (chosen approach: WhatsApp Click-to-Chat)

WhatsApp provides free "click-to-chat" links of the form:

```
https://wa.me/<number>?text=<url-encoded-message>
```

When the customer clicks **"Place Order on WhatsApp"**, the website:

1. Saves the order to the database (so the admin always has a record).
2. Builds a formatted text message from the cart and customer details.
3. URL-encodes that message.
4. Opens `https://wa.me/923468803287?text=<encoded message>`.

This opens **WhatsApp on the customer's own phone** (the WhatsApp app, or WhatsApp
Web on desktop), with the message already typed in a chat addressed to the shop.
The customer just taps **Send**. The message therefore arrives at the shop
**from the customer's own WhatsApp number** — exactly as requested.

> **Why this approach:** It is free, needs no WhatsApp Business API, no approval
> process, and no monthly fees. It works on every phone. The only manual step is
> the customer tapping "Send", which also acts as a final confirmation.

### 8.2 The admin WhatsApp number

| Format | Value |
|--------|-------|
| As given by shop | `03468803287` |
| Display on website | `0346-8803287` |
| International (for `wa.me`) | `923468803287` |

> Pakistan country code is **92**. For `wa.me` links the leading `0` is dropped and
> `92` is added: `0346 8803287` → `92 346 8803287` → **`923468803287`**.
> This number is stored in **Settings** so it can be changed without code edits.

### 8.3 Order message format

The message sent to the shop looks like this:

```
🎨 *New Order — Ahmad Paint Shop*
Order #: APS-20260521-0007
Date: 21 May 2026, 3:42 PM

👤 *Customer*
Name: Abdul Rehman
Phone: 0300-1234567
Address: House 12, Street 5, Model Town, Lahore

🛒 *Items*
1. Neo Stain Guard — 4 Ltrs (N920)
   Qty 2 × Rs 7,641 = Rs 15,282
2. Neo Premium Wall Putty — 20 Kgs (N957)
   Qty 1 × Rs 7,167 = Rs 7,167
3. Zen Gloss Enamel — 0.91 Ltr (N311)
   Qty 3 × Rs 1,272 = Rs 3,816

*Total Items:* 6
*Order Total:* Rs 26,265

Please confirm availability, final price and delivery.
Thank you! 🙏
```

- `*text*` renders as **bold** inside WhatsApp.
- Prices include 18% sales tax (consumer price from the price list).
- The total is an **estimate**; final price/availability is confirmed by the shop
  on WhatsApp. The message says so explicitly.

### 8.4 Order number format

`APS-YYYYMMDD-NNNN` — e.g. `APS-20260521-0007`
(`APS` = Ahmad Paint Shop, then date, then a daily sequence number.)

### 8.5 Desktop vs mobile

- **Mobile:** `wa.me` opens the WhatsApp app directly.
- **Desktop:** `wa.me` opens WhatsApp Web / WhatsApp Desktop. If the customer is
  not signed in there, they can scan the QR code, or open the site on their phone.
- The checkout page shows a short hint for desktop users.

### 8.6 Optional future upgrade

If the shop later wants orders delivered **automatically** (without the customer
tapping Send) or wants automated order confirmations, the **WhatsApp Business API**
(via a provider such as Twilio, Meta Cloud API, or 360dialog) can be added. This
has monthly/per-message costs and an approval process, so it is **out of scope**
for version 1. See [Section 16](#16-future-enhancements).

---

## 9. Database Schema

Database: **PostgreSQL** (managed by Supabase). Below are the tables, key columns,
and relationships.

### 9.1 Tables

> **No customer accounts.** Customers never sign up, so there is no `profiles` or
> users table for customers. The only login accounts are admins, and those live
> directly in Supabase Auth — being a logged-in Auth user *is* being an admin.

**`categories`**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| name | text | e.g. "Interior Emulsions" |
| slug | text (unique) | e.g. `interior-emulsions` |
| sort_order | int | Controls display order |

**`products`**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| sr_no | int | Serial number from the price list (reference) |
| name | text | e.g. "Neo Stain Guard" |
| product_line | text | Kaizen product code, e.g. `N920` |
| category_id | uuid (FK → categories) | |
| brand | text | `Neo` or `Zen` |
| description | text | Optional marketing description |
| note | text | e.g. "Only available on K-Spectrum" |
| image_url | text | From Supabase Storage |
| is_active | boolean | If false, hidden from website (default true) |
| created_at | timestamp | |
| updated_at | timestamp | |

**`product_variants`** — pack sizes & prices (one product has many)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| product_id | uuid (FK → products) | |
| pack_size | text | e.g. "4 Ltrs", "20 Kgs" |
| retail_price | numeric | Pre-tax price from the price list |
| sales_tax | numeric | 18% tax amount |
| total_price | numeric | **Customer-facing selling price** |
| in_stock | boolean | Default true |
| sort_order | int | Smallest pack first |

**`orders`**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| order_number | text (unique) | e.g. `APS-20260521-0007` |
| customer_name | text | Entered by the customer at checkout |
| customer_phone | text | Entered at checkout |
| customer_whatsapp | text | Snapshot |
| customer_address | text | Snapshot |
| total_items | int | |
| order_total | numeric | Estimated total |
| status | text | `pending` / `confirmed` / `delivered` / `cancelled` |
| whatsapp_opened | boolean | True once the WhatsApp link was triggered |
| notes | text | Admin notes |
| created_at | timestamp | |

**`order_items`** — line items (one order has many)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| order_id | uuid (FK → orders) | |
| product_id | uuid (FK → products) | Reference |
| variant_id | uuid (FK → product_variants) | Reference |
| product_name | text | Snapshot (so old orders stay correct) |
| pack_size | text | Snapshot |
| product_line | text | Snapshot |
| unit_price | numeric | Snapshot |
| quantity | int | |
| line_total | numeric | unit_price × quantity |

**`settings`** — single-row table for shop configuration

| Column | Type | Notes |
|--------|------|-------|
| id | int (PK) | Always 1 |
| shop_name | text | "Ahmad Paint Shop" |
| shop_address | text | |
| shop_phone | text | |
| admin_whatsapp | text | `923468803287` |
| price_list_date | date | "Effective 20 April 2026" banner |
| opening_hours | text | |

### 9.2 Relationships

```
orders 1 ───< order_items >─── product_variants >─ 1 products
categories 1 ───< products 1 ───< product_variants
```

### 9.3 Design notes

- **Price snapshots:** `order_items` copies the name, pack size and price at order
  time. If the admin later changes a price, **past orders are unaffected**.
- **The cart is not a database table.** It lives in the browser (localStorage) and
  becomes an `order` only when the customer checks out. This keeps things simple
  and works without any customer login.
- **Selling price = `total_price`.** The catalogue shows `total_price` (price
  including 18% tax). `retail_price` and `sales_tax` are kept for record-keeping
  and to match the official Kaizen price list.

---

## 10. Admin Panel Specification

### 10.1 Access
- The Admin Panel is at `/admin` and requires an admin login.
- Since customers have no accounts, every logged-in user is an admin. Anyone who
  is not logged in is redirected to the admin login page (`/admin/login`).

### 10.2 Dashboard
- Cards: **Total Products**, **Total Orders**, **Pending Orders**, **Today's Orders**.
- Table: 10 most recent orders (order #, customer, total, status, time).

### 10.3 Product editor
A single screen to manage one product:
- Fields: name, category (dropdown), brand (Neo/Zen), product code, description,
  note, image upload, Active toggle.
- A **pack-size table** where the admin can add rows. Each row: pack size,
  retail price, tax, total price, in-stock toggle. (Tax and total can auto-fill
  from the retail price at 18%, but remain editable to match the official list.)
- Save / Cancel / Delete.

### 10.4 Bulk price update (CSV import)
When Kaizen issues a new price list, the admin can update everything at once:
- Admin downloads a **CSV template** (or exports current products).
- The CSV has columns: `product_line`, `pack_size`, `retail_price`, `sales_tax`, `total_price`.
- Admin uploads the edited CSV.
- The system shows a **preview of changes** (old price → new price) before applying.
- On confirm, all matching variants are updated, and `price_list_date` is set.
- Rows that don't match an existing product are listed so the admin can add them.

> This directly satisfies the requirement that a *new product list* can be loaded
> and prices updated quickly.

### 10.5 Order management
- Orders list with filters: status, date range, search by customer/order number.
- Order detail: customer info, all items, totals, status dropdown, admin notes,
  and a "Open WhatsApp chat with customer" button.

### 10.6 Settings
- Editable shop details and **admin WhatsApp number**.
- Price-list effective date (shown as a banner on the website).
- Extra admin logins (if ever needed) are added directly in Supabase Auth.

---

## 11. UI / UX Design Guidelines

### 11.1 Principles
- **Mobile-first.** Most customers in Pakistan will visit on a phone — design for a
  small screen first, then scale up to tablet and desktop.
- **Fast & light.** Optimised images, minimal load time on slow connections.
- **Simple.** Few clicks from home to order. No clutter.
- **Trustworthy.** Clean layout, real photos, clear prices, visible contact info.

### 11.2 Responsive breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | up to 640px | 1 product per row, hamburger menu, sticky bottom cart bar |
| Tablet | 641–1024px | 2–3 products per row |
| Desktop | 1024px+ | 4 products per row, full top navigation |

### 11.3 Visual style
- **Colour palette:** clean white/neutral background with a confident accent colour.
  Kaizen's branding uses warm pink/orange gradients (NEO) and red (ZEN); the site
  can use a tasteful accent inspired by this. NEO and ZEN products get small
  brand tags/badges so customers can tell them apart.
- **Typography:** a clear, modern sans-serif. Large, legible prices.
- **Imagery:** real product photos where possible; a clean placeholder where not.
- **Components:** rounded cards, soft shadows, clear primary buttons
  ("Add to Cart", "Place Order on WhatsApp" — the WhatsApp button in WhatsApp green).

### 11.4 Key screen layouts

**Home page**
```
[ Header: logo · search · categories · cart ]
[ Hero banner: "Quality Paints by Kaizen — NEO & ZEN" + CTA ]
[ Browse by Category — 7 category tiles ]
[ Featured / Popular products grid ]
[ Why choose us / WhatsApp ordering info strip ]
[ Footer: shop address, contact, hours, WhatsApp ]
```

**Product card**
```
┌────────────────────┐
│   [ product image ]│
│  NEO ·  badge      │
│  Neo Stain Guard   │
│  Code: N920        │
│  From Rs 2,075     │
│  [ View / Add ]    │
└────────────────────┘
```

**Product detail page**
```
[ Image ]   Neo Stain Guard          [NEO]
            Interior Emulsion · Code N920
            Note: —
            Choose pack size:
              ( ) 1 Ltr    — Rs 2,075
              ( ) 4 Ltrs   — Rs 7,641
              ( ) 16 Ltrs  — Rs 30,045
            Quantity: [ - ] 1 [ + ]
            [  Add to Cart  ]
```

**Mobile cart bar:** a sticky bar at the bottom of the screen showing item count
and total with a "View Cart" button, so the cart is always one tap away.

### 11.5 Accessibility & language
- All text in clear English; large tap targets for mobile.
- Prices always formatted with thousands separators and "Rs" (e.g. `Rs 7,641`).
- A small banner notes: *"Prices include 18% sales tax · Price list effective 20 April 2026 · Subject to stock availability."*

---

## 12. Security & Permissions

- **Admin authentication** is handled by Supabase Auth (secure, hashed passwords,
  session tokens). Customers have no accounts, so there are no customer passwords
  to protect and nothing for customers to log into.
- **Row Level Security (RLS)** is enabled on all tables:
  - Anyone can *read* active products, variants and categories.
  - Anyone can *create* an order (place an order), but cannot read other orders.
  - Only a logged-in **admin** can read all orders and create/update/delete
    products, categories and settings.
- The Admin Panel verifies the admin session on every page (server-side), not just
  by hiding buttons.
- Supabase secret keys are kept in server-side environment variables, never shipped
  to the browser.
- HTTPS is enforced everywhere (automatic on Vercel).
- Basic input validation on all forms (required fields, phone format, number ranges).
- Light anti-spam: an order only reaches the shop once the customer completes the
  WhatsApp send step, which naturally filters out junk submissions.

---

## 13. Setup & Deployment

### 13.1 Accounts needed (all have free tiers)
1. **GitHub** — to store the code.
2. **Supabase** — database, authentication, image storage.
3. **Vercel** — to host the website.
4. *(Optional)* a **domain name** (e.g. `ahmadpaintshop.com`) — paid, ~PKR 3,000–5,000/year.

### 13.2 One-time setup steps
1. Create the Supabase project; create the database tables from [Section 9](#9-database-schema).
2. Enable Email/Password authentication in Supabase.
3. Import the catalogue using **`products.json`** (provided alongside this document) — a seed script loads all 7 categories and 31 products with their pack sizes and prices.
4. Create the **admin** login directly in Supabase Auth (Authentication → Add User). This is the only login account that ever exists.
5. Set `admin_whatsapp = 923468803287` and shop details in the `settings` table.
6. Connect the GitHub repo to Vercel; add Supabase keys as environment variables.
7. Deploy. The site goes live on a Vercel URL; connect the custom domain if purchased.

### 13.3 Going live checklist
- [ ] All products visible with correct prices.
- [ ] Admin login works; the admin panel cannot be reached without logging in.
- [ ] Cart and checkout work on a real phone.
- [ ] Test order opens WhatsApp to `0346-8803287` with a correct message.
- [ ] Admin can add a product and edit a price.
- [ ] Site tested on Android Chrome, iPhone Safari, and desktop.

### 13.4 Maintenance
- **Prices:** updated by the admin in the panel — no developer needed.
- **New products:** added by the admin — no developer needed.
- **Code/hosting:** Vercel and Supabase auto-handle infrastructure. Occasional
  dependency updates are recommended (a few times a year).

---

## 14. Development Roadmap

A suggested phased build. Phases can overlap; estimates assume one developer.

| Phase | Work | Outcome | Est. time |
|-------|------|---------|-----------|
| **0. Setup** | Repo, Supabase, Vercel, database tables, seed data | Empty app deployed, catalogue data loaded | 2–3 days |
| **1. Catalogue** | Home, categories, product list & detail, search, filters | Customers can browse everything | 5–7 days |
| **2. Cart** | Cart, quantity management, browser persistence, checkout details form | Customers can build carts | 2–3 days |
| **3. Checkout & WhatsApp** | Checkout page, order saving, WhatsApp message generation | Customers can place orders | 3–4 days |
| **4. Admin Panel** | Admin login, dashboard, product/variant editor, categories, order management, settings | Owner can run the shop | 6–8 days |
| **5. Bulk price update** | CSV import with change preview | Easy price-list updates | 2–3 days |
| **6. Polish & launch** | Responsive QA, performance, content, testing, go-live | Live website | 3–4 days |

**Indicative total: ~5 weeks** for a complete, polished version 1.

### Minimum Viable Product (MVP)
If a faster launch is wanted, Phases 0–4 deliver a fully working shop. The CSV
bulk-update (Phase 5) can come right after launch, since prices can still be
edited one by one in the meantime.

---

## 15. Cost Estimate

### 15.1 Running costs

| Item | Free tier | When you'd pay |
|------|-----------|----------------|
| Vercel (hosting) | Free for this scale | Only at high traffic |
| Supabase (DB/Auth/Storage) | Free up to 500MB DB + 1GB files | Only at large scale (~$25/mo Pro) |
| WhatsApp Click-to-Chat | **Always free** | Never (no API used) |
| Domain name (optional) | — | ~PKR 3,000–5,000 / year |

**For a single paint shop, the website can realistically run at PKR 0/month**
(plus an optional domain). Costs only appear if traffic or data grows very large.

### 15.2 Development cost
One-time build cost depends on who builds it (freelancer vs agency vs in-house)
and is **not estimated here** — this document is the specification a developer
would quote against. The [roadmap](#14-development-roadmap) gives the effort
(~5–6 weeks for one developer) to support a quote.

---

## 16. Future Enhancements

Out of scope for version 1, but easy to add later:

- **WhatsApp Business API** — fully automated order delivery & confirmations
  (has monthly/per-message cost).
- **Online payments** — JazzCash / Easypaisa / card, if the shop wants prepaid orders.
- **Stock quantity tracking** — exact units, not just in/out of stock.
- **Colour shade picker** — visual shade selection per product.
- **Discounts / promo codes** — seasonal offers.
- **Order status notifications** — email or WhatsApp updates to customers.
- **Multi-language** — Urdu version of the site.
- **Delivery charges & areas** — automatic delivery fee by location.
- **Customer reviews & ratings.**
- **Sales reports & analytics** for the admin.

---

## Appendix A — Product Catalogue Data

Full catalogue extracted from the Kaizen Paint Consumer Price List
(**effective 20 April 2026**). All prices in **PKR**. **Total Price** is the
customer-facing selling price (Retail Price + 18% Sales Tax). The machine-readable
version is in the accompanying **`products.json`** file, ready to seed the database.

### Interior Emulsions

| # | Product | Code | Pack Size | Retail | Tax 18% | **Total Price** |
|---|---------|------|-----------|--------|---------|-----------------|
| 1 | Neo Stain Guard | N920 | 1 Ltr | 1,758.47 | 316.53 | **2,075** |
| 1 | Neo Stain Guard | N920 | 4 Ltrs | 6,475.42 | 1,165.58 | **7,641** |
| 1 | Neo Stain Guard | N920 | 16 Ltrs | 25,461.86 | 4,583.14 | **30,045** |
| 2 | Neo Silk Water Matt *(K-Spectrum only)* | N941 | 1 Ltr | 1,554.24 | 279.76 | **1,834** |
| 2 | Neo Silk Water Matt *(K-Spectrum only)* | N941 | 4 Ltrs | 5,718.64 | 1,029.36 | **6,748** |
| 2 | Neo Silk Water Matt *(K-Spectrum only)* | N941 | 16 Ltrs | 22,167.80 | 3,990.20 | **26,158** |
| 3 | Neo Premium Interior Emulsion | N930 | 1 Ltr | 1,207.63 | 217.37 | **1,425** |
| 3 | Neo Premium Interior Emulsion | N930 | 4 Ltrs | 4,420.34 | 795.66 | **5,216** |
| 3 | Neo Premium Interior Emulsion | N930 | 16 Ltrs | 17,170.34 | 3,090.66 | **20,261** |
| 4 | Neo Interior Plastic Emulsion *(selective shades)* | N949 | 0.91 Ltrs | 908.47 | 163.53 | **1,072** |
| 4 | Neo Interior Plastic Emulsion *(selective shades)* | N949 | 3.64 Ltrs | 3,894.92 | 701.08 | **4,596** |
| 4 | Neo Interior Plastic Emulsion *(selective shades)* | N949 | 14.56 Ltrs | 14,382.20 | 2,588.80 | **16,971** |
| 5 | Zen Wall Care Interior Emulsion | N950 | 0.91 Ltr | 671.19 | 120.81 | **792** |
| 5 | Zen Wall Care Interior Emulsion | N950 | 3.64 Ltrs | 2,481.36 | 446.64 | **2,928** |
| 5 | Zen Wall Care Interior Emulsion | N950 | 14.56 Ltrs | 9,155.08 | 1,647.92 | **10,803** |
| 6 | Zen Interior Emulsion | N914 | 1.5 Kgs | 571.19 | 102.81 | **674** |
| 6 | Zen Interior Emulsion | N914 | 6 Kgs | 1,941.53 | 349.47 | **2,291** |
| 6 | Zen Interior Emulsion | N914 | 24 Kgs | 7,396.61 | 1,331.39 | **8,728** |

### Exterior Emulsions

| # | Product | Code | Pack Size | Retail | Tax 18% | **Total Price** |
|---|---------|------|-----------|--------|---------|-----------------|
| 7 | Neo Premium Exterior Emulsion | N925 | 1 Ltr | 1,450.85 | 261.15 | **1,712** |
| 7 | Neo Premium Exterior Emulsion | N925 | 4 Ltrs | 5,335.59 | 960.41 | **6,296** |
| 7 | Neo Premium Exterior Emulsion | N925 | 16 Ltrs | 20,662.71 | 3,719.29 | **24,382** |
| 8 | Neo Power Guard *(selective shades)* | N945 | 4 Ltrs | 4,166.95 | 750.05 | **4,917** |
| 8 | Neo Power Guard *(selective shades)* | N945 | 16 Ltrs | 15,885.59 | 2,859.41 | **18,745** |

### Enamels

| # | Product | Code | Pack Size | Retail | Tax 18% | **Total Price** |
|---|---------|------|-----------|--------|---------|-----------------|
| 9 | Neo Premium Matt Enamel | N312 | 0.91 Ltr | 1,650.85 | 297.15 | **1,948** |
| 9 | Neo Premium Matt Enamel | N312 | 3.64 Ltrs | 6,048.31 | 1,088.69 | **7,137** |
| 10 | Neo Premium Gloss Metallic Finish | N421 | 0.91 Ltr | 1,169.49 | 210.51 | **1,380** |
| 10 | Neo Premium Gloss Metallic Finish | N421 | 3.64 Ltrs | 4,220.34 | 759.66 | **4,980** |
| 11 | Neo Super Premium Enamel *(K-Spectrum only)* | N310 | 0.91 Ltr | 1,301.69 | 234.31 | **1,536** |
| 11 | Neo Super Premium Enamel *(K-Spectrum only)* | N310 | 3.64 Ltrs | 4,835.59 | 870.41 | **5,706** |
| 12 | Zen Gloss Enamel *(standard shades)* | N311 | 0.91 Ltr | 1,077.97 | 194.03 | **1,272** |
| 12 | Zen Gloss Enamel *(standard shades)* | N311 | 3.64 Ltrs | 4,121.19 | 741.81 | **4,863** |
| 12 | Zen Gloss Enamel *(Orange, Signal Red, New Signal Red, Signal Green, Golden Yellow)* | N311 | 0.91 Ltr | 1,207.63 | 217.37 | **1,425** |
| 12 | Zen Gloss Enamel *(Orange, Signal Red, New Signal Red, Signal Green, Golden Yellow)* | N311 | 3.64 Ltrs | 4,514.41 | 812.59 | **5,327** |

### Putty

| # | Product | Code | Pack Size | Retail | Tax 18% | **Total Price** |
|---|---------|------|-----------|--------|---------|-----------------|
| 13 | Neo Premium Sheesha Wall Putty | N963 | 20 Kgs | 6,101.69 | 1,098.31 | **7,200** |
| 14 | Neo Premium Exterior Wall Putty | N958 | 20 Kgs | 7,070.34 | 1,272.66 | **8,343** |
| 15 | Neo Premium Wall Putty | N957 | 20 Kgs | 6,073.73 | 1,093.27 | **7,167** |
| 16 | Zen Wall Putty Plus | N962 | 20 Kgs | 4,340.68 | 781.32 | **5,122** |
| 17 | Zen Wall Putty Plus | N962 | 5 Kgs | 1,235.59 | 222.41 | **1,458** |
| 18 | Zen Putty | N959-0088 | 18 Kgs | 3,739.83 | 673.17 | **4,413** |
| 19 | Zen Putty *(Fragrant & White Drummie)* | N959-0090 | 18 Kgs | 3,964.41 | 713.59 | **4,678** |

### Primers

| # | Product | Code | Pack Size | Retail | Tax 18% | **Total Price** |
|---|---------|------|-----------|--------|---------|-----------------|
| 20 | Neo Wall Primer (Oil) | N515 | 0.91 Ltrs | 1,172.88 | 211.12 | **1,384** |
| 20 | Neo Wall Primer (Oil) | N515 | 3.64 Ltrs | 4,190.68 | 754.32 | **4,945** |
| 20 | Neo Wall Primer (Oil) | N515 | 14.56 Ltrs | 15,721.19 | 2,829.81 | **18,551** |
| 21 | Neo Water Based Primer | N915 | 4 Ltrs | 3,114.41 | 560.59 | **3,675** |
| 21 | Neo Water Based Primer | N915 | 16 Ltrs | 11,876.27 | 2,137.73 | **14,014** |
| 22 | Neo Red Oxide Primer | N530 | 0.91 Ltrs | 838.14 | 150.86 | **989** |
| 22 | Neo Red Oxide Primer | N530 | 3.64 Ltrs | 3,080.51 | 554.49 | **3,635** |
| 23 | ZEN WB Wall Primer & Sealer | N915-0086 | 3.64 Ltrs | 1,547.46 | 278.54 | **1,826** |
| 23 | ZEN WB Wall Primer & Sealer | N915-0086 | 14.56 Ltrs | 5,444.07 | 979.93 | **6,424** |

### Wood Care

| # | Product | Code | Pack Size | Retail | Tax 18% | **Total Price** |
|---|---------|------|-----------|--------|---------|-----------------|
| 24 | Neo Wood Thinner | N841 | 0.91 Ltr | 887.29 | 159.71 | **1,047** |
| 24 | Neo Wood Thinner | N841 | 3.64 Ltrs | 3,188.98 | 574.02 | **3,763** |
| 25 | Neo Premium Wood Sealer | N015 | 0.91 Ltr | 1,734.75 | 312.25 | **2,047** |
| 25 | Neo Premium Wood Sealer | N015 | 3.64 Ltrs | 6,577.12 | 1,183.88 | **7,761** |
| 26 | Neo Premium Wood Lacquer Matt | N018-3333 | 0.91 Ltr | 2,155.08 | 387.92 | **2,543** |
| 26 | Neo Premium Wood Lacquer Matt | N018-3333 | 3.64 Ltrs | 7,746.61 | 1,394.39 | **9,141** |
| 27 | Neo Wood Lacquer Gloss | N018-3332 | 0.91 Ltr | 2,155.08 | 387.92 | **2,543** |
| 27 | Neo Wood Lacquer Gloss | N018-3332 | 3.64 Ltrs | 7,746.61 | 1,394.39 | **9,141** |
| 28 | Neo Varnish | N105-0120 | 0.75 Ltr | 1,023.73 | 184.27 | **1,208** |
| 28 | Neo Varnish | N105-0120 | 3.00 Ltrs | 3,661.02 | 658.98 | **4,320** |
| 29 | Neo Timber Varnish - Gloss | N105-0121 | 1 Ltr | 1,662.71 | 299.29 | **1,962** |
| 30 | Neo Timber Varnish - Matt | N105-0122 | 1 Ltr | 2,641.53 | 475.47 | **3,117** |

### Others

| # | Product | Code | Pack Size | Retail | Tax 18% | **Total Price** |
|---|---------|------|-----------|--------|---------|-----------------|
| 31 | Zen Texture | N965 | 20 Kgs | 5,384.75 | 969.25 | **6,354** |

**Catalogue summary:** 7 categories · 31 listed products · 67 pack-size/price options.

> *Note from the price list: "Material is subject to stock availability." and
> "18% Tax subject to the effective date of Govt. Notification." These notes should
> appear on the website.*

---

## Appendix B — Glossary

| Term | Meaning |
|------|---------|
| **Variant / Pack size** | A specific size of a product (e.g. 1 Ltr, 4 Ltrs, 20 Kgs), each with its own price |
| **NEO / ZEN** | The two Kaizen Paint brand lines; NEO is the premium line, ZEN the value line |
| **Product code / Line** | Kaizen's internal code for a product (e.g. `N920`) |
| **Click-to-Chat / `wa.me`** | A free WhatsApp link that opens a chat with a pre-filled message |
| **Admin Panel** | The private section where the shop owner manages products and orders |
| **RLS (Row Level Security)** | A database rule system ensuring users only access their own data |
| **MVP** | Minimum Viable Product — the smallest version that is genuinely useful |
| **Supabase / Vercel** | The cloud services that run the database and host the website |
| **Seed data** | The initial catalogue loaded into the database (the `products.json` file) |

---

*End of document. The accompanying `products.json` file contains the full
machine-readable catalogue ready to load into the database.*
