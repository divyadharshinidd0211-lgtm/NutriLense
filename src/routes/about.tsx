import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NutriLens — Educational AI Nutrition Screening" },
      {
        name: "description",
        content:
          "NutriLens is an educational AI screening project that pairs visual analysis with practical nutrition guidance. Learn about the project, its limits and how to reach us.",
      },
      { property: "og:title", content: "About NutriLens" },
      {
        property: "og:description",
        content: "An educational AI nutrition screening project — scope, limitations and contact.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">About NutriLens</h1>
      <p className="mt-4 text-muted-foreground">
        NutriLens explores a simple question: can everyday images of visible body areas be used as a
        first, non-clinical prompt to think about nutrition? The platform pairs an image screening
        pipeline with an educational nutrition library and a personalized meal planner.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">What it is</h2>
      <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
        <li>An educational screening and nutrition-guidance interface.</li>
        <li>A clean separation between interface, screening API and model inference service.</li>
        <li>A recommendation engine mapping nutrients to real, everyday foods.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold">What it is not</h2>
      <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
        <li>Not a diagnostic tool, medical device, or replacement for laboratory testing.</li>
        <li>
          Not a validated CNN today. Screening currently runs in a clearly labelled demo mode using a
          general-purpose vision model, so the interface can be developed honestly before a trained
          model exists.
        </li>
        <li>Not a source of exact nutrient quantities or clinical dosing advice.</li>
      </ul>

      <h2 id="contact" className="mt-10 scroll-mt-24 font-display text-2xl font-semibold">
        Contact
      </h2>
      <p className="mt-3 flex items-center gap-2 text-muted-foreground">
        <Mail className="size-4 text-primary" />
        <a className="underline underline-offset-4" href="mailto:hello@nutrilens.app">
          hello@nutrilens.app
        </a>
      </p>

      <Disclaimer className="mt-10" />
    </div>
  );
}
