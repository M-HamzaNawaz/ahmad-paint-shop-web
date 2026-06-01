"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDateTime, formatPrice } from "@/lib/format";
import { getOrderByNumber } from "@/lib/order";
import { SHOP } from "@/lib/shop";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Order } from "@/lib/types";
import { ArrowRightIcon, CheckCircleIcon, WhatsAppIcon } from "./Icons";

export function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrder(getOrderByNumber(orderNumber) ?? null);
    setLoaded(true);
  }, [orderNumber]);

  if (!loaded) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-zinc-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Success header */}
      <div className="text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircleIcon className="h-11 w-11" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold text-zinc-900 sm:text-3xl">
          Order placed!
        </h1>
        <p className="mt-1.5 text-zinc-500">
          Order number{" "}
          <span className="font-semibold text-zinc-800">{orderNumber}</span>
        </p>
      </div>

      {/* Final step */}
      <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-bold text-amber-900">One last step</h2>
        <p className="mt-1 text-sm leading-relaxed text-amber-800">
          Your order has opened in WhatsApp as a message to{" "}
          <span className="font-semibold">{SHOP.whatsappDisplay}</span>. Please
          tap <span className="font-semibold">Send</span> in WhatsApp to deliver
          it to the shop. If WhatsApp did not open, use the button below.
        </p>
        {order ? (
          <a
            href={buildWhatsAppUrl(order)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold text-white transition hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Open WhatsApp &amp; Send Order
          </a>
        ) : null}
      </div>

      {/* Order details */}
      {order ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-zinc-900">Order details</h2>
            <span className="text-xs text-zinc-400">
              {formatDateTime(order.createdAt)}
            </span>
          </div>

          <dl className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
            <Detail label="Name" value={order.customer.name} />
            <Detail label="WhatsApp" value={order.customer.whatsapp} />
            <Detail
              label="Delivery address"
              value={order.customer.address}
              full
            />
            {order.customer.notes ? (
              <Detail label="Notes" value={order.customer.notes} full />
            ) : null}
          </dl>

          <ul className="mt-5 divide-y divide-zinc-100 border-t border-zinc-100">
            {order.items.map((item) => (
              <li
                key={item.lineId}
                className="flex justify-between gap-3 py-3 text-sm"
              >
                <span className="min-w-0">
                  <span className="font-medium text-zinc-800">
                    {item.productName}
                  </span>
                  <span className="block text-xs text-zinc-500">
                    {item.packSize}
                    {item.colorName
                      ? ` · ${item.colorName} (${item.colorCode})`
                      : ""}{" "}
                    · Qty {item.quantity} × {formatPrice(item.unitPrice)}
                  </span>
                </span>
                <span className="shrink-0 font-semibold text-zinc-900">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
            <span className="font-bold text-zinc-900">Estimated total</span>
            <span className="text-xl font-extrabold text-zinc-900">
              {formatPrice(order.orderTotal)}
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            This is an estimate. The shop confirms final price, stock and
            delivery on WhatsApp.
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500">
          Order details are not available on this device. If you have already
          sent the WhatsApp message, your order has reached the shop.
        </div>
      )}

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Continue shopping
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-xs text-zinc-400">{label}</dt>
      <dd className="font-medium text-zinc-800">{value}</dd>
    </div>
  );
}
