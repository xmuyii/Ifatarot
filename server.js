
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { ODU_256, MEJI_16, getMetaName, get12Marks } from './src/data/oduData.js';
import { TAROT_78 } from './src/data/tarotData.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static tarot images from public/tarot/
app.use('/tarot', express.static(path.join(__dirname, 'public/tarot')));
app.use(express.static(path.join(__dirname, 'dist')));

function getRandomMeji() {
  const meji = ODU_256.filter(o=>o.isMeji);
  return meji[Math.floor(Math.random()*meji.length)];
}

app.post('/api/generate', async (req, res) => {
  try {
    let { birth, principal, metaName, marks12, metaIndex, tarotFile, tarotName, question } = req.body;

    // If frontend didn't send, generate here (fallback - ensures beads drop even without frontend)
    if(!birth || !principal) {
      const meji = getRandomMeji();
      birth = meji.name;
      principal = MEJI_16[Math.floor(Math.random()*MEJI_16.length)];
      metaName = getMetaName(birth, principal);
      marks12 = get12Marks(birth, principal);
      metaIndex = ODU_256.findIndex(o=>o.name===birth)*16 + MEJI_16.indexOf(principal);
      const tarot = TAROT_78[Math.floor(Math.random()*TAROT_78.length)];
      tarotFile = tarot.file;
      tarotName = tarot.name;
    }

    // Build Ifa 3.0 prompt - Spiritual root + Physical mirror
    const prompt = `
You are Ifa 3.0 Meta — Babalawo + Rider Tarot reader fused. You read Odu Meta (4096) with real Rider cards.

CONTEXT - Drop like babalawo beads (simultaneous):
- Birth Meji (8 marks, 2 Odu): ${birth} — marks ${marks12?.slice(0,8)?.join(' ') || ''} — This is ORI, who person is. In Ifa 3.0, birth is always Meji (Eji Ogbe etc.)
- Principal Odu (4 marks, 1 Odu): ${principal} — marks ${marks12?.slice(8)?.join(' ') || ''} — This is IPIN, what destiny asks now. Random, Ifa chooses.
- Odu Meta: ${metaName} — 12 marks ${marks12?.join(' ') || ''} — Index ${metaIndex}/4096. Naming: Oyeku Meji + Oyeku = Oyeku Meta (special), Oyeku Meji + Ose = Oyeku Meji Ose, Okanran Ose + Okanran = Okanran Ose Okanran. This is whole spiritual root (4096).
- Tarot Physical Mirror: ${tarotName} (${tarotFile}) — Real Rider card from folder public/tarot/ — Coins01.jpg = Ace of Pentacles (your deck). This is AYE, how Meta appears in flesh: body, money, love, work.

USER QUESTION: "${question || 'General life reading'}"

INSTRUCTIONS - Fuse, don't separate:
1. SPIRITUAL ROOT (12 marks): Explain Birth (Ori) + Principal (Ipin) = Odu Meta meaning. Use Yoruba: Ori, Ipin, Ebo, Ose, Ase.
2. PHYSICAL MIRROR: Explain how ${tarotName} (${tarotFile}) shows this Meta in physical. Coins/Pentacles=Earth/money, Cups=Water/love, Wands=Fire/will, Swords=Air/mind, Majors=archetype.
3. ITAN: One concise mythic story where this Meta appeared.
4. BRIDGE: One paragraph: Because spirit is ${metaName}, it appears as ${tarotName} in flesh, therefore...
5. IMORAN / EBO: Specific physical action to align. Not generic.
6. ASE: One-line affirmation Yoruba + English.

Tone: Deep Ibadan, not touristy, for 27-year-old crossroads generation. Keep Odu + Card + Itan + Imoran. Keep short but potent. No separate Ifa vs Tarot readings.
`;

    // Call Anthropic or DeepSeek if keys exist, else fallback
    let readingText = "";
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const deepseekKey = process.env.DEEPSEEK_API_KEY;

    if(anthropicKey) {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'x-api-key': anthropicKey, 'anthropic-version':'2023-06-01' },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          messages: [{ role:'user', content: prompt }]
        })
      });
      const data = await resp.json();
      readingText = data.content?.[0]?.text || "";
    } else if(deepseekKey) {
      const resp = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${deepseekKey}` },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role:'user', content: prompt }],
          max_tokens: 1000
        })
      });
      const data = await resp.json();
      readingText = data.choices?.[0]?.message?.content || "";
    }

    if(!readingText) {
      // Fallback without AI - still usable
      readingText = `SPIRITUAL ROOT: Your Birth ${birth} (8 marks) meets Principal ${principal} (4 marks) forming ${metaName} — 12 marks ${marks12?.join(' ')} — Index ${metaIndex}/4096. This is Odu Meta: when ${birth} encounters ${principal}, it becomes ${metaName}.\n\nPHYSICAL MIRROR: In flesh, this appears as ${tarotName} (${tarotFile}) — your real Rider card from public/tarot/. Coins/Pentacles is Earth/money, as you saw Ace of Pentacles is Coins01.jpg.\n\nITAN: There was a time ${birth} walked with ${principal} and learned that destiny is not fixed, only the principal changes.\n\nBRIDGE: Because spirit is ${metaName}, it appears as ${tarotName} — so what you seek in Aye is actually ${principal} energy pressing on ${birth}.\n\nIMORAN: Light a white candle, note your 12 marks, and do one physical act aligned with ${tarotName}.\n\nASE: Ase o! Let ${metaName} with ${tarotName} open road.`;
    }

    res.json({
      birth,
      principal,
      metaName,
      marks12,
      metaIndex,
      tarot: { file: tarotFile, name: tarotName, path: `/tarot/${tarotFile}` },
      reading: readingText,
      wired: true
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Fallback to SPA
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ifa 3.0 Meta server running on ${PORT} - 4096 Odu + real Rider deck mapped to Coins01.jpg etc.`));
