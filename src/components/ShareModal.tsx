import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import type {} from '';
import { encodeScore } from '../utils/sharing';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  session: Session | undefined;
};

export function ShareModal({ isOpen, onClose, session }: Props) {
  if (!isOpen || !session) return null;

  const encoded = encodeScore(session.scores.eye, session.scores.hand, session.scores.neutral, session.timestamp);
  
  // Byg URL til host.
  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}#data=${encoded}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 text-center border-2 border-amber-200"
        >
          <h2 className="text-2xl font-sans font-bold text-teal-700 mb-2">Del dit resultat</h2>
          <p className="text-stone font-serif mb-6 text-sm">
            Lad underviseren scanne koden for at tilføje dit anonyme resultat til det fælles klassespejl.
          </p>
          
          <div className="bg-sand p-4 rounded-2xl flex justify-center mb-6 shadow-inner">
            <QRCode value={shareUrl} size={200} fgColor="#155E5E" bgColor="transparent" />
          </div>

          <div className="text-left mb-6 bg-teal-50 p-3 rounded-lg border border-teal-100 overflow-x-auto">
            <p className="text-xs text-teal-800 font-sans select-all whitespace-nowrap">{shareUrl}</p>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-sand hover:bg-teal-50 text-teal-900 font-sans font-bold py-3 px-6 rounded-xl border border-teal-200 transition-colors"
          >
            Luk
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
