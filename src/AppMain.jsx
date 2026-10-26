
import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const INK = "#0D0F1E"; const INDIGO = "#1E2340"; const CAMWOOD = "#C4652E"; const GOLD = "#D9A94A"; const IVORY = "#F3EAD8"; const SAGE = "#8B9A7C"; const HAIRLINE = "rgba(243,234,216,0.14)";

const ORIENTATIONS = [
  { key: "spiritual", label: "Spiritual", angle: -90 }, { key: "emotional", label: "Emotional", angle: -18 },
  { key: "psychological", label: "Psychological", angle: 54 }, { key: "physical", label: "Physical", angle: 126 }, { key: "mental", label: "Mental", angle: 198 },
];

const TAROT_FILE_MAP = {
  "The Fool":"Major00.jpg","The Magician":"Major01.jpg","The High Priestess":"Major02.jpg","The Empress":"Major03.jpg","The Emperor":"Major04.jpg","The Hierophant":"Major05.jpg","The Lovers":"Major06.jpg","The Chariot":"Major07.jpg","Strength":"Major08.jpg","The Hermit":"Major09.jpg","Wheel of Fortune":"Major10.jpg","Justice":"Major11.jpg","The Hanged Man":"Major12.jpg","Death":"Major13.jpg","Temperance":"Major14.jpg","The Devil":"Major15.jpg","The Tower":"Major16.jpg","The Star":"Major17.jpg","The Moon":"Major18.jpg","The Sun":"Major19.jpg","Judgement":"Major20.jpg","The World":"Major21.jpg",
  "Ace of Wands":"Wands01.jpg","Two of Wands":"Wands02.jpg","Three of Wands":"Wands03.jpg","Four of Wands":"Wands04.jpg","Five of Wands":"Wands05.jpg","Six of Wands":"Wands06.jpg","Seven of Wands":"Wands07.jpg","Eight of Wands":"Wands08.jpg","Nine of Wands":"Wands09.jpg","Ten of Wands":"Wands10.jpg","Page of Wands":"Wands11.jpg","Knight of Wands":"Wands12.jpg","Queen of Wands":"Wands13.jpg","King of Wands":"Wands14.jpg",
  "Ace of Cups":"Cups01.jpg","Two of Cups":"Cups02.jpg","Three of Cups":"Cups03.jpg","Four of Cups":"Cups04.jpg","Five of Cups":"Cups05.jpg","Six of Cups":"Cups06.jpg","Seven of Cups":"Cups07.jpg","Eight of Cups":"Cups08.jpg","Nine of Cups":"Cups09.jpg","Ten of Cups":"Cups10.jpg","Page of Cups":"Cups11.jpg","Knight of Cups":"Cups12.jpg","Queen of Cups":"Cups13.jpg","King of Cups":"Cups14.jpg",
  "Ace of Swords":"Swords01.jpg","Two of Swords":"Swords02.jpg","Three of Swords":"Swords03.jpg","Four of Swords":"Swords04.jpg","Five of Swords":"Swords05.jpg","Six of Swords":"Swords06.jpg","Seven of Swords":"Swords07.jpg","Eight of Swords":"Swords08.jpg","Nine of Swords":"Swords09.jpg","Ten of Swords":"Swords10.jpg","Page of Swords":"Swords11.jpg","Knight of Swords":"Swords12.jpg","Queen of Swords":"Swords13.jpg","King of Swords":"Swords14.jpg",
  "Ace of Pentacles":"Coins01.jpg","Two of Pentacles":"Coins02.jpg","Three of Pentacles":"Coins03.jpg","Four of Pentacles":"Coins04.jpg","Five of Pentacles":"Coins05.jpg","Six of Pentacles":"Coins06.jpg","Seven of Pentacles":"Coins07.jpg","Eight of Pentacles":"Coins08.jpg","Nine of Pentacles":"Coins09.jpg","Ten of Pentacles":"Coins10.jpg","Page of Pentacles":"Coins11.jpg","Knight of Pentacles":"Coins12.jpg","Queen of Pentacles":"Coins13.jpg","King of Pentacles":"Coins14.jpg",
};

