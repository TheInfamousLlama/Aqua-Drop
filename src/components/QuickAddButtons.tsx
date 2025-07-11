
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Droplets, Plus } from 'lucide-react';

interface QuickAddButtonsProps {
  onAddWater: (amount: number, type?: 'water' | 'tea' | 'coffee') => void;
  isDarkMode?: boolean;
}

const QuickAddButtons = ({ onAddWater, isDarkMode = false }: QuickAddButtonsProps) => {
  const [customAmount, setCustomAmount] = useState('');

  const quickAmounts = [
    { amount: 250, label: '250ml', icon: Droplets, color: 'bg-blue-500/60 hover:bg-blue-600/70', type: 'water' as const },
    { amount: 500, label: '500ml', icon: Droplets, color: 'bg-blue-600/60 hover:bg-blue-700/70', type: 'water' as const },
    { amount: 750, label: '750ml', icon: Droplets, color: 'bg-cyan-500/60 hover:bg-cyan-600/70', type: 'water' as const },
  ];

  const handleCustomWater = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      onAddWater(amount, 'water');
      setCustomAmount('');
    }
  };

  return (
    <Card className="p-6 border-0 shadow-lg transition-colors duration-500 bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-5 h-5 text-blue-400" />
        <h3 className="font-light text-white">Quick Add Water</h3>
      </div>

      {/* Water Quick Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {quickAmounts.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.amount}
              onClick={() => onAddWater(item.amount, item.type)}
              className={`${item.color} text-white h-16 flex flex-col gap-1 transition-all duration-200 hover:scale-105 shadow-md backdrop-blur-sm`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-light">{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Custom Water Input */}
      <div className="flex gap-3">
        <Input
          type="number"
          placeholder="Custom ml"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60"
        />
        <Button
          onClick={handleCustomWater}
          disabled={!customAmount || parseInt(customAmount) <= 0}
          className="bg-blue-600/60 hover:bg-blue-700/70 text-white px-6"
        >
          <Droplets className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
    </Card>
  );
};

export default QuickAddButtons;
