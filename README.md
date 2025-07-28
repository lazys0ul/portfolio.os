# Portfolio.OS - Pranav Priyadarshi's Interactive Portfolio

A unique desktop-style portfolio application showcasing my work as a Mathematics & Computing student and Full-Stack Developer.

## 🚀 Features

- **Desktop-like Interface**: Complete with taskbar, sidebar, and window management
- **Interactive Windows**: About, Projects, Experience, Skills, Contact, Terminal, and Settings
- **Real-time Terminal**: Interactive bash-style terminal with custom commands
- **Responsive Design**: Works seamlessly across different screen sizes
- **Modern Tech Stack**: Built with React and styled with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Create React App** - Bootstrapped with CRA

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## 📁 Project Structure

```
portfolio.os/
├── frontend/           # React frontend application
│   ├── public/        # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── windows/    # Window components
│   │   │   ├── Desktop.jsx # Main desktop component
│   │   │   ├── WindowManager.jsx
│   │   │   ├── TaskBar.jsx
│   │   │   └── ...
│   │   ├── mock.js        # Portfolio data
│   │   └── ...
│   └── package.json
├── backend/           # FastAPI backend
│   ├── server.py     # Main server file
│   └── requirements.txt
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Quick Start (After Initial Setup)
```bash
# Frontend (Terminal 1)
cd frontend && npm start

# Backend (Terminal 2) 
cd backend && python server.py
```

### First Time Setup

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (one-time only):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

#### Backend Setup  
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (one-time only):
   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:
   ```bash
   python server.py
   ```

The backend API will be available at `http://localhost:8001`

### Convenience Scripts
Use the provided batch files for quick startup:
- **Windows**: Double-click `start-frontend.bat`
- **Unix/Mac**: Run `./start-frontend.sh`

## 🎯 Available Commands (Terminal Window)

- `help` - Show available commands
- `about` - Display information about Pranav
- `projects` - List all projects
- `skills` - Show technical skills
- `contact` - Display contact information
- `whoami` - Show current user
- `pwd` - Show current directory
- `ls` - List directory contents
- `clear` - Clear terminal
- `neofetch` - System information

## 🌟 Key Components

- **Desktop**: Main container with taskbar and window management
- **WindowManager**: Handles window creation, positioning, and interactions
- **Terminal**: Interactive terminal with custom command system
- **Projects**: Showcase of development projects
- **Skills**: Technical skills and learning progress
- **About**: Personal information and background

## 📱 Responsive Design

The portfolio is fully responsive and adapts to different screen sizes while maintaining the desktop-like experience.

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are always welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Name**: Pranav Priyadarshi
- **Email**: pranavpriyadarshi903@gmail.com
- **LinkedIn**: [linkedin.com/in/pranav0997](https://linkedin.com/in/pranav0997)
- **GitHub**: [github.com/lazys0ul](https://github.com/lazys0ul)

---

*Built with ❤️ using React and FastAPI*
