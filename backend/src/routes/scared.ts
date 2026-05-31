import { Router, Request, Response } from "express";

const router = Router();

const questions = [
  {
    question: "What sounds most terrifying to you?",
    choices: [
      "Being completely alone",
      "Not knowing what will happen next",
      "Feeling nothing at all",
    ],
  },
  {
    question: "If society collapsed, what would you struggle with most?",
    choices: [
      "Losing people I care about",
      "Constant uncertainty",
      "Losing motivation to live",
    ],
  },
  {
    question: "What keeps you awake at night?",
    choices: [
      "Fear of abandonment",
      "Fear of failure",
      "Feeling emotionally exhausted",
    ],
  },
  {
    question: "What kind of pain scares you the most?",
    choices: [
      "Emotional loss",
      "Mental pressure",
      "Emptiness",
    ],
  },
  {
    question: "In a crisis, what affects you first?",
    choices: [
      "Loneliness",
      "Panic and overthinking",
      "Emotional shutdown",
    ],
  },
  {
    question: "What would make you lose hope?",
    choices: [
      "Having no one beside me",
      "Feeling powerless",
      "Forgetting how to feel happiness",
    ],
  },
  {
    question: "Which situation feels hardest to survive?",
    choices: [
      "Isolation",
      "Uncertainty",
      "Emotional numbness",
    ],
  },
  {
    question: "What do you fear becoming?",
    choices: [
      "Forgotten",
      "Weak",
      "Emotionless",
    ],
  },
  {
    question: "When things go wrong, what do you usually feel?",
    choices: [
      "Alone",
      "Overwhelmed",
      "Empty",
    ],
  },
  {
    question: "What scares you more than death itself?",
    choices: [
      "Being left behind",
      "Losing control of my life",
      "Losing the ability to care",
    ],
  },
];

const results = {
  A: {
    title: "The Lonely Survivor",
    subtitle: "Your greatest fear is emotional isolation.",
    description:
      "Losing connection, being abandoned, or feeling emotionally invisible affects you more deeply than physical danger. You value relationships and emotional closeness because they make you feel safe and human. When disconnected from others, you may feel hopeless or emotionally unstable.",
    helps: [
      "Genuine emotional connection",
      "Honest communication",
      "A sense of belonging and emotional safety",
    ],
  },
  B: {
    title: "The Overthinker",
    subtitle: "Your greatest fear is uncertainty and losing control.",
    description:
      "Your mind constantly tries to predict, prepare, and analyze situations to feel safe. In stressful situations, you may become mentally overwhelmed from overthinking every possible outcome. You carry pressure internally and often struggle to relax because your mind rarely feels quiet.",
    helps: [
      "Emotional grounding",
      "Rest from constant mental pressure",
      "Acceptance that not everything can be controlled",
    ],
  },
  C: {
    title: "The Numb Wanderer",
    subtitle: "Your greatest fear is becoming emotionally empty.",
    description:
      "You may have experienced emotional exhaustion for so long that you struggle to feel excitement, joy, or connection the way you used to. Sometimes you distance yourself emotionally to protect yourself from getting hurt again.",
    helps: [
      "Emotional reconnection",
      "Safe environments",
      "Meaningful experiences that make you feel alive again",
    ],
  },
};

router.get("/questions", (_req: Request, res: Response) => {
  res.json(questions);
});

router.post("/result", (req: Request, res: Response) => {
  const { answers }: { answers: number[] } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "answers must be an array" });
  }

  const counts = [0, 0, 0];
  answers.forEach((answer) => {
    if (answer >= 0 && answer <= 2) counts[answer]++;
  });

  const winner = counts.indexOf(Math.max(...counts));
  const resultKey = winner === 0 ? "A" : winner === 1 ? "B" : "C";

  return res.json(results[resultKey as keyof typeof results]);
});

export default router;