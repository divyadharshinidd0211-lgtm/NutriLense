import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

export type Probability = { nutrient: string; probability: number };

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function ConfidenceRing({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const r = 54;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox="0 0 128 128" className="size-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="var(--color-muted)" strokeWidth="12" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value)}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-semibold">{pct}%</span>
        <span className="text-xs text-muted-foreground">confidence</span>
      </div>
    </div>
  );
}

export function ProbabilityChart({ data }: { data: Probability[] }) {
  const chartData = data.map((d) => ({ name: d.nutrient, value: Math.round(d.probability * 100) }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <Bar dataKey="value" radius={[6, 6, 6, 6]} label={{ position: "right", fontSize: 12 }}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
