import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Brain, ScanLine, Salad, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/disclaimer";
import { NUTRIENTS } from "@/lib/nutrients";
import heroImage from "@/assets/hero-nutrilens.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriLens — AI-Powered Nutritional Screening, Made Simple" },
      {
        name: "description",
        content:
          "Upload a relevant image, explore potential micronutrient concerns, and receive personalized nutrition guidance with NutriLens.",
      },
      { property: "og:title", content: "NutriLens — AI-Powered Nutritional Screening" },
      {
        property: "og:description",
        content:
          "AI-powered visual screening for potential micronutrient deficiencies with personalized nutrition guidance.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    icon: Upload,
    title: "Upload",
    text: "Upload an image of the relevant body area — eyes, tongue, skin, nails, hair or lips.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    text: "The inference service analyzes visual patterns in the image and ranks nutrient categories.",
  },
  {
    icon: Activity,
    title: "Screening Result",
    text: "You see the most likely nutritional concern with a confidence score and explanation.",
  },
  {
    icon: Salad,
    title: "Nutrition Guidance",
    text: "Get nutrient-rich food suggestions and a personalized daily nutrition plan.",
  },
];

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/70 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" /> Educational AI screening — demo model
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-5xl">
              NutriLens
            </h1>
            <p className="mt-3 font-display text-xl text-foreground/80 md:text-2xl">
              See the Signs. Understand the Nutrition. Improve Your Health.
            </p>
            <p className="mt-4 max-w-lg text-muted-foreground">
              AI-powered visual screening for potential micronutrient deficiencies, combined with
              personalized nutrition recommendations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/screening">
                  Start AI Screening <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Screening results are not medical diagnoses.
            </p>
          </div>

          <div className="animate-in fade-in duration-1000">
            <div
              className="overflow-hidden rounded-3xl border border-border/60 bg-card"
              style={{ boxShadow: "var(--shadow-lift)" }}
            >
              <img
                src={heroImage}
                alt="Illustration of an AI scanning interface surrounded by nutrient-rich foods"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            How NutriLens Works
          </h2>
          <p className="mt-3 text-muted-foreground">
            A four-step screening workflow, from image upload to nutrition guidance.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-3xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-medium tracking-wide text-secondary uppercase">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Micronutrients we screen for
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Learn what each nutrient does, where to find it, and which signs are commonly
              discussed — before you upload anything.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/micronutrients">
              Explore Nutrition <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NUTRIENTS.slice(0, 6).map((n) => (
            <Link
              key={n.id}
              to="/micronutrients"
              hash={n.id}
              className="rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center gap-2 text-primary">
                <ScanLine className="size-4" />
                <h3 className="font-display text-base font-semibold text-foreground">{n.name}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{n.function}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Disclaimer />
      </section>
    </div>
  );
}
