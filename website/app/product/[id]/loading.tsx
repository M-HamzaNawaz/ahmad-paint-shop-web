import { Skeleton } from "@/components/Skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="h-4 w-60" />

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />

        <div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-9 w-3/4" />
          <Skeleton className="mt-2 h-4 w-32" />
          <Skeleton className="mt-5 h-4 w-full" />
          <Skeleton className="mt-1.5 h-4 w-full" />
          <Skeleton className="mt-1.5 h-4 w-2/3" />

          <Skeleton className="mt-6 h-40 rounded-2xl" />

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
        </div>
      </div>

      <Skeleton className="mt-12 h-6 w-44" />
      <Skeleton className="mt-3 h-4 w-full max-w-3xl" />
      <Skeleton className="mt-1.5 h-4 w-3/4 max-w-3xl" />

      <Skeleton className="mt-10 h-6 w-32" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
