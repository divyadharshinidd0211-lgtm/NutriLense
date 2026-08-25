import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { NUTRIENTS } from "./nutrients";

/**
 * ML inference service boundary.
 *
 * This project ships in DEMO MODE: screening runs through a general-purpose
 * vision-language model via Lovable AI, NOT a trained/validated CNN.
 * To swap in a real model (e.g. nutrilens_model.keras behind an inference
 * endpoint), replace `runInference` only — the API shape below stays stable.
 */
export const INFERENCE_MODE = "demo-vision-model" as const;

const NUTRIENT_NAMES = NUTRIENTS.map((n) => n.name);

export const ScreeningSchema = z.object({
  image_quality: z
    .string()
    .describe("One short sentence about image clarity/suitability for screening"),
  visual_observations: z
    .array(z.string())
    .describe("2-4 short neutral descriptions of visible characteristics"),
  explanation: z
    .string()
    .describe("Screening-style explanation of which visual patterns influenced the ranking"),
  attention_regions: z
    .array(
      z.object({
        label: z.string(),
        x: z.number().describe("left, 0-1 of image width"),
        y: z.number().describe("top, 0-1 of image height"),
        w: z.number().describe("width, 0-1"),
        h: z.number().describe("height, 0-1"),
      }),
    )
    .describe("1-3 regions of the image that most influenced the ranking"),
  probabilities: z
    .array(
      z.object({
        nutrient: z.string().describe(`One of: ${NUTRIENT_NAMES.join(", ")}, or Other`),
        probability: z.number().describe("0-1"),
      }),
    )
    .describe("Ranked likelihood distribution, highest first, summing to about 1"),
});

export type ScreeningOutput = z.infer<typeof ScreeningSchema>;

export async function runInference(input: {
  imageDataUrl: string;
  bodyArea: string;
}): Promise<ScreeningOutput & { mode: typeof INFERENCE_MODE }> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI screening is not configured");

  const gateway = createLovableAiGatewayProvider(key);

  const result = await generateText({
    model: gateway("google/gemini-3.7-flash"),
    system: [
      "You are the inference component of NutriLens, an educational nutritional screening tool.",
      "You never diagnose. You describe visible characteristics and produce a ranked likelihood distribution over micronutrient categories.",
      `Allowed categories: ${NUTRIENT_NAMES.join(", ")}, Other.`,
      "If the image is unclear, not the stated body area, or shows nothing suggestive, keep probabilities flat and put most weight on 'Other'.",
      "Use cautious, non-diagnostic language.",
      "Reply with JSON only (no markdown fences) matching:",
      '{"image_quality":string,"visual_observations":string[],"explanation":string,"attention_regions":[{"label":string,"x":number,"y":number,"w":number,"h":number}],"probabilities":[{"nutrient":string,"probability":number}]}',
      "Region coordinates are fractions of image width/height between 0 and 1. Probabilities are 0-1 and sum to 1, highest first.",
    ].join(" "),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Body area stated by the user: ${input.bodyArea}. Screen this image and return the structured result.`,
          },
          {
            type: "file",
            data: input.imageDataUrl,
            mediaType: input.imageDataUrl.slice(5, input.imageDataUrl.indexOf(";")),
          },
        ],
      },
    ],
  });

  const out = ScreeningSchema.parse(parseJson(result.text));
  const cleaned = out.probabilities
    .filter((p) => Number.isFinite(p.probability) && p.probability > 0)
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 6);
  const total = cleaned.reduce((s, p) => s + p.probability, 0) || 1;

  return {
    ...out,
    probabilities: cleaned.map((p) => ({ ...p, probability: p.probability / total })),
    mode: INFERENCE_MODE,
  };
}

function parseJson(text: string): unknown {
  const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  return JSON.parse(start >= 0 ? cleaned.slice(start, end + 1) : cleaned);
}

const DietSchema = z.object({
  meals: z.array(
    z.object({
      slot: z.string().describe("Breakfast, Mid-Morning, Lunch, Evening Snack, Dinner"),
      dish: z.string(),
      why: z.string().describe("Short note on the nutrient contribution"),
    }),
  ),
  hydration: z.string(),
  tips: z.array(z.string()),
});

export type DietPlan = z.infer<typeof DietSchema>;

export async function runDietPlan(input: {
  nutrient: string;
  age: number;
  gender: string;
  diet: string;
  activity: string;
  meals: number;
  cuisine: string;
  allergies: string;
  restrictions: string;
}): Promise<DietPlan> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI planning is not configured");

  const gateway = createLovableAiGatewayProvider(key);
  const result = await generateText({
    model: gateway("google/gemini-3.7-flash"),
    system: [
      "You are a nutrition guidance generator. Produce practical, culturally appropriate daily meal suggestions rich in the target nutrient.",
      "Respect allergies and restrictions strictly. Never promise medical outcomes and never state exact micronutrient quantities as facts.",
      "Reply with JSON only (no markdown fences) matching:",
      '{"meals":[{"slot":string,"dish":string,"why":string}],"hydration":string,"tips":string[]}',
      "Slots must be chosen from: Breakfast, Mid-Morning, Lunch, Evening Snack, Dinner.",
    ].join(" "),
    prompt: JSON.stringify(input),
  });

  return DietSchema.parse(parseJson(result.text));
}
