import { motion } from 'framer-motion';
import type { RichFeedback } from '../utils/feedback';
import type { Session } from '../types';

type Props = {
  feedback: RichFeedback;
  session: Session;
};

export function RichFeedbackView({ feedback, session }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1.2
      }
    }
  };

  const itemVariants = {
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

      {session.reflection && (
        <motion.div variants={itemVariants} className="mt-10 bg-sand p-5 rounded-2xl border border-teal-100">
          <h4 className="text-sm font-sans font-bold text-teal-800 mb-2">Dit gemte didaktiske hack:</h4>
          <p className="font-serif text-ink whitespace-pre-wrap">{session.reflection}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
