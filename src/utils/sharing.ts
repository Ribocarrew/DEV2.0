export type SharedScore = {
  e: number;
  h: number;
  n: number;
  t: number;
};

export function encodeScore(eye: number, hand: number, neutral: number, timestamp: number): string {
  const json = JSON.stringify({ e: eye, h: hand, n: neutral, t: timestamp });
  return btoa(json);
}

export function decodeScore(encoded: string): SharedScore | null {
  try {
    const json = atob(encoded);
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
}
