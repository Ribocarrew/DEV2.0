import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card, Session } from '../types';
import { drawCards, calculateScore, SLOT_VALUES } from '../utils/engine';
import { useSessions } from '../hooks/useSessions';

const SLOT_CONFIG = [
  { id: 0, value: 2, label: '+2 (Mest dominerende)' },
  { id: 1, value: 1, label: '+1' },
  { id: 2, value: 1, label: '+1' },
  { id: 3, value: 0, label: '0 (Neutral)' },
  { id: 4, value: 0, label: '0' },
  { id: 5, value: 0, label: '0' },
  { id: 6, value: -1, label: '-1' },
  { id: 7, value: -1, label: '-1' },
  { id: 8, value: -2, label: '-2 (Mindst dominerende)' },
];

type DiamondEngineProps = {
  lens: import('../types').LensOption;
  onComplete: (session: Session) => void;
};

export function DiamondEngine({ lens, onComplete }: DiamondEngineProps) {
  const [pool, setPool] = useState<Card[]>([]);
  const [slots, setSlots] = useState<(Card | null)[]>(Array(9).fill(null));
  const { addSession } = useSessions();

  useEffect(() => {
    setPool(drawCards());
  }, []);

  const handlePoolCardTap = (card: Card) => {
    const firstEmptyIndex = slots.findIndex(s => s === null);
    if (firstEmptyIndex === -1) return;

    const newSlots = [...slots];
    newSlots[firstEmptyIndex] = card;
    setSlots(newSlots);
    setPool(pool.filter(c => c.id !== card.id));
  };

  const handleSlotCardTap = (index: number) => {
    const card = slots[index];
    if (!card) return;

    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    setPool([...pool, card]);
  };

  const handleConfirm = () => {
    const finalCards = slots as Card[];
    const scores = calculateScore(finalCards);
    
    const session: Session = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      lens: lens.id,
      diamond: finalCards.map((card, index) => ({ 
        cardId: card.id, 
        position: SLOT_VALUES[index] 
      })),
      dissonanceFlagged: false, // Trin 5
      reflection: '',
      scores
    };

    addSession(session);
    onComplete(session);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pb-[50vh]">
      <h2 className="text-2xl font-sans font-semibold text-teal-700 mb-2">Trin 2: Diamanten</h2>
      <p className="text-stone mb-6 font-serif">Fordel kortene fra +2 (mest) til -2 (mindst). Tap på et kort for at flytte det.</p>
      
      {/* Slots Section */}
      <div className="space-y-3">
        {SLOT_CONFIG.map((config, index) => (
          <div key={`slot-${config.id}`} className="relative border-2 border-dashed border-teal-200 bg-sand/50 rounded-xl p-2 min-h-[5rem] flex flex-col justify-center items-center">
            {/* Slot Background Label */}
            {!slots[index] && (
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40">
                <span className="font-sans font-bold text-teal-900 tracking-wider">{config.label}</span>
              </div>
            )}

            {/* Placed Card */}
            <AnimatePresence mode="popLayout">
              {slots[index] && (
                <motion.div
                  layoutId={slots[index]!.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleSlotCardTap(index)}
                  className="relative z-10 w-full bg-white border-l-4 border-teal-700 shadow-md rounded-lg p-4 cursor-pointer hover:-translate-y-0.5 transition-transform"
                >
                  <p className="text-sm font-serif text-ink leading-relaxed">{slots[index]!.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Pool Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-sand border-t border-teal-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] p-4 max-h-[45vh] overflow-y-auto z-50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-sans font-semibold text-teal-700 mb-3">
            Tilgængelige kort ({pool.length})
          </h3>
          <div className="flex flex-col gap-3 pb-8">
            <AnimatePresence mode="popLayout">
              {pool.map(card => (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => handlePoolCardTap(card)}
                  className="bg-white border border-amber-200 border-l-4 border-l-amber-500 shadow-sm rounded-lg p-3 cursor-pointer hover:-translate-y-0.5 transition-transform"
                >
                  <p className="text-sm font-serif text-ink leading-relaxed">{card.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {pool.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 text-center"
              >
                <button 
                  onClick={handleConfirm}
                  className="bg-amber-500 hover:bg-amber-600 transition-colors text-white font-sans font-bold py-3 px-6 rounded-lg w-full shadow-lg"
                >
                  Bekræft fordeling
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
