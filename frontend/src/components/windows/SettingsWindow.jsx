import React, { useState } from 'react';
import { Settings, Monitor, Volume2, Wifi, Battery, Smartphone, Info, Image, Palette, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import { systemInfo, wallpapers } from '../../mock';

const SettingsWindow = React.memo(({ currentWallpaper, onChangeWallpaper }) => {
  const [activeTab, setActiveTab] = useState('system');

  const tabs = [
    { id: 'system', name: 'System', icon: Monitor },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'audio', name: 'Audio', icon: Volume2 },
    { id: 'network', name: 'Network', icon: Wifi },
    { id: 'power', name: 'Power', icon: Battery },
    { id: 'about', name: 'About', icon: Info }
  ];

  const SystemTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <span>Device Information</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Device:</span>
            <div className="text-white font-medium">{systemInfo.device}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Operating System:</span>
            <div className="text-white font-medium">{systemInfo.os}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Kernel:</span>
            <div className="text-white font-medium">{systemInfo.kernel}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Desktop:</span>
            <div className="text-white font-medium">{systemInfo.desktop}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Memory:</span>
            <div className="text-white font-medium">{systemInfo.memory}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Storage:</span>
            <div className="text-white font-medium">{systemInfo.storage}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Processor:</span>
            <div className="text-white font-medium">{systemInfo.processor}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Graphics:</span>
            <div className="text-white font-medium">{systemInfo.graphics}</div>
          </div>
        </div>
      </div>

      {/* System Performance */}
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-green-400" />
          <span>Performance Monitor</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">CPU Usage</span>
              <span className="text-green-400">23%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="w-1/4 bg-green-500 h-2 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Memory Usage</span>
              <span className="text-blue-400">4.2GB / 8GB</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="w-1/2 bg-blue-500 h-2 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Storage Usage</span>
              <span className="text-orange-400">128GB / 256GB</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="w-1/2 bg-orange-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AppearanceTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Image className="w-5 h-5 text-purple-400" />
          <span>Wallpapers</span>
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {wallpapers.map((wallpaper, index) => (
            <button
              key={index}
              onClick={() => onChangeWallpaper?.(wallpaper)}
              className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                currentWallpaper?.name === wallpaper.name
                  ? 'border-blue-400 scale-105'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div
                className="w-full h-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${wallpaper.url})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-white text-xs font-medium truncate">{wallpaper.name}</p>
                <p className="text-gray-300 text-xs">{wallpaper.theme}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Current Theme:</span>
            <span className="text-white capitalize">{currentWallpaper?.theme || 'Dark'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Accent Color:</span>
            <span className="text-white capitalize">{currentWallpaper?.accent || 'Blue'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Active Wallpaper:</span>
            <span className="text-white">{currentWallpaper?.name || 'Space Nebula'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AudioTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Audio Settings</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Output Device:</span>
              <span className="text-blue-400">Built-in Speakers</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Input Device:</span>
              <span className="text-green-400">Built-in Microphone</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Audio Quality:</span>
              <span className="text-purple-400">24-bit, 48kHz</span>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-blue-300 text-sm">💡 Audio controls are available in the system panel (top-right)</p>
        </div>
      </div>
    </div>
  );

  const NetworkTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Network Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">WiFi Connected</span>
            </div>
            <span className="text-green-300">Excellent</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Network:</span>
              <div className="text-white">Garuda_Network_5G</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">IP Address:</span>
              <div className="text-white">192.168.1.42</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Download:</span>
              <div className="text-green-400">150 Mbps</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Upload:</span>
              <div className="text-blue-400">50 Mbps</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PowerTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Power Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <span className="text-gray-300">Battery Level:</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-3 bg-gray-700 rounded-full">
                <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 font-semibold">85%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Power Mode:</span>
              <div className="text-blue-400">Balanced</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Charging:</span>
              <div className="text-green-400">AC Adapter</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Time Remaining:</span>
              <div className="text-orange-400">4h 23m</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Screen Brightness:</span>
              <div className="text-yellow-400">80%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">About This Portfolio</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Version:</span>
              <div className="text-white font-medium">2.0.0</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Build:</span>
              <div className="text-blue-400">2025.07.28</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Framework:</span>
              <div className="text-green-400">React 19</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Styling:</span>
              <div className="text-purple-400">Tailwind CSS</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Icons:</span>
              <div className="text-orange-400">Lucide React</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Theme:</span>
              <div className="text-cyan-400">Garuda Inspired</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-white font-medium mb-2">Created by</h4>
            <p className="text-blue-300">Pranav Priyadarshi (@lazys0ul)</p>
            <p className="text-gray-400 text-sm mt-1">Mathematics & Computing Student</p>
            <p className="text-gray-400 text-sm">Birla Institute of Technology, Mesra</p>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Features</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Interactive desktop environment</li>
              <li>• Working window management system</li>
              <li>• Dynamic wallpaper & theme changing</li>
              <li>• Functional terminal emulator</li>
              <li>• System performance monitoring</li>
              <li>• Professional loading & shutdown screens</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'system': return <SystemTab />;
      case 'appearance': return <AppearanceTab />;
      case 'audio': return <AudioTab />;
      case 'network': return <NetworkTab />;
      case 'power': return <PowerTab />;
      case 'about': return <AboutTab />;
      default: return <SystemTab />;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="text-gray-400">Configure your system preferences and appearance</p>
        </div>

        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SettingsWindow;