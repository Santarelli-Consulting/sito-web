// autocheck.jsx — Autovalutazione sicurezza (lead-gen interattivo)

function ResultPreview() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setT(v => (v + 1) % 200), 30);
    return () => clearInterval(id);
  }, []);
  const pct = t < 100 ? Math.round((t / 100) * 74) : Math.round(74 - ((t - 100) / 100) * 74);
  const r = 46, c = 2 * Math.PI * r;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--gray-200)" strokeWidth="9" />
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--red)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} style={{ transition: 'stroke-dashoffset .05s linear' }} />
      </svg>
      <div style={{ marginTop: -92, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--gray-400)' }}>{pct}%</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: 150, marginTop: 6 }}>
        {[1, .7, .85].map((w, i) => (<div key={i} style={{ height: 8, width: (w * 100) + '%', borderRadius: 4, background: 'var(--gray-200)' }} />))}
      </div>
    </div>
  );
}

function AutoCheck({ onNav, compact }) {
  const [answers, setAnswers] = React.useState({});
  const [done, setDone] = React.useState(false);

  const set = (i, v) => setAnswers(a => ({ ...a, [i]: v }));
  const allAnswered = AUTOCHECK.every((_, i) => answers[i] !== undefined);
  const score = AUTOCHECK.reduce((s, _, i) => s + (answers[i] === 'si' ? 2 : answers[i] === 'ns' ? 1 : 0), 0);
  const max = AUTOCHECK.length * 2;
  const pct = Math.round((score / max) * 100);
  const gaps = AUTOCHECK.filter((_, i) => answers[i] === 'no' || answers[i] === 'ns').map(q => q.area);

  let level, msg, color;
  if (pct >= 83) { level = 'Buona base'; color = '#1F8A5B'; msg = 'La tua azienda sembra ben organizzata. Un confronto ci permette di verificare i dettagli e mantenere tutto aggiornato nel tempo.'; }
  else if (pct >= 50) { level = 'Da rafforzare'; color = '#C8102E'; msg = 'Ci sono aree da sistemare per essere pienamente in regola. Con un check preliminare individuiamo priorità e interventi.'; }
  else { level = 'Diverse criticità'; color = '#C8102E'; msg = 'Emergono più punti scoperti che espongono a rischi e sanzioni. Conviene un confronto rapido per mettere in sicurezza l’azienda.'; }

  const opts = [{ k: 'si', l: 'Sì' }, { k: 'no', l: 'No' }, { k: 'ns', l: 'Non so' }];

  return (
    <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1.15fr .85fr' }} className="ac-grid">
        {/* Domande */}
        <div style={{ padding: 'clamp(28px,4vw,44px)' }}>
          <div className="eyebrow">Autovalutazione · 1 minuto</div>
          <h2 style={{ fontSize: 'clamp(24px,2.6vw,32px)', marginBottom: 8 }}>La tua azienda è in regola con la sicurezza?</h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: 28, fontSize: 15.5 }}>Rispondi a 6 domande e scopri subito il livello di conformità, senza lasciare dati.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {AUTOCHECK.map((q, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingBottom: 14, borderBottom: '1px solid var(--gray-100)', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, color: 'var(--gray-900)', fontWeight: 500, flex: '1 1 260px' }}>{q.q}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {opts.map(o => (
                    <button key={o.k} onClick={() => set(i, o.k)} style={{
                      padding: '7px 14px', borderRadius: 100, cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
                      border: '1.5px solid ' + (answers[i] === o.k ? 'var(--red)' : 'var(--gray-300)'),
                      background: answers[i] === o.k ? 'var(--red)' : '#fff',
                      color: answers[i] === o.k ? '#fff' : 'var(--gray-700)', transition: 'all .12s',
                    }}>{o.l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!done && (
            <button className="btn btn-primary" style={{ marginTop: 26, fontSize: 15, padding: '14px 26px', opacity: allAnswered ? 1 : .5, pointerEvents: allAnswered ? 'auto' : 'none' }} onClick={() => setDone(true)}>
              Vedi il risultato <I.arrow width="16" height="16" className="arrow" />
            </button>
          )}
        </div>

        {/* Risultato */}
        <div style={{ padding: 'clamp(28px,4vw,44px)', background: done ? 'var(--ink)' : 'var(--gray-50)', color: done ? '#fff' : 'var(--gray-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background .3s', position: 'relative', overflow: 'hidden' }}>
          {!done && (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <ResultPreview />
              <p style={{ margin: '18px auto 0', maxWidth: '26ch', fontSize: 14.5 }}>Così apparirà il tuo livello di conformità, appena rispondi.</p>
            </div>
          )}
          {done && (
            <div>
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 10%, rgba(200,16,46,.28), transparent 55%)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>Il tuo risultato</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, color: '#fff', lineHeight: 1 }}>{pct}%</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: color === '#1F8A5B' ? '#4ade80' : '#ff6b7d' }}>{level}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,.14)', borderRadius: 6, overflow: 'hidden', margin: '14px 0 22px' }}>
                  <div style={{ width: pct + '%', height: '100%', background: color === '#1F8A5B' ? '#4ade80' : 'var(--red)', borderRadius: 6, transition: 'width .5s var(--ease)' }} />
                </div>
                <p style={{ color: 'rgba(255,255,255,.82)', fontSize: 15, marginBottom: gaps.length ? 18 : 24 }}>{msg}</p>
                {gaps.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: 10 }}>Aree da verificare</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {gaps.map((g, i) => (<span key={i} style={{ fontSize: 12.5, fontFamily: 'var(--font-display)', fontWeight: 600, padding: '6px 12px', borderRadius: 100, background: 'rgba(255,255,255,.1)', color: '#fff' }}>{g}</span>))}
                    </div>
                  </div>
                )}
                <button className="btn btn-primary" style={{ fontSize: 15 }} onClick={() => onNav('contatti')}>Richiedi il check preliminare <I.arrow width="16" height="16" className="arrow" /></button>
                <button onClick={() => { setDone(false); setAnswers({}); }} style={{ display: 'block', marginTop: 14, background: 'none', border: 0, color: 'rgba(255,255,255,.55)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>Ripeti il test</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@media(max-width:820px){ .ac-grid{ grid-template-columns:1fr !important;} }`}</style>
    </div>
  );
}

