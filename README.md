# Portfolio.OS - Pranav Priyadarshi's Interactive Portfolio

A unique desktop-style portfolio application showcasing my work as a Mathematics & Computing student and Full-Stack Developer.

## 🚀 Features

- **Desktop-like Interface**: Complete with taskbar, sidebar, and window management
- **Interactive Windows**: About, Projects, Experience, Skills, Contact, Terminal, Settings, VS Code, and Spotify
- **Real Email Contact Form**: Powered by EmailJS for actual email delivery
- **Live Code Editor**: VS Code integration via GitHub1s
- **Music Integration**: Spotify playlist embed
- **Real-time Terminal**: Interactive bash-style terminal with custom commands
- **Window Management**: Full minimize, maximize, restore, and taskbar functionality
- **Responsive Design**: Works seamlessly across different screen sizes
- **Modern Tech Stack**: Built with React and styled with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and memo optimization
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **EmailJS** - Contact form email integration
- **Create React App** - Bootstrapped with CRA and CRACO
- **GitHub1s** - Live VS Code integration

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

# 📧 EmailJS Setup Guide for Portfolio Contact Form

## ✅ Current Status
- ✅ EmailJS installed (`emailjs-com`)
- ✅ Contact form updated with EmailJS integration
- ✅ Loading states and error handling added
- ✅ Configuration file created

## 🚀 How to Set Up EmailJS (Step by Step)

### Step 1: Create EmailJS Account
1. Go to **https://www.emailjs.com/**
2. **Sign up** for a free account
3. **Verify your email** address

### Step 2: Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - Or any SMTP service
4. **Connect your email account**
5. **Copy the Service ID** (looks like `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set up your template with these variables:
   ```
   Subject: {{subject}} - New Portfolio Contact
   
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   
   Reply to: {{from_email}}
   ```
4. **Save** and **copy the Template ID** (looks like `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to **Account** settings
2. Find **Public Key** section
3. **Copy your Public Key** (looks like `xxxxxxxxxxxxxxx`)

### Step 5: Update Configuration
Open `src/config/emailjs.js` and replace:
```javascript
export const emailjsConfig = {
  serviceID: 'service_your_actual_id',      // Replace with Step 2
  templateID: 'template_your_actual_id',    // Replace with Step 3  
  publicKey: 'your_actual_public_key'       // Replace with Step 4
};
```

### Step 6: Test the Contact Form
1. **Start your development server** (`npm start`)
2. **Open localhost:3000**
3. **Click Contact** icon on desktop
4. **Fill out the form** with test data
5. **Click "Send Message"**
6. **Check your email inbox** for the message!

## 🔧 Template Variables Available
Your EmailJS template can use these variables:
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message content
- `{{to_email}}` - Your email (pranavpriyadarshi903@gmail.com)

## 📱 How It Works Now
1. **Visitor fills form** → Form data collected
2. **Clicks "Send Message"** → Button shows "Sending..."
3. **EmailJS sends email** → Uses your template
4. **Success** → ✅ "Message sent successfully!"
5. **Error** → ❌ "Failed to send message"
6. **You get email** → In your actual inbox!

## 🎯 Expected Result
After setup, when someone fills your contact form:
- **They see:** Success/error message
- **You receive:** Real email in your inbox with their details
- **Email contains:** Name, email, subject, message from the form

## 🔍 Troubleshooting
- **"Failed to send"** → Check Service ID, Template ID, Public Key
- **No email received** → Check spam folder, verify template setup
- **Template errors** → Ensure all variables match exactly

## 💡 Free Limits
EmailJS free plan includes:
- **200 emails/month**
- **Perfect for portfolio contact forms**
- **No credit card required**

## 🚀 Next Steps
1. **Complete EmailJS setup** using steps above
2. **Test with real data**
3. **Deploy your portfolio**
4. **Start receiving real inquiries!**

---
**Note:** Until you complete the EmailJS setup, the form will show configuration errors. This is normal and expected!


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
- **WindowManager**: Handles window creation, positioning, and interactions with minimize/restore
- **TaskBar**: Shows active windows with clickable buttons for restoration
- **Terminal**: Interactive terminal with custom command system
- **Contact Form**: Real email sending via EmailJS integration
- **VS Code Window**: Live code editor using GitHub1s
- **Spotify Window**: Music playlist integration
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
