"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getCoins, setCoins, addCoins, deductCoins } from "@/lib/utils";

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => void;
  hasEnoughCoins: (amount: number) => boolean;
}

const CoinContext = createContext<CoinContextType>({
  coins: 0,
  addCoins: () => {},
  deductCoins: () => {},
  hasEnoughCoins: () => false,
});

export function CoinProvider({ children }: { children: ReactNode }) {
  const [coins, setCoinsState] = useState(0);
  
  useEffect(() => {
    // Initialize on client-side
    setCoinsState(getCoins());
  }, []);
  
  const updateCoins = (amount: number) => {
    setCoinsState(amount);
    setCoins(amount);
    
    // Dispatch custom event for other components to update
    window.dispatchEvent(new Event('coinsUpdated'));
  };
  
  const handleAddCoins = (amount: number) => {
    const newAmount = coins + amount;
    updateCoins(newAmount);
    return newAmount;
  };
  
  const handleDeductCoins = (amount: number) => {
    const newAmount = Math.max(0, coins - amount);
    updateCoins(newAmount);
    return newAmount;
  };
  
  const handleHasEnoughCoins = (amount: number) => {
    return coins >= amount;
  };
  
  return (
    <CoinContext.Provider
      value={{
        coins,
        addCoins: handleAddCoins,
        deductCoins: handleDeductCoins,
        hasEnoughCoins: handleHasEnoughCoins,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
}

export function useCoins() {
  return useContext(CoinContext);
}