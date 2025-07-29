# Portfolio.OS - Pranav Priyadarshi's Interactive Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License" />
</div>

<p align="center">
  <strong>A unique desktop-style portfolio application showcasing my work as a Mathematics & Computing student and Full-Stack Developer at Birla Institute of Technology, Mesra.</strong>
</p>

---

##  Features

###  **Desktop Experience**
- **Window Management**: Complete minimize, maximize, restore functionality with taskbar
- **Interactive Desktop**: Drag-and-drop windows with real-time positioning
- **Dynamic Theming**: Wallpaper-based color themes with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

###  **Core Applications**
- **About Me**: Personal background and journey
- **Projects**: Interactive project showcase with live demos
- **Experience**: Professional and academic experience
- **Skills**: Technical expertise and proficiency levels
- **Contact**: Real email integration via EmailJS
- **Terminal**: Interactive bash-style terminal with custom commands
- **VS Code**: Live code editor integration via GitHub1s
- **Spotify**: Music playlist embedding
- **Settings**: Theme customization and system preferences

###  **Technical Highlights**
- **Real-time Email**: Functional contact form with email delivery
- **Boot/Shutdown Animations**: Linux-inspired system startup/shutdown
- **Dynamic Wallpapers**: Multiple themed wallpapers with color extraction
- **Performance Optimized**: React.memo, throttled operations, efficient re-renders

---

##  Technology Stack

### **Frontend**
- **React 18** - Modern React with hooks and performance optimizations
- **Tailwind CSS** - Utility-first CSS framework with custom themes
- **Lucide React** - Professional icon library
- **EmailJS** - Client-side email integration
- **CRACO** - Create React App Configuration Override

### **Backend**
- **FastAPI** - High-performance Python web framework
- **Uvicorn** - Lightning-fast ASGI server
- **Pydantic** - Data validation and serialization

### **Integrations**
- **GitHub1s** - Live VS Code environment
- **Spotify Web Player** - Music streaming integration
- **Custom Terminal** - Interactive command-line interface

---

## � Project Structure

```
portfolio.os/
├── 📁 frontend/                 # React application
│   ├── 📁 public/              # Static assets and favicon
│   ├── 📁 src/
│   │   ├── 📁 components/      # React components
│   │   │   ├── 📁 windows/     # Application windows
│   │   │   ├── 📄 Desktop.jsx  # Main desktop environment
│   │   │   ├── 📄 WindowManager.jsx # Window management system
│   │   │   ├── 📄 TaskBar.jsx  # Taskbar with app switching
│   │   │   └── 📄 ...
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 styles/          # CSS and theme files
│   │   ├── 📁 config/          # Configuration files
│   │   ├── 📄 mock.js          # Portfolio data and content
│   │   └── 📄 ...
│   └── 📄 package.json
├── 📁 backend/                  # FastAPI server
│   ├── 📄 server.py            # Main server application
│   └── 📄 requirements.txt     # Python dependencies
├── 📄 start-frontend.bat       # Windows startup script
├── 📄 start-frontend.sh        # Unix/Mac startup script
├── 📄 LICENSE                  # MIT License
└── 📄 README.md               # This file
```

---

##  Quick Start

### **Prerequisites**
- **Node.js** v16.0+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://python.org/))
- **npm** or **yarn** package manager

### **Development Setup**

#### **1. Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

**Frontend URL**: `http://localhost:3000`

#### **2. Backend Setup** *(Optional)*
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies (first time only)
pip install -r requirements.txt

# Start FastAPI server
python server.py
```

**Backend API**: `http://localhost:8001`

### **Quick Launch Scripts**
- **Windows**: Double-click `start-frontend.bat`
- **macOS/Linux**: Run `./start-frontend.sh`

---

## EmailJS Configuration

To enable the contact form functionality:

### **Step 1: Create EmailJS Account**
1. Visit [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### **Step 2: Configure Email Service**
1. Go to **Email Services** → **Add New Service**
2. Choose your email provider (Gmail recommended)
3. Connect your email account
4. Copy the **Service ID**

### **Step 3: Create Email Template**
1. Go to **Email Templates** → **Create New Template**
2. Use these template variables:
   ```
   Subject: {{subject}} - New Portfolio Contact
   From: {{from_name}} ({{from_email}})
   Message: {{message}}
   ```
3. Copy the **Template ID**

### **Step 4: Update Configuration**
Edit `frontend/src/config/emailjs.js`:
```javascript
export const emailjsConfig = {
  serviceID: 'your_service_id',
  templateID: 'your_template_id',
  publicKey: 'your_public_key'
};
```

---

## 🎯 Terminal Commands

The integrated terminal supports these commands:

| Command | Description |
|---------|-------------|
| `help` | Display all available commands |
| `about` | Show personal information |
| `projects` | List development projects |
| `skills` | Display technical skills |
| `contact` | Show contact information |
| `whoami` | Current user information |
| `pwd` | Present working directory |
| `ls` | List directory contents |
| `clear` | Clear terminal screen |
| `neofetch` | System information display |

---

##  Wallpaper Themes

The portfolio features dynamic theming with multiple wallpaper categories:

- **🔥 Garuda Linux** - Classic Linux distribution themes
- **⚡ Anime** - Tokyo Ghoul and Bleach inspired themes
- **📚 Manga** - Manga-style artwork themes
- **🌿 Nature** - Natural landscape themes
- **🌌 Space** - Cosmic and galaxy themes

Colors automatically adapt based on the selected wallpaper for a cohesive visual experience.

---

##  Architecture & Performance

### **Key Features**
- **React.memo** optimization for all window components
- **Throttled operations** for smooth drag/resize at 60fps
- **Dynamic theme system** with CSS custom properties
- **Responsive grid layouts** with CSS Container Queries
- **Lazy loading** and code splitting for optimal performance

### **Browser Compatibility**
-  Chrome/Edge 90+
-  Firefox 88+
-  Safari 14+
-  Mobile browsers (iOS Safari, Chrome Mobile)

---

##  Testing & Development

### **Development Commands**
```bash
# Start with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (irreversible)
npm run eject
```

### **Code Quality**
- **ESLint** for code linting
- **Prettier** for code formatting
- **React DevTools** for component debugging

---

##  Deployment

### **Frontend Deployment**
```bash
# Build production version
npm run build

# Deploy the 'build' folder to your hosting service
# (Netlify, Vercel, GitHub Pages, etc.)
```

### **Backend Deployment**
```bash
# Install dependencies
pip install -r requirements.txt

# Run with production server
uvicorn server:app --host 0.0.0.0 --port 8001
```

---

##  Contributing

While this is a personal portfolio, feedback and suggestions are welcome!

1. **Fork** the repository
2. **Create** a feature branch
3. **Commit** your changes
4. **Push** to the branch
5. **Open** a Pull Request

---

##  License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

##  About the Developer

**Pranav Priyadarshi** ([@lazys0ul](https://github.com/lazys0ul))  


### **Connect with Me**
- 📧 **Email**: [pranavpriyadarshi903@gmail.com](mailto:pranavpriyadarshi903@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/pranav0997](https://linkedin.com/in/pranav0997)
- 🐱 **GitHub**: [github.com/lazys0ul](https://github.com/lazys0ul)

---

<div align="center">
  <p><strong>Built with ❤️ using React, FastAPI, and modern web technologies</strong></p>
  <p><em>Experience the portfolio live at your deployed URL</em></p>
</div>
