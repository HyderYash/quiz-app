import { cn } from "@/lib/utils";
import { Question } from "@/lib/types";
import { useState } from "react";

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  showResult?: boolean;
  className?: string;
}

export function QuizCard({ question, onAnswer, showResult = false, className }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);

  const handleOptionClick = (optionIndex: number) => {
    if (showingResult) return;
    
    setSelectedOption(optionIndex);
    setShowingResult(true);
    
    setTimeout(() => {
      onAnswer(optionIndex === question.correctAnswer);
      setSelectedOption(null);
      setShowingResult(false);
    }, 500);
  };

  const getOptionClassName = (index: number) => {
    if (!showingResult || selectedOption === null) {
      return "quiz-option";
    }

    if (index === question.correctAnswer) {
      return "quiz-option correct";
    }

    if (index === selectedOption && index !== question.correctAnswer) {
      return "quiz-option incorrect";
    }

    return "quiz-option";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="bg-card rounded-2xl p-8 mb-6">
        <h2 className="text-xl text-center mb-8">{question.text}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={showingResult}
              className={getOptionClassName(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}