// data.jsx — Santarelli Consulting · struttura contenuti completa
// Percorso: Problema → Rischio → Soluzione → Beneficio → Perché → CTA

const CONTACTS = {
  phone: '388 126 0689',
  phoneHref: 'tel:+393881260689',
  whatsappHref: 'https://wa.me/393881260689?text=Salve,%20vorrei%20informazioni%20sui%20vostri%20servizi',
  email: 'consulting.santarelli@gmail.com',
  piva: '01257820579',
  areasShort: 'Lombardia · Lazio · Abruzzo',
  areasLong: 'Tutta Italia, con presenza consolidata in Lombardia, Lazio e Abruzzo',
  cities: ['Milano', 'Monza Brianza', 'Como', 'Varese', 'Lecco', 'Bergamo', 'Brescia', 'Lodi', 'Pavia', 'Cremona', 'Rieti', 'Amatrice', 'Pescara', 'Chieti'],
};

// ── HOME ────────────────────────────────────────────────
const HOME = {
  areas: [
    { icon: 'shield', title: 'Sicurezza sul Lavoro', body: 'RSPP esterno, DVR, valutazioni dei rischi e tutti gli adempimenti del D.Lgs. 81/08, costruiti sull’attività reale dell’impresa.', target: 'sicurezza' },
    { icon: 'badge', title: 'Formazione', body: 'Corsi obbligatori e addestramento pratico per lavoratori, preposti, dirigenti, RLS, emergenze e attrezzature.', target: 'formazione' },
    { icon: 'stetho', title: 'Medicina del Lavoro', body: 'Medico competente, protocollo sanitario e sorveglianza sanitaria coordinati con la sicurezza aziendale.', target: 'medicina' },
    { icon: 'award', title: 'Certificazioni', body: 'Sistemi di gestione ISO 9001, 14001, 45001 e UNI/PdR 125 per migliorare organizzazione e competitività.', target: 'certificazioni' },
  ],
  method: [
    { n: '01', t: 'Analisi iniziale', b: 'Raccogliamo informazioni su attività, organizzazione e obblighi già in essere.' },
    { n: '02', t: 'Sopralluogo', b: 'Verifichiamo ambienti, attrezzature e mansioni direttamente sul posto.' },
    { n: '03', t: 'Piano operativo', b: 'Definiamo priorità, interventi e tempi in un documento chiaro e sostenibile.' },
    { n: '04', t: 'Esecuzione', b: 'Realizziamo adempimenti, documentazione e formazione con un unico referente.' },
    { n: '05', t: 'Assistenza continuativa', b: 'Restiamo presenti nel tempo: scadenze, aggiornamenti e supporto nei controlli.' },
  ],
  strengths: [
    { icon: 'user', t: 'Un unico referente', b: 'Una sola persona segue la tua azienda dall’inizio alla fine.' },
    { icon: 'helmet', t: 'Esperienza sul campo', b: 'Non solo teoria: conoscenza diretta di cantieri, magazzini e attività reali.' },
    { icon: 'doc', t: 'Documentazione personalizzata', b: 'Documenti che descrivono la tua impresa, non modelli standard.' },
    { icon: 'badge', t: 'Formazione pratica', b: 'Corsi con esempi concreti ed esercitazioni quando previste.' },
    { icon: 'clipboard', t: 'Supporto durante le ispezioni', b: 'Affiancamento durante i controlli di ATS, Ispettorato e Vigili del Fuoco.' },
    { icon: 'network', t: 'Rete di professionisti', b: 'Medici competenti, tecnici e formatori qualificati attivati quando servono.' },
    { icon: 'map', t: 'Operatività nazionale', b: 'Interventi su tutta Italia, con basi in Lombardia, Lazio e Abruzzo.' },
    { icon: 'clock', t: 'Tempi chiari', b: 'Scadenze definite e comunicazione trasparente in ogni fase.' },
  ],
  sectors: [
    'Industria e metalmeccanica', 'Logistica e magazzini', 'Edilizia e cantieri',
    'Commercio e ristorazione', 'Uffici e studi professionali', 'Cooperative e servizi alla persona',
    'Eventi e manifestazioni', 'Protezione Civile',
  ],
  stats: [
    { n: '81/08', l: 'Adempimenti gestiti secondo il Testo Unico' },
    { n: 'A·B·C', l: 'Moduli RSPP qualificati' },
    { n: '7', l: 'Aree di intervento coordinate' },
    { n: '3', l: 'Regioni presidiate, tutta Italia servita' },
  ],
  quals: [
    'RSPP moduli A, B, C', 'Formatrice qualificata (curriculum validato AIFES)',
    'Addetta e formatrice antincendio rischio elevato', 'BLSD e primo soccorso',
    'Esperienza in logistica, industria, cantieri e ristorazione', 'Eventi e Protezione Civile',
  ],
  testimonials: [
    { q: 'Finalmente documenti che descrivono davvero come lavoriamo, non un modello copiato. Il sopralluogo ha fatto emergere cose che non avevamo considerato.', a: 'Responsabile stabilimento · Azienda metalmeccanica', place: 'Provincia di Bergamo' },
    { q: 'Un solo riferimento per RSPP, formazione e medicina del lavoro. Le scadenze non ci sfuggono più e durante l’ispezione eravamo tranquilli.', a: 'Titolare · Impresa di logistica', place: 'Milano' },
    { q: 'Corsi pratici e concreti, tenuti da chi conosce il cantiere. Gli operai li hanno seguiti volentieri.', a: 'Direttore tecnico · Impresa edile', place: 'Lazio' },
  ],
};

