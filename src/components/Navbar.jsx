// Navbar is now a top header used only on public pages (LandingPage, Login, Register).
// Authenticated pages use AppLayout + Sidebar instead.
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300
        ${isDark ? 'bg-slate-900/80 border-slate-700/60' : 'bg-white/80 border-slate-200'}`}
    >
      <div className="container mx-auto px-4 md:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className={`text-sm sm:text-xl font-display font-bold tracking-widest truncate ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
              CYBER ESCAPE
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {user ? (
              <>
                <div className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-cyber
                  ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <User className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
                  <span>{user.username}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl text-sm font-cyber font-semibold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-shadow"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className={`px-2 sm:px-4 py-2 rounded-xl text-sm font-cyber font-semibold transition-colors
                  ${isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'}`}>
                  Login
                </Link>
                <Link to="/register" className="px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-cyber font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
