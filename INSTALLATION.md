# 🚀 INSTALLATION GUIDE - CYBER ESCAPE ROOM

## Quick Start (3 Simple Steps!)

### Step 1: Install Node.js
If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Install the LTS version (recommended)
- Verify installation: `node --version`

### Step 2: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

This will install all required packages (takes 1-2 minutes).

### Step 3: Start the Application
```bash
npm run dev
```

The app will open at: **http://localhost:5173**

---

## 🎮 First Time Usage

1. **Create Account**
   - Click "Get Started" on landing page
   - Fill in username, email, password
   - Click "Create Account"

2. **Login**
   - Use your credentials to login
   - You'll see the dashboard

3. **Start Playing**
   - Click any game to begin
   - Complete challenges
   - Earn points!

---

## 📦 What's Included

```
cyber-escape-room/
├── src/              # Source code
├── public/           # Static assets
├── package.json      # Dependencies
├── vite.config.js    # Build config
├── tailwind.config.js # Styling config
└── README.md         # Documentation
```

---

## 💻 System Requirements

- **Node.js:** v16.0.0 or higher
- **npm:** v7.0.0 or higher
- **Browser:** Chrome, Firefox, Safari, or Edge (latest versions)
- **RAM:** 2GB minimum
- **Disk Space:** 500MB

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
# Kill the process using port 5173
# Then restart
npm run dev
```

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Clear cache and rebuild
npm cache clean --force
npm install
npm run dev
```

---

## 🌐 Browser Compatibility

- ✅ Chrome (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)

---

## 📱 Mobile Testing

To test on mobile devices:
1. Start the dev server
2. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Access from mobile: `http://YOUR_IP:5173`

---

## 🎯 Demo Credentials

For testing without registration:
- You can create any account
- All data is stored locally in browser

---

## 🚀 Production Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deploy
Upload the `dist/` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

---

## 📞 Support

If you encounter issues:
1. Check Node.js version: `node --version`
2. Clear browser cache
3. Try incognito mode
4. Reinstall dependencies

---

## 🎉 You're Ready!

Open your browser and enjoy learning cybersecurity through gaming!

**Default URL:** http://localhost:5173

---

**Happy Hacking! 🛡️**
