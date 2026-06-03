import type { LensOption } from '../types';
import { lenses } from '../data/lenses';
import { Monitor, BookOpen } from 'lucide-react';

type MethodLensProps = {
  onSelect: (lens: LensOption) => void;
};

export function MethodLens({ onSelect }: MethodLensProps) {
  const digitalLenses = lenses.filter(l => l.room === 'digital');
  const analogLenses = lenses.filter(l => l.room === 'analog');

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-sans font-semibold text-teal-700 mb-2">Trin 1: Metode-linsen</h2>
      <p className="text-stone mb-8 font-serif text-lg">Hvad er den primære motor i dit næste forløb?</p>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="text-teal-700" size={20} />
            <h3 className="font-sans font-semibold text-teal-900">Det digitale rum</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {digitalLenses.map(lens => (
              <button
                key={lens.id}
                onClick={() => onSelect(lens)}
                className="text-left bg-white border-2 border-transparent hover:border-amber-400 shadow-sm hover:shadow-md transition-all p-4 rounded-xl flex items-center"
              >
                <span className="font-serif text-ink">{lens.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-teal-700" size={20} />
            <h3 className="font-sans font-semibold text-teal-900">Det analoge rum</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analogLenses.map(lens => (
              <button
                key={lens.id}
                onClick={() => onSelect(lens)}
                className="text-left bg-white border-2 border-transparent hover:border-amber-400 shadow-sm hover:shadow-md transition-all p-4 rounded-xl flex items-center"
              >
                <span className="font-serif text-ink">{lens.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
