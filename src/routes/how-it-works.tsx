import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Cpu, Database, Salad, ScanLine, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How NutriLens Works — AI Screening Pipeline" },
      {
        name: "description",
        content:
          "Upload, AI analysis, screening result, nutrition guidance: see how the NutriLens screening pipeline is structured.",
      },
      { property: "og:title", content: "How NutriLens Works" },
      {
        property: "og:description",
        content: "The four-step NutriLens screening pipeline, from image upload to nutrition guidance.",
      },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    icon: Upload,
    title: "Step 1 — Upload",
    text: "You pick the body area and upload a clear, well-lit image. Files stay in your browser session and are sent only for the analysis request.",
  },
  {
    icon: Brain,
    title: "Step 2 — AI Analysis",
    text: "The image is validated, normalized and passed to the inference service, which extracts visual features and produces a probability distribution over nutrient categories.",
  },
  {
    icon: ScanLine,
    title: "Step 3 — Screening Result",
    text: "The highest-ranked category is shown with a confidence score, a plain-language explanation and the image regions that influenced the ranking.",
  },
  {
    icon: Salad,
    title: "Step 4 — Nutrition Guidance",
    text: "The recommendation engine maps the predicted nutrient to food sources and generates a personalized daily plan from your preferences.",
  },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">How NutriLens Works</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        NutriLens is built as three separate layers: the web interface, the screening API, and the
        model inference service. That separation means the demo model can be replaced with a trained
        CNN without touching the interface.
      </p>

      <div className="mt-10 space-y-4">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="flex gap-4 rounded-3xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <step.icon className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-14 rounded-3xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold">Architecture</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The interface calls a typed screening endpoint; the endpoint calls the inference service;
          the inference service returns a probability distribution which the recommendation engine
          turns into guidance.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-2xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
{`Interface (React + TypeScript)
  ↓  POST /analyze  { image, body_area }
Screening API (typed server function, validation)
  ↓
ML inference service  (src/lib/screening.server.ts)
  ↓
Model  →  class probabilities  →  predicted nutrient
  ↓
Recommendation engine (nutrient → foods → diet plan)
  ↓
Result dashboard`}
        </pre>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Cpu,
              title: "Demo mode today",
              text: "Screening runs on a general-purpose vision model, clearly labelled as a demo. No trained CNN is claimed.",
            },
            {
              icon: Brain,
              title: "Swap-in ready",
              text: "Replacing runInference() with a real endpoint serving nutrilens_model.keras or .pt changes nothing else.",
            },
            {
              icon: Database,
              title: "Minimal data",
              text: "Images are not stored by default. Results live in your browser session unless you choose to keep them.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border p-4">
              <c.icon className="size-5 text-secondary" />
              <h3 className="mt-3 text-sm font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Disclaimer className="mt-10" />

      <div className="mt-8">
        <Button asChild size="lg">
          <Link to="/screening">
            Start AI Screening <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
