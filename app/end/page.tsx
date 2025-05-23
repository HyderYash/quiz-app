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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full text-center border border-slate-600">
        {/* Trophy with Rays */}
        <div className="relative mb-8 flex justify-center">
          {/* Radiating Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-4 bg-yellow-400 rounded-full"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: 'center 32px'
                }}
              />
            ))}
          </div>

          {/* Trophy */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Trophy Cup */}
            <div className="w-20 h-24 bg-gradient-to-b from-yellow-300 to-yellow-500 relative">
              {/* Main Cup Body */}
              <div className="w-full h-16 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-lg relative">
                {/* Star */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                {/* Left Handle */}
                <div className="absolute -left-3 top-3 w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-l-full border-l-2 border-yellow-600"></div>

                {/* Right Handle */}
                <div className="absolute -right-3 top-3 w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-r-full border-r-2 border-yellow-600"></div>
              </div>

              {/* Trophy Stem */}
              <div className="w-4 h-4 bg-gradient-to-b from-yellow-400 to-yellow-600 mx-auto rounded"></div>

              {/* Trophy Base */}
              <div className="w-12 h-4 bg-gradient-to-b from-yellow-500 to-yellow-600 mx-auto rounded"></div>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="mb-8">
          <p className="text-white text-2xl font-bold">
            You Score is {getNetScore()}
          </p>
        </div>

        {/* Go to Home Button */}
        <Link
          href="/"
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}