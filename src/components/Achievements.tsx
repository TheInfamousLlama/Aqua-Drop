
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Flame, Star, Award, Target, Zap, Heart, Coffee, Droplets, Crown, Coins, Calendar, Sparkles, Medal, Gem } from 'lucide-react';

interface AchievementsProps {
  currentIntake: number;
  dailyGoal: number;
  streak: number;
  isDarkMode?: boolean;
  onAchievementUnlocked?: (coins: number) => void;
  aquaCoins: number;
}

const Achievements = ({ currentIntake, dailyGoal, streak, isDarkMode = false, onAchievementUnlocked, aquaCoins }: AchievementsProps) => {
  const [previouslyUnlocked, setPreviouslyUnlocked] = useState<string[]>([]);

  const achievements = [
    {
      id: 'first-drop',
      title: 'First Drop',
      description: 'Log your first drink',
      icon: Droplets,
      unlocked: currentIntake > 0,
      color: 'text-blue-500 bg-blue-100',
      coins: 5,
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Drink 200ml before 10 AM',
      icon: Star,
      unlocked: currentIntake >= 200,
      color: 'text-yellow-500 bg-yellow-100',
      coins: 8,
    },
    {
      id: 'quarter-goal',
      title: 'Getting Started',
      description: 'Reach 25% of daily goal',
      icon: Zap,
      unlocked: currentIntake >= dailyGoal * 0.25,
      color: 'text-green-500 bg-green-100',
      coins: 10,
    },
    {
      id: 'half-goal',
      title: 'Halfway Hero',
      description: 'Reach 50% of daily goal',
      icon: Award,
      unlocked: currentIntake >= dailyGoal * 0.5,
      color: 'text-orange-500 bg-orange-100',
      coins: 15,
    },
    {
      id: 'caffeine-lover',
      title: 'Caffeine Lover',
      description: 'Log 3+ coffee drinks',
      icon: Coffee,
      unlocked: currentIntake >= 750,
      color: 'text-amber-600 bg-amber-100',
      coins: 12,
    },
    {
      id: 'hydration-warrior',
      title: 'Hydration Warrior',
      description: 'Reach 75% of daily goal',
      icon: Heart,
      unlocked: currentIntake >= dailyGoal * 0.75,
      color: 'text-red-500 bg-red-100',
      coins: 20,
    },
    {
      id: 'daily-goal',
      title: 'Goal Crusher',
      description: 'Complete daily goal',
      icon: Target,
      unlocked: currentIntake >= dailyGoal,
      color: 'text-purple-500 bg-purple-100',
      coins: 25,
    },
    {
      id: 'overachiever',
      title: 'Overachiever',
      description: 'Exceed goal by 25%',
      icon: Crown,
      unlocked: currentIntake >= dailyGoal * 1.25,
      color: 'text-indigo-500 bg-indigo-100',
      coins: 30,
    },
    {
      id: 'streak-3',
      title: 'Consistency King',
      description: '3+ day streak',
      icon: Flame,
      unlocked: streak >= 3,
      color: 'text-red-500 bg-red-100',
      coins: 20,
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: '7+ day streak',
      icon: Trophy,
      unlocked: streak >= 7,
      color: 'text-yellow-600 bg-yellow-100',
      coins: 50,
    },
    {
      id: 'coin-collector',
      title: 'Coin Collector',
      description: 'Earn 100+ Aqua Coins',
      icon: Coins,
      unlocked: aquaCoins >= 100,
      color: 'text-yellow-500 bg-yellow-100',
      coins: 25,
    },
    {
      id: 'weekend-warrior',
      title: 'Weekend Warrior',
      description: 'Stay hydrated on weekends',
      icon: Calendar,
      unlocked: streak >= 2,
      color: 'text-blue-600 bg-blue-100',
      coins: 15,
    },
    {
      id: 'premium-user',
      title: 'Premium User',
      description: 'Unlock your first theme',
      icon: Sparkles,
      unlocked: aquaCoins >= 50,
      color: 'text-pink-500 bg-pink-100',
      coins: 10,
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Hit exact daily goal',
      icon: Medal,
      unlocked: currentIntake === dailyGoal && dailyGoal > 0,
      color: 'text-emerald-500 bg-emerald-100',
      coins: 35,
    },
    {
      id: 'luxury-lifestyle',
      title: 'Luxury Lifestyle',
      description: 'Reach 200+ Aqua Coins',
      icon: Gem,
      unlocked: aquaCoins >= 200,
      color: 'text-purple-600 bg-purple-100',
      coins: 50,
    },
  ];

  useEffect(() => {
    const currentlyUnlocked = achievements.filter(a => a.unlocked).map(a => a.id);
    const newlyUnlocked = currentlyUnlocked.filter(id => !previouslyUnlocked.includes(id));
    
    if (newlyUnlocked.length > 0 && onAchievementUnlocked) {
      newlyUnlocked.forEach(id => {
        const achievement = achievements.find(a => a.id === id);
        if (achievement) {
          onAchievementUnlocked(achievement.coins);
        }
      });
    }
    
    setPreviouslyUnlocked(currentlyUnlocked);
  }, [achievements.map(a => a.unlocked).join(',')]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Card className={`p-8 border-0 shadow-2xl backdrop-blur-md transition-all duration-700 ${
      isDarkMode 
        ? 'bg-slate-800/80 backdrop-blur-sm border border-white/10' 
        : 'bg-white/90 backdrop-blur-sm border border-white/50'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Achievements</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Unlock rewards & earn Aqua Coins</p>
          </div>
        </div>
        <div className={`text-sm font-bold px-3 py-1 rounded-full ${
          isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {unlockedCount}/{achievements.length}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? isDarkMode 
                    ? 'border-transparent bg-gradient-to-br from-slate-700 to-slate-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'border-transparent bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : isDarkMode
                    ? 'border-dashed border-slate-600 bg-slate-700/30'
                    : 'border-dashed border-gray-300 bg-gray-50'
              }`}
            >
              <div className={`p-3 rounded-xl w-fit mb-3 transition-all duration-300 ${
                achievement.unlocked ? achievement.color : isDarkMode ? 'bg-slate-600 text-gray-500' : 'bg-gray-200 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className={`text-sm font-bold mb-2 ${
                achievement.unlocked 
                  ? isDarkMode ? 'text-white' : 'text-gray-800'
                  : isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h4>
              <p className={`text-xs mb-3 ${
                achievement.unlocked 
                  ? isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  : isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              {achievement.unlocked ? (
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Unlocked!
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-yellow-600">
                    <Coins className="w-3 h-3" />
                    {achievement.coins}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-medium text-yellow-600">
                  <Coins className="w-3 h-3" />
                  {achievement.coins}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {unlockedCount < achievements.length && (
        <div className="mt-6 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Keep hydrating to unlock more achievements & earn Aqua Coins! 🎯
          </p>
        </div>
      )}
    </Card>
  );
};

export default Achievements;
