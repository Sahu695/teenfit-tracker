export type NutritionSection = {
  id: string;
  title: string;
  tips: string[];
};

export const NUTRITION_SECTIONS: NutritionSection[] = [
  {
    id: "basics",
    title: "The basics",
    tips: [
      "Protein helps repair the muscle you train — aim for a source at most meals: eggs, chicken, fish, beans, greek yogurt, tofu.",
      "Carbs are your main fuel for workouts. Don't fear them — rice, oats, fruit, and potatoes power your sessions.",
      "Fats support hormones and growth — nuts, olive oil, and avocado are solid everyday sources.",
      "Water first. Most 'hungry' feelings are actually thirst. Aim for water throughout the day, more on training days.",
      "Whole foods most of the time, treats sometimes. No food is 'bad' — it's about the pattern over weeks, not one meal.",
    ],
  },
  {
    id: "timing",
    title: "Timing meals around training",
    tips: [
      "Eat a balanced meal 2–3 hours before training so you have energy without feeling weighed down.",
      "If you're training within an hour, keep it light — a banana or some toast is enough.",
      "After training, eat a meal with protein and carbs within a couple hours to help your body recover.",
      "Never skip meals to 'make up for' eating more earlier — consistent fueling beats restriction.",
    ],
  },
  {
    id: "bulking",
    title: "If you're trying to gain weight (bulking)",
    tips: [
      "Gaining muscle takes a small, steady calorie surplus — not a huge one. A rough starting guide is about 300–500 calories above what keeps your weight stable, adjusted based on how your weekly weight trend actually moves.",
      "Protein target: roughly 0.7–1g per pound of body weight per day, spread across meals, supports muscle growth.",
      "Add extra food in the form of more rice, more fruit, an extra snack — not just junk food, which can leave you feeling sluggish.",
      "Weight gain of about 0.25–0.5 lb (around 0.1–0.2 kg) per week is a reasonable, sustainable pace for teens who are still growing.",
    ],
  },
  {
    id: "cutting",
    title: "If you're trying to lose body fat (cutting)",
    tips: [
      "Because teens are still growing, a small, gentle calorie deficit is safer than a big one — extreme cutting can affect growth, energy, and mood.",
      "A rough starting guide is about 200–400 calories below what keeps your weight stable — never a 'crash diet'.",
      "Keep protein high (around 0.7–1g per pound of body weight) so you lose fat, not muscle, while eating a bit less.",
      "Fill up on vegetables and high-fiber foods — they help you feel full on fewer calories.",
      "A loss of about 0.5–1 lb (around 0.2–0.45 kg) per week is plenty — faster than that often means losing muscle, not just fat.",
      "If you ever feel constantly exhausted, dizzy, or notice your mood or periods (if applicable) changing, that's a sign to eat more and talk to a parent, doctor, or coach — this app is not a substitute for medical advice.",
    ],
  },
  {
    id: "mindset",
    title: "Keeping a healthy relationship with food",
    tips: [
      "These numbers are educational starting points, not rules to follow exactly — everyone's body and needs are different, especially while still growing.",
      "If tracking food or weight ever starts to feel stressful, obsessive, or like it's taking over your thoughts, that's a sign to take a step back and talk to a trusted adult.",
      "Growing teens generally need more food, not less — this app is built to support training performance, not restriction.",
      "Progress isn't always visible on a scale. Energy, strength, sleep, and mood all matter too.",
    ],
  },
];

export const QUOTES = [
  "Discipline is choosing what you want most over what you want now.",
  "Small reps, done daily, beat huge workouts done rarely.",
  "You don't have to be extreme, just consistent.",
  "Progress is progress, no matter how slow it feels.",
  "The hardest lift is the one you almost skipped.",
  "Your only competition is who you were last week.",
  "Showing up is 90% of the battle. You already won today.",
  "Strong body, clear head. That's the trade.",
];
