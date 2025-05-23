"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Play, Coins } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { categories } from "@/lib/data";
import { useCoins } from "../providers";
import { cn } from "@/lib/utils";

export default function StartPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const { coins, hasEnoughCoins } = useCoins();

  const categoryTabs = ["ALL", "NATURE AND ENVIRONMENT", "BUSINESS", "SPORTS", "HISTORY", "WORLD"];

  const filteredCategories = selectedCategory === "ALL"
    ? categories
    : categories.filter(cat => {
      const categoryName = cat.name.toUpperCase();
      switch (selectedCategory) {
        case "NATURE AND ENVIRONMENT":
          return categoryName.includes("NATURE");
        case "BUSINESS":
          return categoryName.includes("BUSINESS");
        case "SPORTS":
          return categoryName.includes("SPORTS");
        case "HISTORY":
          return categoryName.includes("HISTORY");
        case "WORLD":
          return categoryName.includes("WORLD");
        default:
          return true;
      }
    });

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'nature':
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
      case 'business':
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
            <div className="w-3 h-3 bg-amber-700 rounded-full relative mt-1">
              <div className="absolute inset-0.5 border border-white rounded-full"></div>
            </div>
          </div>
        );
      case 'history':
        return () => (
          <div className="w-8 h-6 bg-yellow-200 rounded-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-300 rounded-t-sm"></div>
            <div className="absolute inset-x-1 top-2 space-y-0.5">
              <div className="w-6 h-0.5 bg-amber-800"></div>
              <div className="w-4 h-0.5 bg-amber-800"></div>
              <div className="w-5 h-0.5 bg-amber-800"></div>
            </div>
          </div>
        );
      case 'world':
        return () => (
          <div className="w-8 h-8 bg-blue-400 rounded-full relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <div className="absolute top-2 right-1 w-1 h-1 bg-green-500 rounded-full"></div>
          </div>
        );
      default:
        return () => <LucideIcons.HelpCircle className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-0.5 bg-white rounded"></div>
          <div className="w-5 h-0.5 bg-white rounded"></div>
          <div className="w-5 h-0.5 bg-white rounded"></div>
        </div>
        <h1 className="text-2xl font-bold text-yellow-400">Quizwinz</h1>
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

      {/* Category Tabs */}
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                selectedCategory === tab
                  ? "bg-yellow-400 text-black"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Cards */}
      <div className="px-4 space-y-3">
        {filteredCategories.map((category) =>
          category.subcategories.map((subcategory) =>
            subcategory.quizzes.map((quiz) => {
              const IconComponent = getCategoryIcon(category.id);
              const canPlay = hasEnoughCoins(quiz.coinCost);

              return (
                <div key={quiz.id} className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">
                      {category.name} | {subcategory.name}
                    </div>
                    <div className="text-white font-semibold mb-2">
                      {quiz.title}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Entry Fee</span>
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        <span className="text-white">{quiz.coinCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Link
                    href={canPlay ? `/playquiz?category=${category.id}&subcategory=${subcategory.id}&quiz=${quiz.id}` : "#"}
                    onClick={(e) => !canPlay && e.preventDefault()}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                      canPlay
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-gray-600 cursor-not-allowed"
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