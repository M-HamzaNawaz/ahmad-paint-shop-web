import { Skeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-3 h-32 rounded-2xl" />

      <Skeleton className="mt-8 h-5 w-32" />
      <Skeleton className="mt-2 h-4 w-72" />

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>

      <Skeleton className="mt-5 h-20 rounded-2xl" />
    </div>
  );
}
