
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Store, Coins, Palette, Sparkles, Crown, Star, Gem } from 'lucide-react';

interface AquaShopProps {
  aquaCoins: number;
  unlockedThemes: string[];
  currentTheme: string;
  onPurchase: (itemId: string, cost: number) => void;
  onClose: () => void;
  isDarkMode?: boolean;
}

const AquaShop = ({ aquaCoins, unlockedThemes, currentTheme, onPurchase, onClose, isDarkMode = false }: AquaShopProps) => {
  const shopItems = [
    {
      id: 'theme-ocean',
      name: 'Ocean Theme',
      description: 'Deep blue ocean vibes',
      icon: '🌊',
      cost: 50,
      type: 'theme',
      unlocked: unlockedThemes.includes('ocean'),
      active: currentTheme === 'ocean',
    },
    {
      id: 'theme-sunset',
      name: 'Sunset Theme',
      description: 'Warm orange & pink gradients',
      icon: '🌅',
      cost: 75,
      type: 'theme',
      unlocked: unlockedThemes.includes('sunset'),
      active: currentTheme === 'sunset',
    },
    {
      id: 'theme-forest',
      name: 'Forest Theme',
      description: 'Fresh green nature vibes',
      icon: '🌲',
      cost: 60,
      type: 'theme',
      unlocked: unlockedThemes.includes('forest'),
      active: currentTheme === 'forest',
    },
    {
      id: 'premium-badges',
      name: 'Premium Badges',
      description: 'Exclusive achievement badges',
      icon: '🏆',
      cost: 100,
      type: 'feature',
      unlocked: false,
      active: false,
    },
    {
      id: 'custom-reminders',
      name: 'Custom Reminders',
      description: 'Personalized hydration alerts',
      icon: '⏰',
      cost: 80,
      type: 'feature',
      unlocked: false,
      active: false,
    },
    {
      id: 'analytics-pro',
      name: 'Analytics Pro',
      description: 'Advanced hydration insights',
      icon: '📊',
      cost: 120,
      type: 'feature',
      unlocked: false,
      active: false,
    },
  ];

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (aquaCoins >= item.cost && !item.unlocked) {
      onPurchase(item.id, item.cost);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border-2 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-slate-800/95 backdrop-blur-md border-white/20 text-white' 
          : 'bg-white/95 backdrop-blur-md border-white/50'
      }`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'}`}>
                <Store className={`w-8 h-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <div>
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Aqua Shop</h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Unlock premium features with Aqua Coins</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${
                isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'
              }`}>
                <Coins className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <span className={`font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{aquaCoins}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className={isDarkMode ? 'text-gray-300 hover:bg-white/10' : ''}>
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Shop Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  item.unlocked || item.active
                    ? isDarkMode 
                      ? 'border-green-400/50 bg-green-600/10' 
                      : 'border-green-300 bg-green-50'
                    : isDarkMode
                      ? 'border-gray-600 bg-slate-700/50 hover:border-gray-500'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.type === 'theme' && (
                    <div className={`p-1 rounded-lg ${isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'}`}>
                      <Palette className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <span className={`font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {item.cost}
                    </span>
                  </div>
                  
                  {item.active ? (
                    <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                      <Star className="w-4 h-4" />
                      Active
                    </div>
                  ) : item.unlocked ? (
                    <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                      <Sparkles className="w-4 h-4" />
                      Owned
                    </div>
                  ) : (
                    <Button
                      onClick={() => handlePurchase(item)}
                      disabled={aquaCoins < item.cost}
                      size="sm"
                      className={`${
                        aquaCoins >= item.cost
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {aquaCoins >= item.cost ? 'Purchase' : 'Not enough coins'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div className={`mt-8 p-6 rounded-2xl border-2 border-dashed ${
            isDarkMode ? 'border-gray-600 bg-slate-700/30' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Gem className="w-5 h-5" />
                <span className="font-semibold">More Premium Features Coming Soon!</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Custom animations, exclusive achievements, and advanced analytics
              </p>
            </div>
          </div>

          {/* Earning Tips */}
          <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-blue-600/10' : 'bg-blue-50'}`}>
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              💡 How to Earn More Aqua Coins:
            </h4>
            <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Log water intake (+1 coin per 100ml)</li>
              <li>• Complete daily goals (+10 coins)</li>
              <li>• Unlock achievements (5-50 coins each)</li>
              <li>• Maintain hydration streaks (bonus coins)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AquaShop;
