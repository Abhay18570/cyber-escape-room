# 🛡️ CYBER ESCAPE ROOM

An interactive cybersecurity awareness platform built with React, featuring gamified learning experiences to teach essential security concepts.

## 🎯 Project Overview

Cyber Escape Room is a comprehensive web application designed for a national-level hackathon. It provides an engaging, game-based approach to learning cybersecurity fundamentals through 6 interactive mini-games.

## ✨ Features

### 🔐 Authentication System
- User registration and login
- Context-based state management
- Protected routes
- Persistent sessions using localStorage

### 🎮 Six Interactive Games

1. **Phishing Email Detector** (100 pts)
   - Identify malicious emails
   - Learn to spot phishing attempts
   - Real-world email examples

2. **Password Strength Simulator** (100 pts)
   - See how quickly passwords can be cracked
   - Understand brute force attacks
   - Learn password complexity importance

3. **Create Strong Password** (150 pts)
   - Live validation feedback
   - Interactive strength meter
   - Real-time requirement checking

4. **SMS Scam Detector** (100 pts)
   - Identify fraudulent text messages
   - Learn common scam patterns
   - Detailed explanations for each message

5. **Security Knowledge Maze** (200 pts)
   - Navigate by answering questions
   - Progressive difficulty
   - Interactive grid-based gameplay

6. **Fix Security Setup** (150 pts)
   - Find security vulnerabilities
   - Click-to-discover gameplay
   - Learn best security practices

### 📊 Dashboard
- Total score tracking
- Completion percentage
- Progress visualization
- Game completion badges
- Animated stats

### 🎨 Design Features
- Dark cyberpunk theme
- Neon glow effects
- Glassmorphism cards
- Smooth animations (Framer Motion)
- Fully responsive design
- Custom Orbitron & Rajdhani fonts

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Extract the project files**
   ```bash
   cd cyber-escape-room
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
cyber-escape-room/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/             # State management
│   │   └── AuthContext.jsx
│   ├── data/                # Game data and configuration
│   │   └── gameData.js
│   ├── games/               # Game components
│   │   ├── PhishingDetector.jsx
│   │   ├── PasswordCracker.jsx
│   │   ├── PasswordCreator.jsx
│   │   ├── SmsScamDetector.jsx
│   │   ├── SecurityMaze.jsx
│   │   └── SecuritySetup.jsx
│   ├── pages/               # Main pages
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Effects:** Canvas Confetti
- **Fonts:** Google Fonts (Orbitron, Rajdhani)

## 🎯 How to Use

1. **Register an Account**
   - Go to the landing page
   - Click "Get Started"
   - Fill in your details

2. **Log In**
   - Use your credentials to log in
   - You'll be redirected to the dashboard

3. **Play Games**
   - Click on any game card
   - Complete the challenges
   - Earn points and badges

4. **Track Progress**
   - View your total score
   - See completion percentage
   - Monitor which games you've finished

## 🎨 Design System

### Color Palette
- **Cyber Blue:** `#0EA5E9`
- **Neon Green:** `#22C55E`
- **Warning Red:** `#EF4444`
- **Purple Accent:** `#8B5CF6`
- **Dark Background:** `#0F172A`
- **Card Dark:** `#1E293B`

### Typography
- **Display:** Orbitron (headings)
- **Body:** Rajdhani (content)
- **Code:** Monospace (passwords, code)

### Visual Effects
- Neon glow shadows
- Glassmorphism cards
- Animated gradients
- Hover scale effects
- Page transitions
- Confetti celebrations

## 🏆 Scoring System

| Game | Maximum Score |
|------|--------------|
| Phishing Detector | 100 |
| Password Cracker | 100 |
| Password Creator | 150 |
| SMS Scam Detector | 100 |
| Security Maze | 200 |
| Security Setup | 150 |
| **Total** | **800** |

## 📱 Responsive Design

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

All games and pages are fully responsive and optimized for all screen sizes.

## 🔒 Security Features

- Client-side authentication simulation
- Protected routes
- Secure password requirements
- Educational security content
- Real-world threat examples

## 🎓 Learning Outcomes

Users will learn:
- How to identify phishing emails
- Password strength importance
- SMS scam recognition
- General cybersecurity best practices
- Common security vulnerabilities
- Threat mitigation strategies

## 🚀 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 🎯 Hackathon Highlights

- ✅ Fully functional games
- ✅ Professional UI/UX
- ✅ Gamified learning approach
- ✅ Complete user flow
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Educational value
- ✅ Production-ready code

## 📝 License

This project is created for educational purposes as part of a hackathon submission.

## 👨‍💻 Development

To modify the games or add new features:

1. Game data is in `src/data/gameData.js`
2. Game components are in `src/games/`
3. Styling uses Tailwind classes
4. Animations use Framer Motion

## 🎉 Credits

Built with passion for cybersecurity education and gamified learning.

---

**Made with ❤️ for the Hackathon**
