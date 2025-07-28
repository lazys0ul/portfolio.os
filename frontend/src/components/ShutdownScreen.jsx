import React, { useState, useEffect } from 'react';
import { Power, Zap, Terminal } from 'lucide-react';

const ShutdownScreen = () => {
  const [shutdownStage, setShutdownStage] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [progress, setProgress] = useState(0);

  const shutdownMessages = [
    "[ OK ] Saving user session data...",
    "[ OK ] Closing portfolio applications...",
    "[ OK ] Stopping network services...",
    "[ OK ] Unmounting filesystems...",
    "[ OK ] Stopping KDE Plasma Desktop...",
    "[ OK ] System cleanup complete",
    "[ OK ] Thank you for visiting!",
    "System is shutting down..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShutdownStage(prev => {
        if (prev < shutdownMessages.length) {
          setTerminalLines(current => [...current, shutdownMessages[prev]]);
          setProgress(((prev + 1) / shutdownMessages.length) * 100);
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    // Redirect after shutdown animation
    setTimeout(() => {
      window.location.reload();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black text-red-400 font-mono overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-4">
          <Power className="w-12 h-12 text-red-500 animate-bounce" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500">System Shutdown</h1>
            <p className="text-lg text-gray-400">Garuda Linux • @lazys0ul</p>
          </div>
          <Power className="w-12 h-12 text-red-500 animate-bounce" />
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 px-8 py-4">
        <div className="bg-gray-900/80 rounded-lg p-6 h-full overflow-hidden border border-red-500/20">
          <div className="flex items-center mb-4">
            <Terminal className="w-5 h-5 mr-2" />
            <span className="text-red-400 font-semibold">Shutdown Log</span>
          </div>
          
          <div className="space-y-2">
            {terminalLines.map((line, index) => (
              <div 
                key={index}
                className="text-red-400 opacity-0 animate-fadeIn"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <span className="text-gray-500 mr-2">[{String(index + 1).padStart(2, '0')}]</span>
                {line}
              </div>
            ))}
            
            {shutdownStage === shutdownMessages.length && (
              <div className="text-center mt-8 text-2xl text-red-500 animate-pulse">
                <Power className="w-16 h-16 mx-auto mb-4" />
                <div>Goodbye!</div>
                <div className="text-sm text-gray-400 mt-2">Visit again soon</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-8 pb-8">
        <div className="bg-gray-800 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400">
          <span>Shutting down system...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShutdownScreen;