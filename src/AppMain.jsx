
import React, { useState } from "react"
import { ODU_ROOT, makeMetaName, make12Marks } from "./data/oduData.js"
import { randomTarot } from "./data/tarotData.js"
import TarotCard from "./components/TarotCard.jsx"

const INK = "#0D0F1E"
const GOLD = "#D9A94A"
const IVORY = "#FDF6E3"
const HAIRLINE = "rgba(243,234,216,0.14)"

export default function AppMain(){
  const [birth, setBirth] = useState(0)
  const [principal, setPrincipal] = useState(1)
  const [result, setResult] = useState(null)
  const [reading, setReading] = useState("")
  const [loading, setLoading] = useState(false)

  const drop = async () => {
    const b = birth
    const p = principal
    const metaName = makeMetaName(b,p)
    const marks12 = make12Marks(b,p)
    const tarot = randomTarot()
    
    const newResult = { birth: b, principal: p, metaName, marks12, tarot }
    setResult(newResult)
    setLoading(true)
    setReading("")

    try{
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          birth: ODU_ROOT[b],
          principal: ODU_ROOT[p],
          birthIndex: b,
          principalIndex: p,
          metaName,
          marks12,
          tarotFile: tarot.file,
          tarotName: tarot.name,
          tarotPath: tarot.path
        })
      })
      const data = await res.json()
      setReading(data.text || data.reading || "No reading returned - check server.js ANTHROPIC_API_KEY")
    }catch(e){
      setReading("Offline fallback: " + metaName + " - Birth " + ODU_ROOT[b] + " Meji + " + ODU_ROOT[p] + " mirror " + tarot.name + ". " + e.message)
    }finally{
      setLoading(false)
    }
  }

  const randomDrop = () => {
    setBirth(Math.floor(Math.random()*16))
    setPrincipal(Math.floor(Math.random()*16))
    setTimeout(drop, 100)
  }

  return (
    <div style={{ background:"#0A0A0F", minHeight:"100vh", padding:"20px", color:IVORY, fontFamily:"Karla, sans-serif" }}>
      <div style={{ maxWidth:600, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"serif", color:GOLD }}>Drop Beads - Ifa 3.0 Meta</h2>
        
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, margin:"20px 0" }}>
          <div>
            <div style={{ fontSize:12, opacity:0.5, marginBottom:6 }}>BIRTH MEJI (8 marks)</div>
            <select value={birth} onChange={e=>setBirth(Number(e.target.value))} style={{ width:"100%", padding:10, background:"#1E1E2A", color:IVORY, border:`1px solid ${HAIRLINE}`, borderRadius:8 }}>
              {ODU_ROOT.map((n,i)=><option key={i} value={i}>{i===0 ? "Eji Ogbe" : `${n} Meji`}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize:12, opacity:0.5, marginBottom:6 }}>PRINCIPAL (4 marks)</div>
            <select value={principal} onChange={e=>setPrincipal(Number(e.target.value))} style={{ width:"100%", padding:10, background:"#1E1E2A", color:IVORY, border:`1px solid ${HAIRLINE}`, borderRadius:8 }}>
              {ODU_ROOT.map((n,i)=><option key={i} value={i}>{ODU_ROOT[i]}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          <button onClick={drop} style={{ flex:1, background:"#C4652E", color:"#fff", border:"none", padding:14, borderRadius:8, cursor:"pointer", fontWeight:600 }}>Drop Beads</button>
          <button onClick={randomDrop} style={{ flex:1, background:"transparent", color:IVORY, border:`1px solid ${HAIRLINE}`, padding:14, borderRadius:8, cursor:"pointer" }}>Random 12-Mark</button>
        </div>

        {result && (
          <div style={{ border:`1px solid ${HAIRLINE}`, borderRadius:12, padding:16, background:"rgba(243,234,216,0.03)" }}>
            <div style={{ display:"grid", gridTemplateColumns:"100px 1fr 120px", gap:16 }}>
              <div>
                {result.marks12.map((m,i)=>(
                  <div key={i} style={{ display:"flex", gap:3, marginBottom:4, opacity: i<8 ? 1 : 0.6 }}>
                    {m[0]===1 ? <div style={{ width:24, height:4, background:GOLD }} /> : <><div style={{ width:10, height:4, background:GOLD }} /><div style={{ width:10, height:4, background:GOLD }} /></>}
                  </div>
                ))}
                <div style={{ fontSize:11, color:GOLD, marginTop:8 }}>{result.metaName}</div>
              </div>
              <div>
                <div style={{ fontSize:12, opacity:0.5 }}>META</div>
                <div style={{ fontSize:18, color:GOLD, fontWeight:600 }}>{result.metaName}</div>
                <div style={{ fontSize:13, marginTop:8, opacity:0.8 }}>{ODU_ROOT[result.birth]} Meji + {ODU_ROOT[result.principal]} = 12 marks</div>
                <div style={{ fontSize:13, marginTop:12 }}>{loading ? "Consulting strategist..." : reading}</div>
              </div>
              <div>
                <TarotCard file={result.tarot.file} name={result.tarot.name} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
