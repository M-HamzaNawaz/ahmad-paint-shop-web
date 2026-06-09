import { Skeleton } from "@/components/Skeleton";

export default function CheckoutLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-3 h-8 w-32" />
      <Skeleton className="mt-2 h-4 w-80" />

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <Skeleton className="h-5 w-32" />
            <div className="mt-4 space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-2 h-11 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}
