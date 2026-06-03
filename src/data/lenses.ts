import type { LensOption } from '../types';

export const lenses: LensOption[] = [
  // Digitalt rum
  { id: 'l1', label: 'Generativ AI (undersøgelse/sparring/facitjagt)', tag: 'ai', room: 'digital' },
  { id: 'l2', label: 'Adaptiv træning (selvrettende portaler)', tag: 'facit', room: 'digital' },
  { id: 'l3', label: 'Skærm-transmission (video, flipped)', tag: 'transmission', room: 'digital' },
  { id: 'l4', label: 'Digital produktion (makerspace, kodning, medier)', tag: 'produktion', room: 'digital' },
  
  // Analogt rum
  { id: 'l5', label: 'Analog reproduktion (tavle, grundbog, opgaveark)', tag: 'transmission', room: 'analog' },
  { id: 'l6', label: 'Analog undersøgelse (eksperimenter, udeskole, rodede data)', tag: 'undersøgelse', room: 'analog' },
  { id: 'l7', label: 'Analog organisering (læsning, gruppearbejde, arbejdsro)', tag: 'neutral', room: 'analog' },
];
