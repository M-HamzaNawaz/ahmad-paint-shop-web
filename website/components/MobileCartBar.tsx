"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartContext";
import { ArrowRightIcon, CartIcon } from "./Icons";

/** Sticky bottom cart bar — shown on mobile when the cart has items. */
export function MobileCartBar() {
  const { totalItems, totalPrice, ready } = useCart();
  const pathname = usePathname();

  const hiddenOnPage =
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname.startsWith("/order/");

  if (!ready || totalItems === 0 || hiddenOnPage) return null;

  return (
    <>
      {/* Spacer keeps the footer fully visible above the fixed bar. */}
      <div className="h-20 md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white p-3 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] md:hidden">
        <Link
          href="/cart"
          className="flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-white"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <CartIcon className="h-5 w-5" />
            {totalItems} item{totalItems > 1 ? "s" : ""} · {formatPrice(totalPrice)}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold">
            View Cart
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </>
  );
}
