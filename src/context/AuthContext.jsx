import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Safe JSON parse helper
const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initializer functions load from localStorage synchronously on first render.
  // This eliminates the race condition where a useEffect-based save would
  // overwrite real data with empty defaults before the load effect re-renders.
  const [users, setUsers] = useState(() => loadFromStorage('cyber_users', []));
  const [user, setUser] = useState(() => loadFromStorage('cyber_current_user', null));
  const [gameProgress, setGameProgress] = useState(() => loadFromStorage('cyber_game_progress', {}));

  // Persist users whenever the array changes
  useEffect(() => {
    localStorage.setItem('cyber_users', JSON.stringify(users));
  }, [users]);

  // Persist or clear current session
  useEffect(() => {
    if (user) {
      localStorage.setItem('cyber_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cyber_current_user');
    }
  }, [user]);

  // Persist game progress
  useEffect(() => {
    localStorage.setItem('cyber_game_progress', JSON.stringify(gameProgress));
  }, [gameProgress]);

  const register = useCallback((username, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    // Duplicate check – case-insensitive
    const exists = users.some(
      (u) =>
        u.email.toLowerCase() === normalizedEmail ||
        u.username.toLowerCase() === normalizedUsername
    );
    if (exists) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      email: normalizedEmail,
      password, // In production, this would be hashed
      createdAt: new Date().toISOString(),
      totalScore: 0,
      gamesCompleted: 0,
    };

    setUsers((prev) => [...prev, newUser]);
    return { success: true, message: 'Registration successful' };
  }, [users]);

  const login = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid credentials' };
  }, [users]);

  const logout = useCallback(() => {
    setUser(null);
    // Session cleared; registered users remain in localStorage
  }, []);

  const updateGameProgress = useCallback((gameId, score, completed = false) => {
    if (!user) return;

    setGameProgress((prev) => {
      const newProgress = {
        ...prev,
        [user.id]: {
          ...(prev[user.id] || {}),
          [gameId]: {
            score,
            completed,
            completedAt: completed ? new Date().toISOString() : null,
          },
        },
      };

      // Update user's aggregate stats
      const userProgress = newProgress[user.id] || {};
      const totalScore = Object.values(userProgress).reduce(
        (sum, game) => sum + (game.score || 0),
        0
      );
      const gamesCompleted = Object.values(userProgress).filter(
        (game) => game.completed
      ).length;

      const updatedUser = { ...user, totalScore, gamesCompleted };

      setUser(updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
      );

      return newProgress;
    });
  }, [user]);

  const getUserGameProgress = useCallback(
    (gameId) => {
      if (!user) return null;
      return gameProgress[user.id]?.[gameId] || null;
    },
    [user, gameProgress]
  );

  const getCompletionPercentage = useCallback(() => {
    if (!user) return 0;
    const totalGames = 6;
    return Math.round((user.gamesCompleted / totalGames) * 100);
  }, [user]);

  const value = {
    user,
    users,
    register,
    login,
    logout,
    updateGameProgress,
    getUserGameProgress,
    getCompletionPercentage,
    gameProgress: user ? (gameProgress[user.id] || {}) : {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
