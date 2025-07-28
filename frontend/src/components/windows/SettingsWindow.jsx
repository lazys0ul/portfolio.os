import React, { useState } from 'react';
import { Settings, Monitor, Volume2, Wifi, Battery, Smartphone, Info } from 'lucide-react';
import { systemInfo } from '../../mock';

const SettingsWindow = () => {
  const [activeTab, setActiveTab] = useState('system');

  const tabs = [
    { id: 'system', name: 'System', icon: Monitor },
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
          <div>
            <span className="text-gray-400">Device:</span>
            <div className="text-white font-medium">{systemInfo.device}</div>
          </div>
          <div>
            <span className="text-gray-400">Operating System:</span>
            <div className="text-white font-medium">{systemInfo.os}</div>
          </div>
          <div>
            <span className="text-gray-400">Kernel:</span>
            <div className="text-white font-medium">{systemInfo.kernel}</div>
          </div>
          <div>
            <span className="text-gray-400">Desktop:</span>
            <div className="text-white font-medium">{systemInfo.desktop}</div>
          </div>
          <div>
            <span className="text-gray-400">Memory:</span>
            <div className="text-white font-medium">{systemInfo.memory}</div>
          </div>
          <div>
            <span className="text-gray-400">Storage:</span>
            <div className="text-white font-medium">{systemInfo.storage}</div>
          </div>
          <div>
            <span className="text-gray-400">Processor:</span>
            <div className="text-white font-medium">{systemInfo.processor}</div>
          </div>
          <div>
            <span className="text-gray-400">Graphics:</span>
            <div className="text-white font-medium">{systemInfo.graphics}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const AudioTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Audio Settings</h3>
        <div className="text-gray-400 text-sm">
          Audio settings are controlled through the system panel in the taskbar.
        </div>
      </div>
    </div>
  );

  const NetworkTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Network Status</h3>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-400">Connected</span>
        </div>
        <div className="text-sm text-gray-400">
          Connection: WiFi • Signal Strength: Strong
        </div>
      </div>
    </div>
  );

  const PowerTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Power Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Battery Level:</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-700 rounded-full">
                <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400">80%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Power Mode:</span>
            <span className="text-blue-400">Balanced</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold mb-4">About This Portfolio</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-400">Version:</span>
            <div className="text-white">1.0.0</div>
          </div>
          <div>
            <span className="text-gray-400">Built with:</span>
            <div className="text-white">React, Tailwind CSS, Lucide Icons</div>
          </div>
          <div>
            <span className="text-gray-400">Theme:</span>
            <div className="text-white">Garuda Linux Inspired</div>
          </div>
          <div>
            <span className="text-gray-400">Creator:</span>
            <div className="text-white">Pranav Priyadarshi (@lazys0ul)</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'system': return <SystemTab />;
      case 'audio': return <AudioTab />;
      case 'network': return <NetworkTab />;
      case 'power': return <PowerTab />;
      case 'about': return <AboutTab />;
      default: return <SystemTab />;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="text-gray-400">Configure your system preferences</p>
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
};

export default SettingsWindow;