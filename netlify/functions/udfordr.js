import https from 'https';

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

    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
      }
    });

    const reply = await new Promise((resolve, reject) => {
      const req = https.request(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              try {
                const parsed = JSON.parse(data);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) reject(new Error('No reply from model. Data: ' + data));
                else resolve(text);
              } catch (e) {
                reject(new Error('Failed to parse Gemini response: ' + data));
              }
            } else {
              reject(new Error(`Gemini API returned ${res.statusCode}: ${data}`));
            }
          });
        }
      );

      req.on('error', (e) => reject(e));
      req.write(postData);
      req.end();
    });

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
      body: JSON.stringify({ error: 'Failed to process request', details: String(error.message) })
    };
  }
};
