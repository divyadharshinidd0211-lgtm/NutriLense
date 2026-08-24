import { createFileRoute } from "@tanstack/react-router";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy, Terms & Medical Disclaimer | NutriLens" },
      {
        name: "description",
        content:
          "How NutriLens handles uploaded images and personal data, the terms of use, and the full medical disclaimer.",
      },
      { property: "og:title", content: "Privacy, Terms & Medical Disclaimer | NutriLens" },
      {
        property: "og:description",
        content: "Image handling, data minimisation, terms of use and the NutriLens medical disclaimer.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy & policies</h1>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">Privacy</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Uploaded images are validated for type and size before anything is sent.</li>
          <li>
            Images are transmitted over HTTPS for a single screening request and are not stored on a
            server by default.
          </li>
          <li>Your image preview and result live in your browser session only.</li>
          <li>Closing or refreshing the page clears the current screening from the interface.</li>
          <li>No account is required to run a screening, and no personal identifiers are collected.</li>
        </ul>
      </section>

      <section id="terms" className="mt-10 scroll-mt-24">
        <h2 className="font-display text-2xl font-semibold">Terms</h2>
        <p className="mt-3 text-muted-foreground">
          NutriLens is provided for education and demonstration. You agree to upload only images you
          own or are permitted to use, and not to rely on results for medical decisions. The service
          is provided as-is, without warranty of accuracy or fitness for a clinical purpose.
        </p>
      </section>

      <section id="disclaimer" className="mt-10 scroll-mt-24">
        <h2 className="font-display text-2xl font-semibold">Medical disclaimer</h2>
        <Disclaimer className="mt-3" />
      </section>
    </div>
  );
}
