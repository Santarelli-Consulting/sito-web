// pages.jsx — Home · Chi siamo · Contatti

const { useState: usePageState } = React;

// ═══════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════
function HomePage({ onNav }) {
  useSEO('Santarelli Consulting — Sicurezza sul Lavoro, Formazione e Assistenza Tecnica',
    'RSPP esterno, DVR, formazione 81/08, medicina del lavoro, antincendio e certificazioni. Santarelli Consulting affianca le imprese in tutta Italia con un unico referente.');
  useReveal();

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero-photo" style={{ '--photo': `url(${window.__resources ? window.__resources.homeHero : "assets/home-hero.jpg"})`, paddingTop: 72, paddingBottom: 64 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 980 }}>
          <h1 style={{ marginBottom: 22, maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Sicurezza sul lavoro, formazione e assistenza tecnica per le imprese
          </h1>
          <p className="lead" style={{ maxWidth: '64ch', margin: '0 auto 34px', fontSize: 20 }}>
            Santarelli Consulting affianca aziende, cantieri, attività commerciali ed enti nella gestione degli obblighi previsti dal D.Lgs. 81/08, con soluzioni concrete, tempi chiari e un unico referente.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ fontSize: 16, padding: '15px 28px' }} onClick={() => onNav('contatti')}>Richiedi un check preliminare <I.arrow width="17" height="17" className="arrow" /></button>
            <button className="btn btn-outline-light" style={{ fontSize: 16, padding: '15px 28px' }} onClick={() => onNav('sicurezza')}>Scopri le aree di intervento</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 36px', marginTop: 52, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,.22)' }}>
            {HOME.stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#fff' }}>{s.n}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', maxWidth: 150 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 72, alignItems: 'center' }}>
          <div className="reveal">
            <div className="eyebrow">Il nostro approccio</div>
            <h2 style={{ marginBottom: 22 }}>La sicurezza deve funzionare anche nella realtà.</h2>
          </div>
          <div className="reveal">
            <p className="lead">
              Documenti, formazione e procedure sono utili solo quando rispecchiano realmente il modo in cui l’azienda lavora. Partiamo dall’organizzazione, dagli ambienti, dalle attrezzature e dalle persone.
            </p>
            <p style={{ color: 'var(--gray-500)' }}>
              Individuiamo le criticità, definiamo le priorità e costruiamo interventi applicabili, evitando adempimenti inutili e soluzioni standard.
            </p>
          </div>
        </div>
      </section>

      {/* 4 AREE */}
      <section className="section bg-light">
        <div className="container">
          <SectionTitle eyebrow="Aree principali" title="Quattro aree, un unico riferimento." intro="Ogni area risolve un bisogno preciso e resta coordinata con le altre." />
          <div className="grid grid-4">
            {HOME.areas.map((a, i) => (
              <article key={i} className="card reveal" style={{ cursor: 'pointer' }} onClick={() => onNav(a.target)}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22 }}>
                  <div className="idx">0{i + 1}</div>
                  <div style={{ width: 26, height: 2, background: 'var(--gray-200)' }} />
                </div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <span className="link-arrow" style={{ fontSize: 14 }}>Scopri di più <I.arrow width="14" height="14" className="arrow" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOVALUTAZIONE — spostata subito dopo le aree, per non farla scoprire solo a fine scroll */}
      <section className="section" id="autovalutazione">
        <div className="container">
          <div style={{ maxWidth: 640, margin: '0 auto 36px', textAlign: 'center' }}>
            <div className="pill" style={{ marginBottom: 18 }}>1 minuto, nessun dato richiesto</div>
            <h2 style={{ marginBottom: 10 }}>Scopri subito il livello di conformità della tua azienda</h2>
            <p style={{ color: 'var(--gray-500)', margin: '0 auto', maxWidth: '52ch' }}>Rispondi a 6 domande rapide e ottieni un punteggio immediato, con le aree da verificare.</p>
          </div>
          <AutoCheck onNav={onNav} />
        </div>
      </section>

      {/* METODO */}
      <section className="section bg-light">
        <div className="container">
          <SectionTitle eyebrow="Metodo di lavoro" title="Cinque fasi, nessuna sorpresa." intro="Un percorso lineare, dallo studio della situazione reale all’assistenza nel tempo." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, position: 'relative' }} className="method-row">
            {HOME.method.map((m, i) => (
              <div key={i} className="reveal" style={{ padding: '0 22px 0 0', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--red)', color: 'var(--red)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, flexShrink: 0, background: '#fff' }}>{m.n}</div>
                  {i < HOME.method.length - 1 && <div style={{ height: 2, background: 'var(--gray-200)', flex: 1 }} className="method-line" />}
                </div>
                <h4 style={{ fontSize: 17, marginBottom: 8 }}>{m.t}</h4>
                <p style={{ fontSize: 14.5, color: 'var(--gray-500)', margin: 0 }}>{m.b}</p>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 900px){ .method-row{ grid-template-columns: 1fr 1fr !important; gap: 32px 16px !important;} .method-line{ display:none !important;} }
            @media (max-width: 520px){ .method-row{ grid-template-columns: 1fr !important;} }`}</style>
        </div>
      </section>

      {/* PUNTI DI FORZA */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Punti di forza" title="Perché le imprese ci scelgono" />
          <div className="grid grid-4">
            {HOME.strengths.map((s, i) => (
              <div key={i} className="card reveal" style={{ padding: 26 }}>
                <div className="idx" style={{ fontSize: 24, marginBottom: 14 }}>{String(i + 1).padStart(2, '0')}</div>
                <h4 style={{ fontSize: 16.5, marginBottom: 8 }}>{s.t}</h4>
                <p style={{ fontSize: 14.5, color: 'var(--gray-500)', margin: 0 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SETTORI */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Settori serviti" title="Conosciamo il tuo settore." intro="Esperienza diretta in contesti diversi, dall’industria agli eventi." />
          <div className="grid grid-4">
            {HOME.sectors.map((s, i) => (
              <div key={i} className="card reveal" style={{ padding: 22, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <div className="idx" style={{ fontSize: 20, marginBottom: 0 }}>{String(i + 1).padStart(2, '0')}</div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALORI CHIAVE */}
      <section className="section band-slate">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid rgba(255,255,255,.14)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }} className="values-strip">
            {[
              { t: 'Un unico referente', s: 'Dall’analisi all’assistenza nel tempo, sempre la stessa persona.' },
              { t: 'Sette aree di intervento', s: 'Sicurezza, formazione, medicina del lavoro, antincendio, cantieri, certificazioni ed eventi.' },
              { t: 'Adempimenti D.Lgs. 81/08', s: 'Obblighi e scadenze gestiti secondo il Testo Unico sulla sicurezza.' },
              { t: 'Operativi in tutta Italia', s: 'Con presenza consolidata in Lombardia, Lazio e Abruzzo.' },
            ].map((v, i) => (
              <div key={i} className="reveal" style={{ padding: '32px 28px', borderRight: i < 3 ? '1px solid rgba(255,255,255,.14)' : 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 34, height: 3, background: 'var(--red)', borderRadius: 3 }} />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#fff' }}>{v.t}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.68)', margin: 0 }}>{v.s}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){ .values-strip{ grid-template-columns:1fr 1fr !important;} .values-strip>div{ border-right:none !important; border-bottom:1px solid rgba(255,255,255,.14);} }
          @media(max-width:520px){ .values-strip{ grid-template-columns:1fr !important;} }`}</style>
      </section>

      {/* TESTIMONIANZE */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Dicono di noi" title="Il valore si vede sul campo." intro="Testimonianze in fase di raccolta." />
          <div className="grid grid-3">
            {HOME.testimonials.map((t, i) => (
              <figure key={i} className="card reveal" style={{ margin: 0 }}>
                <div style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, lineHeight: .6, marginBottom: 16 }}>&ldquo;</div>
                <blockquote style={{ margin: 0, flexGrow: 1 }}><p style={{ color: 'var(--gray-700)', fontSize: 16 }}>{t.q}</p></blockquote>
                <figcaption style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--gray-200)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5, color: 'var(--ink)' }}>{t.a}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--gray-500)' }}>{t.place}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNET — secondario rispetto al quiz sopra */}
      <section className="section bg-light" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <LeadMagnet onNav={onNav} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-light">
        <div className="container container-narrow">
          <SectionTitle eyebrow="Domande frequenti" title="Le risposte alle domande più comuni" />
          <FAQ items={FAQ_GENERAL} title="" />
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CHI SIAMO
// ═══════════════════════════════════════════════════════════
function ChiSiamoPage({ onNav }) {
  useSEO('Chi siamo — Santarelli Consulting', 'Competenza costruita sul campo: RSPP e formatrice qualificata, un referente diretto e una rete di professionisti per la sicurezza aziendale.');
  useReveal();
  const metodo = ['Ascolto', 'Sopralluogo', 'Analisi', 'Piano operativo', 'Intervento', 'Assistenza nel tempo'];
  return (
    <div className="page">
      <section className="hero-sub">
        <div className="container">
          <I.user className="hero-watermark" style={{ display: window.innerWidth > 860 ? 'block' : 'none' }} />
          <div className="hero-text-col">
            <div className="eyebrow">Chi siamo</div>
            <h1 style={{ marginBottom: 16 }}>Competenza costruita sul campo</h1>
            <p className="subtitle" style={{ maxWidth: '64ch' }}>
              Un approccio concreto alla sicurezza sul lavoro, alla formazione e alle attività operative di emergenza.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="chi-visione">
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>La nostra visione</div>
          <h2 style={{ marginBottom: 18, maxWidth: '22ch', margin: '0 auto 18px' }}>La sicurezza funziona solo se è utile a chi lavora ogni giorno.</h2>
          <p className="lead" style={{ color: 'var(--gray-500)', maxWidth: '62ch', margin: '0 auto' }}>
            Non ci interessano documenti fatti per essere archiviati: vogliamo che RSPP, formazione e medicina del lavoro diventino strumenti concreti, capiti e usati da chi è davvero in azienda o in cantiere ogni giorno.
          </p>
        </div>
      </section>

      <CTABand title="Parlaci della tua azienda." text="Raccontaci attività e obiettivi: definiamo insieme il percorso più adatto." button="Parlaci della tua azienda" onClick={() => onNav('contatti')} />

      <section className="section">
        <div className="container container-narrow">
          <p className="lead" style={{ marginBottom: 18 }}>
            Santarelli Consulting nasce dall’esperienza maturata nella gestione della sicurezza sul lavoro, nella formazione e nelle attività operative di emergenza. Seguiamo aziende, cantieri, attività commerciali ed enti con un approccio concreto, basato sull’analisi della situazione reale e sulla capacità di trasformare gli obblighi normativi in attività gestibili.
          </p>
          <p style={{ color: 'var(--gray-500)' }}>
            Ogni cliente ha un referente diretto, affiancato quando necessario da una rete di professionisti specializzati.
          </p>
        </div>
      </section>

      {/* REFERENTE — informazione, non ritratto */}
      <section className="section bg-light" id="chi-referente">
        <div className="container container-narrow">
          <div className="eyebrow">Il referente</div>
          <h2 style={{ marginBottom: 18 }}>Un’unica persona qualificata segue la tua azienda.</h2>
          <p className="lead" style={{ color: 'var(--gray-500)' }}>
            RSPP e formatrice, con esperienza in logistica, industria, cantieri, commercio, ristorazione, formazione professionale, eventi e Protezione Civile. L’esperienza maturata sul campo permette di affrontare la sicurezza non soltanto dal punto di vista documentale, ma anche operativo.
          </p>
        </div>
      </section>

      {/* RETE DI PROFESSIONISTI */}
      <section className="section" id="chi-rete">
        <div className="container">
          <SectionTitle eyebrow="La rete" title="Una squadra di professionisti coordinata" intro="Ogni azienda ha un unico referente, affiancato — quando serve — da specialisti qualificati in aree complementari." />
          <div className="grid grid-3">
            {NETWORK.map((n, i) => (
              <div key={i} className="card reveal">
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 12 }}>{n.area}</div>
                <h4 style={{ fontSize: 17, marginBottom: 10 }}>{n.role}</h4>
                <p style={{ fontSize: 14.5, color: 'var(--gray-500)', margin: 0 }}>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI-TEST STRESS */}
      <section className="section bg-light">
        <div className="container">
          <StressTest onNav={onNav} />
        </div>
      </section>

      {/* METODO */}
      <section className="section" id="chi-metodo">
        <div className="container">
          <SectionTitle eyebrow="Il nostro metodo" title="Dall’ascolto all’assistenza nel tempo." />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            {metodo.map((m, i) => (
              <React.Fragment key={m}>
                <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 22px', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 100 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--red)', fontSize: 13 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{m}</span>
                </div>
                {i < metodo.length - 1 && <I.arrow width="18" height="18" style={{ color: 'var(--gray-400)' }} className="metodo-arrow" />}
              </React.Fragment>
            ))}
          </div>
          <style>{`@media(max-width:720px){ .metodo-arrow{ display:none;} }`}</style>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <SectionTitle eyebrow="Domande frequenti" title="Le risposte alle domande più comuni" />
          <FAQ items={FAQ_GENERAL} title="" />
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTATTI
// ═══════════════════════════════════════════════════════════
function ContattiPage() {
  useSEO('Contatti — Santarelli Consulting', 'Contatta Santarelli Consulting: telefono, email e WhatsApp. Richiedi un check preliminare per la sicurezza della tua azienda.');
  const [form, setForm] = usePageState({ nome: '', azienda: '', email: '', telefono: '', citta: '', servizio: '', messaggio: '', privacy: false });
  const [submitted, setSubmitted] = usePageState(false);
  const [errors, setErrors] = usePageState({});

  const onChange = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: v });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };
  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.nome.trim()) err.nome = 'Inserisci nome e cognome';
    if (!form.email.trim()) err.email = 'Inserisci una email';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Email non valida';
    if (!form.telefono.trim()) err.telefono = 'Inserisci un telefono';
    if (!form.messaggio.trim()) err.messaggio = 'Scrivici qualcosa';
    if (!form.privacy) err.privacy = 'È necessario il consenso';
    if (Object.keys(err).length) { setErrors(err); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <section className="hero-sub" style={{ minHeight: '68vh', display: 'flex', alignItems: 'center' }}>
          <div className="container text-center" style={{ maxWidth: 620 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--red-tint)', color: 'var(--red)', display: 'grid', placeItems: 'center', margin: '0 auto 24px' }}><I.check width="34" height="34" /></div>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Richiesta inviata</div>
            <h1 style={{ marginBottom: 16 }}>Grazie, {form.nome.split(' ')[0]}.</h1>
            <p className="lead" style={{ color: 'var(--gray-500)' }}>Ti ricontatteremo per raccogliere le informazioni necessarie e definire il percorso più adatto alla tua azienda.</p>
            <button onClick={() => { setSubmitted(false); setForm({ nome: '', azienda: '', email: '', telefono: '', citta: '', servizio: '', messaggio: '', privacy: false }); }} className="btn btn-outline" style={{ marginTop: 8 }}>Invia un’altra richiesta</button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="hero-sub">
        <div className="container">
          <div className="eyebrow">Contatti</div>
          <h1 style={{ marginBottom: 16 }}>Parliamo della tua azienda</h1>
          <p className="subtitle" style={{ maxWidth: '64ch' }}>
            Descrivi brevemente l’attività, il numero di lavoratori e il servizio di cui hai bisogno. Ti ricontatteremo per definire il percorso più adatto.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'start' }}>
          <form onSubmit={submit} noValidate>
            <div className="grid grid-2" style={{ gap: '0 24px' }}>
              <Field label="Nome e cognome" req error={errors.nome}><input type="text" value={form.nome} onChange={onChange('nome')} placeholder="Mario Rossi" /></Field>
              <Field label="Azienda"><input type="text" value={form.azienda} onChange={onChange('azienda')} placeholder="Ragione sociale" /></Field>
              <Field label="Email" req error={errors.email}><input type="email" value={form.email} onChange={onChange('email')} placeholder="mario@esempio.it" /></Field>
              <Field label="Telefono" req error={errors.telefono}><input type="tel" value={form.telefono} onChange={onChange('telefono')} placeholder="+39 ..." /></Field>
              <Field label="Città"><input type="text" value={form.citta} onChange={onChange('citta')} placeholder="Es. Milano" /></Field>
              <Field label="Servizio richiesto">
                <select value={form.servizio} onChange={onChange('servizio')}>
                  <option value="">Seleziona…</option>
                  <option>Sicurezza sul Lavoro / RSPP</option>
                  <option>Formazione</option>
                  <option>Medicina del Lavoro</option>
                  <option>Antincendio</option>
                  <option>Sicurezza Cantieri</option>
                  <option>Certificazioni</option>
                  <option>Altro</option>
                </select>
              </Field>
            </div>
            <Field label="Messaggio" req error={errors.messaggio}><textarea value={form.messaggio} onChange={onChange('messaggio')} placeholder="Attività, numero di lavoratori, esigenza…" /></Field>
            <div className="checkbox-row" style={{ marginBottom: 24 }}>
              <input type="checkbox" id="privacy" checked={form.privacy} onChange={onChange('privacy')} />
              <label htmlFor="privacy" style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, color: errors.privacy ? 'var(--red)' : 'var(--gray-500)' }}>
                Ho letto e accetto la <a href="#">Privacy Policy</a> e acconsento al trattamento dei dati. <span style={{ color: 'var(--red)' }}>*</span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ fontSize: 16, padding: '15px 30px' }}>Invia la richiesta <I.arrow width="17" height="17" className="arrow" /></button>
          </form>

          <aside>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
              <h3 style={{ marginBottom: 22 }}>Contatti diretti</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <ContactLink icon="phone" label="Telefono" value={CONTACTS.phone} href={CONTACTS.phoneHref} />
                <ContactLink icon="mail" label="Email" value={CONTACTS.email} href={'mailto:' + CONTACTS.email} />
                <ContactLink icon="whatsapp" label="WhatsApp" value="Scrivici un messaggio" href={CONTACTS.whatsappHref} blank />
              </div>
              <hr className="rule" />
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--red)', marginTop: 2 }}><I.map width="20" height="20" /></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gray-400)', marginBottom: 4 }}>Operatività</div>
                  <div style={{ fontSize: 15, color: 'var(--gray-700)' }}>{CONTACTS.areasLong}</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: '18px 22px', background: 'var(--red-tint)', borderRadius: 'var(--radius)', fontSize: 14.5, color: 'var(--gray-700)' }}>
              <strong>Risposta rapida:</strong> per le urgenze il telefono è la via più veloce; per richieste articolate scrivici via email o WhatsApp.
            </div>
          </aside>
        </div>
        <style>{`@media(max-width:900px){ .contact-grid{ grid-template-columns:1fr !important; gap:40px !important;} }`}</style>
      </section>
    </div>
  );
}

function ContactLink({ icon, label, value, href, blank }) {
  return (
    <a href={href} {...(blank ? { target: '_blank', rel: 'noopener' } : {})} style={{ display: 'flex', gap: 13, alignItems: 'center', color: 'inherit' }}>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--red-tint)', color: 'var(--red)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{React.createElement(I[icon], { width: 19, height: 19 })}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gray-400)' }}>{label}</div>
        <div style={{ fontSize: 15.5, color: 'var(--ink)', fontWeight: 500, wordBreak: 'break-word' }}>{value}</div>
      </div>
    </a>
  );
}

function Field({ label, req, error, children }) {
  return (
    <div className="field">
      <label>{label}{req && <span className="req"> *</span>}</label>
      {React.cloneElement(children, { style: { ...(children.props.style || {}), borderColor: error ? 'var(--red)' : undefined } })}
      {error && <span style={{ fontSize: 13, color: 'var(--red)' }}>{error}</span>}
    </div>
  );
}

Object.assign(window, { HomePage, ChiSiamoPage, ContattiPage, Field });
