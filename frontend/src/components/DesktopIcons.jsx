import React from 'react';
import { ExternalLink, Github, Linkedin, Mail, FileText, Download, User, Briefcase, Building, Code, Terminal, Folder, Settings, Code2 } from 'lucide-react';
import { personalInfo, desktopApps } from '../mock';

const DesktopIcons = ({ onOpenWindow }) => {
  // Icon mapping for lucide-react icons
  const iconMap = {
    User: User,
    Briefcase: Briefcase,
    Building: Building,
    Code: Code,
    Mail: Mail,
    Terminal: Terminal,
    Folder: Folder,
    Settings: Settings,
    Code2: Code2
  };

  // Generate desktop shortcuts from desktopApps
  const desktopShortcuts = desktopApps.map((app, index) => {
    const IconComponent = iconMap[app.icon];
    return {
      name: app.name,
      icon: IconComponent ? <IconComponent className="w-8 h-8" /> : '📁',
      action: () => onOpenWindow(app.name),
      position: getAppPosition(index, app.category)
    };
  });

  // Function to calculate app positions based on category
  function getAppPosition(index, category) {
    const positions = {
      personal: [
        { top: '15%', right: '8%' }
      ],
      work: [
        { top: '30%', right: '8%' },
        { top: '45%', right: '8%' }
      ],
      technical: [
        { top: '60%', right: '8%' }
      ],
      communication: [
        { top: '75%', right: '8%' }
      ],
      system: [
        { top: '20%', left: '5%' },
        { top: '35%', left: '5%' },
        { top: '50%', left: '5%' }
      ],
      development: [
        { top: '65%', left: '5%' }
      ]
    };

    const categoryPositions = positions[category] || [{ top: '20%', left: '20%' }];
    const positionIndex = desktopApps.filter(app => app.category === category).findIndex(app => app.name === desktopApps[index].name);
    return categoryPositions[positionIndex] || categoryPositions[0];
  }

  // Add additional shortcuts (GitHub, LinkedIn)
  const additionalShortcuts = [
    {
      name: 'GitHub',
      icon: <Github className="w-8 h-8" />,
      action: () => window.open(personalInfo.social.github, '_blank'),
      position: { bottom: '15%', right: '5%' }
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-8 h-8" />,
      action: () => window.open(personalInfo.social.linkedin, '_blank'),
      position: { bottom: '15%', right: '12%' }
    }
  ];

  const allShortcuts = [...desktopShortcuts, ...additionalShortcuts];

  const DesktopIcon = ({ shortcut }) => (
    <button
      onClick={shortcut.action}
      className="flex flex-col items-center space-y-1 group"
      style={{ 
        position: 'absolute',
        ...shortcut.position
      }}
    >
      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-200 flex items-center justify-center group-hover:scale-110 shadow-lg">
        {typeof shortcut.icon === 'string' ? (
          <span className="text-3xl">{shortcut.icon}</span>
        ) : (
          <div className="text-white">{shortcut.icon}</div>
        )}
      </div>
      <span className="text-white text-xs font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {shortcut.name}
      </span>
    </button>
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="relative w-full h-full pointer-events-none">
        {allShortcuts.map((shortcut, index) => (
          <div key={index} className="pointer-events-auto">
            <DesktopIcon shortcut={shortcut} />
          </div>
        ))}
      </div>

      {/* Floating Action Button for Quick Access */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <button
          onClick={() => onOpenWindow('About Me')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 font-medium"
        >
          <span>Welcome to my portfolio</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Desktop Watermark */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <div className="text-white/30 text-xs font-mono">
          <div>@lazys0ul • Mathematics & Computing</div>
          <div>Birla Institute of Technology, Mesra</div>
        </div>
      </div>
    </div>
  );
};

export default DesktopIcons;