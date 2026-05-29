import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { securityQuestions } from '../data/gameData';
import AppLayout from '../layouts/AppLayout';
import confetti from 'canvas-confetti';

const SecurityMaze = () => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [visitedCells, setVisitedCells] = useState(new Set(['0-0']));
  const { updateGameProgress } = useAuth();
  const navigate = useNavigate();

  const mazeSize = 5;
  const exitPos = { x: 4, y: 4 };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showQuestion) return;

      let newX = playerPos.x;
      let newY = playerPos.y;

      switch (e.key) {
        case 'ArrowUp':
          newY = Math.max(0, playerPos.y - 1);
          break;
        case 'ArrowDown':
          newY = Math.min(mazeSize - 1, playerPos.y + 1);
          break;
        case 'ArrowLeft':
          newX = Math.max(0, playerPos.x - 1);
          break;
        case 'ArrowRight':
          newX = Math.min(mazeSize - 1, playerPos.x + 1);
          break;
        default:
          return;
      }

      if (newX !== playerPos.x || newY !== playerPos.y) {
        const cellKey = `${newX}-${newY}`;
        if (!visitedCells.has(cellKey)) {
          setShowQuestion(true);
        } else {
          setPlayerPos({ x: newX, y: newY });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, showQuestion, visitedCells]);

  const handleAnswer = (answerIndex) => {
    const question = securityQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {
      setScore(score + 25);
      
      let newX = playerPos.x;
      let newY = playerPos.y;

      // Determine direction based on last key press (simplified)
      if (playerPos.y > 0 && !visitedCells.has(`${playerPos.x}-${playerPos.y - 1}`)) {
        newY = playerPos.y - 1;
      } else if (playerPos.x < mazeSize - 1 && !visitedCells.has(`${playerPos.x + 1}-${playerPos.y}`)) {
        newX = playerPos.x + 1;
      } else if (playerPos.y < mazeSize - 1 && !visitedCells.has(`${playerPos.x}-${playerPos.y + 1}`)) {
        newY = playerPos.y + 1;
      } else if (playerPos.x > 0 && !visitedCells.has(`${playerPos.x - 1}-${playerPos.y}`)) {
        newX = playerPos.x - 1;
      }

      const cellKey = `${newX}-${newY}`;
      setVisitedCells(new Set([...visitedCells, cellKey]));
      setPlayerPos({ x: newX, y: newY });

      if (newX === exitPos.x && newY === exitPos.y) {
        updateGameProgress('security-maze', score + 25, true);
        setGameCompleted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setShowQuestion(false);
      setCurrentQuestion((currentQuestion + 1) % securityQuestions.length);
    } else {
      setShowQuestion(false);
    }
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
              Maze Conquered!
            </h2>
            <p className="text-2xl text-gray-300 mb-6 font-cyber">
              Final Score: <span className="text-cyber-green font-bold">{score}</span> / 200
            </p>
            <p className="text-gray-400 mb-8 font-cyber">
              You've successfully navigated the security maze!
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

      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold glow-text mb-2">
            Security Knowledge Maze
          </h1>
          <p className="text-gray-400 font-cyber">
            Navigate by answering cybersecurity questions correctly
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Maze Grid */}
          <div className="cyber-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-cyber-blue" />
                <span className="font-cyber font-semibold">Navigate the Maze</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-cyber font-semibold">Score: {score}</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {Array.from({ length: mazeSize }).map((_, y) =>
                Array.from({ length: mazeSize }).map((_, x) => {
                  const isPlayer = playerPos.x === x && playerPos.y === y;
                  const isExit = exitPos.x === x && exitPos.y === y;
                  const isVisited = visitedCells.has(`${x}-${y}`);

                  return (
                    <motion.div
                      key={`${x}-${y}`}
                      whileHover={{ scale: 1.05 }}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center relative ${
                        isPlayer
                          ? 'bg-gradient-to-br from-cyber-blue to-cyan-500 border-cyber-blue shadow-neon-blue'
                          : isExit
                          ? 'bg-gradient-to-br from-cyber-green to-emerald-500 border-cyber-green shadow-neon-green'
                          : isVisited
                          ? 'bg-cyber-card border-cyber-border'
                          : 'bg-cyber-dark border-cyber-border/50'
                      }`}
                    >
                      {isPlayer && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-8 h-8 bg-white rounded-full"
                        />
                      )}
                      {isExit && (
                        <Trophy className="w-6 h-6 text-white" />
                      )}
                      {!isPlayer && !isExit && !isVisited && (
                        <div className="w-2 h-2 bg-gray-600 rounded-full" />
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            <div className="bg-cyber-dark/50 p-4 rounded-lg">
              <div className="font-cyber font-semibold text-sm mb-2 text-gray-400">
                Controls:
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm font-cyber">
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-cyber-blue" />
                  <span>Up Arrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4 text-cyber-blue" />
                  <span>Down Arrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-cyber-blue" />
                  <span>Left Arrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-cyber-blue" />
                  <span>Right Arrow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Panel */}
          <div className="cyber-card">
            {showQuestion ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="text-2xl font-display font-bold mb-6 text-cyber-blue">
                  Answer to Continue
                </h3>
                
                <div className="bg-cyber-dark/50 p-4 rounded-lg mb-6">
                  <p className="font-cyber text-lg">{securityQuestions[currentQuestion].question}</p>
                </div>

                <div className="space-y-3">
                  {securityQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(index)}
                      className="w-full text-left p-4 bg-cyber-card/50 border-2 border-cyber-border rounded-lg hover:border-cyber-blue transition-all font-cyber"
                    >
                      <span className="text-cyber-blue font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block p-6 bg-gradient-to-br from-cyber-blue to-cyan-500 rounded-3xl mb-4 shadow-neon-blue"
                >
                  <Compass className="w-16 h-16 text-white" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                  Use Arrow Keys
                </h3>
                <p className="text-gray-400 font-cyber">
                  Navigate to unexplored cells to answer questions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  );
};

export default SecurityMaze;
