import React from 'react';
import { User, MapPin, GraduationCap, Heart, Target, Calendar } from 'lucide-react';
import { personalInfo, education } from '../../mock';

const AboutWindow = React.memo(() => {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-start space-x-6 mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl font-bold border-4 border-white/20 shadow-xl">
            P
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <p className="text-xl text-blue-300 mb-2">{personalInfo.username}</p>
            <p className="text-lg text-gray-300 mb-4">{personalInfo.title}</p>
            <p className="text-gray-400 italic">{personalInfo.tagline}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">About Me</h2>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              Hi, I'm <strong className="text-white">Pranav Priyadarshi</strong> (aka <code className="bg-gray-800 px-2 py-1 rounded text-blue-300">@lazys0ul</code>), 
              an Integrated MSc student in <strong className="text-purple-300">Mathematics & Computing</strong> at 
              <strong className="text-blue-300"> Birla Institute of Technology, Mesra</strong> (2024–2029).
            </p>
            <p>
              I'm a builder at heart—whether crafting elegant web applications, architecting decentralized systems, 
              or prototyping data-driven tools—and I believe <strong className="text-green-400">math and technology are powerful levers to solve real human problems</strong>.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center space-x-2 mb-4">
            <GraduationCap className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-semibold">Education</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300">{education.degree}</h3>
              <p className="text-gray-300">{education.institution}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{education.duration}</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                  {education.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Focus */}
        <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-semibold">Current Focus</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {personalInfo.currentFocus.map((focus, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-gray-300">{focus}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Passions */}
        <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-semibold">Passions</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {personalInfo.passions.map((passion, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-3 py-2 rounded-full text-sm border border-pink-500/30 hover:border-pink-400 transition-colors"
              >
                {passion}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">Location</h2>
          </div>
          <p className="text-gray-300">{personalInfo.location}</p>
          <p className="text-blue-300 text-sm mt-2">Open to opportunities and collaborations</p>
        </div>
      </div>
    </div>
  );
});

export default AboutWindow;