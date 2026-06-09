import { Skeleton } from "@/components/Skeleton";

export default function AdminProductsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-4 w-60" />
        </div>
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Skeleton className="h-11 flex-1 min-w-60 rounded-full" />
        <Skeleton className="h-11 w-32 rounded-full" />
        <Skeleton className="h-11 w-44 rounded-full" />
        <Skeleton className="h-11 w-36 rounded-full" />
      </div>

      <Skeleton className="mt-3 h-4 w-32" />

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="space-y-3 p-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
