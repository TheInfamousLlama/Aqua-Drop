
import React from 'react';

interface ThemeProviderProps {
  currentTheme: string;
  isDarkMode: boolean;
  children: React.ReactNode;
}

const ThemeProvider = ({ currentTheme, isDarkMode, children }: ThemeProviderProps) => {
  const getThemeStyles = () => {
    const baseClasses = "min-h-screen transition-all duration-1000 relative";
    
    switch (currentTheme) {
      case 'ocean':
        return `${baseClasses} bg-gradient-to-br from-blue-900/30 via-cyan-800/30 to-blue-900/30`;
      case 'sunset':
        return `${baseClasses} bg-gradient-to-br from-orange-800/30 via-pink-700/30 to-purple-800/30`;
      case 'forest':
        return `${baseClasses} bg-gradient-to-br from-green-900/30 via-emerald-800/30 to-teal-900/30`;
      case 'aurora':
        return `${baseClasses} bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40`;
      case 'desert':
        return `${baseClasses} bg-gradient-to-br from-yellow-800/30 via-orange-700/30 to-red-800/30`;
      case 'cherry-blossom':
        return `${baseClasses} bg-gradient-to-br from-pink-800/30 via-rose-700/30 to-pink-900/30`;
      case 'tropical':
        return `${baseClasses} bg-gradient-to-br from-teal-800/30 via-cyan-700/30 to-blue-800/30`;
      case 'tokyo-skyline':
        return `${baseClasses} bg-gradient-to-br from-purple-900/30 via-pink-800/30 to-blue-900/30`;
      case 'manhattan':
        return `${baseClasses} bg-gradient-to-br from-gray-800/30 via-slate-700/30 to-blue-800/30`;
      case 'dubai-sunset':
        return `${baseClasses} bg-gradient-to-br from-orange-800/30 via-red-700/30 to-purple-800/30`;
      case 'paris-twilight':
        return `${baseClasses} bg-gradient-to-br from-indigo-800/30 via-purple-700/30 to-pink-800/30`;
      case 'singapore-lights':
        return `${baseClasses} bg-gradient-to-br from-blue-800/30 via-cyan-700/30 to-teal-800/30`;
      case 'golden-retriever':
        return `${baseClasses} bg-gradient-to-br from-yellow-700/30 via-orange-600/30 to-red-700/30`;
      case 'kitten-cuddles':
        return `${baseClasses} bg-gradient-to-br from-pink-700/30 via-rose-600/30 to-purple-700/30`;
      case 'penguin-play':
        return `${baseClasses} bg-gradient-to-br from-blue-800/30 via-cyan-700/30 to-white/20`;
      case 'baby-elephants':
        return `${baseClasses} bg-gradient-to-br from-gray-700/30 via-slate-600/30 to-stone-700/30`;
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
    const themeImages: { [key: string]: string } = {
      'ocean': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=3840&q=80',
      'sunset': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80',
      'forest': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=3840&q=80',
      'aurora': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=3840&q=80',
      'desert': 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=3840&q=80',
      'cherry-blossom': 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=3840&q=80',
      'tropical': 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=3840&q=80',
      'tokyo-skyline': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=3840&q=80',
      'manhattan': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=3840&q=80',
      'dubai-sunset': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3840&q=80',
      'paris-twilight': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=3840&q=80',
      'singapore-lights': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=3840&q=80',
      'golden-retriever': 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=3840&q=80',
      'kitten-cuddles': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=3840&q=80',
      'penguin-play': 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=3840&q=80',
      'baby-elephants': 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=3840&q=80',
      'koala-dreams': 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?auto=format&fit=crop&w=3840&q=80'
    };
    
    return themeImages[currentTheme] || null;
  };

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
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
