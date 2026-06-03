import type { Card, LensOption } from '../types';

export interface RichFeedback {
  priority: string;
  interpretation: string;
  tension: string;
  nextStep: string;
}

export function generateRichFeedback(lens: LensOption, placedCards: Card[]): RichFeedback {
  const top1 = placedCards[0];
  const top2 = placedCards[1];
  const bottom = placedCards[8];

  const priorityText = `Du lod "${top1.text}" og "${top2.text}" veje tungest, mens "${bottom.text}" røg helt i bund.`;

  const topCards = placedCards.slice(0, 3);
  const eyeCount = topCards.filter(c => c.category === 'eye').length;
  const handCount = topCards.filter(c => c.category === 'hand').length;
  const neutralCount = topCards.filter(c => c.category === 'neutral').length;

  let interpretationText = '';
  if (eyeCount >= 2) {
    interpretationText = `Dine højeste prioriteter trækker undervisningen overvejende i retning af "Øjets epistemologi". Eleverne vil primært opleve en undervisning baseret på transmission og tydelige svar, hvor de forventes at modtage og tilegne sig fastlagt viden.`;
  } else if (handCount >= 2) {
    interpretationText = `Dine højeste prioriteter trækker undervisningen stærkt i retning af "Håndens epistemologi". Dette inviterer eleverne ind i en skabende proces, hvor de skal bruge deres dømmekraft og forholde sig til uafklarede problemer.`;
  } else if (neutralCount >= 2) {
    interpretationText = `Dine højeste prioriteter peger overvejende på de organisatoriske aspekter. Dette skaber tryghed og struktur for eleverne, men sætter i sig selv hverken direkte kurs mod åben undersøgelse eller lukket transmission.`;
  } else {
    interpretationText = `Dine prioriteter er balanceret mellem det styrende, det undersøgende og det organisatoriske. Eleverne vil opleve et rum, der forsøger at rumme både faste rammer og plads til at prøve sig frem.`;
  }

  let lensPole: 'eye' | 'hand' | 'neutral' = 'neutral';
  if (['facit', 'transmission'].includes(lens.tag)) lensPole = 'eye';
  if (['produktion', 'undersøgelse'].includes(lens.tag)) lensPole = 'hand';

  let tensionText = '';
  if (lensPole === 'eye' && handCount >= 2) {
    tensionText = `Dine prioriteringer peger mod det åbne, selvom du valgte "${lens.label}" som motor. Kan en lukket ramme bære friktionen fra det undersøgende rum?`;
  } else if (lensPole === 'hand' && eyeCount >= 2) {
    tensionText = `Du valgte "${lens.label}" som motor, men dine topprioriteringer har fokus på transmission og lukkede svar. Risikerer den undersøgende ramme at blive en skinmanøvre, hvis formålet er givet på forhånd?`;
  } else if (neutralCount >= 2) {
    tensionText = `Den strukturelle og neutrale praksis fylder mest i din top. Er selve rammen ved at blive vigtigere end det faglige og epistemologiske indhold?`;
  } else if (lensPole === 'hand' && bottom.category === 'hand') {
    tensionText = `Du har en undersøgende motor ("${lens.label}"), men har valgt at lægge "${bottom.text}" helt i bund. Er der elementer af den åbne praksis, der skaber unødig støj i din kontekst?`;
  } else if (lensPole === 'eye' && bottom.category === 'eye') {
    tensionText = `Du har en overleverende motor ("${lens.label}"), men sorterer "${bottom.text}" helt fra. Hvilke dele af traditionel formidling forsøger du bevidst at styre udenom her?`;
  } else {
    tensionText = `Der er umiddelbar harmoni mellem din motor og dine prioriteringer, som trækker samme vej. Kan der opstå en risiko for "ekkokammer", når intet skaber bevidst didaktisk modstand i designet?`;
  }

  let nextStep = '';
  if (lensPole === 'eye' && handCount >= 2) {
    nextStep = "Hvor vil du give plads til, at elevernes egne løsninger for alvor kan påvirke undervisningens egentlige retning?";
  } else if (lensPole === 'hand' && eyeCount >= 2) {
    nextStep = "Hvordan kan du åbne op for en reel tvivl i klasserummet, uden at du mister følelsen af retning?";
  } else if (neutralCount >= 2) {
    nextStep = "Hvilken reel epistemologisk erfaring – udover overholdelse af rammen – vil du have, at eleverne gør sig her?";
  } else if (handCount >= 2) {
    nextStep = "Når eleverne selv skal skabe viden, hvordan sikrer du så, at de støder på den rette faglige modstand undervejs?";
  } else if (eyeCount >= 2) {
    nextStep = "Hvis den primære viden overleveres, hvordan vil du så invitere eleverne til at byde meningsfuldt ind med deres egne perspektiver?";
  } else {
    nextStep = "Hvad er den mindste justering, du kan lave lige nu, for at bringe lidt produktiv didaktisk friktion ind i planen?";
  }

  return {
    priority: priorityText,
    interpretation: interpretationText,
    tension: tensionText,
    nextStep: nextStep
  };
}