// ── ANTINCENDIO (pagina dedicata, top-level) ────────────
const ANTINCENDIO = {
  icon: 'flame', title: 'Antincendio',
  metaTitle: 'Antincendio — Valutazione rischio incendio e piani di emergenza | Santarelli Consulting',
  metaDesc: 'Prevenzione incendi per aziende, uffici, cantieri ed enti: valutazione del rischio incendio, piano di emergenza, prove di evacuazione e formazione addetti.',
  h1: 'Prevenzione incendi e gestione delle emergenze.',
  short: 'Valutazione del rischio incendio, misure di prevenzione e organizzazione della gestione dell’emergenza.',
  intro: 'Supportiamo aziende, attività commerciali, uffici, cantieri ed enti nella valutazione del rischio incendio e nell’organizzazione delle misure di prevenzione e gestione dell’emergenza.',
  problem: 'Il quadro normativo antincendio (D.M. 3 settembre 2021) ha ridisegnato valutazioni, ruoli e formazione: molte realtà non sono allineate.',
  rischio: 'Un’organizzazione antincendio carente mette a rischio persone e beni, e genera contestazioni durante i controlli dei Vigili del Fuoco.',
  benefit: 'Un percorso completo dalla valutazione alla prova di evacuazione, seguito da chi è qualificato come addetta e formatrice antincendio rischio elevato.',
  includes: ['Valutazione del rischio incendio', 'Piano di emergenza ed evacuazione', 'Planimetrie di emergenza', 'Procedure operative', 'Prove di evacuazione', 'Formazione addetti antincendio', 'Supporto durante i controlli dei Vigili del Fuoco', 'Assistenza per attività soggette a prevenzione incendi', 'Verifica documentale di estintori, porte REI e presidi', 'Assistenza tecnica continuativa'],
  cta: 'Richiedi una consulenza antincendio',
  faq: [
    { q: 'La prova di evacuazione è obbligatoria?', a: 'Per le attività soggette a piano di emergenza va effettuata almeno una volta l’anno. Ci occupiamo di organizzarla e verbalizzarla.' },
    { q: 'Ogni azienda deve avere addetti antincendio formati?', a: 'Sì, il Datore di Lavoro deve designare e formare gli addetti alla prevenzione incendi in numero adeguato all’attività.' },
  ],
};

