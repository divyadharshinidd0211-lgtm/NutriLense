import { createFileRoute } from "@tanstack/react-router";
import { Apple, Info, Sparkles } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { NUTRIENTS } from "@/lib/nutrients";

export const Route = createFileRoute("/micronutrients")({
  head: () => ({
    meta: [
      { title: "Micronutrient Guide — Iron, B12, Vitamin D & More | NutriLens" },
      {
        name: "description",
        content:
          "Learn what iron, vitamin B12, vitamin D, vitamin A, vitamin C, zinc and folate do, their food sources and commonly discussed deficiency signs.",
      },
      { property: "og:title", content: "Micronutrient Guide | NutriLens" },
      {
        property: "og:description",
        content: "Functions, food sources and commonly discussed signs for seven key micronutrients.",
      },
    ],
  }),
  component: Micronutrients;
});

function Micronutrients() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Micronutrient guide</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        General educational information about key micronutrients. Visual signs listed here can have
        many causes and are not proof of a deficiency.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {NUTRIENTS.map((n) => (
          <article
            key={n.id}
            id={n.id}
            className="scroll-mt-24 rounded-3xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <h2 className="font-display text-xl font-semibold">{n.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{n.function}</p>

            <h3 className="mt-5 flex items-center gap-2 text-sm font-semibold">
              <Apple className="size-4 text-primary" /> Common food sources
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {n.foods.map((f) => (
                <li
                  key={f}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {f}
                </li>
              ))}
            </ul>

            <h3 className="mt-5 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-secondary" /> Commonly discussed signs
            </h3>
            <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
              {n.signs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <p className="mt-5 flex gap-2 rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0" />
              {n.info}
            </p>
          </article>
        ))}
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
