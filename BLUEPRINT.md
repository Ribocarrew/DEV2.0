# Blueprint: Det Epistemologiske Værksted 2.0

*Fuld konceptuel og teknisk køreplan — til vibecoding i Antigravity, deploy via GitHub → Netlify*

---

## 1. Appens DNA og kernepåstand

**Navn:** Det Epistemologiske Spejl (intern titel: Værkstedet 2.0)

**Et-sætnings-formål:** Et mobilt 2-minutters spejl, der eksternaliserer lærerens tavse epistemologiske arv og skaber *reflektiv friktion* i forberedelsesøjeblikket — uden at give et facit.

**Den bærende designspænding (skal være synlig i koden og i fortællingen):**
*Glat adgang, ru indhold.* Onboarding er friktionsløs, så friktionen overhovedet når frem til den travle lærer. Indholdet er bevidst modstandsskabende.

**Fem designprincipper, der styrer alle valg:**

1. **Mobile-first, tommelfinger-venlig.** Bygges til en telefon i et frikvarter. Desktop er en bonus, ikke et krav.
2. **Frictionless onboarding.** Intet login, ingen konto, ingen ventetid. Fra åbning til første kort på under 10 sekunder.
3. **Local-first, privacy by design.** Alt gemmes i browserens `localStorage`. Intet sendes til en server. Ingen cookies, ingen tracking.
4. **Værktøjet dømmer ikke — det spørger.** Ingen feature må fortælle læreren, at hen har "valgt forkert". Friktion skabes gennem spørgsmål, ikke domme.
5. **AI er sparringspartner, ikke svarmaskine.** Hvis AI bruges, er det til at *udfordre*, aldrig til at *konkludere*. Kan slås helt fra (se §8).

---

## 2. Teknisk arkitektur

**Stack — bevidst simpel:**

- **Vite + React + TypeScript** — letvægts, hurtigt, Netlify-venligt ud af boksen.
- **Tailwind CSS** til styling (matcher visuel identitet, hurtigt at vibecode).
- **Framer Motion** til bløde overgange og "layered reveal".
- **Ingen backend. Ingen database. Ingen Firebase.** Hele appen er statiske filer.
- **Klassedeling via URL-encoding**, ikke server (se §6). Holder privacy-fortællingen intakt og gør deploy trivielt.

**Datamodel (det eneste objekt der gemmes lokalt):**

```ts
type CardPlacement = {
  cardId: string;
  position: number; // -2..+2
};

type Session = {
  id: string;            // uuid, lokalt genereret
  timestamp: number;     // til time-lapse
  lens: string;          // valgt metode-linse (Toulmins belæg)
  diamond: CardPlacement[];
  dissonanceFlagged: boolean;
  reflection: string;    // lærerens egen note (kan være tom)
  scores: { eye: number; hand: number; neutral: number };
};
```

Et array af `Session` i `localStorage` under én nøgle. Det er hele "databasen".

---

## 3. Brugerrejsen — skærm for skærm

### Skærm 1 — Startskærmen (under 10 sekunder til handling)

- **Overskrift:** *Det Epistemologiske Spejl*
- **Pitch (én linje):** Et 2-minutters spejl, der hjælper dig med at få øje på dine egne vaner, før du planlægger næste forløb.
- **Diskret tillidsmarkør:** 🔒 *Alt gemmes kun lokalt i din egen browser.*
- **Knapper:**
  - Primær (stor, amber CTA): **"Start refleksionen (2 min)"**
  - Tekst-link: *"Baggrund, evidens og datasikkerhed"* → Skærm 5
  - Bund, diskret: *"Delt computer? Ryd dine data her."* → rydder `localStorage`

### Skærm 2 — Metode-linsen (kontekstsætning = Toulmins belæg)

Ét spørgsmål: **"Hvad er den primære motor i dit næste forløb?"**

Læreren vælger ét ikon-kort. Hvert valg bærer et skjult `[tag]`, der senere fodrer dissonans-detektoren.

*Det digitale rum:*
- Generativ AI (undersøgelse/sparring/facitjagt) `[ai]`
- Adaptiv træning (selvrettende portaler) `[facit]`
- Skærm-transmission (video, flipped) `[transmission]`
- Digital produktion (makerspace, kodning, medier) `[produktion]`

