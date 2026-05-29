import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const { register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (!username || !email || !password || !confirmPassword) { setMessage({ type: 'error', text: 'Please fill in all fields' }); return; }
    if (password !== confirmPassword) { setMessage({ type: 'error', text: 'Passwords do not match' }); return; }
    if (password.length < 6) { setMessage({ type: 'error', text: 'Password must be at least 6 characters' }); return; }
    const result = register(username, email, password);
    if (result.success) {
      setMessage({ type: 'success', text: 'Account created! Redirecting to login...' });
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  const inputField = (label, type, value, onChange, placeholder, Icon) => (
    <div>
      <label className={`block text-sm font-semibold mb-2 font-cyber ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>
      <div className="relative">
        <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="cyber-input pl-11" />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen grid-pattern flex items-center justify-center px-4 md:px-8 py-8 lg:py-12 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">

        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="text-center mb-8">
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(16,185,129,0.3)', '0 0 40px rgba(16,185,129,0.6)', '0 0 20px rgba(16,185,129,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block p-3 sm:p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-4">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </motion.div>
          <h1 className="text-2xl sm:text-4xl font-display font-bold glow-text mb-2">Join the Mission</h1>
          <p className={`text-sm sm:text-base font-cyber ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Create your cyber agent profile</p>
        </motion.div>

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}
          className={`rounded-2xl p-4 sm:p-6 border transition-colors duration-300
            ${isDark ? 'bg-slate-900 border-slate-700/60 shadow-xl' : 'bg-white border-slate-200 shadow-lg'}`}>

          <form onSubmit={handleSubmit} className="space-y-4">
            {inputField('Username', 'text', username, setUsername, 'Choose your codename', User)}
            {inputField('Email Address', 'email', email, setEmail, 'agent@cyberdefense.com', Mail)}
            {inputField('Password', 'password', password, setPassword, 'Create a strong password', Lock)}
            {inputField('Confirm Password', 'password', confirmPassword, setConfirmPassword, 'Confirm your password', Lock)}

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
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-cyber font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow mt-2">
              Create Account
            </motion.button>
          </form>

          <div className="my-5 flex items-center gap-4">
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <span className={`text-xs font-cyber ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>OR</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          </div>

          <div className="text-center">
            <p className={`font-cyber text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Already have an account?{' '}
              <Link to="/login" className={`font-semibold transition-colors ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-green-600 hover:text-green-700'}`}>
                Sign In
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

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className={`fixed top-10 left-10 w-72 h-72 rounded-full border ${isDark ? 'border-emerald-500/10' : 'border-green-500/10'}`} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className={`fixed bottom-10 right-10 w-80 h-80 rounded-full border ${isDark ? 'border-cyan-500/10' : 'border-blue-500/10'}`} />
    </div>
  );
};

export default RegisterPage;
