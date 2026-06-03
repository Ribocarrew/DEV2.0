import { useState, useEffect } from 'react';
import type { Session } from '../types';

const STORAGE_KEY = 'epistemologisk-spejl-sessions';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse sessions from localStorage', e);
      }
    }
  }, []);

  const addSession = (session: Session) => {
    const newSessions = [...sessions, session];
    setSessions(newSessions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
  };

  const updateSession = (id: string, updates: Partial<Session>) => {
    setSessions(prev => {
      const newSessions = prev.map(s => s.id === id ? { ...s, ...updates } : s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
      return newSessions;
    });
  };

  const clearSessions = () => {
    setSessions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { sessions, addSession, updateSession, clearSessions };
}
