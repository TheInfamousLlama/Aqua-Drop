
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Droplets, Coffee, Leaf, Wine } from 'lucide-react';

interface DrinkEntry {
  id: string;
  amount: number;
  type: string;
  multiplier: number;
  timestamp: Date;
}

interface DrinkHistoryProps {
  drinks: DrinkEntry[];
  isDarkMode?: boolean;
}

const DrinkHistory = ({ drinks, isDarkMode = false }: DrinkHistoryProps) => {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'coffee': return Coffee;
      case 'tea': return Leaf;
      case 'water': return Droplets;
      default: return Wine;
    }
  };

  const getColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'coffee': return 'text-amber-400';
      case 'tea': return 'text-green-400';
      case 'water': return 'text-blue-400';
      default: return 'text-purple-400';
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (drinks.length === 0) {
    return (
      <Card className="p-6 border-0 shadow-lg transition-colors duration-500 bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="font-light text-white">Recent Drinks</h3>
        </div>
        <div className="text-center py-8">
          <Droplets className="w-12 h-12 mx-auto mb-3 text-white/30" />
          <p className="text-white/60 font-light">No drinks logged yet today</p>
          <p className="text-sm text-white/40 font-light">Start hydrating to see your history!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-0 shadow-lg transition-colors duration-500 bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-400" />
        <h3 className="font-light text-white">Recent Drinks</h3>
      </div>

      <div className="space-y-3">
        {drinks.map((drink) => {
          const Icon = getIcon(drink.type);
          const effectiveAmount = drink.amount * drink.multiplier;
          
          return (
            <div
              key={drink.id}
              className="flex items-center justify-between p-3 rounded-xl transition-colors bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white/10`}>
                  <Icon className={`w-4 h-4 ${getColor(drink.type)}`} />
                </div>
                <div>
                  <p className="font-light capitalize text-white">
                    {drink.type} • {drink.amount}ml
                  </p>
                  <p className="text-sm text-white/60 font-light">
                    {formatTime(drink.timestamp)}
                    {drink.multiplier !== 1 && (
                      <span className="ml-2">
                        (≈{Math.round(effectiveAmount)}ml hydration)
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-light text-blue-400">+{Math.round(effectiveAmount)}ml</p>
              </div>
            </div>
          );
        })}
      </div>

      {drinks.length >= 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-white/40 font-light">Showing recent 5 drinks</p>
        </div>
      )}
    </Card>
  );
};

export default DrinkHistory;
