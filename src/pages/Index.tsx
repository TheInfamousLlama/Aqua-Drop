
import React, { useState, useEffect } from 'react';
import { Droplets, Plus, Target, Trophy, TrendingUp } from 'lucide-react';
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
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoal = localStorage.getItem('waterGoal');
    const savedIntake = localStorage.getItem('todayIntake');
    const savedDrinks = localStorage.getItem('todayDrinks');
    const savedStreak = localStorage.getItem('waterStreak');

    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedIntake) setCurrentIntake(parseInt(savedIntake));
    if (savedDrinks) setDrinks(JSON.parse(savedDrinks));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waterGoal', dailyGoal.toString());
    localStorage.setItem('todayIntake', currentIntake.toString());
    localStorage.setItem('todayDrinks', JSON.stringify(drinks));
    localStorage.setItem('waterStreak', streak.toString());
  }, [dailyGoal, currentIntake, drinks, streak]);

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

  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const isGoalMet = currentIntake >= dailyGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hydro Tracker</h1>
              <p className="text-blue-100">Stay refreshed!</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setShowGoalSetting(true)}
          >
            <Target className="w-4 h-4 mr-2" />
            Goal
          </Button>
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
        />

        {/* Quick Add Buttons */}
        <QuickAddButtons onAddWater={addWater} />

        {/* Today's Progress Stats */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">Today's Progress</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Current Intake</span>
              <span className="font-semibold text-blue-600">{currentIntake}ml</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Daily Goal</span>
              <span className="font-semibold text-gray-800">{dailyGoal}ml</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining</span>
              <span className="font-semibold text-orange-500">
                {Math.max(0, dailyGoal - currentIntake)}ml
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-center text-gray-500">
              {progressPercentage.toFixed(0)}% complete
            </p>
          </div>
        </Card>

        {/* Achievements */}
        <Achievements currentIntake={currentIntake} dailyGoal={dailyGoal} streak={streak} />

        {/* Recent Drinks History */}
        <DrinkHistory drinks={drinks.slice(0, 5)} />
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
