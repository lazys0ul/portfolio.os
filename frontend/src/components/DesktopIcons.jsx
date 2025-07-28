import React from 'react';
import { ExternalLink, Github, Linkedin, Mail, FileText, Download } from 'lucide-react';
import { personalInfo } from '../mock';

const DesktopIcons = ({ onOpenWindow }) => {
  const desktopShortcuts = [
    {
      name: 'About Pranav',
      icon: '👤',
      action: () => onOpenWindow('About Me'),
      position: { top: '15%', right: '8%' }
    },
    {
      name: 'Projects',
      icon: '🚀',
      action: () => onOpenWindow('Projects'),
      position: { top: '30%', right: '8%' }
    },
    {
      name: 'Experience',
      icon: '💼',
      action: () => onOpenWindow('Experience'),
      position: { top: '45%', right: '8%' }
    },
    {
      name: 'Skills',
      icon: '⚡',
      action: () => onOpenWindow('Skills'),
      position: { top: '60%', right: '8%' }
    },
    {
      name: 'Contact Me',
      icon: '📧',
      action: () => onOpenWindow('Contact'),
      position: { top: '75%', right: '8%' }
    },
    {
      name: 'Terminal',
      icon: '💻',
      action: () => onOpenWindow('Terminal'),
      position: { top: '20%', left: '5%' }
    },
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
        {desktopShortcuts.map((shortcut, index) => (
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