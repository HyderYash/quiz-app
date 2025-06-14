"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCoins } from "../providers";
import { saveQuizResult, cn } from "@/lib/utils";
import Advertisement from "../components/Advertisement";
import { X } from "lucide-react";

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
      coinReward: 1000,
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
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    if (!loading && (quizData === null || !quizData.quiz)) {
      router.replace("/start");
      return;
    }
    if (!hasDeductedCoins && quizData && quizData.quiz) {
      deductCoins(quizData.quiz.coinCost);
      setHasDeductedCoins(true);
      setHasStarted(true);
    }
  }, [quizData, router, deductCoins, hasDeductedCoins, loading]);

  useEffect(() => {
    if (!hasStarted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
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

  const endQuiz = (finalCorrectAnswers = correctAnswers) => {
    const earnedCoins = finalCorrectAnswers * (quiz.coinReward / quiz.questions.length);
    const result = {
      quizId: quiz.id,
      correctAnswers: finalCorrectAnswers,
      totalQuestions: quiz.questions.length,
      earnedCoins,
      coinCost: quiz.coinCost,
      timestamp: new Date().getTime(),
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

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // Use a local variable to track updated correct count
    const updatedCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;

    if (isCorrect) setCorrectAnswers(updatedCorrectAnswers);
    else setWrongAnswers(prev => prev + 1);

    setTimeout(() => {
      const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

      if (isLastQuestion) {
        // Pass the correct updated value to endQuiz
        endQuiz(updatedCorrectAnswers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1000);
  };

  const getOptionClassName = (index: number) => {
    if (!showResult) return "bg-slate-700 hover:bg-slate-600 text-white";
    if (index === currentQuestion.correctAnswer) return "bg-green-600 text-white";
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) return "bg-red-600 text-white";
    return "bg-slate-700 text-white";
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 p-4 relative pt-12">
        {/* Quit/Close Button */}
        <button
          className="absolute top-4 right-4 z-20 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 shadow-lg transition-colors"
          onClick={() => router.push('/start')}
          aria-label="Quit Quiz"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-center mb-4 mt-2">
          <h1 className="text-xl font-bold text-yellow-400 mb-2">
            {quizData.categoryId.charAt(0).toUpperCase() + quizData.categoryId.slice(1)}-{quizData.subcategoryId.charAt(0).toUpperCase() + quizData.subcategoryId.slice(1)}
          </h1>
          <p className="text-white text-lg">
            Play & WinCoin 💰{quiz.coinReward}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{correctAnswers}</span>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-slate-700">
              <span className="text-white font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{wrongAnswers}</span>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="bg-slate-700 rounded-lg px-4 py-2 inline-block">
            <span className="text-white text-sm">Question {currentQuestionIndex + 1}/{quiz.questions.length}</span>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-white text-lg leading-relaxed">{currentQuestion.text}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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

        <div className="text-center mt-4">
          <p className="text-yellow-400 font-semibold text-lg">
            Your Score: {correctAnswers * (quiz.coinReward / quiz.questions.length)}
          </p>
        </div>
      </div>
      <Advertisement />
    </>
  );
}
