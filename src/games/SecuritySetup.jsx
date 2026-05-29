import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, Home, Trophy, Laptop, StickyNote, Wifi, Usb, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { securityVulnerabilities } from '../data/gameData';
import AppLayout from '../layouts/AppLayout';
import confetti from 'canvas-confetti';

const SecuritySetup = () => {
  const [foundVulnerabilities, setFoundVulnerabilities] = useState(new Set());
  const [selectedVuln, setSelectedVuln] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { updateGameProgress } = useAuth();
  const navigate = useNavigate();

  const vulnerabilityIcons = {
    laptop: Laptop,
    'sticky-note': StickyNote,
    wifi: Wifi,
    usb: Usb,
    'no-antivirus': ShieldAlert,
  };

  const vulnerabilityPositions = {
    laptop: { top: '30%', left: '20%' },
    'sticky-note': { top: '25%', left: '35%' },
    wifi: { top: '15%', right: '20%' },
    usb: { bottom: '35%', left: '30%' },
    'no-antivirus': { bottom: '30%', right: '25%' },
  };

  const handleVulnerabilityClick = (vulnId) => {
    if (foundVulnerabilities.has(vulnId)) return;

    const newFound = new Set(foundVulnerabilities);
    newFound.add(vulnId);
    setFoundVulnerabilities(newFound);
    setSelectedVuln(vulnId);

    if (newFound.size === securityVulnerabilities.length) {
      const score = 150;
      updateGameProgress('security-setup', score, true);
      setTimeout(() => {
        setGameCompleted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1000);
    }
  };

  const score = foundVulnerabilities.size * 30;
  const progress = (foundVulnerabilities.size / securityVulnerabilities.length) * 100;

  if (gameCompleted) {
    return (
      <AppLayout><div className="min-h-screen px-0">
  
        <div className="container mx-auto px-4 md:px-8 py-8 lg:py-12 flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cyber-card text-center max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block p-5 sm:p-6 bg-gradient-to-br from-cyber-blue to-cyan-500 rounded-3xl mb-6 shadow-neon-blue"
            >
              <Trophy className="w-14 h-14 sm:w-20 sm:h-20 text-white" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-4xl font-display font-bold glow-text mb-4">
              Security Expert!
            </h2>
            <p className="text-lg sm:text-2xl text-gray-300 mb-6 font-cyber">
              Final Score: <span className="text-cyber-blue font-bold">150</span> / 150
            </p>
            <p className="text-gray-400 mb-8 font-cyber">
              You've identified all security vulnerabilities!
            </p>
            
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

      
      <div className="container mx-auto px-4 md:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-4xl font-display font-bold glow-text mb-2">
            Fix the Security Setup
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-cyber">
            Click on all security vulnerabilities in the room
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <span className="font-cyber font-semibold text-sm sm:text-base text-gray-300">
              Found {foundVulnerabilities.size} of {securityVulnerabilities.length} vulnerabilities
            </span>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-cyber font-semibold">Score: {score}</span>
            </div>
          </div>
          <div className="h-3 bg-cyber-dark rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyber-blue to-cyan-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Room Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cyber-card relative"
            style={{ minHeight: 'clamp(420px, 80vw, 600px)' }}
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-6 text-center text-white">
              Security Room
            </h3>

            {/* Room Background */}
            <div className="absolute inset-4 bg-gradient-to-br from-cyber-dark to-cyber-card rounded-lg border-2 border-cyber-border overflow-hidden">
              {/* Floor */}
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-cyber-card/50 to-transparent" />

              {/* Wall Grid */}
              <div className="absolute inset-0 opacity-10 grid-pattern" />

              {/* Vulnerabilities */}
              {securityVulnerabilities.map((vuln) => {
                const Icon = vulnerabilityIcons[vuln.id];
                const position = vulnerabilityPositions[vuln.id];
                const isFound = foundVulnerabilities.has(vuln.id);

                return (
                  <motion.div
                    key={vuln.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: isFound ? 1 : 1.2 }}
                    onClick={() => handleVulnerabilityClick(vuln.id)}
                    className={`absolute cursor-pointer ${isFound ? 'opacity-30' : ''}`}
                    style={position}
                  >
                    <motion.div
                      animate={{
                        boxShadow: isFound
                          ? 'none'
                          : [
                              '0 0 0px rgba(239, 68, 68, 0.5)',
                              '0 0 20px rgba(239, 68, 68, 0.8)',
                              '0 0 0px rgba(239, 68, 68, 0.5)',
                            ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`p-2.5 sm:p-4 rounded-2xl ${
                        isFound
                          ? 'bg-cyber-green/20 border-2 border-cyber-green'
                          : 'bg-cyber-red/20 border-2 border-cyber-red'
                      }`}
                    >
                      <Icon className={`w-8 h-8 sm:w-12 sm:h-12 ${isFound ? 'text-cyber-green' : 'text-cyber-red'}`} />
                    </motion.div>

                    {isFound && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center text-white text-xs font-bold"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-cyber-dark/80 backdrop-blur-md p-4 rounded-lg border border-cyber-border">
              <div className="font-cyber text-sm text-gray-400">
                💡 Tip: Click on items that look suspicious or insecure
              </div>
            </div>
          </motion.div>

          {/* Vulnerability Details */}
          <div className="space-y-4">
            <div className="cyber-card">
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 text-white">
                Vulnerabilities Checklist
              </h3>
              
              <div className="space-y-3">
                {securityVulnerabilities.map((vuln) => {
                  const Icon = vulnerabilityIcons[vuln.id];
                  const isFound = foundVulnerabilities.has(vuln.id);
                  const isSelected = selectedVuln === vuln.id;

                  return (
                    <motion.div
                      key={vuln.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isFound
                          ? 'bg-cyber-green/10 border-cyber-green'
                          : 'bg-cyber-card/50 border-cyber-border'
                      } ${isSelected ? 'ring-2 ring-cyber-blue' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isFound ? 'bg-cyber-green/20' : 'bg-cyber-red/20'}`}>
                          <Icon className={`w-6 h-6 ${isFound ? 'text-cyber-green' : 'text-cyber-red'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-cyber font-semibold">{vuln.name}</h4>
                            {isFound && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-cyber-green text-xl"
                              >
                                ✓
                              </motion.div>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 font-cyber mb-2">{vuln.description}</p>
                          {isFound && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-2 p-3 bg-cyber-dark/50 rounded-lg"
                            >
                              <div className="text-xs font-cyber text-cyber-blue mb-1">💡 Security Tip:</div>
                              <div className="text-xs font-cyber text-gray-300">{vuln.tip}</div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  );
};

export default SecuritySetup;
