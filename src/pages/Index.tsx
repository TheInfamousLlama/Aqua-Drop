import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import WaterProgress from '@/components/WaterProgress';
import QuickAddButtons from '@/components/QuickAddButtons';
import CustomDrinks from '@/components/CustomDrinks';
import DrinkHistory from '@/components/DrinkHistory';
import GoalSetting from '@/components/GoalSetting';
import Achievements from '@/components/Achievements';
import AquaShop from '@/components/AquaShop';
import AppHeader from '@/components/layout/AppHeader';
import ThemeProvider from '@/components/layout/ThemeProvider';

interface DrinkEntry {
  id: string;
  amount: number;
  type: string;
  multiplier: number;
  timestamp: Date;
}

interface CustomDrink {
  id: string;
  name: string;
  defaultAmount: number;
  multiplier: number;
  icon: React.ReactNode;
  color: string;
}

const Index = () => {
  const [dailyGoal, setDailyGoal] = useState(2000); // ml
  const [currentIntake, setCurrentIntake] = useState(0);
  const [drinks, setDrinks] = useState<DrinkEntry[]>([]);
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [showAquaShop, setShowAquaShop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [aquaCoins, setAquaCoins] = useState(125);
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>(['default']);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [customDrinks, setCustomDrinks] = useState<CustomDrink[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [goalAchievementRate, setGoalAchievementRate] = useState(0);
  const [peakHours, setPeakHours] = useState('Not enough data');
  const [totalIntake, setTotalIntake] = useState(0);
  const [daysTracked, setDaysTracked] = useState(1);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoal = localStorage.getItem('waterGoal');
    const savedIntake = localStorage.getItem('todayIntake');
    const savedDrinks = localStorage.getItem('todayDrinks');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedAquaCoins = localStorage.getItem('aquaCoins');
    const savedUnlockedThemes = localStorage.getItem('unlockedThemes');
    const savedCurrentTheme = localStorage.getItem('currentTheme');
    const savedUnlockedFeatures = localStorage.getItem('unlockedFeatures');
    const savedCustomDrinks = localStorage.getItem('customDrinks');
    const savedTotalIntake = localStorage.getItem('totalIntake');
    const savedDaysTracked = localStorage.getItem('daysTracked');

    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedIntake) setCurrentIntake(parseInt(savedIntake));
    if (savedDrinks) setDrinks(JSON.parse(savedDrinks));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    if (savedAquaCoins) setAquaCoins(parseInt(savedAquaCoins));
    if (savedUnlockedThemes) setUnlockedThemes(JSON.parse(savedUnlockedThemes));
    if (savedCurrentTheme) setCurrentTheme(savedCurrentTheme);
    if (savedUnlockedFeatures) setUnlockedFeatures(JSON.parse(savedUnlockedFeatures));
    if (savedCustomDrinks) setCustomDrinks(JSON.parse(savedCustomDrinks));
    if (savedTotalIntake) setTotalIntake(parseInt(savedTotalIntake));
    if (savedDaysTracked) setDaysTracked(parseInt(savedDaysTracked));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waterGoal', dailyGoal.toString());
    localStorage.setItem('todayIntake', currentIntake.toString());
    localStorage.setItem('todayDrinks', JSON.stringify(drinks));
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('aquaCoins', aquaCoins.toString());
    localStorage.setItem('unlockedThemes', JSON.stringify(unlockedThemes));
    localStorage.setItem('currentTheme', currentTheme);
    localStorage.setItem('unlockedFeatures', JSON.stringify(unlockedFeatures));
    localStorage.setItem('customDrinks', JSON.stringify(customDrinks));
    localStorage.setItem('totalIntake', totalIntake.toString());
    localStorage.setItem('daysTracked', daysTracked.toString());
  }, [dailyGoal, currentIntake, drinks, isDarkMode, aquaCoins, unlockedThemes, currentTheme, unlockedFeatures, customDrinks, totalIntake, daysTracked]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Update analytics based on actual data
  useEffect(() => {
    if (drinks.length > 0) {
      const dailyIntake = drinks.reduce((sum, drink) => sum + (drink.amount * drink.multiplier), 0);
      setTotalIntake(prev => prev + dailyIntake);
      
      // Calculate weekly average based on total intake and days tracked
      setWeeklyAverage(Math.round(totalIntake / daysTracked));
      
      // Calculate goal achievement rate
      const goalsAchieved = currentIntake >= dailyGoal ? 1 : 0;
      setGoalAchievementRate(Math.round((goalsAchieved / daysTracked) * 100));
      
      // Calculate peak hours based on drink timestamps
      const hourCounts = drinks.reduce((acc, drink) => {
        const hour = new Date(drink.timestamp).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {} as {[hour: number]: number});
      
      const peakHour = Object.entries(hourCounts).reduce((a, b) => 
        hourCounts[parseInt(a[0])] > hourCounts[parseInt(b[0])] ? a : b
      )?.[0];
      
      if (peakHour) {
        const hour = parseInt(peakHour);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        setPeakHours(`${displayHour}:00 ${period}`);
      }
    }
  }, [drinks, currentIntake, dailyGoal, totalIntake, daysTracked]);

  const addWater = (amount: number, type: string = 'water', multiplier: number = 1) => {
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
    setDaysTracked(prev => prev + 1);
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

  const addCustomDrink = (drink: Omit<CustomDrink, 'id'>) => {
    const newDrink = {
      ...drink,
      id: Date.now().toString()
    };
    setCustomDrinks(prev => [...prev, newDrink]);
  };

  const removeCustomDrink = (id: string) => {
    setCustomDrinks(prev => prev.filter(drink => drink.id !== id));
  };

  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const isGoalMet = currentIntake >= dailyGoal;

  const handleThemeSwitch = (themeName: string) => {
    setCurrentTheme(themeName);
  };

  const hasEliteBadges = unlockedFeatures.includes('premium-badges');
  const hasAnalytics = unlockedFeatures.includes('analytics-pro');

  const availableTabs = ['overview', 'achievements', 'drinks'];
  if (hasAnalytics) availableTabs.push('analytics');
  if (hasEliteBadges) availableTabs.push('elite');

  const tabGridCols = availableTabs.length === 3 ? 'grid-cols-3' : 
                     availableTabs.length === 4 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <ThemeProvider currentTheme={currentTheme} isDarkMode={isDarkMode}>
      <AppHeader 
        isDarkMode={isDarkMode}
        daysTracked={daysTracked}
        aquaCoins={aquaCoins}
        progressPercentage={progressPercentage}
        onToggleDarkMode={toggleDarkMode}
        onOpenShop={() => setShowAquaShop(true)}
        onOpenGoalSetting={() => setShowGoalSetting(true)}
        onResetHydration={resetHydration}
      />

      <div className="p-8 space-y-10">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${tabGridCols} bg-white/10 backdrop-blur-sm border border-white/20`}>
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/30 text-white font-light">Overview</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white/30 text-white font-light">Achievements</TabsTrigger>
            <TabsTrigger value="drinks" className="data-[state=active]:bg-white/30 text-white font-light">Custom Drinks</TabsTrigger>
            {hasAnalytics && (
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white/30 text-white font-light">Analytics</TabsTrigger>
            )}
            {hasEliteBadges && (
              <TabsTrigger value="elite" className="data-[state=active]:bg-white/30 text-white font-light">Elite</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-10">
            <WaterProgress
              current={currentIntake}
              goal={dailyGoal}
              percentage={progressPercentage}
              isGoalMet={isGoalMet}
              isDarkMode={isDarkMode}
            />

            <QuickAddButtons onAddWater={addWater} isDarkMode={isDarkMode} />

            <Card className="p-8 border-0 shadow-2xl backdrop-blur-sm transition-all duration-700 rounded-3xl bg-white/5 backdrop-blur-sm text-white border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-7 h-7 text-blue-400" />
                <h3 className="font-light text-2xl text-white">Today's Progress</h3>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between text-lg">
                  <span className="text-white/70 font-light">Current Intake</span>
                  <span className="font-light text-blue-400">{currentIntake}ml</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-white/70 font-light">Daily Goal</span>
                  <span className="font-light text-white">{dailyGoal}ml</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-white/70 font-light">Remaining</span>
                  <span className="font-light text-orange-400">
                    {Math.max(0, dailyGoal - currentIntake)}ml
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-4 rounded-full" />
                <p className="text-sm text-center font-light text-white/60">
                  {progressPercentage.toFixed(0)}% complete
                </p>
              </div>
            </Card>

            <DrinkHistory drinks={drinks.slice(0, 5)} isDarkMode={true} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-10">
            <Achievements 
              currentIntake={currentIntake} 
              dailyGoal={dailyGoal} 
              isDarkMode={true}
              onAchievementUnlocked={awardAchievementCoins}
              aquaCoins={aquaCoins}
              hasEliteBadges={false}
            />
          </TabsContent>

          <TabsContent value="drinks" className="space-y-10">
            <CustomDrinks
              onAddWater={addWater}
              customDrinks={customDrinks}
              onAddCustomDrink={addCustomDrink}
              onRemoveCustomDrink={removeCustomDrink}
            />
          </TabsContent>

          {hasAnalytics && (
            <TabsContent value="analytics" className="space-y-10">
              <Card className="p-8 border-0 shadow-2xl backdrop-blur-sm transition-all duration-700 rounded-3xl bg-white/5 backdrop-blur-sm text-white border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-7 h-7 text-blue-400" />
                  <h3 className="font-light text-2xl text-white">Hydration Analytics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="font-light text-lg mb-4 text-blue-300">Weekly Average</h4>
                    <p className="text-3xl font-light text-white">{weeklyAverage}ml</p>
                    <p className="text-white/60 text-sm mt-2 font-light">Based on your daily intake patterns</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="font-light text-lg mb-4 text-green-300">Goal Achievement Rate</h4>
                    <p className="text-3xl font-light text-white">{goalAchievementRate}%</p>
                    <p className="text-white/60 text-sm mt-2 font-light">Days you've reached your goal</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="font-light text-lg mb-4 text-purple-300">Peak Hours</h4>
                    <p className="text-3xl font-light text-white">{peakHours}</p>
                    <p className="text-white/60 text-sm mt-2 font-light">When you hydrate the most</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="font-light text-lg mb-4 text-cyan-300">Total Intake</h4>
                    <p className="text-3xl font-light text-white">{totalIntake}ml</p>
                    <p className="text-white/60 text-sm mt-2 font-light">Lifetime hydration tracked</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="font-light text-lg mb-4 text-pink-300">Today's Performance</h4>
                    <p className="text-3xl font-light text-white">{progressPercentage.toFixed(0)}%</p>
                    <p className="text-white/60 text-sm mt-2 font-light">Progress towards daily goal</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="font-light text-lg mb-4 text-orange-300">Days Tracked</h4>
                    <p className="text-3xl font-light text-white">{daysTracked}</p>
                    <p className="text-white/60 text-sm mt-2 font-light">Total days using Aqua Drop</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}

          {hasEliteBadges && (
            <TabsContent value="elite" className="space-y-10">
              <Achievements 
                currentIntake={currentIntake} 
                dailyGoal={dailyGoal} 
                isDarkMode={true}
                onAchievementUnlocked={awardAchievementCoins}
                aquaCoins={aquaCoins}
                hasEliteBadges={true}
              />
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
    </ThemeProvider>
  );
};

export default Index;
