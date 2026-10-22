
import { useState } from 'react'

export default function LandingPage({ onEnter }) {
  const [flipped, setFlipped] = useState([false, false, false])
  const toggle = (i) => setFlipped(f => { const n=[...f]; n[i]=!n[i]; return n })
  const [demoRevealed, setDemoRevealed] = useState(false)

  const sectionStyle = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', color: '#FDF6E3', fontFamily: 'Inter, system-ui, sans-serif', overflowX: 'hidden' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 28px', position: 'sticky', top: 0, zIndex: 10, background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1E1E2A' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #E8A44A, #8B2E2E)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14, color: '#0A0A0F' }}>I</div>
          <div style={{ fontWeight: 700, letterSpacing: '0.2em', fontSize: 13 }}>IFATAROT</div>
          <div style={{ fontSize: 10, opacity: 0.5, marginLeft: 8, letterSpacing: '0.15em' }}>A NEW TRADITION</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 11, opacity: 0.5, display: 'none' }}>IBADAN • LAGOS • NEW ORLEANS</div>
          <button onClick={onEnter} style={{ background: '#E8A44A', color: '#0A0A0F', padding: '9px 18px', borderRadius: 999, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Enter Temple →</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ ...sectionStyle, paddingTop: 70, paddingBottom: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.35em', opacity: 0.5, marginBottom: 18 }}>256 ODU • 78 ARCANA • 1 LIVING ORACLE</div>

        {/* Visual - Two cards colliding */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, margin: '30px 0 30px', position: 'relative' }}>
          <div style={{ width: 160, height: 240, borderRadius: 16, background: 'linear-gradient(160deg, #2A1E14, #1A120E)', border: '1px solid #3A2A1E', transform: 'rotate(-8deg)', display: 'grid', placeItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 38 }}>◍</div>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', marginTop: 6 }}>OGBE MEJI</div>
              <div style={{ fontSize: 22, marginTop: 8, opacity: 0.8 }}>II II<br/>II II</div>
            </div>
          </div>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle, #E8A44A55, transparent 70%)', margin: '0 -15px', zIndex: 2, display: 'grid', placeItems: 'center', fontSize: 22 }}>✦</div>
          <div style={{ width: 160, height: 240, borderRadius: 16, background: 'linear-gradient(160deg, #FDF6E3, #E8DCC6)', color: '#1A1A2E', border: '1px solid #E8DCC6', transform: 'rotate(8deg)', display: 'grid', placeItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>☀</div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', marginTop: 6, fontWeight: 700 }}>XIX • THE SUN</div>
              <div style={{ fontSize: 12, marginTop: 12, opacity: 0.7, padding: '0 12px' }}>Clarity • Ori is aligned</div>
            </div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 5.5vw, 62px)', lineHeight: 1.05, fontWeight: 700, margin: '0 0 18px', letterSpacing: '-0.02em' }}>
          Ifá did not end.<br/>Tarot did not begin.<br/>
          <span style={{ color: '#E8A44A' }}>They remembered each other.</span>
        </h1>
        <p style={{ maxWidth: 640, margin: '0 auto 28px', opacity: 0.75, lineHeight: 1.7, fontSize: 'clamp(15px,2vw,17px)' }}>
          <b style={{ color: '#FDF6E3' }}>Ifatarot</b> is not Ifa + Tarot. It's a new tradition. We take the 16 primal Meji and 256 Odu of Ifa —
          with their Itan, Odu verses, and Orisha wisdom — and read them through the 22 Majors and 56 Minors.
          Each draw gives you <b>Odu + Card + Itan + Imoran (actionable advice)</b>.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onEnter} style={{ background: '#E8A44A', color: '#0A0A0F', padding: '15px 28px', borderRadius: 999, border: 'none', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Cast Your First Reading →</button>
          <a href="#system" style={{ border: '1px solid #2A2A3A', color: '#FDF6E3', padding: '15px 28px', borderRadius: 999, fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>Learn the System</a>
        </div>
        <div style={{ marginTop: 22, fontSize: 11, opacity: 0.4, letterSpacing: '0.15em' }}>BUILT WITH BABALAWOS & READERS • IBADAN • PWA READY • 8 ROLLING CREDITS</div>
      </div>

      {/* STATS */}
      <div style={{ borderTop: '1px solid #1E1E2A', borderBottom: '1px solid #1E1E2A', background: '#0F0F14' }}>
        <div style={{ ...sectionStyle, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center', padding: '18px 24px' }}>
          {[
            ['256', 'ODU PATHS'],
            ['78', 'ARCANA'],
            ['1', 'TRADITION'],
            ['∞', 'ITAN'],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', opacity: 0.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT IS IT */}
      <div id="system" style={{ ...sectionStyle, padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', opacity: 0.5 }}>WHAT IS IFATAROT</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px,4vw,44px)', margin: '10px 0 0' }}>Three roots. One tree.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{ background: '#15151F', border: '1px solid #242438', borderRadius: 20, padding: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#2A1E14', display: 'grid', placeItems: 'center', marginBottom: 16 }}>◍</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, marginBottom: 8 }}>The Ifa Root</div>
            <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: 14 }}>
              16 Meji form 256 Odu. Each Odu carries Ese Ifa verses, Itan (mythic stories), Orisha energies (Esu, Osun, Sango, Oya), and Ebo. This is the anchor — the question of destiny, character, and sacrifice.
            </p>
            <div style={{ marginTop: 12, fontSize: 11, opacity: 0.5, letterSpacing: '0.15em' }}>ODU • ESE • ITAN • EBO</div>
          </div>
          <div style={{ background: '#15151F', border: '1px solid #242438', borderRadius: 20, padding: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FDF6E333', display: 'grid', placeItems: 'center', marginBottom: 16 }}>☾</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, marginBottom: 8 }}>The Tarot Mirror</div>
            <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: 14 }}>
              22 Majors are the soul's journey. 56 Minors are daily life: Wands (Fire), Cups (Water), Swords (Air), Pentacles (Earth). Tarot mirrors what Ifa names — archetype meets lived moment.
            </p>
            <div style={{ marginTop: 12, fontSize: 11, opacity: 0.5, letterSpacing: '0.15em' }}>MAJORS • MINORS • ELEMENTS • ARCHETYPES</div>
          </div>
          <div style={{ background: 'linear-gradient(160deg, #1E1A14, #15151F)', border: '1px solid #3A2A1E', borderRadius: 20, padding: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E8A44A', color: '#0A0A0F', display: 'grid', placeItems: 'center', marginBottom: 16, fontWeight: 800 }}>✦</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, marginBottom: 8 }}>The Fusion</div>
            <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: 14 }}>
              Every draw fuses: <b style={{color:'#E8A44A'}}>Odu</b> (where you stand), <b style={{color:'#E8A44A'}}>Card</b> (how it looks), <b style={{color:'#E8A44A'}}>Itan</b> (story to learn from), <b style={{color:'#E8A44A'}}>Imoran</b> (what to do now). Not translation — new divination.
            </p>
            <div style={{ marginTop: 12, fontSize: 11, opacity: 0.6, letterSpacing: '0.15em', color: '#E8A44A' }}>ODU + CARD + ITAN + IMORAN</div>
          </div>
        </div>
      </div>

      {/* DEMO */}
      <div style={{ ...sectionStyle, padding: '20px 24px 80px' }}>
        <div style={{ background: '#0F0F14', border: '1px solid #1E1E2A', borderRadius: 24, padding: '32px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.3em', opacity: 0.5, marginBottom: 8 }}>LIVE TASTE • NO CREDIT USED</div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 28, margin: '0 0 10px' }}>Experience a fused reading</h3>
          <p style={{ opacity: 0.6, fontSize: 14, marginBottom: 24 }}>Tap to reveal. This is how your real readings will feel.</p>

          {!demoRevealed ? (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['ODU', 'CARD', 'ITAN'].map((label, i) => (
                <div key={label} onClick={() => { setDemoRevealed(true); toggle(i); }} style={{ width: 140, height: 200, borderRadius: 16, border: '1px dashed #2A2A3A', display: 'grid', placeItems: 'center', cursor: 'pointer', background: '#15151F' }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.5 }}>{label}<br/><span style={{ fontSize: 20 }}>◍</span></div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14, textAlign: 'left', maxWidth: 800, margin: '0 auto' }}>
              <div style={{ background: '#1A1610', border: '1px solid #3A2A1E', borderRadius: 16, padding: 18 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#E8A44A' }}>ODU • OGBE MEJI</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, marginTop: 6 }}>Light has come. The head is clear.</div>
                <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8, lineHeight: 1.5 }}>Ogbe brings alignment of Ori. Esu opens the road, but you must walk with truth. No hidden Ebo except honesty.</p>
              </div>
              <div style={{ background: '#FDF6E3', color: '#1A1A2E', borderRadius: 16, padding: 18 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', fontWeight: 700 }}>CARD • XIX THE SUN</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, marginTop: 6 }}>Joy after clarity.</div>
                <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8, lineHeight: 1.5 }}>After night comes recognition. Your inner child is not naive — it's aligned. Share this light.</p>
              </div>
              <div style={{ background: 'linear-gradient(160deg, #E8A44A, #C17A5C)', color: '#0A0A0F', borderRadius: 16, padding: 18 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', fontWeight: 800 }}>FUSION • IMORAN</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, marginTop: 6, fontWeight: 700 }}>Do not dim.</div>
                <p style={{ fontSize: 13, marginTop: 8, lineHeight: 1.5, fontWeight: 500 }}>Ose: Speak your clear thought today, even if small. Light a white candle. Ebo is truth-telling.</p>
                <button onClick={() => setDemoRevealed(false)} style={{ marginTop: 12, background: '#0A0A0F', color: '#FDF6E3', border: 'none', borderRadius: 999, padding: '8px 14px', fontSize: 11, cursor: 'pointer' }}>Shuffle again</button>
              </div>
            </div>
          )}

          <button onClick={onEnter} style={{ marginTop: 28, background: '#E8A44A', color: '#0A0A0F', padding: '14px 26px', borderRadius: 999, border: 'none', fontWeight: 800, cursor: 'pointer' }}>Enter Temple to cast yours →</button>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: '#FDF6E3', color: '#0A0A0F', padding: '70px 0' }}>
        <div style={{ ...sectionStyle }}>
          <div style={{ fontSize: 11, letterSpacing: '0.35em', opacity: 0.5, textAlign: 'center' }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px,4vw,42px)', textAlign: 'center', margin: '10px 0 40px' }}>From intention to walking.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 24 }}>
            {[
              ['1', 'Set Intention', 'Hold your question. Not “what will happen?” but “how should I walk?” Ifa cares about character.'],
              ['2', 'Shake Ikin / Shuffle', 'Your click hits /api/generate. Server consults Anthropic/DeepSeek with your Odu + Tarot prompt. One credit used.'],
              ['3', 'Receive Odu & Arcana', 'You get Odu, Card, Itan story, Imoran (action), and Vessel insight when needed. Saved locally per device.'],
              ['4', 'Walk with Ose', 'Journal, note the Ebo, revisit. Credits refill 1 per 3 hours. Never hard reset. Admin fast-lane for you.'],
            ].map(([num, title, desc]) => (
              <div key={num} style={{ borderTop: '2px solid #0A0A0F', paddingTop: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.4 }}>{num}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, margin: '8px 0' }}>{title}</div>
                <p style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ ...sectionStyle, padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px,5vw,56px)', lineHeight: 1.05 }}>Ready to consult<br/>the crossroads?</h2>
        <p style={{ opacity: 0.6, margin: '16px auto 28px', maxWidth: 520 }}>8 rolling credits. PWA installs like a real app. Your API key stays on Railway server, never in browser.</p>
        <button onClick={onEnter} style={{ background: '#FDF6E3', color: '#0A0A0F', padding: '16px 32px', borderRadius: 999, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Enter Temple</button>
        <div style={{ marginTop: 24, fontSize: 11, opacity: 0.35, letterSpacing: '0.15em' }}>Ifatarot v1.0.0 • Press to unlock admin • Data is anonymous, per-device</div>
      </div>
    </div>
  )
}
