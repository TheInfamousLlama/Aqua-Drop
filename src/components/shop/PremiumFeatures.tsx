
import React from 'react';
import { Crown, BarChart3, Coins, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  cost: number;
  unlocked: boolean;
}

interface PremiumFeaturesProps {
  features: Feature[];
  aquaCoins: number;
  unlockedFeatures: string[];
  onPurchase: (item: any) => void;
}

const PremiumFeatures = ({ features, aquaCoins, unlockedFeatures, onPurchase }: PremiumFeaturesProps) => {
  const handlePurchase = (item: any) => {
    if (aquaCoins >= item.cost && !item.unlocked) {
      onPurchase(item);
    }
  };

  return (
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
  );
};

export default PremiumFeatures;
