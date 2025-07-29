import React from 'react'

const VSCodeWindow = React.memo(() => {
    return (
        <div className="h-full w-full bg-gray-800">
            <iframe 
                src="https://github1s.com/lazys0ul/portfolio.os/blob/HEAD/components/ubuntu.js" 
                frameBorder="0" 
                title="VsCode" 
                className="h-full w-full"
                style={{ border: 'none' }}
            />
            {/* this is not my work, but it's amazing! */}
            {/* Here is the link to the original repo: https://github.com/conwnet/github1s */}
        </div>
    );
});

VSCodeWindow.displayName = 'VSCodeWindow';

export default VSCodeWindow;
