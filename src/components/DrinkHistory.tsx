
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Droplets, Coffee, Leaf } from 'lucide-react';

interface DrinkEntry {
  id: string;
  amount: number;
  type: 'water' | 'tea' | 'coffee';
  multiplier: number;
  timestamp: Date;
}

interface DrinkHistoryProps {
  drinks: DrinkEntry[];
  isDarkMode?: boolean;
}

const DrinkHistory = ({ drinks, isDarkMode = false }: DrinkHistoryProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'coffee': return Coffee;
      case 'tea': return Leaf;
      default: return Droplets;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'coffee': return 'text-amber-600';
      case 'tea': return 'text-green-600';
      default: return 'text-blue-600';
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
      <Card className={`p-6 border-0 shadow-lg transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-slate-800/80 backdrop-blur-sm' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Drinks</h3>
        </div>
        <div className="text-center py-8">
          <Droplets className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No drinks logged yet today</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Start hydrating to see your history!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 border-0 shadow-lg transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-slate-800/80 backdrop-blur-sm' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-500" />
        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Drinks</h3>
      </div>

      <div className="space-y-3">
        {drinks.map((drink) => {
          const Icon = getIcon(drink.type);
          const effectiveAmount = drink.amount * drink.multiplier;
          
          return (
            <div
              key={drink.id}
              className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700/50 hover:bg-slate-600/50' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getColor(drink.type)} bg-opacity-10`}>
                  <Icon className={`w-4 h-4 ${getColor(drink.type)}`} />
                </div>
                <div>
                  <p className={`font-medium capitalize ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {drink.type} • {drink.amount}ml
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
                <p className="font-semibold text-blue-600">+{Math.round(effectiveAmount)}ml</p>
              </div>
            </div>
          );
        })}
      </div>

      {drinks.length >= 5 && (
        <div className="mt-4 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Showing recent 5 drinks</p>
        </div>
      )}
    </Card>
  );
};

export default DrinkHistory;
