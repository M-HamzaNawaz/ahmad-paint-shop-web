import { Skeleton } from "@/components/Skeleton";

export default function AdminOrderDetailLoading() {
  return (
    <div>
      <Skeleton className="h-4 w-40" />
      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <Skeleton className="h-9 w-60" />
          <Skeleton className="mt-2 h-4 w-44" />
        </div>
        <Skeleton className="h-10 w-56 rounded-full" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-5 py-4">
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="space-y-3 p-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="ml-4 h-5 w-24" />
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-100 bg-zinc-50 px-5 py-4">
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <Skeleton className="h-5 w-24" />
          <div className="mt-3 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="mt-5 h-11 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
