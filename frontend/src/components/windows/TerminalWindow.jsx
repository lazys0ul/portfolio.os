import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';
import { personalInfo, projects, experience, techStack } from '../../mock';

const TerminalWindow = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'Welcome to Pranav\'s Interactive Terminal',
    'Type "help" to see available commands',
    ''
  ]);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto focus on input when window opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => [
        'Available commands:',
        '  help      - Show this help message',
        '  about     - Display information about Pranav',
        '  projects  - List all projects',
        '  skills    - Show technical skills',
        '  contact   - Display contact information',
        '  whoami    - Show current user',
        '  pwd       - Show current directory',
        '  ls        - List directory contents',
        '  clear     - Clear terminal',
        '  neofetch  - System information',
        '  cat <file> - Display file contents',
        '  echo <text> - Display text',
        ''
      ]
    },
    about: {
      description: 'Display information about Pranav',
      execute: () => [
        `Name: ${personalInfo.name}`,
        `Username: ${personalInfo.username}`,
        `Title: ${personalInfo.title}`,
        `Location: ${personalInfo.location}`,
        `Education: ${personalInfo.bio.match(/Mathematics & Computing.*?\(.*?\)/)?.[0] || 'MSc Mathematics & Computing'}`,
        `Current Focus: ${personalInfo.currentFocus.join(', ')}`,
        ''
      ]
    },
    projects: {
      description: 'List all projects',
      execute: () => [
        'Projects:',
        ...projects.map((project, index) => 
          `  ${index + 1}. ${project.title} [${project.status}]`
        ),
        '',
        'Use "cat projects/<name>" for more details',
        ''
      ]
    },
    skills: {
      description: 'Show technical skills',
      execute: () => [
        'Technical Skills:',
        '',
        'Languages:',
        ...techStack.languages.map(skill => `  - ${skill}`),
        '',
        'Frameworks & Tools:',
        ...techStack.frameworks.slice(0, 8).map(skill => `  - ${skill}`),
        '',
        'DevOps & Infrastructure:',
        ...techStack.devops.map(skill => `  - ${skill}`),
        ''
      ]
    },
    contact: {
      description: 'Display contact information',
      execute: () => [
        'Contact Information:',
        `Email: ${personalInfo.social.email}`,
        `LinkedIn: ${personalInfo.social.linkedin}`,
        `GitHub: ${personalInfo.social.github}`,
        `Location: ${personalInfo.location}`,
        ''
      ]
    },
    whoami: {
      description: 'Show current user',
      execute: () => [`${personalInfo.username}`, '']
    },
    pwd: {
      description: 'Show current directory',
      execute: () => [currentPath, '']
    },
    ls: {
      description: 'List directory contents',
      execute: () => [
        'total 8',
        'drwxr-xr-x  2 pranav pranav 4096 Jul 28 05:34 projects/',
        'drwxr-xr-x  2 pranav pranav 4096 Jul 28 05:34 experience/',
        '-rw-r--r--  1 pranav pranav  256 Jul 28 05:34 about.txt',
        '-rw-r--r--  1 pranav pranav  128 Jul 28 05:34 contact.txt',
        '-rw-r--r--  1 pranav pranav  512 Jul 28 05:34 skills.txt',
        ''
      ]
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setHistory([]);
        return [];
      }
    },
    neofetch: {
      description: 'System information',
      execute: () => [
        '                    ./+o+-       pranav@garuda-linux',
        '            yyyyy- -yyyyyy+      ─────────────────────',
        '         ://+//////-yyyyyyo      OS: Garuda Linux x86_64',
        '     .++ .:/++++++/-.+sss/`      Host: POCO M4 5G',
        '   .:++o:  /++++++++/:--:/-      Kernel: 6.1.0-garuda',
        '  o:+o+:++.`..```.-/oo+++++/     Uptime: 2 hours, 34 mins',
        ' .:+o:+o/.          `+sssoo+/    Packages: 1247 (pacman)',
        '..++:+o+           /++++++++/    Shell: bash 5.1.16',
        '/++++/o+          /+++++++++/    Resolution: 1920x1080',
        '/+++++o/         .+++++++++/     DE: KDE Plasma 5.27',
        '//++++o++.        ++++++++/      WM: KWin',
        ' .+++++o+++.       +++++/        Theme: Garuda-dark',
        '  `+++++oooo+.      .++/         Icons: Papirus-dark',
        '    `++oo+++o++.     /           Terminal: konsole',
        '      `+++o+++.      .           CPU: MediaTek Dimensity 700',
        '        .++.                     GPU: Mali-G57 MC2',
        '                                 Memory: 4.2GiB / 8.0GiB',
        ''
      ]
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [mainCommand, ...args] = trimmedCmd.split(' ');
    
    if (commands[mainCommand]) {
      return commands[mainCommand].execute(args);
    } else if (trimmedCmd.startsWith('echo ')) {
      return [cmd.slice(5), ''];
    } else if (trimmedCmd.startsWith('cat ')) {
      const filename = args[0];
      if (filename === 'about.txt') {
        return commands.about.execute();
      } else if (filename === 'contact.txt') {
        return commands.contact.execute();
      } else if (filename === 'skills.txt') {
        return commands.skills.execute();
      } else {
        return [`cat: ${filename}: No such file or directory`, ''];
      }
    } else if (trimmedCmd) {
      return [`bash: ${trimmedCmd}: command not found`, ''];
    }
    return [''];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const prompt = `${personalInfo.username}@garuda-linux:${currentPath}$ ${input}`;
    const output = handleCommand(input);
    
    setHistory(prev => [...prev, prompt, ...output]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div className="h-full bg-black text-green-400 font-mono overflow-hidden flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 bg-gray-900 px-4 py-2 border-b border-gray-700">
        <Terminal className="w-4 h-4" />
        <span className="text-sm text-gray-300">Terminal - Garuda Linux</span>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-1">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line.startsWith(`${personalInfo.username}@`) ? (
                <span>
                  <span className="text-blue-400">{personalInfo.username}</span>
                  <span className="text-white">@</span>
                  <span className="text-green-400">garuda-linux</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-300">{line.match(/:(.+?)\$/)?.[1] || currentPath}</span>
                  <span className="text-white">$ </span>
                  <span className="text-yellow-300">{line.split('$ ')[1]}</span>
                </span>
              ) : (
                <span className={line.includes('command not found') ? 'text-red-400' : ''}>{line}</span>
              )}
            </div>
          ))}
        </div>

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-blue-400">{personalInfo.username}</span>
          <span className="text-white">@</span>
          <span className="text-green-400">garuda-linux</span>
          <span className="text-white">:</span>
          <span className="text-blue-300">{currentPath}</span>
          <span className="text-white">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-yellow-300 outline-none caret-green-400 ml-1 border-none"
            spellCheck={false}
            autoComplete="off"
            autoFocus
            onFocus={(e) => e.target.focus()}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalWindow;