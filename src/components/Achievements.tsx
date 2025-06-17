
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Flame, Star, Award, Target, Zap, Heart, Coffee, Droplets, Crown } from 'lucide-react';

interface AchievementsProps {
  currentIntake: number;
  dailyGoal: number;
  streak: number;
  isDarkMode?: boolean;
}

const Achievements = ({ currentIntake, dailyGoal, streak, isDarkMode = false }: AchievementsProps) => {
  const achievements = [
    {
      id: 'first-drop',
      title: 'First Drop',
      description: 'Log your first drink',
      icon: Droplets,
      unlocked: currentIntake > 0,
      color: 'text-blue-500 bg-blue-100',
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Drink 200ml before 10 AM',
      icon: Star,
      unlocked: currentIntake >= 200,
      color: 'text-yellow-500 bg-yellow-100',
    },
    {
      id: 'quarter-goal',
      title: 'Getting Started',
      description: 'Reach 25% of daily goal',
      icon: Zap,
      unlocked: currentIntake >= dailyGoal * 0.25,
      color: 'text-green-500 bg-green-100',
    },
    {
      id: 'half-goal',
      title: 'Halfway Hero',
      description: 'Reach 50% of daily goal',
      icon: Award,
      unlocked: currentIntake >= dailyGoal * 0.5,
      color: 'text-orange-500 bg-orange-100',
    },
    {
      id: 'caffeine-lover',
      title: 'Caffeine Lover',
      description: 'Log 3+ coffee drinks',
      icon: Coffee,
      unlocked: currentIntake >= 750, // Approximate for demo
      color: 'text-amber-600 bg-amber-100',
    },
    {
      id: 'hydration-warrior',
      title: 'Hydration Warrior',
      description: 'Reach 75% of daily goal',
      icon: Heart,
      unlocked: currentIntake >= dailyGoal * 0.75,
      color: 'text-red-500 bg-red-100',
    },
    {
      id: 'daily-goal',
      title: 'Goal Crusher',
      description: 'Complete daily goal',
      icon: Target,
      unlocked: currentIntake >= dailyGoal,
      color: 'text-purple-500 bg-purple-100',
    },
    {
      id: 'overachiever',
      title: 'Overachiever',
      description: 'Exceed goal by 25%',
      icon: Crown,
      unlocked: currentIntake >= dailyGoal * 1.25,
      color: 'text-indigo-500 bg-indigo-100',
    },
    {
      id: 'streak-3',
      title: 'Consistency King',
      description: '3+ day streak',
      icon: Flame,
      unlocked: streak >= 3,
      color: 'text-red-500 bg-red-100',
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: '7+ day streak',
      icon: Trophy,
      unlocked: streak >= 7,
      color: 'text-yellow-600 bg-yellow-100',
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Card className={`p-6 border-0 shadow-lg transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-slate-800/80 backdrop-blur-sm' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Achievements</h3>
        </div>
        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {unlockedCount}/{achievements.length}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? isDarkMode 
                    ? 'border-transparent bg-gradient-to-br from-slate-700 to-slate-600 shadow-md hover:shadow-lg'
                    : 'border-transparent bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg'
                  : isDarkMode
                    ? 'border-dashed border-slate-600 bg-slate-700/30'
                    : 'border-dashed border-gray-300 bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-lg w-fit mb-2 transition-all duration-300 ${
                achievement.unlocked ? achievement.color : isDarkMode ? 'bg-slate-600 text-gray-500' : 'bg-gray-200 text-gray-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <h4 className={`text-sm font-semibold mb-1 ${
                achievement.unlocked 
                  ? isDarkMode ? 'text-white' : 'text-gray-800'
                  : isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h4>
              <p className={`text-xs ${
                achievement.unlocked 
                  ? isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  : isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <div className="mt-2 text-xs font-medium text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Unlocked!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {unlockedCount < achievements.length && (
        <div className="mt-4 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Keep hydrating to unlock more achievements! 🎯
          </p>
        </div>
      )}
    </Card>
  );
};

export default Achievements;
