import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/db/categories";
import { formatPrice } from "@/lib/format";
import { StatCard } from "@/components/admin/StatCard";
import {
  OrdersByStatusChart,
  ProductsByBrandChart,
  ProductsByCategoryChart,
} from "@/components/admin/DashboardCharts";
import {
  ArrowRightIcon,
  CartIcon,
  LayersIcon,
  PaintBucketIcon,
} from "@/components/Icons";
import type { Brand } from "@/lib/types";
import type { OrderStatus } from "@/lib/db/adminOrders";

interface OrderRow {
  order_number: string;
  customer_name: string;
  order_total: number;
  total_items: number;
  status: OrderStatus;
  created_at: string;
}

interface ProductRow {
  id: string;
  brand: Brand;
  category_slug: string;
  featured: boolean;
  hidden: boolean;
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [productsRes, ordersRes, categories] = await Promise.all([
    supabase
      .from("products")
      .select("id, brand, category_slug, featured, hidden"),
    supabase
      .from("orders")
      .select("order_number, customer_name, order_total, total_items, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    getCategories(),
  ]);
  const products = (productsRes.data ?? []) as ProductRow[];
  const orders = (ordersRes.data ?? []) as OrderRow[];

  // ---------- Stats ----------
  const totalProducts = products.length;
  const hiddenProducts = products.filter((p) => p.hidden).length;
  const liveProducts = totalProducts - hiddenProducts;
  const featuredCount = products.filter((p) => p.featured).length;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.order_total), 0);

  const recentOrders = orders.slice(0, 5);

  // ---------- Chart data ----------
  const brandCounts = products.reduce<Record<Brand, number>>(
    (acc, p) => {
      acc[p.brand] = (acc[p.brand] ?? 0) + 1;
      return acc;
    },
    { Neo: 0, Zen: 0, Nippon: 0 },
  );
  const brandData = Object.entries(brandCounts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  const categoryData = categories.map((c) => ({
    name: c.name,
    value: products.filter((p) => p.category_slug === c.slug).length,
  }));

  const statusCounts: Record<OrderStatus, number> = {
    pending: pendingOrders,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: deliveredOrders,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };
  const statusData = (
    ["pending", "confirmed", "delivered", "cancelled"] as const
  )
    .filter((s) => statusCounts[s] > 0)
    .map((s) => ({
      name: s.charAt(0).toUpperCase() + s.slice(1),
      value: statusCounts[s],
    }));

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl sm:p-8">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -right-4 h-44 w-44 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-sm font-medium text-white/85">
            Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""} 👋
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Here&apos;s how your shop is doing today.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/80">
            {totalOrders === 0
              ? "You haven't received any orders yet. Share your link with customers — once orders come in, you'll see trends and stats here."
              : `${totalOrders} order${totalOrders === 1 ? "" : "s"} so far, ${pendingOrders} awaiting your reply.`}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
            >
              Add Product
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              View Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Products"
          value={totalProducts}
          hint={`${liveProducts} live · ${hiddenProducts} hidden · ${featuredCount} featured`}
          href="/admin/products"
          tint="orange"
          icon={<PaintBucketIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Categories"
          value={categories.length}
          hint="Edit, rename or add new"
          href="/admin/categories"
          tint="purple"
          icon={<LayersIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Orders"
          value={totalOrders}
          hint={
            totalOrders
              ? `${pendingOrders} pending · ${deliveredOrders} delivered`
              : "Waiting for your first order"
          }
          href="/admin/orders"
          tint="blue"
          icon={<CartIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Revenue"
          value={formatPrice(totalRevenue)}
          hint="Across all non-cancelled orders"
          tint="green"
          icon={<CartIcon className="h-5 w-5" />}
        />
      </section>

      {/* Charts */}
      <section className="grid gap-4 lg:grid-cols-3">
        <ProductsByBrandChart data={brandData} />
        <div className="lg:col-span-2">
          <ProductsByCategoryChart data={categoryData} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <OrdersByStatusChart data={statusData} />

        {/* Recent orders */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                Recent orders
              </h3>
              <p className="mt-0.5 text-xs text-zinc-500">
                Last 5 placed via the customer site.
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-orange-600"
            >
              View all
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="mt-6 flex h-48 flex-col items-center justify-center rounded-xl bg-zinc-50 text-center">
              <CartIcon className="h-8 w-8 text-zinc-300" />
              <p className="mt-2 text-sm font-medium text-zinc-700">
                No orders yet
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Customer orders will show here.
              </p>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-zinc-100">
              {recentOrders.map((o) => (
                <li key={o.order_number}>
                  <Link
                    href={`/admin/orders/${o.order_number}`}
                    className="flex items-center justify-between gap-3 py-3 transition hover:bg-zinc-50/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-zinc-900">
                        {o.customer_name}
                      </p>
                      <p className="font-mono text-[11px] text-zinc-400">
                        {o.order_number}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-zinc-900">
                        {formatPrice(Number(o.order_total))}
                      </p>
                      <span
                        className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusPillStyle(o.status)}`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function statusPillStyle(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-700";
    case "confirmed":
      return "bg-blue-50 text-blue-700";
    case "delivered":
      return "bg-green-50 text-green-700";
    case "cancelled":
      return "bg-zinc-100 text-zinc-600";
  }
}
