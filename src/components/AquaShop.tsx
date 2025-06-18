
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Store, Coins, Palette, Sparkles, Crown, Star, Gem, Trophy, Clock, BarChart3 } from 'lucide-react';

interface AquaShopProps {
  aquaCoins: number;
  unlockedThemes: string[];
  currentTheme: string;
  unlockedFeatures: string[];
  onPurchase: (itemId: string, cost: number) => void;
  onClose: () => void;
  isDarkMode?: boolean;
}

const AquaShop = ({ 
  aquaCoins, 
  unlockedThemes, 
  currentTheme, 
  unlockedFeatures = [], 
  onPurchase, 
  onClose, 
  isDarkMode = false 
}: AquaShopProps) => {
  const shopItems = [
    {
      id: 'theme-ocean',
      name: 'Ocean Depths',
      description: 'Immersive ocean photography backdrop',
      icon: <Palette className="w-6 h-6" />,
      cost: 50,
      type: 'theme',
      unlocked: unlockedThemes.includes('ocean'),
      active: currentTheme === 'ocean',
    },
    {
      id: 'theme-sunset',
      name: 'Golden Sunset',
      description: 'Warm sunset mountain landscapes',
      icon: <Palette className="w-6 h-6" />,
      cost: 75,
      type: 'theme',
      unlocked: unlockedThemes.includes('sunset'),
      active: currentTheme === 'sunset',
    },
    {
      id: 'theme-forest',
      name: 'Mystic Forest',
      description: 'Serene forest photography scenes',
      icon: <Palette className="w-6 h-6" />,
      cost: 60,
      type: 'theme',
      unlocked: unlockedThemes.includes('forest'),
      active: currentTheme === 'forest',
    },
    {
      id: 'premium-badges',
      name: 'Elite Badges',
      description: 'Exclusive diamond achievement badges',
      icon: <Trophy className="w-6 h-6" />,
      cost: 100,
      type: 'feature',
      unlocked: unlockedFeatures.includes('premium-badges'),
      active: false,
    },
    {
      id: 'custom-reminders',
      name: 'Smart Reminders',
      description: 'AI-powered personalized hydration alerts',
      icon: <Clock className="w-6 h-6" />,
      cost: 80,
      type: 'feature',
      unlocked: unlockedFeatures.includes('custom-reminders'),
      active: false,
    },
    {
      id: 'analytics-pro',
      name: 'Hydration Analytics',
      description: 'Advanced insights & weekly reports',
      icon: <BarChart3 className="w-6 h-6" />,
      cost: 120,
      type: 'feature',
      unlocked: unlockedFeatures.includes('analytics-pro'),
      active: false,
    },
  ];

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (aquaCoins >= item.cost && !item.unlocked) {
      onPurchase(item.id, item.cost);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border transition-all duration-500 ${
        isDarkMode 
          ? 'bg-slate-900/95 backdrop-blur-xl border-white/10 text-white' 
          : 'bg-white/95 backdrop-blur-xl border-white/20'
      }`}>
        <div className="p-8">
          {/* Luxury Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-3xl shadow-lg ${
                isDarkMode ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20' : 'bg-gradient-to-br from-yellow-100 to-yellow-200'
              }`}>
                <Store className={`w-10 h-10 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <div>
                <h2 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Premium Shop
                </h2>
                <p className={`text-lg mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Unlock exclusive features & stunning themes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className={`flex items-center gap-3 px-6 py-3 rounded-3xl shadow-lg ${
                isDarkMode ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20' : 'bg-gradient-to-r from-yellow-100 to-yellow-200'
              }`}>
                <Coins className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <span className={`font-bold text-xl ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {aquaCoins}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose} 
                className={`rounded-2xl p-3 ${isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className="w-7 h-7" />
              </Button>
            </div>
          </div>

          {/* Premium Shop Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className={`p-8 rounded-3xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  item.unlocked || item.active
                    ? isDarkMode 
                      ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10' 
                      : 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50'
                    : isDarkMode
                      ? 'border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/50 hover:border-slate-600'
                      : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${
                      item.type === 'theme' 
                        ? isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                        : isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                    }`}>
                      {typeof item.icon === 'string' ? (
                        <span className="text-2xl">{item.icon}</span>
                      ) : (
                        <div className={item.type === 'theme' 
                          ? isDarkMode ? 'text-purple-400' : 'text-purple-600'
                          : isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }>
                          {item.icon}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coins className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <span className={`font-bold text-lg ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {item.cost}
                    </span>
                  </div>
                  
                  {item.active ? (
                    <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                      <Star className="w-5 h-5" />
                      Active
                    </div>
                  ) : item.unlocked ? (
                    <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                      <Sparkles className="w-5 h-5" />
                      Owned
                    </div>
                  ) : (
                    <Button
                      onClick={() => handlePurchase(item)}
                      disabled={aquaCoins < item.cost}
                      size="sm"
                      className={`rounded-2xl px-6 py-2 font-semibold transition-all duration-300 ${
                        aquaCoins >= item.cost
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg'
                          : 'bg-gray-300 cursor-not-allowed text-gray-500'
                      }`}
                    >
                      {aquaCoins >= item.cost ? 'Purchase' : 'Insufficient coins'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className={`mt-10 p-8 rounded-3xl border-2 border-dashed ${
            isDarkMode ? 'border-gray-600 bg-slate-800/30' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="text-center">
              <div className={`inline-flex items-center gap-3 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Gem className="w-6 h-6" />
                <span className="font-bold text-lg">Exclusive Features Coming Soon</span>
              </div>
              <p className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Custom animations, weather integration, health app sync, and more premium experiences
              </p>
            </div>
          </div>

          {/* Earning Tips */}
          <div className={`mt-8 p-6 rounded-3xl ${
            isDarkMode ? 'bg-gradient-to-r from-blue-600/10 to-cyan-600/10' : 'bg-gradient-to-r from-blue-50 to-cyan-50'
          }`}>
            <h4 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              💰 How to Earn More Aqua Coins
            </h4>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Log water intake: +1 coin per 100ml</li>
              <li>• Complete daily goals: +10 bonus coins</li>
              <li>• Unlock achievements: 5-50 coins each</li>
              <li>• Maintain hydration streaks: bonus multipliers</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AquaShop;
