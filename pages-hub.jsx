// pages-hub.jsx — Sicurezza (hub+dettaglio), Formazione (hub+corso), Medicina, Certificazioni

// ─── FAQ accordion ────────────────────────────────────────
function FAQ({ items, title = 'Domande frequenti' }) {
  const [open, setOpen] = React.useState(0);
  if (!items || !items.length) return null;
  return (
    <div style={{ marginTop: 56 }}>
      {title ? <h3 style={{ marginBottom: 22 }}>{title}</h3> : null}
      <div style={{ borderTop: '1px solid var(--gray-200)' }}>
        {items.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--gray-200)' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 0, padding: '20px 4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}>
              {f.q}
              <span style={{ color: 'var(--red)', fontSize: 24, lineHeight: 1, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform .2s var(--ease)', flexShrink: 0 }}>+</span>
            </button>
            {open === i && <p style={{ padding: '0 4px 22px', margin: 0, color: 'var(--gray-600, var(--gray-500))', maxWidth: '72ch' }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Problema / Rischio / Soluzione ───────────────────────
function PRS({ problem, rischio, benefit }) {
  const rows = [
    { k: 'Il problema', v: problem, c: 'var(--gray-500)', bg: 'var(--gray-50)', bd: 'var(--gray-200)' },
    { k: 'Il rischio', v: rischio, c: 'var(--gray-500)', bg: 'var(--gray-50)', bd: 'var(--gray-200)' },
    { k: 'La soluzione', v: benefit, c: 'var(--gray-900)', bg: 'var(--red-tint)', bd: 'transparent', accent: true },
  ].filter(r => r.v);
  return (
    <div className="prs-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${rows.length}, 1fr)`, gap: 20, margin: '8px 0 8px' }}>
      {rows.map((r, i) => (
        <div key={i} style={{ background: r.bg, border: '1px solid ' + r.bd, borderRadius: 'var(--radius)', padding: 26, borderLeft: r.accent ? '3px solid var(--red)' : ('1px solid ' + r.bd) }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: r.accent ? 'var(--red)' : 'var(--gray-400)', marginBottom: 12 }}>{r.k}</div>
          <p style={{ margin: 0, color: r.c, fontSize: 15.5 }}>{r.v}</p>
        </div>
      ))}
      <style>{`@media(max-width:820px){ .prs-grid{ grid-template-columns:1fr !important;} }`}</style>
    </div>
  );
}

function DetailCTA({ text, button, onClick }) {
  return (
    <div style={{ marginTop: 56, padding: 32, background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <p style={{ margin: 0, fontSize: 17, maxWidth: '46ch', color: 'var(--gray-700)' }}>{text}</p>
      <button className="btn btn-primary" style={{ fontSize: 16, padding: '15px 28px' }} onClick={onClick}>{button} <I.arrow width="16" height="16" className="arrow" /></button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ANTINCENDIO — pagina dedicata (top-level)
// ═══════════════════════════════════════════════════════════
function AntincendioPage({ onNav }) {
  useSEO(ANTINCENDIO.metaTitle, ANTINCENDIO.metaDesc);
  useReveal();
  return (
    <div className="page">
      <section className="hero-sub">
        <div className="container">
          <I.flame className="hero-watermark" style={{ display: window.innerWidth > 860 ? 'block' : 'none' }} />
          <div className="hero-text-col">
            <div className="eyebrow">Antincendio</div>
            <h1 style={{ marginBottom: 16 }}>{stripDot(ANTINCENDIO.h1)}</h1>
            <p className="subtitle" style={{ maxWidth: '66ch' }}>{ANTINCENDIO.intro}</p>
          </div>
        </div>
      </section>

      <CTABand title={ANTINCENDIO.cta} text="Un percorso completo dalla valutazione alla prova di evacuazione, seguito da chi è qualificata come addetta e formatrice antincendio rischio elevato." button={ANTINCENDIO.cta} onClick={() => onNav('contatti')} />

      <section className="section band-slate" id="antincendio-problema">
        <div className="container container-narrow">
          <PRS problem={ANTINCENDIO.problem} rischio={ANTINCENDIO.rischio} benefit={ANTINCENDIO.benefit} />
        </div>
      </section>

      <section className="section" id="antincendio-servizio">
        <div className="container container-narrow">
          <h2 style={{ marginBottom: 26, fontSize: 28 }}>Cosa comprende il servizio</h2>
          <CheckList items={ANTINCENDIO.includes} columns={2} />
          <div id="antincendio-faq"><FAQ items={ANTINCENDIO.faq} /></div>
          <DetailCTA text="Vuoi una valutazione del rischio incendio per la tua attività? Ti rispondiamo con tempi e modalità." button={ANTINCENDIO.cta} onClick={() => onNav('contatti')} />
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SICUREZZA — HUB
// ═══════════════════════════════════════════════════════════
function SicurezzaHubPage({ onNav }) {
  useSEO('Sicurezza sul Lavoro — RSPP, DVR, Antincendio, Cantieri | Santarelli Consulting',
    'Gestione completa della sicurezza aziendale secondo il D.Lgs. 81/08: RSPP esterno, DVR, DUVRI, antincendio, sicurezza cantieri e assistenza durante le ispezioni.');
  useReveal();
  return (
    <div className="page">
      <section className="hero-photo hero-photo-sub" style={{ '--photo': `url(${window.__resources ? window.__resources.sicurezza : "assets/sicurezza.jpg"})` }}>
        <div className="container">
          <div className="eyebrow">Sicurezza sul Lavoro</div>
          <h1 style={{ marginBottom: 16 }}>Gestione completa della sicurezza aziendale</h1>
          <p className="subtitle" style={{ maxWidth: '66ch' }}>
            Supportiamo il Datore di Lavoro nella gestione degli obblighi, dei rischi e degli adempimenti previsti dal D.Lgs. 81/08, con interventi costruiti sulla reale attività dell’impresa.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ marginBottom: 8 }}>
          <div className="grid grid-3">
            {SICUREZZA.map((s, i) => (
              <article key={s.slug} className="card reveal" style={{ cursor: 'pointer' }} onClick={() => onNav('sicurezza/' + s.slug)}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                  {s.featured && <span className="pill" style={{ fontSize: 10, padding: '5px 10px' }}>In evidenza</span>}
                </div>
                <h3 style={{ fontSize: 20 }}>{s.title}</h3>
                <p>{s.short}</p>
                <span className="link-arrow" style={{ fontSize: 14 }}>Scopri di più <I.arrow width="14" height="14" className="arrow" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Non sai da quale adempimento partire?" text="Richiedi un check preliminare: una fotografia chiara della situazione, poi decidi tu." button="Richiedi un check preliminare" onClick={() => onNav('contatti')} />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container-narrow">
          <FAQ items={FAQ_GENERAL} />
        </div>
      </section>
    </div>
  );
}

// ─── SICUREZZA — DETTAGLIO ────────────────────────────────
function SicurezzaDetailPage({ slug, onNav }) {
  const s = SICUREZZA.find(x => x.slug === slug);
  useSEO(s ? s.metaTitle : null, s ? s.metaDesc : null);
  useReveal();
  if (!s) return <SicurezzaHubPage onNav={onNav} />;
  const idx = SICUREZZA.indexOf(s);
  const others = SICUREZZA.filter((_, i) => i !== idx).slice(0, 3);

  return (
    <div className="page">
      <section className="hero-sub">
        <div className="container">
          <a href={toHref('sicurezza')} onClick={(e) => { e.preventDefault(); onNav('sicurezza'); }} className="link-arrow" style={{ fontSize: 14, marginBottom: 18 }}>
            <I.arrow width="14" height="14" style={{ transform: 'rotate(180deg)' }} /> Sicurezza sul Lavoro
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0 18px' }}>
            <span className="pill">{s.title}</span>
          </div>
          <h1 style={{ marginBottom: 16 }}>{stripDot(s.h1)}</h1>
          <p className="subtitle" style={{ maxWidth: '64ch' }}>{s.intro || s.short}</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <PRS problem={s.problem} rischio={s.rischio} benefit={s.benefit} />

          <h2 style={{ margin: '52px 0 26px', fontSize: 28 }}>Cosa comprende il servizio</h2>
          <CheckList items={s.includes} columns={2} />

          <FAQ items={s.faq} />

          <DetailCTA text={<>Vuoi una proposta su misura per <strong>{s.title}</strong>? Ti rispondiamo con tempi e modalità.</>} button={s.cta} onClick={() => onNav('contatti')} />

          {/* Link interni */}
          <div style={{ marginTop: 64 }}>
            <div className="eyebrow">Servizi collegati</div>
            <div className="grid grid-3" style={{ marginTop: 8 }}>
              {others.map(o => (
                <a key={o.slug} href={toHref('sicurezza/' + o.slug)} onClick={(e) => { e.preventDefault(); onNav('sicurezza/' + o.slug); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 18px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', color: 'var(--ink)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5 }}>{o.title}</span>
                  <I.arrow width="16" height="16" style={{ color: 'var(--red)', flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FORMAZIONE — HUB
// ═══════════════════════════════════════════════════════════
function FormazioneHubPage({ onNav }) {
  useSEO('Formazione Sicurezza sul Lavoro — Corsi 81/08 e attrezzature | Santarelli Consulting',
    'Corsi di formazione obbligatoria e addestramento pratico: lavoratori, preposti, dirigenti, RLS, primo soccorso, BLSD, antincendio, PLE, carrelli, gru, HACCP.');
  useReveal();
  return (
    <div className="page">
      <section className="hero-photo hero-photo-sub" style={{ '--photo': `url(${window.__resources ? window.__resources.formazione : "assets/formazione.jpg"})` }}>
        <div className="container">
          <div className="eyebrow">Formazione</div>
          <h1 style={{ marginBottom: 16 }}>Formazione obbligatoria e addestramento pratico</h1>
          <p className="subtitle" style={{ maxWidth: '66ch' }}>
            Organizziamo corsi presso le aziende o in strutture dedicate, con contenuti chiari, esempi reali ed esercitazioni pratiche quando previste.
          </p>
        </div>
      </section>

      {FORMAZIONE_CATS.slice(0, 1).map((cat, ci) => (
        <section key={cat.id} className="section" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--red)' }}>{String(ci + 1).padStart(2, '0')}</span>
              <h2 style={{ fontSize: 28 }}>{cat.title}</h2>
            </div>
            <p style={{ color: 'var(--gray-500)', marginBottom: 30, maxWidth: '60ch' }}>{cat.intro}</p>
            <div className="grid grid-3">
              {cat.courses.map(cs => {
                const c = CORSI[cs];
                if (!c) return null;
                return (
                  <article key={cs} className="card reveal" style={{ cursor: 'pointer', padding: 24 }} onClick={() => onNav('formazione/' + cs)}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                      <h3 style={{ fontSize: 17 }}>{c.title}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: 'var(--gray-500)', fontSize: 13.5 }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>Durata</span> {c.hours}</div>
                    <span className="link-arrow" style={{ fontSize: 13.5, marginTop: 'auto' }}>Dettagli corso <I.arrow width="13" height="13" className="arrow" /></span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <CTABand title="Serve un corso per la tua squadra?" text="Corsi in azienda o in struttura dedicata. Calendario e preventivo su richiesta." button="Richiedi informazioni sui corsi" onClick={() => onNav('contatti')} />

      {FORMAZIONE_CATS.slice(1, 4).map((cat, i) => { const ci = i + 2; return (
        <section key={cat.id} className={'section ' + (ci % 2 ? 'bg-light' : '')} style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--red)' }}>{String(ci).padStart(2, '0')}</span>
              <h2 style={{ fontSize: 28 }}>{cat.title}</h2>
            </div>
            <p style={{ color: 'var(--gray-500)', marginBottom: 30, maxWidth: '60ch' }}>{cat.intro}</p>
            <div className="grid grid-3">
              {cat.courses.map(cs => {
                const c = CORSI[cs];
                if (!c) return null;
                return (
                  <article key={cs} className="card reveal" style={{ cursor: 'pointer', padding: 24 }} onClick={() => onNav('formazione/' + cs)}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                      <h3 style={{ fontSize: 17 }}>{c.title}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: 'var(--gray-500)', fontSize: 13.5 }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>Durata</span> {c.hours}</div>
                    <span className="link-arrow" style={{ fontSize: 13.5, marginTop: 'auto' }}>Dettagli corso <I.arrow width="13" height="13" className="arrow" /></span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ); })}

      {/* 05 + 06 — categorie mono-corso affiancate sulla stessa riga */}
      <section className="section band-slate" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: 48 }}>
            {FORMAZIONE_CATS.slice(4, 6).map((cat, i) => {
              const cs = cat.courses[0];
              const c = CORSI[cs];
              return (
                <div key={cat.id}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--red)' }}>{String(i + 5).padStart(2, '0')}</span>
                    <h2 style={{ fontSize: 28, color: '#fff' }}>{cat.title}</h2>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,.75)', marginBottom: 22, maxWidth: '60ch' }}>{cat.intro}</p>
                  {c && (
                    <article className="card reveal" style={{ cursor: 'pointer', padding: 24 }} onClick={() => onNav('formazione/' + cs)}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                        <h3 style={{ fontSize: 17 }}>{c.title}</h3>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: 'rgba(255,255,255,.6)', fontSize: 13.5 }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)' }}>Durata</span> {c.hours}</div>
                      <span className="link-arrow" style={{ fontSize: 13.5, marginTop: 'auto' }}>Dettagli corso <I.arrow width="13" height="13" className="arrow" /></span>
                    </article>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container-narrow">
          <FAQ items={FAQ_GENERAL} />
        </div>
      </section>
    </div>
  );
}

// ─── FORMAZIONE — DETTAGLIO CORSO ─────────────────────────
function CorsoDetailPage({ slug, onNav }) {
  const c = CORSI[slug];
  useSEO(c ? c.metaTitle : null, c ? c.metaDesc : null);
  useReveal();
  if (!c) return <FormazioneHubPage onNav={onNav} />;
  const cat = FORMAZIONE_CATS.find(x => x.courses.includes(slug));
  const siblings = cat ? cat.courses.filter(x => x !== slug).map(x => CORSI[x]).filter(Boolean).slice(0, 3) : [];

  const info = [
    { k: 'Destinatari', v: c.destinatari },
    { k: 'Durata', v: c.hours },
    { k: 'Attestato', v: c.attestato },
    { k: 'Modalità', v: c.modalita },
  ];

  return (
    <div className="page">
      <section className="hero-sub">
        <div className="container">
          <a href={toHref('formazione')} onClick={(e) => { e.preventDefault(); onNav('formazione'); }} className="link-arrow" style={{ fontSize: 14, marginBottom: 18 }}>
            <I.arrow width="14" height="14" style={{ transform: 'rotate(180deg)' }} /> Formazione{cat ? ' · ' + cat.title : ''}
          </a>
          <h1 style={{ margin: '16px 0 16px' }}>{stripDot(c.h1 || c.title)}</h1>
          {c.intro && <p className="subtitle" style={{ maxWidth: '64ch' }}>{c.intro}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="grid grid-2" style={{ gap: 18, marginBottom: 8 }}>
            {info.map((x, i) => (
              <div key={i} style={{ padding: 22, background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--red)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 6 }}>{x.k}</div>
                <div style={{ fontSize: 15, color: 'var(--gray-700)' }}>{x.v}</div>
              </div>
            ))}
          </div>

          <h2 style={{ margin: '48px 0 24px', fontSize: 28 }}>Contenuti del corso</h2>
          <CheckList items={c.contenuti} columns={2} />

          <FAQ items={c.faq} />

          <DetailCTA text={<>Vuoi organizzare il corso <strong>{c.title}</strong>? Definiamo date e sede.</>} button={c.cta || 'Richiedi informazioni sul corso'} onClick={() => onNav('contatti')} />

          {siblings.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <div className="eyebrow">Altri corsi della categoria</div>
              <div className="grid grid-3" style={{ marginTop: 8 }}>
                {siblings.map(o => (
                  <a key={o.slug} href={toHref('formazione/' + o.slug)} onClick={(e) => { e.preventDefault(); onNav('formazione/' + o.slug); }} style={{ padding: '16px 18px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', color: 'var(--ink)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5 }}>{o.title}</span>
                    <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{o.hours}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MEDICINA DEL LAVORO
// ═══════════════════════════════════════════════════════════
function MedicinaPage({ onNav }) {
  useSEO(MEDICINA.metaTitle, MEDICINA.metaDesc);
  useReveal();
  return (
    <div className="page">
      <section className="hero-sub">
        <div className="container">
          <I.stetho className="hero-watermark" style={{ display: window.innerWidth > 860 ? 'block' : 'none' }} />
          <div className="hero-text-col">
            <div className="eyebrow">Medicina del Lavoro</div>
            <h1 style={{ marginBottom: 16 }}>Sorveglianza sanitaria coordinata con la sicurezza aziendale</h1>
            <p className="subtitle" style={{ maxWidth: '66ch' }}>{MEDICINA.intro}</p>
          </div>
        </div>
      </section>

      <CTABand title="Ti serve un medico competente?" text="Nomina, protocollo e prime visite organizzate in tempi rapidi, in coerenza con RSPP e DVR." button={MEDICINA.cta} onClick={() => onNav('contatti')} />

      <section className="section band-slate">
        <div className="container container-narrow">
          <PRS problem={MEDICINA.problem} rischio={MEDICINA.rischio} benefit={MEDICINA.benefit} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, marginTop: -40 }}>
        <div className="container">
          <SectionTitle eyebrow="Il servizio" title="Tutto ciò che serve, coordinato." />
          <div className="grid grid-4">
            {MEDICINA.blocks.map((b, i) => (
              <div key={i} className="card reveal" id={({0:'medicina-nomina',2:'medicina-protocollo',5:'medicina-scadenze'})[i]} style={{ padding: 26 }}>
                <div className="card-num" style={{ marginBottom: 14 }}>{String(i + 1).padStart(2, '0')}</div>
                <h4 style={{ fontSize: 16.5, marginBottom: 10 }}>{b.t}</h4>
                <p style={{ fontSize: 14.5, color: 'var(--gray-500)', margin: 0 }}>{b.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow" id="medicina-faq"><FAQ items={MEDICINA.faq} /></div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CERTIFICAZIONI
// ═══════════════════════════════════════════════════════════
function CertificazioniPage({ onNav }) {
  useSEO(CERTIFICAZIONI.metaTitle, CERTIFICAZIONI.metaDesc);
  useReveal();
  return (
    <div className="page">
      <section className="hero-sub">
        <div className="container">
          <I.award className="hero-watermark" style={{ display: window.innerWidth > 860 ? 'block' : 'none' }} />
          <div className="hero-text-col">
            <div className="eyebrow">Certificazioni</div>
            <h1 style={{ marginBottom: 16 }}>Sistemi di gestione che migliorano organizzazione e competitività</h1>
            <p className="subtitle" style={{ maxWidth: '66ch' }}>{CERTIFICAZIONI.intro}</p>
          </div>
        </div>
      </section>

      <CTABand title="Vuoi capire se la certificazione conviene?" text="Analisi iniziale per valutare costi, tempi e benefici concreti per la tua azienda." button={CERTIFICAZIONI.cta} onClick={() => onNav('contatti')} />

      <section className="section band-slate">
        <div className="container container-narrow">
          <PRS problem={CERTIFICAZIONI.problem} rischio={CERTIFICAZIONI.rischio} benefit={CERTIFICAZIONI.benefit} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, marginTop: -40 }}>
        <div className="container">
          <SectionTitle eyebrow="Standard e servizi" title="Le certificazioni che seguiamo." />
          <div className="grid grid-3">
            {CERTIFICAZIONI.items.map((c, i) => (
              <div key={i} className="card reveal" id={'cert-' + c.code.toLowerCase().replace(/[^a-z0-9]+/g, '')}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--red)', marginBottom: 6 }}>{c.code}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gray-400)', marginBottom: 14 }}>{c.title}</div>
                <p style={{ margin: 0, fontSize: 15, color: 'var(--gray-500)' }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container container-narrow" style={{ padding: 0, margin: '0 auto' }}>
          <h3 style={{ marginBottom: 22 }}>Come funziona il percorso</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {CERTIFICAZIONI.path.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)' }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--red-tint)', color: 'var(--red)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 15.5, color: 'var(--gray-700)' }}>{p}</span>
              </div>
            ))}
          </div>
          <FAQ items={CERTIFICAZIONI.faq} />
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { FAQ, PRS, SicurezzaHubPage, SicurezzaDetailPage, FormazioneHubPage, CorsoDetailPage, MedicinaPage, CertificazioniPage });
