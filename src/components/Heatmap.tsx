import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSessions } from '../hooks/useSessions';
import { ShareModal } from './ShareModal';
import { generateRichFeedback } from '../utils/feedback';
import { lenses } from '../data/lenses';
import { cards } from '../data/cards';
import { RichFeedbackView } from './RichFeedback';
import type { Session } from '../types';
export function Heatmap() {
  const { sessions, clearSessions } = useSessions();
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Sort by timestamp asc
  const sortedSessions = [...sessions].sort((a, b) => a.timestamp - b.timestamp);
  const latestSession = sortedSessions[sortedSessions.length - 1];

  let richFeedback = null;
  if (latestSession) {
    const lens = lenses.find(l => l.id === latestSession.lens);
    const placedCards = latestSession.diamond.map(d => cards.find(c => c.id === d.cardId)!);
    if (lens && placedCards.length > 0) {
      richFeedback = generateRichFeedback(lens, placedCards);
    }
  }

  const getCoordinatesAndColor = (session: Session) => {
    let handScore = 0;
    let eyeScore = 0;
    let frictionScore = 0;

    session.diamond.forEach(d => {
      const card = cards.find(c => c.id === d.cardId);
      if (!card) return;
      
      const weight = d.position;

      if (card.category === 'hand') handScore += weight;
      if (card.category === 'eye') eyeScore += weight;

      let frictionVal = card.friction === 'ru' ? 1 : -1;
      if (card.category === 'neutral') {
        frictionVal *= 0.5;
      }
      frictionScore += frictionVal * weight;
    });

    const epistemologyScore = handScore - eyeScore;
    const x = 10 + Math.max(0, Math.min(80, ((epistemologyScore + 8) / 16) * 80));
    const y = 10 + Math.max(0, Math.min(80, ((8 - frictionScore) / 16) * 80));

    const lens = lenses.find(l => l.id === session.lens);
    const color = lens?.room === 'digital' ? 'bg-amber-500' : 'bg-teal-600';

    return { x, y, color };
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-sans font-semibold text-teal-700 mb-3">Dit epistemologiske landkort</h2>
        <p className="text-stone font-serif text-lg">
          Her kan du se tendensen i dine valg. Nyeste refleksion lyser klarest, mens ældre toner ud som din <em>tavse arv</em>.
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
        {/* Axis labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-sans font-bold text-teal-800 bg-white/80 px-3 py-1 rounded-full shadow-sm text-sm z-0">
          Friktion (Modstand)
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans font-bold text-stone/60 bg-white/80 px-3 py-1 rounded-full text-xs z-0">
          Glathed (Friktionsløs)
        </div>
        
        {/* Hånd labels */}
        <div className="absolute top-1/2 right-2 -translate-y-1/2 font-sans font-bold text-teal-800 bg-white/80 px-3 py-1 rounded-full shadow-sm text-sm z-0 origin-center rotate-90 sm:rotate-0">
          Hånden (Undersøgelse)
        </div>
        <div className="absolute top-1/2 left-2 -translate-y-1/2 font-sans font-bold text-stone/60 bg-white/80 px-3 py-1 rounded-full text-xs z-0 origin-center -rotate-90 sm:rotate-0">
          Øjet (Transmission)
        </div>

        {/* Plotting points */}
        {sortedSessions.map((session, index) => {
          const isLatest = index === sortedSessions.length - 1;
          const opacity = isLatest ? 1 : Math.max(0.3, (index + 1) / sortedSessions.length);
          const size = isLatest ? 'w-10 h-10' : 'w-6 h-6';
          const { x, y, color } = getCoordinatesAndColor(session);
          
          return (
            <motion.div
              key={session.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${size} ${color} ${
                isLatest 
                  ? 'shadow-[0_0_15px_rgba(0,0,0,0.2)] z-20 border-2 border-white' 
                  : 'z-10'
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`
              }}
            >
               {isLatest && (
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-xs font-sans font-bold px-2 py-1 rounded-md whitespace-nowrap">
                   Netop nu
                 </div>
               )}
            </motion.div>
          );
        })}
      </div>

      {latestSession && richFeedback && (
        <RichFeedbackView feedback={richFeedback} session={latestSession} />
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-teal-100 shadow-sm rounded-xl p-5 mb-8">
        <p className="text-sm font-serif text-stone flex-1">
          <strong>Farvekode:</strong> <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1 align-middle"></span>Digital motor / <span className="inline-block w-3 h-3 rounded-full bg-teal-600 mr-1 align-middle ml-2"></span>Analog motor. <br/><span className="mt-1 block">Landkortet viser en tendens — ikke en eksakt måling.</span>
        </p>
        <button 
          onClick={() => {
            if (confirm('Er du sikker på, at du vil rydde alle dine data? Dette kan ikke fortrydes.')) {
              clearSessions();
              window.location.reload();
            }
          }}
          className="text-red-500 font-sans font-bold text-sm whitespace-nowrap hover:bg-red-50 py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="text-lg">🗑️</span> Ryd mine data
        </button>
      </div>
      
      <div className="text-center flex flex-col gap-4 max-w-sm mx-auto">
        {latestSession && (
          <button 
            onClick={() => setIsShareOpen(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-sans font-bold py-4 px-10 rounded-xl transition-all shadow-sm hover:shadow"
          >
            Del med underviser (Klassespejl)
          </button>
        )}
        <button 
          onClick={() => window.location.reload()}
          className="bg-teal-700 hover:bg-teal-800 text-white font-sans font-bold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
        >
          Start ny refleksion
        </button>
      </div>
      
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} session={latestSession} />
    </div>
  );
}