// ── SICUREZZA SUL LAVORO (hub + dettaglio) ──────────────
const SICUREZZA = [
  {
    slug: 'rspp-esterno', icon: 'shield', title: 'RSPP Esterno',
    metaTitle: 'RSPP Esterno | Santarelli Consulting',
    metaDesc: 'Servizio di RSPP esterno per aziende: incarico continuativo, sopralluoghi, DVR, gestione scadenze e assistenza nei controlli. D.Lgs. 81/08.',
    h1: 'Un presidio continuativo per la sicurezza della tua azienda.',
    short: 'Assumiamo l’incarico di Responsabile del Servizio di Prevenzione e Protezione e affianchiamo il Datore di Lavoro.',
    problem: 'Il Datore di Lavoro deve nominare un RSPP, ma internamente spesso mancano tempo, competenze aggiornate e continuità.',
    rischio: 'La nomina mancante o un RSPP non operativo espongono a sanzioni e lasciano l’azienda senza una regia sugli adempimenti.',
    benefit: 'Un professionista che assume l’incarico, tiene in ordine documenti e scadenze e resta raggiungibile quando serve — con continuità garantita dalla rete.',
    includes: ['Assunzione dell’incarico di RSPP', 'Sopralluoghi periodici programmati', 'Redazione e aggiornamento del DVR', 'Pianificazione degli interventi', 'Riunioni periodiche di prevenzione', 'Gestione delle scadenze', 'Coordinamento con il medico competente', 'Supporto alla formazione', 'Assistenza durante i controlli'],
    cta: 'Richiedi una proposta per il servizio RSPP',
    faq: [
      { q: 'L’RSPP esterno è ammesso dalla legge?', a: 'Sì. L’art. 31 del D.Lgs. 81/08 consente di affidare l’incarico a un professionista esterno qualificato nella maggior parte dei settori e delle dimensioni aziendali.' },
      { q: 'Quali qualifiche deve avere?', a: 'Formazione RSPP moduli A, B e C, con aggiornamento periodico. Il modulo B è specifico per macrosettore ATECO.' },
      { q: 'Cosa succede in caso di assenza del referente?', a: 'La continuità del servizio è garantita dalla rete di professionisti coordinata dallo studio.' },
    ],
  },
  {
    slug: 'dvr', icon: 'doc', title: 'DVR',
    metaTitle: 'DVR — Documento di Valutazione dei Rischi | Santarelli Consulting',
    metaDesc: 'Redazione e aggiornamento del DVR costruito sulla reale attività aziendale: sopralluogo, analisi mansioni, misure di prevenzione e programma di miglioramento.',
    h1: 'Un documento costruito sulla tua azienda.',
    short: 'Il DVR deve descrivere realmente l’attività, i rischi presenti e le misure adottate.',
    problem: 'Molti DVR sono modelli generici che non rispecchiano ciò che accade davvero in azienda.',
    rischio: 'Un DVR assente o incoerente è la prima contestazione in caso di ispezione o infortunio, con responsabilità dirette per il Datore di Lavoro.',
    benefit: 'Un documento costruito sul lavoro reale — mansioni, ambienti e attrezzature — difendibile davanti agli organi di vigilanza e utile a gestire l’azienda.',
    includes: ['Sopralluogo e analisi delle attività', 'Analisi delle mansioni', 'Valutazione di tutti i rischi presenti', 'Individuazione delle misure di prevenzione', 'Programma di miglioramento', 'Aggiornamento a ogni variazione significativa'],
    cta: 'Richiedi la redazione o l’aggiornamento del DVR',
    faq: [
      { q: 'Chi è obbligato ad avere il DVR?', a: 'Tutte le aziende con almeno un lavoratore, anche part-time o a chiamata.' },
      { q: 'Quando va aggiornato?', a: 'A ogni modifica significativa dell’attività, in caso di infortuni rilevanti o di nuove normative applicabili.' },
    ],
  },
  {
    slug: 'duvri', icon: 'doc', title: 'DUVRI',
    metaTitle: 'DUVRI e gestione interferenze | Santarelli Consulting',
    metaDesc: 'Redazione del DUVRI per appalti e lavori affidati a terzi: valutazione dei rischi da interferenza, verifica idoneità imprese e coordinamento.',
    h1: 'Appalti coperti, interferenze sotto controllo.',
    short: 'Valutazione dei rischi da interferenza per appalti, forniture e lavori affidati a terzi.',
    problem: 'Ogni volta che imprese esterne operano nei tuoi ambienti nascono rischi da interferenza di cui risponde il committente.',
    rischio: 'Senza DUVRI il committente resta esposto in caso di infortunio di un’impresa terza, oltre alle sanzioni previste.',
    benefit: 'Documento di coordinamento chiaro, responsabilità delimitate e costi della sicurezza esplicitati correttamente nei contratti.',
    includes: ['Redazione del DUVRI', 'Verifica dell’idoneità tecnico-professionale delle imprese', 'Individuazione dei rischi da interferenza', 'Misure di cooperazione e coordinamento', 'Aggiornamento in corso d’opera'],
    cta: 'Richiedi il DUVRI per il tuo appalto',
    faq: [
      { q: 'Quando serve il DUVRI?', a: 'Quando si affidano lavori, servizi o forniture a imprese o lavoratori autonomi all’interno della propria azienda o unità produttiva.' },
    ],
  },
  {
    slug: 'valutazioni-rischi', icon: 'gauge', title: 'Valutazioni dei rischi specifici',
    metaTitle: 'Valutazioni dei rischi specifici | Santarelli Consulting',
    metaDesc: 'Valutazioni tecniche specifiche: rumore, vibrazioni, movimentazione carichi, rischio chimico, stress lavoro-correlato, campi elettromagnetici, ATEX.',
    h1: 'I rischi che richiedono una valutazione dedicata.',
    short: 'Rumore, vibrazioni, movimentazione carichi, chimico, stress lavoro-correlato e altri rischi specifici.',
    problem: 'Alcuni rischi non si valutano a occhio: servono metodologie, misure e talvolta strumentazione dedicata.',
    rischio: 'Valutazioni mancanti o superficiali lasciano scoperti obblighi precisi e possono invalidare la sorveglianza sanitaria.',
    benefit: 'Valutazioni firmate da tecnici qualificati, integrate nel DVR e nel protocollo sanitario, con misure realmente applicabili.',
    includes: ['Rumore e vibrazioni', 'Movimentazione manuale dei carichi', 'Rischio chimico e cancerogeno', 'Stress lavoro-correlato', 'Campi elettromagnetici', 'Atmosfere esplosive (ATEX)'],
    cta: 'Richiedi una valutazione specifica',
    faq: [],
  },
  {
    slug: 'piani-emergenza', icon: 'alert', title: 'Piani di emergenza',
    metaTitle: 'Piani di emergenza ed evacuazione | Santarelli Consulting',
    metaDesc: 'Redazione di piani di emergenza ed evacuazione, planimetrie, procedure operative e organizzazione delle squadre di emergenza.',
    h1: 'Sapere cosa fare, prima che serva.',
    short: 'Piani di emergenza ed evacuazione, planimetrie, procedure e organizzazione delle squadre.',
    problem: 'In emergenza non c’è tempo per improvvisare: servono procedure chiare e persone preparate.',
    rischio: 'Senza un piano efficace un evento gestibile può trasformarsi in un incidente grave, con responsabilità del Datore di Lavoro.',
    benefit: 'Procedure semplici e realmente applicabili, squadre designate e formate, planimetrie aggiornate ed esposte.',
    includes: ['Piano di emergenza ed evacuazione', 'Planimetrie di emergenza', 'Procedure operative per scenario', 'Designazione e formazione delle squadre', 'Prove di evacuazione e verbali'],
    cta: 'Richiedi il tuo piano di emergenza',
    faq: [],
  },
  {
    slug: 'sicurezza-cantieri', icon: 'crane', title: 'Sicurezza Cantieri',
    metaTitle: 'Sicurezza Cantieri — POS, PSC, PiMUS | Santarelli Consulting',
    metaDesc: 'Sicurezza nei cantieri temporanei e mobili: POS, PSC, PiMUS, procedure, coordinamento e sopralluoghi per imprese, committenti e professionisti.',
    h1: 'Sicurezza tecnica e documentale nei cantieri.',
    short: 'Affianchiamo imprese, committenti e professionisti nella gestione della sicurezza nei cantieri temporanei e mobili.',
    problem: 'Il cantiere impone documenti e figure specifiche (Titolo IV D.Lgs. 81/08) e tempi che non ammettono ritardi.',
    rischio: 'Documentazione incompleta o non coerente può bloccare il cantiere ed esporre imprese e committente a responsabilità gravi.',
    benefit: 'Documenti pronti nei tempi del cantiere, coordinamento con figure qualificate e verifica reale delle condizioni operative.',
    includes: ['POS — Piano Operativo di Sicurezza', 'PSC — Piano di Sicurezza e Coordinamento', 'PiMUS — montaggio/smontaggio ponteggi', 'Procedure e coordinamento', 'Supporto alle imprese', 'Sopralluoghi e verifica delle condizioni operative'],
    cta: 'Richiedi supporto per il tuo cantiere',
    faq: [
      { q: 'Qual è la differenza tra POS e PSC?', a: 'Il POS è redatto dall’impresa esecutrice per le proprie lavorazioni; il PSC è predisposto dal coordinatore per la sicurezza quando in cantiere operano più imprese.' },
      { q: 'Quando serve il PiMUS?', a: 'Sempre in caso di montaggio, uso, trasformazione o smontaggio di ponteggi.' },
    ],
  },
  {
    slug: 'assistenza-ispezioni', icon: 'clipboard', title: 'Assistenza Ispezioni',
    metaTitle: 'Assistenza durante ispezioni ATS e Ispettorato | Santarelli Consulting',
    metaDesc: 'Preparazione documentale e affiancamento durante i controlli di ATS, Ispettorato del Lavoro e Vigili del Fuoco. Gestione prescrizioni e regolarizzazioni.',
    h1: 'Non affrontare un controllo da solo.',
    short: 'Preparazione documentale e affiancamento durante i controlli degli organi di vigilanza.',
    problem: 'Un’ispezione arriva spesso senza preavviso e mette sotto pressione chi non è preparato.',
    rischio: 'Un controllo gestito male trasforma rilievi sanabili in prescrizioni e sanzioni, anche penali.',
    benefit: 'Pre-audit della documentazione, presenza al fianco del Datore di Lavoro durante il controllo e gestione completa delle prescrizioni.',
    includes: ['Pre-audit documentale', 'Affiancamento durante il sopralluogo ispettivo', 'Gestione delle prescrizioni e regolarizzazioni', 'Interlocuzione con ATS, Ispettorato e Vigili del Fuoco'],
    cta: 'Richiedi assistenza per un controllo',
    faq: [],
  },
  {
    slug: 'eventi', icon: 'speaker', title: 'Eventi',
    metaTitle: 'Sicurezza e supporto tecnico agli eventi | Santarelli Consulting',
    metaDesc: 'Supporto tecnico, impianti e presidio per eventi e manifestazioni: esperienza operativa su grandi eventi e ospedali da campo.',
    h1: 'Eventi presidiati, dal montaggio alla chiusura.',
    short: 'Supporto tecnico e presidio per eventi e manifestazioni pubbliche e private.',
    problem: 'Ogni evento concentra rischi in poco tempo e spazio, con responsabilità precise per organizzatori e fornitori.',
    rischio: 'Impianti e presidi improvvisati mettono a rischio pubblico e operatori e possono compromettere le autorizzazioni.',
    benefit: 'Esperienza operativa reale su grandi eventi e ospedali da campo, con personale qualificato e coordinamento con il piano di emergenza.',
    includes: ['Supporto tecnico e supervisione impianti in eventi', 'Personale qualificato per lavori elettrici (PES/PAV/PEI)', 'Coperture antincendio con addetti formati', 'Coordinamento con il piano di emergenza dell’evento'],
    cta: 'Richiedi un preventivo per il tuo evento',
    faq: [],
  },
  {
    slug: 'protezione-civile', icon: 'tent', title: 'Protezione Civile',
    metaTitle: 'Protezione Civile — formazione e piani | Santarelli Consulting',
    metaDesc: 'Formazione volontari, piani di emergenza ed esercitazioni per gruppi ed enti di Protezione Civile, con esperienza operativa sul campo.',
    h1: 'Formazione ed esperienza operativa per la Protezione Civile.',
    short: 'Formazione volontari, piani di emergenza ed esercitazioni per gruppi ed enti.',
    problem: 'Volontari e operatori hanno bisogno di preparazione concreta e di procedure realmente utilizzabili sul campo.',
    rischio: 'Una preparazione solo teorica non regge alla prova dell’emergenza reale.',
    benefit: 'Docenza e affiancamento da chi ha esperienza operativa diretta, con esercitazioni pratiche e debriefing.',
    includes: ['Corsi base per nuovi volontari', 'Aggiornamenti periodici operativi', 'Redazione di piani di emergenza', 'Esercitazioni sul campo', 'Debriefing tecnico e relazione'],
    cta: 'Contattaci per la tua organizzazione',
    faq: [],
  },
  {
    slug: 'manuale-haccp', icon: 'doc', title: 'Manuale HACCP',
    metaTitle: 'Manuale HACCP e autocontrollo alimentare | Santarelli Consulting',
    metaDesc: 'Redazione del manuale HACCP e del piano di autocontrollo per attività alimentari: analisi dei rischi, procedure, monitoraggi e formazione degli alimentaristi.',
    h1: 'Il manuale HACCP costruito sulla tua attività',
    short: 'Redazione del manuale di autocontrollo HACCP e delle procedure per chi produce, somministra o vende alimenti.',
    problem: 'Ogni attività che tratta alimenti deve dotarsi di un piano di autocontrollo HACCP basato sul proprio processo reale.',
    rischio: 'Un manuale generico o assente porta a non conformità durante i controlli ATS e mette a rischio la reputazione dell’attività.',
    benefit: 'Un manuale su misura — dai flussi alle procedure di monitoraggio — integrato con la formazione degli alimentaristi.',
    includes: ['Analisi dei pericoli e punti critici (CCP)', 'Redazione del manuale di autocontrollo', 'Procedure di monitoraggio e registrazioni', 'Schede di igiene e sanificazione', 'Formazione HACCP degli alimentaristi', 'Aggiornamento a ogni variazione di processo'],
    cta: 'Richiedi il tuo manuale HACCP',
    faq: [
      { q: 'Chi deve avere il manuale HACCP?', a: 'Tutte le imprese del settore alimentare: ristorazione, bar, produzione, commercio e ricettività.' },
      { q: 'Serve anche la formazione?', a: 'Sì: il personale che manipola alimenti deve avere una formazione HACCP adeguata, che organizziamo insieme al manuale.' },
    ],
  },
];