function StressTest({ onNav }) {
  const [answers, setAnswers] = React.useState({});
  const [done, setDone] = React.useState(false);
  const set = (i, v) => setAnswers(a => ({ ...a, [i]: v }));
  const allAnswered = STRESS_TEST.every((_, i) => answers[i] !== undefined);
  const score = STRESS_TEST.reduce((s, q, i) => {
    const v = answers[i];
    if (v === undefined) return s;
    const bad = q.invert ? v === 'no' : v === 'si';
    return s + (bad ? 0 : v === 'ns' ? 1 : 2);
  }, 0);
  const max = STRESS_TEST.length * 2;
  const pct = Math.round((score / max) * 100);
  const gaps = STRESS_TEST.filter((q, i) => (q.invert ? answers[i] === 'no' : answers[i] === 'si')).map(q => q.area);
  const opts = [{ k: 'si', l: 'Sì' }, { k: 'no', l: 'No' }, { k: 'ns', l: 'Non so' }];

  let level, msg;
  if (pct >= 83) { level = 'Clima sereno'; msg = 'Il clima organizzativo sembra positivo. Un confronto periodico aiuta a mantenerlo nel tempo.'; }
  else if (pct >= 50) { level = 'Alcuni segnali'; msg = 'Ci sono segnali da non ignorare. Un confronto con la nostra psicologa del lavoro aiuta a inquadrarli prima che si aggravino.'; }
  else { level = 'Attenzione richiesta'; msg = 'Emergono più segnali di stress lavoro-correlato. È il momento di un confronto dedicato con la nostra psicologa del lavoro.'; }

  return (
    <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr' }} className="ac-grid">
        <div style={{ padding: 'clamp(28px,4vw,44px)' }}>
          <div className="eyebrow">Mini-test · 1 minuto</div>
          <h2 style={{ fontSize: 'clamp(24px,2.6vw,32px)', marginBottom: 8 }}>Come sta il clima in azienda?</h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: 28, fontSize: 15.5 }}>Un primo indicatore di stress lavoro-correlato, a cura della nostra psicologa del lavoro.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {STRESS_TEST.map((q, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingBottom: 14, borderBottom: '1px solid var(--gray-100)', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, color: 'var(--gray-900)', fontWeight: 500, flex: '1 1 260px' }}>{q.q}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {opts.map(o => (
                    <button key={o.k} onClick={() => set(i, o.k)} style={{
                      padding: '7px 14px', borderRadius: 100, cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
                      border: '1.5px solid ' + (answers[i] === o.k ? 'var(--red)' : 'var(--gray-300)'),
                      background: answers[i] === o.k ? 'var(--red)' : '#fff',
                      color: answers[i] === o.k ? '#fff' : 'var(--gray-700)', transition: 'all .12s',
                    }}>{o.l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {!done && (
            <button className="btn btn-primary" style={{ marginTop: 26, fontSize: 15, padding: '14px 26px', opacity: allAnswered ? 1 : .5, pointerEvents: allAnswered ? 'auto' : 'none' }} onClick={() => setDone(true)}>
              Vedi il risultato <I.arrow width="16" height="16" className="arrow" />
            </button>
          )}
        </div>
        <div style={{ padding: 'clamp(28px,4vw,44px)', background: done ? 'var(--ink)' : 'var(--gray-50)', color: done ? '#fff' : 'var(--gray-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          {!done && (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <ResultPreview />
              <p style={{ margin: '18px auto 0', maxWidth: '26ch', fontSize: 14.5 }}>Così apparirà il tuo risultato, appena rispondi.</p>
            </div>
          )}
          {done && (
            <div style={{ position: 'relative' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 10%, rgba(200,16,46,.28), transparent 55%)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>Il tuo risultato</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, color: '#fff', lineHeight: 1 }}>{pct}%</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: pct >= 83 ? '#4ade80' : '#ff6b7d' }}>{level}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,.14)', borderRadius: 6, overflow: 'hidden', margin: '14px 0 22px' }}>
                  <div style={{ width: pct + '%', height: '100%', background: pct >= 83 ? '#4ade80' : 'var(--red)', borderRadius: 6, transition: 'width .5s var(--ease)' }} />
                </div>
                <p style={{ color: 'rgba(255,255,255,.82)', fontSize: 15, marginBottom: gaps.length ? 18 : 24 }}>{msg}</p>
                {gaps.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: 10 }}>Aree segnalate</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {gaps.map((g, i) => (<span key={i} style={{ fontSize: 12.5, fontFamily: 'var(--font-display)', fontWeight: 600, padding: '6px 12px', borderRadius: 100, background: 'rgba(255,255,255,.1)', color: '#fff' }}>{g}</span>))}
                    </div>
                  </div>
                )}
                <button className="btn btn-primary" style={{ fontSize: 15 }} onClick={() => onNav('contatti')}>Parla con la psicologa del lavoro <I.arrow width="16" height="16" className="arrow" /></button>
                <button onClick={() => { setDone(false); setAnswers({}); }} style={{ display: 'block', marginTop: 14, background: 'none', border: 0, color: 'rgba(255,255,255,.55)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>Ripeti il test</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AutoCheck, StressTest, ResultPreview });
