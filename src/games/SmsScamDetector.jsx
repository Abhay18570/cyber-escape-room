import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, CheckCircle, XCircle, AlertTriangle, Home, Trophy,
  Smartphone, RotateCcw, BookOpen, Shield, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getSmsMessages, seedSmsMessages } from '../data/smsData';
import AppLayout from '../layouts/AppLayout';
import confetti from 'canvas-confetti';

const WIN_SCORE = 100;
const POINTS_PER_CORRECT = 5;
const PROGRESS_KEY = 'cyberescape_sms_progress';

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const SmsScamDetector = () => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const { updateGameProgress } = useAuth();
  const navigate = useNavigate();

  const initGame = useCallback(() => {
    seedSmsMessages();
    const all = getSmsMessages();
    const shuffled = shuffleArray(all);
    setMessages(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameCompleted(false);
    setTotalAnswered(0);
    setCorrectCount(0);
    localStorage.removeItem(PROGRESS_KEY);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const currentMsg = messages[currentIndex];

  const handleAnswer = (userAnswer) => {
    if (selectedAnswer !== null) return;
    const correct = userAnswer === currentMsg.type;
    setIsCorrect(correct);
    setSelectedAnswer(userAnswer);
    setShowResult(true);
    setTotalAnswered(t => t + 1);

    if (correct) {
      const newScore = score + POINTS_PER_CORRECT;
      setScore(newScore);
      setCorrectCount(c => c + 1);
      if (newScore >= WIN_SCORE) {
        updateGameProgress('sms-scam', newScore, true);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify({ score: newScore }));
        setTimeout(() => {
          setGameCompleted(true);
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        }, 1400);
      }
    }
  };

  const handleNext = () => {
    if (score >= WIN_SCORE) {
      setGameCompleted(true);
      return;
    }
    const nextIdx = (currentIndex + 1) % messages.length;
    setCurrentIndex(nextIdx);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (!currentMsg) {
    return (
      <AppLayout><div className="min-h-screen px-0">
  
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-cyber-blue font-cyber text-xl animate-pulse">Loading messages...</div>
        </div>
      </div>
    </AppLayout>
    );
  }

  if (gameCompleted) {
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return (
      <AppLayout><div className="min-h-screen px-0">
  
        <div className="container mx-auto px-4 md:px-8 py-8 lg:py-12 flex items-center justify-center min-h-[85vh]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="cyber-card text-center max-w-xl w-full"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block p-5 bg-gradient-to-br from-cyber-red to-rose-500 rounded-3xl mb-6 shadow-neon-red"
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold glow-text mb-2">100 Points!</h2>
            <p className="text-lg sm:text-xl font-cyber text-cyber-red font-bold mb-6">Mission Complete!</p>
            <div className="bg-cyber-dark/50 rounded-xl p-5 border border-cyber-red/30 mb-6">
              <p className="font-cyber text-lg text-white font-semibold">
                "Excellent! You are very good at detecting SMS scams."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-cyber-dark/60 rounded-xl p-4 border border-cyber-border">
                <div className="text-2xl sm:text-3xl font-display font-bold text-cyber-red mb-1">{score}</div>
                <div className="text-xs font-cyber text-gray-400 uppercase tracking-wider">Final Score</div>
              </div>
              <div className="bg-cyber-dark/60 rounded-xl p-4 border border-cyber-border">
                <div className="text-2xl sm:text-3xl font-display font-bold text-cyber-green mb-1">{accuracy}%</div>
                <div className="text-xs font-cyber text-gray-400 uppercase tracking-wider">Accuracy</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={initGame}
                className="flex-1 cyber-button bg-cyber-card border border-cyber-border text-white flex items-center justify-center gap-2 hover:border-cyber-red hover:text-cyber-red transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex-1 cyber-button-primary flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
    );
  }

  const progressPct = Math.min((score / WIN_SCORE) * 100, 100);

  return (
    <AppLayout><div className="min-h-screen px-0">

      <div className="container mx-auto px-4 md:px-8 py-6 lg:py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold glow-text mb-1">SMS Scam Detector</h1>
          <p className="text-gray-400 font-cyber text-sm">Reach 100 points to win — earn 5 points for each correct answer</p>
        </motion.div>

        {/* Score Progress */}
        <div className="mb-6 cyber-card py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-display font-bold text-yellow-400 text-xl">{score}</span>
              <span className="text-gray-400 font-cyber text-sm">/ {WIN_SCORE} points</span>
            </div>
            <div className="flex items-center gap-4 text-sm sm:text-base font-cyber">
              <span className="text-cyber-green">{correctCount} correct</span>
              <span className="text-gray-400">{totalAnswered} answered</span>
            </div>
          </div>
          <div className="h-3 bg-cyber-dark rounded-full overflow-hidden border border-cyber-border">
            <motion.div
              animate={{ width: `${progressPct}%` }}
              className="h-full bg-gradient-to-r from-cyber-red via-orange-500 to-yellow-400"
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs font-cyber text-gray-500">0</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-xs font-cyber text-yellow-400 font-semibold">{WIN_SCORE - score} pts to win!</span>
            </div>
            <span className="text-xs font-cyber text-yellow-400">100</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Phone Frame */}
          <motion.div key={currentIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-[560px] bg-gray-900 rounded-[3rem] p-3 border-8 border-gray-800 shadow-2xl shadow-black/50">
                <div className="w-full h-full bg-cyber-dark rounded-[2.5rem] overflow-hidden flex flex-col relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-10" />

                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-2 text-xs text-gray-400">
                    <span className="font-mono">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5 items-end">
                        {[2, 3, 4, 5].map(h => <div key={h} className="w-1 bg-gray-400 rounded-sm" style={{ height: h }} />)}
                      </div>
                      <div className="w-5 h-2.5 border border-gray-400 rounded-sm relative">
                        <div className="absolute inset-0.5 right-1 bg-gray-400 rounded-sm" />
                        <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-gray-400 rounded-r" />
                      </div>
                    </div>
                  </div>

                  {/* Message Header */}
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-cyber-border bg-cyber-card/30">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber-blue to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-cyber font-semibold text-sm text-white">{currentMsg.sender}</div>
                      <div className="text-xs text-gray-500">SMS Message</div>
                    </div>
                    <div className="ml-auto text-xs text-gray-500">Now</div>
                  </div>

                  {/* Message Bubble */}
                  <div className="flex-1 p-5 overflow-y-auto flex flex-col justify-end">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="max-w-[85%] bg-cyber-card/80 backdrop-blur-sm p-3.5 rounded-2xl rounded-tl-sm border border-cyber-border/50"
                    >
                      <p className="font-cyber text-sm text-gray-200 leading-relaxed">{currentMsg.message}</p>
                      <div className="text-xs text-gray-500 mt-2 text-right">Delivered</div>
                    </motion.div>
                  </div>

                  {/* Glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/5 to-transparent pointer-events-none rounded-[2.5rem]" />
                </div>
              </div>
              <div className="absolute inset-0 bg-cyber-blue/5 blur-3xl -z-10 rounded-full" />
            </div>
          </motion.div>

          {/* Answer & Feedback Panel */}
          <div className="flex flex-col justify-center gap-4">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="cyber-card"
                >
                  <div className="flex items-center gap-2 mb-5 p-3 bg-cyber-blue/10 rounded-xl border border-cyber-blue/20">
                    <Shield className="w-5 h-5 text-cyber-blue" />
                    <h3 className="font-display font-bold text-white text-base sm:text-lg">Is this message safe or a scam?</h3>
                  </div>
                  <div className="space-y-3">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer('safe')}
                      className="w-full cyber-button-success flex items-center justify-center gap-3 py-3 sm:py-4 text-sm sm:text-lg"
                    >
                      <CheckCircle className="w-6 h-6" /> Safe Message
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer('scam')}
                      className="w-full cyber-button-danger flex items-center justify-center gap-3 py-3 sm:py-4 text-sm sm:text-lg"
                    >
                      <AlertTriangle className="w-6 h-6" /> Scam Alert
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className={`cyber-card ${isCorrect ? 'border-cyber-green/60' : 'border-cyber-red/60'}`}
                >
                  {/* Result Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-cyber-border">
                    <div className={`p-2.5 rounded-xl ${isCorrect ? 'bg-cyber-green/20' : 'bg-cyber-red/20'}`}>
                      {isCorrect ? <CheckCircle className="w-7 h-7 text-cyber-green" /> : <XCircle className="w-7 h-7 text-cyber-red" />}
                    </div>
                    <div>
                      <div className={`text-xl sm:text-2xl font-display font-bold ${isCorrect ? 'text-cyber-green' : 'text-cyber-red'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </div>
                      <div className="text-gray-400 font-cyber text-sm">
                        {isCorrect ? `+${POINTS_PER_CORRECT} points → ${Math.min(score, WIN_SCORE)} total` : '0 points'}
                      </div>
                    </div>
                    <div className="ml-auto flex-shrink-0">
                      <span className={`text-sm font-cyber px-2.5 py-1 rounded-lg font-bold border ${
                        currentMsg.type === 'scam'
                          ? 'bg-cyber-red/20 text-cyber-red border-cyber-red/30'
                          : 'bg-cyber-green/20 text-cyber-green border-cyber-green/30'
                      }`}>
                        {currentMsg.type === 'scam' ? 'SCAM' : 'SAFE'}
                      </span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="mb-5 bg-cyber-dark/40 p-4 rounded-xl border border-cyber-border/40">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-cyber-blue" />
                      <span className="font-cyber font-semibold text-sm text-cyber-blue">Explanation</span>
                    </div>
                    <p className="font-cyber text-sm text-gray-300 leading-relaxed">{currentMsg.explanation}</p>
                  </div>

                  {score >= WIN_SCORE ? (
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setGameCompleted(true)}
                      className="w-full cyber-button-primary flex items-center justify-center gap-2 text-sm sm:text-lg"
                    >
                      <Trophy className="w-5 h-5" /> See Final Results!
                    </motion.button>
                  ) : (
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={handleNext}
                      className="w-full cyber-button-primary flex items-center justify-center gap-2"
                    >
                      Next Message →
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mini stats */}
            <div className="cyber-card py-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-display font-bold text-cyber-green">{correctCount}</div>
                  <div className="text-xs font-cyber text-gray-400">Correct</div>
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-cyber-red">{totalAnswered - correctCount}</div>
                  <div className="text-xs font-cyber text-gray-400">Wrong</div>
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-cyber-blue">{totalAnswered}</div>
                  <div className="text-xs font-cyber text-gray-400">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  );
};

export default SmsScamDetector;
