import React, { createContext, useContext } from 'react';
import useAdaptiveLayout from '../hooks/useAdaptiveLayout';
import useColorTheme from '../hooks/useColorTheme';

// Create context for adaptive layout
const AdaptiveLayoutContext = createContext(null);

// Provider component
export const AdaptiveLayoutProvider = ({ children, initialWallpaper = null }) => {
  const adaptiveLayout = useAdaptiveLayout();
  const colorTheme = useColorTheme(initialWallpaper);
  
  const contextValue = {
    ...adaptiveLayout,
    ...colorTheme,
  };
  
  return (
    <AdaptiveLayoutContext.Provider value={contextValue}>
      {children}
    </AdaptiveLayoutContext.Provider>
  );
};

// Hook to use adaptive layout
export const useAdaptive = () => {
  const context = useContext(AdaptiveLayoutContext);
  if (!context) {
    throw new Error('useAdaptive must be used within AdaptiveLayoutProvider');
  }
  return context;
};

// Adaptive component that renders different layouts based on capabilities
export const AdaptiveComponent = ({ 
  desktop, 
  tablet, 
  mobile, 
  fallback = null,
  renderCondition = null 
}) => {
  const { shouldUseDesktopLayout, shouldUseTabletLayout, shouldUseMobileLayout } = useAdaptive();
  
  // Custom render condition override
  if (renderCondition) {
    return renderCondition();
  }
  
  // Automatic layout selection
  if (shouldUseDesktopLayout && desktop) {
    return desktop;
  } else if (shouldUseTabletLayout && tablet) {
    return tablet;
  } else if (shouldUseMobileLayout && mobile) {
    return mobile;
  }
  
  // Fallback priority: desktop -> tablet -> mobile -> fallback
  return desktop || tablet || mobile || fallback;
};

// Adaptive container with automatic styling
export const AdaptiveContainer = ({ 
  children, 
  className = '', 
  desktopClass = '', 
  tabletClass = '', 
  mobileClass = '',
  style = {},
  ...props 
}) => {
  const adaptive = useAdaptive();
  
  let adaptiveClass = className;
  if (adaptive.shouldUseDesktopLayout) adaptiveClass += ` ${desktopClass}`;
  else if (adaptive.shouldUseTabletLayout) adaptiveClass += ` ${tabletClass}`;
  else if (adaptive.shouldUseMobileLayout) adaptiveClass += ` ${mobileClass}`;
  
  const adaptiveStyle = {
    ...style,
    // Add adaptive CSS custom properties
    '--viewport-width': `${adaptive.viewportSize.width}px`,
    '--viewport-height': `${adaptive.viewportSize.height}px`,
    '--device-pixel-ratio': adaptive.pixelRatio,
    '--optimal-grid-columns': adaptive.getOptimalGridColumns(),
  };
  
  return (
    <div 
      className={adaptiveClass.trim()} 
      style={adaptiveStyle}
      data-device-type={adaptive.deviceType}
      data-orientation={adaptive.orientation}
      data-platform={adaptive.platform}
      data-browser={adaptive.browser}
      {...props}
    >
      {children}
    </div>
  );
};