// ── FORMAZIONE (hub + corsi) ────────────────────────────
const FORMAZIONE_CATS = [
  { id: 'aziendale', title: 'Formazione aziendale', icon: 'users', intro: 'I corsi obbligatori per ogni ruolo previsti dall’Accordo Stato-Regioni.', courses: ['lavoratori', 'preposti', 'dirigenti', 'rls'] },
  { id: 'emergenze', title: 'Emergenze', icon: 'alert', intro: 'Preparazione a gestire le emergenze in azienda.', courses: ['primo-soccorso', 'blsd', 'antincendio-corso'] },
  { id: 'attrezzature', title: 'Attrezzature', icon: 'crane', intro: 'Abilitazioni all’uso delle attrezzature (Accordo 2025), teoria e prova pratica.', courses: ['ple', 'carrelli', 'gru', 'movimento-terra', 'trattori'] },
  { id: 'alto-rischio', title: 'Lavori ad alto rischio', icon: 'shield', intro: 'Percorsi per lavorazioni ad alto rischio con addestramento pratico.', courses: ['lavori-quota', 'dpi-terza', 'funi'] },
  { id: 'elettrico', title: 'Rischio elettrico', icon: 'bolt', intro: 'Qualifiche per i lavori elettrici secondo la CEI 11-27.', courses: ['pes-pav-pei'] },
  { id: 'alimentare', title: 'Alimentare', icon: 'doc', intro: 'Igiene degli alimenti per chi opera nel settore alimentare.', courses: ['haccp'] },
];

