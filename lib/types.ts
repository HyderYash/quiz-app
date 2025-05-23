export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  coinCost: number;
  coinReward: number;
  questions: Question[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Icon name from lucide-react
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  quizzes: Quiz[];
}

export interface QuizResult {
  quizId: string;
  correctAnswers: number;
  totalQuestions: number;
  earnedCoins: number;
}