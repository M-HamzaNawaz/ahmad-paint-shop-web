"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";
import type { ShopSettings } from "@/lib/db/settings";
import { shopWhatsAppUrl } from "@/lib/whatsapp";
import { ClockIcon, MapPinIcon, WhatsAppIcon } from "./Icons";

export function Footer({
  categories,
  shop,
}: {
  categories: Category[];
  shop: ShopSettings;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-16 bg-zinc-900 text-zinc-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={shop.name}
              className="h-14 w-auto"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Your trusted shop for Kaizen (NEO &amp; ZEN) and Nippon Paint —
            emulsions, enamels, putty, primers and wood-care products.
          </p>
          <a
            href={shopWhatsAppUrl(shop, "Hello! I have a question about your paint products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat with us
          </a>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Shop
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About &amp; Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">
            Visit Us
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{shop.address}</span>
            </li>
            <li className="flex gap-2.5">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
              <a
                href={shopWhatsAppUrl(shop)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {shop.whatsappDisplay}
              </a>
            </li>
            <li className="flex gap-2.5">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{shop.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {shop.name}. Authorised retailer of{" "}
            {shop.supplier}.
          </p>
          <p>Price list effective {shop.priceListDate} · {shop.taxNote}</p>
        </div>
      </div>
    </footer>
  );
}
