import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Droplets, Coffee, Leaf, Plus } from 'lucide-react';

interface QuickAddButtonsProps {
  onAddWater: (amount: number, type?: 'water' | 'tea' | 'coffee') => void;
}

const QuickAddButtons = ({ onAddWater }: QuickAddButtonsProps) => {
  const quickAmounts = [
    { amount: 250, label: '250ml', icon: Droplets, color: 'bg-blue-500 hover:bg-blue-600', type: 'water' as const },
    { amount: 500, label: '500ml', icon: Droplets, color: 'bg-blue-600 hover:bg-blue-700', type: 'water' as const },
    { amount: 750, label: '750ml', icon: Droplets, color: 'bg-cyan-500 hover:bg-cyan-600', type: 'water' as const },
  ];

  const drinkTypes = [
    { amount: 250, label: 'Tea', icon: Leaf, color: 'bg-green-500 hover:bg-green-600', type: 'tea' as const },
    { amount: 250, label: 'Coffee', icon: Coffee, color: 'bg-amber-600 hover:bg-amber-700', type: 'coffee' as const },
  ];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-800">Quick Add</h3>
      </div>

      {/* Water Quick Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {quickAmounts.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.amount}
              onClick={() => onAddWater(item.amount, item.type)}
              className={`${item.color} text-white h-16 flex flex-col gap-1 transition-all duration-200 hover:scale-105 shadow-md`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Other Drink Types */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600 font-medium">Other Drinks</p>
        <div className="grid grid-cols-2 gap-3">
          {drinkTypes.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={`${item.type}-${item.amount}`}
                onClick={() => onAddWater(item.amount, item.type)}
                className={`${item.color} text-white h-14 flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2 px-1">
          ☕ Coffee = 80% hydration • 🍃 Tea = 90% hydration
        </p>
      </div>
    </Card>
  );
};

export default QuickAddButtons;
