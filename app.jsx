// app.jsx — Santarelli Consulting · shell + routing

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "radius": 10,
  "density": "comoda"
}/*EDITMODE-END*/;

const TOP_PAGES = ['home', 'chi-siamo', 'sicurezza', 'antincendio', 'formazione', 'medicina', 'certificazioni', 'contatti'];

function getPageFromLocation() {
  const p = decodeURIComponent(window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, ''));
  if (!p) return 'home';
  if (p.startsWith('sicurezza/') || p.startsWith('formazione/') || TOP_PAGES.includes(p)) return p;
  return 'home';
}

function App() {
  const [page, setPage] = React.useState(getPageFromLocation());
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const onPop = () => setPage(getPageFromLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  React.useEffect(() => {
    if (window.location.hash) scrollToAnchor(window.location.hash.slice(1));
  }, [page]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--radius', t.radius + 'px');
    document.documentElement.style.setProperty('--radius-lg', (t.radius + 6) + 'px');
  }, [t.radius]);

  const goTo = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'auto' });
    history.pushState(null, '', '/' + (id === 'home' ? '' : id));
  };

  let body;
  if (page === 'home') body = <HomePage onNav={goTo} />;
  else if (page === 'chi-siamo') body = <ChiSiamoPage onNav={goTo} />;
  else if (page === 'sicurezza') body = <SicurezzaHubPage onNav={goTo} />;
  else if (page.startsWith('sicurezza/')) body = <SicurezzaDetailPage slug={page.slice(10)} onNav={goTo} />;
  else if (page === 'antincendio') body = <AntincendioPage onNav={goTo} />;
  else if (page === 'formazione') body = <FormazioneHubPage onNav={goTo} />;
  else if (page.startsWith('formazione/')) body = <CorsoDetailPage slug={page.slice(11)} onNav={goTo} />;
  else if (page === 'medicina') body = <MedicinaPage onNav={goTo} />;
  else if (page === 'certificazioni') body = <CertificazioniPage onNav={goTo} />;
  else if (page === 'contatti') body = <ContattiPage />;
  else body = <HomePage onNav={goTo} />;

  return (
    <div data-screen-label={pageLabel(page)} className={'density-' + t.density}>
      <Nav current={page} onNav={goTo} />
      {body}
      <Footer onNav={goTo} />
      <WhatsFab />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Stile" />
        <TweakSlider label="Raggio angoli" value={t.radius} min={0} max={18} step={2} unit="px" onChange={(v) => setTweak('radius', v)} />
        <TweakSection label="Vai a una pagina" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {[
            ['home', 'Home'], ['chi-siamo', 'Chi siamo'], ['sicurezza', 'Sicurezza'],
            ['antincendio', 'Antincendio'], ['formazione', 'Formazione'], ['medicina', 'Medicina'], ['certificazioni', 'Certificaz.'],
            ['formazione/blsd', 'Corso BLSD'], ['contatti', 'Contatti'],
          ].map(([id, label]) => (
            <TweakButton key={id} onClick={() => goTo(id)}>{page === id ? '● ' : ''}{label}</TweakButton>
          ))}
        </div>
      </TweaksPanel>
    </div>
  );
}

function pageLabel(p) {
  if (p.startsWith('sicurezza/')) return 'Sicurezza · ' + p.slice(10);
  if (p.startsWith('formazione/')) return 'Corso · ' + p.slice(11);
  return ({ 'home': 'Home', 'chi-siamo': 'Chi siamo', 'sicurezza': 'Sicurezza sul Lavoro', 'antincendio': 'Antincendio', 'formazione': 'Formazione', 'medicina': 'Medicina del Lavoro', 'certificazioni': 'Certificazioni', 'contatti': 'Contatti' })[p] || p;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
