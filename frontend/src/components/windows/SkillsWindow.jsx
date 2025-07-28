import React, { useState } from 'react';
import { Code, Database, Server, Smartphone, Globe, Settings, Zap, Users } from 'lucide-react';
import { techStack } from '../../mock';

const SkillsWindow = () => {
  const [activeCategory, setActiveCategory] = useState('languages');

  const skillCategories = [
    { id: 'languages', name: 'Languages', icon: Code, skills: techStack.languages },
    { id: 'frameworks', name: 'Frameworks & Tools', icon: Settings, skills: techStack.frameworks },
    { id: 'devops', name: 'DevOps & Infrastructure', icon: Server, skills: techStack.devops },
    { id: 'softSkills', name: 'Soft Skills', icon: Users, skills: techStack.softSkills }
  ];

  const getSkillLevel = (skill) => {
    // Mock skill levels - in real app this would come from data
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Beginner': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const SkillCard = ({ skill, index }) => {
    const level = getSkillLevel(skill);
    const levelWidth = {
      'Expert': '90%',
      'Advanced': '75%',
      'Intermediate': '60%',
      'Beginner': '40%'
    };

    return (
      <div 
        className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 group hover:transform hover:scale-[1.02]"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">
            {skill}
          </h3>
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            {level}
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${getLevelColor(level)}`}
            style={{ width: levelWidth[level] }}
          ></div>
        </div>
      </div>
    );
  };

  const CategoryTab = ({ category }) => {
    const IconComponent = category.icon;
    return (
      <button
        onClick={() => setActiveCategory(category.id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          activeCategory === category.id
            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <IconComponent className="w-4 h-4" />
        <span>{category.name}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          activeCategory === category.id ? 'bg-blue-500/30' : 'bg-gray-700'
        }`}>
          {category.skills.length}
        </span>
      </button>
    );
  };

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-gray-400">Technologies and tools I work with</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {skillCategories.map((category) => (
            <CategoryTab key={category.id} category={category} />
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {activeSkills.map((skill, index) => (
            <SkillCard key={skill} skill={skill} index={index} />
          ))}
        </div>

        {/* Skill Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-3 mb-3">
              <Code className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{techStack.languages.length}</h3>
                <p className="text-blue-300 text-sm">Languages</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs">Programming languages I'm proficient in</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-3 mb-3">
              <Settings className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{techStack.frameworks.length}</h3>
                <p className="text-green-300 text-sm">Frameworks</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs">Frameworks and tools I use regularly</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
            <div className="flex items-center space-x-3 mb-3">
              <Server className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{techStack.devops.length}</h3>
                <p className="text-orange-300 text-sm">DevOps Tools</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs">Infrastructure and deployment tools</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{techStack.softSkills.length}</h3>
                <p className="text-purple-300 text-sm">Soft Skills</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs">Professional and interpersonal skills</p>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Currently Learning</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <h3 className="text-yellow-300 font-medium mb-2">Advanced React Patterns</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="w-3/4 bg-yellow-500 h-2 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-400">75% Complete</p>
            </div>
            
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="text-blue-300 font-medium mb-2">Blockchain Development</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="w-1/2 bg-blue-500 h-2 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-400">50% Complete</p>
            </div>
            
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h3 className="text-green-300 font-medium mb-2">Machine Learning</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="w-1/3 bg-green-500 h-2 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-400">30% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;