const ODU_ROOT = ["Ogbe","Oyeku","Iwori","Odi","Irosun","Owonrin","Obara","Okanran","Ogunda","Osa","Ika","Oturupon","Otura","Irete","Ose","Ofun"];
const MEJI_MARKS = {0:[[1],[1],[1],[1]],1:[[2],[2],[2],[2]],2:[[2],[1],[1],[2]],3:[[1],[2],[2],[1]],4:[[1],[1],[2],[2]],5:[[2],[2],[1],[1]],6:[[1],[2],[2],[2]],7:[[2],[2],[2],[1]],8:[[1],[1],[1],[2]],9:[[2],[1],[1],[1]],10:[[2],[1],[2],[1]],11:[[1],[2],[1],[2]],12:[[1],[2],[1],[1]],13:[[1],[1],[2],[1]],14:[[1],[2],[2],[1]],15:[[2],[1],[1],[2]]};
function getMejiMarks(i){return MEJI_MARKS[i]||[[1],[1],[1],[1]]}
function make12Marks(b,p){return [...getMejiMarks(b),...getMejiMarks(b),...getMejiMarks(p)]}
function makeMetaName(b,p){if(b===p) return b===0?"Eji Ogbe Meta":`${ODU_ROOT[b]} Meta`; return `${b===0?"Eji Ogbe":`${ODU_ROOT[b]} Meji`} ${ODU_ROOT[p]}`}

const MAJORS = [["The Fool"],["The Magician"],["The High Priestess"],["The Empress"],["The Emperor"],["The Hierophant"],["The Lovers"],["The Chariot"],["Strength"],["The Hermit"],["Wheel of Fortune"],["Justice"],["The Hanged Man"],["Death"],["Temperance"],["The Devil"],["The Tower"],["The Star"],["The Moon"],["The Sun"],["Judgement"],["The World"]];
const SUITS = [{key:"Wands"},{key:"Cups"},{key:"Swords"},{key:"Pentacles"}];
const RANKS = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"];
const MINORS = SUITS.flatMap(s=>RANKS.map(r=>({name:`${r} of ${s.key}`})));
const TAROT_DECK = [...MAJORS.map(m=>m[0]), ...MINORS.map(m=>m.name)];
const ODU_4096 = []; for(let i=0;i<16;i++) for(let j=0;j<16;j++) for(let k=0;k<16;k++){ const name = i===j&&j===k ? (i===0?"Eji Ogbe Meta":`${ODU_ROOT[i]} Meta`) : `${ODU_ROOT[i]}${ODU_ROOT[j]}${ODU_ROOT[k]}`; ODU_4096.push({name, roots:[i,j,k], marks12: make12Marks(i,j)}) }

function mkMode(key,title,labels){return {key,title,label:labels.join(", "),traditionMode:"single",positions:labels.map((l,i)=>({key:`p${i+1}`,label:l}))}}
const DIMENSIONS = {
  "1D":{label:"1D of thought",modes:[{key:"single",title:"The Single Flame",label:"One card",traditionMode:"single",positions:[{key:"focus",label:"Focus"}]}, mkMode("cardOfDay","Card of the Day",["Card of the Day"]), mkMode("weekAhead","The Week Ahead",["The Week Ahead"]), mkMode("heart","Matters of the Heart",["Matters of the Heart"]), mkMode("career","Career Advice",["Career Advice"]), mkMode("yesno","Yes or No",["Yes or No"])]},
  "2D":{label:"2D of thought",modes:[{key:"duality",title:"The Twin Paths",label:"Agreeable and disagreeable",traditionMode:"perPosition",positions:[{key:"agreeable",label:"Agreeable"},{key:"disagreeable",label:"Disagreeable"}]}, {key:"polarity",title:"Sky and Root",label:"Spiritual above, physical below",traditionMode:"perPosition",positions:[{key:"spiritual",label:"Spiritual"},{key:"physical",label:"Physical"}]}, mkMode("unlabeled","Unlabeled",["Card 1","Card 2"])]},
  "3D":{label:"3D of thought",modes:[{key:"timeline",title:"The River's Course",label:"Past, present, future",traditionMode:"single",positions:[{key:"past",label:"Past"},{key:"present",label:"Present"},{key:"future",label:"Future"}]}, mkMode("balance","Achieve Balance",["Mind","Body","Soul"])]},
  "4D":{label:"4D of thought",modes:[mkMode("unlabeled","Unlabeled",["Card 1","Card 2","Card 3","Card 4"]), mkMode("selfKnowledge","Self Knowledge",["Physical","Mental","Emotional","Spiritual"])]},
  "7D":{label:"7D of thought",modes:[{key:"star",title:"The Crown of Seven",label:"A core with six around it",traditionMode:"single",positions:[{key:"core",label:"Core"},{key:"p1",label:"Past"},{key:"p2",label:"Present"},{key:"p3",label:"Future"},{key:"p4",label:"Challenge"},{key:"p5",label:"Guidance"},{key:"p6",label:"Outcome"}]}, mkMode("balance","Achieve Balance",["Mind","Body","Soul","Work","Relationships","Rest","Center"])]},
  "9D":{label:"9D of thought",modes:[{key:"dimensions",title:"The Nine Realms",label:"Nine planes",traditionMode:"single",positions:[{key:"spiritual",label:"Spiritual"},{key:"mental",label:"Mental"},{key:"emotional",label:"Emotional"},{key:"physical",label:"Physical"},{key:"psychological",label:"Psychological"},{key:"past",label:"Past"},{key:"present",label:"Present"},{key:"future",label:"Future"},{key:"path",label:"Path forward"}]}, mkMode("balance","Achieve Balance",["Mind","Body","Soul","Work","Relationships","Rest","Play","Purpose","Center"])]},
};

