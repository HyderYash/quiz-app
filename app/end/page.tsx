"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coins, Trophy } from "lucide-react";
import { useCoins } from "../providers";

interface QuizResult {
  correctAnswers: number;
  totalQuestions: number;
  earnedCoins: number;
  timestamp: number;
  coinCost?: number;
}

export default function EndPage() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const { coins } = useCoins();

  useEffect(() => {
    // Get the latest quiz result from localStorage
    if (typeof window !== 'undefined') {
      const latestResult = localStorage.getItem('latest_quiz_result');
      if (latestResult) {
        const parsedResult = JSON.parse(latestResult);
        setResult(parsedResult);

        // Clear the result after reading to prevent reuse
        localStorage.removeItem('latest_quiz_result');
      }
    }
  }, []);

  // Calculate net score (earned coins minus entry fee)
  const getNetScore = () => {
    if (!result) return 0;
    // Assuming entry fee was 100 coins, so net = earned - 100
    return result.earnedCoins - 100;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-yellow-400/30 shadow-2xl rounded-2xl px-6 py-10 max-w-md w-full text-center relative animate-fade-in flex flex-col items-center">
        {/* Trophy with animated rays */}
        <div className="relative mb-10 flex justify-center items-center">
          {/* Animated Radiating Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-5 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: 'center 32px',
                  animationDelay: `${i * 0.08}s`
                }}
              />
            ))}
          </div>
          {/* Trophy */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="w-24 h-28 bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-lg relative rounded-b-lg flex flex-col items-center justify-end">
              {/* Cup */}
              <div className="w-full h-20 bg-gradient-to-b from-yellow-200 to-yellow-500 rounded-t-lg flex items-center justify-center relative">
                {/* Star */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                {/* Handles */}
                <div className="absolute -left-5 top-6 w-4 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-l-full border-l-2 border-yellow-600"></div>
                <div className="absolute -right-5 top-6 w-4 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-r-full border-r-2 border-yellow-600"></div>
              </div>
              {/* Stem */}
              <div className="w-5 h-5 bg-gradient-to-b from-yellow-400 to-yellow-600 mx-auto rounded"></div>
              {/* Base */}
              <div className="w-16 h-5 bg-gradient-to-b from-yellow-500 to-yellow-600 mx-auto rounded"></div>
            </div>
          </div>
        </div>

        {/* Correct/Total Display */}
        {result && (
          <div className="mb-4">
            <p className="text-white text-2xl font-bold tracking-wide">
              You got {typeof result.correctAnswers === 'number' ? result.correctAnswers : 0} out of {typeof result.totalQuestions === 'number' ? result.totalQuestions : 0} correct
            </p>
          </div>
        )}

        {/* Coins Earned */}
        {result && (
          <div className="mb-10">
            <p className="text-yellow-200 text-2xl font-extrabold tracking-wide">
              Coins Earned: {result.earnedCoins}
            </p>
          </div>
        )}

        {/* Go to Home Button */}
        <Link
          href="/"
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 shadow-lg transition-all duration-200 text-lg tracking-wide mt-4"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}