const handleScroll = useCallback((e) => {
  // Use requestAnimationFrame to defer scroll position saving
  requestAnimationFrame(() => {
    scrollPositions.current[windowId] = e.target.scrollTop;
  });
}, [windowId]);