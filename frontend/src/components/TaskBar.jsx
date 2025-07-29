import React, { useState } from 'react';
import { 
  Menu, Wifi, Battery, Volume2, VolumeX, Sun, Moon, 
  Power, Settings, Monitor, Smartphone 
} from 'lucide-react';
import { systemInfo } from '../mock';

const TaskBar = ({ 
  currentTime, 
  volume, 
  isMuted, 
  brightness, 
  isDarkMode,
  onVolumeChange, 
  onBrightnessChange, 
  onToggleMute, 
  onToggleTheme, 
  onShutdown,
  onOpenWindow,
  openWindows = [],
  onRestoreWindow,
  onFocusWindow
}) => {
  const [showSystemPanel, setShowSystemPanel] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  const handleActivitiesClick = () => {
    setShowActivities(!showActivities);
  };

  const handleSystemPanelClick = () => {
    setShowSystemPanel(!showSystemPanel);
  };

  return (
    <>
      {/* Main TaskBar */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left Section - Activities (hidden on mobile) */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleActivitiesClick}
              className="hidden md:block text-white text-sm font-medium hover:bg-white/10 px-3 py-1 rounded transition-colors touch-manipulation"
              style={{ WebkitTapHighlightColor: 'rgba(255,255,255,0.1)' }}
            >
              Activities
            </button>
            
            <div className="hidden md:block text-white/70 text-sm font-mono">
              Garuda Linux
            </div>

            {/* Mobile App Title - Show only on mobile when window is open */}
            <div className="block md:hidden text-white text-sm font-medium truncate max-w-[200px]">
              {openWindows.length > 0 ? openWindows[openWindows.length - 1].title : 'Portfolio OS'}
            </div>

            {/* Window Buttons - Only show on desktop */}
            {openWindows.length > 0 && (
              <div className="hidden md:flex items-center space-x-1 ml-4">
                {openWindows.map((window) => (
                  <button
                    key={window.id}
                    onClick={() => {
                      if (window.isMinimized) {
                        onRestoreWindow(window.id);
                      } else {
                        // Focus the window if it's already open
                        onFocusWindow && onFocusWindow(window.id);
                      }
                    }}
                    className={`
                      px-2 py-1 text-xs rounded transition-colors
                      ${window.isMinimized 
                        ? 'bg-white/10 text-white/70 hover:bg-white/20' 
                        : 'bg-blue-500/70 text-white hover:bg-blue-500'
                      }
                    `}
                    title={window.isMinimized ? `Restore ${window.title}` : window.title}
                  >
                    {window.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center Section - Time */}
          <div className="text-white text-sm font-mono">
            {currentTime}
          </div>

          {/* Right Section - System Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSystemPanelClick}
              className="flex items-center space-x-1 text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-colors touch-manipulation"
              style={{ WebkitTapHighlightColor: 'rgba(255,255,255,0.1)' }}
            >
              <Wifi className="w-4 h-4" />
              <Battery className="w-4 h-4" />
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Activities Overview */}
      {showActivities && (
        <div className="absolute top-10 left-0 right-0 bottom-0 bg-black/90 backdrop-blur-lg z-40 flex items-center justify-center">
          <div 
            className="absolute inset-0"
            onClick={() => setShowActivities(false)}
          />
          <div className="text-center text-white z-50">
            <h2 className="text-4xl font-bold mb-8">Overview</h2>
            <div className="grid grid-cols-3 gap-8 max-w-4xl">
              {/* Recent Applications */}
              <div 
                onClick={() => {
                  onOpenWindow('About Me');
                  setShowActivities(false);
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 cursor-pointer transition-all transform hover:scale-105"
              >
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-lg font-semibold">About Me</h3>
              </div>
              
              <div 
                onClick={() => {
                  onOpenWindow('Projects');
                  setShowActivities(false);
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 cursor-pointer transition-all transform hover:scale-105"
              >
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-lg font-semibold">Projects</h3>
              </div>
              
              <div 
                onClick={() => {
                  onOpenWindow('Contact');
                  setShowActivities(false);
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 cursor-pointer transition-all transform hover:scale-105"
              >
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-lg font-semibold">Contact</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Panel */}
      {showSystemPanel && (
        <div className="absolute top-10 right-4 w-80 bg-black/90 backdrop-blur-lg rounded-lg border border-white/20 z-50 p-4">
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowSystemPanel(false)}
          />
          <div className="relative z-50 space-y-4">
            {/* Device Info */}
            <div className="text-center border-b border-white/20 pb-4">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h3 className="text-white font-semibold">{systemInfo.device}</h3>
              <p className="text-white/70 text-sm">{systemInfo.os}</p>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                  <span className="text-white text-sm">Volume</span>
                </div>
                <button
                  onClick={onToggleMute}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-right text-white/70 text-xs">{isMuted ? 0 : volume}%</div>
            </div>

            {/* Brightness Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">Brightness</span>
                </div>
                <button
                  onClick={onToggleTheme}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={brightness}
                onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-right text-white/70 text-xs">{brightness}%</div>
            </div>

            {/* System Actions */}
            <div className="pt-4 border-t border-white/20 space-y-2">
              <button
                onClick={() => {
                  onOpenWindow('Settings');
                  setShowSystemPanel(false);
                }}
                className="w-full flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              
              <button
                onClick={onShutdown}
                className="w-full flex items-center space-x-2 text-red-400 hover:bg-red-500/20 px-3 py-2 rounded transition-colors"
              >
                <Power className="w-4 h-4" />
                <span>Shutdown</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskBar;