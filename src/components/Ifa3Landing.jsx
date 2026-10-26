
export default function Ifa3Landing({onEnterTemple}){
  return (
    <div style={{minHeight:'100vh',background:'#0A0A0F',color:'#FDF6E3',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,textAlign:'center'}}>
      <div style={{fontSize:11,letterSpacing:'0.4em',opacity:0.5,marginBottom:12}}>IFA 3.0 • 4096 ODUS • 1D-9D • RIDER REAL</div>
      <h1 style={{fontSize:48,color:'#D9A94A',margin:'0 0 12px'}}>Ifatarot</h1>
      <p style={{opacity:0.7,maxWidth:600,lineHeight:1.6,marginBottom:24}}>Your original app: 1D, 2D, 3D, 4D, 7D, 9D of thought. Now upgraded: 12-mark Ifa 3.0 (Birth 8 + Principal 4) + Real Rider images (Coins01.jpg = Ace of Pentacles, etc.)</p>
      <button onClick={onEnterTemple} style={{background:'#D9A94A',color:'#0A0A0F',border:'none',padding:'18px 40px',borderRadius:999,fontSize:16,fontWeight:700,cursor:'pointer'}}>ENTER TEMPLE →</button>
      <div style={{marginTop:32,display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>{["1D Single Flame","2D Twin Paths","3D River's Course","7D Crown of Seven","9D Nine Realms"].map(t=><div key={t} style={{fontSize:10,border:'1px solid #2A2A3A',padding:'4px 8px',borderRadius:99,opacity:0.6}}>{t}</div>)}</div>
    </div>
  )
}
