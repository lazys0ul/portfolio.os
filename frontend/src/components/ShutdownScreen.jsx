import React, { useState, useEffect } from 'react';
import { Power, Terminal, Monitor } from 'lucide-react';

const ShutdownScreen = () => {
  const [shutdownStage, setShutdownStage] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  const shutdownMessages = [
    "[ OK ] Saving user session data...",
    "[ OK ] Closing portfolio applications...",
    "[ OK ] Stopping network services...",
    "[ OK ] Unmounting filesystems...",
    "[ OK ] Stopping KDE Plasma Desktop...",
    "[ OK ] System cleanup complete",
    "[ OK ] Thank you for visiting!",
    "System shutdown complete."
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

    // Show final screen after messages complete
    setTimeout(() => {
      setShowFinalScreen(true);
    }, 6000);

    // Redirect after shutdown animation
    setTimeout(() => {
      window.location.reload();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen h-dvh relative overflow-auto">
      {/* Translucent background showing desktop underneath */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-lg">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full text-white font-mono">
        {/* Professional Header */}
        <div className="flex items-center justify-center py-6 md:py-12 px-4">
          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-2xl">
              <Monitor className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold text-white">System Shutdown</h1>
              <p className="text-sm md:text-lg text-gray-300">Garuda Linux • @lazys0ul</p>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-2xl">
              <Power className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>

        {!showFinalScreen ? (
          <>
            {/* Terminal Output */}
            <div className="flex-1 px-4 md:px-12 py-3 md:py-6 min-h-0">
              <div className="bg-gray-900/80 rounded-xl p-4 md:p-8 h-full overflow-y-auto border border-red-500/20 shadow-2xl">
                <div className="flex items-center mb-4 md:mb-6">
                  <Terminal className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-red-400" />
                  <span className="text-red-400 font-semibold text-sm md:text-lg">Shutdown Log</span>
                </div>
                
                <div className="space-y-2 md:space-y-3">
                  {terminalLines.map((line, index) => (
                    <div 
                      key={index}
                      className="text-red-400 opacity-0 animate-fadeIn font-medium text-xs md:text-base"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <span className="text-gray-500 mr-2 md:mr-3 font-mono">[{String(index + 1).padStart(2, '0')}]</span>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-12 pb-12">
              <div className="bg-gray-800/60 rounded-full h-4 mb-6 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-red-500 via-orange-400 to-red-500 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex justify-between text-lg text-gray-300">
                <span className="font-medium">Shutting down system...</span>
                <span className="font-bold text-red-300">{Math.round(progress)}%</span>
              </div>
            </div>
          </>
        ) : (
          /* Professional Final Screen */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-2xl opacity-80">
                <Power className="w-12 h-12 text-gray-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-300 mb-4">System Offline</h2>
              <p className="text-gray-400 text-lg mb-2">Thank you for visiting</p>
              <p className="text-gray-500 text-sm">Portfolio will restart shortly...</p>
            </div>
          </div>
        )}

        {/* Subtle animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full opacity-5">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShutdownScreen;