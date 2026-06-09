import { Skeleton } from "@/components/Skeleton";

export default function AboutLoading() {
  return (
    <div>
      <section className="bg-linear-to-br from-orange-50 via-rose-50 to-amber-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-3 h-10 w-72" />
          <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-1.5 h-4 w-2/3 max-w-2xl" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>

        <Skeleton className="mt-14 h-6 w-40" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 rounded-xl" />
          ))}
        </div>

        <Skeleton className="mt-14 h-6 w-40" />
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
