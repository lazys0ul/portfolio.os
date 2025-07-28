import React from 'react';

const SpotifyWindow = () => {
    return (
        <div className="h-full w-full bg-gray-800">
            <iframe 
                style={{borderRadius: '12px'}}
                src="https://open.spotify.com/embed/playlist/13EjIx5ZYJDz3HZmymXY0i?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="h-full w-full bg-ub-cool-grey"
            />
        </div>
    );
};

export default SpotifyWindow;

export const displaySpotify = () => {
    return <SpotifyWindow />;
};
