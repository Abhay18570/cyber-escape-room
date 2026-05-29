import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AnalyticsCard = ({ icon: Icon, label, value, sub, accent = 'blue', delay = 0 }) => {
  const { isDark } = useTheme();

  const accents = {
    blue: {
      bg: 'from-cyan-500 to-blue-600',
      shadow: isDark ? 'shadow-cyan-500/20' : 'shadow-blue-500/20',
      text: isDark ? 'text-cyan-400' : 'text-blue-600',
      badge: isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-blue-50 border-blue-200 text-blue-600',
    },
    green: {
      bg: 'from-emerald-500 to-green-600',
      shadow: isDark ? 'shadow-emerald-500/20' : 'shadow-green-500/20',
      text: isDark ? 'text-emerald-400' : 'text-green-600',
      badge: isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-green-50 border-green-200 text-green-600',
    },
    purple: {
      bg: 'from-purple-500 to-violet-600',
      shadow: isDark ? 'shadow-purple-500/20' : 'shadow-purple-500/20',
      text: isDark ? 'text-purple-400' : 'text-purple-600',
      badge: isDark ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-600',
    },
    red: {
      bg: 'from-rose-500 to-red-600',
      shadow: isDark ? 'shadow-rose-500/20' : 'shadow-red-500/20',
      text: isDark ? 'text-rose-400' : 'text-red-600',
      badge: isDark ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-red-50 border-red-200 text-red-600',
    },
    amber: {
      bg: 'from-amber-500 to-orange-500',
      shadow: isDark ? 'shadow-amber-500/20' : 'shadow-amber-500/20',
      text: isDark ? 'text-amber-400' : 'text-amber-600',
      badge: isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-600',
    },
  };

  const a = accents[accent] || accents.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`
        rounded-2xl p-4 sm:p-5 border transition-all duration-300 group hover:-translate-y-1 shadow-sm
        ${isDark
          ? 'bg-slate-900 border-slate-700/60 hover:border-slate-600 shadow-slate-950/30'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'}
      `}
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`p-2 sm:p-2.5 bg-gradient-to-br ${a.bg} rounded-xl shadow-lg ${a.shadow}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        {sub && (
          <span className={`text-xs font-cyber font-semibold px-2 py-1 rounded-lg border ${a.badge}`}>
            {sub}
          </span>
        )}
      </div>
      <div className={`text-xl sm:text-2xl font-display font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
        {value}
      </div>
      <div className={`text-xs sm:text-sm font-cyber leading-snug ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {label}
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
