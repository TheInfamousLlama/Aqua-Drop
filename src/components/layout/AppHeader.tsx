
import React from 'react';
import { Droplets, Sun, Moon, Store, Target, RotateCcw, Trophy, Coins, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  isDarkMode: boolean;
  daysTracked: number;
  aquaCoins: number;
  progressPercentage: number;
  onToggleDarkMode: () => void;
  onOpenShop: () => void;
  onOpenGoalSetting: () => void;
  onResetHydration: () => void;
}

const AppHeader = ({ 
  isDarkMode, 
  daysTracked, 
  aquaCoins, 
  progressPercentage,
  onToggleDarkMode,
  onOpenShop,
  onOpenGoalSetting,
  onResetHydration
}: AppHeaderProps) => {
  return (
    <div className="text-white p-8 rounded-b-[2rem] shadow-xl backdrop-blur-sm transition-all duration-1000 border-b bg-black/25 backdrop-blur-sm border-white/20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
            <Droplets className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-5xl font-extralight bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent tracking-wide">
              Aqua Drop
            </h1>
            <p className="text-blue-100 font-light text-lg">Your luxury hydration companion</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl p-3"
            onClick={onToggleDarkMode}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4"
            onClick={onOpenShop}
          >
            <Store className="w-6 h-6 mr-2" />
            <span className="font-light">Shop</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4"
            onClick={onOpenGoalSetting}
          >
            <Target className="w-6 h-6 mr-2" />
            <span className="font-light">Goal</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4"
            onClick={onResetHydration}
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            <span className="font-light">Reset</span>
          </Button>
        </div>
      </div>

      {/* Luxury Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <Trophy className="w-8 h-8 text-yellow-300" />
          <div>
            <p className="font-light text-2xl text-white">{daysTracked}</p>
            <p className="text-blue-100 text-sm font-light">Days Tracked</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <Coins className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="font-light text-2xl text-white">{aquaCoins}</p>
            <p className="text-blue-100 text-sm font-light">Aqua Coins</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <TrendingUp className="w-8 h-8 text-green-300" />
          <div>
            <p className="font-light text-2xl text-white">{progressPercentage.toFixed(0)}%</p>
            <p className="text-blue-100 text-sm font-light">Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
