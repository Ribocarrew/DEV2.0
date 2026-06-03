import React from 'react';
import { motion } from 'framer-motion';
import { useClassSessions } from '../hooks/useClassSessions';

export function HostView() {
  const { classScores, clearClassScores } = useClassSessions();

  const getX = (handScore: number) => 10 + Math.max(0, Math.min(80, ((handScore + 4) / 8) * 80));
  const getY = (eyeScore: number) => 10 + Math.max(0, Math.min(80, ((4 - eyeScore) / 8) * 80));

  return (
    <div className="max-w-3xl mx-auto p-4 pt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-sans font-semibold text-teal-700 mb-3">Klassespejlet</h2>
        <p className="text-stone font-serif text-lg">
          Her samles alle delte resultater ({classScores.length} besvarelser).
        </p>
      </div>

      <div className="relative w-full aspect-square max-h-[60vh] bg-white border-4 border-sand rounded-3xl shadow-lg mb-8 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="border-r-2 border-b-2 border-dashed border-teal-50"></div>
          <div className="border-b-2 border-dashed border-teal-50"></div>
          <div className="border-r-2 border-dashed border-teal-50"></div>
          <div></div>
        </div>
        
        {/* Axis labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-sans font-bold text-teal-800 bg-white/80 px-3 py-1 rounded-full shadow-sm text-sm z-0">
          Øjet (Transmission)
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans font-bold text-stone/60 bg-white/80 px-3 py-1 rounded-full text-xs z-0">
          Mindre Øje
        </div>
        
        <div className="absolute top-1/2 right-2 -translate-y-1/2 font-sans font-bold text-amber-700 bg-white/80 px-3 py-1 rounded-full shadow-sm text-sm z-0 origin-center rotate-90 sm:rotate-0">
          Hånden (Undersøgelse)
        </div>
        <div className="absolute top-1/2 left-2 -translate-y-1/2 font-sans font-bold text-stone/60 bg-white/80 px-3 py-1 rounded-full text-xs z-0 origin-center -rotate-90 sm:rotate-0">
          Mindre Hånd
        </div>

        {/* Plotting points */}
        {classScores.map((score, index) => (
          <motion.div
            key={`score-${score.t}-${index}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ type: "spring" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8 bg-teal-600 z-10 mix-blend-multiply"
            style={{
              left: `${getX(score.h)}%`,
              top: `${getY(score.e)}%`
            }}
          />
        ))}
      </div>

      <div className="flex justify-between items-center bg-white border border-teal-100 shadow-sm rounded-xl p-5 mb-8">
        <button 
          onClick={() => {
            if (confirm('Vil du rydde hele klassespejlet?')) {
              clearClassScores();
            }
          }}
          className="text-red-500 font-sans font-bold text-sm hover:bg-red-50 py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="text-lg">🗑️</span> Ryd klassespejl
        </button>
        <button 
          onClick={() => {
            window.location.hash = '';
            window.location.reload();
          }}
          className="text-teal-700 font-sans font-bold text-sm hover:bg-teal-50 py-2 px-4 rounded-lg transition-colors"
        >
          Gå til startskærm
        </button>
      </div>
    </div>
  );
}
