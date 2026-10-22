
import { ODU_256, MEJI_16, getMetaName, get12Marks } from '../src/data/oduData.js';

const TAROT_FILES = [
  "Major00.jpg","Major01.jpg","Major02.jpg","Major03.jpg","Major04.jpg","Major05.jpg","Major06.jpg","Major07.jpg","Major08.jpg","Major09.jpg","Major10.jpg","Major11.jpg","Major12.jpg","Major13.jpg","Major14.jpg","Major15.jpg","Major16.jpg","Major17.jpg","Major18.jpg","Major19.jpg","Major20.jpg","Major21.jpg",
  "Coins01.jpg","Coins02.jpg","Coins03.jpg","Coins04.jpg","Coins05.jpg","Coins06.jpg","Coins07.jpg","Coins08.jpg","Coins09.jpg","Coins10.jpg","Coins11.jpg","Coins12.jpg","Coins13.jpg","Coins14.jpg",
  "Cups01.jpg","Cups02.jpg","Cups03.jpg","Cups04.jpg","Cups05.jpg","Cups06.jpg","Cups07.jpg","Cups08.jpg","Cups09.jpg","Cups10.jpg","Cups11.jpg","Cups12.jpg","Cups13.jpg","Cups14.jpg",
  "Wands01.jpg","Wands02.jpg","Wands03.jpg","Wands04.jpg","Wands05.jpg","Wands06.jpg","Wands07.jpg","Wands08.jpg","Wands09.jpg","Wands10.jpg","Wands11.jpg","Wands12.jpg","Wands13.jpg","Wands14.jpg",
  "Swords01.jpg","Swords02.jpg","Swords03.jpg","Swords04.jpg","Swords05.jpg","Swords06.jpg","Swords07.jpg","Swords08.jpg","Swords09.jpg","Swords10.jpg","Swords11.jpg","Swords12.jpg","Swords13.jpg","Swords14.jpg"
];

