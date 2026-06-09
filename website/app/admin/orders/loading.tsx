import { Skeleton } from "@/components/Skeleton";

export default function AdminOrdersLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-28" />
      <Skeleton className="mt-2 h-4 w-72" />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Skeleton className="h-11 flex-1 min-w-60 rounded-full" />
        <Skeleton className="h-11 w-40 rounded-full" />
      </div>

      <Skeleton className="mt-3 h-4 w-32" />

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="space-y-3 p-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
