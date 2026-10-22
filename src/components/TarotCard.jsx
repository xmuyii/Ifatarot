
import { useState } from 'react'

export default function TarotCard({ file, name, size=120 }){
  const [err, setErr] = useState(false)
  if(!file) return null
  return (
    <div style={{ width:size, textAlign:'center' }}>
      <div style={{ width:size, height:size*1.6, background:'#1E1E2A', borderRadius:8, overflow:'hidden', border:'1px solid #2A2A3A' }}>
        {!err ? <img src={`/tarot/${file}`} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={()=>setErr(true)} /> : <div style={{ padding:20, fontSize:12, opacity:0.5 }}>{name}</div>}
      </div>
      <div style={{ fontSize:10, marginTop:6, opacity:0.7 }}>{name}</div>
      <div style={{ fontSize:9, opacity:0.4 }}>{file}</div>
    </div>
  )
}
