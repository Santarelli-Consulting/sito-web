// components.jsx — Santarelli Consulting · componenti condivisi

const { useState, useEffect, useRef } = React;

// ─── SEO helper: aggiorna <title> e meta description ──────
function useSEO(title, desc, path) {
  useEffect(() => {
    if (title) document.title = title;
    if (desc) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
      m.setAttribute('content', desc);
    }
    let c = document.querySelector('link[rel="canonical"]');
    if (!c) { c = document.createElement('link'); c.setAttribute('rel', 'canonical'); document.head.appendChild(c); }
    c.setAttribute('href', 'https://www.santarelliconsulting.it' + (path ? '/' + path : window.location.pathname));
  }, [title, desc, path]);
}

function toHref(id, anchor) { return '/' + (id === 'home' ? '' : id) + (anchor ? '#' + anchor : ''); }

// ─── Logo ─────────────────────────────────────────────────
function Logo({ inverted = false, height = 46 }) {
  return (
    <img
      src={window.__resources ? window.__resources.logo : "assets/logo-horizontal.png"}
      alt="Santarelli Consulting — Safety & Risk Management"
      style={{ height, width: 'auto', display: 'block', filter: inverted ? 'brightness(0) invert(1)' : 'none' }}
    />
  );
}

// ─── Photo placeholder (neutro, premium) ──────────────────
function Photo({ label, height, full = false, dark = false, style }) {
  return (
    <div className="photo" style={{ width: '100%', height: full ? '100%' : (height || 320), ...(style || {}) }}>
      {dark && <div className="photo-overlay" />}
      <span className="photo-label" style={{ zIndex: 2 }}>
        <I.camera width="14" height="14" /> {label}
      </span>
    </div>
  );
}

