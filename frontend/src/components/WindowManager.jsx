import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  const [windowStates, setWindowStates] = useState({});
  const scrollPositions = useRef({});  // Store scroll positions

  // Initialize window states when windows change
  useEffect(() => {
    setWindowStates(prev => {
      const newStates = { ...prev };
      let hasChanges = false;
      
      // Add new windows
      windows.forEach(window => {
        if (!newStates[window.id]) {
          newStates[window.id] = {
            isMaximized: false,
            previousSize: null,
            currentPosition: { ...window.position },
            currentSize: { ...window.size }
          };
          hasChanges = true;
        }
      });
      
      // Remove closed windows
      const windowIds = windows.map(w => w.id);
      Object.keys(newStates).forEach(id => {
        if (!windowIds.includes(id)) {
          delete newStates[id];
          // Clean up scroll position for closed windows
          delete scrollPositions.current[id];
          hasChanges = true;
        }
      });
      
      return hasChanges ? newStates : prev;
    });
  }, [windows]); // Simplified dependency - only when windows array changes

  const getWindowComponent = useCallback((windowType, data) => {
    switch (windowType) {
      case 'About Me':
        return <AboutWindow key="about" />;
      case 'Projects':
        return <ProjectsWindow key="projects" />;
      case 'Experience':
        return <ExperienceWindow key="experience" />;
      case 'Skills':
        return <SkillsWindow key="skills" />;
      case 'Contact':
        return <ContactWindow key="contact" />;
      case 'Terminal':
        return <TerminalWindow key="terminal" />;
      case 'Settings':
        return <SettingsWindow key="settings" currentWallpaper={currentWallpaper} onChangeWallpaper={onChangeWallpaper} />;
      case 'File Manager':
        return <div key="filemanager" className="p-4 text-white">File Manager Coming Soon...</div>;
      case 'Music Player':
        return <div key="musicplayer" className="p-4 text-white">Music Player Coming Soon...</div>;
      default:
        return <div key="default" className="p-4 text-white">Application: {windowType}</div>;
    }
  }, [currentWallpaper, onChangeWallpaper]);

  const Window = React.memo(({ window }) => {
    const windowRef = useRef(null);
    const contentRef = useRef(null);  // Reference to content area
    const windowId = window.id;
    
    // Get window state or initialize with defaults
    const windowState = windowStates[windowId] || {
      isMaximized: false,
      previousSize: null,
      currentPosition: window.position,
      currentSize: window.size
    };

    // Use current window data as fallback if state is not initialized
    const displayPosition = windowState.currentPosition || window.position;
    const displaySize = windowState.currentSize || window.size;

    // Preserve scroll position on re-render
    useEffect(() => {
      if (contentRef.current && scrollPositions.current[windowId] !== undefined) {
        // Use setTimeout to ensure DOM has updated
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = scrollPositions.current[windowId];
          }
        }, 0);
      }
    }, [windowId]);

    // Smart scroll handler with temporary optimization
    const handleScroll = useCallback((e) => {
      const windowId = e.target.getAttribute('data-window-id');
      if (windowId) {
        scrollPositions.current[windowId] = e.target.scrollTop;
        
        // Add temporary optimization class during scroll
        e.target.classList.add('scrolling');
        
        // Remove optimization class when scroll stops
        clearTimeout(scrollPositions.current[`${windowId}_scrollTimeout`]);
        scrollPositions.current[`${windowId}_scrollTimeout`] = setTimeout(() => {
          e.target.classList.remove('scrolling');
        }, 100);
      }
    }, []);

    const updateWindowState = useCallback((updates) => {
      setWindowStates(prev => ({
        ...prev,
        [windowId]: { ...windowState, ...updates }
      }));
    }, [windowId, windowState]);

    const handleMouseDown = (e, action) => {
      e.preventDefault();
      e.stopPropagation();
      onFocusWindow(window.id);

      if (action === 'drag') {
        setDragging({
          windowId: window.id,
          offsetX: e.clientX - displayPosition.x,
          offsetY: e.clientY - displayPosition.y
        });
      } else if (action === 'resize') {
        setResizing({
          windowId: window.id,
          startX: e.clientX,
          startY: e.clientY,
          startWidth: displaySize.width,
          startHeight: displaySize.height
        });
      }
    };

    const handleMaximize = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!windowState.isMaximized) {
        updateWindowState({
          isMaximized: true,
          previousSize: {
            position: { ...window.position },
            size: { ...window.size }
          },
          currentPosition: { x: 16, y: 40 },
          currentSize: { 
            width: globalThis.window?.innerWidth - 32 || 1200, 
            height: globalThis.window?.innerHeight - 80 || 800 
          }
        });
      } else {
        if (windowState.previousSize) {
          updateWindowState({
            isMaximized: false,
            currentPosition: windowState.previousSize.position,
            currentSize: windowState.previousSize.size
          });
        }
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

    if (window.isMinimized) {
      return null;
    }

    return (
      <div
        ref={windowRef}
        className="absolute bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl overflow-hidden"
        style={{
          left: displayPosition.x,
          top: displayPosition.y,
          width: displaySize.width,
          height: displaySize.height,
          zIndex: window.zIndex
        }}
        onMouseDown={(e) => {
          // Only focus window if clicking on header or window border, not content area
          const target = e.target;
          const isContentArea = target.closest('.window-content') || 
                               target.tagName === 'INPUT' || 
                               target.tagName === 'TEXTAREA' || 
                               target.tagName === 'BUTTON' ||
                               target.closest('input, textarea, button, [contenteditable]');
          
          if (!isContentArea) {
            onFocusWindow(window.id);
          }
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
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
            />
            <button 
              onClick={handleMinimize}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors"
            />
            <button 
              onClick={handleMaximize}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            />
          </div>
          
          <h3 className="text-white font-medium text-sm flex-1 text-center pointer-events-none">
            {window.title}
          </h3>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={handleMinimize}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
            >
              <Minus className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={handleMaximize}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
            >
              {windowState.isMaximized ? <Minimize2 className="w-3 h-3 text-white" /> : <Maximize2 className="w-3 h-3 text-white" />}
            </button>
            <button
              onClick={handleClose}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Window Content - Simple div with anti-flash properties */}
        <div 
          ref={contentRef}
          data-window-id={window.id}
          className="scroll-container h-full pb-8 overflow-y-auto relative"
          style={{ 
            height: 'calc(100% - 40px)'
          }}
          onScroll={handleScroll}
        >
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
  });

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const newX = Math.max(0, e.clientX - dragging.offsetX);
        const newY = Math.max(40, e.clientY - dragging.offsetY);
        
        setWindowStates(prev => ({
          ...prev,
          [dragging.windowId]: {
            ...(prev[dragging.windowId] || {}),
            currentPosition: { x: newX, y: newY }
          }
        }));
      } else if (resizing) {
        const newWidth = Math.max(300, resizing.startWidth + (e.clientX - resizing.startX));
        const newHeight = Math.max(200, resizing.startHeight + (e.clientY - resizing.startY));
        
        setWindowStates(prev => ({
          ...prev,
          [resizing.windowId]: {
            ...(prev[resizing.windowId] || {}),
            currentSize: { width: newWidth, height: newHeight }
          }
        }));
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
  }, [dragging, resizing]);

  // Memoize window components to prevent unnecessary re-renders
  const windowComponents = useMemo(() => {
    return windows.map((window) => (
      <Window key={window.id} window={window} />
    ));
  }, [windows, windowStates]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {windowComponents.map((component, index) => (
        <div key={`window-wrapper-${windows[index].id}`} className="pointer-events-auto">
          {component}
        </div>
      ))}
    </div>
  );
};

export default WindowManager;