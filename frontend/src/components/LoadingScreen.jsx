import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, HardDrive } from 'lucide-react';

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
    <div className="w-full h-screen h-dvh bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-green-400 font-mono overflow-auto flex flex-col">
      {/* Professional Garuda Linux Header */}
      <div className="flex items-center justify-center py-6 md:py-12 px-4">
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-2xl">
            <HardDrive className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">Garuda Linux</h1>
            <p className="text-sm md:text-lg text-blue-300">Performance • Security • Innovation</p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-2xl">
            <Cpu className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 px-4 md:px-12 py-3 md:py-6 min-h-0">
        <div className="bg-gray-900/80 rounded-xl p-4 md:p-8 h-full overflow-y-auto border border-blue-500/20 shadow-2xl">
          <div className="flex items-center mb-4 md:mb-6">
            <Terminal className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm md:text-lg">System Boot Log</span>
          </div>
          
          <div className="space-y-2 md:space-y-3">
            {terminalLines.map((line, index) => (
              <div 
                key={index}
                className="text-green-400 opacity-0 animate-fadeIn font-medium text-xs md:text-base"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <span className="text-gray-500 mr-2 md:mr-3 font-mono">[{String(index + 1).padStart(2, '0')}]</span>
                {line}
              </div>
            ))}
            
            {/* Professional cursor */}
            <div className="text-green-400 font-medium text-xs md:text-base">
              <span className="text-gray-500 mr-2 md:mr-3 font-mono">[{String(terminalLines.length + 1).padStart(2, '0')}]</span>
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Progress Bar */}
      <div className="px-4 md:px-12 pb-6 md:pb-12">
        <div className="bg-gray-800/60 rounded-full h-3 md:h-4 mb-4 md:mb-6 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 h-3 md:h-4 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${currentProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm md:text-lg text-gray-300">
          <span className="font-medium">Loading Pranav's Portfolio...</span>
          <span className="font-bold text-blue-300">{Math.round(currentProgress)}%</span>
        </div>
      </div>

      {/* Professional spinning logo - hide on mobile */}
      <div className="hidden md:block absolute top-1/2 right-12 transform -translate-y-1/2 opacity-10">
        <div className="w-32 h-32 border-4 border-blue-500/30 rounded-full animate-spin relative">
          <div className="absolute inset-2 border-4 border-transparent border-t-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;