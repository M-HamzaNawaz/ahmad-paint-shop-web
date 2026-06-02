import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export const metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated visitors hit the login page, which renders its own
  // standalone UI inside <main>. Skip the admin shell here so the login
  // page stays clean.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-[calc(100vh-200px)] bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-base font-extrabold text-zinc-900">
              Admin
            </Link>
            <nav className="hidden gap-4 text-sm font-medium text-zinc-600 sm:flex">
              <Link href="/admin" className="hover:text-zinc-900">
                Dashboard
              </Link>
              <Link href="/admin/products" className="hover:text-zinc-900">
                Products
              </Link>
              <Link href="/admin/orders" className="hover:text-zinc-900">
                Orders
              </Link>
              <Link href="/admin/settings" className="hover:text-zinc-900">
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-zinc-500 sm:inline">{user.email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full bg-zinc-100 px-3.5 py-1.5 font-medium text-zinc-800 transition hover:bg-zinc-200"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
    </div>
  );
}
