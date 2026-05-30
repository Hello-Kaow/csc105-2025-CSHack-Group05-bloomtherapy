export interface Question {
  question: string;
  choices: string[];
}

export interface QuizResult {
  title: string;
  subtitle: string;
  description: string;
  helps: string[];
  color: string;
  bg: string;
  accent: string;
}
