"use client";

import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { getCoins } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CoinDisplayProps {
  className?: string;
  showIcon?: boolean;
}

export function CoinDisplay({ className, showIcon = true }: CoinDisplayProps) {
  const [coins, setCoins] = useState(0);
  
  useEffect(() => {
    setCoins(getCoins());
    
    // Update coins when localStorage changes
    const handleStorageChange = () => {
      setCoins(getCoins());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for our app to trigger updates
    window.addEventListener('coinsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('coinsUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className={cn("flex items-center gap-2 font-medium", className)}>
      {showIcon && <Coins className="h-5 w-5 text-yellow-500" />}
      <span>{coins}</span>
    </div>
  );
}