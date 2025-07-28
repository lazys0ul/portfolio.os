import React from 'react';
import { 
  User, Briefcase, Building, Code, Mail, Terminal, 
  Folder, Settings, Music, Camera, Globe 
} from 'lucide-react';
import { desktopApps } from '../mock';

const Sidebar = ({ onOpenWindow }) => {
  const iconMap = {
    User, Briefcase, Building, Code, Mail, Terminal, 
    Folder, Settings, Music, Camera, Globe
  };

  const sidebarApps = [
    { name: 'File Manager', icon: 'Folder', category: 'system' },
    { name: 'Terminal', icon: 'Terminal', category: 'system' },
    { name: 'About Me', icon: 'User', category: 'personal' },
    { name: 'Projects', icon: 'Briefcase', category: 'work' },
    { name: 'Experience', icon: 'Building', category: 'work' },
    { name: 'Skills', icon: 'Code', category: 'technical' },
    { name: 'Contact', icon: 'Mail', category: 'communication' },
    { name: 'Music Player', icon: 'Music', category: 'media' },
    { name: 'Settings', icon: 'Settings', category: 'system' }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'system': return 'text-blue-400';
      case 'personal': return 'text-green-400';
      case 'work': return 'text-purple-400';
      case 'technical': return 'text-orange-400';
      case 'communication': return 'text-pink-400';
      case 'media': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="absolute left-0 top-10 bottom-0 w-16 bg-black/60 backdrop-blur-md border-r border-white/10 z-30">
      <div className="flex flex-col items-center py-4 space-y-3">
        {/* Garuda Logo */}
        <div className="w-10 h-10 mb-4 relative">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-sm transform rotate-45"></div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
        </div>

        {/* App Icons */}
        {sidebarApps.map((app, index) => {
          const IconComponent = iconMap[app.icon];
          return (
            <button
              key={index}
              onClick={() => onOpenWindow(app.name)}
              className={`w-12 h-12 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center justify-center group relative ${getCategoryColor(app.category)}`}
              title={app.name}
            >
              <IconComponent className="w-6 h-6" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 bg-black/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                {app.name}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45"></div>
              </div>

              {/* Active indicator */}
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-8 h-px bg-white/20 my-2"></div>

        {/* Favorites/Pinned */}
        <button
          onClick={() => onOpenWindow('Projects')}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-400 transition-all duration-200 flex items-center justify-center group relative"
          title="Featured Projects"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-sm flex items-center justify-center">
            <Briefcase className="w-3 h-3 text-white" />
          </div>
        </button>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* User Avatar at Bottom */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20 flex items-center justify-center text-white font-bold text-lg mb-2">
          P
        </div>
      </div>

      {/* Sidebar Resize Handle */}
      <div className="absolute right-0 top-0 bottom-0 w-1 hover:w-2 bg-transparent hover:bg-blue-500/50 cursor-col-resize transition-all duration-200"></div>
    </div>
  );
};

export default Sidebar;