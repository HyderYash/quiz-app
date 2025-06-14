"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Play, Coins, X, Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useCoins } from "../providers";
import { cn } from "@/lib/utils";
import NavigationMenu from '../components/NavigationMenu';
import Advertisement from "../components/Advertisement";

function transformApiData(apiData: any) {
  if (!apiData || typeof apiData !== 'object') return [];
  return Object.entries(apiData).map(([categoryName, subcats]: any, idx) => ({
    id: categoryName.toLowerCase().replace(/\s+/g, '-'),
    name: categoryName,
    subcategories: Object.entries(subcats || {}).map(([subcatName, questionsArr]: any, subIdx) => {
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
          coinReward: 1000,
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
  const [showLowCoinsPopup, setShowLowCoinsPopup] = useState(false);
  const [showEarnCoinsModal, setShowEarnCoinsModal] = useState(false);

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
      // ... (other cases remain the same)
      default:
        return () => <LucideIcons.HelpCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const handleQuizClick = (e: React.MouseEvent, canPlay: boolean, category: any, subcategory: any, quiz: any) => {
    e.preventDefault();

    if (!canPlay) {
      setShowLowCoinsPopup(true);
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('current_quiz', JSON.stringify({
        categoryId: category.id,
        subcategoryId: subcategory.id,
        quizId: quiz.id,
        quiz: quiz
      }));
      window.location.href = `/playquiz?category=${category.id}&subcategory=${subcategory.id}&quiz=${quiz.id}`;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 overflow-auto relative">

        {/* Sticky Mobile Header */}
        <div className="sticky top-0 z-20 bg-slate-800 flex items-center justify-between w-full px-4 py-3 shadow-md">
          <button onClick={() => setIsMenuOpen(true)} className="flex flex-col gap-1">
            <div className="w-5 h-0.5 bg-white rounded"></div>
            <div className="w-5 h-0.5 bg-white rounded"></div>
            <div className="w-5 h-0.5 bg-white rounded"></div>
          </button>
          <h1 className="text-xl font-extrabold text-yellow-400 tracking-wide">Quizyfun</h1>
          <button
            onClick={() => setShowEarnCoinsModal(true)}
            className="flex items-center border-2 border-yellow-400 rounded-full px-2 py-1 bg-slate-800 hover:bg-slate-900 transition-colors group"
            style={{ minWidth: 70 }}
          >
            <Plus className="w-5 h-5 text-yellow-400 mr-1 group-hover:scale-110 transition-transform" />
            <span className="relative flex items-center mr-1">
              <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Coins className="w-4 h-4 text-yellow-900" />
              </span>
            </span>
            <span className="text-white font-bold text-lg ml-1">{coins}</span>
          </button>
        </div>

        <Advertisement />
        <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        {/* Category Tabs */}
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

        {/* Quiz Cards */}
        <div className="flex-1 flex flex-col gap-3 w-full px-4 pb-4 pt-2 overflow-y-auto scrollbar-custom">
          {filteredCategories.map((category: any) =>
            category.subcategories.map((subcategory: any) =>
              subcategory.quizzes.map((quiz: any) => {
                const IconComponent = getCategoryIcon(category.id);
                const canPlay = hasEnoughCoins(quiz.coinCost);
                return (
                  <div key={quiz.id} className="bg-slate-800 rounded-2xl shadow-lg p-4 flex items-center gap-4 border border-slate-700">
                    <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 mb-1 truncate">
                        {category.name} | {subcategory.name}
                      </div>
                      <div className="text-white font-bold text-base mb-1 truncate">{quiz.title}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-400">Entry Fee</span>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-400" />
                          <span className="text-white font-semibold">{quiz.coinCost}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={canPlay ? `/playquiz?category=${category.id}&subcategory=${subcategory.id}&quiz=${quiz.id}` : "#"}
                      onClick={(e) => handleQuizClick(e, canPlay, category, subcategory, quiz)}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors border-2 border-transparent",
                        canPlay
                          ? "bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-300 shadow-md"
                          : "bg-gray-600 cursor-not-allowed text-gray-400 cursor-pointer"
                      )}
                    >
                      <Play className={cn("h-6 w-6 ml-1", canPlay ? "text-black" : "text-gray-400")} />
                    </Link>
                  </div>
                );
              })
            )
          )}
        </div>
      </div>

      {/* Low Coins Popup */}
      {showLowCoinsPopup && coins < 100 ? (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative bg-white text-black rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <button onClick={() => setShowLowCoinsPopup(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">
              <X />
            </button>
            <p className="text-base font-medium mb-4">
              You don't have enough coins to play this contest.
              Click on video ad to get 100 reward coins.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLowCoinsPopup(false)}
                className="w-full bg-slate-900 text-white font-semibold py-2 rounded-md hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // trigger watch ads
                }}
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition"
              >
                Watch Ads
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Earn Coins Modal */}
      {showEarnCoinsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative bg-white text-black rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <button
              onClick={() => setShowEarnCoinsModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            {/* Coin Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
              <Coins className="w-10 h-10 text-yellow-900" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Earn More Coins!</h2>
            <p className="text-gray-600 mb-6">
              Watch a short video ad to earn 100 coins instantly. Use these coins to play more quizzes and win bigger rewards!
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEarnCoinsModal(false)}
                className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  // TODO: Implement watch ad functionality
                  setShowEarnCoinsModal(false);
                }}
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-500 transition"
              >
                Watch Ad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar styles */}
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: #facc15;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #facc15 transparent;
        }
      `}</style>
    </>
  );
}
