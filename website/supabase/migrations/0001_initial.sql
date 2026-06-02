-- =====================================================================
-- Ahmad Paint House — initial database schema
-- =====================================================================
-- How to apply:
--   1. Open your Supabase project → SQL Editor → New query.
--   2. Paste this entire file → Run.
--   3. Then run the seed script: `npm run seed`.
--
-- This schema mirrors the static catalogue currently in lib/catalog.ts
-- and lib/nipponProducts.ts. After seeding, the customer-facing site
-- will read from these tables instead of the .ts files.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------------------
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text not null default '',
  gradient    text not null default 'from-zinc-100 to-slate-200',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists categories_sort_order_idx on public.categories (sort_order);

-- ---------------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id            text primary key,
  sr_no         int  not null default 0,
  name          text not null,
  brand         text not null check (brand in ('Neo', 'Zen', 'Nippon')),
  product_line  text not null default '',
  category_slug text not null references public.categories(slug) on delete restrict,
  description   text not null default '',
  note          text,
  image         text,
  featured      boolean not null default false,
  hidden        boolean not null default false,
  details       jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_slug);
create index if not exists products_brand_idx    on public.products (brand);
create index if not exists products_featured_idx on public.products (featured) where featured = true;
create index if not exists products_hidden_idx   on public.products (hidden);
create index if not exists products_sr_no_idx    on public.products (sr_no);

-- ---------------------------------------------------------------------
-- VARIANTS (pack sizes & prices, one product → many variants)
-- ---------------------------------------------------------------------
create table if not exists public.variants (
  id            text primary key,
  product_id    text not null references public.products(id) on delete cascade,
  pack_size     text not null,
  retail_price  numeric(12,2) not null default 0,
  sales_tax     numeric(12,2) not null default 0,
  total_price   numeric(12,2) not null default 0,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists variants_product_idx on public.variants (product_id);

-- ---------------------------------------------------------------------
-- ORDERS (saved when a customer completes the WhatsApp checkout)
-- ---------------------------------------------------------------------
create table if not exists public.orders (
  order_number      text primary key,
  customer_name     text not null,
  customer_whatsapp text not null,
  customer_address  text not null,
  customer_notes    text,
  items             jsonb not null,
  total_items       int  not null default 0,
  order_total       numeric(12,2) not null default 0,
  status            text not null default 'pending'
                    check (status in ('pending','confirmed','delivered','cancelled')),
  created_at        timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);

-- ---------------------------------------------------------------------
-- SETTINGS (single-row config — id is locked to 1)
-- ---------------------------------------------------------------------
create table if not exists public.settings (
  id               int primary key default 1 check (id = 1),
  shop_name        text not null default 'Ahmad Paint House',
  supplier         text not null default 'Kaizen Paint & Nippon Paint',
  whatsapp         text not null default '923468803287',
  whatsapp_display text not null default '0346-8803287',
  address          text not null default '',
  hours            text not null default '',
  tax_note         text not null default 'All prices include 18% sales tax',
  price_list_date  text not null default 'April 2026',
  updated_at       timestamptz not null default now()
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------
alter table public.categories enable row level security;
alter table public.products   enable row level security;
alter table public.variants   enable row level security;
alter table public.orders     enable row level security;
alter table public.settings   enable row level security;

-- Public read access (customer-facing site)
create policy "categories_public_read" on public.categories for select using (true);
create policy "products_public_read"   on public.products   for select using (hidden = false);
create policy "variants_public_read"   on public.variants   for select using (true);
create policy "settings_public_read"   on public.settings   for select using (true);

-- Public can place orders (customer checkout)
create policy "orders_public_insert"   on public.orders     for insert with check (true);

-- Authenticated admins can do anything
create policy "categories_admin_all" on public.categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "products_admin_all"   on public.products   for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "variants_admin_all"   on public.variants   for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "orders_admin_all"     on public.orders     for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "settings_admin_all"   on public.settings   for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- Auto-update `updated_at` on row changes
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists settings_set_updated_at on public.settings;
create trigger settings_set_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();
