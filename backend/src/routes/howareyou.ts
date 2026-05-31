import { Router, Request, Response } from "express";

const router = Router();

const questions = [
  {
    question: "How have you truly been feeling lately?",
    choices: [
      "Tired, but still trying",
      "Overwhelmed and stressed",
      "Empty and disconnected",
    ],
  },
  {
    question: "What do you usually do when you feel emotionally overwhelmed?",
    choices: [
      "Keep going anyway",
      "Hide my feelings",
      "Shut down emotionally",
    ],
  },
  {
    question: "How often do you feel understood?",
    choices: [
      "Sometimes",
      "Rarely",
      "Almost never",
    ],
  },
  {
    question: "What describes your current mental state best?",
    choices: [
      "Exhausted but functional",
      "Constantly anxious",
      "Numb and detached",
    ],
  },
  {
    question: "When was the last time you felt truly happy?",
    choices: [
      "Recently",
      "I can't remember clearly",
      "It feels very distant",
    ],
  },
  {
    question: "What drains your energy the most?",
    choices: [
      "Responsibilities",
      "Overthinking",
      "Existing every day",
    ],
  },
  {
    question: "How do you react to emotional pain?",
    choices: [
      "I try to stay strong",
      "I hide it from others",
      "I stop feeling anything",
    ],
  },
  {
    question: "What do you wish people understood about you?",
    choices: [
      "I'm trying my best",
      "I'm struggling silently",
      "I feel emotionally lost",
    ],
  },
  {
    question: "What do you need the most right now?",
    choices: [
      "Rest",
      "Emotional support",
      "A reason to feel something again",
    ],
  },
  {
    question: "If someone asked \"Are you okay?\", what would your honest answer be?",
    choices: [
      "I'm tired, but I'll survive.",
      "I don't really know anymore.",
      "I feel empty.",
    ],
  },
];

const results = {
  A: {
    title: "The Silent Fighter",
    subtitle: "You are emotionally tired, but you keep going anyway.",
    description:
      "You may look functional from the outside, but internally you are carrying exhaustion, stress, and emotional pressure. You are resilient, but constantly forcing yourself to stay strong can slowly drain your mental energy. You often keep your struggles private because you do not want to burden others.",
    helps: [
      "Genuine rest",
      "Emotional understanding",
      "Permission to slow down without guilt",
    ],
  },
  B: {
    title: "The Hidden Storm",
    subtitle: "You carry intense emotions while appearing calm outside.",
    description:
      "You tend to suppress stress, sadness, or anxiety instead of openly expressing them. Because of this, people may underestimate how overwhelmed you actually feel. You often feel like you have to handle everything alone. You are struggling more than you allow others to see.",
    helps: [
      "Emotional release",
      "Someone who listens without judgment",
      "A safe space where you can be honest about your feelings",
    ],
  },
  C: {
    title: "The Emotionally Numb",
    subtitle: "You feel disconnected from your emotions and yourself.",
    description:
      "Instead of intense sadness, you may feel emptiness, emotional distance, or a lack of motivation. This can happen when the mind becomes overwhelmed for too long and starts protecting itself by shutting emotions down. You are not emotionless — you may simply be emotionally exhausted.",
    helps: [
      "Small meaningful experiences",
      "Human connection without pressure",
      "Time and support to slowly reconnect with your emotions",
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