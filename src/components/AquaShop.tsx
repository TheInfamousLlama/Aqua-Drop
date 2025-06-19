import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Store, Coins, Palette, Crown, Star, Gem, BarChart3, Trees, Building, Heart, Camera, Waves, Mountain, Flower2, Sparkles, Cat, Dog, Fish } from 'lucide-react';

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
  const [activeThemeCategory, setActiveThemeCategory] = useState('nature');

  const themeCategories = [
    {
      id: 'nature',
      name: 'Nature',
      icon: <Trees className="w-4 h-4" />,
      themes: [
        { id: 'ocean', name: 'Ocean Depths', description: 'Crystal clear deep ocean waters', cost: 30000 },
        { id: 'sunset', name: 'Golden Sunset', description: 'Warm mountain sunset landscapes', cost: 46875 },
        { id: 'forest', name: 'Mystic Forest', description: 'Serene forest with morning mist', cost: 37500 },
        { id: 'aurora', name: 'Aurora Borealis', description: 'Mesmerizing northern lights', cost: 56250 },
        { id: 'desert', name: 'Desert Sunset', description: 'Golden sand dunes at sunset', cost: 41250 },
        { id: 'cherry-blossom', name: 'Cherry Blossom', description: 'Delicate pink sakura petals', cost: 46875 },
        { id: 'mountain-mist', name: 'Mountain Mist', description: 'Foggy mountain peaks at dawn', cost: 43125 },
        { id: 'tropical', name: 'Tropical Paradise', description: 'Crystal blue tropical waters', cost: 45000 }
      ]
    },
    {
      id: 'cityscapes',
      name: 'Cityscapes',
      icon: <Building className="w-4 h-4" />,
      themes: [
        { id: 'tokyo-skyline', name: 'Tokyo Nights', description: 'Neon-lit Tokyo skyline at night', cost: 52500 },
        { id: 'manhattan', name: 'Manhattan Lights', description: 'Glittering NYC skyscrapers at night', cost: 56250 },
        { id: 'dubai-sunset', name: 'Dubai Gold', description: 'Luxurious Dubai towers at golden hour', cost: 60000 },
        { id: 'london-fog', name: 'London Fog', description: 'Atmospheric London bridges at night', cost: 48750 },
        { id: 'singapore-lights', name: 'Singapore Marina', description: 'Modern Singapore waterfront at night', cost: 54375 },
        { id: 'paris-twilight', name: 'Paris Twilight', description: 'Eiffel Tower illuminated at night', cost: 50625 },
        { id: 'hong-kong-neon', name: 'Hong Kong Neon', description: 'Vibrant Hong Kong skyline at night', cost: 52500 },
        { id: 'shanghai-nights', name: 'Shanghai Nights', description: 'Futuristic Shanghai Bund at night', cost: 55000 }
      ]
    },
    {
      id: 'animals',
      name: 'Cute Animals',
      icon: <Heart className="w-4 h-4" />,
      themes: [
        { id: 'puppy-paradise', name: 'Puppy Paradise', description: 'Adorable golden retriever puppies playing', cost: 33750 },
        { id: 'kitten-cuddles', name: 'Kitten Cuddles', description: 'Fluffy kittens being cute together', cost: 31875 },
        { id: 'penguin-play', name: 'Penguin Play', description: 'Playful penguins sliding on ice', cost: 35625 },
        { id: 'baby-elephants', name: 'Baby Elephants', description: 'Gentle baby elephants with family', cost: 37500 },
        { id: 'koala-dreams', name: 'Koala Dreams', description: 'Sleepy koalas in eucalyptus trees', cost: 34375 },
        { id: 'panda-fun', name: 'Panda Fun', description: 'Giant pandas rolling and playing', cost: 36250 },
        { id: 'dolphin-dance', name: 'Dolphin Dance', description: 'Dolphins jumping in crystal waters', cost: 38750 }
      ]
    },
    {
      id: 'oceans',
      name: 'Ocean Depths',
      icon: <Waves className="w-4 h-4" />,
      themes: [
        { id: 'coral-reef', name: 'Coral Reef', description: 'Vibrant coral reef ecosystem', cost: 42500 },
        { id: 'deep-blue', name: 'Deep Blue', description: 'Mysterious deep ocean waters', cost: 45000 },
        { id: 'tropical-lagoon', name: 'Tropical Lagoon', description: 'Turquoise lagoon with coral', cost: 40000 },
        { id: 'whale-sanctuary', name: 'Whale Sanctuary', description: 'Majestic whales in blue depths', cost: 47500 },
        { id: 'underwater-garden', name: 'Underwater Garden', description: 'Colorful underwater flora', cost: 43750 },
        { id: 'pearl-caves', name: 'Pearl Caves', description: 'Luminous underwater cave systems', cost: 46250 },
        { id: 'mermaid-palace', name: 'Mermaid Palace', description: 'Ethereal underwater palace', cost: 50000 }
      ]
    },
    {
      id: 'mountains',
      name: 'Mountains',
      icon: <Mountain className="w-4 h-4" />,
      themes: [
        { id: 'alpine-peak', name: 'Alpine Peak', description: 'Snow-capped mountain peaks', cost: 41250 },
        { id: 'himalayan-sunrise', name: 'Himalayan Sunrise', description: 'Majestic Himalayan dawn', cost: 52500 },
        { id: 'rocky-mountains', name: 'Rocky Mountains', description: 'Rugged Rocky Mountain vista', cost: 43750 },
        { id: 'swiss-alps', name: 'Swiss Alps', description: 'Pristine Swiss Alpine scenery', cost: 48750 },
        { id: 'patagonia-peaks', name: 'Patagonia Peaks', description: 'Dramatic Patagonian landscape', cost: 46250 },
        { id: 'mountain-lake', name: 'Mountain Lake', description: 'Serene alpine lake reflection', cost: 45000 },
        { id: 'glacier-valley', name: 'Glacier Valley', description: 'Ancient glacier carved valley', cost: 47500 }
      ]
    },
    {
      id: 'gardens',
      name: 'Gardens',
      icon: <Flower2 className="w-4 h-4" />,
      themes: [
        { id: 'zen-garden', name: 'Zen Garden', description: 'Peaceful Japanese zen garden', cost: 37500 },
        { id: 'rose-garden', name: 'Rose Garden', description: 'Romantic blooming rose garden', cost: 35000 },
        { id: 'butterfly-garden', name: 'Butterfly Garden', description: 'Colorful garden with butterflies', cost: 38750 },
        { id: 'english-garden', name: 'English Garden', description: 'Classic English countryside garden', cost: 36250 },
        { id: 'tropical-garden', name: 'Tropical Garden', description: 'Lush tropical botanical garden', cost: 40000 },
        { id: 'tulip-fields', name: 'Tulip Fields', description: 'Endless Dutch tulip fields', cost: 42500 },
        { id: 'lavender-garden', name: 'Lavender Garden', description: 'Aromatic lavender field rows', cost: 39375 }
      ]
    },
    {
      id: 'space',
      name: 'Space & Stars',
      icon: <Sparkles className="w-4 h-4" />,
      themes: [
        { id: 'milky-way', name: 'Milky Way', description: 'Stunning Milky Way galaxy view', cost: 56250 },
        { id: 'nebula-dreams', name: 'Nebula Dreams', description: 'Colorful cosmic nebula clouds', cost: 60000 },
        { id: 'starry-night', name: 'Starry Night', description: 'Van Gogh inspired starry sky', cost: 52500 },
        { id: 'northern-lights', name: 'Northern Lights', description: 'Dancing aurora borealis', cost: 58750 },
        { id: 'cosmic-voyage', name: 'Cosmic Voyage', description: 'Deep space cosmic journey', cost: 62500 },
        { id: 'lunar-eclipse', name: 'Lunar Eclipse', description: 'Mystical lunar eclipse night', cost: 55000 },
        { id: 'galaxy-spiral', name: 'Galaxy Spiral', description: 'Magnificent spiral galaxy', cost: 61250 }
      ]
    },
    {
      id: 'cats',
      name: 'Cats',
      icon: <Cat className="w-4 h-4" />,
      themes: [
        { id: 'persian-cats', name: 'Persian Cats', description: 'Fluffy Persian cats lounging', cost: 33750 },
        { id: 'siamese-play', name: 'Siamese Play', description: 'Playful Siamese cats together', cost: 35000 },
        { id: 'maine-coon', name: 'Maine Coon', description: 'Majestic Maine Coon cats', cost: 36250 },
        { id: 'kitten-basket', name: 'Kitten Basket', description: 'Tiny kittens in wicker basket', cost: 32500 },
        { id: 'ragdoll-cats', name: 'Ragdoll Cats', description: 'Gentle Ragdoll cats relaxing', cost: 34375 },
        { id: 'bengal-cats', name: 'Bengal Cats', description: 'Wild-looking Bengal cats playing', cost: 37500 },
        { id: 'scottish-fold', name: 'Scottish Fold', description: 'Adorable Scottish Fold cats', cost: 35625 }
      ]
    },
    {
      id: 'dogs',
      name: 'Dogs',
      icon: <Dog className="w-4 h-4" />,
      themes: [
        { id: 'golden-retrievers', name: 'Golden Retrievers', description: 'Happy Golden Retriever family', cost: 34375 },
        { id: 'husky-pack', name: 'Husky Pack', description: 'Beautiful Siberian Huskies', cost: 36250 },
        { id: 'labrador-fun', name: 'Labrador Fun', description: 'Playful Labrador puppies', cost: 33125 },
        { id: 'beagle-adventure', name: 'Beagle Adventure', description: 'Curious Beagles exploring', cost: 35000 },
        { id: 'border-collie', name: 'Border Collie', description: 'Intelligent Border Collies', cost: 37500 },
        { id: 'corgi-parade', name: 'Corgi Parade', description: 'Adorable Corgi gathering', cost: 38750 },
        { id: 'german-shepherd', name: 'German Shepherd', description: 'Noble German Shepherds', cost: 36875 }
      ]
    },
    {
      id: 'aquatic',
      name: 'Aquatic Life',
      icon: <Fish className="w-4 h-4" />,
      themes: [
        { id: 'tropical-fish', name: 'Tropical Fish', description: 'Colorful tropical fish school', cost: 40000 },
        { id: 'seahorse-garden', name: 'Seahorse Garden', description: 'Graceful seahorses dancing', cost: 42500 },
        { id: 'jellyfish-bloom', name: 'Jellyfish Bloom', description: 'Luminous jellyfish floating', cost: 45000 },
        { id: 'sea-turtles', name: 'Sea Turtles', description: 'Ancient sea turtles gliding', cost: 43750 },
        { id: 'manta-rays', name: 'Manta Rays', description: 'Majestic manta rays soaring', cost: 46250 },
        { id: 'clownfish-reef', name: 'Clownfish Reef', description: 'Vibrant clownfish in anemone', cost: 41250 },
        { id: 'whale-sharks', name: 'Whale Sharks', description: 'Gentle whale shark encounter', cost: 47500 }
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
      <Card className="w-full max-w-7xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border transition-all duration-500 bg-white/5 backdrop-blur-xl border-white/20 text-white">
        <div className="p-8">
          {/* Header */}
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
            
            <Tabs value={activeThemeCategory} onValueChange={setActiveThemeCategory} className="w-full">
              <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                {themeCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id} 
                    className="data-[state=active]:bg-white/30 text-white font-light text-xs px-2 py-2 flex flex-col items-center gap-1"
                  >
                    {category.icon}
                    <span className="hidden lg:inline">{category.name}</span>
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
                </TabsContent>
              ))}
            </Tabs>
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
