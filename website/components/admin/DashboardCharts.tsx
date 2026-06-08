"use client";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BRAND_COLOURS: Record<string, string> = {
  Neo: "#ea580c",
  Zen: "#dc2626",
  Nippon: "#2563eb",
};

const STATUS_COLOURS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  delivered: "#10b981",
  cancelled: "#a1a1aa",
};

const CATEGORY_PALETTE = [
  "#0ea5e9",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#f43f5e",
  "#fb923c",
  "#64748b",
  "#ec4899",
  "#84cc16",
];

interface Datum {
  name: string;
  value: number;
}

export function ProductsByBrandChart({ data }: { data: Datum[] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-bold text-zinc-900">Products by brand</h3>
      <p className="mt-0.5 text-xs text-zinc-500">
        How your catalogue splits across brands.
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={85}
              paddingAngle={2}
            >
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={BRAND_COLOURS[d.name] ?? "#999"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={28} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProductsByCategoryChart({ data }: { data: Datum[] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-bold text-zinc-900">
        Products by category
      </h3>
      <p className="mt-0.5 text-xs text-zinc-500">
        Distribution across your categories.
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 8 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#71717a" }}
              tickLine={false}
              axisLine={{ stroke: "#e4e4e7" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#71717a" }}
              tickLine={false}
              axisLine={{ stroke: "#e4e4e7" }}
              allowDecimals={false}
            />
            <Tooltip cursor={{ fill: "#fafafa" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_d, i) => (
                <Cell
                  key={i}
                  fill={CATEGORY_PALETTE[i % CATEGORY_PALETTE.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function OrdersByStatusChart({ data }: { data: Datum[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5">
        <h3 className="text-base font-bold text-zinc-900">Orders by status</h3>
        <p className="mt-0.5 text-xs text-zinc-500">
          No orders yet — share your site to get your first one.
        </p>
        <div className="mt-6 flex h-48 flex-col items-center justify-center text-center">
          <div className="text-4xl font-extrabold text-zinc-300">0</div>
          <p className="mt-2 text-sm text-zinc-500">
            Orders placed on the customer site will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-bold text-zinc-900">Orders by status</h3>
      <p className="mt-0.5 text-xs text-zinc-500">
        Breakdown of all {total} orders.
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={85}
              paddingAngle={2}
            >
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={STATUS_COLOURS[d.name.toLowerCase()] ?? "#999"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={28} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
