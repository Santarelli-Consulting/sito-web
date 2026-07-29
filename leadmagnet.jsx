// leadmagnet.jsx — Checklist gratuita (lead magnet a basso attrito)

function LeadMagnet({ onNav }) {
  const [email, setEmail] = React.useState('');
  const [unlocked, setUnlocked] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError('Inserisci una email valida'); return; }
    setError('');
    setUnlocked(true);
  };

  return (
    <div id="checklist-gratuita" style={{ background: 'var(--ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 12% 20%, rgba(200,16,46,.22), transparent 50%)' }} />
      <div style={{ position: 'relative', padding: 'clamp(28px,4vw,48px)', display: 'grid', gridTemplateColumns: unlocked ? '1fr' : '1.1fr .9fr', gap: 36 }} className="lm-grid">
        <div>
          <div className="eyebrow" style={{ color: '#fff' }}>Checklist gratuita</div>
          <h2 style={{ color: '#fff', marginBottom: 14 }}>10 punti per verificare la sicurezza in azienda</h2>
          <p style={{ color: 'rgba(255,255,255,.72)', marginBottom: unlocked ? 28 : 0, maxWidth: '60ch' }}>
            Una lista pratica per capire in autonomia cosa controllare prima di un’ispezione o di un check preliminare: RSPP, DVR, formazione, antincendio, medicina del lavoro e scadenze.
          </p>

          {unlocked && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 32px', marginBottom: 28 }} className="lm-list">
                {CHECKLIST.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: 'var(--red)', flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,.85)', lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => window.print()}>Salva o stampa in PDF</button>
                <button className="btn btn-outline-light" onClick={() => onNav('contatti')}>Richiedi un check preliminare</button>
              </div>
            </div>
          )}
        </div>

        {!unlocked && (
          <form onSubmit={submit} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 'var(--radius)', padding: 28, alignSelf: 'center' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: '#fff', marginBottom: 10 }}>Inserisci la tua email per sbloccarla</label>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="mario@esempio.it"
              style={{ width: '100%', padding: '13px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid ' + (error ? 'var(--red)' : 'rgba(255,255,255,.25)'), background: 'rgba(255,255,255,.05)', color: '#fff', fontSize: 15, marginBottom: error ? 8 : 16 }} />
            {error && <div style={{ color: '#ff8a97', fontSize: 13, marginBottom: 12 }}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Sblocca la checklist</button>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', margin: '12px 0 0' }}>Nessuno spam: solo la checklist, subito.</p>
          </form>
        )}
      </div>
      <style>{`
        @media(max-width:820px){ .lm-grid{ grid-template-columns:1fr !important;} }
        @media(max-width:560px){ .lm-list{ grid-template-columns:1fr !important;} }
      `}</style>
    </div>
  );
}

Object.assign(window, { LeadMagnet });
