import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Coffee, CupSoda, Loader2, Moon, Sandwich, Sun, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateDietPlan } from "@/lib/screening.functions";

const SLOT_ICONS: Record<string, typeof Coffee> = {
  Breakfast: Coffee,
  "Mid-Morning": Sun,
  Lunch: Utensils,
  "Evening Snack": Sandwich,
  Dinner: Moon,
};

export function DietPlanner({ nutrient }: { nutrient: string }) {
  const planFn = useServerFn(generateDietPlan);
  const [form, setForm] = useState({
    age: 25,
    gender: "Female",
    diet: "Vegetarian",
    activity: "Moderate",
    meals: 5,
    cuisine: "South Indian",
    allergies: "",
    restrictions: "",
  });

  const mutation = useMutation({
    mutationFn: () => planFn({ data: { nutrient, ...form } }),
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <section className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-soft)" }}>
      <h2 className="font-display text-2xl font-semibold">Your Personalized Nutrition Plan</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Tell us a little about you and we'll prioritise everyday foods naturally rich in {nutrient}.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min={1}
            max={120}
            value={form.age}
            onChange={(e) => set("age", Number(e.target.value))}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Gender</Label>
          <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Female", "Male", "Other", "Prefer not to say"].map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Dietary preference</Label>
          <Select value={form.diet} onValueChange={(v) => set("diet", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Vegetarian", "Vegan", "Eggetarian", "Non-vegetarian"].map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Activity level</Label>
          <Select value={form.activity} onValueChange={(v) => set("activity", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Sedentary", "Light", "Moderate", "Active", "Very active"].map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Meals per day</Label>
          <Select value={String(form.meals)} onValueChange={(v) => set("meals", Number(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[3, 4, 5, 6].map((g) => (
                <SelectItem key={g} value={String(g)}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cuisine">Preferred cuisine</Label>
          <Input
            id="cuisine"
            maxLength={60}
            value={form.cuisine}
            onChange={(e) => set("cuisine", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="allergies">Food allergies</Label>
          <Input
            id="allergies"
            maxLength={300}
            placeholder="e.g. peanuts"
            value={form.allergies}
            onChange={(e) => set("allergies", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="restrictions">Other restrictions</Label>
          <Input
            id="restrictions"
            maxLength={300}
            placeholder="e.g. low sodium"
            value={form.restrictions}
            onChange={(e) => set("restrictions", e.target.value)}
          />
        </div>
      </div>

      <Button className="mt-6" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        {mutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
        Generate my plan
      </Button>

      {mutation.isError && (
        <p className="mt-4 text-sm text-destructive">
          We couldn't generate the plan right now. Please try again in a moment.
        </p>
      )}

      {mutation.data && (
        <div className="animate-in fade-in slide-in-from-bottom-2 mt-8 space-y-3 duration-500">
          {mutation.data.meals.map((m) => {
            const Icon = SLOT_ICONS[m.slot] ?? Utensils;
            return (
              <div key={m.slot} className="flex gap-4 rounded-2xl border border-border p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium tracking-wide text-secondary uppercase">
                    {m.slot}
                  </p>
                  <p className="font-medium">{m.dish}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.why}</p>
                </div>
              </div>
            );
          })}

          <div className="flex gap-4 rounded-2xl border border-border p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <CupSoda className="size-5" />
            </span>
            <div>
              <p className="text-xs font-medium tracking-wide text-secondary uppercase">Hydration</p>
              <p className="text-sm text-muted-foreground">{mutation.data.hydration}</p>
            </div>
          </div>

          {mutation.data.tips.length > 0 && (
            <ul className="list-inside list-disc rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
              {mutation.data.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}

          <p className="text-xs text-muted-foreground">
            This is general nutritional guidance and not a substitute for advice from a registered
            dietitian or doctor.
          </p>
        </div>
      )}
    </section>
  );
}
