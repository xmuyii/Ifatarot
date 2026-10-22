
// PATCH for server.js - Add this above your /api/generate handler

import { ODU_256, MEJI_16, getMetaName, get12Marks } from './src/data/oduData.js';
const TAROT_78 = ["0 The Fool","I The Magician","II The High Priestess","III The Empress","IV The Emperor","V The Hierophant","VI The Lovers","VII The Chariot","VIII Strength","IX The Hermit","X Wheel of Fortune","XI Justice","XII The Hanged Man","XIII Death","XIV Temperance","XV The Devil","XVI The Tower","XVII The Star","XVIII The Moon","XIX The Sun","XX Judgement","XXI The World","Ace of Wands","Two of Wands","Three of Wands","Four of Wands","Five of Wands","Six of Wands","Seven of Wands","Eight of Wands","Nine of Wands","Ten of Wands","Page of Wands","Knight of Wands","Queen of Wands","King of Wands","Ace of Cups","Two of Cups","Three of Cups","Four of Cups","Five of Cups","Six of Cups","Seven of Cups","Eight of Cups","Nine of Cups","Ten of Cups","Page of Cups","Knight of Cups","Queen of Cups","King of Cups","Ace of Swords","Two of Swords","Three of Swords","Four of Swords","Five of Swords","Six of Swords","Seven of Swords","Eight of Swords","Nine of Swords","Ten of Swords","Page of Swords","Knight of Swords","Queen of Swords","King of Swords","Ace of Pentacles","Two of Pentacles","Three of Pentacles","Four of Pentacles","Five of Pentacles","Six of Pentacles","Seven of Pentacles","Eight of Pentacles","Nine of Pentacles","Ten of Pentacles","Page of Pentacles","Knight of Pentacles","Queen of Pentacles","King of Pentacles"];

function generateIfa3Meta() {
  const mejiNames = ODU_256.filter(o=>o.isMeji).map(o=>o.name);
  const birth = mejiNames[Math.floor(Math.random()*mejiNames.length)];
  const principal = MEJI_16[Math.floor(Math.random()*MEJI_16.length)];
  const metaName = getMetaName(birth, principal);
  const marks12 = get12Marks(birth, principal);
  const metaIndex = ODU_256.findIndex(o=>o.name===birth)*16 + MEJI_16.indexOf(principal);
  const tarot = TAROT_78[Math.floor(Math.random()*TAROT_78.length)];
  return { birth, principal, metaName, marks12, metaIndex, tarot };
}

// Then in your /api/generate:
// const reading = generateIfa3Meta();
// const prompt = `You are Ifa 3.0... Birth ${reading.birth}... Principal ${reading.principal}... Meta ${reading.metaName} 12 marks ${reading.marks12.join(' ')}... Tarot physical mirror ${reading.tarot}... Fuse them...`;
