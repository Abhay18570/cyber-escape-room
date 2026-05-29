import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ compact = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`
        relative flex items-center gap-2 rounded-xl border transition-all duration-300
        ${compact ? 'p-2' : 'px-3 py-2'}
        ${isDark
          ? 'bg-slate-800 border-slate-600 text-yellow-400 hover:border-yellow-400/50 hover:bg-slate-700'
          : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50 shadow-sm'}
      `}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </motion.div>
      {!compact && (
        <span className={`text-xs font-semibold font-cyber ${isDark ? 'text-yellow-400' : 'text-slate-600'}`}>
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
