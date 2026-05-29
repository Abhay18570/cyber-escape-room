import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (!email || !password) { setMessage({ type: 'error', text: 'Please fill in all fields' }); return; }
    const result = login(email, password);
    if (result.success) {
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  return (
    <div className={`min-h-screen grid-pattern flex items-center justify-center px-4 py-12 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Theme Toggle top right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        
        {/* Logo */}
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="text-center mb-8">
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(6,182,212,0.3)', '0 0 40px rgba(6,182,212,0.6)', '0 0 20px rgba(6,182,212,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4"
          >
            <Shield className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold glow-text mb-2">Welcome Back</h1>
          <p className={`font-cyber ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Access your cyber training portal</p>
        </motion.div>

        {/* Form Card */}
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}
          className={`rounded-2xl p-6 border transition-colors duration-300
            ${isDark ? 'bg-slate-900 border-slate-700/60 shadow-xl' : 'bg-white border-slate-200 shadow-lg'}`}>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold mb-2 font-cyber ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="agent@cyberdefense.com" className="cyber-input pl-11" />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 font-cyber ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Password</label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password" className="cyber-input pl-11" />
              </div>
            </div>

            {message.text && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-cyber ${
                  message.type === 'error'
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                    : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'}`}>
                {message.type === 'error' ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle className="w-4 h-4 flex-shrink-0" />}
                {message.text}
              </motion.div>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-cyber font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow">
              Sign In
            </motion.button>
          </form>

          <div className="my-5 flex items-center gap-4">
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <span className={`text-xs font-cyber ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>OR</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          </div>

          <div className="text-center">
            <p className={`font-cyber text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Don't have an account?{' '}
              <Link to="/register" className={`font-semibold transition-colors ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'}`}>
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center mt-6">
          <Link to="/" className={`font-cyber text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Background decorations */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className={`fixed top-10 right-10 w-64 h-64 rounded-full border ${isDark ? 'border-cyan-500/10' : 'border-blue-500/10'}`} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className={`fixed bottom-10 left-10 w-96 h-96 rounded-full border ${isDark ? 'border-purple-500/10' : 'border-purple-500/10'}`} />
    </div>
  );
};

export default LoginPage;
