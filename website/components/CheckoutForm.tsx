"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { generateOrderNumber, saveOrder } from "@/lib/order";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { submitOrder } from "@/app/checkout/actions";
import type { ShopSettings } from "@/lib/db/settings";
import type { Order } from "@/lib/types";
import { useCart } from "./CartContext";
import { ArrowRightIcon, CartIcon, WhatsAppIcon } from "./Icons";

interface FormState {
  name: string;
  whatsapp: string;
  address: string;
  notes: string;
}

type FieldErrors = Partial<Record<"name" | "whatsapp" | "address", string>>;

export function CheckoutForm({ shop }: { shop: ShopSettings }) {
  const router = useRouter();
  const { items, totalItems, totalPrice, ready, clearCart } = useCart();

  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-zinc-500">
        Loading…
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
          Nothing to check out
        </h1>
        <p className="mt-2 text-zinc-500">
          Your cart is empty — add some products first.
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

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field !== "notes" && errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    const digits = form.whatsapp.replace(/\D/g, "");
    if (!form.whatsapp.trim()) {
      next.whatsapp = "Please enter your WhatsApp number.";
    } else if (digits.length < 10 || digits.length > 15) {
      next.whatsapp = "Please enter a valid phone number.";
    }
    if (!form.address.trim()) {
      next.address = "Please enter your delivery address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const order: Order = {
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      items,
      totalItems,
      orderTotal: totalPrice,
      customer: {
        name: form.name.trim(),
        whatsapp: form.whatsapp.trim(),
        address: form.address.trim(),
        notes: form.notes.trim(),
      },
    };

    saveOrder(order);

    // Open WhatsApp with the pre-filled order (within the click gesture).
    window.open(buildWhatsAppUrl(order, shop), "_blank");

    // Save to DB in the background — non-blocking. If it fails the user
    // still has their WhatsApp message and local order copy.
    submitOrder(order).then((result) => {
      if (result.error) {
        console.error("Order DB save failed:", result.error);
      }
    });

    clearCart();
    router.push(`/order/${order.orderNumber}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-sm text-zinc-500">
        <Link href="/cart" className="hover:text-zinc-800">
          Cart
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-800">Checkout</span>
      </nav>

      <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-1 text-zinc-500">
        Enter your details — your order will open in WhatsApp, ready to send to
        the shop.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-8 lg:grid-cols-3"
        noValidate
      >
        {/* Details */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-zinc-900">Your details</h2>

            <div className="mt-4 space-y-4">
              <Field
                label="Full name"
                required
                error={errors.name}
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="e.g. Abdul Rehman"
                autoComplete="name"
              />
              <Field
                label="WhatsApp number"
                required
                error={errors.whatsapp}
                value={form.whatsapp}
                onChange={(v) => update("whatsapp", v)}
                placeholder="e.g. 0300 1234567"
                type="tel"
                autoComplete="tel"
                hint="The shop will contact you on this number to confirm your order."
              />
              <Field
                label="Delivery address"
                required
                error={errors.address}
                value={form.address}
                onChange={(v) => update("address", v)}
                placeholder="House / shop, street, area, city"
                textarea
                autoComplete="street-address"
              />
              <Field
                label="Order notes (optional)"
                value={form.notes}
                onChange={(v) => update("notes", v)}
                placeholder="Any colour shade, delivery time or other instructions"
                textarea
              />
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-orange-50 px-4 py-3">
            <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
            <p className="text-xs leading-relaxed text-zinc-600">
              When you place the order, WhatsApp opens with your order details
              pre-filled in a message to{" "}
              <span className="font-semibold text-zinc-800">
                {shop.whatsappDisplay}
              </span>
              . Just tap <span className="font-semibold">Send</span> — the
              message goes from your own WhatsApp number. On a computer, this
              opens WhatsApp Web.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 lg:sticky lg:top-44">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900">Your order</h2>
              <Link
                href="/cart"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Edit
              </Link>
            </div>

            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.lineId} className="flex justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="line-clamp-2 font-medium text-zinc-800">
                      {item.productName}
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {item.packSize}
                      {item.colorName
                        ? ` · ${item.colorName} (${item.colorCode})`
                        : ""}{" "}
                      × {item.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold text-zinc-900">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Items</span>
                <span className="font-semibold text-zinc-900">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-zinc-900">Estimated total</span>
                <span className="text-lg font-extrabold text-zinc-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold text-white transition hover:bg-whatsapp-dark disabled:opacity-60"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {submitting ? "Opening WhatsApp…" : "Place Order on WhatsApp"}
            </button>
            <p className="mt-3 text-center text-xs text-zinc-400">
              Final price, stock and delivery are confirmed by the shop on
              WhatsApp.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  required = false,
  type = "text",
  textarea = false,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const base =
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2";
  const state = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
    : "border-zinc-300 focus:border-orange-500 focus:ring-orange-100";

  return (
    <div>
      <label className="block text-sm font-semibold text-zinc-800">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={3}
          className={`mt-1.5 resize-y ${base} ${state}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`mt-1.5 ${base} ${state}`}
        />
      )}
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-zinc-400">{hint}</p>
      ) : null}
    </div>
  );
}
