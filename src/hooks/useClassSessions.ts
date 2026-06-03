import { useState, useEffect } from 'react';
import type {} from '../utils/sharing';

const CLASS_KEY = 'epistemologisk-spejl-class';

export function useClassSessions() {
  const [classScores, setClassScores] = useState<SharedScore[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CLASS_KEY);
    if (saved) {
      try {
        setClassScores(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load class sessions');
      }
    }
  }, []);

  const addClassScore = (score: SharedScore) => {
    setClassScores(prev => {
      // Prevent exact duplicates (if scanned twice quickly)
      const isDuplicate = prev.some(s => s.t === score.t && s.e === score.e && s.h === score.h);
      if (isDuplicate) return prev;
      
      const newScores = [...prev, score];
      localStorage.setItem(CLASS_KEY, JSON.stringify(newScores));
      return newScores;
    });
  };

  const clearClassScores = () => {
    setClassScores([]);
    localStorage.removeItem(CLASS_KEY);
  };

  return { classScores, addClassScore, clearClassScores };
}