function TarotArt({name,size}){
  const file = TAROT_FILE_MAP[name];
  const s = size||64;
  if(file){
    return <div style={{width:s, height:s*1.6, borderRadius:8, overflow:'hidden', border:`2px solid ${GOLD}`, background:INDIGO}}><img src={`/tarot/${file}`} alt={name} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={(e)=>{e.target.style.display='none'}} /><div style={{fontSize:8, textAlign:'center', color:IVORY, background:'rgba(0,0,0,0.6)', marginTop:-14, position:'relative'}}>{name.slice(0,16)}</div></div>
  }
  return <div style={{width:s, height:s*1.4, background:INDIGO, border:`2px solid ${GOLD}`, borderRadius:6}} />
}
function OduArt({name,size}){
  const odu = ODU_4096.find(o=>o.name===name) || {marks12: make12Marks(0,0)};
  const marks = odu.marks12 || make12Marks(0,0);
  const s=size||64;
  return (
    <div style={{width:s, height:s*1.4, background:INK, border:`2px solid ${GOLD}`, borderRadius:6, padding:4, boxSizing:'border-box'}}>
      {marks.map((m,i)=>(
        <div key={i} style={{display:'flex', gap:2, marginBottom:2, opacity: i<8 ? 1 : 0.6, justifyContent:'center'}}>
          {m[0]===1 ? <div style={{width:20, height:3, background:GOLD}}/> : <><div style={{width:8,height:3,background:GOLD}}/><div style={{width:8,height:3,background:GOLD}}/></>}
        </div>
      ))}
      <div style={{fontSize:6, textAlign:'center', color:IVORY, marginTop:2}}>{name.slice(0,18)}</div>
    </div>
  )
}
function CardArt({tradition,name,size}){ return tradition==="tarot" ? <TarotArt name={name} size={size}/> : <OduArt name={name} size={size}/> }

function drawCard(tradition, reversalsOn){
  if(tradition==="tarot"){ const name=TAROT_DECK[Math.floor(Math.random()*TAROT_DECK.length)]; return {tradition, name, reversed: reversalsOn && Math.random()<0.5, file: TAROT_FILE_MAP[name]} }
  const odu=ODU_4096[Math.floor(Math.random()*ODU_4096.length)]; return {tradition, name:odu.name, reversed: reversalsOn && Math.random()<0.5, marks12: odu.marks12}
}

