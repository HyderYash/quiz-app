"use client";

import { useState, useEffect } from "react";
import Advertisement from "@/app/components/Advertisement";
import { X } from "lucide-react";
import Link from "next/link";

export default function ResultPage() {
  const [showModal, setShowModal] = useState(true);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const storedCoins = localStorage.getItem('1st_quiz_coins') || '0';
      setCoins(parseInt(storedCoins));
    }
  }, []);

  return (
    <>
      <Advertisement />

      {/* Main Page Content */}
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-2">
        <div className="w-full max-w-sm">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-3 text-center mb-6">
            {/* Trophy Image */}
            <div className="mb-2">
              <img
                src="https://quizwinz.com/_next/static/media/winner.48cb95ac.gif"
                alt="Trophy"
                className="w-24 h-24 mx-auto"
              />
            </div>

            {/* Coins Message */}
            <div className="mb-2">
              <h1 className="text-xl font-semibold text-gray-800">
                You Have got <span className="text-orange-500 font-bold text-2xl">{coins}</span> coins
              </h1>
            </div>

            {/* Play Now Button */}
            <Link href="/start" className="w-full">
              <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-2 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Play Now
              </button>
            </Link>
          </div>

          {/* Features Card */}
          <div className="bg-slate-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white text-center mb-6">
              Play Quiz and Win Coins!
            </h2>

            <ul className="space-y-2 list-none">
              <li className="flex items-start text-white">
                <span className="text-orange-400 mr-3 mt-1 text-lg">•</span>
                <span className="text-sm leading-relaxed">
                  Play Quizzes in 25+ categories like GK, Sports, Bollywood, Business, Cricket & more!
                </span>
              </li>

              <li className="flex items-start text-white">
                <span className="text-orange-400 mr-3 mt-1 text-lg">•</span>
                <span className="text-sm leading-relaxed">
                  Compete with lakhs of other players!
                </span>
              </li>

              <li className="flex items-start text-white">
                <span className="text-orange-400 mr-3 mt-1 text-lg">•</span>
                <span className="text-sm leading-relaxed">
                  Win coins for every game
                </span>
              </li>

              <li className="flex items-start text-white">
                <span className="text-orange-400 mr-3 mt-1 text-lg">•</span>
                <span className="text-sm leading-relaxed">
                  Trusted by millions of other quiz enthusiasts like YOU!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal (Ad/Reward Claim) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative bg-slate-800 text-white rounded-2xl p-6 w-full max-w-sm text-center border border-slate-600 shadow-2xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Coin Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-yellow-900 mb-4 shadow-lg">
              $
            </div>

            {/* Text */}
            <p className="text-yellow-400 text-sm font-medium mb-1">New Reward Available</p>
            <h1 className="text-2xl font-bold mb-1">Get Instant 100 Coins!</h1>
            <p className="text-gray-400 text-sm mb-6">Watch a simple ad and get rewarded</p>

            {/* Claim Button */}
            <button className="w-full bg-yellow-400 text-slate-900 font-semibold py-3 rounded-xl hover:bg-yellow-500 transition-colors shadow-lg" onClick={() => setShowModal(false)}>
              Claim
            </button>
          </div>
        </div>
      )}
    </>
  );
}