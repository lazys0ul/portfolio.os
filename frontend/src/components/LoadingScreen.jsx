import React, { useState, useEffect } from 'react';
import { Terminal, Zap } from 'lucide-react';

const LoadingScreen = () => {
  const [loadingStage, setLoadingStage] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);

  const bootMessages = [
    "[ OK ] Starting Garuda Linux Boot Process",
    "[ OK ] Loading kernel modules...",
    "[ OK ] Mounting filesystems...", 
    "[ OK ] Starting network services...",
    "[ OK ] Loading user session for @lazys0ul",
    "[ OK ] Initializing KDE Plasma Desktop",
    "[ OK ] Loading portfolio application...",
    "[ OK ] Welcome to Pranav's Digital Workspace!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev < bootMessages.length) {
          setTerminalLines(current => [...current, bootMessages[prev]]);
          setCurrentProgress(((prev + 1) / bootMessages.length) * 100);
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-black text-green-400 font-mono overflow-hidden flex flex-col">
      {/* Garuda Linux Header */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-4">
          <Zap className="w-12 h-12 text-blue-400 animate-pulse" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-400">Garuda Linux</h1>
            <p className="text-lg text-gray-400">Performance • Gaming • Aesthetic</p>
          </div>
          <Zap className="w-12 h-12 text-blue-400 animate-pulse" />
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 px-8 py-4">
        <div className="bg-gray-900 rounded-lg p-6 h-full overflow-hidden">
          <div className="flex items-center mb-4">
            <Terminal className="w-5 h-5 mr-2" />
            <span className="text-blue-400 font-semibold">System Boot Log</span>
          </div>
          
          <div className="space-y-2">
            {terminalLines.map((line, index) => (
              <div 
                key={index}
                className="text-green-400 opacity-0 animate-fadeIn"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <span className="text-gray-500 mr-2">[{String(index + 1).padStart(2, '0')}]</span>
                {line}
              </div>
            ))}
            
            {/* Blinking cursor */}
            <div className="text-green-400">
              <span className="text-gray-500 mr-2">[{String(terminalLines.length + 1).padStart(2, '0')}]</span>
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-8 pb-8">
        <div className="bg-gray-800 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${currentProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400">
          <span>Loading Pranav's Portfolio...</span>
          <span>{Math.round(currentProgress)}%</span>
        </div>
      </div>

      {/* Garuda Dragon Animation */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-10">
        <div className="w-32 h-32 border-4 border-blue-500 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Background Matrix Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="matrix-bg opacity-5"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;