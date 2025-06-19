
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Coins, Star } from 'lucide-react';
import { Trees, Building } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  cost: number;
  imageUrl: string;
}

interface ThemeCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  themes: Theme[];
}

interface ThemeSectionProps {
  unlockedThemes: string[];
  currentTheme: string;
  aquaCoins: number;
  onPurchase: (item: any) => void;
  onThemeSwitch: (themeId: string) => void;
}

const ThemeSection = ({ unlockedThemes, currentTheme, aquaCoins, onPurchase, onThemeSwitch }: ThemeSectionProps) => {
  const [activeThemeCategory, setActiveThemeCategory] = useState('nature');

  const themeCategories: ThemeCategory[] = [
    {
      id: 'nature',
      name: 'Nature',
      icon: <Trees className="w-4 h-4" />,
      themes: [
        { 
          id: 'misty-forest', 
          name: 'Misty Forest', 
          description: 'Enchanted forest with morning mist', 
          cost: 45000,
          imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'alpine-lake', 
          name: 'Alpine Lake', 
          description: 'Crystal clear mountain lake reflection', 
          cost: 52500,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'autumn-leaves', 
          name: 'Autumn Leaves', 
          description: 'Golden autumn forest pathway', 
          cost: 48750,
          imageUrl: 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'lavender-fields', 
          name: 'Lavender Fields', 
          description: 'Purple lavender fields at sunset', 
          cost: 56250,
          imageUrl: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'bamboo-grove', 
          name: 'Bamboo Grove', 
          description: 'Serene bamboo forest with filtered light', 
          cost: 50625,
          imageUrl: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=3840&q=80'
        }
      ]
    },
    {
      id: 'cityscapes',
      name: 'Cityscapes',
      icon: <Building className="w-4 h-4" />,
      themes: [
        { 
          id: 'sydney-harbour', 
          name: 'Sydney Harbour', 
          description: 'Sydney Opera House at twilight', 
          cost: 63750,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'venice-canals', 
          name: 'Venice Canals', 
          description: 'Romantic Venice canals at golden hour', 
          cost: 67500,
          imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'london-bridge', 
          name: 'London Bridge', 
          description: 'Tower Bridge illuminated at night', 
          cost: 61875,
          imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'chicago-skyline', 
          name: 'Chicago Skyline', 
          description: 'Chicago downtown reflected in lake', 
          cost: 70313,
          imageUrl: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'san-francisco-golden', 
          name: 'Golden Gate', 
          description: 'Golden Gate Bridge in morning fog', 
          cost: 65625,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80'
        }
      ]
    }
  ];

  const handlePurchase = (theme: Theme) => {
    if (aquaCoins >= theme.cost && !unlockedThemes.includes(theme.id)) {
      onPurchase({ ...theme, id: `theme-${theme.id}`, unlocked: false });
    }
  };

  const handleThemeSwitch = (themeId: string) => {
    onThemeSwitch(themeId);
  };

  return (
    <div>
      <h3 className="text-2xl font-light text-white mb-6">Premium Themes</h3>
      
      <Tabs value={activeThemeCategory} onValueChange={setActiveThemeCategory} className="w-full">
        <TabsList className="grid grid-cols-2 w-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          {themeCategories.map((category) => (
            <TabsTrigger 
              key={category.id}
              value={category.id} 
              className="data-[state=active]:bg-white/30 text-white font-light text-sm px-6 py-4 flex items-center justify-center gap-3"
            >
              {category.icon}
            </TabsTrigger>
          ))}
        </TabsList>

        {themeCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                        <span className="font-light text-yellow-400">{theme.cost.toLocaleString()}</span>
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
                          onClick={() => handlePurchase(theme)}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ThemeSection;