// ─── Icone lineari ────────────────────────────────────────
const svg = (paths) => (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>{paths}</svg>
);
const I = {
  shield: svg(<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /></>),
  doc: svg(<><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 12h6M9 16h6" /></>),
  gauge: svg(<><path d="M4 15a8 8 0 1 1 16 0" /><path d="M12 15l4-4" /><path d="M2 19h20" /></>),
  flame: svg(<><path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-5 .5 1.5 1.5 2 2 2-.5-2 0-4.5 1-6z" /></>),
  alert: svg(<><path d="M12 4 3 20h18z" /><path d="M12 10v5M12 18h.01" /></>),
  crane: svg(<><path d="M4 20V6h12" /><path d="M4 6h16l-3 4H4" /><path d="M9 20v-6h4v6" /></>),
  clipboard: svg(<><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="M9 10h6M9 14h4" /></>),
  speaker: svg(<><path d="M3 10v4l5 4V6z" /><path d="M14 8a5 5 0 0 1 0 8" /><path d="M17 5a9 9 0 0 1 0 14" /></>),
  tent: svg(<><path d="M3 20 12 4l9 16" /><path d="M12 4v16" /><path d="M8 20l4-6 4 6" /></>),
  badge: svg(<><circle cx="12" cy="9" r="5" /><path d="M9 13l-2 8 5-3 5 3-2-8" /></>),
  stetho: svg(<><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M5 3h2M13 3h2" /><path d="M10 13v3a4 4 0 0 0 8 0v-2" /><circle cx="18" cy="11" r="2" /></>),
  award: svg(<><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /><path d="M12 6v3l2 1" /></>),
  user: svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  users: svg(<><circle cx="9" cy="8" r="3.5" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5a3.5 3.5 0 0 1 0 7" /><path d="M17 14a6 6 0 0 1 4 6" /></>),
  helmet: svg(<><path d="M3 17h18v2H3z" /><path d="M5 17a7 7 0 0 1 14 0" /><path d="M12 6v4M9 10h6" /></>),
  network: svg(<><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v4M12 11 5.5 17M12 11l6.5 6" /></>),
  map: svg(<><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></>),
  clock: svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  bolt: svg(<><path d="M13 3 4 14h6l-1 7 9-11h-6z" /></>),
  check: svg(<><path d="M5 12l4 4L19 7" /></>),
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  phone: svg(<><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l2 5v4a1 1 0 0 1-1 1A17 17 0 0 1 4 6a1 1 0 0 1 1-2z" /></>),
  mail: svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  whatsapp: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z" /></svg>),
  camera: svg(<><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-2h5L16 7" /></>),
  menu: svg(<><path d="M4 7h16M4 12h16M4 17h16" /></>),
  close: svg(<><path d="M6 6l12 12M18 6 6 18" /></>),
};

// ─── Navigazione ──────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'chi-siamo', label: 'Chi siamo' },
  { id: 'sicurezza', label: 'Sicurezza sul Lavoro' },
  { id: 'antincendio', label: 'Antincendio' },
  { id: 'formazione', label: 'Formazione' },
  { id: 'medicina', label: 'Medicina del Lavoro' },
  { id: 'certificazioni', label: 'Certificazioni' },
  { id: 'contatti', label: 'Contatti' },
];

const SICUREZZA_GROUPS = [
  { heading: 'Adempimenti e documenti', slugs: ['rspp-esterno', 'dvr', 'duvri', 'valutazioni-rischi'] },
  { heading: 'Cantieri, eventi e territorio', slugs: ['sicurezza-cantieri', 'eventi', 'protezione-civile'] },
  { heading: 'Emergenze e controlli', slugs: ['piani-emergenza', 'assistenza-ispezioni'] },
];
const bySlug = (s) => SICUREZZA.find(x => x.slug === s);

const NAV_MEGA = {
  'chi-siamo': {
    groups: [{
      heading: null,
      items: [
        { label: 'La nostra visione', id: 'chi-siamo', anchor: 'chi-visione' },
        { label: 'Il referente', id: 'chi-siamo', anchor: 'chi-referente' },
        { label: 'La rete di professionisti', id: 'chi-siamo', anchor: 'chi-rete' },
        { label: 'Il nostro metodo', id: 'chi-siamo', anchor: 'chi-metodo' },
      ],
    }],
  },
  sicurezza: {
    groups: SICUREZZA_GROUPS.map(g => ({
      heading: g.heading,
      items: g.slugs.map(s => ({ label: bySlug(s).title, id: 'sicurezza/' + s })),
    })),
  },
  formazione: {
    groups: [{
      heading: null,
      items: FORMAZIONE_CATS.map(cat => ({ label: cat.title, id: 'formazione/' + cat.courses[0] })),
    }],
  },
  antincendio: {
    groups: [{
      heading: null,
      items: [
        { label: 'Valutazione del rischio incendio', id: 'antincendio', anchor: 'antincendio-problema' },
        { label: 'Piani ed emergenze', id: 'antincendio', anchor: 'antincendio-servizio' },
        { label: 'Domande frequenti', id: 'antincendio', anchor: 'antincendio-faq' },
      ],
    }],
  },
  medicina: {
    groups: [{
      heading: null,
      items: [
        { label: 'Nomina e sopralluogo', id: 'medicina', anchor: 'medicina-nomina' },
        { label: 'Protocollo e visite mediche', id: 'medicina', anchor: 'medicina-protocollo' },
        { label: 'Scadenze e idoneità', id: 'medicina', anchor: 'medicina-scadenze' },
        { label: 'Domande frequenti', id: 'medicina', anchor: 'medicina-faq' },
      ],
    }],
  },
  certificazioni: {
    groups: [{
      heading: null,
      items: CERTIFICAZIONI.items.map(c => ({ label: c.code + ' — ' + c.title, id: 'certificazioni', anchor: 'cert-' + c.code.toLowerCase().replace(/[^a-z0-9]+/g, '') })),
    }],
  },
};

function scrollToAnchor(anchor) {
  setTimeout(() => {
    const el = document.getElementById(anchor);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  }, 260);
}

function NavDropdown({ it, isActive, go }) {
  const [hover, setHover] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const mega = NAV_MEGA[it.id];
  const linkStyle = {
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5,
    color: isActive(it.id) ? 'var(--red)' : 'var(--gray-900)',
    paddingBottom: 3, borderBottom: '2px solid ' + (isActive(it.id) ? 'var(--red)' : 'transparent'),
    transition: 'color .15s, border-color .15s', whiteSpace: 'nowrap',
  };
  if (!mega) return <a href={toHref(it.id)} onClick={(e) => { e.preventDefault(); go(it.id); }} style={linkStyle}>{it.label}</a>;
  const twoLevel = mega.groups.length > 1;
  return (
    <div style={{ position: 'relative' }} onMouseEnter={() => { setHover(true); setActiveGroup(0); }} onMouseLeave={() => setHover(false)}>
      <a href={toHref(it.id)} onClick={(e) => { e.preventDefault(); go(it.id); }} style={linkStyle}>{it.label}</a>
      {hover && twoLevel && (
        <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 17, zIndex: 70 }}>
          <div style={{
            background: '#fff', border: '1px solid var(--gray-200)', boxShadow: '0 18px 44px rgba(0,0,0,.12)',
            borderRadius: 10, display: 'flex', minWidth: 460,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 8px', borderRight: '1px solid var(--gray-100)', minWidth: 210 }}>
              {mega.groups.map((g, gi) => (
                <div key={gi} onMouseEnter={() => setActiveGroup(gi)}
                     style={{
                       fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)', padding: '11px 14px', borderRadius: 8, cursor: 'default',
                       color: activeGroup === gi ? 'var(--red)' : 'var(--gray-900)', background: activeGroup === gi ? 'var(--gray-50)' : 'transparent',
                       display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                     }}>
                  {g.heading}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 6l6 6-6 6" /></svg>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 1, minWidth: 230 }}>
              {mega.groups[activeGroup].items.map((sub, si) => (
                <a key={si} href={toHref(sub.id, sub.anchor)} onClick={(e) => { e.preventDefault(); go(sub.id, sub.anchor); }}
                   className="dd-link" style={{ fontSize: 14, padding: '7px 0', color: (isActive(sub.id) && !sub.anchor) ? 'var(--red)' : 'var(--gray-800)', whiteSpace: 'nowrap' }}>{sub.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}
      {hover && !twoLevel && (
        <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 17, zIndex: 70 }}>
          <div style={{
            background: '#fff', border: '1px solid var(--gray-200)', boxShadow: '0 18px 44px rgba(0,0,0,.12)',
            borderRadius: 10, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 260,
          }}>
            {mega.groups.map((g, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {g.heading && <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-500)', fontWeight: 700, margin: '2px 0 6px' }}>{g.heading}</div>}
                {g.items.map((sub, si) => (
                  <a key={si} href={toHref(sub.id, sub.anchor)} onClick={(e) => { e.preventDefault(); go(sub.id, sub.anchor); }}
                     className="dd-link" style={{ fontSize: 14, padding: '7px 0', color: (isActive(sub.id) && !sub.anchor) ? 'var(--red)' : 'var(--gray-800)', whiteSpace: 'nowrap' }}>{sub.label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Nav({ current, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  const isActive = (id) => current === id || current.startsWith(id + '/');
  const go = (id, anchor) => { onNav(id); setOpen(false); setMobileSub(null); if (anchor) scrollToAnchor(anchor); };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      background: 'rgba(255,255,255,.94)',
      backdropFilter: 'blur(12px) saturate(150%)', WebkitBackdropFilter: 'blur(12px) saturate(150%)',
      borderBottom: '1px solid ' + (scrolled ? 'var(--gray-200)' : 'transparent'),
      transition: 'border-color .2s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 74 }}>
        <a href={toHref('home')} onClick={(e) => { e.preventDefault(); go('home'); }} aria-label="Santarelli Consulting"><Logo height={44} /></a>

        <nav className="nav-desk" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {NAV_ITEMS.slice(1, -1).map(it => (
            <NavDropdown key={it.id} it={it} isActive={isActive} go={go} />
          ))}
          <a href={toHref('contatti')} onClick={(e) => { e.preventDefault(); go('contatti'); }} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
            <I.phone width="15" height="15" /> Contattaci
          </a>
        </nav>

        <button className="nav-burger" onClick={() => setOpen(v => !v)} aria-label="Menu"
          style={{ display: 'none', background: 'transparent', border: 0, padding: 6, cursor: 'pointer', color: 'var(--ink)' }}>
          {open ? <I.close width="26" height="26" /> : <I.menu width="26" height="26" />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile" style={{ borderTop: '1px solid var(--gray-200)', padding: '12px var(--gutter) 22px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          {NAV_ITEMS.map(it => {
            const mega = NAV_MEGA[it.id];
            const subOpen = mobileSub === it.id;
            return (
              <div key={it.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <a href={toHref(it.id)} onClick={(e) => { e.preventDefault(); go(it.id); }}
                     style={{ padding: '13px 4px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, flex: 1,
                       color: isActive(it.id) ? 'var(--red)' : 'var(--gray-900)' }}>{it.label}</a>
                  {mega && (
                    <button onClick={() => setMobileSub(subOpen ? null : it.id)} aria-label="Espandi"
                      style={{ background: 'transparent', border: 0, padding: 10, cursor: 'pointer', color: 'var(--gray-600)', transform: subOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                  )}
                </div>
                {mega && subOpen && (
                  <div style={{ padding: '2px 4px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {mega.groups.map((c, i) => (
                      <div key={i}>
                        {c.heading && <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-500)', fontWeight: 700, margin: '2px 0 6px' }}>{c.heading}</div>}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {c.items.map((sub, si) => (
                            <a key={si} href={toHref(sub.id, sub.anchor)} onClick={(e) => { e.preventDefault(); go(sub.id, sub.anchor); }}
                               style={{ padding: '7px 0', fontSize: 14.5, color: (isActive(sub.id) && !sub.anchor) ? 'var(--red)' : 'var(--gray-700)' }}>{sub.label}</a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a href={toHref('contatti')} onClick={(e) => { e.preventDefault(); go('contatti'); }} className="btn btn-primary" style={{ marginTop: 16 }}>Contattaci</a>
        </div>
      )}

      <style>{`
        @media (max-width: 1080px) {
          .nav-desk { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

// ─── WhatsApp floating ────────────────────────────────────
function WhatsFab() {
  return (
    <a href={CONTACTS.whatsappHref} target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp"
      style={{
        position: 'fixed', right: 22, bottom: 22, zIndex: 55,
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366', color: '#fff', display: 'grid', placeItems: 'center',
        boxShadow: '0 8px 24px rgba(37,211,102,.4)', transition: 'transform .2s var(--ease)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <I.whatsapp width="30" height="30" />
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────
function Footer({ onNav }) {
  const cols = [
    { h: 'Servizi', items: [['Sicurezza sul Lavoro', 'sicurezza'], ['Formazione', 'formazione'], ['Medicina del Lavoro', 'medicina'], ['Certificazioni', 'certificazioni']] },
    { h: 'Studio', items: [['Chi siamo', 'chi-siamo'], ['Contatti', 'contatti'], ['RSPP Esterno', 'sicurezza/rspp-esterno'], ['Antincendio', 'antincendio']] },
  ];
  return (
    <footer className="bg-ink" style={{ paddingTop: 72, paddingBottom: 28 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr', gap: 44 }} className="footer-grid">
          <div>
            <Logo inverted height={52} />
            <p style={{ marginTop: 22, color: 'rgba(255,255,255,.6)', fontSize: 15, maxWidth: '34ch' }}>
              Studio tecnico per la sicurezza sul lavoro, la formazione e gli adempimenti del D.Lgs. 81/08. Un unico referente per l’azienda.
            </p>
          </div>
          {cols.map((c, i) => (
            <div key={i}>
              <h4 style={{ color: '#fff', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>{c.h}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map(([label, id]) => (
                  <li key={id}><a href={toHref(id)} onClick={(e) => { e.preventDefault(); onNav(id); }} style={{ color: 'rgba(255,255,255,.68)', fontSize: 14.5 }}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 style={{ color: '#fff', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Contatti</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14.5 }}>
              <li><a href={CONTACTS.phoneHref} style={{ color: 'rgba(255,255,255,.85)', display: 'inline-flex', gap: 9, alignItems: 'center' }}><I.phone width="16" height="16" /> {CONTACTS.phone}</a></li>
              <li><a href={'mailto:' + CONTACTS.email} style={{ color: 'rgba(255,255,255,.85)', display: 'inline-flex', gap: 9, alignItems: 'center', wordBreak: 'break-all' }}><I.mail width="16" height="16" /> {CONTACTS.email}</a></li>
              <li><a href={CONTACTS.whatsappHref} target="_blank" rel="noopener" style={{ color: 'rgba(255,255,255,.85)', display: 'inline-flex', gap: 9, alignItems: 'center' }}><I.whatsapp width="16" height="16" /> WhatsApp</a></li>
              <li style={{ color: 'rgba(255,255,255,.5)', marginTop: 4, display: 'flex', gap: 9, alignItems: 'flex-start' }}><I.map width="16" height="16" style={{ marginTop: 2, flexShrink: 0 }} /> {CONTACTS.areasLong}</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 52, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'rgba(255,255,255,.45)' }}>
          <div>© 2026 Santarelli Consulting · P.IVA {CONTACTS.piva}</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: 'rgba(255,255,255,.6)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,.6)' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}

// ─── Helper di sezione ────────────────────────────────────
const stripDot = (s) => (typeof s === 'string' ? s.replace(/\.$/, '') : s);
function SectionTitle({ eyebrow, title, intro, center, light }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 48, maxWidth: center ? 760 : '100%', margin: center ? '0 auto 48px' : '0 0 48px' }}>
      {eyebrow && <div className="eyebrow" style={center ? { justifyContent: 'center' } : null}>{eyebrow}</div>}
      <h2 className="section-title" style={light ? { color: '#fff' } : null}>{stripDot(title)}</h2>
      {intro && <p className="section-intro" style={{ ...(center ? { marginLeft: 'auto', marginRight: 'auto' } : {}), ...(light ? { color: 'rgba(255,255,255,.7)' } : {}) }}>{intro}</p>}
    </div>
  );
}

function CheckList({ items, columns = 1 }) {
  return (
    <ul className="check-list" style={{ gridTemplateColumns: columns === 2 ? 'repeat(2, minmax(0,1fr))' : '1fr', gap: '13px 34px' }}>
      {items.map((it, i) => (
        <li key={i}><I.check width="19" height="19" /><span>{it}</span></li>
      ))}
    </ul>
  );
}

function CTABand({ eyebrow, title, text, button = 'Richiedi informazioni', onClick }) {
  return (
    <section className="cta-band" style={{ padding: '76px 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% 15%, rgba(200,16,46,.5), transparent 42%), radial-gradient(circle at 92% 85%, rgba(255,255,255,.1), transparent 45%)' }} />
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 36, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 680 }}>
          {eyebrow && <div className="eyebrow" style={{ color: '#fff' }}>{eyebrow}</div>}
          <h2 style={{ color: '#fff', marginBottom: text ? 14 : 0 }}>{stripDot(title)}</h2>
          {text && <p style={{ color: 'rgba(255,255,255,.75)', margin: 0, fontSize: 17 }}>{text}</p>}
        </div>
        <button onClick={onClick} className="btn" style={{ fontSize: 16, padding: '16px 30px', background: '#fff', color: 'var(--ink)', borderColor: '#fff' }}>{button} <I.arrow width="17" height="17" className="arrow" /></button>
      </div>
    </section>
  );
}

// Scroll-reveal hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

Object.assign(window, { useSEO, Logo, Photo, I, Nav, WhatsFab, Footer, SectionTitle, CheckList, CTABand, useReveal, NAV_ITEMS, stripDot, toHref });
