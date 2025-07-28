import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Phone, Send, User, MessageSquare } from 'lucide-react';
import { personalInfo } from '../../mock';

const ContactWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, this would send email or save to database
    alert('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      value: personalInfo.social.email,
      href: `mailto:${personalInfo.social.email}`,
      color: 'text-red-400 border-red-500/30 bg-red-500/10 hover:bg-red-500/20'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      value: 'linkedin.com/in/pranav0997',
      href: personalInfo.social.linkedin,
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20'
    },
    {
      name: 'GitHub',
      icon: Github,
      value: 'github.com/lazys0ul',
      href: personalInfo.social.github,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-gray-400">Let's connect and discuss opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span>Send a Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Your full name"
                      autoComplete="off"
                      onFocus={(e) => e.target.focus()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me more about your project or opportunity..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-green-400" />
                <span>Connect With Me</span>
              </h2>
              
              <div className="space-y-3">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 group ${link.color}`}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium">{link.name}</div>
                        <div className="text-sm opacity-70">{link.value}</div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Location & Availability */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Location & Availability</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">Current Location</div>
                    <div className="text-gray-300">{personalInfo.location}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-green-400">Available for Work</div>
                    <div className="text-gray-300">Open to internships, freelance projects, and full-time opportunities</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-blue-400">Response Time</div>
                    <div className="text-gray-300">Usually responds within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <h2 className="text-xl font-bold mb-4">Quick Facts</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Student at:</span>
                  <span className="text-blue-300">BIT Mesra</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Field of Study:</span>
                  <span className="text-purple-300">Mathematics & Computing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Graduation:</span>
                  <span className="text-green-300">2029</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interests:</span>
                  <span className="text-orange-300">Web3, AI, DevOps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;