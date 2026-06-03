import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AboutModal } from './AboutModal';

type Props = {
  onStart: () => void;
};

export function StartScreen({ onStart }: Props) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleClearData = () => {
    if (confirm('Er du sikker på, at du vil rydde alle dine data? Dette kan ikke fortrydes.')) {
      localStorage.removeItem('epistemologisk-spejl-sessions');
      alert('Dine data er blevet slettet.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="inline-block bg-teal-50 text-teal-800 font-sans font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-teal-200">
            🔒 Alt gemmes kun lokalt i din egen browser
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-sans font-bold text-teal-800 mb-6 tracking-tight">
            Det Epistemologiske Spejl
          </h2>
          
          <p className="text-xl sm:text-2xl font-serif text-ink mb-12 leading-relaxed">
            Et 2-minutters spejl, der hjælper dig med at få øje på dine egne vaner, før du planlægger næste forløb.
          </p>

          <div className="flex flex-col gap-5 items-center w-full max-w-sm mx-auto">
            <button 
              onClick={onStart}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-lg py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Start refleksionen (2 min)
            </button>
            
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="text-teal-700 font-sans font-semibold hover:text-teal-900 underline underline-offset-4 decoration-teal-300 hover:decoration-teal-700 transition-colors"
            >
              Baggrund, evidens og datasikkerhed
            </button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <button 
            onClick={handleClearData}
            className="text-stone text-xs font-sans hover:text-ink transition-colors"
          >
            Delt computer? Ryd dine data her.
          </button>
        </div>
      </div>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}
