import { Skeleton } from "@/components/Skeleton";

export default function CartLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-8 w-40" />
      <Skeleton className="mt-2 h-4 w-60" />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ul className="space-y-3 lg:col-span-2">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
            >
              <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <Skeleton className="mt-4 h-9 w-32 rounded-full" />
              </div>
            </li>
          ))}
        </ul>

        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}
