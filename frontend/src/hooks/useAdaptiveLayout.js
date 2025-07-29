import { useState, useEffect, useCallback } from 'react';

const useAdaptiveLayout = () => {
  const [layoutConfig, setLayoutConfig] = useState({
    // Device Detection
    deviceType: 'desktop', // desktop, tablet, mobile, tv
    orientation: 'landscape', // portrait, landscape
    browser: 'unknown', // chrome, safari, firefox, edge
    platform: 'unknown', // ios, android, windows, macos, linux
    
    // Capabilities
    touchEnabled: false,
    hoverEnabled: true,
    keyboardEnabled: true,
    
    // Display Properties
    screenSize: { width: 1920, height: 1080 },
    viewportSize: { width: 1920, height: 1080 },
    pixelRatio: 1,
    colorScheme: 'dark',
    
    // Performance & Features
    reducedMotion: false,
    highContrast: false,
    supportsBackdrop: true,
    supportsGrid: true,
    supportsFlex: true,
    
    // Layout Decisions
    shouldUseDesktopLayout: true,
    shouldUseMobileLayout: false,
    shouldUseTabletLayout: false,
    windowManagementMode: 'full', // full, simplified, overlay
    iconDisplayMode: 'positioned', // positioned, grid, list
    navigationMode: 'desktop', // desktop, mobile, hybrid
  });

  // Advanced device detection
  const detectDevice = useCallback(() => {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenWidth = window.screen?.width || width;
    const screenHeight = window.screen?.height || height;
    const pixelRatio = window.devicePixelRatio || 1;

    // Browser Detection
    let browser = 'unknown';
    if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) browser = 'chrome';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'safari';
    else if (userAgent.includes('Firefox')) browser = 'firefox';
    else if (userAgent.includes('Edge')) browser = 'edge';

    // Platform Detection
    let detectedPlatform = 'unknown';
    if (/iPad|iPhone|iPod/.test(userAgent)) detectedPlatform = 'ios';
    else if (/Android/.test(userAgent)) detectedPlatform = 'android';
    else if (/Win/.test(platform)) detectedPlatform = 'windows';
    else if (/Mac/.test(platform)) detectedPlatform = 'macos';
    else if (/Linux/.test(platform)) detectedPlatform = 'linux';

    // Device Type Detection (more sophisticated)
    let deviceType = 'desktop';
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasFinePoi = window.matchMedia('(pointer: fine)').matches;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    if (width < 768) {
      deviceType = 'mobile';
    } else if (width < 1024 && (isTouch || !hasFinePoi)) {
      deviceType = 'tablet';
    } else if (width >= 1920 && height >= 1080) {
      deviceType = 'desktop-large';
    } else if (width >= 1024) {
      deviceType = 'desktop';
    }

    // Orientation
    const orientation = width > height ? 'landscape' : 'portrait';

    // Capabilities Detection
    const touchEnabled = isTouch;
    const hoverEnabled = window.matchMedia('(hover: hover)').matches;
    const keyboardEnabled = !isTouch || deviceType !== 'mobile';

    // Feature Support Detection
    const supportsBackdrop = CSS.supports('backdrop-filter', 'blur(10px)');
    const supportsGrid = CSS.supports('display', 'grid');
    const supportsFlex = CSS.supports('display', 'flex');

    // Accessibility Preferences
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const highContrast = window.matchMedia('(prefers-contrast: high)').matches;
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // Smart Layout Decisions
    const shouldUseDesktopLayout = deviceType === 'desktop' || deviceType === 'desktop-large' || 
      (deviceType === 'tablet' && orientation === 'landscape' && width >= 1024);
    
    const shouldUseMobileLayout = deviceType === 'mobile' || 
      (deviceType === 'tablet' && orientation === 'portrait' && width < 768);
    
    const shouldUseTabletLayout = !shouldUseDesktopLayout && !shouldUseMobileLayout;

    // Window Management Mode
    let windowManagementMode = 'full';
    if (shouldUseMobileLayout) {
      windowManagementMode = 'overlay';
    } else if (shouldUseTabletLayout) {
      windowManagementMode = 'simplified';
    }

    // Icon Display Mode
    let iconDisplayMode = 'positioned';
    if (shouldUseMobileLayout) {
      iconDisplayMode = 'grid';
    } else if (shouldUseTabletLayout) {
      iconDisplayMode = orientation === 'portrait' ? 'grid' : 'positioned';
    }

    // Navigation Mode
    let navigationMode = 'desktop';
    if (shouldUseMobileLayout) {
      navigationMode = 'mobile';
    } else if (shouldUseTabletLayout) {
      navigationMode = 'hybrid';
    }

    return {
      deviceType,
      orientation,
      browser,
      platform: detectedPlatform,
      touchEnabled,
      hoverEnabled,
      keyboardEnabled,
      screenSize: { width: screenWidth, height: screenHeight },
      viewportSize: { width, height },
      pixelRatio,
      colorScheme,
      reducedMotion,
      highContrast,
      supportsBackdrop,
      supportsGrid,
      supportsFlex,
      shouldUseDesktopLayout,
      shouldUseMobileLayout,
      shouldUseTabletLayout,
      windowManagementMode,
      iconDisplayMode,
      navigationMode,
    };
  }, []);

  // Initialize and set up listeners with throttling
  useEffect(() => {
    let timeoutId;
    
    const updateLayout = () => {
      try {
        const newConfig = detectDevice();
        if (newConfig) {
          setLayoutConfig(prevConfig => {
            // Only update if values actually changed to prevent unnecessary re-renders
            const hasChanged = JSON.stringify(prevConfig) !== JSON.stringify(newConfig);
            return hasChanged ? newConfig : prevConfig;
          });
        }
      } catch (error) {
        console.warn('Layout detection error:', error);
      }
    };

    // Throttled update function
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateLayout, 100);
    };

    // Initial detection
    updateLayout();

    // Listen for changes
    const mediaQueries = [
      window.matchMedia('(orientation: portrait)'),
      window.matchMedia('(orientation: landscape)'),
      window.matchMedia('(hover: hover)'),
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(prefers-contrast: high)'),
    ];
    
    // Add event listeners with throttling
    window.addEventListener('resize', throttledUpdate, { passive: true });
    window.addEventListener('orientationchange', throttledUpdate, { passive: true });
    mediaQueries.forEach(mq => mq.addEventListener('change', throttledUpdate));

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', throttledUpdate);
      window.removeEventListener('orientationchange', throttledUpdate);
      mediaQueries.forEach(mq => mq.removeEventListener('change', throttledUpdate));
    };
  }, [detectDevice]);

  // Helper functions
  const getOptimalGridColumns = useCallback(() => {
    const { viewportSize, deviceType, orientation } = layoutConfig;
    
    if (deviceType === 'mobile') {
      return orientation === 'landscape' ? 4 : 3;
    } else if (deviceType === 'tablet') {
      return orientation === 'landscape' ? 5 : 4;
    }
    return 6; // Desktop
  }, [layoutConfig]);

  const getWindowDimensions = useCallback((windowType = 'default', existingWindows = []) => {
    const { viewportSize, deviceType, windowManagementMode } = layoutConfig;
    
    // Calculate stagger offset for multiple windows
    const staggerOffset = existingWindows.length * 30; // 30px offset per existing window
    
    if (windowManagementMode === 'overlay') {
      // Mobile: Full screen with taskbar space
      return {
        width: viewportSize.width,
        height: viewportSize.height - 40,
        x: 0,
        y: 40
      };
    } else if (windowManagementMode === 'simplified') {
      // Tablet: Larger windows with some chrome, with stagger
      const baseX = 20 + staggerOffset;
      const baseY = 60 + staggerOffset;
      
      return {
        width: Math.min(viewportSize.width - 40, 800),
        height: Math.min(viewportSize.height - 80, 600),
        x: Math.min(baseX, viewportSize.width - 800 - 20), // Don't go off screen
        y: Math.min(baseY, viewportSize.height - 600 - 40)
      };
    } else {
      // Desktop: Traditional windowing with stagger
      const baseWidth = windowType === 'settings' ? 900 : 700;
      const baseHeight = windowType === 'settings' ? 600 : 500;
      
      const centerX = Math.max(50, (viewportSize.width - baseWidth) / 2);
      const centerY = Math.max(50, (viewportSize.height - baseHeight) / 2);
      
      // Add stagger offset but keep within bounds
      const staggeredX = centerX + staggerOffset;
      const staggeredY = centerY + staggerOffset;
      
      // Ensure window stays within viewport
      const maxX = viewportSize.width - baseWidth - 50;
      const maxY = viewportSize.height - baseHeight - 50;
      
      return {
        width: Math.min(baseWidth, viewportSize.width - 100),
        height: Math.min(baseHeight, viewportSize.height - 100),
        x: Math.min(staggeredX, maxX),
        y: Math.min(staggeredY, maxY)
      };
    }
  }, [layoutConfig]);

  const getAnimationConfig = useCallback(() => {
    const { reducedMotion, deviceType, browser } = layoutConfig;
    
    if (reducedMotion) {
      return {
        duration: 0,
        easing: 'linear',
        useTransform: false
      };
    }

    // Optimize animations based on device capabilities
    if (deviceType === 'mobile') {
      return {
        duration: 200,
        easing: 'ease-out',
        useTransform: true,
        useWillChange: true
      };
    }

    return {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      useTransform: true,
      useWillChange: false
    };
  }, [layoutConfig]);

  return {
    ...layoutConfig,
    getOptimalGridColumns,
    getWindowDimensions,
    getAnimationConfig,
    // Convenience methods
    isMobile: layoutConfig.shouldUseMobileLayout,
    isTablet: layoutConfig.shouldUseTabletLayout,
    isDesktop: layoutConfig.shouldUseDesktopLayout,
    isLandscape: layoutConfig.orientation === 'landscape',
    isPortrait: layoutConfig.orientation === 'portrait',
    hasTouch: layoutConfig.touchEnabled,
    hasHover: layoutConfig.hoverEnabled,
  };
};

export default useAdaptiveLayout;
