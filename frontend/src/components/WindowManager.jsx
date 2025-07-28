import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square, Maximize2, Minimize2 } from 'lucide-react';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import SkillsWindow from './windows/SkillsWindow';
import ContactWindow from './windows/ContactWindow';
import TerminalWindow from './windows/TerminalWindow';
import SettingsWindow from './windows/SettingsWindow';

const WindowManager = ({ windows, onCloseWindow, onMinimizeWindow, onFocusWindow, currentWallpaper, onChangeWallpaper }) => {
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);

  const getWindowComponent = (windowType, data) => {
    switch (windowType) {
      case 'About Me':
        return <AboutWindow />;
      case 'Projects':
        return <ProjectsWindow />;
      case 'Experience':
        return <ExperienceWindow />;
      case 'Skills':
        return <SkillsWindow />;
      case 'Contact':
        return <ContactWindow />;
      case 'Terminal':
        return <TerminalWindow />;
      case 'Settings':
        return <SettingsWindow currentWallpaper={currentWallpaper} onChangeWallpaper={onChangeWallpaper} />;
      case 'File Manager':
        return <div className="p-4 text-white">File Manager Coming Soon...</div>;
      case 'Music Player':
        return <div className="p-4 text-white">Music Player Coming Soon...</div>;
      default:
        return <div className="p-4 text-white">Application: {windowType}</div>;
    }
  };

  const Window = ({ window }) => {
    const windowRef = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [previousSize, setPreviousSize] = useState(null);
    const [windowState, setWindowState] = useState(window);

    const handleMouseDown = (e, action) => {
      e.preventDefault();
      e.stopPropagation();
      onFocusWindow(window.id);

      if (action === 'drag') {
        setDragging({
          windowId: window.id,
          offsetX: e.clientX - windowState.position.x,
          offsetY: e.clientY - windowState.position.y
        });
      } else if (action === 'resize') {
        setResizing({
          windowId: window.id,
          startX: e.clientX,
          startY: e.clientY,
          startWidth: windowState.size.width,
          startHeight: windowState.size.height
        });
      }
    };

    const handleMaximize = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!isMaximized) {
        setPreviousSize({
          position: { ...windowState.position },
          size: { ...windowState.size }
        });
        
        const newWindowState = {
          ...windowState,
          position: { x: 16, y: 40 },
          size: { width: window.innerWidth - 32, height: window.innerHeight - 80 }
        };
        setWindowState(newWindowState);
        setIsMaximized(true);
      } else {
        if (previousSize) {
          const newWindowState = {
            ...windowState,
            position: previousSize.position,
            size: previousSize.size
          };
          setWindowState(newWindowState);
        }
        setIsMaximized(false);
      }
    };

    const handleMinimize = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onMinimizeWindow(window.id);
    };

    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onCloseWindow(window.id);
    };

    // Update window state when props change
    React.useEffect(() => {
      setWindowState(window);
    }, [window]);

    if (window.isMinimized) {
      return null;
    }

    return (
      <div
        ref={windowRef}
        className="absolute bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl overflow-hidden"
        style={{
          left: windowState.position.x,
          top: windowState.position.y,
          width: windowState.size.width,
          height: windowState.size.height,
          zIndex: window.zIndex
        }}
        onClick={(e) => {
          e.stopPropagation();
          onFocusWindow(window.id);
        }}
      >
        {/* Window Header */}
        <div 
          className="flex items-center justify-between px-4 py-2 bg-black/80 border-b border-white/10 cursor-move select-none"
          onMouseDown={(e) => handleMouseDown(e, 'drag')}
        >
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
            />
            <button 
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors"
            />
            <button 
              onClick={handleMaximize}
              className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            />
          </div>
          
          <h3 className="text-white font-medium text-sm flex-1 text-center pointer-events-none">
            {window.title}
          </h3>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={handleMinimize}
              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
            >
              <Minus className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3 h-3 text-white" /> : <Maximize2 className="w-3 h-3 text-white" />}
            </button>
            <button
              onClick={handleClose}
              className="w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="h-full pb-8 overflow-y-auto" style={{ height: 'calc(100% - 40px)' }}>
          {getWindowComponent(window.id, window.data)}
        </div>

        {/* Resize Handle */}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 bg-white/10 cursor-se-resize"
          onMouseDown={(e) => handleMouseDown(e, 'resize')}
        >
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-white/40"></div>
        </div>
      </div>
    );
  };

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const targetWindow = windows.find(w => w.id === dragging.windowId);
        if (targetWindow) {
          targetWindow.position.x = Math.max(0, e.clientX - dragging.offsetX);
          targetWindow.position.y = Math.max(40, e.clientY - dragging.offsetY);
          // Trigger re-render
          const newWindows = [...windows];
          const index = newWindows.findIndex(w => w.id === targetWindow.id);
          if (index !== -1) {
            newWindows[index] = { ...targetWindow };
          }
        }
      } else if (resizing) {
        const targetWindow = windows.find(w => w.id === resizing.windowId);
        if (targetWindow) {
          const newWidth = Math.max(300, resizing.startWidth + (e.clientX - resizing.startX));
          const newHeight = Math.max(200, resizing.startHeight + (e.clientY - resizing.startY));
          targetWindow.size.width = newWidth;
          targetWindow.size.height = newHeight;
          // Trigger re-render
          const newWindows = [...windows];
          const index = newWindows.findIndex(w => w.id === targetWindow.id);
          if (index !== -1) {
            newWindows[index] = { ...targetWindow };
          }
        }
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
      setResizing(null);
    };

    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing, windows]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {windows.map((window) => (
        <div key={window.id} className="pointer-events-auto">
          <Window window={window} />
        </div>
      ))}
    </div>
  );
};

export default WindowManager;