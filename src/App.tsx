import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StartScreen } from './components/StartScreen';
import { DiamondEngine } from './components/DiamondEngine';
import { MethodLens } from './components/MethodLens';
import { DissonanceDetector } from './components/DissonanceDetector';
import { Heatmap } from './components/Heatmap';
import { HostView } from './components/HostView';
import type { LensOption, Session } from './types';
import { useClassSessions } from './hooks/useClassSessions';
import { decodeScore } from './utils/sharing';

type AppState = 'start' | 'lens' | 'diamond' | 'dissonance' | 'heatmap' | 'host';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [selectedLens, setSelectedLens] = useState<LensOption | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const { addClassScore } = useClassSessions();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#data=')) {
        const dataStr = hash.replace('#data=', '');
        const decoded = decodeScore(dataStr);
        if (decoded) {
          addClassScore(decoded);
          window.location.hash = '#host';
        }
      } else if (hash === '#host') {
        setAppState('host');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [addClassScore]);

  const handleStart = () => {
    setAppState('lens');
  };

  const handleLensSelect = (lens: LensOption) => {
    setSelectedLens(lens);
    setAppState('diamond');
  };

  const handleDiamondComplete = (session: Session) => {
    setCurrentSession(session);
    setAppState('dissonance');
  };

  const handleDissonanceComplete = () => {
    setAppState('heatmap');
  };

  return (
    <div className="min-h-screen bg-sand pb-12 overflow-x-hidden">
      {appState !== 'start' && appState !== 'host' && (
        <header className="max-w-3xl mx-auto px-4 pt-8 pb-4">
          <h1 
            onClick={() => {
              window.location.hash = '';
              setAppState('start');
            }}
            className="text-2xl font-sans font-bold text-teal-700 tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          >
            Det Epistemologiske Værksted 2.0
          </h1>
        </header>
      )}
      
      <main className={appState === 'start' || appState === 'host' ? 'pt-8' : ''}>
        <AnimatePresence mode="wait">
          {appState === 'start' && (
            <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}
          {appState === 'lens' && (
            <motion.div key="lens" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <MethodLens onSelect={handleLensSelect} />
            </motion.div>
          )}
          {appState === 'diamond' && selectedLens && (
            <motion.div key="diamond" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <DiamondEngine lens={selectedLens} onComplete={handleDiamondComplete} />
            </motion.div>
          )}
          {appState === 'dissonance' && currentSession && (
            <motion.div key="dissonance" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <DissonanceDetector session={currentSession} onComplete={handleDissonanceComplete} />
            </motion.div>
          )}
          {appState === 'heatmap' && (
             <motion.div key="heatmap" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
               <Heatmap />
             </motion.div>
          )}
          {appState === 'host' && (
             <motion.div key="host" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
               <HostView />
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
