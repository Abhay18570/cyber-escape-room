import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail, CheckCircle, XCircle, AlertTriangle, Home, Trophy,
  RotateCcw, Shield, Link, User, Tag, BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getPhishingEmails, seedPhishingEmails } from '../data/phishingData';
import AppLayout from '../layouts/AppLayout';
import confetti from 'canvas-confetti';

const ROUND_SIZE = 10;
const POINTS_PER_CORRECT = 10;

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getDifficultyColor = (diff) => {
  if (diff === 'easy') return 'text-cyber-green border-cyber-green/40 bg-cyber-green/10';
  if (diff === 'medium') return 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10';
  return 'text-cyber-red border-cyber-red/40 bg-cyber-red/10';
};

const getFeedbackMessage = (accuracy) => {
  if (accuracy >= 90) return { msg: "Excellent! You are great at detecting phishing emails.", color: "text-cyber-green" };
  if (accuracy >= 70) return { msg: "Very Good! Keep practicing to sharpen your skills.", color: "text-yellow-400" };
  if (accuracy >= 50) return { msg: "You're improving. Stay alert to suspicious signs.", color: "text-orange-400" };
  return { msg: "Be careful with suspicious emails. Review the red flags carefully.", color: "text-cyber-red" };
};

const PhishingDetector = () => {
  const [roundEmails, setRoundEmails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [phase, setPhase] = useState('playing');
  const [roundSummary, setRoundSummary] = useState({ score: 0, correct: 0 });
  const { updateGameProgress } = useAuth();
  const navigate = useNavigate();

  const initRound = useCallback(() => {
    seedPhishingEmails();
    const all = getPhishingEmails();
    const shuffled = shuffleArray(all).slice(0, ROUND_SIZE);
    setRoundEmails(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setPhase('playing');
  }, []);

  useEffect(() => { initRound(); }, [initRound]);

  const currentEmail = roundEmails[currentIndex];

  const handleAnswer = (userAnswer) => {
    if (selectedAnswer !== null) return;
    const correct = userAnswer === currentEmail.type;
    setIsCorrect(correct);
    setSelectedAnswer(userAnswer);
    setShowResult(true);
    if (correct) {
      setScore(s => s + POINTS_PER_CORRECT);
      setCorrectCount(c => c + 1);
    }
  };

  const handleNext = () => {
    const newScore = isCorrect ? score + POINTS_PER_CORRECT : score;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    if (currentIndex < ROUND_SIZE - 1) {
      setCurrentIndex(i => i + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      updateGameProgress('phishing-detector', newScore, true);
      setRoundSummary({ score: newScore, correct: newCorrect });
      setPhase('roundComplete');
      if (newCorrect >= 8) confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  if (!currentEmail && phase === 'playing') {
    return (
      <AppLayout><div className="min-h-screen px-0">
  
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-cyber-blue font-cyber text-xl animate-pulse">Loading emails...</div>
        </div>
      </div>
    </AppLayout>
    );
  }

  if (phase === 'roundComplete') {
    const accuracy = Math.round((roundSummary.correct / ROUND_SIZE) * 100);
    const feedback = getFeedbackMessage(accuracy);
    return (
      <AppLayout><div className="min-h-screen px-0">
  
        <div className="container mx-auto px-4 md:px-8 py-8 lg:py-12 flex items-center justify-center min-h-[85vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cyber-card text-center max-w-xl w-full"
          >
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block p-5 bg-gradient-to-br from-cyber-blue to-cyan-500 rounded-3xl mb-6 shadow-neon-blue"
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold glow-text mb-2">Round Complete!</h2>
            <p className="text-gray-400 font-cyber mb-8">Phishing Email Detector</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="bg-cyber-dark/60 rounded-xl p-3 sm:p-4 border border-cyber-border">
                <div className="text-2xl sm:text-3xl font-display font-bold text-cyber-blue mb-1">{roundSummary.score}</div>
                <div className="text-xs font-cyber text-gray-400 uppercase tracking-wider">Score</div>
              </div>
              <div className="bg-cyber-dark/60 rounded-xl p-3 sm:p-4 border border-cyber-border">
                <div className={`text-2xl sm:text-3xl font-display font-bold mb-1 ${feedback.color}`}>{accuracy}%</div>
                <div className="text-xs font-cyber text-gray-400 uppercase tracking-wider">Accuracy</div>
              </div>
              <div className="bg-cyber-dark/60 rounded-xl p-3 sm:p-4 border border-cyber-border">
                <div className="text-2xl sm:text-3xl font-display font-bold text-cyber-green mb-1">{roundSummary.correct}/{ROUND_SIZE}</div>
                <div className="text-xs font-cyber text-gray-400 uppercase tracking-wider">Correct</div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-cyber-border/50 bg-cyber-dark/40 mb-8">
              <p className={`font-cyber font-semibold ${feedback.color}`}>{feedback.msg}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={initRound}
                className="flex-1 cyber-button bg-cyber-card border border-cyber-border text-white flex items-center justify-center gap-2 hover:border-cyber-blue hover:text-cyber-blue transition-colors"
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

  const progressPct = (currentIndex / ROUND_SIZE) * 100;

  return (
    <AppLayout><div className="min-h-screen px-0">

      <div className="container mx-auto px-4 md:px-8 py-6 lg:py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold glow-text mb-1">Phishing Email Detector</h1>
          <p className="text-gray-400 font-cyber text-sm">Identify malicious emails — protect yourself from phishing attacks</p>
        </motion.div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-cyber text-gray-400">Email {currentIndex + 1} of {ROUND_SIZE}</span>
              <span className={`text-xs font-cyber px-2 py-0.5 rounded-full border ${getDifficultyColor(currentEmail.difficulty)}`}>
                {currentEmail.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-display font-bold text-yellow-400">{score} pts</span>
            </div>
          </div>
          <div className="h-2 bg-cyber-dark rounded-full overflow-hidden border border-cyber-border">
            <motion.div animate={{ width: `${progressPct}%` }}
              className="h-full bg-gradient-to-r from-cyber-blue to-cyan-400" transition={{ duration: 0.5 }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div key={currentIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 cyber-card"
          >
            <div className="flex items-start gap-3 mb-4 pb-4 border-b border-cyber-border">
              <div className="p-2.5 bg-cyber-blue/20 rounded-xl flex-shrink-0">
                <Mail className="w-5 h-5 text-cyber-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span className="font-cyber text-xs text-gray-400">From:</span>
                  <span className="font-cyber text-sm font-semibold text-gray-200 truncate">{currentEmail.sender}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Tag className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="font-cyber text-xs text-gray-400 flex-shrink-0">Subject:</span>
                  <span className="font-cyber text-sm font-bold text-white">{currentEmail.subject}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-cyber-dark/50 p-3 sm:p-4 rounded-xl border border-cyber-border/50">
                <pre className="font-cyber text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{currentEmail.body}</pre>
              </div>
            </div>

            {currentEmail.link && (
              <div className="flex items-center gap-2 p-3 bg-cyber-dark/50 rounded-lg border border-cyber-border/50 mb-4">
                <Link className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="font-mono text-xs text-gray-400 break-all">{currentEmail.link}</span>
              </div>
            )}

            {!showResult && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer('legitimate')}
                  className="cyber-button-success flex items-center justify-center gap-2 py-3"
                >
                  <CheckCircle className="w-5 h-5" /><span className="font-semibold">Legitimate</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer('phishing')}
                  className="cyber-button-danger flex items-center justify-center gap-2 py-3"
                >
                  <AlertTriangle className="w-5 h-5" /><span className="font-semibold">Phishing</span>
                </motion.button>
              </div>
            )}
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div key="waiting" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="cyber-card flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="p-4 bg-cyber-blue/10 rounded-2xl mb-4 border border-cyber-blue/20">
                    <Shield className="w-10 h-10 text-cyber-blue" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">Analyze This Email</h3>
                  <p className="text-gray-400 font-cyber text-sm">
                    Review the sender, subject, body, and any links carefully before deciding.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className={`cyber-card ${isCorrect ? 'border-cyber-green/60' : 'border-cyber-red/60'}`}
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-cyber-border">
                    <div className={`p-2.5 rounded-xl ${isCorrect ? 'bg-cyber-green/20' : 'bg-cyber-red/20'}`}>
                      {isCorrect ? <CheckCircle className="w-6 h-6 text-cyber-green" /> : <XCircle className="w-6 h-6 text-cyber-red" />}
                    </div>
                    <div>
                      <div className={`text-xl font-display font-bold ${isCorrect ? 'text-cyber-green' : 'text-cyber-red'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </div>
                      <div className="text-gray-400 font-cyber text-sm">{isCorrect ? `+${POINTS_PER_CORRECT} points` : '0 points'}</div>
                    </div>
                    <div className="ml-auto">
                      <span className={`text-xs font-cyber px-2 py-1 rounded-lg font-semibold ${
                        currentEmail.type === 'phishing'
                          ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30'
                          : 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30'
                      }`}>
                        {currentEmail.type === 'phishing' ? 'PHISHING' : 'LEGITIMATE'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-cyber-blue" />
                      <span className="font-cyber font-semibold text-sm text-cyber-blue">Explanation</span>
                    </div>
                    <p className="font-cyber text-sm text-gray-300 leading-relaxed">{currentEmail.explanation}</p>
                  </div>

                  {currentEmail.redFlags && currentEmail.redFlags.length > 0 && (
                    <div className="mb-5 bg-cyber-dark/50 rounded-xl p-3 border border-cyber-red/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-cyber-red" />
                        <span className="font-cyber font-semibold text-sm text-cyber-red">Red Flags</span>
                      </div>
                      <ul className="space-y-1.5">
                        {currentEmail.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-2 font-cyber text-xs text-gray-300">
                            <span className="text-cyber-red mt-0.5">•</span><span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={handleNext}
                    className="w-full cyber-button-primary flex items-center justify-center gap-2"
                  >
                    {currentIndex < ROUND_SIZE - 1 ? 'Next Email →' : 'See Results'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="cyber-card py-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-2xl font-display font-bold text-cyber-green">{correctCount}</div>
                  <div className="text-xs font-cyber text-gray-400 uppercase tracking-wider">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-cyber-red">
                    {currentIndex - correctCount + (showResult && !isCorrect ? 1 : 0)}
                  </div>
                  <div className="text-xs font-cyber text-gray-400 uppercase tracking-wider">Wrong</div>
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

export default PhishingDetector;
