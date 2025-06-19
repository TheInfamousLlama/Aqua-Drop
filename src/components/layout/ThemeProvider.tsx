
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
      case 'misty-forest':
        return `${baseClasses} bg-gradient-to-br from-green-900/30 via-emerald-800/30 to-teal-900/30`;
      case 'alpine-lake':
        return `${baseClasses} bg-gradient-to-br from-blue-800/30 via-cyan-700/30 to-blue-900/30`;
      case 'autumn-leaves':
        return `${baseClasses} bg-gradient-to-br from-orange-800/30 via-red-700/30 to-yellow-800/30`;
      case 'lavender-fields':
        return `${baseClasses} bg-gradient-to-br from-purple-800/30 via-pink-700/30 to-purple-900/30`;
      case 'bamboo-grove':
        return `${baseClasses} bg-gradient-to-br from-green-800/30 via-lime-700/30 to-green-900/30`;
      case 'sydney-harbour':
        return `${baseClasses} bg-gradient-to-br from-blue-800/30 via-cyan-700/30 to-teal-800/30`;
      case 'venice-canals':
        return `${baseClasses} bg-gradient-to-br from-blue-800/30 via-indigo-700/30 to-purple-800/30`;
      case 'london-bridge':
        return `${baseClasses} bg-gradient-to-br from-gray-800/30 via-slate-700/30 to-blue-800/30`;
      case 'chicago-skyline':
        return `${baseClasses} bg-gradient-to-br from-blue-900/30 via-gray-800/30 to-slate-900/30`;
      case 'san-francisco-golden':
        return `${baseClasses} bg-gradient-to-br from-orange-800/30 via-red-700/30 to-yellow-800/30`;
      default:
        return `${baseClasses} ${isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
        }`;
    }
  };

  const getThemeBackgroundImage = () => {
    const themeImages: { [key: string]: string } = {
      'misty-forest': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=3840&q=80',
      'alpine-lake': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80',
      'autumn-leaves': 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?auto=format&fit=crop&w=3840&q=80',
      'lavender-fields': 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=3840&q=80',
      'bamboo-grove': 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=3840&q=80',
      'sydney-harbour': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80',
      'venice-canals': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=3840&q=80',
      'london-bridge': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=3840&q=80',
      'chicago-skyline': 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=3840&q=80',
      'san-francisco-golden': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=3840&q=80'
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
