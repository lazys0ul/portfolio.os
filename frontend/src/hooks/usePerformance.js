import { useCallback, useRef } from 'react';

/**
 * Custom hook for throttling operations to improve performance
 * Prevents excessive calls during dragging, resizing, and other high-frequency events
 */
export const useThrottle = (callback, delay = 16) => {
  const lastCallRef = useRef(0);
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    const now = Date.now();
    
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback(...args);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        lastCallRef.current = Date.now();
        callback(...args);
      }, delay - (now - lastCallRef.current));
    }
  }, [callback, delay]);
};

/**
 * Custom hook for debouncing operations
 * Useful for search inputs, window resize events, etc.
 */
export const useDebounce = (callback, delay = 300) => {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

/**
 * Custom hook for managing window states with optimized updates
 * Reduces re-renders and improves performance
 */
export const useWindowState = (initialState = {}) => {
  const stateRef = useRef(initialState);
  
  const updateState = useCallback((windowId, updates) => {
    stateRef.current = {
      ...stateRef.current,
      [windowId]: {
        ...stateRef.current[windowId],
        ...updates
      }
    };
  }, []);

  const getState = useCallback((windowId) => {
    return stateRef.current[windowId] || {};
  }, []);

  const removeState = useCallback((windowId) => {
    const { [windowId]: removed, ...rest } = stateRef.current;
    stateRef.current = rest;
  }, []);

  return {
    updateState,
    getState,
    removeState,
    getAllStates: () => stateRef.current
  };
};