function corso(slug, title, dur, dest, contenuti, extra) {
  return {
    slug, title, hours: dur, destinatari: dest,
    metaTitle: title + ' | Formazione Santarelli Consulting',
    metaDesc: (extra && extra.meta) || (title + ': corso con parte teorica' + (extra && extra.pratica ? ' e addestramento pratico' : '') + ', attestato e aggiornamenti. ' + dest),
    intro: (extra && extra.intro) || null,
    contenuti,
    modalita: (extra && extra.modalita) || 'In azienda o presso struttura dedicata. Parte teorica' + ((extra && extra.pratica) ? ' ed esercitazioni pratiche.' : ' con verifica finale di apprendimento.'),
    attestato: (extra && extra.attestato) || 'Attestato di frequenza con verifica di apprendimento, valido ai fini di legge.',
    faq: (extra && extra.faq) || [],
  };
}

const CORSI = {
  'lavoratori': corso('lavoratori', 'Lavoratori — formazione generale e specifica', '8–16 ore', 'Tutti i lavoratori, a ogni assunzione.', ['Formazione generale (4 ore)', 'Formazione specifica in base al rischio (basso 4h, medio 8h, alto 12h)', 'Aggiornamento quinquennale (6 ore)'], { faq: [{ q: 'Quando va fatta?', a: 'Prima o al momento dell’assunzione, in ogni caso non oltre 60 giorni.' }] }),
  'preposti': corso('preposti', 'Preposti', '8 ore + aggiornamento', 'Chi sovrintende e vigila sull’attività lavorativa.', ['Compiti e responsabilità del preposto', 'Individuazione e gestione dei rischi', 'Comunicazione e vigilanza'], { attestato: 'Attestato con verifica finale. Aggiornamento periodico previsto dalla normativa.' }),
  'dirigenti': corso('dirigenti', 'Dirigenti', '16 ore', 'Chi attua le direttive del Datore di Lavoro organizzando l’attività.', ['Modulo giuridico-normativo', 'Modulo gestionale', 'Modulo tecnico', 'Modulo relazionale'], {}),
  'rls': corso('rls', 'RLS — Rappresentante dei Lavoratori per la Sicurezza', '32 ore + aggiornamento', 'Il lavoratore eletto o designato come RLS.', ['Normativa e ruolo dell’RLS', 'Valutazione dei rischi', 'Prevenzione e protezione', 'Aggiornamento annuale (4 o 8 ore secondo l’organico)'], {}),
  'primo-soccorso': corso('primo-soccorso', 'Primo Soccorso', '12–16 ore', 'Addetti al primo soccorso aziendale (gruppi A, B, C).', ['Allertare il sistema di soccorso', 'Riconoscere l’emergenza sanitaria', 'Attuare gli interventi di primo soccorso', 'Addestramento pratico'], { pratica: true, intro: 'Corsi conformi alla normativa vigente, differenziati in base al gruppo aziendale e comprensivi di parte teorica e addestramento pratico.', h1: 'Formazione per addetti al primo soccorso aziendale.', cta: 'Organizza il corso nella tua azienda', faq: [{ q: 'Ogni quanto va aggiornato?', a: 'L’aggiornamento, con parte pratica, è previsto ogni tre anni.' }] }),
  'blsd': corso('blsd', 'BLSD — Rianimazione e defibrillatore', '8 ore', 'Aziende, enti e associazioni.', ['Riconoscimento dell’arresto cardiaco', 'Attivazione dei soccorsi', 'Manovre di rianimazione cardiopolmonare', 'Utilizzo del defibrillatore semiautomatico (DAE)'], { pratica: true, intro: 'Formazione teorica e pratica per il riconoscimento dell’arresto cardiaco, l’attivazione dei soccorsi, le manovre di rianimazione cardiopolmonare e l’utilizzo del defibrillatore semiautomatico.', h1: 'Corso BLSD per aziende, enti e associazioni.', cta: 'Richiedi un corso BLSD', attestato: 'Rilascio dell’abilitazione all’uso del DAE secondo le indicazioni regionali.', faq: [{ q: 'Chi può usare il defibrillatore?', a: 'Dopo il corso BLSD chiunque è abilitato all’uso del DAE, adulto e pediatrico.' }] }),
  'antincendio-corso': corso('antincendio-corso', 'Antincendio (livelli 1, 2, 3)', '4–16 ore', 'Addetti alla prevenzione incendi e gestione emergenza.', ['Principi della combustione e rischi', 'Misure di prevenzione e protezione', 'Procedure di emergenza', 'Esercitazioni pratiche di spegnimento'], { pratica: true }),
  'ple': corso('ple', 'PLE — Piattaforme di Lavoro Elevabili', '8–10 ore', 'Operatori di piattaforme con e senza stabilizzatori.', ['Normativa e tipologie di PLE', 'Componenti e dispositivi di sicurezza', 'Prova pratica su macchina'], { pratica: true }),
  'carrelli': corso('carrelli', 'Carrelli elevatori', '12 ore', 'Carrellisti (frontali, retrattili, telescopici).', ['Tipologie di carrelli e stabilità', 'Dispositivi di comando e sicurezza', 'Guida e movimentazione dei carichi', 'Prova pratica'], { pratica: true }),
  'gru': corso('gru', 'Gru (torre, mobile, su autocarro)', '8–14 ore', 'Operatori di gru per tipologia.', ['Normativa e tipologie', 'Dispositivi di sicurezza', 'Manovre e imbracatura carichi', 'Prova pratica'], { pratica: true }),
  'trattori': corso('trattori', 'Trattori agricoli o forestali', '8–13 ore', 'Conduttori di trattori a ruote e a cingoli.', ['Normativa e tipologie', 'Dispositivi di protezione (ROPS)', 'Guida in sicurezza', 'Prova pratica'], { pratica: true }),
  'movimento-terra': corso('movimento-terra', 'Escavatori, terne, pale e macchine movimento terra', '10–16 ore', 'Operatori di macchine movimento terra (escavatori idraulici e a fune, terne, pale caricatrici, autoribaltabili a cingoli).', ['Escavatori idraulici e a fune', 'Terne e pale caricatrici', 'Autoribaltabili a cingoli', 'Prova pratica'], { pratica: true }),
  'lavori-quota': corso('lavori-quota', 'Lavori in quota', '4–8 ore', 'Chi opera in altezza con rischio di caduta.', ['Valutazione del rischio di caduta', 'Sistemi di protezione collettiva e individuale', 'Ancoraggi e procedure', 'Prova pratica'], { pratica: true }),
  'dpi-terza': corso('dpi-terza', 'DPI di III categoria', '4–8 ore', 'Utilizzatori di DPI anticaduta.', ['Tipologie di DPI anticaduta', 'Imbracature e sistemi di arresto', 'Ispezione e manutenzione dei DPI', 'Prova pratica'], { pratica: true }),
  'funi': corso('funi', 'Accesso e posizionamento su funi', '32 ore', 'Operatori su fune (settore edile/non edile).', ['Tecniche di accesso e posizionamento', 'Attrezzature e sistemi di sicurezza', 'Manovre di autosoccorso', 'Addestramento pratico completo'], { pratica: true }),
  'pes-pav-pei': corso('pes-pav-pei', 'PES / PAV / PEI — lavori elettrici', '14–16 ore', 'Persone esperte, avvertite e idonee ai lavori elettrici (CEI 11-27).', ['Rischio elettrico e normativa CEI 11-27', 'Lavori fuori tensione, in prossimità e sotto tensione', 'Ruoli PES, PAV e idoneità PEI', 'Procedure operative'], {}),
  'haccp': corso('haccp', 'HACCP — Alimentaristi', '4–8 ore', 'Chi manipola o somministra alimenti.', ['Principi del sistema HACCP', 'Igiene degli alimenti e degli ambienti', 'Conservazione e tracciabilità', 'Obblighi secondo il regolamento regionale'], {}),
};

