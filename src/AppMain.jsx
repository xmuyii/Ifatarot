
import { useState } from 'react'
import { ODU_256, MEJI_16, getMetaName, get12Marks } from './data/oduData.js'
import { getRandomTarot } from './data/tarotData.js'
import TarotCard from './components/TarotCard.jsx'

export default function AppMain() {
  const [reading, setReading] = useState(null)
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState(null)

  const dropBeads = async () => {
    setLoading(true)
    setResult(null)
    // Generate Ifa 3.0 Meta + Tarot locally (spiritual + physical)
    const meji = ODU_256.filter(o=>o.isMeji)
    const birth = meji[Math.floor(Math.random()*meji.length)].name
    const principal = MEJI_16[Math.floor(Math.random()*MEJI_16.length)]
    const metaName = getMetaName(birth, principal)
    const marks12 = get12Marks(birth, principal)
    const metaIndex = ODU_256.findIndex(o=>o.name===birth)*16 + MEJI_16.indexOf(principal)
    const tarot = getRandomTarot()

    const localReading = { birth, principal, metaName, marks12, metaIndex, tarot, question }

    setReading(localReading)

    try {
      // Call your server - it will fuse with AI
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birth,
          principal,
          metaName,
          marks12,
          metaIndex,
          tarotFile: tarot.file,
          tarotName: tarot.name,
          question
        })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: e.message, fallback: true, itan: "Ifa says: even when network fails, Ori still speaks. Your Meta " + metaName + " with " + tarot.name + " asks you to be still." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F', color:'#FDF6E3', padding:'32px 20px' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <h2 style={{ fontFamily:'Georgia, serif', fontSize:28, textAlign:'center' }}>Ifa 3.0 — Drop Beads</h2>
        <p style={{ textAlign:'center', opacity:0.6, fontSize:13, marginTop:8 }}>Birth Meji (8) + Principal (4) = 12 marks • Tarot = physical mirror from your Rider deck (Coins01.jpg etc.)</p>

        <div style={{ maxWidth:500, margin:'24px auto', display:'flex', gap:8 }}>
          <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask: What is my destiny in this moment? (optional)" style={{ flex:1, background:'#15151F', border:'1px solid #2A2A3A', borderRadius:999, padding:'12px 18px', color:'#FDF6E3' }} />
          <button onClick={dropBeads} disabled={loading} style={{ background:'#E8A44A', color:'#0A0A0F', padding:'12px 22px', borderRadius:999, border:'none', fontWeight:800, cursor:'pointer' }}>{loading?'Dropping...':'Drop Beads'}</button>
        </div>

        {reading && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:24, marginTop:32 }}>
            <div style={{ background:'#0F0F14', border:'1px solid #1E1E2A', borderRadius:20, padding:20 }}>
              <div style={{ fontSize:11, letterSpacing:'0.2em', color:'#E8A44A' }}>SPIRITUAL ROOT — 12 IKIN MARKS</div>
              <div style={{ fontFamily:'Georgia, serif', fontSize:22, marginTop:10 }}>{reading.birth} + {reading.principal} = {reading.metaName}</div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:12 }}>{reading.marks12.map((m,i)=><span key={i} style={{ background: i<8?'#15151F':'#2A1E14', border:'1px solid #2A2A3A', padding:'6px 10px', borderRadius:8, fontSize:12 }}>{m}</span>)}</div>
              <div style={{ fontSize:11, opacity:0.4, marginTop:10 }}>Index {reading.metaIndex} / 4096 • {reading.marks12.length} MARKS • {reading.marks12.slice(0,8).join(' ')} | {reading.marks12.slice(8).join(' ')}</div>
              <div style={{ marginTop:16, fontSize:13, lineHeight:1.6, opacity:0.8 }}>
                <b>Birth Meji:</b> {reading.birth} (Ori, who you are) — 8 marks<br/>
                <b>Principal:</b> {reading.principal} (Ipin, what destiny asks now) — 4 marks<br/>
                <b>Meta Rule:</b> {reading.birth.includes('Meji') && reading.birth.includes(reading.principal) ? `${reading.principal} Meji + ${reading.principal} = ${reading.principal} Meta` : `${reading.birth} + ${reading.principal} = ${reading.birth} ${reading.principal}`}
              </div>
            </div>
            <div style={{ background:'#0F0F14', border:'1px solid #1E1E2A', borderRadius:20, padding:20, display:'grid', placeItems:'center' }}>
              <div style={{ fontSize:11, letterSpacing:'0.2em', opacity:0.5, marginBottom:10 }}>PHYSICAL MIRROR — RIDER TAROT • AYE</div>
              <TarotCard fileName={reading.tarot.file} tarotName={reading.tarot.name} size="large" />
              <div style={{ fontSize:12, opacity:0.6, marginTop:10, textAlign:'center' }}>{reading.tarot.name} • {reading.tarot.file}<br/>This is how {reading.metaName} appears in flesh</div>
            </div>
          </div>
        )}

        {result && (
          <div style={{ marginTop:24, background:'linear-gradient(160deg, #15151F, #1A1610)', border:'1px solid #2A2A3A', borderRadius:20, padding:24 }}>
            <div style={{ fontSize:11, letterSpacing:'0.2em', color:'#E8A44A' }}>FUSION — ODU + CARD + ITAN + IMORAN</div>
            {result.reading ? (
              <div style={{ marginTop:12, whiteSpace:'pre-wrap', lineHeight:1.7, fontSize:14 }}>{result.reading}</div>
            ) : (
              <div style={{ marginTop:12 }}>
                <div style={{ fontFamily:'Georgia, serif', fontSize:18 }}>{result.itan || result.fallback}</div>
                {result.imoran && <div style={{ marginTop:12 }}><b>Imoran:</b> {result.imoran}</div>}
                {result.error && <div style={{ marginTop:8, fontSize:12, opacity:0.5 }}>Server fallback: {result.error}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
