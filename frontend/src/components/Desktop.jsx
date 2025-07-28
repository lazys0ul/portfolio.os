import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Wifi, Battery, Volume2, VolumeX, Sun, Moon, Power } from 'lucide-react';
import TaskBar from './TaskBar';
import Sidebar from './Sidebar';
import DesktopIcons from './DesktopIcons';
import WindowManager from './WindowManager';
import LoadingScreen from './LoadingScreen';
import ShutdownScreen from './ShutdownScreen';
import { personalInfo } from '../mock';

const Desktop = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  // Handle window opening
  const openWindow = (appName, appData) => {
    const existingWindow = openWindows.find(w => w.id === appName);
    if (existingWindow) {
      // Bring to front if already open
      setOpenWindows(prev => [
        ...prev.filter(w => w.id !== appName),
        { ...existingWindow, zIndex: Math.max(...prev.map(w => w.zIndex)) + 1 }
      ]);
    } else {
      // Open new window
      const newWindow = {
        id: appName,
        title: appName,
        data: appData,
        isMinimized: false,
        position: { x: 100 + openWindows.length * 30, y: 100 + openWindows.length * 30 },
        size: { width: 800, height: 600 },
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
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
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

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 ${isDarkMode ? 'dark' : ''}`}>
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Grid overlay for Garuda OS feel */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

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
      />

      {/* Left Sidebar */}
      <Sidebar onOpenWindow={openWindow} />

      {/* Desktop Icons */}
      <DesktopIcons onOpenWindow={openWindow} />

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
            return prev.map(w => w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w);
          });
        }}
      />

      {/* System Info Overlay */}
      <div className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/20 backdrop-blur-sm rounded-lg p-3">
        <div>Garuda Linux • KDE Plasma</div>
        <div>POCO M4 5G • {personalInfo.username}</div>
      </div>
    </div>
  );
};

export default Desktop;