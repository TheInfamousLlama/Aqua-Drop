import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Droplets, Coffee, Leaf, Plus } from 'lucide-react';

interface QuickAddButtonsProps {
  onAddWater: (amount: number, type?: 'water' | 'tea' | 'coffee') => void;
  isDarkMode?: boolean;
}

const QuickAddButtons = ({ onAddWater, isDarkMode = false }: QuickAddButtonsProps) => {
  const [customTeaAmount, setCustomTeaAmount] = useState('');
  const [customCoffeeAmount, setCustomCoffeeAmount] = useState('');

  const quickAmounts = [
    { amount: 250, label: '250ml', icon: Droplets, color: 'bg-blue-500 hover:bg-blue-600', type: 'water' as const },
    { amount: 500, label: '500ml', icon: Droplets, color: 'bg-blue-600 hover:bg-blue-700', type: 'water' as const },
    { amount: 750, label: '750ml', icon: Droplets, color: 'bg-cyan-500 hover:bg-cyan-600', type: 'water' as const },
  ];

  const handleCustomDrink = (type: 'tea' | 'coffee', amount: string) => {
    const numAmount = parseInt(amount);
    if (numAmount && numAmount > 0) {
      onAddWater(numAmount, type);
      if (type === 'tea') setCustomTeaAmount('');
      if (type === 'coffee') setCustomCoffeeAmount('');
    }
  };

  return (
    <Card className={`p-6 border-0 shadow-lg transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-slate-800/80 backdrop-blur-sm' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-5 h-5 text-blue-500" />
        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Quick Add</h3>
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
      <div className="space-y-3">
        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Other Drinks</p>
        
        {/* Tea Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onAddWater(250, 'tea')}
              className="bg-green-500 hover:bg-green-600 text-white h-12 flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Tea 250ml</span>
            </Button>
            <div className="flex gap-2 flex-1">
              <Input
                type="number"
                placeholder="Custom ml"
                value={customTeaAmount}
                onChange={(e) => setCustomTeaAmount(e.target.value)}
                className={`flex-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
              />
              <Button
                onClick={() => handleCustomDrink('tea', customTeaAmount)}
                disabled={!customTeaAmount || parseInt(customTeaAmount) <= 0}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Coffee Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onAddWater(250, 'coffee')}
              className="bg-amber-600 hover:bg-amber-700 text-white h-12 flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Coffee className="w-4 h-4" />
              <span className="text-sm font-medium">Coffee 250ml</span>
            </Button>
            <div className="flex gap-2 flex-1">
              <Input
                type="number"
                placeholder="Custom ml"
                value={customCoffeeAmount}
                onChange={(e) => setCustomCoffeeAmount(e.target.value)}
                className={`flex-1 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
              />
              <Button
                onClick={() => handleCustomDrink('coffee', customCoffeeAmount)}
                disabled={!customCoffeeAmount || parseInt(customCoffeeAmount) <= 0}
                className="bg-amber-700 hover:bg-amber-800 text-white"
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <p className={`text-xs mt-2 px-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          ☕ Coffee = 80% hydration • 🍃 Tea = 90% hydration
        </p>
      </div>
    </Card>
  );
};

export default QuickAddButtons;
