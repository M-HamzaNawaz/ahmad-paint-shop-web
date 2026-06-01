import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { SHOP } from "@/lib/shop";
import { shopWhatsAppUrl } from "@/lib/whatsapp";
import {
  ArrowRightIcon,
  CartIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Ahmad Paint House — your trusted retailer for Kaizen NEO & ZEN paints. Visit us or order on WhatsApp.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-linear-to-br from-orange-50 via-rose-50 to-amber-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <nav className="text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-800">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-zinc-800">About &amp; Contact</span>
          </nav>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            About {SHOP.name}
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-600">
            {SHOP.name} is your trusted local retailer for {SHOP.supplier}. We
            stock the complete range of Kaizen (NEO &amp; ZEN) and Nippon paints
            — interior and exterior emulsions, enamels, putty, primers and
            wood-care products — for homes, builders and painters.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Why us */}
        <div className="grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<ShieldIcon className="h-6 w-6" />}
            title="100% genuine products"
            text="Every product is original Kaizen and Nippon Paint, bought through authorised supply."
          />
          <InfoCard
            icon={<CartIcon className="h-6 w-6" />}
            title="Full range, fair prices"
            text="The complete catalogue with current prices, all including 18% sales tax."
          />
          <InfoCard
            icon={<WhatsAppIcon className="h-6 w-6" />}
            title="Easy WhatsApp ordering"
            text="Build your order online and send it to us on WhatsApp — no account needed."
          />
        </div>

        {/* What we offer */}
        <section className="reveal mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
            What we offer
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:border-orange-300 hover:text-orange-700"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* How to order */}
        <section className="reveal mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
            How to order
          </h2>
          <ol className="mt-5 space-y-3">
            <OrderStep
              number={1}
              title="Browse and add to cart"
              text="Find your products, pick the pack size you need, and add them to your cart."
            />
            <OrderStep
              number={2}
              title="Enter your details at checkout"
              text="Provide your name, WhatsApp number and delivery address — no sign-up required."
            />
            <OrderStep
              number={3}
              title="Send your order on WhatsApp"
              text="Your order opens in WhatsApp, pre-filled and ready. Tap Send and we will confirm price, stock and delivery."
            />
          </ol>
        </section>

        {/* Contact */}
        <section className="reveal mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-extrabold text-zinc-900">Visit us</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-zinc-900">Address</p>
                  <p className="text-zinc-600">{SHOP.address}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-zinc-900">Opening hours</p>
                  <p className="text-zinc-600">{SHOP.hours}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-whatsapp">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-zinc-900">WhatsApp</p>
                  <a
                    href={shopWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900"
                  >
                    {SHOP.whatsappDisplay}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-linear-to-br from-zinc-900 to-zinc-800 p-6 text-center">
            <WhatsAppIcon className="mx-auto h-10 w-10 text-whatsapp" />
            <h2 className="mt-3 text-xl font-extrabold text-white">
              Have a question?
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              Message us on WhatsApp for shade cards, quantities, prices and
              delivery. We are happy to help with your project.
            </p>
            <a
              href={shopWhatsAppUrl("Hello! I have a question about your paint products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white transition hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="reveal mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-7 w-7 text-primary" />
            <p className="font-semibold text-zinc-900">
              Ready to order? Browse the full catalogue now.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Browse Products
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-primary">
        {icon}
      </span>
      <h3 className="mt-3 font-bold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{text}</p>
    </div>
  );
}

function OrderStep({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        {number}
      </span>
      <div>
        <h3 className="font-bold text-zinc-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{text}</p>
      </div>
    </li>
  );
}
