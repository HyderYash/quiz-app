"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import { useCoins } from "../providers";
import { saveQuizResult } from "@/lib/utils";
import { cn } from "@/lib/utils";

function findQuizFromApiData(apiData: any, categoryId: string, subcategoryId: string, quizId: string) {
  if (!apiData || typeof apiData !== 'object') return null;
  const cat = Object.entries(apiData).find(([catName]) => catName.toLowerCase().replace(/\s+/g, '-') === categoryId);
  if (!cat) return null;
  const subcats = cat[1];
  const subcat = Object.entries(subcats || {}).find(([subcatName]) => subcatName.toLowerCase().replace(/\s+/g, '-') === subcategoryId);
  if (!subcat) return null;
  const questionsArr = subcat[1];
  const questions = Array.isArray(questionsArr)
    ? questionsArr.filter(q => q && q.question && Array.isArray(q.options) && q.options.length > 0)
    : [];
  if (questions.length === 0) return null;
  // Quiz id is like `${categoryName}-${subcatName}`
  const expectedQuizId = `${cat[0]}-${subcat[0]}`.toLowerCase().replace(/\s+/g, '-');
  if (quizId !== expectedQuizId) return null;
  return {
    categoryId,
    subcategoryId,
    quizId,
    quiz: {
      id: expectedQuizId,
      title: `${subcat[0]} Quiz`,
      description: `Quiz for ${subcat[0]}`,
      coinCost: 100,
      coinReward: 2000,
      questions: questions.map((qq: any, i: number) => ({
        id: qq.id || `${cat[0]}-${subcat[0]}-q${i}`,
        text: qq.question || '',
        options: qq.options || [],
        correctAnswer: qq.options ? qq.options.indexOf(qq.answer) : 0,
      }))
    }
  };
}

export default function PlayQuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCoins, addCoins } = useCoins();

  const categoryId = searchParams.get("category") || "";
  const subcategoryId = searchParams.get("subcategory") || "";
  const quizId = searchParams.get("quiz") || "";

  const [quizData, setQuizData] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasDeductedCoins, setHasDeductedCoins] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get quiz data from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('current_quiz');
      if (stored) {
        try {
          setQuizData(JSON.parse(stored));
          setLoading(false);
          return;
        } catch {
          setQuizData(null);
        }
      }
      // If not found, fetch from API using params
      (async () => {
        try {
          const res = await fetch('/api/quiz-data');
          const json = await res.json();
          if (json.success && json.data) {
            const found = findQuizFromApiData(json.data, categoryId, subcategoryId, quizId);
            if (found) {
              setQuizData(found);
              localStorage.setItem('current_quiz', JSON.stringify(found));
              setLoading(false);
              return;
            }
          }
        } catch { }
        setQuizData(null);
        setLoading(false);
      })();
    }
  }, [categoryId, subcategoryId, quizId]);

  useEffect(() => {
    // If quiz not found, redirect to start
    if (!loading && (quizData === null || !quizData.quiz)) {
      router.replace("/start");
      return;
    }
    // Deduct coins on start
    if (!hasDeductedCoins && quizData && quizData.quiz) {
      deductCoins(quizData.quiz.coinCost);
      setHasDeductedCoins(true);
      setHasStarted(true);
    }
  }, [quizData, router, deductCoins, hasDeductedCoins, loading]);

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

  if (loading || !quizData || !quizData.quiz) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-lg">Loading...</div>;
  }

  const quiz = quizData.quiz;
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
      coinCost: quiz.coinCost,
      timestamp: new Date().getTime()
    };
    saveQuizResult(result);
    if (typeof window !== 'undefined') {
      localStorage.setItem('latest_quiz_result', JSON.stringify(result));
      localStorage.removeItem('current_quiz');
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
            {quizData.categoryId.charAt(0).toUpperCase() + quizData.categoryId.slice(1)}-{quizData.subcategoryId.charAt(0).toUpperCase() + quizData.subcategoryId.slice(1)}
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
          {currentQuestion.options.map((option: string, index: number) => (
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