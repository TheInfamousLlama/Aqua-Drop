
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Coins, Star } from 'lucide-react';
import { Trees, Building, Heart, Waves, Mountain } from 'lucide-react';

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
          id: 'ocean', 
          name: 'Ocean Depths', 
          description: 'Crystal clear deep ocean waters', 
          cost: 67500,
          imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'sunset', 
          name: 'Golden Sunset', 
          description: 'Warm mountain sunset landscapes', 
          cost: 105000,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'forest', 
          name: 'Mystic Forest', 
          description: 'Serene forest with morning mist', 
          cost: 84375,
          imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'aurora', 
          name: 'Aurora Borealis', 
          description: 'Mesmerizing northern lights', 
          cost: 126563,
          imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'desert', 
          name: 'Desert Mirage', 
          description: 'Golden sand dunes at sunset', 
          cost: 92813,
          imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'cherry-blossom', 
          name: 'Cherry Blossom', 
          description: 'Delicate pink sakura petals', 
          cost: 105469,
          imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'tropical', 
          name: 'Tropical Paradise', 
          description: 'Crystal blue tropical waters', 
          cost: 101250,
          imageUrl: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'waterfall', 
          name: 'Hidden Waterfall', 
          description: 'Pristine cascading waterfall', 
          cost: 98750,
          imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=3840&q=80'
        }
      ]
    },
    {
      id: 'cityscapes',
      name: 'Cityscapes',
      icon: <Building className="w-4 h-4" />,
      themes: [
        { 
          id: 'tokyo-skyline', 
          name: 'Tokyo Nights', 
          description: 'Neon-lit Tokyo skyline at night', 
          cost: 118125,
          imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'manhattan', 
          name: 'Manhattan Lights', 
          description: 'Glittering NYC skyscrapers at night', 
          cost: 126563,
          imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'dubai-sunset', 
          name: 'Dubai Gold', 
          description: 'Luxurious Dubai towers at golden hour', 
          cost: 135000,
          imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'paris-twilight', 
          name: 'Paris Twilight', 
          description: 'Eiffel Tower illuminated at night', 
          cost: 113906,
          imageUrl: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'singapore-lights', 
          name: 'Singapore Marina', 
          description: 'Modern Singapore waterfront at night', 
          cost: 122344,
          imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'hong-kong-neon', 
          name: 'Hong Kong Neon', 
          description: 'Vibrant Hong Kong skyline at night', 
          cost: 118125,
          imageUrl: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'london-fog', 
          name: 'London Fog', 
          description: 'Atmospheric London bridges at night', 
          cost: 109688,
          imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=3840&q=80'
        }
      ]
    },
    {
      id: 'animals',
      name: 'Cute Animals',
      icon: <Heart className="w-4 h-4" />,
      themes: [
        { 
          id: 'golden-retriever', 
          name: 'Golden Paradise', 
          description: 'Adorable golden retriever puppies playing', 
          cost: 75938,
          imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'kitten-cuddles', 
          name: 'Kitten Cuddles', 
          description: 'Fluffy kittens being cute together', 
          cost: 71719,
          imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'penguin-play', 
          name: 'Penguin Play', 
          description: 'Playful penguins sliding on ice', 
          cost: 80156,
          imageUrl: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'baby-elephants', 
          name: 'Baby Elephants', 
          description: 'Gentle baby elephants with family', 
          cost: 84375,
          imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'koala-dreams', 
          name: 'Koala Dreams', 
          description: 'Sleepy koalas in eucalyptus trees', 
          cost: 77344,
          imageUrl: 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'panda-fun', 
          name: 'Panda Fun', 
          description: 'Giant pandas rolling and playing', 
          cost: 81563,
          imageUrl: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'dolphin-dance', 
          name: 'Dolphin Dance', 
          description: 'Dolphins jumping in crystal waters', 
          cost: 87188,
          imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'bunny-meadow', 
          name: 'Bunny Meadow', 
          description: 'Cute bunnies hopping in flower fields', 
          cost: 73125,
          imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=3840&q=80'
        }
      ]
    },
    {
      id: 'oceans',
      name: 'Ocean Depths',
      icon: <Waves className="w-4 h-4" />,
      themes: [
        { 
          id: 'coral-reef', 
          name: 'Coral Reef', 
          description: 'Vibrant coral reef ecosystem', 
          cost: 95625,
          imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'deep-blue', 
          name: 'Deep Blue', 
          description: 'Mysterious deep ocean waters', 
          cost: 101250,
          imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'tropical-lagoon', 
          name: 'Tropical Lagoon', 
          description: 'Turquoise lagoon with coral', 
          cost: 90000,
          imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'whale-sanctuary', 
          name: 'Whale Sanctuary', 
          description: 'Majestic whales in blue depths', 
          cost: 106875,
          imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'jellyfish-bloom', 
          name: 'Jellyfish Bloom', 
          description: 'Luminous jellyfish floating gracefully', 
          cost: 101250,
          imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'sea-turtles', 
          name: 'Sea Turtle Haven', 
          description: 'Ancient sea turtles gliding peacefully', 
          cost: 98438,
          imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'manta-rays', 
          name: 'Manta Ray Ballet', 
          description: 'Graceful manta rays soaring underwater', 
          cost: 104063,
          imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80'
        }
      ]
    },
    {
      id: 'mountains',
      name: 'Mountains',
      icon: <Mountain className="w-4 h-4" />,
      themes: [
        { 
          id: 'alpine-peak', 
          name: 'Alpine Peak', 
          description: 'Snow-capped mountain peaks', 
          cost: 92813,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'himalayan-sunrise', 
          name: 'Himalayan Sunrise', 
          description: 'Majestic Himalayan dawn', 
          cost: 118125,
          imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150baef493e?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'rocky-mountains', 
          name: 'Rocky Mountains', 
          description: 'Rugged Rocky Mountain vista', 
          cost: 98438,
          imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'swiss-alps', 
          name: 'Swiss Alps', 
          description: 'Pristine Swiss Alpine scenery', 
          cost: 109688,
          imageUrl: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'mountain-lake', 
          name: 'Mountain Lake', 
          description: 'Serene alpine lake reflection', 
          cost: 101250,
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'glacier-valley', 
          name: 'Glacier Valley', 
          description: 'Ancient glacier carved valley', 
          cost: 106875,
          imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150baef493e?auto=format&fit=crop&w=3840&q=80'
        },
        { 
          id: 'fjord-majesty', 
          name: 'Fjord Majesty', 
          description: 'Dramatic Norwegian fjord landscapes', 
          cost: 112500,
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
        <TabsList className="grid grid-cols-5 w-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          {themeCategories.map((category) => (
            <TabsTrigger 
              key={category.id}
              value={category.id} 
              className="data-[state=active]:bg-white/30 text-white font-light text-sm px-3 py-3 flex flex-col items-center gap-2"
            >
              {category.icon}
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {themeCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
