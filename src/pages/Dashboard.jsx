import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Trophy, Target, CheckCircle, Zap, Star, Clock,
  TrendingUp, Award, Shield, BarChart2, Activity,
  Mail, Lock, KeyRound, MessageSquare, Compass, Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { games } from '../data/gameData';
import AppLayout from '../layouts/AppLayout';
import AnalyticsCard from '../components/AnalyticsCard';

const GAME_META = {
  'phishing-detector':  { icon: Mail,         color: 'blue',   label: 'Phishing Detector'  },
  'password-cracker':   { icon: Lock,         color: 'green',  label: 'Password Strength'  },
  'password-creator':   { icon: KeyRound,     color: 'purple', label: 'Create Password'    },
  'sms-scam':           { icon: MessageSquare,color: 'red',    label: 'SMS Scam Detector'  },
  'security-maze':      { icon: Compass,      color: 'green',  label: 'Security Maze'      },
  'security-setup':     { icon: Settings,     color: 'blue',   label: 'Fix Security Setup' },
};

const BADGE_DEFS = [
  { id: 'first_blood',   label: 'First Strike',  icon: Zap,    req: (g)    => g >= 1,        desc: 'Complete 1 module'    },
  { id: 'halfway',       label: 'Halfway Hero',  icon: Star,   req: (g)    => g >= 3,        desc: 'Complete 3 modules'   },
  { id: 'cyber_master',  label: 'Cyber Master',  icon: Award,  req: (g)    => g >= 6,        desc: 'Complete all modules' },
  { id: 'high_scorer',   label: 'High Scorer',   icon: Trophy, req: (_,s)  => s >= 300,      desc: 'Earn 300+ points'     },
  { id: 'perfectionist', label: 'Perfectionist', icon: Target, req: (_,s)  => s >= 500,      desc: 'Earn 500+ points'     },
  { id: 'defender',      label: 'Cyber Defender',icon: Shield, req: (g)    => g >= 6,        desc: 'Master all challenges'},
];

