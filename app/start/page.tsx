"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Play, Coins } from "lucide-react";
import * as LucideIcons from "lucide-react";
// import { categories } from "@/lib/data"; // REMOVE STATIC IMPORT
import { useCoins } from "../providers";
import { cn } from "@/lib/utils";
import NavigationMenu from '../components/NavigationMenu';

// Helper to transform API data to UI structure
function transformApiData(apiData: any) {
  if (!apiData || typeof apiData !== 'object') return [];
  return Object.entries(apiData).map(([categoryName, subcats]: any, idx) => ({
    id: categoryName.toLowerCase().replace(/\s+/g, '-'),
    name: categoryName,
    subcategories: Object.entries(subcats || {}).map(([subcatName, questionsArr]: any, subIdx) => {
      // Each subcategory is an array of questions
      const questions = Array.isArray(questionsArr)
        ? questionsArr.filter(q => q && q.question && Array.isArray(q.options) && q.options.length > 0)
        : [];
      return {
        id: subcatName.toLowerCase().replace(/\s+/g, '-'),
        name: subcatName,
        quizzes: questions.length > 0 ? [{
          id: `${categoryName}-${subcatName}`,
          title: `${subcatName} Quiz`,
          description: `Quiz for ${subcatName}`,
          coinCost: 100,
          coinReward: 2000,
          questions: questions.map((qq: any, i: number) => ({
            id: qq.id || `${categoryName}-${subcatName}-q${i}`,
            text: qq.question || '',
            options: qq.options || [],
            correctAnswer: qq.options ? qq.options.indexOf(qq.answer) : 0,
          }))
        }] : []
      };
    })
  }));
}

export default function StartPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const { coins, hasEnoughCoins } = useCoins();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryTabs, setCategoryTabs] = useState<string[]>(["ALL"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/quiz-data");
        const json = await res.json();
        if (json.success && json.data) {
          const cats = transformApiData(json.data);
          setCategories(cats);
          setCategoryTabs(["ALL", ...cats.map((cat: any) => cat.name.toUpperCase())]);
        } else {
          setCategories([]);
          setCategoryTabs(["ALL"]);
        }
      } catch (e) {
        setCategories([]);
        setCategoryTabs(["ALL"]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCategories = selectedCategory === "ALL"
    ? categories
    : categories.filter(cat => cat.name.toUpperCase() === selectedCategory.toUpperCase());

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'nature-and-enviroment':
        return () => (
          <div className="relative">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-400 rounded-full relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <LucideIcons.Trees className="w-3 h-3 text-green-600" />
            </div>
          </div>
        );
      case 'business-and-economics':
        return () => (
          <div className="flex gap-1 items-end">
            <div className="w-2 h-6 bg-orange-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
            <div className="w-2 h-5 bg-green-500 rounded-sm"></div>
            <div className="w-2 h-3 bg-red-500 rounded-sm"></div>
          </div>
        );
      case 'sports':
        return () => (
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-orange-600 rounded-full relative">
              <div className="absolute inset-0.5 border border-black rounded-full"></div>
            </div>
            <LucideIcons.Dumbbell className="w-4 h-4 text-orange-700" />
          </div>
        );
      case 'technology':
        return () => <LucideIcons.Cpu className="w-6 h-6 text-blue-600" />;
      case 'entertainment':
        return () => <LucideIcons.Film className="w-6 h-6 text-pink-500" />;
      case 'history':
        return () => <LucideIcons.BookOpen className="w-6 h-6 text-yellow-700" />;
      case 'math-and-logic':
        return () => <LucideIcons.FunctionSquare className="w-6 h-6 text-purple-600" />;
      case 'english':
        return () => <LucideIcons.Type className="w-6 h-6 text-indigo-600" />;
      case 'travel':
        return () => <LucideIcons.Plane className="w-6 h-6 text-sky-500" />;
      case 'world':
        return () => <LucideIcons.Globe className="w-6 h-6 text-green-700" />;
      default:
        return () => <LucideIcons.HelpCircle className="w-6 h-6 text-gray-400" />;
    }
  };


  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-20 bg-slate-800 flex items-center justify-between w-full px-4 py-3 shadow-md">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col gap-1"
        >
          <div className="w-5 h-0.5 bg-white rounded"></div>
          <div className="w-5 h-0.5 bg-white rounded"></div>
          <div className="w-5 h-0.5 bg-white rounded"></div>
        </button>
        <h1 className="text-xl font-extrabold text-yellow-400 tracking-wide">Quizwinz</h1>
        <div className="flex items-center gap-1 bg-yellow-400 rounded-full px-3 py-1.5">
          <div className="w-5 h-5 bg-yellow-500 rounded-full relative flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-600 rounded-full relative">
              <div className="absolute inset-0 border border-yellow-700 rounded-full"></div>
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-yellow-300 rounded-full"></div>
            </div>
          </div>
          <span className="text-black font-bold text-lg">{coins}</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Category Tabs - Mobile Scrollable */}
      <div className="w-full px-0 pt-3 pb-2 bg-slate-900 sticky top-[56px] z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-custom pb-1 w-full px-4">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 border border-transparent",
                selectedCategory === tab
                  ? "bg-yellow-400 text-black shadow-md border-yellow-300"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              )}
              style={{ minWidth: 90 }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Cards - Mobile Single Column */}
      <div className="flex-1 flex flex-col gap-3 w-full px-4 pb-4 pt-2 overflow-y-auto scrollbar-custom">
        {filteredCategories.map((category: any) =>
          category.subcategories.map((subcategory: any) =>
            subcategory.quizzes.map((quiz: any) => {
              const IconComponent = getCategoryIcon(category.id);
              const canPlay = hasEnoughCoins(quiz.coinCost);
              return (
                <div key={quiz.id} className="bg-slate-800 rounded-2xl shadow-lg p-4 flex items-center gap-4 border border-slate-700">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 mb-1 truncate">
                      {category.name} | {subcategory.name}
                    </div>
                    <div className="text-white font-bold text-base mb-1 truncate">
                      {quiz.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400">Entry Fee</span>
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        <span className="text-white font-semibold">{quiz.coinCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Link
                    href={canPlay ? `/playquiz?category=${category.id}&subcategory=${subcategory.id}&quiz=${quiz.id}` : "#"}
                    onClick={e => {
                      if (!canPlay) {
                        e.preventDefault();
                        return;
                      }
                      // Store full quiz data in localStorage
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('current_quiz', JSON.stringify({
                          categoryId: category.id,
                          subcategoryId: subcategory.id,
                          quizId: quiz.id,
                          quiz: quiz // This now includes all questions
                        }));
                      }
                    }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-colors border-2 border-transparent",
                      canPlay
                        ? "bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-300 shadow-md"
                        : "bg-gray-600 cursor-not-allowed text-gray-400"
                    )}
                  >
                    <Play className={cn(
                      "h-6 w-6 ml-1",
                      canPlay ? "text-black" : "text-gray-400"
                    )} />
                  </Link>
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
}