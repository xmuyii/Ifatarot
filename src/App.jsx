
import { useState, useEffect } from 'react'
import Ifa3Landing from './components/Ifa3Landing.jsx'
import AppMain from './AppMain.jsx'
export default function App() {
  const [entered,setEntered]=useState(false)
  useEffect(()=>{ if(sessionStorage.getItem('ifa3_entered')) setEntered(true) },[])
  const enter=()=>{ sessionStorage.setItem('ifa3_entered','true'); setEntered(true); window.scrollTo(0,0) }
  const back=()=>{ sessionStorage.removeItem('ifa3_entered'); setEntered(false); window.scrollTo(0,0) }
  if(!entered) return <Ifa3Landing onEnterTemple={enter} />
  return (<div><div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(10,10,15,0.9)', backdropFilter:'blur(10px)', borderBottom:'1px solid #1E1E2A', display:'flex', justifyContent:'space-between', padding:'10px 16px', alignItems:'center' }}><button onClick={back} style={{ background:'transparent', border:'1px solid #2A2A3A', color:'#FDF6E3', padding:'6px 14px', borderRadius:999, fontSize:12, cursor:'pointer' }}>← Back to Temple (12 Marks)</button><div style={{ fontSize:10, letterSpacing:'0.2em', opacity:0.5 }}>IFA 3.0 • 4096 • VERCEL + REAL DECK</div><div style={{ width:80 }} /></div><AppMain /></div>)
}
