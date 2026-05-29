import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, CheckCircle, XCircle, Home, Trophy, Eye, EyeOff,
  RefreshCw, Copy, Check, AlertTriangle, Info, Zap, Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AppLayout from '../layouts/AppLayout';
import confetti from 'canvas-confetti';

const COMMON_WORDS = ['password', 'passw0rd', 'qwerty', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'login', 'admin', 'user', 'test', 'hello', 'sunshine', 'abc123', 'iloveyou', 'trustno1', 'shadow', 'michael', 'jessica', 'batman', 'superman'];
const KEYBOARD_PATTERNS = ['qwerty', 'asdf', 'zxcv', '1234', '12345', '123456', '1234567', '12345678', 'qwertyuiop', 'asdfghjkl'];
const SEQ_CHARS = ['abcdef', 'bcdefg', 'cdefgh', 'defghi', '012345', '123456', '234567', '345678', '456789'];
const YEAR_RE = /(?:19|20)\d{2}/;

const analyzePassword = (password) => {
  const checks = {
    length8: password.length >= 8,
    length12: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()\-_=+[\]{}|;:'",.<>?/`~\\]/.test(password),
    noCommonWord: !COMMON_WORDS.some(w => password.toLowerCase().includes(w)),
    noKeyboardPattern: !KEYBOARD_PATTERNS.some(p => password.toLowerCase().includes(p)),
    noSequential: !SEQ_CHARS.some(s => password.toLowerCase().includes(s)),
    noYearPattern: !YEAR_RE.test(password),
    noRepeated: !/(.)\1{2,}/.test(password),
  };

  const suggestions = [];
  if (!checks.length8) suggestions.push("Make your password at least 8 characters long");
  if (!checks.length12) suggestions.push("Use 12+ characters for a stronger password");
  if (!checks.uppercase) suggestions.push("Add uppercase letters (A–Z)");
  if (!checks.lowercase) suggestions.push("Add lowercase letters (a–z)");
  if (!checks.number) suggestions.push("Include numbers (0–9)");
  if (!checks.special) suggestions.push("Use special characters like !@#$%^&*");
  if (!checks.noCommonWord) suggestions.push("Avoid common words like 'password123'");
  if (!checks.noKeyboardPattern) suggestions.push("Avoid keyboard patterns like 'qwerty' or 'asdf'");
  if (!checks.noSequential) suggestions.push("Avoid sequential characters like 'abcdef'");
  if (!checks.noYearPattern) suggestions.push("Avoid year patterns like '2024' or '1990'");
  if (!checks.noRepeated) suggestions.push("Avoid repeated characters like 'aaa' or '111'");

  const metCount = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;
  const score = Math.round((metCount / total) * 100);

  let level, levelColor, levelGradient;
  if (score < 20) { level = 'Very Weak'; levelColor = 'text-red-500'; levelGradient = 'from-red-600 to-red-500'; }
  else if (score < 40) { level = 'Weak'; levelColor = 'text-orange-500'; levelGradient = 'from-orange-600 to-orange-400'; }
  else if (score < 60) { level = 'Medium'; levelColor = 'text-yellow-400'; levelGradient = 'from-yellow-500 to-yellow-400'; }
  else if (score < 80) { level = 'Strong'; levelColor = 'text-lime-400'; levelGradient = 'from-lime-500 to-lime-400'; }
  else { level = 'Very Strong'; levelColor = 'text-cyber-green'; levelGradient = 'from-cyber-green to-emerald-400'; }

  return { checks, suggestions, score, level, levelColor, levelGradient };
};

const generateSecurePassword = () => {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const nums = '23456789';
  const special = '!@#$%&*-_+=?';
  const all = upper + lower + nums + special;
  let pwd = '';
  // Ensure at least one of each
  pwd += upper[Math.floor(Math.random() * upper.length)];
  pwd += lower[Math.floor(Math.random() * lower.length)];
  pwd += nums[Math.floor(Math.random() * nums.length)];
  pwd += special[Math.floor(Math.random() * special.length)];
  for (let i = 0; i < 12; i++) pwd += all[Math.floor(Math.random() * all.length)];
  return pwd.split('').sort(() => Math.random() - 0.5).join('');
};

