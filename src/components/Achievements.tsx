
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap, Crown, Diamond, Gem } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  target: number;
  coins: number;
  isElite?: boolean;
}

interface AchievementsProps {
  currentIntake: number;
  dailyGoal: number;
  isDarkMode: boolean;
  onAchievementUnlocked: (coins: number) => void;
  aquaCoins: number;
  hasEliteBadges?: boolean;
}

const Achievements = ({ 
  currentIntake, 
  dailyGoal, 
  isDarkMode, 
  onAchievementUnlocked, 
  aquaCoins,
  hasEliteBadges = false 
}: AchievementsProps) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const achievements: Achievement[] = [
    {
      id: 'first-drop',
      name: hasEliteBadges ? 'Diamond Drop' : 'First Drop',
      description: 'Log your first water intake',
      icon: hasEliteBadges ? <Diamond className="w-6 h-6" /> : <Zap className="w-6 h-6" />,
      unlocked: currentIntake > 0,
      progress: currentIntake > 0 ? 1 : 0,
      target: 1,
      coins: hasEliteBadges ? 225 : 75,
      isElite: hasEliteBadges,
    },
    {
      id: 'half-way',
      name: hasEliteBadges ? 'Platinum Progress' : 'Half Way There',
      description: 'Reach 50% of your daily goal',
      icon: hasEliteBadges ? <Crown className="w-6 h-6" /> : <Star className="w-6 h-6" />,
      unlocked: currentIntake >= dailyGoal * 0.5,
      progress: Math.min(currentIntake, dailyGoal * 0.5),
      target: dailyGoal * 0.5,
      coins: hasEliteBadges ? 375 : 150,
      isElite: hasEliteBadges,
    },
    {
      id: 'daily-goal',
      name: hasEliteBadges ? 'Elite Hydrator' : 'Daily Champion',
      description: 'Complete your daily hydration goal',
      icon: hasEliteBadges ? <Gem className="w-6 h-6" /> : <Trophy className="w-6 h-6" />,
      unlocked: currentIntake >= dailyGoal,
      progress: Math.min(currentIntake, dailyGoal),
      target: dailyGoal,
      coins: hasEliteBadges ? 750 : 300,
      isElite: hasEliteBadges,
    },
    {
      id: 'over-achiever',
      name: hasEliteBadges ? 'Legendary Hydrator' : 'Over Achiever',
      description: 'Drink 150% of your daily goal',
      icon: hasEliteBadges ? <Crown className="w-6 h-6" /> : <Trophy className="w-6 h-6" />,
      unlocked: currentIntake >= dailyGoal * 1.5,
      progress: Math.min(currentIntake, dailyGoal * 1.5),
      target: dailyGoal * 1.5,
      coins: hasEliteBadges ? 1125 : 450,
      isElite: hasEliteBadges,
    },
    {
      id: 'hydration-master',
      name: hasEliteBadges ? 'Diamond Master' : 'Hydration Master',
      description: 'Drink 200% of your daily goal',
      icon: hasEliteBadges ? <Diamond className="w-6 h-6" /> : <Star className="w-6 h-6" />,
      unlocked: currentIntake >= dailyGoal * 2,
      progress: Math.min(currentIntake, dailyGoal * 2),
      target: dailyGoal * 2,
      coins: hasEliteBadges ? 1500 : 600,
      isElite: hasEliteBadges,
    },
  ];

  useEffect(() => {
    const savedAchievements = localStorage.getItem('unlockedAchievements');
    if (savedAchievements) {
      setUnlockedAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  useEffect(() => {
    achievements.forEach(achievement => {
      if (achievement.unlocked && !unlockedAchievements.includes(achievement.id)) {
        setUnlockedAchievements(prev => {
          const newUnlocked = [...prev, achievement.id];
          localStorage.setItem('unlockedAchievements', JSON.stringify(newUnlocked));
          onAchievementUnlocked(achievement.coins);
          return newUnlocked;
        });
      }
    });
  }, [currentIntake, dailyGoal, achievements, unlockedAchievements, onAchievementUnlocked]);

  const getProgressColor = (achievement: Achievement) => {
    if (achievement.isElite) {
      return achievement.unlocked ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-gray-600 to-gray-700';
    }
    return achievement.unlocked ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const getBadgeVariant = (achievement: Achievement) => {
    if (achievement.isElite) {
      return achievement.unlocked ? 'default' : 'secondary';
    }
    return achievement.unlocked ? 'default' : 'secondary';
  };

  const getBadgeStyle = (achievement: Achievement) => {
    if (achievement.isElite && achievement.unlocked) {
      return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg';
    }
    return '';
  };

  return (
    <Card className={`p-8 border-0 shadow-2xl backdrop-blur-sm transition-all duration-700 rounded-3xl bg-white/5 backdrop-blur-sm text-white border border-white/10`}>
      <div className="flex items-center gap-3 mb-8">
        {hasEliteBadges ? (
          <Crown className="w-8 h-8 text-purple-400" />
        ) : (
          <Trophy className="w-8 h-8 text-yellow-500" />
        )}
        <h3 className="font-light text-3xl text-white">
          {hasEliteBadges ? 'Elite Achievements' : 'Achievements'}
        </h3>
        {hasEliteBadges && (
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1">
            Premium
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-6 rounded-2xl border transition-all duration-500 hover:scale-105 ${
              achievement.unlocked
                ? achievement.isElite
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-400/50 shadow-lg shadow-purple-500/25'
                  : 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-400/50 shadow-lg shadow-blue-500/25'
                : 'bg-white/5 border-gray-600/30'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  achievement.unlocked 
                    ? achievement.isElite
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300'
                      : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-300'
                    : 'bg-gray-600/20 text-gray-500'
                }`}>
                  {achievement.icon}
                </div>
                <div>
                  <h4 className={`font-light text-lg ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
              <Badge 
                variant={getBadgeVariant(achievement)} 
                className={`${getBadgeStyle(achievement)} font-light`}
              >
                +{achievement.coins}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-light">Progress</span>
                <span className={achievement.unlocked ? 'text-white font-light' : 'text-gray-400 font-light'}>
                  {Math.min(achievement.progress, achievement.target).toFixed(0)} / {achievement.target}
                </span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${getProgressColor(achievement)} ${
                    achievement.isElite && achievement.unlocked ? 'shadow-lg shadow-purple-500/50' : ''
                  }`}
                  style={{
                    width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {hasEliteBadges && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-400/30">
          <div className="flex items-center gap-3 mb-3">
            <Crown className="w-6 h-6 text-purple-400" />
            <h4 className="font-light text-lg text-purple-300">Elite Badge Benefits</h4>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm font-light">
            <li>• 15x higher coin rewards for achievements</li>
            <li>• Exclusive diamond and platinum badge designs</li>
            <li>• Special achievement names and descriptions</li>
            <li>• Premium visual effects and animations</li>
          </ul>
        </div>
      )}
    </Card>
  );
};

export default Achievements;
