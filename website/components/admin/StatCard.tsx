import Link from "next/link";
import { ChevronRightIcon } from "@/components/Icons";

export function StatCard({
  label,
  value,
  hint,
  href,
  tint = "orange",
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  tint?: "orange" | "blue" | "green" | "rose" | "purple";
  icon: React.ReactNode;
}) {
  const tintStyle = {
    orange: "from-orange-500 to-orange-600",
    blue: "from-sky-500 to-blue-600",
    green: "from-emerald-500 to-teal-600",
    rose: "from-rose-500 to-pink-600",
    purple: "from-violet-500 to-purple-600",
  }[tint];

  const inner = (
    <div className="group flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-zinc-500">{label}</span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br ${tintStyle} text-white shadow-sm`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-extrabold text-zinc-900">{value}</p>
        {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
      </div>
      {href ? (
        <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 group-hover:text-orange-600">
          View details
          <ChevronRightIcon className="h-3 w-3" />
        </p>
      ) : null}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}