const securityTips = [
  { icon: '🔑', tip: "Use a different password for every account — password managers make this easy." },
  { icon: '📱', tip: "Enable 2-factor authentication (2FA) on every account that supports it." },
  { icon: '🚫', tip: "Never use personal info: birthdays, names, or addresses in passwords." },
  { icon: '💡', tip: "A passphrase like 'correct-horse-battery-staple' is both strong and memorable." },
  { icon: '🔒', tip: "Trusted password managers: Bitwarden, 1Password, Dashlane, KeePass." },
  { icon: '⏱️', tip: "Change passwords immediately if you suspect a data breach." },
];

const RequirementRow = ({ met, label }) => (
  <motion.div
    animate={{ borderColor: met ? '#22C55E' : '#334155' }}
    className="flex items-center gap-3 p-2.5 border rounded-lg transition-colors"
  >
    {met ? <CheckCircle className="w-4 h-4 text-cyber-green flex-shrink-0" /> : <XCircle className="w-4 h-4 text-gray-500 flex-shrink-0" />}
    <span className={`font-cyber text-sm ${met ? 'text-cyber-green' : 'text-gray-400'}`}>{label}</span>
  </motion.div>
);

const PasswordCreator = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState(analyzePassword(''));
  const [copied, setCopied] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { updateGameProgress } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAnalysis(analyzePassword(password));
  }, [password]);

  const handleGenerate = () => {
    const pwd = generateSecurePassword();
    setPassword(pwd);
    setShowPassword(true);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleComplete = () => {
    if (analysis.score >= 80) {
      updateGameProgress('password-creator', 150, true);
      setGameCompleted(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  if (gameCompleted) {
    return (
      <AppLayout><div className="min-h-screen px-0">
  
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[85vh]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="cyber-card text-center max-w-xl w-full"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block p-5 bg-gradient-to-br from-cyber-purple to-purple-500 rounded-3xl mb-6 shadow-neon-purple"
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>
            <h2 className="text-4xl font-display font-bold glow-text mb-2">Excellent Work!</h2>
            <p className="text-gray-400 font-cyber mb-6">You created a strong password!</p>
            <div className="bg-cyber-dark/50 p-5 rounded-xl border border-cyber-border mb-6">
              <p className="text-gray-400 font-cyber text-sm mb-3">Your strong password:</p>
              <code className="text-cyber-purple text-lg font-mono bg-cyber-card/50 px-4 py-2 rounded-lg inline-block break-all">
                {password}
              </code>
            </div>
            <p className="text-gray-400 mb-8 font-cyber text-sm">
              Remember: Use unique passwords for each account and consider a password manager!
            </p>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex-1 cyber-button-primary flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
    );
  }

  const isReadyToSubmit = analysis.score >= 80;

  return (
    <AppLayout><div className="min-h-screen px-0">

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-display font-bold glow-text mb-1">Password Strength Simulator</h1>
          <p className="text-gray-400 font-cyber text-sm">Build a strong password and understand what makes it secure</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Input & Strength */}
          <div className="lg:col-span-3 space-y-5">
            {/* Password Input Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="cyber-card">
              <label className="block font-display font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyber-purple" /> Your Password
              </label>

              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password here..."
                  className="cyber-input pr-28 text-lg font-mono"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button onClick={handleCopy} disabled={!password}
                    className="p-2 rounded-lg hover:bg-cyber-border/50 transition-colors text-gray-400 hover:text-white disabled:opacity-40"
                    title="Copy password"
                  >
                    {copied ? <Check className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setShowPassword(v => !v)}
                    className="p-2 rounded-lg hover:bg-cyber-border/50 transition-colors text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Strength Bar */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-cyber text-sm font-semibold text-gray-300">Strength</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-display font-bold text-sm ${analysis.levelColor}`}>{analysis.level}</span>
                    <span className="font-cyber text-xs text-gray-500">({analysis.score}%)</span>
                  </div>
                </div>
                <div className="h-3 bg-cyber-dark rounded-full overflow-hidden border border-cyber-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.score}%` }}
                    className={`h-full bg-gradient-to-r ${analysis.levelGradient} transition-all duration-500`}
                  />
                </div>
                {/* 5-segment visual indicator */}
                <div className="flex gap-1 mt-2">
                  {['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'].map((lvl, i) => {
                    const thresholds = [0, 20, 40, 60, 80];
                    const active = analysis.score > thresholds[i];
                    return (
                      <div key={lvl} className={`flex-1 h-1 rounded-full transition-all duration-300 ${active ? `bg-gradient-to-r ${analysis.levelGradient}` : 'bg-cyber-border'}`} />
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleGenerate}
                  className="flex-1 cyber-button bg-gradient-to-r from-cyber-purple to-purple-400 text-white flex items-center justify-center gap-2 shadow-neon-purple"
                >
                  <Zap className="w-4 h-4" /> Generate Secure Password
                </motion.button>
              </div>
            </motion.div>

            {/* Checklist */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="cyber-card"
            >
              <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyber-blue" /> Security Checklist
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <RequirementRow met={analysis.checks.length8} label="At least 8 characters" />
                <RequirementRow met={analysis.checks.length12} label="12+ characters (better)" />
                <RequirementRow met={analysis.checks.uppercase} label="Uppercase letters (A-Z)" />
                <RequirementRow met={analysis.checks.lowercase} label="Lowercase letters (a-z)" />
                <RequirementRow met={analysis.checks.number} label="Numbers (0-9)" />
                <RequirementRow met={analysis.checks.special} label="Special characters (!@#...)" />
                <RequirementRow met={analysis.checks.noCommonWord} label="No common words" />
                <RequirementRow met={analysis.checks.noKeyboardPattern} label="No keyboard patterns" />
                <RequirementRow met={analysis.checks.noSequential} label="No sequential characters" />
                <RequirementRow met={analysis.checks.noYearPattern} label="No year patterns" />
                <RequirementRow met={analysis.checks.noRepeated} label="No repeated characters" />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isReadyToSubmit ? 1.03 : 1 }}
              whileTap={{ scale: isReadyToSubmit ? 0.97 : 1 }}
              onClick={handleComplete}
              disabled={!isReadyToSubmit}
              className={`w-full flex items-center justify-center gap-2 text-lg py-4 rounded-xl font-semibold transition-all ${
                isReadyToSubmit
                  ? 'cyber-button-success shadow-neon-green'
                  : 'bg-cyber-dark/60 text-gray-500 border border-cyber-border cursor-not-allowed'
              }`}
            >
              <Shield className="w-5 h-5" />
              {isReadyToSubmit ? 'Submit Strong Password ✓' : `Need ${80 - analysis.score}% more strength to submit`}
            </motion.button>
          </div>

          {/* Right: Suggestions & Tips */}
          <div className="lg:col-span-2 space-y-5">
            {/* Suggestions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="cyber-card">
              <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" /> Suggestions
              </h3>
              <AnimatePresence>
                {analysis.suggestions.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-3 p-3 bg-cyber-green/10 border border-cyber-green/30 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0" />
                    <span className="font-cyber text-sm text-cyber-green">Your password meets all recommendations!</span>
                  </motion.div>
                ) : (
                  <ul className="space-y-2">
                    {analysis.suggestions.map((s, i) => (
                      <motion.li key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 font-cyber text-sm text-gray-300"
                      >
                        <span className="text-yellow-400 mt-0.5 flex-shrink-0">›</span>
                        <span>{s}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Security Tips */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="cyber-card"
            >
              <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyber-blue" /> Security Tips
              </h3>
              <ul className="space-y-3">
                {securityTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{tip.icon}</span>
                    <span className="font-cyber text-sm text-gray-300 leading-relaxed">{tip.tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  );
};

export default PasswordCreator;
