import React from 'react';

// Reusable placeholder component to eliminate code duplication
const PlaceholderWindow = React.memo(({ title, message }) => (
  <div className="p-4 text-white">
    {message || `${title} Coming Soon...`}
  </div>
));

PlaceholderWindow.displayName = 'PlaceholderWindow';

export default PlaceholderWindow;
