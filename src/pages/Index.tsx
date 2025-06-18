
import React, { useState, useEffect } from 'react';
import { Droplets, Plus, Target, Trophy, TrendingUp, RotateCcw, Sun, Moon, Coins, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import WaterProgress from '@/components/WaterProgress';
import QuickAddButtons from '@/components/QuickAddButtons';
import DrinkHistory from '@/components/DrinkHistory';
import GoalSetting from '@/components/GoalSetting';
import Achievements from '@/components/Achievements';
import AquaShop from '@/components/AquaShop';

interface DrinkEntry {
  id: string;
  amount: number;
  type: 'water' | 'tea' | 'coffee';
  multiplier: number;
  timestamp: Date;
}

const Index = () => {
  const [dailyGoal, setDailyGoal] = useState(2000); // ml
  const [currentIntake, setCurrentIntake] = useState(0);
  const [drinks, setDrinks] = useState<DrinkEntry[]>([]);
  const [streak, setStreak] = useState(3);
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [showAquaShop, setShowAquaShop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [aquaCoins, setAquaCoins] = useState(25);
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>(['default']);
  const [currentTheme, setCurrentTheme] = useState('default');
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoal = localStorage.getItem('waterGoal');
    const savedIntake = localStorage.getItem('todayIntake');
    const savedDrinks = localStorage.getItem('todayDrinks');
    const savedStreak = localStorage.getItem('waterStreak');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedAquaCoins = localStorage.getItem('aquaCoins');
    const savedUnlockedThemes = localStorage.getItem('unlockedThemes');
    const savedCurrentTheme = localStorage.getItem('currentTheme');

    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedIntake) setCurrentIntake(parseInt(savedIntake));
    if (savedDrinks) setDrinks(JSON.parse(savedDrinks));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    if (savedAquaCoins) setAquaCoins(parseInt(savedAquaCoins));
    if (savedUnlockedThemes) setUnlockedThemes(JSON.parse(savedUnlockedThemes));
    if (savedCurrentTheme) setCurrentTheme(savedCurrentTheme);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waterGoal', dailyGoal.toString());
    localStorage.setItem('todayIntake', currentIntake.toString());
    localStorage.setItem('todayDrinks', JSON.stringify(drinks));
    localStorage.setItem('waterStreak', streak.toString());
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('aquaCoins', aquaCoins.toString());
    localStorage.setItem('unlockedThemes', JSON.stringify(unlockedThemes));
    localStorage.setItem('currentTheme', currentTheme);
  }, [dailyGoal, currentIntake, drinks, streak, isDarkMode, aquaCoins, unlockedThemes, currentTheme]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addWater = (amount: number, type: 'water' | 'tea' | 'coffee' = 'water') => {
    const multipliers = { water: 1, tea: 0.9, coffee: 0.8 };
    const multiplier = multipliers[type];
    const effectiveAmount = amount * multiplier;
    
    const newDrink: DrinkEntry = {
      id: Date.now().toString(),
      amount,
      type,
      multiplier,
      timestamp: new Date()
    };

    setDrinks(prev => [newDrink, ...prev]);
    setCurrentIntake(prev => {
      const newIntake = prev + effectiveAmount;
      
      // Check for goal completion
      if (prev < dailyGoal && newIntake >= dailyGoal) {
        const bonusCoins = 10;
        setAquaCoins(coins => coins + bonusCoins);
        toast({
          title: "🎉 Daily Goal Achieved!",
          description: `Amazing work! You've earned ${bonusCoins} Aqua Coins!`,
          duration: 5000,
        });
      }
      
      return newIntake;
    });

    // Award coins for hydrating
    const coinsEarned = Math.floor(amount / 100);
    if (coinsEarned > 0) {
      setAquaCoins(coins => coins + coinsEarned);
    }

    toast({
      title: `+${amount}ml ${type} logged`,
      description: `Great job staying hydrated! ${coinsEarned > 0 ? `+${coinsEarned} Aqua Coins` : ''}`,
      duration: 2000,
    });
  };

  const resetHydration = () => {
    setCurrentIntake(0);
    setDrinks([]);
    toast({
      title: "Hydration Reset",
      description: "Your daily progress has been reset!",
      duration: 3000,
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: `${!isDarkMode ? 'Dark' : 'Light'} Mode Enabled`,
      description: `Switched to ${!isDarkMode ? 'dark' : 'light'} theme`,
      duration: 2000,
    });
  };

  const awardAchievementCoins = (coins: number) => {
    setAquaCoins(prev => prev + coins);
    toast({
      title: "🎉 Achievement Unlocked!",
      description: `You've earned ${coins} Aqua Coins!`,
      duration: 3000,
    });
  };

  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const isGoalMet = currentIntake >= dailyGoal;

  const getThemeStyles = () => {
    switch (currentTheme) {
      case 'ocean':
        return isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100';
      case 'sunset':
        return isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900' 
          : 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100';
      case 'forest':
        return isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900' 
          : 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100';
      default:
        return isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getThemeStyles()}`}>
      {/* Luxury Header */}
      <div className={`text-white p-6 rounded-b-3xl shadow-2xl backdrop-blur-md transition-all duration-700 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-800/90 to-cyan-700/90 border-b border-white/10' 
          : 'bg-gradient-to-r from-blue-500/95 to-cyan-500/95 border-b border-white/20'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
              <Droplets className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent tracking-wide">
                Aqua Drop
              </h1>
              <p className="text-blue-100 font-medium">Your premium hydration companion</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-300"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-300"
              onClick={() => setShowAquaShop(true)}
            >
              <Store className="w-5 h-5 mr-2" />
              Shop
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-300"
              onClick={() => setShowGoalSetting(true)}
            >
              <Target className="w-5 h-5 mr-2" />
              Goal
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-300"
              onClick={resetHydration}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Premium Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <div>
              <p className="font-bold text-lg">{streak}</p>
              <p className="text-blue-100 text-sm">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <Coins className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="font-bold text-lg">{aquaCoins}</p>
              <p className="text-blue-100 text-sm">Aqua Coins</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <TrendingUp className="w-6 h-6 text-green-300" />
            <div>
              <p className="font-bold text-lg">{progressPercentage.toFixed(0)}%</p>
              <p className="text-blue-100 text-sm">Complete</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Water Progress Circle */}
        <WaterProgress
          current={currentIntake}
          goal={dailyGoal}
          percentage={progressPercentage}
          isGoalMet={isGoalMet}
          isDarkMode={isDarkMode}
        />

        {/* Quick Add Buttons */}
        <QuickAddButtons onAddWater={addWater} isDarkMode={isDarkMode} />

        {/* Today's Progress Stats */}
        <Card className={`p-6 border-0 shadow-2xl backdrop-blur-md transition-all duration-700 ${
          isDarkMode 
            ? 'bg-slate-800/80 backdrop-blur-sm text-white border border-white/10' 
            : 'bg-white/90 backdrop-blur-sm border border-white/50'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Today's Progress</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Current Intake</span>
              <span className="font-bold text-blue-600">{currentIntake}ml</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Daily Goal</span>
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{dailyGoal}ml</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Remaining</span>
              <span className="font-bold text-orange-500">
                {Math.max(0, dailyGoal - currentIntake)}ml
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 rounded-full" />
            <p className={`text-xs text-center font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {progressPercentage.toFixed(0)}% complete
            </p>
          </div>
        </Card>

        {/* Achievements */}
        <Achievements 
          currentIntake={currentIntake} 
          dailyGoal={dailyGoal} 
          streak={streak} 
          isDarkMode={isDarkMode}
          onAchievementUnlocked={awardAchievementCoins}
          aquaCoins={aquaCoins}
        />

        {/* Recent Drinks History */}
        <DrinkHistory drinks={drinks.slice(0, 5)} isDarkMode={isDarkMode} />
      </div>

      {/* Goal Setting Modal */}
      {showGoalSetting && (
        <GoalSetting
          currentGoal={dailyGoal}
          onGoalSet={(newGoal) => {
            setDailyGoal(newGoal);
            setShowGoalSetting(false);
            toast({
              title: "Goal Updated!",
              description: `New daily goal set to ${newGoal}ml`,
            });
          }}
          onClose={() => setShowGoalSetting(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Aqua Shop Modal */}
      {showAquaShop && (
        <AquaShop
          aquaCoins={aquaCoins}
          unlockedThemes={unlockedThemes}
          currentTheme={currentTheme}
          onPurchase={(itemId, cost) => {
            if (itemId.includes('theme-')) {
              const themeName = itemId.replace('theme-', '');
              setUnlockedThemes(prev => [...prev, themeName]);
              setCurrentTheme(themeName);
            }
            setAquaCoins(prev => prev - cost);
            toast({
              title: "Purchase Successful!",
              description: "Enjoy your new premium feature!",
              duration: 3000,
            });
          }}
          onClose={() => setShowAquaShop(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default Index;
