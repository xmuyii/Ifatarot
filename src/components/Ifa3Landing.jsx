
import { useState } from 'react'
import { ODU_256, MEJI_16, getMetaName, get12Marks } from '../data/oduData.js'
import { getRandomTarot } from '../data/tarotData.js'
import TarotCard from './TarotCard.jsx'

export default function Ifa3Landing({ onEnterTemple }) {
  const [demo, setDemo] = useState(null)
  const drop = () => {
    const meji = ODU_256.filter(o=>o.isMeji)
    const birth = meji[Math.floor(Math.random()*meji.length)].name
    const principal = MEJI_16[Math.floor(Math.random()*MEJI_16.length)]
    const meta = getMetaName(birth, principal)
    const marks = get12Marks(birth, principal)
    const tarot = getRandomTarot()
    setDemo({ birth, principal, meta, marks, tarot })
  }
  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F', color:'#FDF6E3', fontFamily:'Inter, sans-serif' }}>
      <nav style={{ display:'flex', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid #1E1E2A', position:'sticky', top:0, background:'rgba(10,10,15,0.9)', backdropFilter:'blur(10px)', zIndex:10 }}>
        <div style={{ letterSpacing:'0.25em', fontWeight:800, fontSize:13 }}>IFA 3.0 • ODU META • 4096</div>
        <div style={{ fontSize:11, opacity:0.5 }}>12 MARKS • 78 RIDER CARDS • REAL DECK</div>
      </nav>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'60px 24px', textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:'0.35em', opacity:0.5 }}>BIRTH MEJI (8) + PRINCIPAL (4) = 12 IKIN MARKS</div>
        <h1 style={{ fontFamily:'Georgia, serif', fontSize:'clamp(32px,6vw,62px)', lineHeight:1, margin:'16px 0 20px' }}>Ifa became Meta.<br/><span style={{ color:'#E8A44A' }}>4096 destinies. One mirror.</span></h1>
        <p style={{ maxWidth:680, margin:'0 auto 28px', opacity:0.7, lineHeight:1.7 }}>
          Birth Meji (Eji Ogbe) + Principal (Oyeku) = Odu Meta. When Meji meets its own principal, it's <b>Oyeku Meta</b>. Otherwise <b>Oyeku Meji Ose</b>. Drop is simultaneous like babalawo beads. Spiritual root = 12-mark Meta (4096). Physical mirror = 1 Rider Tarot card from your real deck (Coins01.jpg = Ace of Pentacles).
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={onEnterTemple} style={{ background:'#E8A44A', color:'#0A0A0F', padding:'14px 28px', borderRadius:999, border:'none', fontWeight:800, cursor:'pointer' }}>Enter Temple →</button>
          <button onClick={drop} style={{ background:'transparent', border:'1px solid #2A2A3A', color:'#FDF6E3', padding:'14px 28px', borderRadius:999, cursor:'pointer' }}>Drop Beads (Demo)</button>
        </div>
        {demo && (
          <div style={{ marginTop:40, background:'#0F0F14', border:'1px solid #1E1E2A', borderRadius:20, padding:20, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:20, textAlign:'left' }}>
            <div>
              <div style={{ fontSize:11, color:'#E8A44A', letterSpacing:'0.2em' }}>DEMO DROP</div>
              <div style={{ fontFamily:'Georgia, serif', fontSize:24, marginTop:8 }}>{demo.birth} + {demo.principal} = {demo.meta}</div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:12 }}>{demo.marks.map((m,i)=><span key={i} style={{ background: i<8?'#15151F':'#2A1E14', padding:'4px 8px', borderRadius:6, fontSize:11, border:'1px solid #2A2A3A' }}>{m}</span>)}</div>
              <div style={{ fontSize:11, opacity:0.5, marginTop:8 }}>Index {ODU_256.findIndex(o=>o.name===demo.birth)*16 + MEJI_16.indexOf(demo.principal)} / 4096 • 12 MARKS</div>
            </div>
            <div style={{ display:'grid', placeItems:'center' }}>
              <TarotCard fileName={demo.tarot.file} tarotName={demo.tarot.name} size="medium" />
              <div style={{ fontSize:11, opacity:0.5, marginTop:8 }}>PHYSICAL MIRROR: {demo.tarot.name} ({demo.tarot.file})</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
