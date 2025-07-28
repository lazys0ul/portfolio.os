import React, { useEffect, useRef, forwardRef } from 'react';

const ScrollContainer = forwardRef(({ children, windowId, onScroll }, ref) => {
  const containerRef = useRef();
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Handle scroll with minimal overhead
    const handleScrollEvent = (e) => {
      if (isScrollingRef.current) return;
      
      isScrollingRef.current = true;
      
      // Call parent scroll handler
      if (onScroll) {
        onScroll(e);
      }
      
      // Reset scrolling flag
      requestAnimationFrame(() => {
        isScrollingRef.current = false;
      });
    };

    // Use passive listener for better performance
    container.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScrollEvent);
    };
  }, [onScroll]);

  // Forward ref
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(containerRef.current);
      } else {
        ref.current = containerRef.current;
      }
    }
  }, [ref]);

  return (
    <div 
      ref={containerRef}
      data-window-id={windowId}
      className="scroll-container h-full pb-8 overflow-y-auto relative"
      style={{ 
        height: 'calc(100% - 40px)',
        // Minimal performance optimizations
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      }}
    >
      {children}
    </div>
  );
});

ScrollContainer.displayName = 'ScrollContainer';

export default ScrollContainer;
