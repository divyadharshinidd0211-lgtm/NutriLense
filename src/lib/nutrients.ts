export type Nutrient = {
  id: string;
  name: string;
  function: string;
  foods: string[];
  vegFoods: string[];
  signs: string[];
  info: string;
};

export const NUTRIENTS: Nutrient[] = [
  {
    id: "iron",
    name: "Iron",
    function:
      "Helps red blood cells carry oxygen around the body and supports energy metabolism.",
    foods: [
      "Spinach",
      "Lentils",
      "Chickpeas",
      "Beans",
      "Sesame seeds",
      "Pumpkin seeds",
      "Fortified cereals",
      "Lean red meat",
    ],
    vegFoods: ["Spinach", "Lentils", "Chickpeas", "Beans", "Sesame seeds", "Pumpkin seeds", "Fortified cereals"],
    signs: ["Tiredness", "Pale inner eyelids", "Brittle nails", "Shortness of breath on exertion"],
    info: "Iron absorption from plant foods improves when eaten alongside vitamin C rich foods.",
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    function: "Supports nerve function, DNA synthesis and healthy red blood cell formation.",
    foods: ["Eggs", "Milk and yoghurt", "Cheese", "Fortified plant milks", "Fortified cereals", "Fish"],
    vegFoods: ["Eggs", "Milk and yoghurt", "Cheese", "Fortified plant milks", "Fortified cereals"],
    signs: ["Smooth or sore tongue", "Tingling in hands or feet", "Fatigue", "Mouth ulcers"],
    info: "B12 occurs mainly in animal foods, so fortified foods matter for plant-based diets.",
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    function: "Helps the body absorb calcium and supports bone, muscle and immune health.",
    foods: ["Sunlight exposure", "Fortified milk", "Egg yolk", "Mushrooms exposed to UV", "Oily fish"],
    vegFoods: ["Sunlight exposure", "Fortified milk", "Egg yolk", "UV-exposed mushrooms"],
    signs: ["Bone or muscle aches", "Low mood", "Frequent infections"],
    info: "Vitamin D status is best confirmed with a blood test rather than visual signs.",
  },
  {
    id: "vitamin-a",
    name: "Vitamin A",
    function: "Important for vision in low light, skin renewal and immune defence.",
    foods: ["Carrots", "Sweet potato", "Pumpkin", "Leafy greens", "Mango", "Milk"],
    vegFoods: ["Carrots", "Sweet potato", "Pumpkin", "Leafy greens", "Mango", "Milk"],
    signs: ["Dryness of the eyes", "Rough or dry skin", "Difficulty seeing in dim light"],
    info: "Vitamin A is fat soluble; pair coloured vegetables with a little healthy fat.",
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    function: "Supports collagen formation, wound healing and iron absorption.",
    foods: ["Amla", "Guava", "Oranges", "Lemon", "Bell peppers", "Tomatoes", "Broccoli"],
    vegFoods: ["Amla", "Guava", "Oranges", "Lemon", "Bell peppers", "Tomatoes", "Broccoli"],
    signs: ["Bleeding or swollen gums", "Slow wound healing", "Easy bruising"],
    info: "Vitamin C is heat sensitive, so raw or lightly cooked sources retain more of it.",
  },
  {
    id: "zinc",
    name: "Zinc",
    function: "Supports immune function, taste, skin repair and growth.",
    foods: ["Chickpeas", "Cashews", "Pumpkin seeds", "Whole grains", "Curd", "Eggs"],
    vegFoods: ["Chickpeas", "Cashews", "Pumpkin seeds", "Whole grains", "Curd"],
    signs: ["Slow healing wounds", "Dry skin patches", "Hair thinning", "Reduced sense of taste"],
    info: "Soaking and sprouting legumes can improve zinc availability.",
  },
  {
    id: "folate",
    name: "Folate",
    function: "Essential for cell division, red blood cell production and pregnancy health.",
    foods: ["Leafy greens", "Legumes", "Avocado", "Beetroot", "Oranges", "Fortified flour"],
    vegFoods: ["Leafy greens", "Legumes", "Avocado", "Beetroot", "Oranges", "Fortified flour"],
    signs: ["Mouth sores", "Tiredness", "Tongue changes"],
    info: "Folate is water soluble and lost with long boiling; steam greens briefly.",
  },
];

export const NUTRIENT_BY_NAME = (name: string): Nutrient | undefined =>
  NUTRIENTS.find(
    (n) =>
      n.name.toLowerCase() === name.toLowerCase() ||
      n.id === name.toLowerCase().replace(/\s+/g, "-"),
  );

export const BODY_AREAS = ["Eyes", "Tongue", "Skin", "Nails", "Hair", "Lips", "Other"] as const;

export const DISCLAIMER =
  "NutriLens is an AI-based nutritional screening and educational tool. Its predictions are not medical diagnoses. Visual signs can have multiple causes, and nutritional deficiencies should be confirmed through appropriate clinical assessment and laboratory testing. Consult a qualified healthcare professional before making significant dietary or medical decisions.";
