import React, { useState, useEffect } from 'react';
import { Droplets, Plus, Target, Trophy, TrendingUp, RotateCcw, Sun, Moon, Coins, Store, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
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
    const savedUnlockedFeatures = localStorage.getItem('unlockedFeatures');

    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedIntake) setCurrentIntake(parseInt(savedIntake));
    if (savedDrinks) setDrinks(JSON.parse(savedDrinks));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    if (savedAquaCoins) setAquaCoins(parseInt(savedAquaCoins));
    if (savedUnlockedThemes) setUnlockedThemes(JSON.parse(savedUnlockedThemes));
    if (savedCurrentTheme) setCurrentTheme(savedCurrentTheme);
    if (savedUnlockedFeatures) setUnlockedFeatures(JSON.parse(savedUnlockedFeatures));
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
    localStorage.setItem('unlockedFeatures', JSON.stringify(unlockedFeatures));
  }, [dailyGoal, currentIntake, drinks, streak, isDarkMode, aquaCoins, unlockedThemes, currentTheme, unlockedFeatures]);

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
    const baseClasses = "min-h-screen transition-all duration-1000 relative";
    
    switch (currentTheme) {
      case 'ocean':
        return `${baseClasses} bg-gradient-to-br from-blue-900/90 via-cyan-800/90 to-blue-900/90`;
      case 'sunset':
        return `${baseClasses} bg-gradient-to-br from-orange-800/90 via-pink-700/90 to-purple-800/90`;
      case 'forest':
        return `${baseClasses} bg-gradient-to-br from-green-900/90 via-emerald-800/90 to-teal-900/90`;
      default:
        return `${baseClasses} ${isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
        }`;
    }
  };

  const getThemeBackgroundImage = () => {
    switch (currentTheme) {
      case 'ocean':
        return 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80';
      case 'sunset':
        return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80';
      case 'forest':
        return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80';
      default:
        return null;
    }
  };

  const handleThemeSwitch = (themeName: string) => {
    setCurrentTheme(themeName);
  };

  const hasEliteBadges = unlockedFeatures.includes('premium-badges');

  return (
    <div className={getThemeStyles()}>
      {/* Background Image Overlay */}
      {getThemeBackgroundImage() && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${getThemeBackgroundImage()})`,
            filter: isDarkMode ? 'brightness(0.6) contrast(1.1)' : 'brightness(0.9) contrast(1.1)'
          }}
        />
      )}
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Simple Header Box */}
        <div className="text-white p-8 rounded-b-[3rem] shadow-2xl backdrop-blur-sm transition-all duration-1000 border-b bg-black/20 backdrop-blur-xl border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 shadow-xl">
                <Droplets className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent tracking-wide">
                  Aqua Drop
                </h1>
                <p className="text-blue-100 font-medium text-lg">Your luxury hydration companion</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-2xl p-3"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-2xl px-4"
                onClick={() => setShowAquaShop(true)}
              >
                <Store className="w-6 h-6 mr-2" />
                Shop
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-2xl px-4"
                onClick={() => setShowGoalSetting(true)}
              >
                <Target className="w-6 h-6 mr-2" />
                Goal
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-2xl px-4"
                onClick={resetHydration}
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Luxury Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 shadow-lg">
              <Trophy className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="font-bold text-2xl">{streak}</p>
                <p className="text-blue-100 text-sm">Day Streak</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 shadow-lg">
              <Coins className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="font-bold text-2xl">{aquaCoins}</p>
                <p className="text-blue-100 text-sm">Aqua Coins</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 shadow-lg">
              <TrendingUp className="w-8 h-8 text-green-300" />
              <div>
                <p className="font-bold text-2xl">{progressPercentage.toFixed(0)}%</p>
                <p className="text-blue-100 text-sm">Complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm border border-white/10">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-white/20">Achievements</TabsTrigger>
              {unlockedFeatures.includes('analytics-pro') && (
                <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">Analytics</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-10">
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
              <Card className="p-8 border-0 shadow-2xl backdrop-blur-sm transition-all duration-700 rounded-3xl bg-white/5 backdrop-blur-sm text-white border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-7 h-7 text-blue-400" />
                  <h3 className="font-bold text-2xl text-white">Today's Progress</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Current Intake</span>
                    <span className="font-bold text-blue-400">{currentIntake}ml</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Daily Goal</span>
                    <span className="font-bold text-white">{dailyGoal}ml</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Remaining</span>
                    <span className="font-bold text-orange-400">
                      {Math.max(0, dailyGoal - currentIntake)}ml
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-4 rounded-full" />
                  <p className="text-sm text-center font-medium text-gray-400">
                    {progressPercentage.toFixed(0)}% complete
                  </p>
                </div>
              </Card>

              {/* Recent Drinks History */}
              <DrinkHistory drinks={drinks.slice(0, 5)} isDarkMode={true} />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-10">
              <Achievements 
                currentIntake={currentIntake} 
                dailyGoal={dailyGoal} 
                streak={streak} 
                isDarkMode={true}
                onAchievementUnlocked={awardAchievementCoins}
                aquaCoins={aquaCoins}
                hasEliteBadges={hasEliteBadges}
              />
            </TabsContent>

            {unlockedFeatures.includes('analytics-pro') && (
              <TabsContent value="analytics" className="space-y-10">
                <Card className="p-8 border-0 shadow-2xl backdrop-blur-sm transition-all duration-700 rounded-3xl bg-white/5 backdrop-blur-sm text-white border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-7 h-7 text-blue-400" />
                    <h3 className="font-bold text-2xl text-white">Hydration Analytics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-semibold text-lg mb-4 text-blue-300">Weekly Average</h4>
                      <p className="text-3xl font-bold text-white">{Math.round(currentIntake * 0.85)}ml</p>
                      <p className="text-gray-400 text-sm mt-2">Based on your daily intake patterns</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-semibold text-lg mb-4 text-green-300">Goal Achievement Rate</h4>
                      <p className="text-3xl font-bold text-white">78%</p>
                      <p className="text-gray-400 text-sm mt-2">Days you've reached your goal this month</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-semibold text-lg mb-4 text-purple-300">Best Streak</h4>
                      <p className="text-3xl font-bold text-white">{Math.max(streak, 7)} days</p>
                      <p className="text-gray-400 text-sm mt-2">Your longest hydration streak</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-semibold text-lg mb-4 text-orange-300">Peak Hours</h4>
                      <p className="text-3xl font-bold text-white">2-4 PM</p>
                      <p className="text-gray-400 text-sm mt-2">When you hydrate the most</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            )}
          </Tabs>
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
            unlockedFeatures={unlockedFeatures}
            onPurchase={(itemId, cost) => {
              if (itemId.includes('theme-')) {
                const themeName = itemId.replace('theme-', '');
                setUnlockedThemes(prev => [...prev, themeName]);
                setCurrentTheme(themeName);
              } else if (itemId.includes('feature') || itemId.includes('premium') || itemId.includes('custom') || itemId.includes('analytics')) {
                setUnlockedFeatures(prev => [...prev, itemId]);
                if (itemId === 'analytics-pro') {
                  setActiveTab('analytics');
                }
              }
              setAquaCoins(prev => prev - cost);
              toast({
                title: "Purchase Successful!",
                description: "Enjoy your new premium feature!",
                duration: 3000,
              });
            }}
            onThemeSwitch={handleThemeSwitch}
            onClose={() => setShowAquaShop(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
