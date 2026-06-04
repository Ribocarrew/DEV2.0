import { useState } from 'react';
import type { Session } from '../types';
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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // Reconstruct data for detection
  const lens = lenses.find(l => l.id === session.lens)!;
  const placedCards = session.diamond.map(d => cards.find(c => c.id === d.cardId)!);
  
  const { hasDissonance, message } = detectDissonance(lens, placedCards);

  const handleAIChallenge = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch('/.netlify/functions/udfordr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lens, cards: placedCards })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.details || data.error || `HTTP ${res.status}`);
      }
      setAiResponse(data.reply);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

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
        
        <p className="text-xl font-serif text-ink mb-6 leading-relaxed">
          "{message}"
        </p>



        {!isWriting ? (
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleFinish}
              className="bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
            >
              "Det tænker jeg lige over..." (Gå til resultat)
            </button>
            <button 
              onClick={() => setIsWriting(true)}
              className="bg-transparent border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-sans font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Skriv en refleksion / et hack
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

        <div className="mt-8 border-t border-teal-100 pt-8">
          {!aiResponse && !aiLoading && !aiError && (
            <div>
              <button 
                onClick={handleAIChallenge}
                className="bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 font-sans font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm text-sm"
              >
                Lad spejlet udfordre mig dybere
              </button>
            </div>
          )}

          {aiLoading && (
            <div className="text-teal-600 font-serif italic animate-pulse text-sm">
              Spejlet tænker...
            </div>
          )}

          {aiError && (
            <div className="text-red-500 font-serif text-sm">
              Fejl: {aiError}
            </div>
          )}

          {aiResponse && (
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 text-left animate-in fade-in zoom-in-95 duration-500 shadow-sm">
              <h3 className="text-sm font-sans font-bold text-teal-800 mb-2">Det dybere spejl spørger:</h3>
              <p className="text-lg font-serif text-ink italic leading-relaxed">"{aiResponse}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
