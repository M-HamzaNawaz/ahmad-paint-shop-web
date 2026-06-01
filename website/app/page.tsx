import Link from 'next/link';
import {
  CATEGORIES,
  getCategoryProductCount,
  getFeaturedProducts,
  getAllProducts,
  getProductsByBrand,
} from '@/lib/catalog';
import { SHOP } from '@/lib/shop';
import { shopWhatsAppUrl } from '@/lib/whatsapp';
import { BrandCards } from '@/components/BrandCards';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductCard } from '@/components/ProductCard';
import {
  ArrowRightIcon,
  CartIcon,
  CheckCircleIcon,
  PaintBucketIcon,
  PaintRollerIcon,
  ShieldIcon,
  WhatsAppIcon,
} from '@/components/Icons';

const SWATCHES = [
  '#fca5a5',
  '#fdba74',
  '#fcd34d',
  '#bef264',
  '#86efac',
  '#5eead4',
  '#7dd3fc',
  '#93c5fd',
  '#c4b5fd',
  '#f0abfc',
  '#f9a8d4',
  '#d6d3d1',
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const totalProducts = getAllProducts().length;
  const totalPacks = getAllProducts().reduce(
    (sum, p) => sum + p.variants.length,
    0,
  );

  return (
    <div>
      {/* ===== Image slider ===== */}
      <HeroSlider />

      {/* ===== Hero ===== */}
      <section className="hero-animated bg-linear-to-br from-orange-50 via-rose-50 to-amber-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm">
              <ShieldIcon className="h-4 w-4" />
              Authorised retailer of {SHOP.supplier}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
              Beautiful walls <span className="text-primary">start here.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600 sm:text-lg">
              Browse the full range of Kaizen and Nippon paints, putty, primers
              and wood care. Build your order and send it to us on WhatsApp in
              seconds — no account needed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Browse Products
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href={shopWhatsAppUrl(
                  'Hello! I would like to ask about your paint products.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400"
              >
                <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                Order on WhatsApp
              </a>
            </div>
            <p className="mt-5 text-sm text-zinc-500">
              {totalProducts} products · {CATEGORIES.length} categories ·{' '}
              {totalPacks} pack sizes · {SHOP.taxNote}
            </p>
          </div>

          {/* Decorative colour palette */}
          <div className="relative">
            <div className="rounded-3xl border border-white bg-white/70 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="font-bold text-zinc-900">Colour your space</p>
                <PaintRollerIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {SWATCHES.map((color) => (
                  <div
                    key={color}
                    className="relative aspect-square rounded-xl shadow-inner ring-1 ring-black/5 transition duration-200 ease-out hover:z-10 hover:-translate-y-1.5 hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                Hundreds of shades available in store across the Kaizen and
                Nippon ranges. Ask us on WhatsApp for shade cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="reveal border-b border-zinc-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-8 sm:grid-cols-4">
          <Feature
            icon={<ShieldIcon className="h-6 w-6" />}
            title="Genuine Kaizen"
            text="100% original NEO & ZEN products"
          />
          <Feature
            icon={<PaintBucketIcon className="h-6 w-6" />}
            title="Full range"
            text={`${totalProducts} products, all pack sizes`}
          />
          <Feature
            icon={<WhatsAppIcon className="h-6 w-6" />}
            title="WhatsApp orders"
            text="Order in seconds, no forms"
          />
          <Feature
            icon={<CheckCircleIcon className="h-6 w-6" />}
            title="No account needed"
            text="Just browse and order"
          />
        </div>
      </section>

      {/* ===== Brands ===== */}
      <section className="reveal mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          title="Shop by brand"
          subtitle="We stock Kaizen (NEO & ZEN) and Nippon Paint"
        />
        <div className="mt-8">
          <BrandCards
            hrefFor={(b) => `/products?brand=${b.slug}`}
            countFor={(b) => getProductsByBrand(b.key).length}
          />
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="reveal mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          title="Shop by category"
          subtitle="Find the right product for your project"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`group flex flex-col justify-between rounded-2xl bg-linear-to-br ${category.gradient} p-5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex items-start justify-between">
                <PaintBucketIcon className="h-8 w-8 text-zinc-700/55" />
                <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[11px] font-bold text-zinc-700">
                  {getCategoryProductCount(category.slug)}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-zinc-900">{category.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-600">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href="/products"
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 p-5 text-center transition hover:border-orange-400 hover:bg-orange-50"
          >
            <ArrowRightIcon className="h-7 w-7 text-zinc-500 group-hover:text-primary" />
            <span className="font-bold text-zinc-800">View all products</span>
          </Link>
        </div>
      </section>

      {/* ===== Featured products ===== */}
      <section className="reveal bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              title="Popular products"
              subtitle="Trusted choices for homes and projects"
            />
            <Link
              href="/products"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex"
            >
              See all
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== How to order ===== */}
      <section className="reveal mx-auto max-w-7xl px-4 py-14">
        <SectionHeading
          title="How to order"
          subtitle="Three simple steps — your order reaches us on WhatsApp"
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Step
            number={1}
            icon={<CartIcon className="h-6 w-6" />}
            title="Add to cart"
            text="Browse products, choose a pack size, and add what you need to your cart."
          />
          <Step
            number={2}
            icon={<CheckCircleIcon className="h-6 w-6" />}
            title="Enter your details"
            text="At checkout, enter your name, WhatsApp number and delivery address."
          />
          <Step
            number={3}
            icon={<WhatsAppIcon className="h-6 w-6" />}
            title="Send on WhatsApp"
            text="Your order opens in WhatsApp, ready to send to us. Just tap Send."
          />
        </div>
      </section>

      {/* ===== WhatsApp CTA ===== */}
      <section className="reveal mx-auto max-w-7xl px-4 pb-16">
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900 to-zinc-800 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to start your project?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-300">
            Browse the catalogue and place your order, or message us directly on
            WhatsApp — we are happy to help with shades, quantities and
            delivery.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Browse Products
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={shopWhatsAppUrl('Hello! I would like to place an order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {SHOP.whatsappDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-1.5 text-zinc-500">{subtitle}</p>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-bold text-zinc-900">{title}</p>
        <p className="truncate text-xs text-zinc-500">{text}</p>
      </div>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  text,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative rounded-2xl border border-zinc-200 bg-white p-6">
      <span className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        {number}
      </span>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-primary">
        {icon}
      </span>
      <h3 className="mt-4 font-bold text-zinc-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{text}</p>
    </div>
  );
}
