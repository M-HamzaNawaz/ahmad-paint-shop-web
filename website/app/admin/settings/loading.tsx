import { Skeleton } from "@/components/Skeleton";

export default function AdminSettingsLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="mt-2 h-4 w-80" />

      <div className="mt-6 space-y-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <Skeleton className="h-5 w-40" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-2 h-11 w-full rounded-xl" />
              </div>
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-2 h-11 w-full rounded-xl" />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
