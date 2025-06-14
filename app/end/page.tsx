"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coins, Trophy, ArrowLeft } from "lucide-react";
import { useCoins } from "../providers";
import Image from "next/image";

interface QuizResult {
  correctAnswers: number;
  totalQuestions: number;
  earnedCoins: number;
  timestamp: number;
  coinCost?: number;
}

export default function EndPage() {
  const [result, setResult] = useState<number>(0);
  const { coins } = useCoins();

  useEffect(() => {
    // Get the latest quiz result from localStorage
    if (typeof window !== 'undefined') {
      const latestResult = JSON.parse(localStorage.getItem('quiz_app_results') || '[]');
      const lastElement = latestResult[latestResult.length - 1];
      const re = lastElement.correctAnswers * 100
      console.log(re)
      setResult(re);

      // Clear the result after reading to prevent reuse
      localStorage.removeItem('latest_quiz_result');
      // }
    }
  }, []);


  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 p-4 overflow-y-auto">
      {/* Back to Home Link */}
      <div className="mb-4 flex justify-between">
        <Link href="/start" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <div className="flex items-center bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
          <Coins className="w-4 h-4 mr-1" />
          {coins || 100}
        </div>
      </div>

      {/* Main content card */}
      <div className="bg-slate-700 rounded-lg p-8 text-center">
        <div className="relative mb-6 flex justify-center">
          {/* Trophy image */}
          <div className="relative z-10">
            <Image
              src="/trophy.gif"
              alt="Trophy"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Score text */}
        <h2 className="text-white text-xl font-semibold mb-6">
          Your Score is {result}
        </h2>

        {/* Go to Home button */}
        <Link
          href="/start"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
        >
          Go to Home
        </Link>
      </div>

    </div>
  );
}