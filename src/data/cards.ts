import type { Card } from '../types';

export const cards: Card[] = [
  // Øjets epistemologi (12)
  { id: 'e1', category: 'eye', friction: 'glat', text: 'Transmission — Stoffet gennemgås for eleverne (fx via tavle, skærm eller video).' },
  { id: 'e2', category: 'eye', friction: 'glat', text: 'Færdighedstræning — Eleverne løser lukkede rutineopgaver for at træne færdigheder.' },
  { id: 'e3', category: 'eye', friction: 'glat', text: 'Facitjagten — Eleverne tager quizzer eller test, hvor der er et klart rigtigt eller forkert svar.' },
  { id: 'e4', category: 'eye', friction: 'glat', text: 'Friktionsløs procedure — Eleverne følger en trin-for-trin-instruktion for at nå frem til det korrekte resultat.' },
  { id: 'e5', category: 'eye', friction: 'glat', text: 'Standardisering — Eleverne anvender velkendte skabeloner, formler eller metoder til at løse opgaven.' },
  { id: 'e6', category: 'eye', friction: 'glat', text: 'Viden som objekt — Eleverne læser eller ser materiale primært for bagefter at kunne huske og gengive viden.' },
  { id: 'e7', category: 'eye', friction: 'glat', text: 'Synligheds-idealet — Eleverne arbejder med at præsentere deres viden i et pænt og let aflæseligt format.' },
  { id: 'e8', category: 'eye', friction: 'glat', text: 'Målstyret progression — Elevernes arbejde styres stramt af foruddefinerede, detaljerede og målbare læringsmål.' },
  { id: 'e9', category: 'eye', friction: 'glat', text: 'Algoritmisk tilpasning — Eleverne arbejder i et digitalt system, der automatisk fører dem til næste lukkede opgave, uden at de selv vælger vejen.' },
  { id: 'e10', category: 'eye', friction: 'glat', text: 'Reproduktiv formidling — Eleverne fremlægger præcis den viden, jeg forudgående har udvalgt og godkendt som kernestof.' },
  { id: 'e11', category: 'eye', friction: 'glat', text: 'AI som facitliste — Teknologien (fx en chatbot) bruges primært til at levere hurtige og korrekte svar på konkrete opgaver.' },
  { id: 'e12', category: 'eye', friction: 'glat', text: 'Fejlfri eksekvering — Fejl rettes umiddelbart af lærer eller teknologi for at sikre den korrekte informationsgengivelse fra start.' },

  // Håndens epistemologi (12)
  { id: 'h1', category: 'hand', friction: 'ru', text: 'Åbne problemer — Eleverne undersøger komplekse problemer, hvor løsningen ikke er kendt på forhånd.' },
  { id: 'h2', category: 'hand', friction: 'ru', text: 'Virkelighedens rod — Eleverne indsamler rodede eller uordnede data fra virkeligheden (fx lokalsamfund eller internet).' },
  { id: 'h3', category: 'hand', friction: 'ru', text: 'Elev-aktørskab — Eleverne udvikler og afprøver aktivt deres egne faglige hypoteser og idéer.' },
  { id: 'h4', category: 'hand', friction: 'ru', text: 'Epistemisk friktion — Eleverne oplever faglig forvirring eller kognitiv friktion som en naturlig del af processen.' },
  { id: 'h5', category: 'hand', friction: 'ru', text: 'Dømmekraft — Eleverne skal bruge deres viden til at udøve holdning og dømmekraft i en sag.' },
  { id: 'h6', category: 'hand', friction: 'ru', text: 'Polycentriske løsninger — Eleverne arbejder bevidst med opgaver, der har flere mulige, gyldige løsningsstrategier.' },
  { id: 'h7', category: 'hand', friction: 'ru', text: 'Social vidensskabelse — Eleverne diskuterer og forhandler faglig tvivl for at nå frem til en konklusion.' },
  { id: 'h8', category: 'hand', friction: 'glat', text: 'Kropslig forankring — Eleverne bygger, former eller bruger kroppen fysisk til at undersøge et fagligt fænomen.' },
  { id: 'h9', category: 'hand', friction: 'ru', text: 'AI som kritisk modspiller — Eleverne prompt-designer en AI til at udfordre deres hypoteser, så de træner kildekritik og dømmekraft.' },
  { id: 'h10', category: 'hand', friction: 'ru', text: 'Kaos som vilkår — Undervisningen rummer bevidst uforudsigelige elementer, hvor jeg som lærer heller ikke kender slutfacit.' },
  { id: 'h11', category: 'hand', friction: 'ru', text: 'Iterativ skabelse — Eleverne prototyper, fejler og omdesigner løbende undervejs i deres faglige produktionsproces.' },
  { id: 'h12', category: 'hand', friction: 'ru', text: 'Holdningsbåret viden — Faget bruges eksplicit som et redskab til at tage personlig stilling til etiske eller samfundsaktuelle dilemmaer.' },

  // Neutrale, organisatoriske praksisser (12)
  { id: 'n1', category: 'neutral', friction: 'glat', text: 'Gruppe-håndværk — Eleverne samarbejder i grupper om at løse en bunden opgave.' },
  { id: 'n2', category: 'neutral', friction: 'glat', text: 'Individuelt fokus — Eleverne løser individuelle arbejdsopgaver i stilhed.' },
  { id: 'n3', category: 'neutral', friction: 'glat', text: 'Formativ justering — Eleverne tilpasser arbejdet baseret på feedback fra læreren undervejs.' },
  { id: 'n4', category: 'neutral', friction: 'glat', text: 'Informationssøgning — Eleverne søger selv information og fakta, når de er i tvivl.' },
  { id: 'n5', category: 'neutral', friction: 'glat', text: 'Produktionen — Eleverne skaber faglige produkter for at formidle deres egen forståelse.' },
  { id: 'n6', category: 'neutral', friction: 'glat', text: 'Værktøjsvalg — Eleverne vælger selv, hvilke hjælpemidler eller værktøjer der er bedst til at løse opgaven.' },
  { id: 'n7', category: 'neutral', friction: 'glat', text: 'Metakognition — Eleverne evaluerer deres egen og andres læringsproces.' },
  { id: 'n8', category: 'neutral', friction: 'glat', text: 'Fællesrummet — Vi bruger en fælles digital platform eller et fysisk fællesbord til at samle dokumenter og koordinere opgaver.' },
  { id: 'n9', category: 'neutral', friction: 'glat', text: 'Analog rammesætning — Det faglige arbejde foregår bevidst uden digitale skærme i en bestemt tidsramme.' },
  { id: 'n10', category: 'neutral', friction: 'ru', text: 'Tværfaglighed — Forløbet fletter kompetencer og metoder fra flere forskellige fag sammen.' },
  { id: 'n11', category: 'neutral', friction: 'glat', text: 'Trivsel som fundament — Der afsættes eksplicit tid til at arbejde med stemningen, relationerne og trygheden i klasserummet.' },
  { id: 'n12', category: 'neutral', friction: 'ru', text: 'Udeskole-rammen — Læringsrummet flyttes fysisk ud af klassen (uanset om selve opgaven er styret eller fri).' },
];
