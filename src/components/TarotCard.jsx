
import { getTarotImagePath } from '../data/tarotData.js'

export default function TarotCard({ tarotName, fileName, size='large', showName=true, onClick }) {
  const src = fileName ? `/tarot/${fileName}` : getTarotImagePath(tarotName)
  const styleMap = {
    small: { w: 120, h: 200 },
    medium: { w: 180, h: 290 },
    large: { w: 260, h: 420 },
    xl: { w: 320, h: 520 }
  }
  const s = styleMap[size] || styleMap.large
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, cursor: onClick?'pointer':'default' }} onClick={onClick}>
      <div style={{ width: s.w, height: s.h, borderRadius:16, overflow:'hidden', background:'#0F0F14', border:'1px solid #2A2A3A', boxShadow:'0 20px 50px rgba(0,0,0,0.6)' }}>
        <img src={src} alt={tarotName||fileName} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={(e)=>{ e.target.src='/tarot/Major00.jpg' }} />
      </div>
      {showName && <div style={{ textAlign:'center', maxWidth: s.w }}>
        <div style={{ fontFamily:'Georgia, serif', fontSize:14, fontWeight:700 }}>{tarotName||fileName}</div>
        <div style={{ fontSize:10, opacity:0.4, marginTop:2 }}>{fileName||''}</div>
      </div>}
    </div>
  )
}
