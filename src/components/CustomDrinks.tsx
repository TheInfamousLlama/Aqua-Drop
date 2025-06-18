import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Coffee, Leaf, Plus, X, Wine } from 'lucide-react';

interface CustomDrink {
  id: string;
  name: string;
  defaultAmount: number;
  multiplier: number;
  icon: React.ReactNode;
  color: string;
}

interface CustomDrinksProps {
  onAddWater: (amount: number, type: string, multiplier?: number) => void;
  customDrinks: CustomDrink[];
  onAddCustomDrink: (drink: Omit<CustomDrink, 'id'>) => void;
  onRemoveCustomDrink: (id: string) => void;
}

const CustomDrinks = ({ onAddWater, customDrinks, onAddCustomDrink, onRemoveCustomDrink }: CustomDrinksProps) => {
  const [newDrinkName, setNewDrinkName] = useState('');
  const [newDrinkAmount, setNewDrinkAmount] = useState('250');
  const [newDrinkMultiplier, setNewDrinkMultiplier] = useState('0.9');
  const [customAmounts, setCustomAmounts] = useState<{[key: string]: string}>({});

  const defaultDrinks: CustomDrink[] = [
    {
      id: 'tea',
      name: 'Tea',
      defaultAmount: 250,
      multiplier: 0.9,
      icon: <Leaf className="w-4 h-4" />,
      color: 'bg-green-500/80 hover:bg-green-600/80'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      defaultAmount: 250,
      multiplier: 0.8,
      icon: <Coffee className="w-4 h-4" />,
      color: 'bg-amber-600/80 hover:bg-amber-700/80'
    }
  ];

  const allDrinks = [...defaultDrinks, ...customDrinks];

  const handleAddCustomDrink = () => {
    if (newDrinkName.trim() && newDrinkAmount && newDrinkMultiplier) {
      const newDrink = {
        name: newDrinkName.trim(),
        defaultAmount: parseInt(newDrinkAmount),
        multiplier: parseFloat(newDrinkMultiplier),
        icon: <Wine className="w-4 h-4" />,
        color: 'bg-purple-500/80 hover:bg-purple-600/80'
      };
      onAddCustomDrink(newDrink);
      setNewDrinkName('');
      setNewDrinkAmount('250');
      setNewDrinkMultiplier('0.9');
    }
  };

  const handleCustomDrink = (drink: CustomDrink, amount: string) => {
    const numAmount = parseInt(amount);
    if (numAmount && numAmount > 0) {
      onAddWater(numAmount, drink.name.toLowerCase(), drink.multiplier);
      setCustomAmounts(prev => ({ ...prev, [drink.id]: '' }));
    }
  };

  return (
    <Card className="p-6 border-0 shadow-lg transition-colors duration-500 bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-blue-400" />
        <h3 className="font-light text-white text-lg">Custom Drinks</h3>
      </div>

      {/* Add New Drink */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <h4 className="font-light text-white mb-3">Add New Drink</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <Input
            placeholder="Drink name"
            value={newDrinkName}
            onChange={(e) => setNewDrinkName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
          <Input
            type="number"
            placeholder="Default ml"
            value={newDrinkAmount}
            onChange={(e) => setNewDrinkAmount(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
          <Input
            type="number"
            step="0.1"
            placeholder="Hydration %"
            value={newDrinkMultiplier}
            onChange={(e) => setNewDrinkMultiplier(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
        </div>
        <Button
          onClick={handleAddCustomDrink}
          disabled={!newDrinkName.trim() || !newDrinkAmount || !newDrinkMultiplier}
          className="bg-blue-600/80 hover:bg-blue-700/80 text-white w-full"
        >
          Add Drink
        </Button>
      </div>

      {/* Existing Drinks */}
      <div className="space-y-4">
        {allDrinks.map((drink) => (
          <div key={drink.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${drink.color.split(' ')[0]}/20`}>
                  {drink.icon}
                </div>
                <div>
                  <h4 className="font-light text-white">{drink.name}</h4>
                  <p className="text-xs text-white/60">{Math.round(drink.multiplier * 100)}% hydration</p>
                </div>
              </div>
              {!defaultDrinks.find(d => d.id === drink.id) && (
                <Button
                  onClick={() => onRemoveCustomDrink(drink.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:bg-red-400/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => onAddWater(drink.defaultAmount, drink.name.toLowerCase(), drink.multiplier)}
                className={`${drink.color} text-white flex-1 h-10 transition-all duration-200`}
              >
                {drink.icon}
                <span className="ml-2 font-light">{drink.defaultAmount}ml</span>
              </Button>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Custom ml"
                  value={customAmounts[drink.id] || ''}
                  onChange={(e) => setCustomAmounts(prev => ({ ...prev, [drink.id]: e.target.value }))}
                  className="w-24 bg-white/10 border-white/20 text-white placeholder-white/60"
                />
                <Button
                  onClick={() => handleCustomDrink(drink, customAmounts[drink.id] || '')}
                  disabled={!customAmounts[drink.id] || parseInt(customAmounts[drink.id]) <= 0}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CustomDrinks;
