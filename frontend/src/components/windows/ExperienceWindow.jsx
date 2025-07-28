import React from 'react';
import { Building, Calendar, MapPin, ExternalLink, Briefcase } from 'lucide-react';
import { experience } from '../../mock';

const ExperienceWindow = () => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'Current': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Internship': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Freelance': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Business': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const ExperienceCard = ({ exp, index }) => (
    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 group hover:transform hover:scale-[1.01]">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {exp.title}
              </h3>
              <p className="text-blue-300 font-medium">{exp.company}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs border ${getTypeColor(exp.type)} whitespace-nowrap`}>
              {exp.type}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 mb-3 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{exp.duration}</span>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            {exp.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Experience
          </h1>
          <p className="text-gray-400">My journey in technology and business</p>
        </div>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>Career Highlights</span>
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div>
                <span className="text-green-300 font-medium">Currently working</span> at Soul AI developing AI-powered features
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div>
                <span className="text-blue-300 font-medium">Internship completed</span> at Unified Mentor building web applications
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <div>
                <span className="text-purple-300 font-medium">Freelancing success</span> - 50+ projects with 5-star ratings
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <div>
                <span className="text-orange-300 font-medium">Entrepreneurial venture</span> - Generated ₹19K+ in single day sales
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceWindow;