import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Zap, Shield, Home, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AppLayout from '../layouts/AppLayout';
import confetti from 'canvas-confetti';

const PasswordCracker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cracking, setCracking] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { updateGameProgress } = useAuth();
  const navigate = useNavigate();

  const passwords = [
    {
      password: 'password123',
      strength: 'Weak',
      crackTime: '0.3 seconds',
      color: 'red',
      icon: Unlock,
      vulnerabilities: [
        'Common word "password"',
        'Sequential numbers',
        'No special characters',
        'Too short (11 characters)'
      ]
    },
    {
      password: 'P@ssw0rd!2026#Secure',
      strength: 'Strong',
      crackTime: '200 years',
      color: 'green',
      icon: Shield,
      vulnerabilities: [
        '✓ Mix of uppercase & lowercase',
        '✓ Contains numbers',
        '✓ Contains special characters',
        '✓ Adequate length (20 characters)'
      ]
    }
  ];

  const currentPassword = passwords[currentStep];

  const simulateCracking = () => {
    setCracking(true);
    setTimeout(() => {
      setCracking(false);
      if (currentStep < passwords.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 500);
      } else {
        updateGameProgress('password-cracker', 100, true);
        setGameCompleted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 3000);
  };

  if (gameCompleted) {
    return (
      <AppLayout><div className="min-h-screen px-0">
  
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cyber-card text-center max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block p-6 bg-gradient-to-br from-cyber-green to-emerald-500 rounded-3xl mb-6 shadow-neon-green"
            >
              <Trophy className="w-20 h-20 text-white" />
            </motion.div>
            
            <h2 className="text-4xl font-display font-bold glow-text mb-4">
              Mission Complete!
            </h2>
            <p className="text-2xl text-gray-300 mb-6 font-cyber">
              Final Score: <span className="text-cyber-green font-bold">100</span> / 100
            </p>
            <p className="text-gray-400 mb-4 font-cyber">
              You now understand password strength!
            </p>
            
            <div className="bg-cyber-dark/50 p-6 rounded-lg mb-8 text-left">
              <h3 className="font-display font-bold text-lg mb-3 text-cyber-blue">Key Learnings:</h3>
              <ul className="space-y-2 font-cyber text-sm">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyber-green mt-1" />
                  <span>Use at least 12 characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyber-green mt-1" />
                  <span>Mix uppercase, lowercase, numbers, and symbols</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyber-green mt-1" />
                  <span>Avoid common words and patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyber-green mt-1" />
                  <span>Use a password manager for unique passwords</span>
                </li>
              </ul>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="cyber-button-primary inline-flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
    );
  }

  return (
    <AppLayout><div className="min-h-screen px-0">

      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold glow-text mb-2">
            Password Strength Simulator
          </h1>
          <p className="text-gray-400 font-cyber">
            See how quickly different passwords can be cracked
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cyber-card"
          >
            {/* Password Display */}
            <div className="text-center mb-8">
              <motion.div
                animate={{
                  boxShadow: currentPassword.color === 'red' 
                    ? ['0 0 20px rgba(239, 68, 68, 0.3)', '0 0 40px rgba(239, 68, 68, 0.6)', '0 0 20px rgba(239, 68, 68, 0.3)']
                    : ['0 0 20px rgba(34, 197, 94, 0.3)', '0 0 40px rgba(34, 197, 94, 0.6)', '0 0 20px rgba(34, 197, 94, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`inline-block p-6 bg-gradient-to-br ${currentPassword.color === 'red' ? 'from-cyber-red to-rose-500' : 'from-cyber-green to-emerald-500'} rounded-2xl mb-6`}
              >
                <currentPassword.icon className="w-16 h-16 text-white" />
              </motion.div>

              <h2 className="text-3xl font-display font-bold mb-4">
                Testing Password: <span className="text-cyber-blue">{currentPassword.strength}</span>
              </h2>
              
              <div className="bg-cyber-dark/80 p-6 rounded-xl border-2 border-cyber-border inline-block">
                <code className="text-2xl font-mono text-cyber-blue">{currentPassword.password}</code>
              </div>
            </div>

            {/* Cracking Simulation */}
            {!cracking && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={simulateCracking}
                className="cyber-button-primary w-full mb-8 flex items-center justify-center gap-3 text-lg"
              >
                <Zap className="w-6 h-6" />
                Start Brute Force Attack
              </motion.button>
            )}

            {cracking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="bg-cyber-dark/80 p-6 rounded-xl border-2 border-cyber-blue">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap className="w-6 h-6 text-cyber-blue" />
                    </motion.div>
                    <span className="font-cyber font-semibold text-lg">Attempting to crack password...</span>
                  </div>
                  
                  <div className="space-y-2 font-mono text-sm text-cyber-blue mb-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      &gt; Trying dictionary attacks...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      &gt; Testing common patterns...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      &gt; Running brute force combinations...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      &gt; Calculating crack time...
                    </motion.div>
                  </div>

                  <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.5 }}
                      className="h-full bg-gradient-to-r from-cyber-blue to-cyan-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {cracking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                className={`p-6 rounded-xl border-2 ${currentPassword.color === 'red' ? 'bg-cyber-red/10 border-cyber-red' : 'bg-cyber-green/10 border-cyber-green'} mb-8`}
              >
                <div className="text-center mb-4">
                  <div className={`text-5xl font-display font-bold mb-2 ${currentPassword.color === 'red' ? 'text-cyber-red' : 'text-cyber-green'}`}>
                    {currentPassword.crackTime}
                  </div>
                  <div className="text-gray-300 font-cyber">Time to crack this password</div>
                </div>
              </motion.div>
            )}

            {/* Vulnerabilities */}
            <div className="bg-cyber-dark/50 p-6 rounded-lg">
              <h3 className="font-display font-bold text-lg mb-4 text-white">Analysis:</h3>
              <ul className="space-y-2">
                {currentPassword.vulnerabilities.map((vulnerability, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 font-cyber"
                  >
                    {vulnerability.startsWith('✓') ? (
                      <Shield className="w-5 h-5 text-cyber-green mt-0.5 flex-shrink-0" />
                    ) : (
                      <Unlock className="w-5 h-5 text-cyber-red mt-0.5 flex-shrink-0" />
                    )}
                    <span>{vulnerability}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </AppLayout>
  );
};

export default PasswordCracker;