// ── MEDICINA DEL LAVORO ─────────────────────────────────
const MEDICINA = {
  metaTitle: 'Medicina del Lavoro e Sorveglianza Sanitaria | Santarelli Consulting',
  metaDesc: 'Sorveglianza sanitaria coordinata con la sicurezza aziendale: nomina del medico competente, protocollo sanitario, visite periodiche e giudizi di idoneità.',
  intro: 'Attraverso medici competenti e professionisti qualificati, supportiamo le aziende nella gestione degli obblighi sanitari previsti dalla normativa.',
  problem: 'La sorveglianza sanitaria va coordinata con la valutazione dei rischi: gestita a compartimenti stagni diventa un costo senza valore.',
  rischio: 'Nomina mancante, protocollo generico o visite fuori scadenza espongono l’azienda a sanzioni e lasciano scoperta la tutela dei lavoratori.',
  benefit: 'Un solo referente coordina medico competente, protocollo e scadenze, in coerenza con DVR e attività reale.',
  blocks: [
    { t: 'Nomina del medico competente', b: 'Individuazione e nomina del medico competente, integrata con RSPP e DVR.' },
    { t: 'Sopralluogo', b: 'Sopralluogo del medico negli ambienti di lavoro, come previsto dalla normativa.' },
    { t: 'Protocollo sanitario', b: 'Definizione del protocollo sulla base dei rischi reali, senza esami inutili.' },
    { t: 'Visite mediche', b: 'Visite preventive, periodiche, su richiesta e al rientro da assenze prolungate.' },
    { t: 'Giudizi di idoneità', b: 'Gestione di idoneità, limitazioni e prescrizioni.' },
    { t: 'Gestione delle scadenze', b: 'Scadenzario visite e cartelle sanitarie sempre in ordine.' },
    { t: 'Collaborazione al DVR', b: 'Contributo del medico alla valutazione dei rischi.' },
    { t: 'Riunione periodica', b: 'Partecipazione del medico competente alla riunione periodica di prevenzione.' },
  ],
  cta: 'Richiedi il servizio di medicina del lavoro',
  faq: [
    { q: 'Quando è obbligatorio il medico competente?', a: 'Quando la valutazione dei rischi evidenzia rischi che richiedono sorveglianza sanitaria (videoterminali, movimentazione carichi, rischio chimico, rumore e altri).' },
    { q: 'Le visite si possono svolgere in azienda?', a: 'Sì, sopra un certo numero di lavoratori il medico può visitare direttamente in sede, riducendo i tempi di fermo.' },
  ],
};

