import { useState, useEffect, useCallback } from 'react';

const useColorTheme = (initialWallpaper = null) => {
  const [currentTheme, setCurrentTheme] = useState({
    primary: '#dc2626',      // Tokyo Ghoul red as default
    secondary: '#991b1b',
    background: '#0f0f0f',
    surface: '#1f1f1f',
    text: '#ffffff',
    textSecondary: '#fca5a5',
    accent: '#dc2626',
    category: 'anime'
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme colors to CSS custom properties
  const applyThemeToCSS = useCallback((colors) => {
    const root = document.documentElement;
    
    // Set CSS custom properties for dynamic theming
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-surface', colors.surface);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-text-secondary', colors.textSecondary);
    root.style.setProperty('--theme-accent', colors.accent);
    
    // Additional computed colors
    root.style.setProperty('--theme-primary-rgb', hexToRgb(colors.primary));
    root.style.setProperty('--theme-secondary-rgb', hexToRgb(colors.secondary));
    root.style.setProperty('--theme-accent-rgb', hexToRgb(colors.accent));
    
    // Generate opacity variants
    root.style.setProperty('--theme-primary-10', `${colors.primary}1a`); // 10% opacity
    root.style.setProperty('--theme-primary-20', `${colors.primary}33`); // 20% opacity
    root.style.setProperty('--theme-primary-50', `${colors.primary}80`); // 50% opacity
    root.style.setProperty('--theme-accent-10', `${colors.accent}1a`);
    root.style.setProperty('--theme-accent-20', `${colors.accent}33`);
    root.style.setProperty('--theme-accent-50', `${colors.accent}80`);
  }, []);

  // Helper function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 255, 255';
  };

  // Generate complementary colors based on primary
  const generateComplementaryColors = useCallback((primaryColor) => {
    // This is a simplified color harmony generator
    // In a real app, you might use a more sophisticated color theory library
    const hsl = hexToHsl(primaryColor);
    
    return {
      complementary: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
      triadic1: hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
      triadic2: hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
      analogous1: hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
      analogous2: hslToHex((hsl.h - 30) % 360, hsl.s, hsl.l),
    };
  }, []);

  // Color conversion helpers
  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Change theme with smooth transition
  const changeTheme = useCallback(async (wallpaper) => {
    if (!wallpaper.colors) return;
    
    setIsTransitioning(true);
    
    // Add transition class to body for smooth color changes
    document.body.classList.add('theme-transitioning');
    
    try {
      // Apply new theme colors
      const newTheme = {
        ...wallpaper.colors,
        accent: wallpaper.accent,
        category: wallpaper.category
      };
      
      setCurrentTheme(newTheme);
      applyThemeToCSS(newTheme);
      
      // Generate and store complementary colors for advanced theming
      const complementaryColors = generateComplementaryColors(wallpaper.colors.primary);
      
      // Store theme in localStorage for persistence
      localStorage.setItem('portfolio-theme', JSON.stringify({
        ...newTheme,
        complementaryColors,
        wallpaperName: wallpaper.name
      }));
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 500);
      
    } catch (error) {
      console.warn('Theme change error:', error);
      setIsTransitioning(false);
      document.body.classList.remove('theme-transitioning');
    }
  }, [applyThemeToCSS, generateComplementaryColors]);

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
        applyThemeToCSS(parsedTheme);
      } catch (error) {
        console.warn('Failed to load saved theme:', error);
      }
    } else if (initialWallpaper?.colors) {
      changeTheme(initialWallpaper);
    }
  }, [initialWallpaper, changeTheme, applyThemeToCSS]);

  // Get theme-aware styles for components
  const getThemedStyles = useCallback((componentType = 'default') => {
    const baseStyles = {
      primary: currentTheme.primary,
      secondary: currentTheme.secondary,
      background: currentTheme.background,
      surface: currentTheme.surface,
      text: currentTheme.text,
      textSecondary: currentTheme.textSecondary,
      accent: currentTheme.accent
    };

    // Component-specific style variations
    switch (componentType) {
      case 'window':
        return {
          ...baseStyles,
          titleBarBackground: `linear-gradient(135deg, ${currentTheme.background}, ${currentTheme.surface})`,
          borderColor: currentTheme.primary,
          shadowColor: `${currentTheme.primary}66`
        };
      
      case 'button':
        return {
          ...baseStyles,
          hoverBackground: `${currentTheme.primary}20`,
          activeBackground: `${currentTheme.primary}30`,
          borderColor: currentTheme.primary
        };
      
      case 'icon':
        return {
          ...baseStyles,
          gradientStart: currentTheme.primary,
          gradientEnd: currentTheme.secondary,
          shadowColor: `${currentTheme.primary}50`
        };
      
      default:
        return baseStyles;
    }
  }, [currentTheme]);

  return {
    currentTheme,
    isTransitioning,
    changeTheme,
    getThemedStyles,
    applyThemeToCSS
  };
};

export default useColorTheme;
