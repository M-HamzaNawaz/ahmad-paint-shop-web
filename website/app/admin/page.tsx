import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Quick counts to fill the dashboard. More detail comes in sub-phase 4+.
  const [productsRes, ordersRes, hiddenRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("order_number", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("hidden", true),
  ]);

  const totalProducts = productsRes.count ?? 0;
  const totalOrders = ordersRes.count ?? 0;
  const hiddenProducts = hiddenRes.count ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        Dashboard
      </h1>
      <p className="mt-1 text-zinc-500">
        Welcome back. Here is a snapshot of your shop.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total products" value={totalProducts} href="/admin/products" />
        <StatCard label="Hidden products" value={hiddenProducts} href="/admin/products?hidden=1" />
        <StatCard label="Orders" value={totalOrders} href="/admin/orders" />
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
        <p className="font-semibold text-zinc-700">Coming next</p>
        <p className="mt-1">
          Product CRUD, order management and shop settings — being built in
          sub-phases 4-6.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
    >
      <p className="text-sm font-medium text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-zinc-900">{value}</p>
    </Link>
  );
}
