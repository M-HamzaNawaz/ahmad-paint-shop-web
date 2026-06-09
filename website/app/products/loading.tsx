import { Skeleton } from "@/components/Skeleton";

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-8 w-60" />
      <Skeleton className="mt-2 h-4 w-80" />

      <div className="mt-6 flex flex-wrap gap-3">
        <Skeleton className="h-11 flex-1 min-w-60 rounded-full" />
        <Skeleton className="h-11 w-40 rounded-full" />
        <Skeleton className="h-11 w-44 rounded-full" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <Skeleton className="aspect-4/3 w-full rounded-none" />
            <div className="p-4">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="mt-2 h-5 w-3/4" />
              <Skeleton className="mt-6 h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
