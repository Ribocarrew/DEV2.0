export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { 
      statusCode: 500, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing API key on server' }) 
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { lens, cards } = body;

    const topCards = cards.slice(0, 3).map(c => c.text).join(', ');
    const bottomCard = cards[8].text;

    const prompt = `Du er en sokratisk sparringspartner for en lærer, der reflekterer over sit undervisningsdesign. Du får oplyst lærerens valgte metode og de didaktiske prioriteringer, hen har placeret. Din opgave er at stille ÉT enkelt, skarpt og åbent spørgsmål, der får læreren til at undersøge en antagelse bag sine valg. Du må ALDRIG give råd, konkludere, vurdere om noget er rigtigt eller forkert, eller foreslå en løsning. Du stiller kun spørgsmål. Svar på dansk, i én til to sætninger, roligt og kollegialt.

Valgt metode: ${lens.label} (${lens.tag})
Top prioriteter (+2, +1): ${topCards}
Laveste prioritet (-2): ${bottomCard}`;

    const fetchParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
        }
      })
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, fetchParams);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', response.status, errorText);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `Gemini API returned ${response.status}`, details: errorText })
      };
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error('No reply from model. Data was:', JSON.stringify(data));
      throw new Error('No reply from model');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error('Gemini Execution Error:', error.message, error.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to process request', details: error.message })
    };
  }
};
