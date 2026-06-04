export type Category = 'eye' | 'hand' | 'neutral';

export type LensOption = {
  id: string;
  label: string;
  tag: 'ai' | 'facit' | 'transmission' | 'produktion' | 'undersøgelse' | 'neutral';
  room: 'digital' | 'analog';
};


export type Card = {
  id: string;
  text: string;
  category: Category;
  tags?: string[];
  friction: 'ru' | 'glat';
};

export type CardPlacement = {
  cardId: string;
  position: number; // -2..+2
};

export type Session = {
  id: string;            // uuid, lokalt genereret
  timestamp: number;     // til time-lapse
  lens: string;          // valgt metode-linse (Toulmins belæg)
  diamond: CardPlacement[];
  dissonanceFlagged: boolean;
  reflection: string;    // lærerens egen note (kan være tom)
  scores: { eye: number; hand: number; neutral: number };
};
