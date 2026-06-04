import { useState } from 'react';
import { motion } from 'framer-motion';
import type { RichFeedback } from '../utils/feedback';
import type { Session } from '../types';
import { lenses } from '../data/lenses';
import { cards } from '../data/cards';

type Props = {
  feedback: RichFeedback;
  session: Session;
};

export function RichFeedbackView({ feedback, session }: Props) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiError, setAiError] = useState(false);

  const handleAIChallenge = async () => {
    setAiLoading(true);
    setAiError(false);
    
    const lens = lenses.find(l => l.id === session.lens);
    const placedCards = session.diamond.map(d => cards.find(c => c.id === d.cardId)!);

    try {
      const res = await fetch('/.netlify/functions/udfordr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lens, cards: placedCards })
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setAiResponse(data.reply);
    } catch (err) {
      console.error(err);
      setAiError(true);
    } finally {
      setAiLoading(false);
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 mb-8 text-left shadow-md max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h3 variants={itemVariants} className="text-2xl font-sans font-bold text-teal-800 mb-6 flex items-center gap-3 border-b border-teal-50 pb-4">
        <span>🪞</span> Dit epistemologiske spejl
      </motion.h3>

      <div className="space-y-8">
        <motion.div variants={itemVariants}>
          <h4 className="text-xs uppercase tracking-widest font-bold text-teal-500 mb-2">1. Hvad du prioriterede</h4>
          <p className="text-stone font-serif text-lg leading-relaxed">{feedback.priority}</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h4 className="text-xs uppercase tracking-widest font-bold text-teal-500 mb-2">2. Hvad det trækker imod</h4>
          <p className="text-stone font-serif text-lg leading-relaxed">{feedback.interpretation}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100">
          <h4 className="text-xs uppercase tracking-widest font-bold text-amber-600 mb-2">3. Den interessante spænding</h4>
          <p className="text-amber-900 font-serif text-lg italic leading-relaxed">{feedback.tension}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-2">
          <h4 className="text-xs uppercase tracking-widest font-bold text-teal-500 mb-2">4. Næste skridt</h4>
          <p className="text-teal-900 font-sans font-semibold text-lg leading-relaxed">{feedback.nextStep}</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-8 border-t border-teal-100 pt-8">
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
          <div className="text-stone/60 font-serif text-sm">
            Spejlet kan ikke udfordre lige nu. Prøv igen senere.
          </div>
        )}

        {aiResponse && (
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 text-left animate-in fade-in zoom-in-95 duration-500 shadow-sm">
            <h3 className="text-sm font-sans font-bold text-teal-800 mb-2">Det dybere spejl spørger:</h3>
            <p className="text-lg font-serif text-ink italic leading-relaxed">"{aiResponse}"</p>
          </div>
        )}
      </motion.div>

      {session.reflection && (
        <motion.div variants={itemVariants} className="mt-10 bg-sand p-5 rounded-2xl border border-teal-100">
          <h4 className="text-sm font-sans font-bold text-teal-800 mb-2">Dit gemte didaktiske hack:</h4>
          <p className="font-serif text-ink whitespace-pre-wrap">{session.reflection}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