// Adaptive window component
export const AdaptiveWindow = React.forwardRef(({ 
  title = 'Window',
  position = { x: 100, y: 100 },
  size = { width: 600, height: 400 },
  isMaximized = false,
  onMinimize,
  onMaximize,
  onClose,
  onFocus,
  onDragStart,
  onResizeStart,
  isDraggable = true,
  isResizable = true,
  children,
  ...props 
}, ref) => {
  const adaptive = useAdaptive();
  const animation = adaptive.getAnimationConfig();
  
  const windowStyle = {
    position: 'absolute',
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 40 : position.y, // Leave space for taskbar
    width: isMaximized ? '100vw' : size.width,
    height: isMaximized ? 'calc(100vh - 40px)' : size.height, // Subtract taskbar height
    transition: adaptive.reducedMotion ? 'none' : `all ${animation.duration}ms ${animation.easing}`,
    zIndex: isMaximized ? 1001 : 1000,
    backgroundColor: adaptive.currentTheme.surface,
    border: `1px solid ${adaptive.currentTheme.primary}`,
    borderRadius: isMaximized ? '0' : '8px',
    boxShadow: isMaximized ? 'none' : `0 25px 50px -12px ${adaptive.getThemedStyles('window').shadowColor}`,
    ...(animation.useWillChange && { willChange: 'transform' }),
  };
  
  const windowClass = `
    adaptive-window
    ${adaptive.windowManagementMode === 'overlay' ? 'window-overlay' : ''}
    ${adaptive.windowManagementMode === 'simplified' ? 'window-simplified' : ''}
    ${adaptive.supportsBackdrop ? 'supports-backdrop' : 'no-backdrop'}
    ${isMaximized ? 'maximized' : ''}
  `.trim();
  
  return (
    <div 
      ref={ref}
      className={`${windowClass} pointer-events-auto`}
      style={windowStyle}
      onClick={onFocus}
      {...props}
    >
      {/* Garuda Linux Style Window Title Bar */}
      <div 
        className="window-titlebar"
        style={{
          height: '36px',
          background: adaptive.getThemedStyles('window').titleBarBackground,
          borderBottom: `2px solid ${adaptive.currentTheme.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          cursor: isDraggable && !isMaximized ? 'move' : 'default',
          userSelect: 'none',
          boxShadow: `0 2px 8px ${adaptive.getThemedStyles('window').shadowColor}`,
          transition: adaptive.isTransitioning ? 'all 500ms ease' : 'none'
        }}
        onMouseDown={isDraggable && !isMaximized ? onDragStart : undefined}
      >
        <span style={{ 
          color: adaptive.currentTheme.primary, 
          fontSize: '14px', 
          fontWeight: '600',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          transition: adaptive.isTransitioning ? 'color 500ms ease' : 'none'
        }}>
          {title}
        </span>
        
        {/* Dynamic Themed Window Controls */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {onMinimize && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                border: `1px solid ${adaptive.currentTheme.primary}`,
                background: adaptive.getThemedStyles('window').titleBarBackground,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: adaptive.currentTheme.primary,
                fontSize: '12px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = `linear-gradient(135deg, ${adaptive.currentTheme.primary}, ${adaptive.currentTheme.secondary})`;
                e.target.style.color = adaptive.currentTheme.background;
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = adaptive.getThemedStyles('window').titleBarBackground;
                e.target.style.color = adaptive.currentTheme.primary;
                e.target.style.transform = 'scale(1)';
              }}
              title="Minimize"
            >
              −
            </button>
          )}
          
          {onMaximize && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                border: `1px solid ${adaptive.currentTheme.primary}`,
                background: adaptive.getThemedStyles('window').titleBarBackground,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: adaptive.currentTheme.primary,
                fontSize: '10px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = `linear-gradient(135deg, ${adaptive.currentTheme.primary}, ${adaptive.currentTheme.secondary})`;
                e.target.style.color = adaptive.currentTheme.background;
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = adaptive.getThemedStyles('window').titleBarBackground;
                e.target.style.color = adaptive.currentTheme.primary;
                e.target.style.transform = 'scale(1)';
              }}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? '⧉' : '□'}
            </button>
          )}
          
          {onClose && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                border: '1px solid #ff4757',
                background: adaptive.getThemedStyles('window').titleBarBackground,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff4757',
                fontSize: '12px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #ff4757, #ff3742)';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = adaptive.getThemedStyles('window').titleBarBackground;
                e.target.style.color = '#ff4757';
                e.target.style.transform = 'scale(1)';
              }}
              title="Close"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      {/* Window Content */}
      <div style={{ 
        height: 'calc(100% - 36px)', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        {children}
      </div>
      
      {/* Resize Handle (bottom-right corner) - Only show when not maximized */}
      {isResizable && !isMaximized && (
        <div
          onMouseDown={onResizeStart}
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '16px',
            height: '16px',
            cursor: 'nw-resize',
            background: 'linear-gradient(-45deg, transparent 0%, transparent 46%, #00d4ff 46%, #00d4ff 54%, transparent 54%)',
            opacity: 0.7,
            zIndex: 10
          }}
          title="Resize"
        />
      )}
    </div>
  );
});

// Adaptive icon grid
export const AdaptiveIconGrid = ({ icons, onIconClick }) => {
  const adaptive = useAdaptive();
  const columns = adaptive.getOptimalGridColumns();
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: adaptive.deviceType === 'mobile' && adaptive.isLandscape ? '8px' : '16px',
    maxWidth: adaptive.deviceType === 'mobile' ? '100%' : '600px',
    margin: '0 auto',
  };
  
  return (
    <AdaptiveContainer
      className="adaptive-icon-grid"
      style={gridStyle}
      data-columns={columns}
      data-icon-mode={adaptive.iconDisplayMode}
    >
      {icons.map((icon, index) => (
        <AdaptiveIcon 
          key={index} 
          icon={icon} 
          onClick={() => onIconClick(icon)}
          index={index}
        />
      ))}
    </AdaptiveContainer>
  );
};

// Adaptive icon component
export const AdaptiveIcon = ({ icon, onClick, index }) => {
  const adaptive = useAdaptive();
  const animation = adaptive.getAnimationConfig();
  const themedStyles = adaptive.getThemedStyles('icon');
  
  const iconClass = `
    adaptive-icon
    ${adaptive.hasTouch ? 'touch-enabled' : ''}
    ${adaptive.hasHover ? 'hover-enabled' : ''}
    ${adaptive.iconDisplayMode}
  `.trim();
  
  const iconStyle = {
    cursor: adaptive.hasTouch ? 'default' : 'pointer',
    transition: adaptive.reducedMotion ? 'none' : `all ${animation.duration}ms ${animation.easing}`,
    WebkitTapHighlightColor: adaptive.hasTouch ? 'rgba(255,255,255,0.1)' : 'transparent',
    touchAction: adaptive.hasTouch ? 'manipulation' : 'auto',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    backgroundColor: `${adaptive.currentTheme.primary}20`,
    border: `1px solid ${adaptive.currentTheme.primary}40`,
    color: adaptive.currentTheme.text,
  };
  
  return (
    <button
      className={iconClass}
      style={iconStyle}
      onClick={onClick}
      data-icon-index={index}
      data-touch-enabled={adaptive.hasTouch}
      onMouseEnter={(e) => {
        if (adaptive.hasHover) {
          e.target.style.backgroundColor = `${adaptive.currentTheme.primary}30`;
          e.target.style.borderColor = `${adaptive.currentTheme.primary}60`;
          e.target.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (adaptive.hasHover) {
          e.target.style.backgroundColor = `${adaptive.currentTheme.primary}20`;
          e.target.style.borderColor = `${adaptive.currentTheme.primary}40`;
          e.target.style.transform = 'translateY(0)';
        }
      }}
    >
      <div 
        className="icon-visual"
        style={{
          background: `linear-gradient(135deg, ${themedStyles.gradientStart}, ${themedStyles.gradientEnd})`,
          boxShadow: `0 4px 12px ${themedStyles.shadowColor}`,
        }}
      >
        {icon.component || icon.icon}
      </div>
      <span className="icon-label" style={{ color: adaptive.currentTheme.textSecondary }}>
        {icon.name}
      </span>
    </button>
  );
};
