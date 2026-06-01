"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartContext";
import {
  ArrowRightIcon,
  CartIcon,
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
} from "./Icons";

const MAX_QTY = 99;

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  if (!variant) return null;

  function handleAdd() {
    addItem(product, variant!, qty);
    setConfirmation(`${qty} × ${variant!.packSize} added to your cart`);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      {/* Pack size */}
      <p className="text-sm font-bold text-zinc-900">Choose pack size</p>
      <div className="mt-3 space-y-2">
        {product.variants.map((v) => {
          const selected = v.id === variant.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setVariantId(v.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                selected
                  ? "border-orange-500 bg-orange-50 ring-1 ring-orange-200"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    selected ? "border-orange-500" : "border-zinc-300"
                  }`}
                >
                  {selected ? (
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                  ) : null}
                </span>
                <span className="font-semibold text-zinc-900">{v.packSize}</span>
              </span>
              <span className="font-bold text-zinc-900">
                {formatPrice(v.totalPrice)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quantity */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-bold text-zinc-900">Quantity</span>
        <div className="flex items-center rounded-full border border-zinc-300">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40"
            disabled={qty <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-bold text-zinc-900">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40"
            disabled={qty >= MAX_QTY}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
        <span className="text-sm text-zinc-500">Subtotal</span>
        <span className="text-xl font-extrabold text-zinc-900">
          {formatPrice(variant.totalPrice * qty)}
        </span>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
      >
        <CartIcon className="h-5 w-5" />
        Add to Cart
      </button>

      {confirmation ? (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3.5">
          <p className="flex items-center gap-2 text-sm font-semibold text-green-800">
            <CheckCircleIcon className="h-4 w-4" />
            {confirmation}
          </p>
          <div className="mt-2.5 flex gap-2">
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-700"
            >
              View Cart
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-green-300 bg-white px-4 py-2 text-xs font-bold text-green-800 transition hover:bg-green-100"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      ) : null}

      <p className="mt-3 text-center text-xs text-zinc-400">
        Price includes 18% sales tax · Final price confirmed on WhatsApp
      </p>
    </div>
  );
}
