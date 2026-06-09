import { Skeleton } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <div>
      {/* Slider */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <Skeleton className="aspect-video w-full rounded-3xl sm:aspect-21/10 lg:aspect-21/9" />
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <Skeleton className="h-6 w-56 rounded-full" />
          <Skeleton className="mt-5 h-12 w-full max-w-md" />
          <Skeleton className="mt-2 h-12 w-3/4 max-w-md" />
          <Skeleton className="mt-4 h-4 w-full max-w-md" />
          <Skeleton className="mt-2 h-4 w-2/3 max-w-md" />
          <div className="mt-7 flex gap-3">
            <Skeleton className="h-11 w-40 rounded-full" />
            <Skeleton className="h-11 w-44 rounded-full" />
          </div>
        </div>
        <Skeleton className="mt-10 h-72 rounded-3xl lg:mt-0" />
      </section>

      {/* Brands */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="mt-2 h-4 w-72" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="mt-2 h-4 w-72" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Skeleton className="h-7 w-52" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="mt-2 h-5 w-3/4" />
        <Skeleton className="mt-1 h-4 w-1/2" />
        <Skeleton className="mt-6 h-6 w-24" />
      </div>
    </div>
  );
}
