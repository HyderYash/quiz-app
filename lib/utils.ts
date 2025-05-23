import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QuizResult } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Coin management functions
export const COINS_KEY = 'quiz_app_coins';

export function getCoins(): number {
  if (typeof window === 'undefined') return 0;
  
  const coins = localStorage.getItem(COINS_KEY);
  return coins ? parseInt(coins, 10) : 0;
}

export function setCoins(amount: number): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(COINS_KEY, amount.toString());
}

export function addCoins(amount: number): number {
  const currentCoins = getCoins();
  const newAmount = currentCoins + amount;
  setCoins(newAmount);
  return newAmount;
}

export function deductCoins(amount: number): number {
  const currentCoins = getCoins();
  const newAmount = Math.max(0, currentCoins - amount);
  setCoins(newAmount);
  return newAmount;
}

export function hasEnoughCoins(amount: number): boolean {
  return getCoins() >= amount;
}

// Quiz result storage
export const QUIZ_RESULTS_KEY = 'quiz_app_results';

export function saveQuizResult(result: QuizResult): void {
  if (typeof window === 'undefined') return;
  
  const resultsJson = localStorage.getItem(QUIZ_RESULTS_KEY);
  const results = resultsJson ? JSON.parse(resultsJson) : [];
  
  results.push({
    ...result,
    timestamp: new Date().toISOString(),
  });
  
  localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
}

export function getQuizResults(): QuizResult[] {
  if (typeof window === 'undefined') return [];
  
  const resultsJson = localStorage.getItem(QUIZ_RESULTS_KEY);
  return resultsJson ? JSON.parse(resultsJson) : [];
}