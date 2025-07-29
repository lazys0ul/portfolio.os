import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Wifi, Battery, Volume2, VolumeX, Sun, Moon, Power } from 'lucide-react';
import { AdaptiveLayoutProvider, useAdaptive, AdaptiveComponent, AdaptiveContainer } from './AdaptiveComponents';
import TaskBar from './TaskBar';
import Sidebar from './Sidebar';
import DesktopIcons from './DesktopIcons';
import WindowManager from './WindowManager';
import LoadingScreen from './LoadingScreen';
import ShutdownScreen from './ShutdownScreen';
import { personalInfo, wallpapers } from '../mock';
import '../styles/adaptive.css';

const Desktop = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Set default wallpaper - Tokyo Ghoul Dark theme for first-time visitors
  const getDefaultWallpaper = () => {
    return wallpapers.find(w => w.isDefault) || wallpapers[0];
  };
  
  const [currentWallpaper, setCurrentWallpaper] = useState(getDefaultWallpaper());
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Wrap the entire component in AdaptiveLayoutProvider with wallpaper theming
  return (
    <AdaptiveLayoutProvider initialWallpaper={currentWallpaper}>
      <DesktopContent 
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isShuttingDown={isShuttingDown}
        setIsShuttingDown={setIsShuttingDown}
        openWindows={openWindows}
        setOpenWindows={setOpenWindows}
        volume={volume}
        setVolume={setVolume}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        brightness={brightness}
        setBrightness={setBrightness}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentWallpaper={currentWallpaper}
        setCurrentWallpaper={setCurrentWallpaper}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </AdaptiveLayoutProvider>
  );
};

