
import React from 'react';
import { Store, Coins, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShopHeaderProps {
  aquaCoins: number;
  onClose: () => void;
}

const ShopHeader = ({ aquaCoins, onClose }: ShopHeaderProps) => {
  return (
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
  );
};

export default ShopHeader;
