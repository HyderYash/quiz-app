"use client";

import Link from "next/link";
import { Coins, X } from "lucide-react";

export default function ResultPage() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full relative border border-slate-600">
        {/* Close Button */}
        <Link
          href="/start"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </Link>

        {/* Coin Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-yellow-900">$</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <p className="text-yellow-400 text-center text-sm font-medium mb-2">
          New Reward Available
        </p>

        {/* Main Title */}
        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Get Instant 100 Coins!
        </h1>

        {/* Subtitle */}
        <p className="text-white text-center text-lg mb-6">
          Play Quiz and Win Coins!
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-8">
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

        {/* Continue Button */}
        <Link
          href="/start"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 block"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}