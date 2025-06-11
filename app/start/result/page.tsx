// "use client";

// import Link from "next/link";
// import { Coins } from "lucide-react";

// export default function ResultPage() {
//   return (
//     <div className="h-full w-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 p-4 overflow-y-auto">
//       {/* Coin Icon */}
//       <div className="flex justify-center mb-6 mt-2">
//         <div className="relative">
//           <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
//             <span className="text-2xl font-bold text-yellow-900">$</span>
//           </div>
//         </div>
//       </div>

//       {/* Header */}
//       <p className="text-yellow-400 text-center text-sm font-medium mb-2">
//         New Reward Available
//       </p>

//       {/* Main Title */}
//       <h1 className="text-white text-2xl font-bold text-center mb-2">
//         Get Instant 100 Coins!
//       </h1>

//       {/* Subtitle */}
//       <p className="text-white text-center text-lg mb-6">
//         Play Quiz and Win Coins!
//       </p>

//       {/* Features List */}
//       <div className="space-y-3 mb-8">
//         <div className="flex items-start gap-3">
//           <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
//           <p className="text-gray-300 text-sm">
//             Play Quizzes in 25+ categories like GK, Sports, Bollywood, Business, Cricket & more!
//           </p>
//         </div>
//         <div className="flex items-start gap-3">
//           <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
//           <p className="text-gray-300 text-sm">
//             Compete with lakhs of other players!
//           </p>
//         </div>
//         <div className="flex items-start gap-3">
//           <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
//           <p className="text-gray-300 text-sm">
//             Win coins for every game
//           </p>
//         </div>
//         <div className="flex items-start gap-3">
//           <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
//           <p className="text-gray-300 text-sm">
//             Trusted by millions of other quiz enthusiasts like YOU!
//           </p>
//         </div>
//       </div>

//       {/* Continue Button */}
//       <Link
//         href="/start"
//         className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 block"
//       >
//         Continue
//       </Link>
//     </div>
//   );
// }

"use client";

import Advertisement from "@/app/components/Advertisement";
import { X } from "lucide-react";
import Link from "next/link";

export default function ResultPage() {
  return (
    <>
      <Advertisement />

      <div className="fixed inset-0 z-50 bg-slate-900/90 flex items-center justify-center">
        <div className="relative bg-slate-800 text-white rounded-2xl p-6 w-full max-w-sm text-center border border-white shadow-lg">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X />
          </button>

          {/* Coin Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-yellow-900 mb-4">
            $
          </div>

          {/* Text */}
          <p className="text-yellow-400 text-sm font-medium mb-1">New Reward Available</p>
          <h1 className="text-2xl font-bold mb-1">Get Instant 100 Coins!</h1>
          <p className="text-gray-400 text-sm mb-6">Watch a simple ad and get rewarded</p>

          {/* Claim Button */}
          <Link href="/start">
            <button className="w-full bg-yellow-400 text-slate-900 font-semibold py-2 rounded-xl hover:bg-yellow-500 transition">
              Claim
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
