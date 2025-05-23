"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import { findQuiz } from "@/lib/data";
import { useCoins } from "../providers";
import { saveQuizResult } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function PlayQuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCoins, addCoins } = useCoins();

  const categoryId = searchParams.get("category") || "";
  const subcategoryId = searchParams.get("subcategory") || "";
  const quizId = searchParams.get("quiz") || "";

  const [quiz, setQuiz] = useState(findQuiz(categoryId, subcategoryId, quizId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasDeductedCoins, setHasDeductedCoins] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    // If quiz not found, redirect to start
    if (!quiz) {
      router.push("/start");
      return;
    }

    // Deduct coins on start
    if (!hasDeductedCoins && quiz) {
      deductCoins(quiz.coinCost);
      setHasDeductedCoins(true);
      setHasStarted(true);
    }
  }, [quiz, router, deductCoins, hasDeductedCoins]);

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - end quiz
          endQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLeft]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const endQuiz = () => {
    const earnedCoins = Math.round(
      correctAnswers / quiz.questions.length * quiz.coinReward
    );

    const result = {
      quizId: quiz.id,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      earnedCoins,
      timestamp: new Date().getTime()
    };

    // Save to persistent storage
    saveQuizResult(result);

    // Store latest result for end page (temporary)
    if (typeof window !== 'undefined') {
      localStorage.setItem('latest_quiz_result', JSON.stringify(result));
    }

    addCoins(earnedCoins);
    router.push('/end');
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setWrongAnswers(prev => prev + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endQuiz();
      }
    }, 2000);
  };

  const getOptionClassName = (index: number) => {
    if (!showResult) {
      return "bg-slate-700 hover:bg-slate-600 text-white";
    }

    if (index === currentQuestion.correctAnswer) {
      return "bg-green-600 text-white";
    }

    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return "bg-red-600 text-white";
    }

    return "bg-slate-700 text-white";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-lg w-full relative">
        {/* Close Button */}
        <Link
          href="/start"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </Link>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-yellow-400 mb-2">
            {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}-{subcategoryId.charAt(0).toUpperCase() + subcategoryId.slice(1)}
          </h1>
          <p className="text-white text-lg">
            Play & WinCoin 💰{quiz.coinReward}
          </p>
        </div>

        {/* Timer and Score */}
        <div className="flex items-center justify-between mb-6">
          {/* Correct Answers */}
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{correctAnswers}</span>
          </div>

          {/* Timer */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-slate-700">
              <span className="text-white font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Wrong Answers */}
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{wrongAnswers}</span>
          </div>
        </div>

        {/* Question Counter */}
        <div className="text-center mb-6">
          <div className="bg-slate-700 rounded-lg px-4 py-2 inline-block">
            <span className="text-white text-sm">Question {currentQuestionIndex + 1}/{quiz.questions.length}</span>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <p className="text-white text-lg leading-relaxed">
            {currentQuestion.text}
          </p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={cn(
                "p-4 rounded-lg text-center font-medium transition-all duration-200",
                getOptionClassName(index)
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Score Display */}
        <div className="text-center">
          <p className="text-yellow-400 font-semibold">
            Your Score is {correctAnswers}
          </p>
        </div>
      </div>
    </div>
  );
}