
// Your actual files in public/tarot/ as committed
// Coins01-14, Cups01-14, Wands01-14, Swords01-14, Major00-21

const MAJORS = [
  { file: "Major00.jpg", name: "The Fool" },
  { file: "Major01.jpg", name: "The Magician" },
  { file: "Major02.jpg", name: "The High Priestess" },
  { file: "Major03.jpg", name: "The Empress" },
  { file: "Major04.jpg", name: "The Emperor" },
  { file: "Major05.jpg", name: "The Hierophant" },
  { file: "Major06.jpg", name: "The Lovers" },
  { file: "Major07.jpg", name: "The Chariot" },
  { file: "Major08.jpg", name: "Strength" },
  { file: "Major09.jpg", name: "The Hermit" },
  { file: "Major10.jpg", name: "Wheel of Fortune" },
  { file: "Major11.jpg", name: "Justice" },
  { file: "Major12.jpg", name: "The Hanged Man" },
  { file: "Major13.jpg", name: "Death" },
  { file: "Major14.jpg", name: "Temperance" },
  { file: "Major15.jpg", name: "The Devil" },
  { file: "Major16.jpg", name: "The Tower" },
  { file: "Major17.jpg", name: "The Star" },
  { file: "Major18.jpg", name: "The Moon" },
  { file: "Major19.jpg", name: "The Sun" },
  { file: "Major20.jpg", name: "Judgement" },
  { file: "Major21.jpg", name: "The World" },
]

const SUITS = [
  { key: "Wands", files: Array.from({length:14},(_,i)=>`Wands${String(i+1).padStart(2,'0')}.jpg`), names: ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"] },
  { key: "Cups", files: Array.from({length:14},(_,i)=>`Cups${String(i+1).padStart(2,'0')}.jpg`), names: ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"] },
  { key: "Swords", files: Array.from({length:14},(_,i)=>`Swords${String(i+1).padStart(2,'0')}.jpg`), names: ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"] },
  { key: "Coins", files: Array.from({length:14},(_,i)=>`Coins${String(i+1).padStart(2,'0')}.jpg`), names: ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"], display: "Pentacles" },
]

export const TAROT_DECK = [
  ...MAJORS.map(m=>({ file: m.file, name: m.name, suit: "Major", path: `/tarot/${m.file}` })),
  ...SUITS.flatMap(s=> s.files.map((file,i)=>({
    file,
    name: `${s.names[i]} of ${s.display||s.key}`,
    shortName: `${s.names[i]} of ${s.key}`,
    suit: s.key,
    path: `/tarot/${file}`
  })))
]

export function randomTarot(){
  return TAROT_DECK[Math.floor(Math.random()*TAROT_DECK.length)]
}

export function getTarotByFile(file){
  return TAROT_DECK.find(c=>c.file===file)
}
