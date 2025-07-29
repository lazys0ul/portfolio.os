import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useAdaptive } from './AdaptiveComponents';
import { AdaptiveWindow } from './AdaptiveComponents';
import { useThrottle } from '../hooks/usePerformance';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import SkillsWindow from './windows/SkillsWindow';
import ContactWindow from './windows/ContactWindow';
import TerminalWindow from './windows/TerminalWindow';
import SettingsWindow from './windows/SettingsWindow';
import VSCodeWindow from './windows/VSCodeWindow';
import SpotifyWindow from './windows/SpotifyWindow';
import PlaceholderWindow from './PlaceholderWindow';

const WindowManager = ({ windows, onCloseWindow, onMinimizeWindow, onFocusWindow, currentWallpaper, onChangeWallpaper }) => {
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [windowStates, setWindowStates] = useState({});
  const scrollPositions = useRef({});
  const adaptive = useAdaptive();
  
  // Refs to prevent stale closures
  const dragRef = useRef(dragging);
  const resizeRef = useRef(resizing);
  
  useEffect(() => {
    dragRef.current = dragging;
    resizeRef.current = resizing;
  }, [dragging, resizing]);

  // Initialize window states when windows change - optimized
  useEffect(() => {
    setWindowStates(prev => {
      const newStates = { ...prev };
      let hasChanges = false;
      
      // Add new windows with throttled updates
      windows.forEach(window => {
        if (!newStates[window.id]) {
          newStates[window.id] = {
            isMaximized: false,
            isMinimized: false,
            previousSize: null,
            previousPosition: null,
            currentPosition: { ...window.position },
            currentSize: { ...window.size },
            zIndex: window.zIndex || 1000
          };
          hasChanges = true;
        }
      });
      
      // Remove closed windows and clean up
      const windowIds = new Set(windows.map(w => w.id));
      Object.keys(newStates).forEach(id => {
        if (!windowIds.has(id)) {
          delete newStates[id];
          delete scrollPositions.current[id];
          hasChanges = true;
        }
      });
      
      return hasChanges ? newStates : prev;
    });
  }, [windows]);

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
      case 'VS Code':
        return <VSCodeWindow key="vscode" />;
      case 'Spotify':
        return <SpotifyWindow key="spotify" />;
      case 'File Manager':
        return <PlaceholderWindow key="filemanager" title="File Manager" />;
      case 'Music Player':
        return <PlaceholderWindow key="musicplayer" title="Music Player" />;
      default:
        return <PlaceholderWindow key="default" title={windowType} message={`Application: ${windowType}`} />;
    }
  }, [currentWallpaper, onChangeWallpaper]);

  // Optimized Window component with better memoization
  const Window = React.memo(({ window: windowProp }) => {
    const windowRef = useRef(null);
    const contentRef = useRef(null);
    const windowId = windowProp.id;
    
    // Get window state or initialize with defaults - memoized
    const windowState = useMemo(() => {
      return windowStates[windowId] || {
        isMaximized: false,
        isMinimized: false,
        previousSize: null,
        previousPosition: null,
        currentPosition: windowProp.position,
        currentSize: windowProp.size,
        zIndex: windowProp.zIndex || 1000
      };
    }, [windowStates[windowId], windowProp.position, windowProp.size, windowProp.zIndex]);

    const handleMinimize = useCallback(() => {
      console.log('Minimize clicked for window:', windowId);
      onMinimizeWindow(windowId);
    }, [windowId, onMinimizeWindow]);

    const handleClose = useCallback(() => {
      console.log('Close clicked for window:', windowId);
      onCloseWindow(windowId);
    }, [windowId, onCloseWindow]);

    const handleFocus = useCallback(() => {
      onFocusWindow(windowId);
    }, [windowId, onFocusWindow]);

    const handleMaximize = useCallback(() => {
      console.log('Maximize clicked for window:', windowId);
      setWindowStates(prev => {
        const currentState = prev[windowId] || {};
        const newIsMaximized = !currentState.isMaximized;
        
        // Prepare the new state
        const newState = {
          ...currentState,
          isMaximized: newIsMaximized
        };
        
        if (newIsMaximized) {
          // Store current state when maximizing
          newState.previousSize = currentState.currentSize || windowProp.size;
          newState.previousPosition = currentState.currentPosition || windowProp.position;
        } else {
          // Restore previous state when unmaximizing
          if (currentState.previousSize) {
            newState.currentSize = currentState.previousSize;
          }
          if (currentState.previousPosition) {
            newState.currentPosition = currentState.previousPosition;
          }
          newState.previousSize = null;
          newState.previousPosition = null;
        }
        
        return {
          ...prev,
          [windowId]: newState
        };
      });
    }, [windowId, windowProp]);

    const handleMouseDown = useCallback((e, action) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Mouse down:', action, 'for window:', windowId, 'isMaximized:', windowState.isMaximized);
      
      // Focus window immediately
      handleFocus();

      // Don't allow dragging or resizing when maximized
      if (windowState.isMaximized) {
        return;
      }

      if (action === 'drag' && adaptive.deviceType !== 'mobile') {
        const rect = windowRef.current.getBoundingClientRect();
        setDragging({
          windowId,
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top
        });
        console.log('Dragging started for:', windowId);
      } else if (action === 'resize' && adaptive.deviceType !== 'mobile') {
        const currentSize = windowState.currentSize || windowProp.size;
        setResizing({
          windowId,
          startX: e.clientX,
          startY: e.clientY,
          startWidth: currentSize.width,
          startHeight: currentSize.height
        });
        console.log('Resizing started for:', windowId);
      }
    }, [windowId, windowState.isMaximized, adaptive.deviceType, handleFocus]);

    // Handle scroll preservation
    useEffect(() => {
      if (contentRef.current && scrollPositions.current[windowId] !== undefined) {
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = scrollPositions.current[windowId];
          }
        }, 0);
      }
    }, [windowId]);

    const handleScroll = useCallback((e) => {
      const windowId = e.target.getAttribute('data-window-id');
      if (windowId) {
        scrollPositions.current[windowId] = e.target.scrollTop;
      }
    }, []);

    return (
      <AdaptiveWindow
        ref={windowRef}
        title={windowProp.id}
        position={windowState.currentPosition || windowProp.position}
        size={windowState.currentSize || windowProp.size}
        isMaximized={windowState.isMaximized}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onClose={handleClose}
        onFocus={handleFocus}
        onDragStart={(e) => handleMouseDown(e, 'drag')}
        onResizeStart={(e) => handleMouseDown(e, 'resize')}
        isDraggable={adaptive.deviceType !== 'mobile'}
        isResizable={adaptive.deviceType !== 'mobile'}
      >
        <div 
          ref={contentRef}
          data-window-id={windowProp.id}
          className="h-full overflow-y-auto touch-manipulation adaptive-scroll"
          onScroll={handleScroll}
        >
          {getWindowComponent(windowProp.id, windowProp.data)}
        </div>
      </AdaptiveWindow>
    );
  });

  // Throttled update functions for better performance
  const throttledUpdatePosition = useThrottle(useCallback((windowId, x, y) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...(prev[windowId] || {}),
        currentPosition: { x, y }
      }
    }));
  }, []), 16);

  const throttledUpdateSize = useThrottle(useCallback((windowId, width, height) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...(prev[windowId] || {}),
        currentSize: { width, height }
      }
    }));
  }, []), 16);

  // Handle mouse move for dragging and resizing with throttling
  useEffect(() => {
    let animationFrameId = null;
    let lastUpdateTime = 0;
    const updateThreshold = 16; // ~60fps

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      
      if (currentTime - lastUpdateTime < updateThreshold) {
        return;
      }
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        if (dragging) {
          const newX = Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragging.offsetX));
          const newY = Math.max(40, Math.min(window.innerHeight - 100, e.clientY - dragging.offsetY));
          throttledUpdatePosition(dragging.windowId, newX, newY);
        } else if (resizing) {
          const newWidth = Math.max(300, resizing.startWidth + (e.clientX - resizing.startX));
          const newHeight = Math.max(200, resizing.startHeight + (e.clientY - resizing.startY));
          throttledUpdateSize(resizing.windowId, newWidth, newHeight);
        }
        lastUpdateTime = currentTime;
      });
    };

    const handleMouseUp = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      setDragging(null);
      setResizing(null);
    };

    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing, throttledUpdatePosition, throttledUpdateSize]);

  // Handle orientation changes and viewport resize
  useEffect(() => {
    const handleOrientationChange = () => {
      // Delay to allow viewport to settle after orientation change
      setTimeout(() => {
        setWindowStates(prev => {
          const updated = { ...prev };
          let hasChanges = false;
          
          Object.keys(updated).forEach(windowId => {
            const state = updated[windowId];
            if (state.isMaximized) {
              // Force re-render for maximized windows
              hasChanges = true;
            } else if (state.currentPosition) {
              // Ensure windows stay within new viewport bounds
              const maxX = Math.max(0, window.innerWidth - (state.currentSize?.width || 300));
              const maxY = Math.max(40, window.innerHeight - (state.currentSize?.height || 200));
              
              const newX = Math.min(state.currentPosition.x, maxX);
              const newY = Math.min(state.currentPosition.y, maxY);
              
              if (newX !== state.currentPosition.x || newY !== state.currentPosition.y) {
                updated[windowId] = {
                  ...state,
                  currentPosition: { x: newX, y: newY }
                };
                hasChanges = true;
              }
            }
          });
          
          return hasChanges ? updated : prev;
        });
      }, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  // Optimized window components with better dependency tracking
  const windowComponents = useMemo(() => {
    return windows.map((window) => (
      <Window key={window.id} window={window} />
    ));
  }, [windows, windowStates, adaptive.deviceType]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {windowComponents}
    </div>
  );
};

export default WindowManager;