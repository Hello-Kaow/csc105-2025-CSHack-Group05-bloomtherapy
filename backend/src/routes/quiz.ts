import { Router, Request, Response } from "express";

const router = Router();

const questions = [
  {
    question: "When the world feels hopeless, what keeps you moving?",
    choices: [
      "The people I love",
      "The possibility that things may get better",
      "I honestly don't know anymore",
    ],
  },
  {
    question: "What would hurt you the most to lose?",
    choices: [
      "Someone important to me",
      "My dreams and goals",
      "My sense of self",
    ],
  },
  {
    question: "In difficult times, what do you usually hold onto?",
    choices: [
      "Relationships",
      "Hope for the future",
      "Isolation and silence",
    ],
  },
  {
    question: "What gives your life meaning?",
    choices: [
      "Being there for others",
      "Achieving something meaningful",
      "Trying to survive one more day",
    ],
  },
  {
    question: "If you had one last peaceful moment, what would you choose?",
    choices: [
      "Spending time with loved ones",
      "Watching the sunrise quietly",
      "Being completely alone",
    ],
  },
  {
    question: "What motivates you the most?",
    choices: [
      "Responsibility",
      "Purpose",
      "Fear of giving up",
    ],
  },
  {
    question: "How do you usually cope with emotional pain?",
    choices: [
      "Talking to someone",
      "Distracting myself with goals",
      "Shutting myself away",
    ],
  },
  {
    question: "What scares you about losing humanity?",
    choices: [
      "Losing connection with people",
      "Losing hope",
      "Becoming emotionally numb",
    ],
  },
  {
    question: "When you imagine the future, what do you feel?",
    choices: [
      "I want to protect the people I care about",
      "I still believe there's something worth living for",
      "I can't really picture a future",
    ],
  },
  {
    question: "What makes you feel most alive?",
    choices: [
      "Emotional connection",
      "Personal growth and meaning",
      "Rare moments of peace",
    ],
  },
];

const results = {
  A: {
    title: "The Protector",
    subtitle: "You live for the ones you love.",
    description:
      "Your reason for surviving is deeply connected to the people you care about. You naturally prioritize others' safety, emotions, and well-being before your own.",
    helps: [
      "Emotional reassurance",
      "Safe spaces to express vulnerability",
      "Supportive relationships",
      "Learning that you do not always need to carry everything alone",
    ],
  },

  B: {
    title: "The Hope Keeper",
    subtitle: "You hold on because you still believe.",
    description:
      "You continue living because a part of you still believes that better days can exist, even after experiencing pain and loss.",
    helps: [
      "Positive emotional connections",
      "Small achievable goals",
      "Peaceful environments",
      "Reminders that your efforts matter",
    ],
  },

  C: {
    title: "The Drifter",
    subtitle: "You're still here — and that already means something.",
    description:
      "You may feel emotionally disconnected, lost, or uncertain about your purpose. Survival feels more automatic than meaningful.",
    helps: [
      "Gentle emotional support",
      "Rebuilding daily routines",
      "Quiet moments of reflection",
      "Finding small personal meanings instead of forcing big answers",
    ],
  },
};

router.get("/questions", (_req: Request, res: Response) => {
  res.json(questions);
});

router.post("/result", (req: Request, res: Response) => {
  const { answers }: { answers: number[] } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({
      message: "answers must be an array",
    });
  }

  const counts = [0, 0, 0];

  answers.forEach((answer) => {
    if (answer >= 0 && answer <= 2) {
      counts[answer]++;
    }
  });

  const winner = counts.indexOf(Math.max(...counts));

  const resultKey =
    winner === 0 ? "A" : winner === 1 ? "B" : "C";

  return res.json(results[resultKey as keyof typeof results]);
});

export default router;