function Field({label,children}){return <div style={{marginBottom:20}}><div style={{fontSize:13,color:SAGE,marginBottom:8}}>{label}</div>{children}</div>}
function TextInput(props){return <input {...props} style={{width:"100%",boxSizing:"border-box",background:"rgba(243,234,216,0.05)",border:`1px solid ${HAIRLINE}`,borderRadius:6,padding:"12px 14px",color:IVORY,fontSize:15,outline:"none",...props.style}}/>}
function PrimaryButton({onClick,children,disabled,style}){return <button onClick={onClick} disabled={disabled} style={{width:"100%",padding:"15px 20px",borderRadius:8,border:"none",background:disabled?"rgba(196,101,46,0.35)":CAMWOOD,color:IVORY,fontSize:15,fontWeight:600,cursor:disabled?"default":"pointer",...style}}>{children}</button>}
function GhostButton({onClick,children,style}){return <button onClick={onClick} style={{padding:"12px 18px",borderRadius:8,border:`1px solid ${HAIRLINE}`,background:"transparent",color:IVORY,fontSize:14,cursor:"pointer",...style}}>{children}</button>}
function Header({title,onBack}){return <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>{onBack && <button onClick={onBack} style={{background:"none",border:"none",color:SAGE,fontSize:20,cursor:"pointer",padding:0}}>&larr;</button>}<h1 style={{fontWeight:500,fontSize:22,color:IVORY,margin:0}}>{title}</h1></div>}

const emptyProfile={name:"",agentName:"",plane:"",element:"",agentElement:"",jargon:"simple",verbosity:"warm",tarotReversals:true,ifaReversalsExperimental:false,residentDimension:null,credits:8,readingMode:"speed",birthOdu:{name:""}};