*Det analoge rum:*
- Analog reproduktion (tavle, grundbog, opgaveark) `[transmission]`
- Analog undersøgelse (eksperimenter, udeskole, rodede data) `[undersøgelse]`
- Analog organisering (læsning, gruppearbejde, arbejdsro) `[neutral]`

### Skærm 3 — Den dynamiske mini-diamant (motoren)

- Systemet trækker **9 kort fra databasen på 36** (se §5): præcis **3 fra Øjet, 3 fra Hånden, 3 neutrale.** Sikrer metodisk balance hver gang.
- Læreren placerer kortene i en tvungen fordeling: **1-2-3-2-1**, fra **+2 (mest dominerende i dit næste forløb)** til **-2 (mindst).**
- **Mobil:** vertikal "tap-to-place"-liste — kortet tappes ind i næste ledige plads, ingen fummel-drag.
- **Tablet/desktop:** ægte drag-and-drop-grid.
- Den tvungne fordeling *er* friktionen: man kan ikke sige ja til det hele.

### Skærm 4 — Dissonans-detektoren (interventionen — men som spørgsmål)

Tag-baseret logik, ikke if/else-spaghetti. Hvis linsens tag og kortene i +2/+1 peger i modsat epistemologisk retning, udløses et **didaktisk benspænd** bygget på Lea Lund og Toulmin.

**Afgørende — formuleringen er et spørgsmål, ikke en dom:**

- *Spejlet (åbnende, ikke anklagende):* "Du har valgt en selvrettende portal som motor, men prioriterer åbne problemer og friktion højest. Det kan være helt bevidst — er det?"
- *Jagten på hjemlen:* "Hvilken antagelse hviler det på, hvis et lukket facit-system skal bære elevernes møde med det ukendte?"

To valg for læreren:
- **"Det tænker jeg lige over…"** → lukker, heatmap opdateres.
- **"Skriv en refleksion / et hack"** → kort tekstfelt, noten gemmes på sessionen.

Hvis *ingen* dissonans: et roligt spejl uden benspænd — "Din linse og dine prioriteringer trækker samme vej. Hvad bekræfter det for dig?"

### Skærm 5 — Om værktøjet, evidens og sikkerhed (modal)

Kort, ærlig, fagligt gennemsigtig:
- **Hvem:** Jacob Witt-Larsen, MIL ved Aalborg Universitet.
- **Hvorfor:** Tavs arv, Øjet vs. Hånden.
- **Teorien bag:** Q-metodens tvungne fordeling (mod social desirability bias), Lea Lund, Toulmin, Dalsgaard (reflective friction), Rosa (social acceleration).
- **GDPR:** Alt lokalt, intet til tredjepart, "ryd data"-knap altid tilgængelig.

---

## 4. Heatmap — lærerens personlige dashboard

- Alt data lokalt, visualiseret på et personligt landkort med to poler: **Øjet** (transmission) og **Hånden** (undersøgelse).
- Hver færdig diamant kaster en **glød** ud fra sessionens beregnede score.
- **Time-lapse:** ældre sessioner fader (den tavse arv toner ud), nyeste lyser. Gør lærerens *bevægelse over tid* synlig.
- Tydelig 🗑️ **"Ryd mine data"** under heatmappet.

**Ærlighedsnote (skal med i §5-modalen):** kortene varierer mellem sessioner, så heatmappet viser en *tendens og en provokation*, ikke en eksakt måling. Bevidst — nye kort giver nye blik.

---

## 5. Kort-databasen — de 36 udsagn

Bygges som ét array med `id`, `text`, `category` (`eye`/`hand`/`neutral`) og evt. `tags`. Træk altid 3 fra hver kategori.

### Øjets epistemologi (12)
Fokus: viden som objekt, sikkerhed, overlevering, korrekte facit.

