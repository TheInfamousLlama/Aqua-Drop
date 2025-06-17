
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
}

const GoalSetting = ({ currentGoal, onGoalSet, onClose }: GoalSettingProps) => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [customGoal, setCustomGoal] = useState(currentGoal.toString());

  const calculateRecommendedGoal = () => {
    if (!weight) return 2000;
    
    const weightNum = parseFloat(weight);
    const baseWater = weightNum * 35; // 35ml per kg base
    
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Set Your Goal</h2>
                <p className="text-sm text-gray-500">Personalize your hydration target</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Recommended Goal Calculator */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Get Recommendation</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Activity Level
                </Label>
                <div className="grid grid-cols-3 gap-2">
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
                      className="flex flex-col gap-1 h-auto py-2"
                    >
                      <span className="text-lg">{level.icon}</span>
                      <span className="text-xs">{level.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {weight && (
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-blue-200">
                  <span className="text-sm font-medium text-gray-700">Recommended:</span>
                  <span className="text-lg font-bold text-blue-600">{recommendedGoal}ml</span>
                </div>
              )}
            </div>
          </div>

          {/* Preset Goals */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Quick Presets
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {presetGoals.map((preset) => (
                <Button
                  key={preset.amount}
                  variant="outline"
                  onClick={() => setCustomGoal(preset.amount.toString())}
                  className="flex flex-col gap-2 h-auto py-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <span className="font-bold text-lg">{preset.label}</span>
                  <span className="text-xs text-gray-500">{preset.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Goal Input */}
          <div className="mb-6">
            <Label htmlFor="customGoal" className="text-sm font-medium text-gray-700 mb-2 block">
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
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => onGoalSet(parseInt(customGoal) || 2000)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!customGoal || parseInt(customGoal) < 500}
            >
              Set Goal
            </Button>
          </div>

          {weight && (
            <Button
              variant="ghost"
              onClick={() => onGoalSet(recommendedGoal)}
              className="w-full mt-2 text-blue-600 hover:bg-blue-50"
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
