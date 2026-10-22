
import { useState } from 'react'
import { randomTarot } from '../data/tarotData.js'
import { ODU_ROOT, makeMetaName, make12Marks, getMejiMarks } from '../data/oduData.js'

export default function Ifa3Landing({ onEnterTemple }) {
  const [demo, setDemo] = useState(null)
  const [dropping, setDropping] = useState(false)

  const dropDemo = () => {
    setDropping(true)
    setTimeout(()=>{
      const b = Math.floor(Math.random()*16)
      const p = Math.floor(Math.random()*16)
      const metaName = makeMetaName(b,p)
      const marks12 = make12Marks(b,p)
      const tarot = randomTarot()
      setDemo({ birth: b, principal: p, metaName, marks12, tarot })
      setDropping(false)
    }, 600)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F', color:'#FDF6E3', fontFamily:'Karla, sans-serif' }}>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'40px 20px' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:11, letterSpacing:'0.4em', opacity:0.5, marginBottom:12 }}>IFA 3.0 • 4096 ODUS • RIDER REAL DECK</div>
          <h1 style={{ fontFamily:'serif', fontSize:48, color:'#D9A94A', margin:'0 0 12px' }}>Ifatarot</h1>
          <p style={{ opacity:0.7, maxWidth:600, margin:'0 auto', lineHeight:1.6 }}>Birth Meji (8 marks) + Principal Meji (4 marks) = 12 marks. Drop simultaneous like babalawo beads. Every drop is a real Meta + a physical Rider mirror.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:30 }}>
          <div style={{ border:'1px solid #1E1E2A', borderRadius:12, padding:20, background:'rgba(243,234,216,0.03)' }}>
            <div style={{ fontSize:12, color:'#8B9A7C', marginBottom:12 }}>IFA 3.0 LOGIC</div>
            <div style={{ fontSize:13, lineHeight:1.8, opacity:0.8 }}>
              <div>• Birth Meji = 8 marks (your root)</div>
              <div>• Principal = 4 marks (the day's voice)</div>
              <div>• 12 marks total like real Ikin</div>
              <div>• Oyeku Meji + Oyeku = <b style={{color:'#D9A94A'}}>Oyeku Meta</b></div>
              <div>• Oyeku Meji + Ose = <b style={{color:'#D9A94A'}}>Oyeku Meji Ose</b></div>
            </div>
            <div style={{ marginTop:16, display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:4 }}>
              {Array.from({length:12}).map((_,i)=>(
                <div key={i} style={{ height:32, border:'1px solid #2A2A3A', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, background: i<8 ? 'rgba(217,169,74,0.1)' : 'rgba(196,101,46,0.1)' }}>{i<8 ? 'B' : 'P'}</div>
              ))}
            </div>
          </div>

          <div style={{ border:'1px solid #1E1E2A', borderRadius:12, padding:20, background:'rgba(243,234,216,0.03)' }}>
            <div style={{ fontSize:12, color:'#8B9A7C', marginBottom:12 }}>RIDER REAL DECK • 78 CARDS</div>
            <div style={{ fontSize:13, lineHeight:1.8, opacity:0.8 }}>
              <div>• Coins01.jpg = Ace of Pentacles</div>
              <div>• Cups01-14, Wands01-14, Swords01-14</div>
              <div>• Major00-21 = Fool to World</div>
              <div>• No renaming - uses your files AS-IS</div>
              <div>• Served from <b style={{color:'#D9A94A'}}>/tarot/*.jpg</b></div>
            </div>
            <div style={{ marginTop:16, display:'flex', gap:6, flexWrap:'wrap' }}>
              {["Coins01.jpg","Cups01.jpg","Wands01.jpg","Swords01.jpg","Major00.jpg"].map(f=><div key={f} style={{ fontSize:9, border:'1px solid #2A2A3A', padding:'2px 6px', borderRadius:99, opacity:0.6 }}>{f}</div>)}
            </div>
          </div>
        </div>

        <div style={{ border:'1px solid #D9A94A', borderRadius:12, padding:20, marginBottom:30, background:'rgba(217,169,74,0.06)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:600 }}>Try a demo drop (like babalawo beads)</div>
            <button onClick={dropDemo} disabled={dropping} style={{ background: dropping ? '#333' : '#C4652E', color:'#fff', border:'none', padding:'8px 16px', borderRadius:8, cursor:'pointer' }}>{dropping ? 'Dropping...' : 'Drop Beads'}</button>
          </div>
          {demo && (
            <div style={{ display:'grid', gridTemplateColumns:'120px 1fr 120px', gap:16, alignItems:'center' }}>
              <div>
                <div style={{ fontSize:11, opacity:0.5, marginBottom:6 }}>12 MARKS</div>
                {demo.marks12.map((m,i)=>(
                  <div key={i} style={{ display:'flex', gap:4, marginBottom:3 }}>
                    {m[0]===1 ? <div style={{ width:20, height:4, background:'#D9A94A' }} /> : <><div style={{ width:8, height:4, background:'#D9A94A' }} /><div style={{ width:8, height:4, background:'#D9A94A' }} /></>}
                    {m.length===1 ? null : null}
                  </div>
                ))}
                <div style={{ fontSize:10, marginTop:6, color:'#D9A94A' }}>{demo.metaName}</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:11, opacity:0.5 }}>BIRTH + PRINCIPAL</div>
                <div style={{ fontSize:14, marginTop:6 }}>{ODU_ROOT[demo.birth]} Meji + {ODU_ROOT[demo.principal]} =</div>
                <div style={{ fontSize:16, color:'#D9A94A', fontWeight:600, marginTop:4 }}>{demo.metaName}</div>
              </div>
              <div>
                <div style={{ width:80, height:120, background:'#1E1E2A', borderRadius:8, overflow:'hidden', border:'1px solid #2A2A3A' }}>
                  <img src={demo.tarot.path} alt={demo.tarot.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={(e)=>{e.target.style.display='none'}} />
                </div>
                <div style={{ fontSize:10, marginTop:6 }}>{demo.tarot.name}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign:'center' }}>
          <button onClick={onEnterTemple} style={{ background:'#D9A94A', color:'#0A0A0F', border:'none', padding:'18px 40px', borderRadius:999, fontSize:16, fontWeight:700, cursor:'pointer', letterSpacing:'0.05em' }}>ENTER TEMPLE →</button>
          <div style={{ fontSize:11, opacity:0.4, marginTop:12 }}>Your 8 credits / 3h refill still enforced on Railway</div>
        </div>
      </div>
    </div>
  )
}
