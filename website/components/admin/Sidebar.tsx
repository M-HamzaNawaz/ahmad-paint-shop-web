"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { logout } from "@/app/admin/actions";
import {
  CartIcon,
  CloseIcon,
  GridIcon,
  LayersIcon,
  LogOutIcon,
  MenuIcon,
  PaintBucketIcon,
  SettingsIcon,
} from "@/components/Icons";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: GridIcon, exact: true },
  { href: "/admin/products", label: "Products", icon: PaintBucketIcon },
  { href: "/admin/categories", label: "Categories", icon: LayersIcon },
  { href: "/admin/orders", label: "Orders", icon: CartIcon },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface Stats {
  pendingOrders: number;
}

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Live pending-orders badge — refetches every 30 seconds.
  const { data: stats } = useQuery<Stats>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to load stats");
      return res.json();
    },
    refetchInterval: 30_000,
    staleTime: 20_000,
  });
  const pending = stats?.pendingOrders ?? 0;

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-zinc-900 px-4 text-white lg:hidden">
        <Link
          href="/admin"
          onClick={() => setOpen(false)}
          className="text-base font-extrabold tracking-tight"
        >
          APH Admin
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </header>

      {/* Backdrop on mobile */}
      {open ? (
        <div
          onClick={() => setOpen(false)}
          aria-hidden
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      ) : null}

      {/* Sidebar — slides in on mobile, fixed on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-zinc-900 text-zinc-300 transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand + close (mobile) */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-5">
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600 text-sm font-extrabold text-white">
              APH
            </span>
            <span className="text-base font-extrabold text-white">Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Admin tools
          </p>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href, item.exact);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-orange-500/15 text-orange-300"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.href === "/admin/orders" && pending > 0 ? (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[11px] font-bold text-white">
                        {pending}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info + sign out */}
        <div className="border-t border-zinc-800 p-3">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="truncate text-xs font-semibold text-white">
              {email}
            </p>
            <p className="mt-0.5 text-[11px] text-zinc-500">Shop admin</p>
          </div>
          <form action={logout} className="mt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              <LogOutIcon className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
