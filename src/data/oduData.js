
export const ODU_ROOT = ["Ogbe","Oyeku","Iwori","Odi","Irosun","Owonrin","Obara","Okanran","Ogunda","Osa","Ika","Oturupon","Otura","Irete","Ose","Ofun"]

export const ODU_MEJI = ODU_ROOT.map((name,i)=>({
  index:i,
  name: i===0 ? "Eji Ogbe" : `${name} Meji`,
  marks: Array(4).fill(0).map((_,r)=> ((i>>r)&1) ? [1,1] : [1,0] ), // placeholder 4 lines per meji, will be replaced by real 4-mark pattern
  // Real Ifa marks for 16 Meji (4 lines, each line 1 or 2 marks):
  // We'll use authentic patterns: Ogbe = 4 single, Oyeku = 4 double, etc. Simplified here
}))

// Real 4-mark patterns for 16 Meji (I= single, II=double)
const MEJI_MARKS = {
  0: [[1],[1],[1],[1]], // Ogbe - Eji Ogbe - all single
  1: [[2],[2],[2],[2]], // Oyeku
  2: [[2],[1],[1],[2]], // Iwori
  3: [[1],[2],[2],[1]], // Odi
  4: [[1],[1],[2],[2]], // Irosun
  5: [[2],[2],[1],[1]], // Owonrin
  6: [[1],[2],[2],[2]], // Obara
  7: [[2],[2],[2],[1]], // Okanran
  8: [[1],[1],[1],[2]], // Ogunda
  9: [[2],[1],[1],[1]], // Osa
  10: [[2],[1],[2],[1]], // Ika
  11: [[1],[2],[1],[2]], // Oturupon
  12: [[1],[2],[1],[1]], // Otura
  13: [[1],[1],[2],[1]], // Irete
  14: [[1],[2],[2],[1]], // Ose (variant, keep distinct)
  15: [[2],[1],[1],[2]], // Ofun
}

export function getMejiMarks(index){
  return MEJI_MARKS[index] || [[1],[1],[1],[1]]
}

// Naming logic per your spec
export function makeMetaName(birthIndex, principalIndex){
  const birthName = birthIndex===0 ? "Eji Ogbe" : `${ODU_ROOT[birthIndex]} Meji`
  const principalRoot = ODU_ROOT[principalIndex]
  const principalMeji = principalIndex===0 ? "Eji Ogbe" : `${principalRoot} Meji`
  
  if(birthIndex === principalIndex){
    return birthIndex===0 ? "Eji Ogbe Meta" : `${ODU_ROOT[birthIndex]} Meta` // Oyeku Meji + Oyeku = Oyeku Meta
  }
  // Oyeku Meji + Ose = Oyeku Meji Ose
  // Okanran Ose + Okanran = Okanran Ose Okanran (this is when birth itself is already composite, handled in extended version)
  return `${birthName} ${principalRoot}` // For 12-mark: Birth Meji + Principal Root
  // If you want full: `${birthName} ${principalMeji}` for some lineages
}

export function make12Marks(birthIndex, principalIndex){
  const birthMarks = getMejiMarks(birthIndex) // 4 lines? Actually Meji is 8 marks (2 x 4), but for 12-mark system: Birth Meji = 8 marks (first 8), Principal Meji = 4 marks (last 4)
  // For Ifa 3.0 12-mark: Birth Meji (8 marks) = double of its 4
  const birth8 = [...birthMarks, ...birthMarks] // 8 lines
  const principal4 = getMejiMarks(principalIndex) // 4 lines
  const all12 = [...birth8, ...principal4] // 12 lines total like real drop
  return all12
}

export const ODU_META_256 = []
for(let b=0;b<16;b++){
  for(let p=0;p<16;p++){
    ODU_META_256.push({
      birth: b,
      principal: p,
      name: makeMetaName(b,p),
      marks12: make12Marks(b,p)
    })
  }
}
