import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, LayoutDashboard, Mail, Lock, KeyRound, MessageSquare,
  Compass, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/game/phishing-detector', label: 'Email Phishing', icon: Mail },
  { path: '/game/password-cracker', label: 'Password Strength', icon: Lock },
  { path: '/game/password-creator', label: 'Create Password', icon: KeyRound },
  { path: '/game/sms-scam', label: 'SMS Scam Detector', icon: MessageSquare },
  { path: '/game/security-maze', label: 'Security Maze', icon: Compass },
  { path: '/game/security-setup', label: 'Fix Security', icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Close mobile drawer on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const sidebarContent = (mobile = false) => (
    <div className={`flex flex-col h-full ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b transition-all duration-300 ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
        <motion.div
          className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <Shield className="w-5 h-5 text-white" />
        </motion.div>
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span className={`font-display font-bold text-sm tracking-widest whitespace-nowrap ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                CYBER ESCAPE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {!mobile && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(c => !c)}
            className={`ml-auto p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </motion.button>
        )}
        {mobile && (
          <button onClick={() => setMobileOpen(false)} className={`ml-auto p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Profile */}
      <div className={`px-4 py-4 border-b ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm bg-gradient-to-br from-cyan-500 to-blue-600 text-white`}>
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden min-w-0"
              >
                <p className={`text-sm font-semibold font-cyber truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{user.username}</p>
                <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-cyber font-medium transition-all duration-200 group relative
              ${isActive
                ? isDark
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'bg-blue-50 text-blue-600 border border-blue-200'
                : isDark
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? (isDark ? 'text-cyan-400' : 'text-blue-600') : ''}`} />
                <AnimatePresence>
                  {(!collapsed || mobile) && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {collapsed && !mobile && (
                  <div className={`
                    absolute left-full ml-3 px-2 py-1 rounded-lg text-xs font-semibold whitespace-nowrap
                    opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50
                    ${isDark ? 'bg-slate-700 text-slate-100 border border-slate-600' : 'bg-slate-800 text-white'}
                  `}>
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className={`px-3 py-4 border-t space-y-2 ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
        {/* Theme Toggle */}
        <div className="flex items-center gap-3 px-3 py-1">
          <ThemeToggle compact={collapsed && !mobile} />
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-xs font-cyber ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
              >
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-cyber font-medium transition-all duration-200 group
            ${isDark ? 'text-slate-400 hover:bg-red-500/10 hover:text-red-400' : 'text-slate-500 hover:bg-red-50 hover:text-red-500'}
          `}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          hidden lg:flex flex-col fixed left-0 top-0 h-full z-30 overflow-hidden border-r
          ${isDark ? 'border-slate-700/60' : 'border-slate-200'}
        `}
        style={{ willChange: 'width' }}
      >
        {sidebarContent(false)}
      </motion.aside>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`
          lg:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl border shadow-lg transition-colors
          ${isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}
        `}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`
                lg:hidden fixed left-0 top-0 h-full w-72 z-50 border-r overflow-hidden
                ${isDark ? 'border-slate-700' : 'border-slate-200'}
              `}
            >
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