// ── CERTIFICAZIONI ──────────────────────────────────────
const CERTIFICAZIONI = {
  metaTitle: 'Certificazioni ISO 9001, 14001, 45001, UNI/PdR 125 | Santarelli Consulting',
  metaDesc: 'Sistemi di gestione certificati: ISO 9001 qualità, ISO 14001 ambiente, ISO 45001 sicurezza, UNI/PdR 125 parità di genere. Analisi, audit e piani di miglioramento.',
  intro: 'Accompagniamo l’azienda dall’analisi iniziale alla verifica dell’ente: sistemi di gestione costruiti sui processi reali, non sulla carta.',
  problem: 'Le certificazioni sono sempre più richieste da gare e clienti, ma un sistema calato dall’alto genera solo burocrazia.',
  rischio: 'Un sistema di gestione mal costruito appesantisce l’organizzazione senza portare i benefici attesi in gare e qualifiche.',
  benefit: 'Sistemi snelli, cuciti sui processi aziendali, che migliorano organizzazione e competitività e reggono l’audit dell’ente.',
  items: [
    { code: 'ISO 9001', title: 'Qualità e processi', body: 'Ordina processi, ruoli e responsabilità. Spesso requisito per gare e qualifiche fornitori.' },
    { code: 'ISO 14001', title: 'Gestione ambientale', body: 'Governa rifiuti, emissioni, autorizzazioni e conformità ambientale.' },
    { code: 'ISO 45001', title: 'Salute e sicurezza sul lavoro', body: 'Integra e valorizza il lavoro fatto con RSPP e DVR, con benefici anche sul premio INAIL.' },
    { code: 'UNI/PdR 125', title: 'Parità di genere', body: 'Sgravi contributivi e punteggio nei bandi pubblici.' },
    { code: 'Audit', title: 'Analisi e miglioramento', body: 'Analisi, verifiche interne e piani di miglioramento continui.' },
  ],
  path: ['Analisi iniziale (gap analysis)', 'Costruzione del sistema sui processi reali', 'Formazione del personale coinvolto', 'Audit interno di verifica', 'Assistenza durante la verifica dell’ente', 'Mantenimento e miglioramento nel tempo'],
  cta: 'Richiedi una valutazione iniziale',
  faq: [
    { q: 'Quanto dura un percorso di certificazione?', a: 'In genere dai 3 ai 6 mesi, in base a dimensione e maturità dei processi aziendali.' },
    { q: 'La ISO 45001 conviene?', a: 'Per aziende con rischi significativi sì: valorizza il sistema di sicurezza esistente e può incidere sul premio INAIL.' },
  ],
};

