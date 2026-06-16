import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "@/lib/db/products";
import { formatPrice } from "@/lib/format";
import type { ProductFeature } from "@/lib/types";
import { AddToCart } from "@/components/AddToCart";
import { BrandBadge } from "@/components/BrandBadge";
import { ColorProductOrder } from "@/components/ColorProductOrder";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Tilt3D } from "@/components/Tilt3D";
import {
  DropletIcon,
  PaletteIcon,
  ShieldIcon,
  SparkleIcon,
  SunIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/Icons";

const FEATURE_ICONS = [SparkleIcon, DropletIcon, ShieldIcon, SunIcon];

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const related = (await getProductsByCategory(product.categorySlug))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const details = product.details;
  const colorGroups = details?.colorGroups ?? [];
  const hasColors = colorGroups.length > 0;
  const allShades = colorGroups.flatMap((g) => g.shades);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-800">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link
          href={`/category/${product.categorySlug}`}
          className="hover:text-zinc-800"
        >
          {product.categoryName}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-800">{product.name}</span>
      </nav>

      {/* Main */}
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div>
          <Tilt3D max={7} lift={12} className="rounded-2xl">
            <ProductImage
              product={product}
              className="aspect-square w-full rounded-2xl border border-zinc-200 shadow-sm"
            />
          </Tilt3D>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2">
            <BrandBadge brand={product.brand} />
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              {product.categoryName}
            </Link>
          </div>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            {product.name}
          </h1>
          {product.productLine ? (
            <p className="mt-1 text-sm text-zinc-500">
              Product code: {product.productLine}
            </p>
          ) : null}

          <p className="mt-4 leading-relaxed text-zinc-600">
            {product.description}
          </p>

          {product.note ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm text-amber-800">
                <span className="font-bold">Please note:</span> {product.note}
              </p>
            </div>
          ) : null}

          {hasColors ? (
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-sm text-zinc-500">
                {product.minPrice === product.maxPrice
                  ? "Price"
                  : "Starting from"}
              </p>
              <p className="text-3xl font-extrabold text-zinc-900">
                {formatPrice(product.minPrice)}
              </p>
              {/* Colour preview */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {allShades.slice(0, 9).map((shade) => (
                    <span
                      key={shade.code}
                      className="h-7 w-7 rounded-full ring-2 ring-white"
                      style={{ backgroundColor: shade.hex }}
                      title={`${shade.name} (${shade.code})`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-zinc-700">
                  +{allShades.length} shades
                </span>
              </div>
              <a
                href="#order"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                <PaletteIcon className="h-5 w-5" />
                Choose colour &amp; pack size
              </a>
              <p className="mt-3 text-center text-xs text-zinc-400">
                Price includes 18% sales tax · Final price confirmed on WhatsApp
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <AddToCart product={product} />
            </div>
          )}

          {/* Trust points */}
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <TrustPoint
              icon={<ShieldIcon className="h-5 w-5" />}
              text="Genuine Kaizen product"
            />
            <TrustPoint
              icon={<WhatsAppIcon className="h-5 w-5" />}
              text="Quick WhatsApp ordering"
            />
            <TrustPoint
              icon={<TruckIcon className="h-5 w-5" />}
              text="Delivery available — ask us"
            />
          </div>
        </div>
      </div>

      {/* Overview */}
      {details?.overview ? (
        <section className="reveal mt-12">
          <h2 className="text-lg font-bold text-zinc-900">
            About {product.name}
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-zinc-600">
            {details.overview}
          </p>
        </section>
      ) : null}

      {/* Features */}
      {details?.features && details.features.length > 0 ? (
        <section className="reveal mt-10">
          <h2 className="text-lg font-bold text-zinc-900">Key features</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Specifications */}
      {details?.specs && details.specs.length > 0 ? (
        <section className="reveal mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-zinc-900">
              Product information
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200">
              <dl className="divide-y divide-zinc-100">
                {details.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-4 px-4 py-3 text-sm odd:bg-zinc-50"
                  >
                    <dt className="text-zinc-500">{spec.label}</dt>
                    <dd className="text-right font-semibold text-zinc-900">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {details.recommendedAreas ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="font-bold text-zinc-900">Recommended areas</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {details.recommendedAreas}
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Colour gallery + order */}
      {hasColors ? (
        <div className="reveal mt-12">
          <ColorProductOrder product={product} />
        </div>
      ) : null}

      {/* Pricing table */}
      <section className="reveal mt-12">
        <h2 className="text-lg font-bold text-zinc-900">Pricing details</h2>
        <p className="mt-1 text-sm text-zinc-500">
          All pack sizes for {product.name}. Total price is what you pay (retail
          price + 18% sales tax).
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full min-w-120 text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Pack Size</th>
                <th className="px-4 py-3 text-right font-semibold">
                  Retail Price
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Sales Tax (18%)
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {product.variants.map((v) => (
                <tr key={v.id}>
                  <td className="px-4 py-3 font-semibold text-zinc-900">
                    {v.packSize}
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-600">
                    {formatPrice(v.retailPrice)}
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-600">
                    {formatPrice(v.salesTax)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-zinc-900">
                    {formatPrice(v.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="reveal mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-bold text-zinc-900">
              More in {product.categoryName}
            </h2>
            <Link
              href={`/category/${product.categorySlug}`}
              className="shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: ProductFeature;
  index: number;
}) {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return (
    <Tilt3D max={8} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-3 font-bold text-zinc-900">{feature.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">
        {feature.description}
      </p>
    </Tilt3D>
  );
}

function TrustPoint({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2.5">
      <span className="text-primary">{icon}</span>
      <span className="text-xs font-medium text-zinc-700">{text}</span>
    </div>
  );
}
