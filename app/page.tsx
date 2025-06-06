"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quickStartQuiz } from "@/lib/data";
import { QuizCard } from "@/components/ui/quiz-card";
import { useCoins } from "./providers";

export default function Home() {
  const router = useRouter();
  const { addCoins } = useCoins();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions = quickStartQuiz.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const calculateEarnedCoins = (totalCorrect: number) => {
    // Calculate base coins using the original percentage logic
    const baseCoins = Math.round(
      totalCorrect / questions.length * quickStartQuiz.coinReward
    );

    // Always add 100 bonus coins
    const bonusCoins = 100;

    return baseCoins + bonusCoins;
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 500);
    } else {
      const finalCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
      const earnedCoins = calculateEarnedCoins(finalCorrectAnswers);

      setTimeout(() => {
        addCoins(earnedCoins);
        router.push('/start/result');
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2 px-2">
      <h1 className="text-4xl font-bold text-center">Quick Start!</h1>
      <p className="text-muted-foreground mb-2 text-center">
        Answer {questions.length} questions and win up to {quickStartQuiz.coinReward} coins.
      </p>

      <div className="w-full max-w-xl">
        <div className="text-center text-sm text-muted-foreground mb-2">
          {currentQuestionIndex + 1}/{questions.length} Question
        </div>

        <QuizCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          showResult={true}
          className="mb-3"
        />

        <div className="fun-fact">
          <h2 className="text-lg font-semibold">#Fun Fact</h2>
          <p className="text-muted-foreground text-sm">
            Mahendra Singh Dhoni clenches a title of being the most successful captain in the IPL history.
          </p>
        </div>

        {/* Promotional Section */}
        <div className="mt-4 bg-slate-800 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold text-center mb-3">
            Play Quiz and Win Coins!
          </h2>

          <div className="space-y-1">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                Play Quizzes in 25+ categories like GK, Sports, Bollywood, Business, Cricket & more!
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                Compete with lakhs of other players!
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                Win coins for every game
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                Trusted by millions of other quiz enthusiasts like YOU!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}