function getTarotNameFromFile(file) {
  const map = {
    "Major00.jpg":"0 The Fool","Major01.jpg":"I The Magician","Major02.jpg":"II The High Priestess","Major03.jpg":"III The Empress","Major04.jpg":"IV The Emperor","Major05.jpg":"V The Hierophant","Major06.jpg":"VI The Lovers","Major07.jpg":"VII The Chariot","Major08.jpg":"VIII Strength","Major09.jpg":"IX The Hermit","Major10.jpg":"X Wheel of Fortune","Major11.jpg":"XI Justice","Major12.jpg":"XII The Hanged Man","Major13.jpg":"XIII Death","Major14.jpg":"XIV Temperance","Major15.jpg":"XV The Devil","Major16.jpg":"XVI The Tower","Major17.jpg":"XVII The Star","Major18.jpg":"XVIII The Moon","Major19.jpg":"XIX The Sun","Major20.jpg":"XX Judgement","Major21.jpg":"XXI The World",
    "Coins01.jpg":"Ace of Pentacles","Coins02.jpg":"Two of Pentacles","Coins03.jpg":"Three of Pentacles","Coins04.jpg":"Four of Pentacles","Coins05.jpg":"Five of Pentacles","Coins06.jpg":"Six of Pentacles","Coins07.jpg":"Seven of Pentacles","Coins08.jpg":"Eight of Pentacles","Coins09.jpg":"Nine of Pentacles","Coins10.jpg":"Ten of Pentacles","Coins11.jpg":"Page of Pentacles","Coins12.jpg":"Knight of Pentacles","Coins13.jpg":"Queen of Pentacles","Coins14.jpg":"King of Pentacles",
  };
  if(map[file]) return map[file];
  // generate for others
  const numMap = {"01":"Ace","02":"Two","03":"Three","04":"Four","05":"Five","06":"Six","07":"Seven","08":"Eight","09":"Nine","10":"Ten","11":"Page","12":"Knight","13":"Queen","14":"King"};
  const match = file.match(/(Cups|Wands|Swords)(\d{2})\.jpg/);
  if(match) {
    const suit = match[1]==="Cups"?"Cups":match[1]==="Wands"?"Wands":"Swords";
    return `${numMap[match[2]]} of ${suit}`;
  }
  return file;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let { birth, principal, metaName, marks12, metaIndex, tarotFile, tarotName, question } = req.body || {};

    if(!birth || !principal) {
      const meji = ODU_256.filter(o=>o.isMeji);
      birth = meji[Math.floor(Math.random()*meji.length)].name;
      principal = MEJI_16[Math.floor(Math.random()*MEJI_16.length)];
    }
    if(!metaName) metaName = getMetaName(birth, principal);
    if(!marks12) marks12 = get12Marks(birth, principal);
    if(metaIndex===undefined) metaIndex = ODU_256.findIndex(o=>o.name===birth)*16 + MEJI_16.indexOf(principal);
    if(!tarotFile) {
      tarotFile = TAROT_FILES[Math.floor(Math.random()*TAROT_FILES.length)];
      tarotName = getTarotNameFromFile(tarotFile);
    }
    if(!tarotName) tarotName = getTarotNameFromFile(tarotFile);

    const prompt = `
You are Ifa 3.0 Meta — Babalawo + Rider Tarot reader fused. Read Odu Meta (4096) with real Rider deck.

DROP (simultaneous like babalawo):
- Birth Meji (8 marks): ${birth} — ${marks12.slice(0,8).join(' ')} — ORI, who person is. Always Meji in Ifa 3.0.
- Principal (4 marks): ${principal} — ${marks12.slice(8).join(' ')} — IPIN, what destiny asks now.
- Odu Meta: ${metaName} — 12 marks ${marks12.join(' ')} — Index ${metaIndex}/4096. Rule: Oyeku Meji + Oyeku = Oyeku Meta, Oyeku Meji + Ose = Oyeku Meji Ose, Okanran Ose + Okanran = Okanran Ose Okanran.
- Tarot Physical Mirror: ${tarotName} (${tarotFile}) — real Rider card from public/tarot/. Coins01.jpg= Ace of Pentacles. This is AYE, physical manifestation.

USER QUESTION: "${question || 'General life reading'}"

Fuse, don't separate:
1. SPIRITUAL ROOT (12 marks): Birth (Ori) + Principal (Ipin) = Odu Meta meaning.
2. PHYSICAL MIRROR: How ${tarotName} (${tarotFile}) shows Meta in flesh. Coins/Pentacles=Earth/money, Cups=Water/love, Wands=Fire/will, Swords=Air/mind.
3. ITAN: One concise mythic story.
4. BRIDGE: Because spirit is ${metaName}, it appears as ${tarotName}...
5. IMORAN / EBO: Specific physical action.
6. ASE: Yoruba + English affirmation.

Tone: Deep Ibadan, not touristy, 27yo crossroads generation. Odu + Card + Itan + Imoran.
`;

    let readingText = "";
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const deepseekKey = process.env.DEEPSEEK_API_KEY;

    if(anthropicKey) {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'x-api-key': anthropicKey, 'anthropic-version':'2023-06-01' },
        body: JSON.stringify({ model:'claude-3-5-sonnet-20241022', max_tokens:1200, messages:[{ role:'user', content: prompt }] })
      });
      const data = await resp.json();
      readingText = data.content?.[0]?.text || "";
    } else if(deepseekKey) {
      const resp = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${deepseekKey}` },
        body: JSON.stringify({ model:'deepseek-chat', messages:[{ role:'user', content: prompt }], max_tokens:1200 })
      });
      const data = await resp.json();
      readingText = data.choices?.[0]?.message?.content || "";
    }

    if(!readingText) {
      readingText = `SPIRITUAL ROOT: Birth ${birth} (8 marks ${marks12.slice(0,8).join(' ')}) meets Principal ${principal} (4 marks ${marks12.slice(8).join(' ')}) forming ${metaName} — 12 marks ${marks12.join(' ')} — Index ${metaIndex}/4096.\n\nPHYSICAL MIRROR: In flesh, this appears as ${tarotName} (${tarotFile}) — your real Rider card from public/tarot/. Coins01.jpg is Ace of Pentacles as you showed.\n\nITAN: ${birth} once walked with ${principal} and learned that Oyeku Meji + Oyeku becomes Oyeku Meta, not double name — transformation, not repetition.\n\nBRIDGE: Because spirit is ${metaName}, it appears as ${tarotName} — what you seek in Aye is ${principal} energy pressing on ${birth}.\n\nIMORAN: Hold your 12 marks, place ${tarotName} before you, do one act of ${tarotName.includes('Pentacles')?'Earth/money':tarotName.includes('Cups')?'Water/love':tarotName.includes('Wands')?'Fire/will':'Air/mind'}.\n\nASE: Ase o! ${metaName} with ${tarotName} opens road.`;
    }

    return res.status(200).json({
      birth, principal, metaName, marks12, metaIndex,
      tarot: { file: tarotFile, name: tarotName, path: `/tarot/${tarotFile}` },
      reading: readingText
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
