
import React from 'react';
import { Card } from '@/components/ui/card';
import { Crown, BarChart3 } from 'lucide-react';
import ShopHeader from './shop/ShopHeader';
import PremiumFeatures from './shop/PremiumFeatures';
import ThemeSection from './shop/ThemeSection';
import ShopInfo from './shop/ShopInfo';

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
  const features = [
    {
      id: 'premium-badges',
      name: 'Elite Badges',
      description: 'Exclusive diamond achievement badges with 15x higher rewards',
      icon: <Crown className="w-6 h-6" />,
      cost: 50625,
      type: 'feature',
      unlocked: unlockedFeatures.includes('premium-badges'),
      active: false,
    },
    {
      id: 'analytics-pro',
      name: 'Hydration Analytics Pro',
      description: 'Advanced insights, performance metrics & detailed hydration analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      cost: 60750,
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border transition-all duration-500 bg-white/5 backdrop-blur-xl border-white/20 text-white">
        <div className="p-8">
          <ShopHeader aquaCoins={aquaCoins} onClose={onClose} />
          
          <PremiumFeatures 
            features={features}
            aquaCoins={aquaCoins}
            unlockedFeatures={unlockedFeatures}
            onPurchase={handlePurchase}
          />

          <ThemeSection
            unlockedThemes={unlockedThemes}
            currentTheme={currentTheme}
            aquaCoins={aquaCoins}
            onPurchase={handlePurchase}
            onThemeSwitch={onThemeSwitch}
          />

          <ShopInfo />
        </div>
      </Card>
    </div>
  );
};

export default AquaShop;