const Dashboard = () => {
  const { user, getUserGameProgress, getCompletionPercentage } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const completionPercentage = getCompletionPercentage();
  const totalGames = games.length;

  const gameStats = games.map(g => {
    const p = getUserGameProgress(g.id);
    return { ...g, progress: p, score: p?.score ?? 0, completed: p?.completed ?? false, completedAt: p?.completedAt ?? null };
  });

  const completedGames = gameStats.filter(g => g.completed);
  const totalScore = user?.totalScore ?? 0;
  const avgScore = completedGames.length > 0
    ? Math.round(completedGames.reduce((s, g) => s + g.score, 0) / completedGames.length) : 0;

  const earnedBadges = BADGE_DEFS.filter(b => b.req(completedGames.length, totalScore));

  const recentActivity = [...completedGames]
    .filter(g => g.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 3);

  const card = isDark
    ? 'bg-slate-900 border border-slate-700/60 rounded-2xl'
    : 'bg-white border border-slate-200 rounded-2xl shadow-sm';

  const barColors = { blue:'from-cyan-500 to-blue-600', green:'from-emerald-500 to-green-600', purple:'from-purple-500 to-violet-600', red:'from-rose-500 to-red-600' };
  const diffColors = {
    Easy:   isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-green-50 text-green-600 border-green-200',
    Medium: isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-600 border-amber-200',
    Hard:   isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <AppLayout>
      <div className={`min-h-screen px-4 py-8 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/25">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl lg:text-3xl font-display font-bold tracking-wide ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{user?.username}</span>
              </h1>
              <p className={`text-sm font-cyber mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Your personal cybersecurity training dashboard
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard icon={Trophy}      label="Total Points"        value={totalScore}                         accent="blue"   delay={0.05} />
          <AnalyticsCard icon={CheckCircle} label="Modules Completed"   value={`${completedGames.length}/${totalGames}`} accent="green"  delay={0.1} />
          <AnalyticsCard icon={Target}      label="Overall Progress"    value={`${completionPercentage}%`}         accent="purple" delay={0.15} />
          <AnalyticsCard icon={Activity}    label="Avg Score / Module"  value={avgScore || '—'}                    accent="amber"  delay={0.2} />
        </div>

        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={`${card} p-5 mb-8`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
              <span className={`text-sm font-cyber font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Training Progress</span>
            </div>
            <span className={`text-sm font-display font-bold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>{completionPercentage}% Complete</span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${completionPercentage}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
          </div>
          <p className={`text-xs font-cyber mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{completedGames.length} of {totalGames} security modules mastered</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Module Scores */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`${card} p-5 lg:col-span-2`}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
              <h2 className={`text-sm font-display font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Module Scores</h2>
            </div>
            <div className="space-y-3">
              {gameStats.map((g, i) => {
                const meta = GAME_META[g.id];
                const Icon = meta?.icon || Shield;
                const maxScore = g.points;
                const pct = maxScore > 0 ? Math.min(100, Math.round((g.score / maxScore) * 100)) : 0;
                const grad = barColors[g.color] || barColors.blue;
                return (
                  <motion.div key={g.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.3 }}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                        <span className={`text-xs font-cyber font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{meta?.label || g.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {g.completed && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                        <span className={`text-xs font-display font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{g.score}/{maxScore}</span>
                      </div>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, delay: 0.05 * i + 0.4 }}
                        className={`h-full bg-gradient-to-r ${grad} rounded-full`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={`${card} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Clock className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
              <h2 className={`text-sm font-display font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Recent Activity</h2>
            </div>
            {recentActivity.length === 0 ? (
              <div className={`text-center py-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-cyber">No activity yet. Start a module!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((g, i) => {
                  const meta = GAME_META[g.id];
                  const Icon = meta?.icon || Shield;
                  const dt = g.completedAt ? new Date(g.completedAt) : null;
                  const dateStr = dt ? dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
                  return (
                    <motion.div key={g.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.4 }}
                      className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-cyber font-semibold truncate ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{meta?.label}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{dateStr} · {g.score} pts</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`${card} p-5 mb-8`}>
          <div className="flex items-center gap-2 mb-4">
            <Award className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
            <h2 className={`text-sm font-display font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Achievements
              <span className={`ml-2 text-xs font-cyber font-normal ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{earnedBadges.length}/{BADGE_DEFS.length} earned</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BADGE_DEFS.map((b, i) => {
              const earned = earnedBadges.some(e => e.id === b.id);
              const Icon = b.icon;
              return (
                <motion.div key={b.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i + 0.45 }}
                  title={b.desc}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-200 ${
                    earned ? isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'
                           : isDark ? 'bg-slate-800/40 border-slate-700/40 opacity-40 grayscale' : 'bg-slate-50 border-slate-200 opacity-40 grayscale'}`}>
                  <div className={`p-2 rounded-lg ${earned ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg' : isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <Icon className={`w-4 h-4 ${earned ? 'text-white' : isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>
                  <span className={`text-xs font-cyber font-semibold leading-tight ${earned ? (isDark ? 'text-amber-300' : 'text-amber-700') : isDark ? 'text-slate-500' : 'text-slate-400'}`}>{b.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Module Cards */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center gap-2 mb-4">
            <Shield className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
            <h2 className={`text-sm font-display font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Training Modules</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameStats.map((g, i) => {
              const meta = GAME_META[g.id];
              const Icon = meta?.icon || Shield;
              const grad = barColors[g.color] || barColors.blue;
              return (
                <motion.div key={g.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.5 }}
                  whileHover={{ y: -4 }} onClick={() => navigate(`/game/${g.id}`)}
                  className={`${card} p-4 cursor-pointer transition-all duration-200 group ${isDark ? 'hover:border-slate-500' : 'hover:shadow-md hover:border-slate-300'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 bg-gradient-to-br ${grad} rounded-xl shadow-lg`}><Icon className="w-5 h-5 text-white" /></div>
                    <div className="flex items-center gap-1.5">
                      {g.completed && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      <span className={`text-xs font-cyber font-semibold px-2 py-0.5 rounded-lg border ${diffColors[g.difficulty] || diffColors.Easy}`}>{g.difficulty}</span>
                    </div>
                  </div>
                  <h3 className={`text-sm font-display font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{g.title}</h3>
                  <p className={`text-xs font-cyber leading-relaxed mb-3 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{g.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span className={`text-xs font-cyber font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{g.points} pts</span>
                    </div>
                    {g.score > 0 && <span className={`text-xs font-display font-bold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>Best: {g.score}</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {completionPercentage === 100 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
            className="mt-8 p-6 rounded-2xl text-center bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-display font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cyber Master Achieved!</h3>
            <p className={`text-sm font-cyber ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>You've completed all training modules. You're a certified cyber defender!</p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
