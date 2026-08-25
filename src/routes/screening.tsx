import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CircleDashed,
  Eye,
  ImageUp,
  Loader2,
  RefreshCw,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Disclaimer } from "@/components/disclaimer";
import { ConfidenceRing, ProbabilityChart } from "@/components/screening/confidence-charts";
import { DietPlanner } from "@/components/screening/diet-planner";
import { analyzeImage } from "@/lib/screening.functions";
import { BODY_AREAS, NUTRIENT_BY_NAME } from "@/lib/nutrients";

export const Route = createFileRoute("/screening")({
  head: () => ({
    meta: [
      { title: "AI Nutritional Screening — Upload an Image | NutriLens" },
      {
        name: "description",
        content:
          "Upload an image of eyes, tongue, skin, nails, hair or lips for AI-based nutritional screening with confidence scores and nutrition guidance.",
      },
      { property: "og:title", content: "AI Nutritional Screening | NutriLens" },
      {
        property: "og:description",
        content: "Upload an image for AI-based nutritional screening and personalized nutrition guidance.",
      },
    ],
  }),
  component: Screening,
});

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const STAGES = [
  "Image received",
  "Image preprocessing",
  "Feature extraction",
  "Model analysis",
  "Generating nutritional recommendations",
];

function Screening() {
  const analyzeFn = useServerFn(analyzeImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ name: string; dataUrl: string } | null>(null);
  const [bodyArea, setBodyArea] = useState<string>("Eyes");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(0);
  const [dragging, setDragging] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("No image selected");
      const timers = [1, 2, 3, 4].map((i) =>
        setTimeout(() => setStage(i), i * 1200),
      );
      try {
        return await analyzeFn({ data: { imageDataUrl: file.dataUrl, bodyArea } });
      } finally {
        timers.forEach(clearTimeout);
      }
    },
  });

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (!ACCEPTED.includes(f.type)) {
      setError("Unsupported format. Please upload a JPG, PNG or WEBP image.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("That file is larger than 10 MB. Please upload a smaller image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setFile({ name: f.name, dataUrl: String(reader.result) });
    reader.readAsDataURL(f);
  }, []);

  const reset = () => {
    setFile(null);
    setStage(0);
    setError(null);
    mutation.reset();
  };

  const result = mutation.data;
  const top = result?.probabilities[0];
  const nutrientInfo = top ? NUTRIENT_BY_NAME(top.nutrient) : undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
        <Sparkles className="size-3.5" /> Demo mode — general-purpose vision model, not a validated CNN
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        AI Nutritional Screening
      </h1>
      <p className="mt-3 text-muted-foreground">Upload an image for AI-based nutritional screening.</p>

      {!result && !mutation.isPending && (
        <section className="mt-8 space-y-5">
          <div className="max-w-xs space-y-1.5">
            <Label>Body area</Label>
            <Select value={bodyArea} onValueChange={setBodyArea}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BODY_AREAS.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            className={`flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ImageUp className="size-6" />
            </span>
            <p className="mt-4 font-medium">Drag & drop an image here, or click to browse</p>
            <p className="mt-1 text-sm text-muted-foreground">
              JPG, JPEG, PNG or WEBP — maximum file size 10 MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED.join(",")}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="size-4" /> {error}
            </p>
          )}

          {file && (
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 sm:flex-row sm:items-center">
              <img
                src={file.dataUrl}
                alt="Selected upload preview"
                className="h-32 w-32 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">Body area: {bodyArea}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" /> Remove
                </button>
              </div>
              <Button size="lg" onClick={() => mutation.mutate()}>
                <ScanLine className="mr-1 size-4" /> Analyze Image
              </Button>
            </div>
          )}

          {mutation.isError && (
            <p className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="size-4" /> The screening service could not process that image.
              Please try again with a clearer photo.
            </p>
          )}
        </section>
      )}

      {mutation.isPending && (
        <section className="mt-10 rounded-3xl border border-border bg-card p-8 text-center">
          <div className="relative mx-auto size-40 overflow-hidden rounded-3xl">
            {file && <img src={file.dataUrl} alt="" className="size-full object-cover" />}
            <div className="animate-in fade-in absolute inset-x-0 top-0 h-1 bg-primary shadow-[0_0_24px_var(--color-primary)] [animation:pulse_1.6s_ease-in-out_infinite]" />
          </div>
          <h2 className="mt-6 font-display text-xl font-semibold">Analyzing your image…</h2>
          <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
            {STAGES.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                {i < stage ? (
                  <Check className="size-4 text-primary" />
                ) : i === stage ? (
                  <Loader2 className="size-4 animate-spin text-secondary" />
                ) : (
                  <CircleDashed className="size-4 text-muted-foreground" />
                )}
                <span className={i <= stage ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-6 h-2 max-w-sm overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${((stage + 1) / STAGES.length) * 100}%`,
                background: "var(--gradient-brand)",
              }}
            />
          </div>
        </section>
      )}

      {result && top && (
        <div className="animate-in fade-in slide-in-from-bottom-3 mt-10 space-y-8 duration-500">
          <section
            className="rounded-3xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold">NutriLens Screening Result</h2>
              <Button variant="outline" size="sm" onClick={reset}>
                <RefreshCw className="mr-1 size-4" /> New screening
              </Button>
            </div>

            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
              <ConfidenceRing value={top.probability} />
              <div>
                <p className="text-xs font-medium tracking-wide text-secondary uppercase">
                  Possible nutritional concern
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {top.nutrient} — screening result
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  This result indicates a possible association and should be confirmed through
                  appropriate medical evaluation or laboratory testing.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Body area analyzed: {bodyArea} · Inference mode: {result.mode}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold">What the AI detected</h2>
            <p className="mt-3 text-sm text-muted-foreground">{result.explanation}</p>
            <ul className="mt-4 list-inside list-disc text-sm text-muted-foreground">
              {result.visual_observations.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
              Image quality note: {result.image_quality}
            </p>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold">AI Confidence Analysis</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ranked likelihood across nutrient categories, produced by the inference service.
            </p>
            <div className="mt-4">
              <ProbabilityChart data={result.probabilities} />
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold">Why did NutriLens predict this?</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <figure>
                {file && (
                  <img src={file.dataUrl} alt="Original upload" className="w-full rounded-2xl" />
                )}
                <figcaption className="mt-2 text-xs text-muted-foreground">Original image</figcaption>
              </figure>
              <figure>
                <div className="relative overflow-hidden rounded-2xl">
                  {file && <img src={file.dataUrl} alt="" className="w-full opacity-70" />}
                  {result.attention_regions.map((r, i) => (
                    <div
                      key={i}
                      className="absolute rounded-lg border-2 border-secondary bg-secondary/25"
                      style={{
                        left: `${Math.max(0, Math.min(1, r.x)) * 100}%`,
                        top: `${Math.max(0, Math.min(1, r.y)) * 100}%`,
                        width: `${Math.max(0, Math.min(1, r.w)) * 100}%`,
                        height: `${Math.max(0, Math.min(1, r.h)) * 100}%`,
                      }}
                      title={r.label}
                    />
                  ))}
                  <span className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-[10px] text-muted-foreground">
                    <Eye className="size-3" /> attention regions
                  </span>
                </div>
                <figcaption className="mt-2 text-xs text-muted-foreground">
                  Highlighted regions represent areas that contributed to the model's prediction.
                  This visualization explains model attention and does not prove a medical condition.
                </figcaption>
              </figure>
            </div>
          </section>

          {nutrientInfo && (
            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold">Why {nutrientInfo.name} matters</h2>
              <p className="mt-2 text-sm text-muted-foreground">{nutrientInfo.function}</p>
              <h3 className="mt-6 text-sm font-semibold">Food sources</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nutrientInfo.foods.map((f) => (
                  <div key={f} className="rounded-2xl border border-border p-4">
                    <p className="font-medium">{f}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      A commonly available source of {nutrientInfo.name.toLowerCase()}. Portion needs
                      vary by person; exact nutrient amounts are not claimed here.
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{nutrientInfo.info}</p>
            </section>
          )}

          <DietPlanner nutrient={top.nutrient} />

          <Disclaimer />
        </div>
      )}

      {!result && <Disclaimer className="mt-10" />}
    </div>
  );
}
