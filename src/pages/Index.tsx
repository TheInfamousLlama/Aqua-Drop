
import React, { useState, useEffect } from 'react';
import { Droplets, Plus, Target, Trophy, TrendingUp, RotateCcw, Sun, Moon, Coins, Store, BarChart3, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import WaterProgress from '@/components/WaterProgress';
import QuickAddButtons from '@/components/QuickAddButtons';
import CustomDrinks from '@/components/CustomDrinks';
import DrinkHistory from '@/components/DrinkHistory';
import GoalSetting from '@/components/GoalSetting';
import Achievements from '@/components/Achievements';
import AquaShop from '@/components/AquaShop';

interface DrinkEntry {
  id: string;
  amount: number;
  type: string;
  multiplier: number;
  timestamp: Date;
}

interface CustomDrink {
  id: string;
  name: string;
  defaultAmount: number;
  multiplier: number;
  icon: React.ReactNode;
  color: string;
}

const Index = () => {
  const [dailyGoal, setDailyGoal] = useState(2000); // ml
  const [currentIntake, setCurrentIntake] = useState(0);
  const [drinks, setDrinks] = useState<DrinkEntry[]>([]);
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [showAquaShop, setShowAquaShop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [aquaCoins, setAquaCoins] = useState(125);
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>(['default']);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [customDrinks, setCustomDrinks] = useState<CustomDrink[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [goalAchievementRate, setGoalAchievementRate] = useState(0);
  const [peakHours, setPeakHours] = useState('Not enough data');
  const [bestStreak, setBestStreak] = useState(0);
  const [totalIntake, setTotalIntake] = useState(0);
  const [daysTracked, setDaysTracked] = useState(1);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoal = localStorage.getItem('waterGoal');
    const savedIntake = localStorage.getItem('todayIntake');
    const savedDrinks = localStorage.getItem('todayDrinks');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedAquaCoins = localStorage.getItem('aquaCoins');
    const savedUnlockedThemes = localStorage.getItem('unlockedThemes');
    const savedCurrentTheme = localStorage.getItem('currentTheme');
    const savedUnlockedFeatures = localStorage.getItem('unlockedFeatures');
    const savedCustomDrinks = localStorage.getItem('customDrinks');
    const savedTotalIntake = localStorage.getItem('totalIntake');
    const savedDaysTracked = localStorage.getItem('daysTracked');

    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedIntake) setCurrentIntake(parseInt(savedIntake));
    if (savedDrinks) setDrinks(JSON.parse(savedDrinks));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    if (savedAquaCoins) setAquaCoins(parseInt(savedAquaCoins));
    if (savedUnlockedThemes) setUnlockedThemes(JSON.parse(savedUnlockedThemes));
    if (savedCurrentTheme) setCurrentTheme(savedCurrentTheme);
    if (savedUnlockedFeatures) setUnlockedFeatures(JSON.parse(savedUnlockedFeatures));
    if (savedCustomDrinks) setCustomDrinks(JSON.parse(savedCustomDrinks));
    if (savedTotalIntake) setTotalIntake(parseInt(savedTotalIntake));
    if (savedDaysTracked) setDaysTracked(parseInt(savedDaysTracked));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waterGoal', dailyGoal.toString());
    localStorage.setItem('todayIntake', currentIntake.toString());
    localStorage.setItem('todayDrinks', JSON.stringify(drinks));
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('aquaCoins', aquaCoins.toString());
    localStorage.setItem('unlockedThemes', JSON.stringify(unlockedThemes));
    localStorage.setItem('currentTheme', currentTheme);
    localStorage.setItem('unlockedFeatures', JSON.stringify(unlockedFeatures));
    localStorage.setItem('customDrinks', JSON.stringify(customDrinks));
    localStorage.setItem('totalIntake', totalIntake.toString());
    localStorage.setItem('daysTracked', daysTracked.toString());
  }, [dailyGoal, currentIntake, drinks, isDarkMode, aquaCoins, unlockedThemes, currentTheme, unlockedFeatures, customDrinks, totalIntake, daysTracked]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Update analytics based on actual data
  useEffect(() => {
    if (drinks.length > 0) {
      const dailyIntake = drinks.reduce((sum, drink) => sum + (drink.amount * drink.multiplier), 0);
      setTotalIntake(prev => prev + dailyIntake);
      
      // Calculate weekly average based on total intake and days tracked
      setWeeklyAverage(Math.round(totalIntake / daysTracked));
      
      // Calculate goal achievement rate
      const goalsAchieved = currentIntake >= dailyGoal ? 1 : 0;
      setGoalAchievementRate(Math.round((goalsAchieved / daysTracked) * 100));
      
      // Calculate peak hours based on drink timestamps
      const hourCounts = drinks.reduce((acc, drink) => {
        const hour = new Date(drink.timestamp).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {} as {[hour: number]: number});
      
      const peakHour = Object.entries(hourCounts).reduce((a, b) => 
        hourCounts[parseInt(a[0])] > hourCounts[parseInt(b[0])] ? a : b
      )?.[0];
      
      if (peakHour) {
        const hour = parseInt(peakHour);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        setPeakHours(`${displayHour}:00 ${period}`);
      }
    }
  }, [drinks, currentIntake, dailyGoal, totalIntake, daysTracked]);

  const addWater = (amount: number, type: string = 'water', multiplier: number = 1) => {
    const effectiveAmount = amount * multiplier;
    
    const newDrink: DrinkEntry = {
      id: Date.now().toString(),
      amount,
      type,
      multiplier,
      timestamp: new Date()
    };

    setDrinks(prev => [newDrink, ...prev]);
    setCurrentIntake(prev => {
      const newIntake = prev + effectiveAmount;
      
      if (prev < dailyGoal && newIntake >= dailyGoal) {
        const bonusCoins = 10;
        setAquaCoins(coins => coins + bonusCoins);
        toast({
          title: "🎉 Daily Goal Achieved!",
          description: `Amazing work! You've earned ${bonusCoins} Aqua Coins!`,
          duration: 5000,
        });
      }
      
      return newIntake;
    });

    const coinsEarned = Math.floor(amount / 100);
    if (coinsEarned > 0) {
      setAquaCoins(coins => coins + coinsEarned);
    }

    toast({
      title: `+${amount}ml ${type} logged`,
      description: `Great job staying hydrated! ${coinsEarned > 0 ? `+${coinsEarned} Aqua Coins` : ''}`,
      duration: 2000,
    });
  };

  const resetHydration = () => {
    setCurrentIntake(0);
    setDrinks([]);
    setDaysTracked(prev => prev + 1);
    toast({
      title: "Hydration Reset",
      description: "Your daily progress has been reset!",
      duration: 3000,
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: `${!isDarkMode ? 'Dark' : 'Light'} Mode Enabled`,
      description: `Switched to ${!isDarkMode ? 'dark' : 'light'} theme`,
      duration: 2000,
    });
  };

  const awardAchievementCoins = (coins: number) => {
    setAquaCoins(prev => prev + coins);
    toast({
      title: "🎉 Achievement Unlocked!",
      description: `You've earned ${coins} Aqua Coins!`,
      duration: 3000,
    });
  };

  const addCustomDrink = (drink: Omit<CustomDrink, 'id'>) => {
    const newDrink = {
      ...drink,
      id: Date.now().toString()
    };
    setCustomDrinks(prev => [...prev, newDrink]);
  };

  const removeCustomDrink = (id: string) => {
    setCustomDrinks(prev => prev.filter(drink => drink.id !== id));
  };

  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const isGoalMet = currentIntake >= dailyGoal;

  const getThemeStyles = () => {
    const baseClasses = "min-h-screen transition-all duration-1000 relative";
    
    switch (currentTheme) {
      case 'ocean':
        return `${baseClasses} bg-gradient-to-br from-blue-900/30 via-cyan-800/30 to-blue-900/30`;
      case 'sunset':
        return `${baseClasses} bg-gradient-to-br from-orange-800/30 via-pink-700/30 to-purple-800/30`;
      case 'forest':
        return `${baseClasses} bg-gradient-to-br from-green-900/30 via-emerald-800/30 to-teal-900/30`;
      case 'night':
        return `${baseClasses} bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-black/40`;
      case 'aurora':
        return `${baseClasses} bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40`;
      case 'desert':
        return `${baseClasses} bg-gradient-to-br from-yellow-800/30 via-orange-700/30 to-red-800/30`;
      case 'cherry-blossom':
        return `${baseClasses} bg-gradient-to-br from-pink-800/30 via-rose-700/30 to-pink-900/30`;
      case 'mountain-mist':
        return `${baseClasses} bg-gradient-to-br from-slate-800/30 via-gray-700/30 to-blue-800/30`;
      case 'tropical':
        return `${baseClasses} bg-gradient-to-br from-teal-800/30 via-cyan-700/30 to-blue-800/30`;
      case 'lavender-fields':
        return `${baseClasses} bg-gradient-to-br from-purple-800/30 via-violet-700/30 to-indigo-800/30`;
      case 'golden-wheat':
        return `${baseClasses} bg-gradient-to-br from-amber-800/30 via-yellow-700/30 to-orange-800/30`;
      case 'tokyo-skyline':
        return `${baseClasses} bg-gradient-to-br from-purple-900/30 via-pink-800/30 to-blue-900/30`;
      case 'manhattan':
        return `${baseClasses} bg-gradient-to-br from-gray-800/30 via-slate-700/30 to-blue-800/30`;
      case 'dubai-sunset':
        return `${baseClasses} bg-gradient-to-br from-orange-800/30 via-red-700/30 to-purple-800/30`;
      case 'london-fog':
        return `${baseClasses} bg-gradient-to-br from-gray-700/30 via-slate-600/30 to-blue-700/30`;
      case 'singapore-lights':
        return `${baseClasses} bg-gradient-to-br from-blue-800/30 via-cyan-700/30 to-teal-800/30`;
      case 'puppy-paradise':
        return `${baseClasses} bg-gradient-to-br from-yellow-700/30 via-orange-600/30 to-red-700/30`;
      case 'kitten-cuddles':
        return `${baseClasses} bg-gradient-to-br from-pink-700/30 via-rose-600/30 to-purple-700/30`;
      case 'penguin-play':
        return `${baseClasses} bg-gradient-to-br from-blue-800/30 via-cyan-700/30 to-white/20`;
      case 'baby-elephants':
        return `${baseClasses} bg-gradient-to-br from-gray-700/30 via-slate-600/30 to-brown-700/30`;
      case 'koala-dreams':
        return `${baseClasses} bg-gradient-to-br from-green-700/30 via-teal-600/30 to-gray-700/30`;
      default:
        return `${baseClasses} ${isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
        }`;
    }
  };

  const getThemeBackgroundImage = () => {
    switch (currentTheme) {
      // Nature themes
      case 'ocean':
        return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=3840&q=80';
      case 'sunset':
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80';
      case 'forest':
        return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=3840&q=80';
      case 'aurora':
        return 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=3840&q=80';
      case 'desert':
        return 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=3840&q=80';
      case 'cherry-blossom':
        return 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=3840&q=80';
      case 'mountain-mist':
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80';
      case 'tropical':
        return 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=3840&q=80';
      
      // Cityscape themes (night lights, no people)
      case 'tokyo-skyline':
        return 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=3840&q=80';
      case 'manhattan':
        return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=3840&q=80';
      case 'dubai-sunset':
        return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3840&q=80';
      case 'london-fog':
        return 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=3840&q=80';
      case 'singapore-lights':
        return 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=3840&q=80';
      case 'paris-twilight':
        return 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=3840&q=80';
      case 'hong-kong-neon':
        return 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&w=3840&q=80';
      case 'shanghai-nights':
        return 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=3840&q=80';
      
      // Animal themes (cute animals, no people)
      case 'puppy-paradise':
        return 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=3840&q=80';
      case 'kitten-cuddles':
        return 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=3840&q=80';
      case 'penguin-play':
        return 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=3840&q=80';
      case 'baby-elephants':
        return 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=3840&q=80';
      case 'koala-dreams':
        return 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?auto=format&fit=crop&w=3840&q=80';
      case 'panda-fun':
        return 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=3840&q=80';
      case 'dolphin-dance':
        return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=3840&q=80';
      
      // Ocean themes
      case 'coral-reef':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      case 'deep-blue':
        return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=3840&q=80';
      case 'tropical-lagoon':
        return 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=3840&q=80';
      case 'whale-sanctuary':
        return 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=3840&q=80';
      case 'underwater-garden':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      case 'pearl-caves':
        return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=3840&q=80';
      case 'mermaid-palace':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      
      // Mountain themes
      case 'alpine-peak':
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80';
      case 'himalayan-sunrise':
        return 'https://images.unsplash.com/photo-1464822759844-d150baef493e?auto=format&fit=crop&w=3840&q=80';
      case 'rocky-mountains':
        return 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=3840&q=80';
      case 'swiss-alps':
        return 'https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&w=3840&q=80';
      case 'patagonia-peaks':
        return 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=3840&q=80';
      case 'mountain-lake':
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80';
      case 'glacier-valley':
        return 'https://images.unsplash.com/photo-1464822759844-d150baef493e?auto=format&fit=crop&w=3840&q=80';
      
      // Garden themes
      case 'zen-garden':
        return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=3840&q=80';
      case 'rose-garden':
        return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=3840&q=80';
      case 'butterfly-garden':
        return 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=3840&q=80';
      case 'english-garden':
        return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=3840&q=80';
      case 'tropical-garden':
        return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=3840&q=80';
      case 'tulip-fields':
        return 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=3840&q=80';
      case 'lavender-garden':
        return 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=3840&q=80';
      
      // Space themes
      case 'milky-way':
        return 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=3840&q=80';
      case 'nebula-dreams':
        return 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=3840&q=80';
      case 'starry-night':
        return 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=3840&q=80';
      case 'northern-lights':
        return 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=3840&q=80';
      case 'cosmic-voyage':
        return 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=3840&q=80';
      case 'lunar-eclipse':
        return 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=3840&q=80';
      case 'galaxy-spiral':
        return 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=3840&q=80';
      
      // Cat themes
      case 'persian-cats':
        return 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=3840&q=80';
      case 'siamese-play':
        return 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=3840&q=80';
      case 'maine-coon':
        return 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=3840&q=80';
      case 'kitten-basket':
        return 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=3840&q=80';
      case 'ragdoll-cats':
        return 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=3840&q=80';
      case 'bengal-cats':
        return 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=3840&q=80';
      case 'scottish-fold':
        return 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=3840&q=80';
      
      // Dog themes
      case 'golden-retrievers':
        return 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=3840&q=80';
      case 'husky-pack':
        return 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=3840&q=80';
      case 'labrador-fun':
        return 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=3840&q=80';
      case 'beagle-adventure':
        return 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=3840&q=80';
      case 'border-collie':
        return 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=3840&q=80';
      case 'corgi-parade':
        return 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=3840&q=80';
      case 'german-shepherd':
        return 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=3840&q=80';
      
      // Aquatic themes
      case 'tropical-fish':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      case 'seahorse-garden':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      case 'jellyfish-bloom':
        return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=3840&q=80';
      case 'sea-turtles':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      case 'manta-rays':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      case 'clownfish-reef':
        return 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=3840&q=80';
      case 'whale-sharks':
        return 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=3840&q=80';
      
      default:
        return null;
    }
  };

  const getTextColor = () => {
    return 'text-white';
  };

  const handleThemeSwitch = (themeName: string) => {
    setCurrentTheme(themeName);
  };

  const hasEliteBadges = unlockedFeatures.includes('premium-badges');
  const hasAnalytics = unlockedFeatures.includes('analytics-pro');

  // Dynamic tab calculation
  const availableTabs = ['overview', 'achievements', 'drinks'];
  if (hasAnalytics) availableTabs.push('analytics');
  if (hasEliteBadges) availableTabs.push('elite');

  const tabGridCols = availableTabs.length === 3 ? 'grid-cols-3' : 
                     availableTabs.length === 4 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className={getThemeStyles()}>
      {/* Background Image Overlay */}
      {getThemeBackgroundImage() && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${getThemeBackgroundImage()})`,
            filter: isDarkMode ? 'brightness(0.6) contrast(1.1)' : 'brightness(0.8) contrast(1.1)'
          }}
        />
      )}
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Simple Header Box */}
        <div className={`${getTextColor()} p-8 rounded-b-[2rem] shadow-xl backdrop-blur-sm transition-all duration-1000 border-b bg-black/25 backdrop-blur-sm border-white/20`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                <Droplets className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-5xl font-extralight bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent tracking-wide">
                  Aqua Drop
                </h1>
                <p className="text-blue-100 font-light text-lg">Your luxury hydration companion</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl p-3"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4"
                onClick={() => setShowAquaShop(true)}
              >
                <Store className="w-6 h-6 mr-2" />
                <span className="font-light">Shop</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4"
                onClick={() => setShowGoalSetting(true)}
              >
                <Target className="w-6 h-6 mr-2" />
                <span className="font-light">Goal</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-xl px-4"
                onClick={resetHydration}
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                <span className="font-light">Reset</span>
              </Button>
            </div>
          </div>

          {/* Luxury Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <Trophy className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="font-light text-2xl text-white">{daysTracked}</p>
                <p className="text-blue-100 text-sm font-light">Days Tracked</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <Coins className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="font-light text-2xl text-white">{aquaCoins}</p>
                <p className="text-blue-100 text-sm font-light">Aqua Coins</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <TrendingUp className="w-8 h-8 text-green-300" />
              <div>
                <p className="font-light text-2xl text-white">{progressPercentage.toFixed(0)}%</p>
                <p className="text-blue-100 text-sm font-light">Complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${tabGridCols} bg-white/10 backdrop-blur-sm border border-white/20`}>
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/30 text-white font-light">Overview</TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-white/30 text-white font-light">Achievements</TabsTrigger>
              <TabsTrigger value="drinks" className="data-[state=active]:bg-white/30 text-white font-light">Custom Drinks</TabsTrigger>
              {hasAnalytics && (
                <TabsTrigger value="analytics" className="data-[state=active]:bg-white/30 text-white font-light">Analytics</TabsTrigger>
              )}
              {hasEliteBadges && (
                <TabsTrigger value="elite" className="data-[state=active]:bg-white/30 text-white font-light">Elite</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-10">
              {/* Water Progress Circle */}
              <WaterProgress
                current={currentIntake}
                goal={dailyGoal}
                percentage={progressPercentage}
                isGoalMet={isGoalMet}
                isDarkMode={isDarkMode}
              />

              {/* Quick Add Buttons */}
              <QuickAddButtons onAddWater={addWater} isDarkMode={isDarkMode} />

              {/* Today's Progress Stats */}
              <Card className="p-8 border-0 shadow-2xl backdrop-blur-sm transition-all duration-700 rounded-3xl bg-white/5 backdrop-blur-sm text-white border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-7 h-7 text-blue-400" />
                  <h3 className="font-light text-2xl text-white">Today's Progress</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-white/70 font-light">Current Intake</span>
                    <span className="font-light text-blue-400">{currentIntake}ml</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-white/70 font-light">Daily Goal</span>
                    <span className="font-light text-white">{dailyGoal}ml</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-white/70 font-light">Remaining</span>
                    <span className="font-light text-orange-400">
                      {Math.max(0, dailyGoal - currentIntake)}ml
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-4 rounded-full" />
                  <p className="text-sm text-center font-light text-white/60">
                    {progressPercentage.toFixed(0)}% complete
                  </p>
                </div>
              </Card>

              {/* Recent Drinks History */}
              <DrinkHistory drinks={drinks.slice(0, 5)} isDarkMode={true} />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-10">
              <Achievements 
                currentIntake={currentIntake} 
                dailyGoal={dailyGoal} 
                isDarkMode={true}
                onAchievementUnlocked={awardAchievementCoins}
                aquaCoins={aquaCoins}
                hasEliteBadges={false}
              />
            </TabsContent>

            <TabsContent value="drinks" className="space-y-10">
              <CustomDrinks
                onAddWater={addWater}
                customDrinks={customDrinks}
                onAddCustomDrink={addCustomDrink}
                onRemoveCustomDrink={removeCustomDrink}
              />
            </TabsContent>

            {hasAnalytics && (
              <TabsContent value="analytics" className="space-y-10">
                <Card className="p-8 border-0 shadow-2xl backdrop-blur-sm transition-all duration-700 rounded-3xl bg-white/5 backdrop-blur-sm text-white border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-7 h-7 text-blue-400" />
                    <h3 className="font-light text-2xl text-white">Hydration Analytics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-light text-lg mb-4 text-blue-300">Weekly Average</h4>
                      <p className="text-3xl font-light text-white">{weeklyAverage}ml</p>
                      <p className="text-white/60 text-sm mt-2 font-light">Based on your daily intake patterns</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-light text-lg mb-4 text-green-300">Goal Achievement Rate</h4>
                      <p className="text-3xl font-light text-white">{goalAchievementRate}%</p>
                      <p className="text-white/60 text-sm mt-2 font-light">Days you've reached your goal</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-light text-lg mb-4 text-purple-300">Peak Hours</h4>
                      <p className="text-3xl font-light text-white">{peakHours}</p>
                      <p className="text-white/60 text-sm mt-2 font-light">When you hydrate the most</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-light text-lg mb-4 text-cyan-300">Total Intake</h4>
                      <p className="text-3xl font-light text-white">{totalIntake}ml</p>
                      <p className="text-white/60 text-sm mt-2 font-light">Lifetime hydration tracked</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-light text-lg mb-4 text-pink-300">Today's Performance</h4>
                      <p className="text-3xl font-light text-white">{progressPercentage.toFixed(0)}%</p>
                      <p className="text-white/60 text-sm mt-2 font-light">Progress towards daily goal</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-light text-lg mb-4 text-orange-300">Days Tracked</h4>
                      <p className="text-3xl font-light text-white">{daysTracked}</p>
                      <p className="text-white/60 text-sm mt-2 font-light">Total days using Aqua Drop</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            )}

            {hasEliteBadges && (
              <TabsContent value="elite" className="space-y-10">
                <Achievements 
                  currentIntake={currentIntake} 
                  dailyGoal={dailyGoal} 
                  isDarkMode={true}
                  onAchievementUnlocked={awardAchievementCoins}
                  aquaCoins={aquaCoins}
                  hasEliteBadges={true}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Goal Setting Modal */}
        {showGoalSetting && (
          <GoalSetting
            currentGoal={dailyGoal}
            onGoalSet={(newGoal) => {
              setDailyGoal(newGoal);
              setShowGoalSetting(false);
              toast({
                title: "Goal Updated!",
                description: `New daily goal set to ${newGoal}ml`,
              });
            }}
            onClose={() => setShowGoalSetting(false)}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Aqua Shop Modal */}
        {showAquaShop && (
          <AquaShop
            aquaCoins={aquaCoins}
            unlockedThemes={unlockedThemes}
            currentTheme={currentTheme}
            unlockedFeatures={unlockedFeatures}
            onPurchase={(itemId, cost) => {
              if (itemId.includes('theme-')) {
                const themeName = itemId.replace('theme-', '');
                setUnlockedThemes(prev => [...prev, themeName]);
                setCurrentTheme(themeName);
              } else if (itemId.includes('feature') || itemId.includes('premium') || itemId.includes('custom') || itemId.includes('analytics')) {
                setUnlockedFeatures(prev => [...prev, itemId]);
                if (itemId === 'analytics-pro') {
                  setActiveTab('analytics');
                }
              }
              setAquaCoins(prev => prev - cost);
              toast({
                title: "Purchase Successful!",
                description: "Enjoy your new premium feature!",
                duration: 3000,
              });
            }}
            onThemeSwitch={handleThemeSwitch}
            onClose={() => setShowAquaShop(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
