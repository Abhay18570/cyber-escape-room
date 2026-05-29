import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

// Games
import PhishingDetector from './games/PhishingDetector';
import PasswordCracker from './games/PasswordCracker';
import PasswordCreator from './games/PasswordCreator';
import SmsScamDetector from './games/SmsScamDetector';
import SecurityMaze from './games/SecurityMaze';
import SecuritySetup from './games/SecuritySetup';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/game/phishing-detector" element={<ProtectedRoute><PhishingDetector /></ProtectedRoute>} />
            <Route path="/game/password-cracker" element={<ProtectedRoute><PasswordCracker /></ProtectedRoute>} />
            <Route path="/game/password-creator" element={<ProtectedRoute><PasswordCreator /></ProtectedRoute>} />
            <Route path="/game/sms-scam" element={<ProtectedRoute><SmsScamDetector /></ProtectedRoute>} />
            <Route path="/game/security-maze" element={<ProtectedRoute><SecurityMaze /></ProtectedRoute>} />
            <Route path="/game/security-setup" element={<ProtectedRoute><SecuritySetup /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
