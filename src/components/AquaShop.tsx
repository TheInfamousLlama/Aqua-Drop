
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Store, Coins, Palette, Crown, Star, Gem, BarChart3, Trees, Building, Heart } from 'lucide-react';

interface AquaShopProps {
  aquaCoins: number;
  unlockedThemes: string[];
  currentTheme: string;
  unlockedFeatures: string[];
  onPurchase: (itemId: string, cost: number) => void;
  onThemeSwitch: (themeId: string) => void;
  onClose: () => void;
  isDarkMode?: boolean;
}

const AquaShop = ({ 
  aquaCoins, 
  unlockedThemes, 
  currentTheme, 
  unlockedFeatures = [], 
  onPurchase, 
  onThemeSwitch,
  onClose, 
  isDarkMode = false 
}: AquaShopProps) => {
  const themeCategories = [
    {
      id: 'nature',
      name: 'Nature',
      icon: <Trees className="w-5 h-5" />,
      themes: [
        { id: 'ocean', name: 'Ocean Depths', description: 'Crystal clear deep ocean waters', cost: 1200 },
        { id: 'sunset', name: 'Golden Sunset', description: 'Warm mountain sunset landscapes', cost: 1875 },
        { id: 'forest', name: 'Mystic Forest', description: 'Serene forest with morning mist', cost: 1500 },
        { id: 'aurora', name: 'Aurora Borealis', description: 'Mesmerizing northern lights', cost: 2250 },
        { id: 'desert', name: 'Desert Sunset', description: 'Golden sand dunes at sunset', cost: 1650 },
        { id: 'cherry-blossom', name: 'Cherry Blossom', description: 'Delicate pink sakura petals', cost: 1875 },
        { id: 'mountain-mist', name: 'Mountain Mist', description: 'Foggy mountain peaks at dawn', cost: 1725 },
        { id: 'tropical', name: 'Tropical Paradise', description: 'Crystal blue tropical waters', cost: 1800 },
        { id: 'lavender-fields', name: 'Lavender Fields', description: 'Purple lavender in full bloom', cost: 1950 },
        { id: 'golden-wheat', name: 'Golden Wheat', description: 'Warm wheat fields swaying', cost: 1575 }
      ]
    },
    {
      id: 'cityscapes',
      name: 'Cityscapes',
      icon: <Building className="w-5 h-5" />,
      themes: [
        { id: 'tokyo-skyline', name: 'Tokyo Nights', description: 'Neon-lit Tokyo skyline', cost: 2100 },
        { id: 'manhattan', name: 'Manhattan Lights', description: 'Glittering NYC skyscrapers', cost: 2250 },
        { id: 'dubai-sunset', name: 'Dubai Gold', description: 'Luxurious Dubai at golden hour', cost: 2400 },
        { id: 'london-fog', name: 'London Fog', description: 'Atmospheric London bridges', cost: 1950 },
        { id: 'singapore-lights', name: 'Singapore Marina', description: 'Modern Singapore waterfront', cost: 2175 },
        { id: 'paris-twilight', name: 'Paris Twilight', description: 'Romantic Parisian evening', cost: 2025 }
      ]
    },
    {
      id: 'animals',
      name: 'Cute Animals',
      icon: <Heart className="w-5 h-5" />,
      themes: [
        { id: 'puppy-paradise', name: 'Puppy Paradise', description: 'Adorable puppies playing', cost: 1350 },
        { id: 'kitten-cuddles', name: 'Kitten Cuddles', description: 'Fluffy kittens being cute', cost: 1275 },
        { id: 'penguin-play', name: 'Penguin Play', description: 'Playful penguins sliding', cost: 1425 },
        { id: 'baby-elephants', name: 'Baby Elephants', description: 'Gentle baby elephants', cost: 1500 },
        { id: 'koala-dreams', name: 'Koala Dreams', description: 'Sleepy koalas in trees', cost: 1375 },
        { id: 'panda-fun', name: 'Panda Fun', description: 'Pandas rolling and playing', cost: 1450 }
      ]
    }
  ];

  const features = [
    {
      id: 'premium-badges',
      name: 'Elite Badges',
      description: 'Exclusive diamond achievement badges with 15x higher rewards',
      icon: <Crown className="w-6 h-6" />,
      cost: 2250,
      type: 'feature',
      unlocked: unlockedFeatures.includes('premium-badges'),
      active: false,
    },
    {
      id: 'analytics-pro',
      name: 'Hydration Analytics Pro',
      description: 'Advanced insights, performance metrics & detailed hydration analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      cost: 2700,
      type: 'feature',
      unlocked: unlockedFeatures.includes('analytics-pro'),
      active: false,
    },
  ];

  const handlePurchase = (item: any) => {
    if (aquaCoins >= item.cost && !item.unlocked) {
      onPurchase(item.id, item.cost);
    }
  };

  const handleThemeSwitch = (themeId: string) => {
    const themeName = themeId;
    onThemeSwitch(themeName);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border transition-all duration-500 bg-white/5 backdrop-blur-xl border-white/20 text-white">
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-3xl shadow-lg bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 border border-yellow-400/20">
                <Store className="w-10 h-10 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-4xl font-extralight tracking-tight text-white">
                  Premium Shop
                </h2>
                <p className="text-lg mt-1 text-white/70 font-light">
                  Unlock exclusive features & stunning themes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-6 py-3 rounded-3xl shadow-lg bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-400/20">
                <Coins className="w-6 h-6 text-yellow-400" />
                <span className="font-light text-xl text-yellow-400">
                  {aquaCoins}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose} 
                className="rounded-2xl p-3 text-white/70 hover:bg-white/10"
              >
                <X className="w-7 h-7" />
              </Button>
            </div>
          </div>

          {/* Premium Features Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-light text-white mb-6">Premium Features</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 rounded-3xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm ${
                    item.unlocked
                      ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10' 
                      : 'border-white/20 bg-gradient-to-br from-white/5 to-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-400/20">
                        <div className="text-blue-400">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-light text-xl text-white">
                          {item.name}
                        </h4>
                        <p className="text-sm mt-1 text-white/70 font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="font-light text-lg text-yellow-400">
                        {item.cost}
                      </span>
                    </div>
                    
                    {item.unlocked ? (
                      <div className="flex items-center gap-2 text-emerald-400 font-light">
                        <Gem className="w-5 h-5" />
                        Owned
                      </div>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={aquaCoins < item.cost}
                        size="sm"
                        className={`rounded-2xl px-6 py-2 font-light transition-all duration-300 ${
                          aquaCoins >= item.cost
                            ? 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-700/80 hover:to-cyan-700/80 text-white shadow-lg'
                            : 'bg-gray-600/50 cursor-not-allowed text-gray-400'
                        }`}
                      >
                        {aquaCoins >= item.cost ? 'Purchase' : 'Insufficient coins'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Themes Section */}
          <div>
            <h3 className="text-2xl font-light text-white mb-6">Premium Themes</h3>
            {themeCategories.map((category) => (
              <div key={category.id} className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-400/20">
                    <div className="text-purple-400">
                      {category.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-light text-purple-300">{category.name}</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.themes.map((theme) => {
                    const isUnlocked = unlockedThemes.includes(theme.id);
                    const isActive = currentTheme === theme.id;
                    
                    return (
                      <div
                        key={theme.id}
                        className={`p-4 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10'
                            : isUnlocked
                              ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:scale-105'
                              : 'border-white/20 bg-gradient-to-br from-white/5 to-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="mb-3">
                          <h5 className="font-light text-lg text-white">{theme.name}</h5>
                          <p className="text-xs text-white/60 font-light">{theme.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span className="font-light text-yellow-400">{theme.cost}</span>
                          </div>
                          
                          {isActive ? (
                            <div className="flex items-center gap-2 text-emerald-400 font-light text-sm">
                              <Star className="w-4 h-4" />
                              Active
                            </div>
                          ) : isUnlocked ? (
                            <Button
                              onClick={() => handleThemeSwitch(theme.id)}
                              size="sm"
                              className="rounded-xl px-4 py-1 text-xs font-light bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/80 hover:to-pink-700/80 text-white"
                            >
                              Activate
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handlePurchase({ ...theme, id: `theme-${theme.id}`, unlocked: false })}
                              disabled={aquaCoins < theme.cost}
                              size="sm"
                              className={`rounded-xl px-4 py-1 text-xs font-light ${
                                aquaCoins >= theme.cost
                                  ? 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-700/80 hover:to-cyan-700/80 text-white'
                                  : 'bg-gray-600/50 cursor-not-allowed text-gray-400'
                              }`}
                            >
                              Buy
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-400/20">
            <h4 className="font-light text-lg mb-3 text-blue-400">
              💰 How to Earn More Aqua Coins
            </h4>
            <ul className="space-y-2 text-white/70 font-light">
              <li>• Log water intake: +1 coin per 100ml</li>
              <li>• Complete daily goals: +10 bonus coins</li>
              <li>• Unlock achievements: 75-1500 coins each</li>
              <li>• Elite achievements: 15x higher rewards</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AquaShop;
