"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/catalog";
import { SHOP } from "@/lib/shop";
import { shopWhatsAppUrl } from "@/lib/whatsapp";
import { useCart } from "./CartContext";
import { CartIcon, SearchIcon, WhatsAppIcon } from "./Icons";

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full px-3.5 py-1.5 font-medium transition ${
        active
          ? "bg-orange-100 text-orange-700"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, ready } = useCart();
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Slide header out of view when scrolling down past a threshold,
  // bring it back the moment the user scrolls up — same pattern as
  // most mobile apps. Uses a small delta to avoid jitter.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (Math.abs(diff) < 6) return;
      if (currentY < 80) {
        setHidden(false);
      } else if (diff > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  const searchBox = (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search paint, putty, primer or code…"
        aria-label="Search products"
        className="w-full rounded-full border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-40 shadow-md shadow-zinc-900/5 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Announcement strip */}
      <div className="bg-zinc-900 text-[11px] text-zinc-300 sm:text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-0.5 px-4 py-1.5 text-center">
          <span>{SHOP.taxNote}</span>
          <a
            href={shopWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-whatsapp"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Order on WhatsApp: {SHOP.whatsappDisplay}
          </a>
        </div>
      </div>

      {/* Main bar — dark, so the logo blends in */}
      <div className="bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 py-3">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label={SHOP.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt={SHOP.name}
                className="h-12 w-auto sm:h-14"
              />
            </Link>

            <form onSubmit={onSearch} className="mx-auto hidden max-w-xl flex-1 md:flex">
              {searchBox}
            </form>

            <Link
              href="/cart"
              className="relative ml-auto flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 md:ml-0"
            >
              <CartIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {ready && totalItems > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          </div>

          {/* Search — mobile */}
          <form onSubmit={onSearch} className="pb-3 md:hidden">
            {searchBox}
          </form>
        </div>
      </div>

      {/* Category / nav bar */}
      <nav className="border-t border-zinc-100 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="scroll-fade-x flex gap-1 overflow-x-auto py-2 text-sm whitespace-nowrap scrollbar-none">
            <NavLink href="/products" active={pathname === "/products"}>
              All Products
            </NavLink>
            {CATEGORIES.map((c) => (
              <NavLink
                key={c.slug}
                href={`/category/${c.slug}`}
                active={pathname === `/category/${c.slug}`}
              >
                {c.name}
              </NavLink>
            ))}
            <NavLink href="/about" active={pathname === "/about"}>
              About
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
