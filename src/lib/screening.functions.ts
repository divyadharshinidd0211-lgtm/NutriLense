import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AnalyzeInput = z.object({
  imageDataUrl: z
    .string()
    .refine((v) => /^data:image\/(jpeg|jpg|png|webp);base64,/.test(v), "Unsupported image format")
    .refine((v) => v.length < 14_500_000, "Image too large"),
  bodyArea: z.string().min(2).max(40),
});

export const analyzeImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnalyzeInput.parse(input))
  .handler(async ({ data }) => {
    const { runInference } = await import("./screening.server");
    try {
      return await runInference(data);
    } catch (err) {
      console.error("[nutrilens] inference failed", err);
      throw err;
    }
  });

const DietInput = z.object({
  nutrient: z.string().min(2).max(40),
  age: z.number().int().min(1).max(120),
  gender: z.string().max(30),
  diet: z.string().max(40),
  activity: z.string().max(40),
  meals: z.number().int().min(2).max(8),
  cuisine: z.string().max(60),
  allergies: z.string().max(300),
  restrictions: z.string().max(300),
});

export const generateDietPlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => DietInput.parse(input))
  .handler(async ({ data }) => {
    const { runDietPlan } = await import("./screening.server");
    return runDietPlan(data);
  });
