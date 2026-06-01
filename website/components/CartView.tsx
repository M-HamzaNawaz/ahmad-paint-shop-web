"use client";

import Link from "next/link";
import { getProductById } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/types";
import { useCart } from "./CartContext";
import { BrandBadge } from "./BrandBadge";
import { ProductImage } from "./ProductImage";
import {
  ArrowRightIcon,
  CartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "./Icons";

const MAX_QTY = 99;

export function CartView() {
  const { items, totalItems, totalPrice, ready, updateQuantity, removeItem, clearCart } =
    useCart();

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-zinc-500">
        Loading your cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
          <CartIcon className="h-9 w-9" />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold text-zinc-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-zinc-500">
          Browse our paints, putty and primers and add what you need.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Browse Products
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        Your Cart
      </h1>
      <p className="mt-1 text-zinc-500">
        {totalItems} {totalItems === 1 ? "item" : "items"} ready to order
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <ul className="space-y-3">
            {items.map((item) => (
              <CartRow
                key={item.lineId}
                item={item}
                onQuantity={(q) => updateQuantity(item.lineId, q)}
                onRemove={() => removeItem(item.lineId)}
              />
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <Link
              href="/products"
              className="text-sm font-semibold text-primary hover:underline"
            >
              ← Continue shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-semibold text-zinc-500 hover:text-red-600"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 lg:sticky lg:top-44">
            <h2 className="text-lg font-bold text-zinc-900">Order summary</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Items</dt>
                <dd className="font-semibold text-zinc-900">{totalItems}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Subtotal</dt>
                <dd className="font-semibold text-zinc-900">
                  {formatPrice(totalPrice)}
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="font-bold text-zinc-900">Estimated total</span>
              <span className="text-xl font-extrabold text-zinc-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Link
              href="/checkout"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Proceed to Checkout
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-zinc-400">
              Delivery charges (if any) and final price are confirmed by the
              shop on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartRow({
  item,
  onQuantity,
  onRemove,
}: {
  item: CartItem;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  const product = getProductById(item.productId);
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4">
      {/* Thumbnail */}
      <Link
        href={`/product/${item.productId}`}
        className="shrink-0"
        aria-label={item.productName}
      >
        {product ? (
          <ProductImage product={product} className="h-24 w-24 rounded-xl" />
        ) : (
          <div className="h-24 w-24 rounded-xl bg-zinc-100" />
        )}
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${item.productId}`}
              className="line-clamp-2 font-semibold text-zinc-900 hover:text-orange-700"
            >
              {item.productName}
            </Link>
            <p className="mt-0.5 text-xs text-zinc-500">
              {item.packSize}
              {item.productLine ? ` · Code ${item.productLine}` : ""}
            </p>
            {item.colorName ? (
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-zinc-700">
                <span
                  className="h-3.5 w-3.5 rounded-full ring-1 ring-black/15"
                  style={{ backgroundColor: item.colorHex ?? "#e4e4e7" }}
                />
                {item.colorName} ({item.colorCode})
              </p>
            ) : null}
            <div className="mt-1.5">
              <BrandBadge brand={item.brand} />
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove item"
            className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          {/* Quantity */}
          <div className="flex items-center rounded-full border border-zinc-300">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => onQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40"
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span className="w-9 text-center text-sm font-bold text-zinc-900">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => onQuantity(item.quantity + 1)}
              disabled={item.quantity >= MAX_QTY}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40"
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-bold text-zinc-900">{formatPrice(lineTotal)}</p>
            <p className="text-xs text-zinc-400">
              {formatPrice(item.unitPrice)} each
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
