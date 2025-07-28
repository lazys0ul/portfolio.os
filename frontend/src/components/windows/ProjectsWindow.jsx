import React, { useState } from 'react';
import { ExternalLink, Github, Code, Play, Calendar, Tag } from 'lucide-react';
import { projects } from '../../mock';

const ProjectsWindow = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Ongoing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const ProjectCard = ({ project }) => (
    <div 
      className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group hover:transform hover:scale-[1.02]"
      onClick={() => setSelectedProject(project)}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-gray-300 mb-4 line-clamp-3">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs border border-blue-500/30"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-gray-400 text-xs">
            +{project.tech.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Tag className="w-4 h-4" />
          <span>{project.category}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Code className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors">
            <ExternalLink className="w-4 h-4 text-blue-300" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProjectDetail = ({ project }) => (
    <div className="p-6 bg-gray-900/50 rounded-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{project.title}</h2>
        <button
          onClick={() => setSelectedProject(null)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <p className="text-gray-300 leading-relaxed mb-4">
            {project.description}
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-2">Project Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">{project.category}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>View Project</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-gray-400">Showcase of my technical work and contributions</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{filteredProjects.length} projects</span>
            </div>
          </div>
        </div>

        {selectedProject ? (
          <ProjectDetail project={selectedProject} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsWindow;