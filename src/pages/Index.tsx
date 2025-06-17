
import React, { useState, useEffect } from 'react';
import { Droplets, Plus, Target, Trophy, TrendingUp, RotateCcw, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import WaterProgress from '@/components/WaterProgress';
import QuickAddButtons from '@/components/QuickAddButtons';
import DrinkHistory from '@/components/DrinkHistory';
import GoalSetting from '@/components/GoalSetting';
import Achievements from '@/components/Achievements';

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoal = localStorage.getItem('waterGoal');
    const savedIntake = localStorage.getItem('todayIntake');
    const savedDrinks = localStorage.getItem('todayDrinks');
    const savedStreak = localStorage.getItem('waterStreak');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedIntake) setCurrentIntake(parseInt(savedIntake));
    if (savedDrinks) setDrinks(JSON.parse(savedDrinks));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waterGoal', dailyGoal.toString());
    localStorage.setItem('todayIntake', currentIntake.toString());
    localStorage.setItem('todayDrinks', JSON.stringify(drinks));
    localStorage.setItem('waterStreak', streak.toString());
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [dailyGoal, currentIntake, drinks, streak, isDarkMode]);

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
        toast({
          title: "🎉 Daily Goal Achieved!",
          description: "Amazing work! You've hit your hydration target!",
          duration: 5000,
        });
      }
      
      return newIntake;
    });

    toast({
      title: `+${amount}ml ${type} logged`,
      description: `Great job staying hydrated!`,
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

  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const isGoalMet = currentIntake >= dailyGoal;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
    }`}>
      {/* Header */}
      <div className={`text-white p-6 rounded-b-3xl shadow-lg transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-800 to-cyan-700' 
          : 'bg-gradient-to-r from-blue-500 to-cyan-500'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Aqua Drop
              </h1>
              <p className="text-blue-100">Stay refreshed!</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setShowGoalSetting(true)}
            >
              <Target className="w-4 h-4 mr-2" />
              Goal
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={resetHydration}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3">
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="font-semibold">{streak} day streak!</span>
          <span className="text-blue-100">Keep it up!</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
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
        <Card className={`p-4 border-0 shadow-lg transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-slate-800/80 backdrop-blur-sm text-white' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Today's Progress</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Current Intake</span>
              <span className="font-semibold text-blue-600">{currentIntake}ml</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Daily Goal</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{dailyGoal}ml</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Remaining</span>
              <span className="font-semibold text-orange-500">
                {Math.max(0, dailyGoal - currentIntake)}ml
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {progressPercentage.toFixed(0)}% complete
            </p>
          </div>
        </Card>

        {/* Achievements */}
        <Achievements currentIntake={currentIntake} dailyGoal={dailyGoal} streak={streak} isDarkMode={isDarkMode} />

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
        />
      )}
    </div>
  );
};

export default Index;
