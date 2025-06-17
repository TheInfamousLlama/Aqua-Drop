
import React from 'react';
import { Droplets } from 'lucide-react';

interface WaterProgressProps {
  current: number;
  goal: number;
  percentage: number;
  isGoalMet: boolean;
}

const WaterProgress = ({ current, goal, percentage, isGoalMet }: WaterProgressProps) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Background Circle */}
        <svg
          className="transform -rotate-90 w-64 h-64"
          width="256"
          height="256"
          viewBox="0 0 256 256"
        >
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="12"
            fill="transparent"
            className="drop-shadow-sm"
          />
          
          {/* Progress Circle */}
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="url(#waterGradient)"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-md"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`p-4 rounded-full mb-2 transition-all duration-500 ${
            isGoalMet ? 'bg-green-100 scale-110' : 'bg-blue-100'
          }`}>
            <Droplets className={`w-8 h-8 transition-colors duration-500 ${
              isGoalMet ? 'text-green-500' : 'text-blue-500'
            }`} />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {current}
              <span className="text-lg text-gray-500">ml</span>
            </div>
            <div className="text-sm text-gray-500">
              of {goal}ml
            </div>
            <div className={`text-lg font-semibold mt-1 transition-colors duration-500 ${
              isGoalMet ? 'text-green-500' : 'text-blue-500'
            }`}>
              {percentage.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Celebration Animation when goal is met */}
        {isGoalMet && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-8 animate-bounce delay-100">💧</div>
            <div className="absolute top-8 right-6 animate-bounce delay-200">🎉</div>
            <div className="absolute bottom-8 left-6 animate-bounce delay-300">✨</div>
            <div className="absolute bottom-4 right-8 animate-bounce delay-400">🌟</div>
          </div>
        )}
      </div>

      {/* Status Message */}
      <div className="text-center">
        {isGoalMet ? (
          <p className="text-green-600 font-semibold text-lg animate-pulse">
            🎉 Goal Achieved! Amazing work!
          </p>
        ) : (
          <p className="text-gray-600">
            {goal - current}ml to go • You're doing great!
          </p>
        )}
      </div>
    </div>
  );
};

export default WaterProgress;
