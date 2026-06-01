import Link from "next/link";
import { ArrowRightIcon, PaintRollerIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50 text-primary">
        <PaintRollerIcon className="h-10 w-10" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-zinc-900">
        Page not found
      </h1>
      <p className="mt-2 text-zinc-500">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Browse Products
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
