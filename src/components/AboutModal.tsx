import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AboutModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-sand w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-y-auto border-2 border-teal-100"
        >
          <div className="sticky top-0 bg-sand/95 backdrop-blur-md px-6 py-4 border-b border-teal-100 flex justify-between items-center z-10">
            <h2 className="text-xl font-sans font-bold text-teal-800">Baggrund & Evidens</h2>
            <button 
              onClick={onClose}
              className="text-stone hover:text-ink font-sans font-bold text-2xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal-50 transition-colors"
            >
              &times;
            </button>
          </div>
          
          <div className="p-6 space-y-8 font-serif text-ink leading-relaxed">
            
            <section>
              <h3 className="text-lg font-sans font-semibold text-teal-700 mb-2">Hvem og Hvorfor?</h3>
              <p className="mb-3">
                Udviklet af <strong>Jacob Witt-Larsen</strong>, MIL (Master i IKT & Læring) ved Aalborg Universitet.
              </p>
              <p>
                Formålet med Værkstedet 2.0 er at synliggøre den "tavse arv" i undervisningen — spændingen mellem <em>Øjet</em> (sikkerhed, transmission, facit) og <em>Hånden</em> (undersøgelse, friktion, kaos). Spejlet dømmer ikke, men skaber bevidsthed i forberedelsesøjeblikket.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-teal-700 mb-2">Teorien bag Spejlet</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Q-metoden:</strong> Vi bruger en tvungen fordeling (diamanten) for at modvirke "social desirability bias" — du kan ikke vælge, at <em>alt</em> er lige vigtigt. Det tvinger prioriteringen frem.</li>
                <li><strong>Didaktiske benspænd:</strong> Inspireret af Lea Lund og Toulmins belæg (metode-linsen).</li>
                <li><strong>Reflective Friction:</strong> Christian Dalsgaards begreb. Interaktionen skal give netop nok friktion til at skabe refleksion, uden at læreren forlader processen.</li>
                <li><strong>Social Acceleration:</strong> Med udgangspunkt i Hartmut Rosa er værktøjet designet til at tage under 2 minutter, da det skal fungere i lærernes travle virkelighed.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-sans font-semibold text-teal-700 mb-2">🔒 Privacy & GDPR</h3>
              <p className="mb-3">
                Alt gemmes <strong>100% lokalt</strong> i din egen browser (localStorage). Intet sendes til en ekstern server, ingen cookies, ingen tracking. 
              </p>
              <p>
                Du har fuld kontrol og kan altid slette dine data via "Ryd mine data"-knappen. Deling foregår udelukkende via sikre, indkodede URL-links.
              </p>
            </section>

            <section className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
              <h3 className="text-sm font-sans font-bold text-amber-800 mb-1">En ærlig note om Heatmappet</h3>
              <p className="text-sm text-amber-900">
                De 36 kort varierer fra session til session (der trækkes tilfældigt 3 fra hver kategori). Heatmappet er derfor et udtryk for en <strong>tendens og en provokation</strong> — ikke en statisk eller fuldstændig videnskabelig sandhed. Spejlets mål er at få dig til at stoppe op og reflektere.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