// ── FAQ generali (Home / Chi siamo) ─────────────────────
const FAQ_GENERAL = [
  { q: 'Da dove si parte?', a: 'Da un check preliminare gratuito: un sopralluogo per capire la situazione reale, verificare la conformità e individuare le priorità. Senza impegno.' },
  { q: 'Quanto costa un RSPP esterno?', a: 'Dipende da settore, numero di lavoratori e complessità dei rischi. Dopo il sopralluogo forniamo un canone annuo chiaro, senza costi nascosti.' },
  { q: 'Quando serve aggiornare il DVR?', a: 'A ogni modifica significativa dell’attività (nuove lavorazioni, macchinari, sede), dopo infortuni rilevanti o quando cambiano le normative applicabili.' },
  { q: 'In quanto tempo siete operativi?', a: 'In genere entro pochi giorni dalla firma dell’incarico. Concordiamo insieme una tempistica chiara per ogni attività.' },
  { q: 'Lavorate solo in Lombardia?', a: 'No. Operiamo su tutta Italia, con presenza consolidata in Lombardia, Lazio e Abruzzo.' },
  { q: 'Cosa vi distingue da un altro studio?', a: 'Un unico referente che segue davvero l’azienda, esperienza diretta sul campo e documenti costruiti sulla tua attività, non modelli standard.' },
  { q: 'Come funzionano i costi?', a: 'Per i servizi continuativi lavoriamo con un canone chiaro; per gli interventi puntuali forniamo un preventivo dettagliato dopo il sopralluogo. Nessun costo nascosto.' },
];

// ── Checklist gratuita (lead magnet) ────────────────────
const CHECKLIST = [
  'Hai nominato un RSPP, interno o esterno, con incarico formalizzato?',
  'Il DVR descrive le lavorazioni realmente svolte in azienda oggi?',
  'I lavoratori hanno la formazione 81/08 aggiornata (generale, specifica, aggiornamenti quinquennali)?',
  'Preposti e dirigenti hanno seguito la formazione prevista per il loro ruolo?',
  'Hai una valutazione del rischio incendio aggiornata al D.M. 3 settembre 2021?',
  'Esiste un piano di emergenza ed evacuazione, con planimetrie esposte e prova annuale svolta?',
  'Gli addetti al primo soccorso e antincendio sono nominati, formati e aggiornati?',
  'Se previsto, il medico competente è nominato e le visite periodiche sono rispettate?',
  'I cantieri o le lavorazioni con imprese esterne hanno POS, PSC o DUVRI quando richiesti?',
  'Hai uno scadenzario che tiene traccia di corsi, visite e verifiche periodiche?',
];

// ── Autovalutazione sicurezza ───────────────────────────
const AUTOCHECK = [
  { q: 'Hai nominato un RSPP con incarico formalizzato?', area: 'RSPP' },
  { q: 'Il DVR è aggiornato all’attività attuale?', area: 'DVR' },
  { q: 'La formazione dei lavoratori (81/08) è in regola?', area: 'Formazione' },
  { q: 'Hai valutato il rischio incendio e il piano di emergenza?', area: 'Antincendio' },
  { q: 'È attiva la sorveglianza sanitaria dove richiesta?', area: 'Medicina del lavoro' },
  { q: 'Tieni monitorate scadenze e aggiornamenti documentali?', area: 'Gestione scadenze' },
];

// ── Rete di professionisti (Chi siamo) ──────────────────
const NETWORK = [
  { area: 'Sicurezza antincendio ed emergenza', role: 'Progettazione planimetrie ed emergenza in CAD', body: 'Un interior designer specializzato disegna planimetrie di emergenza ed evacuazione tecnicamente corrette e chiare da leggere.' },
  { area: 'Formazione sanitaria', role: 'Corsi di Primo Soccorso', body: 'Un medico qualificato tiene la parte pratica dei corsi di primo soccorso aziendale, con esperienza clinica reale.' },
  { area: 'Sorveglianza sanitaria', role: 'Medico del Lavoro', body: 'Un medico competente convenzionato segue nomina, protocollo sanitario e visite periodiche in coordinamento con RSPP e DVR.' },
  { area: 'Assistenza sanitaria', role: 'Infermiera', body: 'Supporto infermieristico per visite, screening e attività sanitarie in azienda quando richiesto dal protocollo.' },
  { area: 'Benessere organizzativo', role: 'Psicologa del lavoro', body: 'Una psicologa specializzata affianca nella valutazione dello stress lavoro-correlato e nella gestione dei conflitti sul posto di lavoro.' },
];

// ── Mini-test Stress lavoro-correlato ────────────────────
const STRESS_TEST = [
  { q: 'Negli ultimi mesi il carico di lavoro ti è sembrato eccessivo o poco gestibile?', area: 'Carico di lavoro' },
  { q: 'Ci sono stati conflitti o tensioni tra colleghi o con superiori?', area: 'Relazioni e conflitti' },
  { q: 'I ruoli e le responsabilità in azienda sono chiari per tutti?', area: 'Chiarezza dei ruoli', invert: true },
  { q: 'Le persone si sentono ascoltate quando segnalano un problema?', area: 'Ascolto e comunicazione', invert: true },
  { q: 'Hai notato un aumento di assenze, stanchezza o demotivazione nel team?', area: 'Segnali di malessere' },
  { q: 'Esiste un canale strutturato per parlare di queste difficoltà?', area: 'Gestione strutturata', invert: true },
];

Object.assign(window, { CONTACTS, HOME, SICUREZZA, ANTINCENDIO, FORMAZIONE_CATS, CORSI, MEDICINA, CERTIFICAZIONI, FAQ_GENERAL, AUTOCHECK, CHECKLIST, NETWORK, STRESS_TEST });