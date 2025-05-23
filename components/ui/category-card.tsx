"use client";

import Link from "next/link";
import { DivideIcon as LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Category, Subcategory, Quiz } from "@/lib/types";
import { cn, hasEnoughCoins } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  // Dynamically get the icon from lucide-react
  const IconComponent = (LucideIcons as Record<string, LucideIcon>)[
    category.icon.charAt(0).toUpperCase() + category.icon.slice(1)
  ] || LucideIcons.HelpCircle;

  return (
    <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">{category.name}</h2>
      </div>
      
      <div className="space-y-4">
        {category.subcategories.map((subcategory) => (
          <SubcategorySection 
            key={subcategory.id}
            categoryId={category.id}
            subcategory={subcategory} 
          />
        ))}
      </div>
    </div>
  );
}

interface SubcategorySectionProps {
  categoryId: string;
  subcategory: Subcategory;
}

function SubcategorySection({ categoryId, subcategory }: SubcategorySectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{subcategory.name}</h3>
      <div className="grid gap-3">
        {subcategory.quizzes.map((quiz) => (
          <QuizItem 
            key={quiz.id}
            categoryId={categoryId}
            subcategoryId={subcategory.id}
            quiz={quiz} 
          />
        ))}
      </div>
    </div>
  );
}

interface QuizItemProps {
  categoryId: string;
  subcategoryId: string;
  quiz: Quiz;
}

function QuizItem({ categoryId, subcategoryId, quiz }: QuizItemProps) {
  const canPlay = hasEnoughCoins(quiz.coinCost);
  
  return (
    <div className="p-4 rounded-md border bg-background flex justify-between items-center">
      <div>
        <h4 className="font-medium">{quiz.title}</h4>
        <p className="text-sm text-muted-foreground">{quiz.description}</p>
        <div className="mt-1 text-sm flex items-center gap-2">
          <span className="text-yellow-500 font-medium">Cost: {quiz.coinCost} coins</span>
          <span className="text-green-500 font-medium">Reward: {quiz.coinReward} coins</span>
        </div>
      </div>
      
      <Link
        href={canPlay ? `/playquiz?category=${categoryId}&subcategory=${subcategoryId}&quiz=${quiz.id}` : "#"}
        className={cn(
          "px-4 py-2 rounded-md font-medium text-sm transition-all",
          canPlay
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
        onClick={(e) => !canPlay && e.preventDefault()}
      >
        {canPlay ? "Play" : "Not enough coins"}
      </Link>
    </div>
  );
}