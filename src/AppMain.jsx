
import { useState } from 'react'
import { ODU_256, MEJI_16, getMetaName, get12Marks } from './data/oduData.js'
import { getRandomTarot } from './data/tarotData.js'
import TarotCard from './components/TarotCard.jsx'

export default function AppMain() {
  const [reading,setReading]=useState(null)
  const [loading,setLoading]=useState(false)
  const [question,setQuestion]=useState('')
  const [result,setResult]=useState(null)

  const dropBeads = async () => {
    setLoading(true); setResult(null);
    const meji=ODU_256.filter(o=>o.isMeji)
    const birth=meji[Math.floor(Math.random()*meji.length)].name
    const principal=MEJI_16[Math.floor(Math.random()*MEJI_16.length)]
    const metaName=getMetaName(birth,principal)
    const marks12=get12Marks(birth,principal)
    const metaIndex=ODU_256.findIndex(o=>o.name===birth)*16 + MEJI_16.indexOf(principal)
    const tarot=getRandomTarot()
    const local={ birth, principal, metaName, marks12, metaIndex, tarot, question }
    setReading(local)
    try {
      const res=await fetch('/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ birth, principal, metaName, marks12, metaIndex, tarotFile:tarot.file, tarotName:tarot.name, question }) })
      const data=await res.json()
      setResult(data)
    } catch(e) { setResult({ reading: `Fallback: ${birth} + ${principal} = ${metaName} with ${tarot.name} (${tarot.file}). ${e.message}` }) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F', color:'#FDF6E3', padding:'32px 20px' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <h2 style={{ fontFamily:'Georgia, serif', fontSize:28, textAlign:'center' }}>Ifa 3.0 — Drop Beads (Vercel)</h2>
        <p style={{ textAlign:'center', opacity:0.6, fontSize:13, marginTop:8 }}>12 Ikin Marks • Real Rider deck Coins01.jpg = Ace of Pentacles • /api/generate serverless</p>
        <div style={{ maxWidth:500, margin:'24px auto', display:'flex', gap:8 }}>
          <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask what destiny asks now (optional)" style={{ flex:1, background:'#15151F', border:'1px solid #2A2A3A', borderRadius:999, padding:'12px 18px', color:'#FDF6E3' }} />
          <button onClick={dropBeads} disabled={loading} style={{ background:'#E8A44A', color:'#0A0A0F', padding:'12px 22px', borderRadius:999, border:'none', fontWeight:800, cursor:'pointer' }}>{loading?'Dropping...':'Drop Beads'}</button>
        </div>
        {reading && <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:24, marginTop:32 }}>
          <div style={{ background:'#0F0F14', border:'1px solid #1E1E2A', borderRadius:20, padding:20 }}>
            <div style={{ fontSize:11, color:'#E8A44A', letterSpacing:'0.2em' }}>SPIRITUAL ROOT — 12 IKIN</div>
            <div style={{ fontFamily:'Georgia, serif', fontSize:22, marginTop:10 }}>{reading.birth} + {reading.principal} = {reading.metaName}</div>
            <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:12 }}>{reading.marks12.map((m,i)=><span key={i} style={{ background:i<8?'#15151F':'#2A1E14', border:'1px solid #2A2A3A', padding:'6px 10px', borderRadius:8, fontSize:12 }}>{m}</span>)}</div>
            <div style={{ fontSize:11, opacity:0.4, marginTop:10 }}>Index {reading.metaIndex} / 4096 • {reading.marks12.slice(0,8).join(' ')} | {reading.marks12.slice(8).join(' ')}</div>
          </div>
          <div style={{ background:'#0F0F14', border:'1px solid #1E1E2A', borderRadius:20, padding:20, display:'grid', placeItems:'center' }}>
            <div style={{ fontSize:11, opacity:0.5, marginBottom:10 }}>PHYSICAL MIRROR — RIDER TAROT • AYE</div>
            <TarotCard fileName={reading.tarot.file} tarotName={reading.tarot.name} size="large" />
            <div style={{ fontSize:12, opacity:0.6, marginTop:10, textAlign:'center' }}>{reading.tarot.name} • {reading.tarot.file}</div>
          </div>
        </div>}
        {result && <div style={{ marginTop:24, background:'linear-gradient(160deg, #15151F, #1A1610)', border:'1px solid #2A2A3A', borderRadius:20, padding:24 }}><div style={{ fontSize:11, color:'#E8A44A', letterSpacing:'0.2em' }}>FUSION — ODU + CARD + ITAN + IMORAN</div><div style={{ marginTop:12, whiteSpace:'pre-wrap', lineHeight:1.7, fontSize:14 }}>{result.reading}</div></div>}
      </div>
    </div>
  )
}
