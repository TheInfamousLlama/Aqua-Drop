
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X, Target, User, Zap, Activity } from 'lucide-react';

interface GoalSettingProps {
  currentGoal: number;
  onGoalSet: (goal: number) => void;
  onClose: () => void;
  isDarkMode?: boolean;
}

const GoalSetting = ({ currentGoal, onGoalSet, onClose, isDarkMode = false }: GoalSettingProps) => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [customGoal, setCustomGoal] = useState(currentGoal.toString());

  const calculateRecommendedGoal = () => {
    if (!weight) return 2000;
    
    const weightNum = parseFloat(weight);
    const baseWater = weightNum * 35;
    
    const activityMultipliers = {
      low: 1,
      moderate: 1.2,
      high: 1.4
    };
    
    return Math.round(baseWater * activityMultipliers[activityLevel]);
  };

  const recommendedGoal = calculateRecommendedGoal();

  const presetGoals = [
    { amount: 1500, label: '1.5L', icon: '💧', description: 'Light hydration' },
    { amount: 2000, label: '2.0L', icon: '🌊', description: 'Standard goal' },
    { amount: 2500, label: '2.5L', icon: '🏊', description: 'Active lifestyle' },
    { amount: 3000, label: '3.0L', icon: '🏃', description: 'High performance' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border-2 transition-all duration-500 bg-white/5 backdrop-blur-xl border-white/20 text-white">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-400/20">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-white">Set Your Goal</h2>
                <p className="text-sm text-white/70 font-light">Personalize your hydration target</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white/70 hover:bg-white/10">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="mb-8 p-6 rounded-2xl bg-blue-600/10 border border-blue-400/20">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-blue-400" />
              <span className="font-light text-blue-300">Get Recommendation</span>
            </div>
            
            <div className="space-y-5">
              <div>
                <Label htmlFor="weight" className="text-sm font-light text-white/80">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder-white/50 font-light"
                />
              </div>

              <div>
                <Label className="text-sm font-light text-white/80 mb-3 block">
                  Activity Level
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'low', label: 'Low', icon: '🚶' },
                    { key: 'moderate', label: 'Moderate', icon: '🚴' },
                    { key: 'high', label: 'High', icon: '🏃' }
                  ].map((level) => (
                    <Button
                      key={level.key}
                      variant={activityLevel === level.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActivityLevel(level.key as any)}
                      className={`flex flex-col gap-2 h-auto py-3 font-light ${
                        activityLevel === level.key 
                          ? 'bg-blue-600/80 text-white shadow-lg border-blue-400/50' 
                          : 'border-white/20 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xl">{level.icon}</span>
                      <span className="text-xs font-light">{level.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {weight && (
                <div className="flex items-center justify-between p-4 rounded-xl border-2 bg-white/10 border-blue-400/30">
                  <span className="text-sm font-light text-white/80">Recommended:</span>
                  <span className="text-xl font-light text-blue-400">{recommendedGoal}ml</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <Label className="text-sm font-light text-white/80 mb-4 block">
              Quick Presets
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {presetGoals.map((preset) => (
                <Button
                  key={preset.amount}
                  variant="outline"
                  onClick={() => setCustomGoal(preset.amount.toString())}
                  className="flex flex-col gap-3 h-auto py-5 transition-all duration-300 border-white/20 text-white/70 hover:bg-blue-600/20 hover:border-blue-400/50 font-light"
                >
                  <span className="text-3xl">{preset.icon}</span>
                  <span className="font-light text-lg">{preset.label}</span>
                  <span className="text-xs text-white/50 font-light">{preset.description}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <Label htmlFor="customGoal" className="text-sm font-light text-white/80 mb-3 block">
              Custom Goal (ml)
            </Label>
            <Input
              id="customGoal"
              type="number"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="Enter custom amount"
              min="500"
              max="5000"
              className="text-lg bg-white/10 border-white/20 text-white placeholder-white/50 font-light"
            />
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 border-white/20 text-white/70 hover:bg-white/10 font-light"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onGoalSet(parseInt(customGoal) || 2000)}
              className="flex-1 bg-blue-600/80 hover:bg-blue-700/80 text-white shadow-lg font-light"
              disabled={!customGoal || parseInt(customGoal) < 500}
            >
              Set Goal
            </Button>
          </div>

          {weight && (
            <Button
              variant="ghost"
              onClick={() => onGoalSet(recommendedGoal)}
              className="w-full mt-4 font-light text-blue-400 hover:bg-blue-600/20"
            >
              Use Recommended ({recommendedGoal}ml)
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GoalSetting;
