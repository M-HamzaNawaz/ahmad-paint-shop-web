import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminOrderByNumber } from "@/lib/db/adminOrders";
import { formatPrice } from "@/lib/format";
import { StatusBadge, formatOrderDate } from "../shared";
import { StatusForm } from "./StatusForm";

export const metadata: Metadata = { title: "Order detail" };

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const order = await getAdminOrderByNumber(number);
  if (!order) notFound();

  const whatsappLink = `https://wa.me/${order.customerWhatsapp.replace(/\D/g, "")}`;

  return (
    <div>
      <nav className="text-sm text-zinc-500">
        <Link href="/admin/orders" className="hover:text-zinc-800">
          Orders
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-mono text-xs font-medium text-zinc-800">
          {order.orderNumber}
        </span>
      </nav>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            {order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Placed {formatOrderDate(order.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <StatusForm
            orderNumber={order.orderNumber}
            status={order.status}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-5 py-4">
              <h2 className="text-base font-bold text-zinc-900">Items</h2>
            </div>
            <ul className="divide-y divide-zinc-100">
              {order.items.map((item) => (
                <li
                  key={item.lineId}
                  className="flex items-start justify-between gap-3 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900">
                      {item.productName}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {item.brand} · {item.packSize}
                      {item.colorName
                        ? ` · ${item.colorName} (${item.colorCode})`
                        : ""}{" "}
                      × {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 font-bold text-zinc-900">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 border-t border-zinc-100 bg-zinc-50 px-5 py-4 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Items</span>
                <span className="font-semibold text-zinc-800">
                  {order.totalItems}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-zinc-900">Total</span>
                <span className="text-lg font-extrabold text-zinc-900">
                  {formatPrice(order.orderTotal)}
                </span>
              </div>
            </div>
          </div>

          {order.customerNotes ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
              <p className="text-sm font-semibold text-amber-900">
                Customer notes
              </p>
              <p className="mt-1 whitespace-pre-line text-sm text-amber-800">
                {order.customerNotes}
              </p>
            </div>
          ) : null}
        </section>

        {/* Customer */}
        <section>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h2 className="text-base font-bold text-zinc-900">Customer</h2>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-zinc-500">Name</dt>
                <dd className="font-semibold text-zinc-900">
                  {order.customerName}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">WhatsApp</dt>
                <dd className="font-semibold text-zinc-900">
                  {order.customerWhatsapp}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Delivery address</dt>
                <dd className="whitespace-pre-line font-medium text-zinc-800">
                  {order.customerAddress}
                </dd>
              </div>
            </dl>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-white transition hover:bg-whatsapp-dark"
            >
              Message customer on WhatsApp →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
