
export type GameState = 'home' | 'quiz' | 'results';

export type QuizMode = 'random' | 'dan' | 'multiplier';

export interface Question {
  num1: number;
  num2: number;
  answer: number;
}

export interface QuizConfig {
  mode: QuizMode;
  key?: number; // Used for dan or multiplier value
}
