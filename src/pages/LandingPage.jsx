import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Trophy, Target, Brain } from 'lucide-react';

const LandingPage = () => {
  const { isDark } = useTheme();
  const features = [
    {
      icon: Brain,
      title: 'Learn by Doing',
      description: 'Interactive games that teach real cybersecurity skills',
    },
    {
      icon: Target,
      title: 'Challenge Yourself',
      description: 'Test your knowledge with progressive difficulty levels',
    },
    {
      icon: Trophy,
      title: 'Earn Rewards',
      description: 'Track your progress and unlock achievements',
    },
  ];

  return (
    <div className={`min-h-screen grid-pattern transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Navbar />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(14, 165, 233, 0.3)',
                    '0 0 60px rgba(14, 165, 233, 0.6)',
                    '0 0 20px rgba(14, 165, 233, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-8 bg-gradient-to-br from-cyber-blue to-cyan-500 rounded-3xl"
              >
                <Shield className="w-24 h-24 text-white" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 border-4 border-cyber-blue/30 rounded-3xl"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-display font-black mb-6"
          >
            <span className="glow-text text-glow">CYBER</span>
            <br />
            <span className="text-white">ESCAPE ROOM</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl text-gray-300 mb-12 font-cyber"
          >
            Master Cybersecurity Through Interactive Challenges
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button-primary text-lg px-8 py-4 flex items-center gap-3"
              >
                <Zap className="w-6 h-6" />
                Get Started
              </motion.button>
            </Link>

            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button bg-cyber-card/80 backdrop-blur-md border-2 border-cyber-blue text-cyber-blue text-lg px-8 py-4 flex items-center gap-3"
              >
                <Lock className="w-6 h-6" />
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              whileHover={{ y: -10 }}
              className="cyber-card text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-block p-4 bg-gradient-to-br from-cyber-blue to-cyan-500 rounded-2xl mb-4 shadow-neon-blue"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-display font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-cyber">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-24 text-center"
        >
          <div className="cyber-card inline-block">
            <div className="grid grid-cols-3 gap-12">
              <div>
                <div className="text-5xl font-display font-bold glow-text mb-2">6</div>
                <div className="text-gray-400 font-cyber">Interactive Games</div>
              </div>
              <div>
                <div className="text-5xl font-display font-bold text-cyber-green mb-2">800</div>
                <div className="text-gray-400 font-cyber">Total Points</div>
              </div>
              <div>
                <div className="text-5xl font-display font-bold text-cyber-purple mb-2">∞</div>
                <div className="text-gray-400 font-cyber">Learning Potential</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Animation Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="fixed top-20 right-10 w-20 h-20 bg-cyber-blue/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="fixed bottom-20 left-10 w-32 h-32 bg-cyber-purple/10 rounded-full blur-xl"
        />
      </div>
    </div>
  );
};

export default LandingPage;