export default function AppMain(){
  const [screen,setScreen]=useState("home");
  const [profile,setProfile]=useState(emptyProfile);
  const [dimKey,setDimKey]=useState(null);
  const [mode,setMode]=useState(null);
  const [assignment,setAssignment]=useState({});
  const [question,setQuestion]=useState("");
  const [resolved,setResolved]=useState(null);
  const [reading,setReading]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [revealedCount,setRevealedCount]=useState(0);

  function startDimension(key){ const dimCfg=DIMENSIONS[key]; setDimKey(key); setAssignment({}); setQuestion(""); setResolved(null); setReading(""); setError(null); if(dimCfg.modes.length===1){setMode(dimCfg.modes[0]); setScreen("dim-tradition")} else {setMode(null); setScreen("dim-mode")} }
  function traditionsForPosition(posKey){ const m=mode; const a=assignment; if(m.traditionMode==="single") return [a.__single]; if(m.traditionMode==="perPosition"){const v=a[posKey]; return v==="both"?["ifa","tarot"]:[v]} if(m.traditionMode==="perGroup"){const group=m.groups.find(g=>g.positionKeys.includes(posKey)); return [a[group.key]]} return ["tarot"] }
  function assignmentComplete(){ if(!mode) return false; if(mode.traditionMode==="single") return !!assignment.__single; if(mode.traditionMode==="perPosition") return mode.positions.every(p=>assignment[p.key]); return false }

  async function drawAndReveal(){
    setLoading(true);
    const positions = mode.positions.map(p=>{
      const traditions = traditionsForPosition(p.key);
      const cards = traditions.map(t=>drawCard(t, t==="tarot" ? profile.tarotReversals : profile.ifaReversalsExperimental));
      return {...p, cards}
    });
    setResolved(positions);
    setScreen("dim-reading");
    try{
      const meta = positions.flatMap(p=>p.cards.map(c=>({tradition:c.tradition,name:c.name,file:c.file,marks12:c.marks12})));
      const res = await fetch("/api/generate", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({question, dimension:dimKey, mode:mode.key, modeTitle:mode.title, positions, meta})});
      const data = await res.json();
      setReading(data.text || data.reading || `Reading for ${mode.title}: ${positions.map(p=>p.label+": "+p.cards.map(c=>c.name).join(", ")).join(" | ")} - ${question}`);
    }catch(e){ setReading(`Your cards are drawn but offline: ${positions.map(p=>p.cards.map(c=>c.name).join(", ")).join(" | ")} - ${e.message}`)}
    finally{ setLoading(false) }
  }

  const wrap={maxWidth:460,margin:"0 auto",minHeight:600,background:INK,color:IVORY,padding:"36px 24px 28px",borderRadius:16,boxSizing:"border-box"};
  const dimCfg=dimKey?DIMENSIONS[dimKey]:null;

  return (
    <div style={{background:INDIGO,padding:"24px 12px",borderRadius:20}}>
      <div style={wrap}>
        {screen==="home" && (
          <div>
            <div style={{textAlign:"center",marginBottom:32}}><div style={{fontSize:28,color:GOLD}}>Ifatarot</div><div style={{fontSize:13,color:SAGE,marginTop:8}}>Two traditions. One clear answer. 1D-9D + Ifa 3.0 12-marks + Real Rider</div></div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {Object.keys(DIMENSIONS).map(k=><GhostButton key={k} onClick={()=>startDimension(k)}>{DIMENSIONS[k].label}</GhostButton>)}
            </div>
          </div>
        )}
        {screen==="dim-mode" && dimCfg && (
          <div>
            <Header title={dimCfg.label} onBack={()=>setScreen("home")}/>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {dimCfg.modes.map(m=>(
                <button key={m.key} onClick={()=>{setMode(m); setScreen("dim-tradition")}} style={{textAlign:"left",background:"rgba(243,234,216,0.03)",border:`1px solid ${HAIRLINE}`,borderRadius:8,padding:14,cursor:"pointer"}}>
                  <div style={{color:GOLD,fontSize:16}}>{m.title}</div><div style={{fontSize:12,color:SAGE}}>{m.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {screen==="dim-tradition" && dimCfg && mode && (
          <div>
            <Header title={mode.title} onBack={()=>setScreen(dimCfg.modes.length>1?"dim-mode":"home")}/>
            {mode.traditionMode==="single" && <Field label="Which tradition?"><div style={{display:"flex",gap:10}}><button onClick={()=>setAssignment({__single:"ifa"})} style={{padding:"9px 16px",borderRadius:999,border:`1px solid ${assignment.__single==="ifa"?GOLD:HAIRLINE}`,background:assignment.__single==="ifa"?"rgba(217,169,74,0.14)":"transparent",color:IVORY}}>Ifa (12-mark)</button><button onClick={()=>setAssignment({__single:"tarot"})} style={{padding:"9px 16px",borderRadius:999,border:`1px solid ${assignment.__single==="tarot"?GOLD:HAIRLINE}`,background:assignment.__single==="tarot"?"rgba(217,169,74,0.14)":"transparent",color:IVORY}}>Tarot (Real Rider)</button></div></Field>}
            {mode.traditionMode==="perPosition" && mode.positions.map(p=><Field key={p.key} label={p.label}><div style={{display:"flex",gap:8}}>{["ifa","tarot","both"].map(opt=><button key={opt} onClick={()=>setAssignment({...assignment,[p.key]:opt})} style={{padding:"9px 12px",borderRadius:999,border:`1px solid ${assignment[p.key]===opt?GOLD:HAIRLINE}`,background:assignment[p.key]===opt?"rgba(217,169,74,0.14)":"transparent",color:IVORY}}>{opt}</button>)}</div></Field>)}
            <PrimaryButton disabled={!assignmentComplete()} onClick={()=>setScreen("dim-question")}>Continue</PrimaryButton>
          </div>
        )}
        {screen==="dim-question" && (
          <div>
            <Header title="Ask your question" onBack={()=>setScreen("dim-tradition")}/>
            <Field label="What's on your mind"><textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="What do I need to understand?" style={{width:"100%",minHeight:110,boxSizing:"border-box",background:"rgba(243,234,216,0.05)",border:`1px solid ${HAIRLINE}`,borderRadius:6,padding:14,color:IVORY,fontSize:15,resize:"vertical"}}/></Field>
            {error && <p style={{color:CAMWOOD,fontSize:13}}>{error}</p>}
            <PrimaryButton onClick={()=>{ if(!question.trim()){setError("Enter your question"); return} drawAndReveal() }}>Begin shuffling - Draw {mode.positions.length} cards</PrimaryButton>
          </div>
        )}
        {screen==="dim-reading" && resolved && (
          <div>
            <Header title={`Your ${dimKey} reading - ${mode.title}`} onBack={()=>setScreen("home")}/>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:20}}>
              {resolved.map((p)=>p.cards.map((c,i)=><div key={p.key+i} style={{width:96}}><CardArt tradition={c.tradition} name={c.name} size={80}/><div style={{fontSize:10,color:SAGE,marginTop:4}}>{p.label}{c.file ? ` • ${c.file}` : ""}</div></div>))}
            </div>
            <p style={{fontSize:15,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{loading ? "Consulting..." : reading}</p>
            {!loading && <GhostButton style={{width:"100%",marginTop:20}} onClick={()=>setScreen("home")}>Back Home - Choose another dimension</GhostButton>}
          </div>
        )}
      </div>
    </div>
  )
}
