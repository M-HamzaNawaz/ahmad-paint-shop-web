"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { ColorShade, Product } from "@/lib/types";
import { useCart } from "./CartContext";
import {
  ArrowRightIcon,
  CartIcon,
  CheckIcon,
  CheckCircleIcon,
  MinusIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
} from "./Icons";

const MAX_QTY = 99;

const METALLIC_SHEEN =
  "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 58%, rgba(255,255,255,0.4) 100%)";

/**
 * Full purchase + colour gallery section for paint products that have
 * colour shades. Lets the customer pick a shade, pack size and quantity,
 * then add to cart with the chosen colour.
 */
export function ColorProductOrder({ product }: { product: Product }) {
  const { addItem } = useCart();
  const groups = product.details?.colorGroups ?? [];

  const allShades = useMemo(
    () => groups.flatMap((g) => g.shades),
    [groups],
  );
  const totalShades = allShades.length;

  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const selectedColor: ColorShade | null =
    allShades.find((c) => c.code === selectedCode) ?? null;

  const q = query.trim().toLowerCase();
  const filteredGroups = groups
    .map((g) => ({
      ...g,
      shades: q
        ? g.shades.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.code.toLowerCase().includes(q),
          )
        : g.shades,
    }))
    .filter((g) => g.shades.length > 0);
  const matchCount = filteredGroups.reduce((n, g) => n + g.shades.length, 0);

  if (!variant) return null;

  function selectColor(shade: ColorShade) {
    setSelectedCode((cur) => (cur === shade.code ? null : shade.code));
    setConfirmation(null);
  }

  function handleAdd() {
    addItem(product, variant!, qty, selectedColor);
    const colorPart = selectedColor
      ? ` in ${selectedColor.name} (${selectedColor.code})`
      : "";
    setConfirmation(
      `${qty} × ${product.name} — ${variant!.packSize}${colorPart} added to your cart`,
    );
  }

  return (
    <section id="order" className="scroll-mt-44">
      <div className="flex items-center gap-2">
        <PaletteIcon className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">
          Choose colour &amp; pack size
        </h2>
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        {totalShades} shades available · pick a colour, choose a pack and add to
        your cart.
      </p>

      {/* Purchase controls */}
      <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 lg:sticky lg:top-40 lg:z-30 lg:shadow-sm">
        {/* Pack size */}
        <p className="text-sm font-bold text-zinc-900">Pack size</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const selected = v.id === variant.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
                  selected
                    ? "border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                    : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                }`}
              >
                {v.packSize} · {formatPrice(v.totalPrice)}
              </button>
            );
          })}
        </div>

        {/* Selected colour + quantity + add */}
        <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-black/10"
              style={{
                backgroundColor: selectedColor ? selectedColor.hex : "#f4f4f5",
              }}
            />
            <div className="text-sm">
              {selectedColor ? (
                <>
                  <p className="font-bold text-zinc-900">
                    {selectedColor.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Shade {selectedColor.code}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-zinc-700">
                    No colour selected
                  </p>
                  <p className="text-xs text-zinc-400">Pick a shade below</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-zinc-300">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                disabled={qty <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-9 text-center font-bold text-zinc-900">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((n) => Math.min(MAX_QTY, n + 1))}
                disabled={qty >= MAX_QTY}
                className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-40"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              <CartIcon className="h-5 w-5" />
              Add · {formatPrice(variant.totalPrice * qty)}
            </button>
          </div>
        </div>

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
                href="/checkout"
                className="rounded-full border border-green-300 bg-white px-4 py-2 text-xs font-bold text-green-800 transition hover:bg-green-100"
              >
                Checkout
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {/* Colour gallery */}
      <div className="mt-6">
        <div className="relative max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shade by name or number…"
            aria-label="Search colours"
            className="w-full rounded-full border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {q ? (
          <p className="mt-3 text-sm text-zinc-500">
            {matchCount} {matchCount === 1 ? "shade" : "shades"} found
          </p>
        ) : null}

        {filteredGroups.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-10 text-center text-sm text-zinc-500">
            No shade matches &ldquo;{query}&rdquo;. Try another name or number.
          </p>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.label} className="mt-6">
              <h3 className="text-sm font-bold text-zinc-900">
                {group.label}
                <span className="ml-2 font-medium text-zinc-400">
                  {group.shades.length} shades
                </span>
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {group.shades.map((shade) => {
                  const selected = shade.code === selectedCode;
                  return (
                    <button
                      key={shade.code}
                      type="button"
                      onClick={() => selectColor(shade)}
                      className="group/swatch text-left"
                      aria-pressed={selected}
                    >
                      <span
                        className={`relative block aspect-square w-full rounded-xl ring-1 ring-black/10 transition group-hover/swatch:scale-[1.04] ${
                          selected
                            ? "ring-2 ring-zinc-900 ring-offset-2"
                            : ""
                        }`}
                        style={{ backgroundColor: shade.hex }}
                      >
                        {group.metallic ? (
                          <span
                            className="absolute inset-0 rounded-xl"
                            style={{ background: METALLIC_SHEEN }}
                          />
                        ) : null}
                        {selected ? (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white shadow">
                              <CheckIcon className="h-4 w-4" />
                            </span>
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1.5 block truncate text-xs font-semibold text-zinc-800">
                        {shade.name}
                      </span>
                      <span className="block text-[11px] text-zinc-400">
                        Shade {shade.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}

        <p className="mt-6 text-xs text-zinc-400">
          On-screen colours are approximate and may vary slightly from the
          actual paint. Ask us on WhatsApp for a physical shade card.
        </p>
      </div>
    </section>
  );
}