1. **Transmission** — Stoffet gennemgås for eleverne (fx via tavle, skærm eller video).
2. **Færdighedstræning** — Eleverne løser lukkede rutineopgaver for at træne færdigheder.
3. **Facitjagten** — Eleverne tager quizzer eller test, hvor der er et klart rigtigt eller forkert svar.
4. **Friktionsløs procedure** — Eleverne følger en trin-for-trin-instruktion for at nå frem til det korrekte resultat.
5. **Standardisering** — Eleverne anvender velkendte skabeloner, formler eller metoder til at løse opgaven.
6. **Viden som objekt** — Eleverne læser eller ser materiale primært for bagefter at kunne huske og gengive viden.
7. **Synligheds-idealet** — Eleverne arbejder med at præsentere deres viden i et pænt og let aflæseligt format.
8. **Målstyret progression** — Elevernes arbejde styres stramt af foruddefinerede, detaljerede og målbare læringsmål.
9. **Algoritmisk tilpasning** — Eleverne arbejder i et digitalt system, der automatisk fører dem til næste lukkede opgave, uden at de selv vælger vejen.
10. **Reproduktiv formidling** — Eleverne fremlægger præcis den viden, jeg forudgående har udvalgt og godkendt som kernestof.
11. **AI som facitliste** — Teknologien (fx en chatbot) bruges primært til at levere hurtige og korrekte svar på konkrete opgaver.
12. **Fejlfri eksekvering** — Fejl rettes umiddelbart af lærer eller teknologi for at sikre den korrekte informationsgengivelse fra start.

### Håndens epistemologi (12)
Fokus: undersøgelse, friktion, tvivl, forhandling, kropslighed.

13. **Åbne problemer** — Eleverne undersøger komplekse problemer, hvor løsningen ikke er kendt på forhånd.
14. **Virkelighedens rod** — Eleverne indsamler rodede eller uordnede data fra virkeligheden (fx lokalsamfund eller internet).
15. **Elev-aktørskab** — Eleverne udvikler og afprøver aktivt deres egne faglige hypoteser og idéer.
16. **Epistemisk friktion** — Eleverne oplever faglig forvirring eller kognitiv friktion som en naturlig del af processen.
17. **Dømmekraft** — Eleverne skal bruge deres viden til at udøve holdning og dømmekraft i en sag.
18. **Polycentriske løsninger** — Eleverne arbejder bevidst med opgaver, der har flere mulige, gyldige løsningsstrategier.
19. **Social vidensskabelse** — Eleverne diskuterer og forhandler faglig tvivl for at nå frem til en konklusion.
20. **Kropslig forankring** — Eleverne bygger, former eller bruger kroppen fysisk til at undersøge et fagligt fænomen.
21. **AI som kritisk modspiller** — Eleverne prompt-designer en AI til at udfordre deres hypoteser, så de træner kildekritik og dømmekraft.
22. **Kaos som vilkår** — Undervisningen rummer bevidst uforudsigelige elementer, hvor jeg som lærer heller ikke kender slutfacit.
23. **Iterativ skabelse** — Eleverne prototyper, fejler og omdesigner løbende undervejs i deres faglige produktionsproces.
24. **Holdningsbåret viden** — Faget bruges eksplicit som et redskab til at tage personlig stilling til etiske eller samfundsaktuelle dilemmaer.

### Neutrale, organisatoriske praksisser (12)
Fokus: hverdagspraksisser, rammesætning, struktur uden indbygget epistemologisk slagside.

25. **Gruppe-håndværk** — Eleverne samarbejder i grupper om at løse en bunden opgave.
26. **Individuelt fokus** — Eleverne løser individuelle arbejdsopgaver i stilhed.
27. **Formativ justering** — Eleverne tilpasser arbejdet baseret på feedback fra læreren undervejs.
28. **Informationssøgning** — Eleverne søger selv information og fakta, når de er i tvivl.
29. **Produktionen** — Eleverne skaber faglige produkter for at formidle deres egen forståelse.
30. **Værktøjsvalg** — Eleverne vælger selv, hvilke hjælpemidler eller værktøjer der er bedst til at løse opgaven.
31. **Metakognition** — Eleverne evaluerer deres egen og andres læringsproces.
32. **Fællesrummet** — Vi bruger en fælles digital platform eller et fysisk fællesbord til at samle dokumenter og koordinere opgaver.
33. **Analog rammesætning** — Det faglige arbejde foregår bevidst uden digitale skærme i en bestemt tidsramme.
34. **Tværfaglighed** — Forløbet fletter kompetencer og metoder fra flere forskellige fag sammen.
35. **Trivsel som fundament** — Der afsættes eksplicit tid til at arbejde med stemningen, relationerne og trygheden i klasserummet.
36. **Udeskole-rammen** — Læringsrummet flyttes fysisk ud af klassen (uanset om selve opgaven er styret eller fri).

