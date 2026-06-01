# Ahmad Paint Shop — Website Project

A modern, responsive e-commerce web catalogue for Ahmad Paint Shop. Customers can browse the full paint catalogue, manage a cart, and place orders directly with no sign-up or accounts required.

Placing an order instantly opens WhatsApp on the customer's phone with a pre-filled order message addressed directly to the shop (**0346-8803287**) — the customer just taps "Send". The shop owner utilizes a secure Admin Panel to add new products, manage current inventory, and update prices in real-time with zero technical knowledge. Every order is automatically logged and permanently stored within the Admin Panel dashboard.

---

## 📁 Repository Structure & Package Files

- **`website/`** — The complete frontend development codebase for the client application and layout components.
- **`DOCUMENTATION.md`** — The complete build specification detailing system features, custom screens, admin panels, WhatsApp logic templates, database schema, project roadmaps, and hosting configurations.
- **`products.json`** — The complete machine-readable product catalog covering 7 categories, 31 unique products, and 67 separate pack sizes ready for bulk database integration.

---

## 🛠️ Recommended Technology Stack

- **Frontend Framework:** Next.js (App Router) + TypeScript
- **Styling Engine:** Tailwind CSS
- **Database & Auth backend:** Supabase (Database records, Admin auth, and Image Bucket storage)
- **Application Hosting:** Vercel
- **Ordering Channel:** WhatsApp Click-to-Chat API

_Note: All recommended technologies run completely on community free-tiers at a single-shop operational scale._

---

## 🗺️ Project Status & Roadmap

- 📄 **Current Phase:** Documentation & Specification Phase.
- 🚀 **Next Steps:** Review and approve the layout spec, then initialize the functional database schemas to begin active frontend feature development.
- ⏳ **Estimated Timeline:** ~5 Weeks for a single dedicated developer.

---

## 💻 Core Application Structure

```text
website/
├── app/                  # Application Pages (Next.js App Router)
│   ├── page.tsx           # Home Dashboard (Hero, categories, featured)
│   ├── products/          # Full Catalog Browsing
│   ├── category/[slug]/   # Targeted Category Filtering
│   ├── product/[id]/      # Product Profiles & Pack-Size Selectors
│   ├── cart/ & checkout/  # Localized Cart & Order Formulation
│   ├── order/[number]/    # Order Completion & Dispatches
│   └── about/             # Contact Information & Shop Profiles
├── components/            # Global UI Layout Components (Header, Footer, Cart Widgets)
└── lib/
    ├── catalog.ts         # Fixed Product Catalogs (Kaizen Inventory Profiles)
    ├── shop.ts            # Core Configuration Variables (Shop name, WhatsApp API targets)
    └── whatsapp.ts        # String Formatting Engine for Pre-Filled WhatsApp messaging
```
