import type {} from '';

export type DissonanceResult = {
  hasDissonance: boolean;
  message: string;
};

export function detectDissonance(lens: LensOption, placedCards: Card[]): DissonanceResult {
  // +2 is index 0, +1 is index 1 and 2
  const topCards = placedCards.slice(0, 3);
  
  const eyeCount = topCards.filter(c => c.category === 'eye').length;
  const handCount = topCards.filter(c => c.category === 'hand').length;
  
  let lensPole: 'eye' | 'hand' | 'neutral' = 'neutral';
  if (['facit', 'transmission'].includes(lens.tag)) lensPole = 'eye';
  if (['produktion', 'undersøgelse'].includes(lens.tag)) lensPole = 'hand';

  if (lensPole === 'eye' && handCount >= 2) {
    return {
      hasDissonance: true,
      message: `Du har valgt "${lens.label}" som motor, men dine topprioriteter (+2/+1) trækker mod åbne problemer og elev-undersøgelse (Hånden). Det kan være et bevidst didaktisk hack — er det?`
    };
  }

  if (lensPole === 'hand' && eyeCount >= 2) {
    return {
      hasDissonance: true,
      message: `Du har valgt "${lens.label}" som motor (undersøgelse/produktion), men dine topprioriteter (+2/+1) fokuserer på transmission og overlevering (Øjet). Hvilken antagelse hviler det på, hvis lukkede formater skal bære mødet med det ukendte?`
    };
  }

  return {
    hasDissonance: false,
    message: "Din linse og dine prioriteringer trækker samme vej. Hvad bekræfter det for dig?"
  };
}
