import type {} from '';
import { cards } from '../data/cards';

export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function drawCards(): Card[] {
  const eyes = shuffle(cards.filter(c => c.category === 'eye')).slice(0, 3);
  const hands = shuffle(cards.filter(c => c.category === 'hand')).slice(0, 3);
  const neutrals = shuffle(cards.filter(c => c.category === 'neutral')).slice(0, 3);
  
  return shuffle([...eyes, ...hands, ...neutrals]);
}

export const SLOT_VALUES = [2, 1, 1, 0, 0, 0, -1, -1, -2];

export function calculateScore(slots: Card[]) {
  const scores = { eye: 0, hand: 0, neutral: 0 };
  slots.forEach((card, index) => {
    if (card) {
      scores[card.category] += SLOT_VALUES[index];
    }
  });
  return scores;
}

