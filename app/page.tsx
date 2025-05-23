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

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 500);
    } else {
      const earnedCoins = Math.round(
        (correctAnswers + (isCorrect ? 1 : 0)) / questions.length * quickStartQuiz.coinReward
      );

      setTimeout(() => {
        addCoins(earnedCoins);
        router.push('/start/result');
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">Quick Start!</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Answer {questions.length} questions and win up to {quickStartQuiz.coinReward} coins.
      </p>

      <div className="w-full max-w-2xl">
        <div className="text-center text-sm text-muted-foreground mb-4">
          {currentQuestionIndex + 1}/{questions.length} Question
        </div>

        <QuizCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          showResult={true}
          className="mb-6"
        />

        <div className="fun-fact">
          <h2 className="text-xl font-semibold mb-4">#Fun Fact</h2>
          <p className="text-muted-foreground">
            Mahendra Singh Dhoni clenches a title of being the most successful captain in the IPL history.
          </p>
        </div>

        {/* Promotional Section */}
        <div className="mt-8 bg-slate-800 rounded-xl p-6">
          <h2 className="text-white text-xl font-semibold text-center mb-6">
            Play Quiz and Win Coins!
          </h2>

          <div className="space-y-3">
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