const DesktopContent = ({ 
  currentTime, setCurrentTime, isLoading, setIsLoading, isShuttingDown, setIsShuttingDown,
  openWindows, setOpenWindows, volume, setVolume, isMuted, setIsMuted, brightness, setBrightness,
  isDarkMode, setIsDarkMode, currentWallpaper, setCurrentWallpaper, currentTheme, setCurrentTheme
}) => {
  const adaptive = useAdaptive();

  // Time update effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Loading animation effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(loadingTimer);
  }, []);

  // Adaptive theme handling
  useEffect(() => {
    if (adaptive.colorScheme !== (isDarkMode ? 'dark' : 'light')) {
      const shouldUseDark = adaptive.colorScheme === 'dark';
      setIsDarkMode(shouldUseDark);
      setCurrentTheme(shouldUseDark ? 'dark' : 'light');
    }
  }, [adaptive.colorScheme, isDarkMode]);

  // Handle wallpaper change
  const changeWallpaper = (wallpaper) => {
    setCurrentWallpaper(wallpaper);
    setCurrentTheme(wallpaper.theme);
    setIsDarkMode(wallpaper.theme === 'dark');
  };

  // Handle window opening with adaptive sizing
  const openWindow = (appName, appData) => {
    const existingWindow = openWindows.find(w => w.id === appName);
    if (existingWindow) {
      // Bring to front if already open
      setOpenWindows(prev => [
        ...prev.filter(w => w.id !== appName),
        { ...existingWindow, zIndex: Math.max(...prev.map(w => w.zIndex)) + 1, isMinimized: false }
      ]);
    } else {
      // Get adaptive window dimensions
      const dimensions = adaptive.getWindowDimensions(appName.toLowerCase().replace(' ', '-'));
      
      // Open new window with adaptive sizing
      const newWindow = {
        id: appName,
        title: appName,
        data: appData,
        isMinimized: false,
        position: { x: dimensions.x, y: dimensions.y },
        size: { width: dimensions.width, height: dimensions.height },
        zIndex: openWindows.length + 1
      };
      setOpenWindows(prev => [...prev, newWindow]);
    }
  };

  // Handle window closing
  const closeWindow = (windowId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
  };

  // Handle volume control
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  // Handle brightness control
  const handleBrightnessChange = (newBrightness) => {
    setBrightness(newBrightness);
    document.body.style.filter = `brightness(${newBrightness}%)`;
  };

  // Handle shutdown
  const handleShutdown = () => {
    setIsShuttingDown(true);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    setCurrentTheme(newDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', newDarkMode);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isShuttingDown) {
    return <ShutdownScreen />;
  }

  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getAccentColor = () => {
    switch(currentWallpaper.accent) {
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'green': return 'from-green-500 to-emerald-500';
      case 'orange': return 'from-orange-500 to-red-500';
      case 'cyan': return 'from-cyan-500 to-blue-500';
      case 'purple': return 'from-purple-500 to-pink-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <AdaptiveContainer 
      className={`relative w-full h-screen min-h-screen h-dvh overflow-hidden ${isDarkMode ? 'dark' : ''}`}
      data-theme={currentTheme}
      data-wallpaper={currentWallpaper.name}
    >
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url('${currentWallpaper.url}')`,
          }}
        />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/30' : 'bg-white/20'}`}></div>
      </div>

      {/* Adaptive Grid overlay for desktop feel */}
      <AdaptiveComponent
        desktop={
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        }
      />

      {/* Top TaskBar */}
      <TaskBar
        currentTime={formatTime(currentTime)}
        volume={volume}
        isMuted={isMuted}
        brightness={brightness}
        isDarkMode={isDarkMode}
        onVolumeChange={handleVolumeChange}
        onBrightnessChange={handleBrightnessChange}
        onToggleMute={toggleMute}
        onToggleTheme={toggleTheme}
        onShutdown={handleShutdown}
        onOpenWindow={openWindow}
        currentTheme={currentTheme}
        openWindows={openWindows}
        onRestoreWindow={(windowId) => {
          setOpenWindows(prev =>
            prev.map(w => w.id === windowId ? { ...w, isMinimized: false } : w)
          );
        }}
        onFocusWindow={(windowId) => {
          setOpenWindows(prev => {
            const maxZ = Math.max(...prev.map(w => w.zIndex));
            const windowIndex = prev.findIndex(w => w.id === windowId);
            if (windowIndex === -1) return prev;
            
            // Only update if the window isn't already at the top
            if (prev[windowIndex].zIndex === maxZ) return prev;
            
            const newWindows = [...prev];
            newWindows[windowIndex] = { ...newWindows[windowIndex], zIndex: maxZ + 1 };
            return newWindows;
          });
        }}
      />

      {/* Left Sidebar */}
      <Sidebar onOpenWindow={openWindow} currentTheme={currentTheme} />

      {/* Desktop Icons */}
      <DesktopIcons onOpenWindow={openWindow} currentTheme={currentTheme} />

      {/* Window Manager */}
      <WindowManager
        windows={openWindows}
        onCloseWindow={closeWindow}
        onMinimizeWindow={(windowId) => {
          setOpenWindows(prev =>
            prev.map(w => w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w)
          );
        }}
        onFocusWindow={(windowId) => {
          setOpenWindows(prev => {
            const maxZ = Math.max(...prev.map(w => w.zIndex));
            const windowIndex = prev.findIndex(w => w.id === windowId);
            if (windowIndex === -1) return prev;
            
            // Only update if the window isn't already at the top
            if (prev[windowIndex].zIndex === maxZ) return prev;
            
            const newWindows = [...prev];
            newWindows[windowIndex] = { ...newWindows[windowIndex], zIndex: maxZ + 1 };
            return newWindows;
          });
        }}
        currentWallpaper={currentWallpaper}
        onChangeWallpaper={changeWallpaper}
      />

      {/* System Info Overlay */}
      <div className={`absolute bottom-4 right-4 text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'} bg-black/20 backdrop-blur-sm rounded-lg p-3`}>
        <div>Garuda Linux • KDE Plasma</div>
        <div>POCO M4 5G • {personalInfo.username}</div>
        <div className="text-xs opacity-70">{currentWallpaper.name} theme</div>
      </div>
    </AdaptiveContainer>
  );
};

export default Desktop;