---

## 6. Klassedeling uden backend (til læreruddannelsen)

Den store ændring fra det oprindelige blueprint: **ingen Firebase, ingen TTL, ingen sky.**

- Når en studerende vil dele, **encoder appen sessionens score til en kompakt streng** (fx base64 af `{eye, hand, neutral, timestamp}`) og lægger den i en delbar URL: `…/host#data=AB12...`
- Den studerende sender linket (eller viser en QR genereret lokalt).
- Underviseren åbner en **Host-visning**, indsætter flere links / scanner flere QR, og appen **lægger alle scorer oven på hinanden i ét fælles klasse-heatmap** — lokalt i underviserens browser.
- **Privacy-pointen (til eksamen):** Data forlader aldrig brugerens kontrol. Ingen lærerdata på noget netværk. Den studerende vælger aktivt hvad der deles, og det dør når fanen lukkes.

---

## 7. Visuel identitet (låst palet)

- **Farver:** Teal `#1F7A7A` (struktur/overskrifter), Amber `#F59E0B` (handling/CTA), baggrund `#F7F3EF`, tekst `#2B2B2B`. Sekundært: `#D1EEEE`, `#155E5E`, `#FCD34D`, `#6B7280`.
- **Typografi:** Inter eller Montserrat (overskrifter), Source Serif 4 eller Georgia (brødtekst). **Kursiv frem for fed.**
- **Layout:** max-bredde 1100px, 8px-spacing-system. Kort: border-radius 12–16px, diskret skygge, hover `translateY(-2px)`.
- **Bevægelse:** ingen pjattede animationer. Lagdelte reveals. Ro.
- **Samlet udtryk:** rolig, varm, præcis — *"notesbog, værksted og kontrolpanel."*

---

## 8. AI-laget (valgfrit, og bevidst tilbageholdt)

Hele kerneflowet **fungerer 100% uden AI.** Bevidst valg, ikke mangel — pointen ved bordet: AI'en blev flyttet fra *svarmaskine* (1.0, Øjet) til *kritisk modspiller* (2.0, Hånden).

Hvis et AI-lag ønskes: hold det isoleret til dissonans-skærmen, hvor en knap *"Lad spejlet udfordre mig"* sender lærerens linse + top-prioriteringer til en model, der **stiller ét skarpere sokratisk spørgsmål** — og aldrig konkluderer. Kræver API-nøgle og en lille serverless-funktion på Netlify.

**Anbefaling:** byg 2.0 helt uden AI først, få den i luften, lad AI-laget være en eksplicit "next step".

---

## 9. Deploy-køreplan (Antigravity → GitHub → Netlify)

1. **Antigravity:** Lad agenten stilladsere Vite+React+TS+Tailwind ud fra denne blueprint, ét skærmflow ad gangen (start med kort-database og diamant — motoren).
2. **Test lokalt:** `npm run dev`, gennemgå alle fem skærme på en faktisk telefon.
3. **GitHub:** `git init`, commit, opret repo, push.
4. **Netlify:** "Add new site" → "Import from GitHub" → vælg repo. Build: `npm run build`. Publish: `dist`. Deploy.
5. **Auto-deploy:** Hvert push til main genbygger automatisk.

*Note om Netlify-deploy via agent/MCP:* agent-baseret deploy kan hænge på auth-tokens. Den robuste vej er at koble Netlify til GitHub-repoet i Netlify-UI'en én gang.

---

## 10. Byggerækkefølge (så det ikke vælter)

1. Kort-databasen (de 36) som ét datafil.
2. Diamant-motoren med tvungen fordeling + 3+3+3-træk.
3. Score-beregning + lokal lagring.
4. Metode-linsen foran diamanten.
5. Dissonans-detektoren (tag-logikken).
6. Heatmap + time-lapse.
7. Om-siden (§5).
8. Klassedeling via URL (§6).
9. Visuel polering (§7).
10. *(Valgfrit)* AI-laget (§8).

**Råd:** byg ét trin ad gangen. Test på telefonen mellem hvert. Commit ofte. Langsommere at læse, hurtigere i mål.
