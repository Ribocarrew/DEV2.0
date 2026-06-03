import React, { useState } from 'react';
import type {} from '';
import { detectDissonance } from '../utils/dissonance';
import { lenses } from '../data/lenses';
import { useSessions } from '../hooks/useSessions';
import { cards } from '../data/cards';

type Props = {
  session: Session;
  onComplete: () => void;
};

export function DissonanceDetector({ session, onComplete }: Props) {
  const { updateSession } = useSessions();
  const [reflection, setReflection] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  
  // Reconstruct data for detection
  const lens = lenses.find(l => l.id === session.lens)!;
  const placedCards = session.diamond.map(d => cards.find(c => c.id === d.cardId)!);
  
  const { hasDissonance, message } = detectDissonance(lens, placedCards);

  const handleFinish = () => {
    updateSession(session.id, {
      dissonanceFlagged: hasDissonance,
      reflection
    });
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      <div className="bg-white border-2 border-amber-200 rounded-2xl p-8 shadow-lg text-center">
        <h2 className="text-2xl font-sans font-semibold text-teal-700 mb-6">
          {hasDissonance ? 'Et spejlbillede med kant' : 'Et roligt spejl'}
        </h2>
        
        <p className="text-xl font-serif text-ink mb-10 leading-relaxed">
          "{message}"
        </p>

        {!isWriting ? (
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setIsWriting(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold py-4 px-6 rounded-xl transition-colors shadow-md"
            >
              Skriv en refleksion / et hack
            </button>
            <button 
              onClick={handleFinish}
              className="bg-sand hover:bg-teal-50 text-teal-900 font-sans font-semibold py-4 px-6 rounded-xl border border-teal-200 transition-colors"
            >
              "Det tænker jeg lige over..." (Gå til resultat)
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-left animate-in fade-in slide-in-from-bottom-4">
            <textarea
              autoFocus
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Dine tanker om valget... (gemmes kun lokalt)"
              className="w-full h-32 p-4 border border-teal-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none font-serif text-lg bg-sand/30"
            />
            <button 
              onClick={handleFinish}
              className="bg-teal-700 hover:bg-teal-800 text-white font-sans font-bold py-4 px-6 rounded-xl transition-colors shadow-md"
            >
              Gem og se mit resultat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
