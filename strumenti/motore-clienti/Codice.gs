/**
 * MOTORE CLIENTI — Santarelli Consulting
 * Google Apps Script: archivio su Google Fogli, app web, agenti automatici.
 *
 * INSTALLAZIONE (una volta sola):
 *  1. Da Menu "Esegui" scegli la funzione  installa  e premi Esegui. Autorizza.
 *  2. Pulsante "Esegui il deployment" > Nuovo deployment > Tipo: App web
 *     Esegui come: Me · Chi ha accesso: Solo io  > Esegui il deployment.
 *  3. Apri il link dell'app web, vai in Impostazioni e incolla la chiave AI (Gemini).
 */

const VERSIONE = '1.0';
const TAB = {
  lead: ['id','azienda','settore','provincia','contatto','email','telefono','sito','canale','servizio','stato','valore','segnale','fonte','prossimaAzione','dataProssima','note','dataPrimoContatto','dataUltimoContatto','dataContratto','threadId','followups','msgVisti','ultimaRisposta','emailVerificata','fonteEmail','createdAt','updatedAt'],
  partner: ['id','nome','tipo','citta','referente','email','telefono','sito','stato','segnalate','prossimaAzione','dataProssima','note','fonte','threadId','createdAt','updatedAt'],
  scadenze: ['id','cliente','email','adempimento','dataScadenza','persone','note','stato','propostaInviata','createdAt','updatedAt'],
  bozze: ['id','rifTipo','rifId','tipo','a','oggetto','corpo','stato','creata','inviata','errore','azione','allegato','richiedeApprovazione'],
  listino: ['servizio','prezzo','unita','note'],
  log: ['data','agente','esito']
};
const NOMI_TAB = {lead:'Lead', partner:'Partner', scadenze:'Scadenze', bozze:'Bozze', listino:'Listino', log:'Registro agenti', config:'Impostazioni'};

const CONFIG_DEFAULT = {
  MODALITA: 'APPROVA',            // APPROVA = gli agenti preparano, tu approvi con un clic · AUTO = inviano da soli entro il limite
  MAX_INVII_GIORNO: '15',
  LEAD_AL_GIORNO: '10',
  ZONE: 'Cassina de\' Pecchi, Gorgonzola, Melzo, Cernusco sul Naviglio, Pioltello, Segrate, Vimodrone, Bussero, Carugate, Pessano con Bornago, Vignate, Liscate, Pozzuolo Martesana, Inzago, Cassano d\'Adda, Truccazzano, Brugherio, Agrate Brianza, Vimercate',
  ORARI_CALL: 'dal lunedì al venerdì tra le 13:00 e le 14:00 oppure dopo le 18:30',
  SETTORI: 'logistica e magazzini, metalmeccanica, edilizia, ristorazione, commercio',
  TIPI_PARTNER: 'consulente del lavoro, commercialista, manutenzione estintori, agenzia per il lavoro',
  NOME_MITTENTE: 'Sara Santarelli - Santarelli Consulting',
  FIRMA: 'Sara Santarelli\nSantarelli Consulting\n388 126 0689 · consultingsantarelli.it',
  EMAIL_NOTIFICHE: '',
  AI_MODELLO: 'gemini-2.5-flash',
  CONTRAENTE: 'Santarelli Consulting di Sara Santarelli, P.IVA 01257820579',
  PAGAMENTO: 'Pagamento: 50% alla firma, saldo alla consegna, con bonifico bancario a 30 giorni data fattura.',
  FOCUS: 'Pacchetto Antincendio: valutazione del rischio incendio aggiornata ai decreti del 2021 (molte aziende hanno ancora documenti basati sul DM 10/03/1998, abrogato), piano di emergenza ed evacuazione, corso addetti antincendio',
  ATTIVO: 'SI'
};

const PROFILO = 'Santarelli Consulting (consultingsantarelli.it). Referente unico: Sara Santarelli, RSPP moduli A-B-C, formatrice qualificata (curriculum validato AIFES), addetta e formatrice antincendio rischio elevato, BLSD e primo soccorso. Esperienza in logistica, industria, cantieri, ristorazione, eventi e Protezione Civile. ' +
  'Servizi: RSPP esterno, DVR e valutazione dei rischi (D.Lgs. 81/08), formazione obbligatoria (lavoratori, preposti, datori di lavoro, RLS, emergenze, attrezzature), antincendio (valutazione rischio incendio, piano di emergenza, prove di evacuazione, corsi addetti), medicina del lavoro tramite rete di medici competenti, certificazioni ISO 9001/14001/45001 e UNI/PdR 125. ' +
  'Area: tutta Italia, presenza in Lombardia, Lazio, Abruzzo. Offerta d\'ingresso: verifica di conformità gratuita di 30 minuti con elenco delle scadenze a rischio.';
const REGOLE = 'Regole di scrittura obbligatorie: italiano professionale, diretto, senza enfasi. Niente allarmismo né minacce di sanzioni. Non inventare dati, clienti, testimonianze o numeri. Cita norme solo in modo generico (es. "D.Lgs. 81/08", "nuovo Accordo Stato-Regioni 2025 sulla formazione") senza durate o scadenze precise. Testo semplice, niente markdown. Non scrivere la firma: viene aggiunta automaticamente.';
const OPT_OUT = 'Se preferisce non ricevere altre comunicazioni, risponda NO e non la ricontatterò.';

/* ═════════════ INSTALLAZIONE ═════════════ */
function installa() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(TAB).forEach(k => {
    let sh = ss.getSheetByName(NOMI_TAB[k]);
    if (!sh) sh = ss.insertSheet(NOMI_TAB[k]);
    sh.getRange(1, 1, 1, TAB[k].length).setValues([TAB[k]]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange('A:Z').setNumberFormat('@');
  });
  let cfg = ss.getSheetByName(NOMI_TAB.config);
  if (!cfg) {
    cfg = ss.insertSheet(NOMI_TAB.config);
    cfg.getRange(1, 1, 1, 2).setValues([['Chiave', 'Valore']]).setFontWeight('bold');
    const me = Session.getActiveUser().getEmail();
    const rows = Object.keys(CONFIG_DEFAULT).map(k => [k, k === 'EMAIL_NOTIFICHE' ? me : CONFIG_DEFAULT[k]]);
    cfg.getRange(2, 1, rows.length, 2).setNumberFormat('@').setValues(rows);
  }
  const li = ss.getSheetByName(NOMI_TAB.listino);
  if (li.getLastRow() < 2) {
    const righe = [['Corso datore di lavoro','','a persona',''],['Corso lavoratori (generale + specifica)','','a persona',''],['Corso preposti','','a persona',''],['Aggiornamento lavoratori','','a persona',''],['Antincendio livello 2 (corso addetti)','','a persona',''],['Primo soccorso','','a persona',''],['Valutazione rischio incendio + piano di emergenza','','a sede',''],['DVR','','a sede','dipende da addetti e attività'],['RSPP esterno','','annuo',''],['Abbonamento Sicurezza (RSPP + scadenziario + aggiornamenti)','','mensile','']];
    li.getRange(2, 1, righe.length, 4).setValues(righe);
  }
  const s1 = ss.getSheets()[0];
  if (s1.getName().match(/^(Foglio|Sheet)\s?1$/) && s1.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(s1);
  impostaAutomatismi();
  scriviLog('Installazione', 'Fogli e automatismi pronti (versione ' + VERSIONE + ')');
  return 'Installazione completata';
}

function impostaAutomatismi() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('agenteMattino').timeBased().everyDays(1).atHour(6).create();
  ScriptApp.newTrigger('agenteInvii').timeBased().everyDays(1).atHour(9).create();
  ScriptApp.newTrigger('controllaRisposte').timeBased().everyHours(2).create();
  ScriptApp.newTrigger('riepilogoGiornaliero').timeBased().everyDays(1).atHour(12).nearMinute(30).create();
  ScriptApp.newTrigger('agenteAnalista').timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(17).create();
}

/* ═════════════ APP WEB ═════════════ */
function doGet() {
  return HtmlService.createTemplateFromFile('App').evaluate()
    .setTitle('Motore Clienti Santarelli')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

/* ═════════════ ARCHIVIO ═════════════ */
function foglio(k) {
  const sh = SpreadsheetApp.getActive().getSheetByName(NOMI_TAB[k]);
  if (!sh) throw new Error('Manca il foglio "' + NOMI_TAB[k] + '": esegui la funzione installa.');
  return sh;
}
function leggi(k) {
  const sh = foglio(k), n = sh.getLastRow();
  if (n < 2) return [];
  const h = TAB[k], vals = sh.getRange(2, 1, n - 1, h.length).getDisplayValues();
  return vals.filter(r => r[0]).map(r => { const o = {}; h.forEach((c, i) => o[c] = r[i]); return o; });
}
function salva(k, obj) {
  const sh = foglio(k), h = TAB[k], now = new Date().toISOString();
  obj = Object.assign({}, obj);
  if (k !== 'log' && k !== 'bozze') obj.updatedAt = now;
  if (!obj.id) { obj.id = Utilities.getUuid().slice(0, 8); if (k !== 'log' && k !== 'bozze') obj.createdAt = now; }
  const ids = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().map(r => r[0]) : [];
  const idx = ids.indexOf(String(obj.id));
  if (idx >= 0) {
    const cur = sh.getRange(idx + 2, 1, 1, h.length).getDisplayValues()[0];
    const row = h.map((c, i) => obj[c] !== undefined ? String(obj[c]) : cur[i]);
    sh.getRange(idx + 2, 1, 1, h.length).setValues([row]);
  } else {
    sh.appendRow(h.map(c => obj[c] !== undefined ? String(obj[c]) : ''));
  }
  return obj.id;
}
function elimina(k, id) {
  const sh = foglio(k), n = sh.getLastRow();
  if (n < 2) return;
  const ids = sh.getRange(2, 1, n - 1, 1).getDisplayValues().map(r => r[0]);
  const idx = ids.indexOf(String(id));
  if (idx >= 0) sh.deleteRow(idx + 2);
}
function config() {
  const sh = SpreadsheetApp.getActive().getSheetByName(NOMI_TAB.config);
  const c = Object.assign({}, CONFIG_DEFAULT);
  if (sh && sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 2).getDisplayValues().forEach(r => { if (r[0]) c[r[0]] = r[1]; });
  return c;
}
function scriviLog(agente, esito) {
  try { foglio('log').appendRow([new Date().toISOString().slice(0, 16).replace('T', ' '), agente, String(esito).slice(0, 500)]); } catch (e) {}
}
const oggi = () => Utilities.formatDate(new Date(), 'Europe/Rome', 'yyyy-MM-dd');
function piuGiorni(iso, n) { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return Utilities.formatDate(d, 'Europe/Rome', 'yyyy-MM-dd'); }
function giorniA(iso) { if (!iso) return null; return Math.round((new Date(iso + 'T12:00:00') - new Date(oggi() + 'T12:00:00')) / 864e5); }
function norm(s) { return String(s || '').toLowerCase().replace(/s\.?r\.?l\.?|s\.?p\.?a\.?|s\.?n\.?c\.?|[^a-z0-9]/g, ''); }

/* ═════════════ AI (Gemini) ═════════════ */
function chiaveAI() { return PropertiesService.getScriptProperties().getProperty('AI_KEY') || ''; }
function ai(prompt, conRicerca) {
  const key = chiaveAI();
  if (!key) throw new Error('Manca la chiave AI: aprila in Impostazioni e incollala.');
  const model = config().AI_MODELLO || 'gemini-2.5-flash';
  const body = { contents: [{ role: 'user', parts: [{ text: PROFILO + '\n\n' + REGOLE + '\n\n' + prompt }] }] };
  if (conRicerca) body.tools = [{ google_search: {} }];
  const res = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { 'x-goog-api-key': key }, payload: JSON.stringify(body)
  });
  const code = res.getResponseCode(), txt = res.getContentText();
  if (code !== 200) throw new Error('AI non disponibile (' + code + '): ' + txt.slice(0, 300));
  const j = JSON.parse(txt);
  const parts = (((j.candidates || [])[0] || {}).content || {}).parts || [];
  return parts.map(p => p.text || '').join('').trim();
}
function estraiJSON(t) {
  const m = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  const s = m ? m[1] : t.slice(t.indexOf('['), t.lastIndexOf(']') + 1);
  try { return JSON.parse(s); } catch (e) { return []; }
}
function separaOggetto(t) {
  const m = t.match(/^\s*Oggetto:\s*(.+)\n([\s\S]*)$/i);
  return m ? { oggetto: m[1].trim(), corpo: m[2].trim() } : { oggetto: 'Sicurezza sul lavoro: una verifica gratuita', corpo: t.trim() };
}

/* ═════════════ AGENTI ═════════════ */
function agenteMattino() {
  if (config().ATTIVO !== 'SI') return;
  const fasi = [controllaRimbalzi, controllaRisposte, agenteCercatore, agenteCercatorePartner, agenteRedattore, agenteRimandatore, agenteScadenziere];
  fasi.forEach(f => { try { f(); } catch (e) { scriviLog(f.name, 'Errore: ' + e.message); } });
}

/** Cercatore: trova aziende con un segnale di bisogno tramite ricerca Google (Gemini con Google Search). */
function agenteCercatore() {
  const c = config();
  const inCoda = leggi('lead').filter(l => l.stato === 'nuovo').length;
  const target = parseInt(c.LEAD_AL_GIORNO, 10) || 10;
  if (inCoda >= target * 2) { scriviLog('Cercatore', 'Coda piena (' + inCoda + ' da contattare): nessuna nuova ricerca'); return; }
  const prov = c.ZONE.split(',').map(s => s.trim()).filter(Boolean);
  const sett = c.SETTORI.split(',').map(s => s.trim()).filter(Boolean);
  const g = Math.floor(Date.now() / 864e5);
  const p = prov[g % prov.length], s = sett[Math.floor(g / prov.length) % sett.length];
  const prompt = 'Usa la ricerca Google. Trova fino a ' + target + ' aziende REALI con sede o stabilimento a ' + p + ' o nei comuni confinanti (zona est Milano / Martesana, massimo 15 km da Cassina de\' Pecchi), settore ' + s + ', da 5 a 150 dipendenti, che mostrano un SEGNALE di bisogno di sicurezza sul lavoro e in particolare di prevenzione incendi negli ultimi 3 mesi (magazzini, depositi, produzione, locali aperti al pubblico): annunci di lavoro attivi (nuovi assunti da formare), apertura di nuova sede o capannone, ampliamento, cantiere avviato. ' +
    'Per ognuna riporta solo dati pubblici trovati su fonti verificabili: email aziendale generica (info@, amministrazione@, ecc.) SOLO se compare sul sito ufficiale, altrimenti stringa vuota; mai email personali. ' +
    'Rispondi SOLO con un blocco ```json contenente un array di oggetti con chiavi: azienda, settore, provincia, sito, email, telefono, segnale (frase breve e concreta), fonte (URL dove hai visto il segnale), servizio (uno tra: Corso lavoratori, Corso preposti, Corso datore di lavoro, Antincendio (corso), Antincendio (VRI + piano emergenza), DVR, RSPP esterno). Non inventare aziende: se non trovi abbastanza risultati restituisci meno elementi.';
  const trovati = estraiJSON(ai(prompt, true));
  const esistenti = leggi('lead').map(l => norm(l.azienda));
  let n = 0;
  trovati.forEach(t => {
    if (!t || !t.azienda || esistenti.indexOf(norm(t.azienda)) >= 0) return;
    const ver = verificaEmail(t.sito, t.email);
    const email = ver ? ver.email : '';
    salva('lead', { azienda: t.azienda, settore: t.settore || s, provincia: t.provincia || p, sito: t.sito || '', email: email, emailVerificata: ver ? 'SI' : 'NO', fonteEmail: ver ? ver.fonte : '', telefono: t.telefono || '', segnale: t.segnale || '', fonte: t.fonte || '', servizio: t.servizio || '', canale: 'segnale', stato: 'nuovo', followups: '0',
      prossimaAzione: email ? 'Approva il primo messaggio' : 'Trova email o telefona', dataProssima: oggi() });
    esistenti.push(norm(t.azienda)); n++;
  });
  scriviLog('Cercatore', n + ' nuove aziende (' + s + ', ' + p + ')');
}

/** Verifica che l'email esista davvero sul sito ufficiale e che il dominio riceva posta. */
function verificaEmail(sito, emailProposta) {
  if (!sito) return null;
  let base = String(sito).trim(); if (!/^https?:\/\//i.test(base)) base = 'https://' + base;
  base = base.replace(/\/+$/, '');
  const pagine = [base, base + '/contatti', base + '/contatti/', base + '/contattaci', base + '/contact', base + '/chi-siamo'];
  const trovate = {};
  for (let i = 0; i < pagine.length; i++) {
    try {
      const r = UrlFetchApp.fetch(pagine[i], { muteHttpExceptions: true, followRedirects: true, validateHttpsCertificates: false });
      if (r.getResponseCode() !== 200) continue;
      const html = r.getContentText().replace(/&#64;|\[at\]|\(at\)/gi, '@');
      (html.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || []).forEach(e => { e = e.toLowerCase(); if (!/\.(png|jpe?g|gif|svg|webp)$/.test(e) && !/example|sentry|wixpress|domain\.com/.test(e)) trovate[e] = trovate[e] || pagine[i]; });
    } catch (e) {}
    if (Object.keys(trovate).length && i >= 1) break;
  }
  const lista = Object.keys(trovate);
  if (!lista.length) return null;
  const prop = String(emailProposta || '').toLowerCase().trim();
  const generiche = lista.filter(e => /^(info|amministrazione|segreteria|ufficio|commerciale|contatti|direzione|hr|personale|risorse\.?umane|qualita|sicurezza)[@.]/.test(e));
  const scelta = lista.indexOf(prop) >= 0 ? prop : (generiche[0] || '');
  if (!scelta) return null;
  if (!dominioRicevePosta(scelta.split('@')[1])) return null;
  return { email: scelta, fonte: trovate[scelta] };
}
function dominioRicevePosta(dom) {
  try {
    const r = UrlFetchApp.fetch('https://dns.google/resolve?type=MX&name=' + encodeURIComponent(dom), { muteHttpExceptions: true });
    const j = JSON.parse(r.getContentText());
    return !!(j.Answer && j.Answer.length);
  } catch (e) { return true; }
}
/** Rimbalzi: se un'email torna indietro, la scheda viene marcata e non si riscrive. */
function controllaRimbalzi() {
  const th = GmailApp.search('from:(mailer-daemon OR postmaster) newer_than:7d', 0, 30);
  const leads = leggi('lead'); let n = 0;
  th.forEach(t => t.getMessages().forEach(m => {
    const body = m.getPlainBody().toLowerCase();
    leads.forEach(l => { if (l.email && l.emailVerificata !== 'RIMBALZATA' && body.indexOf(l.email.toLowerCase()) >= 0) { salva('lead', { id: l.id, emailVerificata: 'RIMBALZATA', stato: l.stato === 'contattato' ? 'nuovo' : l.stato, prossimaAzione: 'Email non valida: telefona o trova un altro indirizzo', dataProssima: oggi() }); l.emailVerificata = 'RIMBALZATA'; n++; } });
  }));
  if (n) scriviLog('Rimbalzi', n + ' indirizzi non validi segnati');
}

/** Cercatore partner: il lunedì cerca studi e aziende che possono segnalare clienti. */
function agenteCercatorePartner(forza) {
  if (forza !== true && new Date().getDay() !== 1) return;
  const c = config();
  const prov = c.ZONE.split(',').map(s => s.trim()).filter(Boolean);
  const tipi = c.TIPI_PARTNER.split(',').map(s => s.trim()).filter(Boolean);
  const w = Math.floor(Date.now() / (7 * 864e5));
  const p = prov[w % prov.length], tipo = tipi[w % tipi.length];
  const prompt = 'Usa la ricerca Google. Trova fino a 8 ' + tipo + ' REALI (studi o aziende) a ' + p + ' o nei comuni vicini (est Milano / Martesana) che lavorano con piccole e medie imprese. Riporta solo dati pubblici dal sito ufficiale; email solo se generica e pubblicata sul sito, altrimenti stringa vuota. ' +
    'Rispondi SOLO con un blocco ```json con un array di oggetti: nome, tipo, citta, sito, email, telefono, fonte (URL). Non inventare.';
  const trovati = estraiJSON(ai(prompt, true));
  const esistenti = leggi('partner').map(x => norm(x.nome));
  let n = 0;
  trovati.forEach(t => {
    if (!t || !t.nome || esistenti.indexOf(norm(t.nome)) >= 0) return;
    const ver = verificaEmail(t.sito, t.email);
    const email = ver ? ver.email : '';
    const id = salva('partner', { nome: t.nome, tipo: t.tipo || tipo, citta: t.citta || p, sito: t.sito || '', email: email, telefono: t.telefono || '', fonte: t.fonte || '', stato: 'da contattare', segnalate: '0', prossimaAzione: email ? 'Approva la proposta' : 'Telefona allo studio', dataProssima: oggi() });
    if (email) creaBozzaPartner(id);
    esistenti.push(norm(t.nome)); n++;
  });
  scriviLog('Cercatore partner', n + ' nuovi partner (' + tipo + ', ' + p + ')');
}

function haBozzaAperta(rifId, tipo) { return leggi('bozze').some(b => b.rifId === rifId && b.tipo === tipo && b.stato === 'da approvare'); }

/** Redattore: scrive il primo messaggio per ogni azienda nuova con email. */
function agenteRedattore() {
  let n = 0;
  leggi('lead').filter(l => l.stato === 'nuovo' && l.email && l.emailVerificata !== 'NO').forEach(l => {
    if (haBozzaAperta(l.id, 'primo') || n >= 15) return;
    try { creaBozzaLead(l, 'primo'); n++; } catch (e) { scriviLog('Redattore', l.azienda + ': ' + e.message); }
  });
  scriviLog('Redattore', n + ' primi messaggi preparati');
}

function creaBozzaLead(l, tipo) {
  const ctx = 'Azienda: ' + l.azienda + '. Settore: ' + (l.settore || 'n.d.') + '. Provincia: ' + (l.provincia || 'n.d.') + '. Servizio probabile: ' + (l.servizio || 'n.d.') + '. Segnale di bisogno: ' + (l.segnale || 'nessuno') + '. Note: ' + (l.note || 'nessuna') + '.';
  const P = {
    primo: 'Scrivi la PRIMA email a questa azienda (massimo 90 parole). Apri citando il segnale di bisogno in modo naturale (se manca, il settore). Prodotto da proporre: ' + config().FOCUS + '. Offri un controllo gratuito del documento antincendio attuale (ci mandano la loro valutazione e diciamo in 48 ore se è aggiornata). Una sola domanda finale. Formato: prima riga "Oggetto: ...", poi il corpo.',
    followup1: 'Scrivi un FOLLOW-UP breve (massimo 60 parole) a una email inviata qualche giorno fa senza risposta. Aggiungi un elemento utile nuovo: lo scadenziario gratuito della formazione (l\'azienda manda gli attestati e riceve il calendario delle scadenze). Formato: "Oggetto: ..." poi corpo.',
    followup2: 'Scrivi un ULTIMO messaggio cortese (massimo 45 parole): chiudi il contatto lasciando la porta aperta e il numero di telefono. Formato: "Oggetto: ..." poi corpo.'
  };
  const sep = separaOggetto(ai(ctx + '\n\n' + P[tipo], false));
  return salva('bozze', { rifTipo: 'lead', rifId: l.id, tipo: tipo, a: l.email, oggetto: sep.oggetto, corpo: sep.corpo, stato: 'da approvare', creata: oggi() });
}

function creaBozzaPartner(id) {
  const p = leggi('partner').filter(x => x.id === id)[0];
  if (!p || !p.email || haBozzaAperta(id, 'partner')) return;
  const sep = separaOggetto(ai('Partner: ' + p.nome + ', tipo ' + p.tipo + ', città ' + p.citta + '.\n\nScrivi un\'email di PROPOSTA DI COLLABORAZIONE a questo professionista (massimo 110 parole). Spiega il vantaggio per i SUOI clienti e per lui: servizio complementare sulla sicurezza sul lavoro, lui resta il riferimento del cliente, collaborazione da definire insieme (segnalazioni reciproche). Chiedi una call di 20 minuti. Formato: "Oggetto: ..." poi corpo.', false));
  salva('bozze', { rifTipo: 'partner', rifId: id, tipo: 'partner', a: p.email, oggetto: sep.oggetto, corpo: sep.corpo, stato: 'da approvare', creata: oggi() });
}

/** Rimandatore: follow-up a +3 e +7 giorni, poi chiude. */
function agenteRimandatore() {
  let n = 0, chiusi = 0;
  leggi('lead').filter(l => l.stato === 'contattato' && l.email).forEach(l => {
    const gg = -giorniA(l.dataUltimoContatto || l.dataPrimoContatto);
    const f = parseInt(l.followups || '0', 10);
    if (f === 0 && gg >= 3 && !haBozzaAperta(l.id, 'followup1')) { creaBozzaLead(l, 'followup1'); n++; }
    else if (f === 1 && gg >= 4 && !haBozzaAperta(l.id, 'followup2')) { creaBozzaLead(l, 'followup2'); n++; }
    else if (f >= 2 && gg >= 7) { salva('lead', { id: l.id, stato: 'perso', prossimaAzione: 'Nessuna risposta dopo 3 messaggi', dataProssima: '' }); chiusi++; }
  });
  scriviLog('Rimandatore', n + ' follow-up preparati, ' + chiusi + ' schede chiuse');
}

/** Scadenziere: proposte di rinnovo a 90 giorni dalla scadenza. */
function agenteScadenziere() {
  let n = 0;
  leggi('scadenze').filter(s => s.stato !== 'rinnovato' && s.propostaInviata !== 'SI').forEach(s => {
    const g = giorniA(s.dataScadenza);
    if (g === null || g > 90) return;
    if (!s.email) { salva('scadenze', { id: s.id, note: (s.note || '') + ' [manca email per la proposta]' }); return; }
    if (haBozzaAperta(s.id, 'rinnovo')) return;
    const sep = separaOggetto(ai('Cliente già servito: ' + s.cliente + '. Adempimento in scadenza: ' + s.adempimento + ' il ' + s.dataScadenza + '. Persone: ' + (s.persone || 'n.d.') + '.\n\nScrivi un\'email breve (massimo 90 parole) per proporre il rinnovo prima della scadenza, con 2 possibili date e la possibilità di unire altri aggiornamenti. Formato: "Oggetto: ..." poi corpo.', false));
    salva('bozze', { rifTipo: 'scadenze', rifId: s.id, tipo: 'rinnovo', a: s.email, oggetto: sep.oggetto, corpo: sep.corpo, stato: 'da approvare', creata: oggi() });
    n++;
  });
  scriviLog('Scadenziere', n + ' proposte di rinnovo preparate');
}

/** Invii: in modalità AUTO invia le bozze entro il limite giornaliero. */
function agenteInvii() {
  const c = config();
  if (c.ATTIVO !== 'SI' || c.MODALITA !== 'AUTO') return;
  const ids = leggi('bozze').filter(b => b.stato === 'da approvare' && b.richiedeApprovazione !== 'SI').map(b => b.id);
  let n = 0;
  ids.forEach(id => { if (inviatiOggi() < parseInt(c.MAX_INVII_GIORNO, 10)) { if (inviaBozza(id)) n++; } });
  scriviLog('Invii automatici', n + ' email inviate');
}
function inviatiOggi() { return leggi('bozze').filter(b => b.stato === 'inviata' && b.inviata === oggi()).length; }

function inviaBozza(id, testoModificato, oggettoModificato) {
  const c = config();
  const b = leggi('bozze').filter(x => x.id === id)[0];
  if (!b || b.stato !== 'da approvare') return false;
  if (inviatiOggi() >= parseInt(c.MAX_INVII_GIORNO, 10)) throw new Error('Limite di ' + c.MAX_INVII_GIORNO + ' invii al giorno raggiunto: le altre partono domani.');
  const corpo0 = testoModificato || b.corpo, oggetto = oggettoModificato || b.oggetto;
  const freddo = b.rifTipo === 'lead' && b.tipo !== 'vendita';
  const corpo = corpo0 + '\n\n' + c.FIRMA + (freddo ? '\n\n' + OPT_OUT : '');
  const opz = { name: c.NOME_MITTENTE };
  try {
    let threadId = '';
    let rif = null;
    if (b.rifTipo === 'lead') rif = leggi('lead').filter(l => l.id === b.rifId)[0];
    if (b.allegato) { try { opz.attachments = [DriveApp.getFileById(b.allegato).getAs('application/pdf')]; } catch (e) { throw new Error('Contratto allegato non trovato: ' + e.message); } }
    if (rif && rif.threadId && (b.tipo.indexOf('followup') === 0 || b.tipo === 'vendita')) {
      const th = GmailApp.getThreadById(rif.threadId);
      const msgs = th.getMessages();
      msgs[msgs.length - 1].createDraftReplyAll(corpo, opz).send();
      threadId = rif.threadId;
    } else {
      const msg = GmailApp.createDraft(b.a, oggetto, corpo, opz).send();
      threadId = msg.getThread().getId();
    }
    salva('bozze', { id: id, stato: 'inviata', inviata: oggi(), oggetto: oggetto, corpo: corpo0 });
    aggiornaDopoInvio(b, threadId);
    return true;
  } catch (e) {
    salva('bozze', { id: id, errore: e.message });
    throw e;
  }
}
function aggiornaDopoInvio(b, threadId) {
  const t = oggi();
  if (b.rifTipo === 'lead') {
    const l = leggi('lead').filter(x => x.id === b.rifId)[0]; if (!l) return;
    const up = { id: l.id, dataUltimoContatto: t, threadId: threadId || l.threadId };
    if (b.tipo === 'primo') Object.assign(up, { stato: 'contattato', dataPrimoContatto: t, followups: '0', prossimaAzione: 'Attendi risposta (follow-up automatico tra 3 giorni)', dataProssima: piuGiorni(t, 3) });
    else if (b.tipo === 'vendita') Object.assign(up, { stato: b.azione === 'preventivo' ? 'preventivo' : b.azione === 'call' ? 'call' : 'risposto', prossimaAzione: b.azione === 'preventivo' ? 'Attendi firma del contratto' : 'Attendi risposta', dataProssima: piuGiorni(t, 3) });
    else Object.assign(up, { followups: String(parseInt(l.followups || '0', 10) + 1), prossimaAzione: 'Attendi risposta', dataProssima: piuGiorni(t, 4) });
    salva('lead', up);
  } else if (b.rifTipo === 'partner') {
    salva('partner', { id: b.rifId, stato: 'contattato', threadId: threadId, prossimaAzione: 'Telefona se non risponde', dataProssima: piuGiorni(t, 4) });
  } else if (b.rifTipo === 'scadenze') {
    salva('scadenze', { id: b.rifId, propostaInviata: 'SI' });
  }
}

/** Controlla le risposte nelle conversazioni Gmail e passa la trattativa al Venditore. */
function mittente(m) { return ((m.getFrom().match(/<([^>]+)>/) || [, m.getFrom()])[1] || '').toLowerCase().trim(); }
function pulisci(t) { return String(t || '').split(/\n\s*>|\nIl .* ha scritto:|\nOn .* wrote:|\n-{2,}\s*Messaggio originale/)[0].trim(); }
function controllaRisposte() {
  const io = [Session.getEffectiveUser().getEmail()].concat(GmailApp.getAliases()).map(x => x.toLowerCase());
  const avvisi = []; let esclusi = 0;
  leggi('lead').filter(l => l.threadId && ['contattato','risposto','call','preventivo'].indexOf(l.stato) >= 0).forEach(l => {
    let th; try { th = GmailApp.getThreadById(l.threadId); } catch (e) { return; }
    if (!th) return;
    const msgs = th.getMessages(), altri = msgs.filter(m => io.indexOf(mittente(m)) < 0);
    const visti = parseInt(l.msgVisti || '0', 10);
    if (altri.length <= visti) return;
    const testo = pulisci(altri[altri.length - 1].getPlainBody());
    leggi('bozze').filter(b => b.rifId === l.id && b.stato === 'da approvare').forEach(b => salva('bozze', { id: b.id, stato: 'scartata', errore: 'Superata da una nuova risposta' }));
    if (/^\s*no\b/i.test(testo) || /non (mi|ci) (contatt|scriv)|cancellat|rimuov|non (siamo|sono) interessat/i.test(testo)) {
      salva('lead', { id: l.id, stato: 'perso', msgVisti: String(altri.length), ultimaRisposta: testo.slice(0, 1000), prossimaAzione: 'Non interessato / non ricontattare', dataProssima: '' }); esclusi++; return;
    }
    salva('lead', { id: l.id, stato: l.stato === 'contattato' ? 'risposto' : l.stato, msgVisti: String(altri.length), ultimaRisposta: testo.slice(0, 1000) });
    const conversazione = msgs.slice(-6).map(m => (io.indexOf(mittente(m)) >= 0 ? 'NOI: ' : 'CLIENTE: ') + pulisci(m.getPlainBody()).slice(0, 1200)).join('\n\n');
    let esito = '';
    try { esito = agenteVenditore(leggi('lead').filter(x => x.id === l.id)[0], conversazione); } catch (e) { esito = 'Venditore non disponibile: ' + e.message; }
    avvisi.push(l.azienda + ' ha risposto: "' + testo.slice(0, 200) + '"\n→ ' + esito);
  });
  leggi('partner').filter(p => p.threadId && p.stato === 'contattato').forEach(p => {
    let th; try { th = GmailApp.getThreadById(p.threadId); } catch (e) { return; }
    const altri = th ? th.getMessages().filter(m => io.indexOf(mittente(m)) < 0) : [];
    if (!altri.length) return;
    salva('partner', { id: p.id, stato: 'ha risposto', prossimaAzione: 'Fissa la call con il partner', dataProssima: oggi() });
    avvisi.push('PARTNER ' + p.nome + ': ' + pulisci(altri[altri.length - 1].getPlainBody()).slice(0, 200));
  });
  if (config().MODALITA === 'AUTO') leggi('bozze').filter(b => b.stato === 'da approvare' && b.tipo === 'vendita' && b.richiedeApprovazione !== 'SI').forEach(b => { try { inviaBozza(b.id); } catch (e) {} });
  if (avvisi.length) GmailApp.sendEmail(config().EMAIL_NOTIFICHE || Session.getEffectiveUser().getEmail(), 'Motore Clienti: ' + avvisi.length + ' trattative in movimento', avvisi.join('\n\n') + '\n\nApri il Motore Clienti: ' + ScriptApp.getService().getUrl());
  scriviLog('Risposte', avvisi.length + ' risposte gestite, ' + esclusi + ' esclusioni');
}

function listinoTesto() {
  return leggi('listino').map(r => '- ' + r.servizio + ': ' + (r.prezzo ? r.prezzo + ' € + IVA ' + (r.unita || '') : 'PREZZO NON IMPOSTATO') + (r.note ? ' (' + r.note + ')' : '')).join('\n');
}

/** Venditore: conduce la trattativa via email fino al preventivo e al contratto. */
function agenteVenditore(l, conversazione) {
  const c = config();
  const prompt = 'Sei il commerciale di Santarelli Consulting e conduci la trattativa via email con questa azienda. Obiettivo: arrivare a un contratto firmato nel minor numero di scambi, senza pressioni.\n' +
    'Azienda: ' + l.azienda + ' (' + (l.settore || '') + ', ' + (l.provincia || '') + '). Segnale: ' + (l.segnale || 'n.d.') + '. Servizio probabile: ' + (l.servizio || 'n.d.') + '. Fase attuale: ' + l.stato + '. Note: ' + (l.note || '') + '\n\n' +
    'LISTINO (usa SOLO questi prezzi, mai inventarne):\n' + listinoTesto() + '\n\n' +
    'Sara lavora come dipendente 9-18: se serve una call proponi solo ' + c.ORARI_CALL + '. Preferisci chiudere per email. Un DVR o una valutazione incendio richiedono un sopralluogo: in quel caso proponi il sopralluogo come primo passo.\n\n' +
    'CONVERSAZIONE (ultimi messaggi):\n' + conversazione + '\n\n' +
    'Decidi la mossa migliore e rispondi SOLO con un blocco ```json con un oggetto: {"azione": uno tra "domande" (mancano dati: chiedi al massimo 3 cose: numero addetti, cosa è già in regola, scadenze), "call" (proponi 2 orari), "preventivo" (hai abbastanza dati e i prezzi del servizio sono nel listino), "accettato" (il cliente ha accettato il preventivo), "chiudi" (non interessato), ' +
    '"oggetto": "Re: ...", "corpo": testo della risposta senza firma (massimo 140 parole; per "preventivo" includi le voci con quantità e prezzi dal listino, totale + IVA, cosa è incluso, tempi, e scrivi che in allegato c\'è il contratto d\'incarico da firmare), "servizio": "...", "voci": [{"descrizione":"...","quantita":1,"prezzoUnitario":0}], "totale": 0, "notaPerSara": "cosa deve sapere Sara in una riga"}. ' +
    'Se il servizio richiesto non ha prezzo nel listino, NON scegliere "preventivo": scegli "domande" e scrivi in notaPerSara quale prezzo manca.';
  const r = (estraiJSON('[' + (ai(prompt, false).match(/\{[\s\S]*\}/) || ['{}'])[0] + ']') || [])[0] || {};
  const az = r.azione || 'domande';
  if (az === 'chiudi') { salva('lead', { id: l.id, stato: 'perso', prossimaAzione: 'Non interessato', dataProssima: '' }); return 'chiusa come non interessata'; }
  if (az === 'accettato') {
    salva('lead', { id: l.id, stato: 'preventivo', prossimaAzione: 'HA ACCETTATO: firma il contratto e rimandalo controfirmato', dataProssima: oggi() });
    return 'HA ACCETTATO il preventivo. Firma il contratto ricevuto e segna la scheda come "Contratto firmato". ' + (r.notaPerSara || '');
  }
  let allegato = '';
  if (az === 'preventivo') {
    allegato = creaContratto(l, r);
  }
  salva('bozze', { rifTipo: 'lead', rifId: l.id, tipo: 'vendita', a: l.email, oggetto: r.oggetto || 'Re: sicurezza sul lavoro', corpo: (r.corpo || '').trim(), stato: 'da approvare', creata: oggi(), azione: az, allegato: allegato,
    richiedeApprovazione: az === 'preventivo' ? 'SI' : 'NO', errore: r.notaPerSara || '' });
  salva('lead', { id: l.id, prossimaAzione: az === 'preventivo' ? 'Controlla preventivo e contratto, poi approva' : 'Risposta pronta (' + az + ')', dataProssima: oggi(), servizio: r.servizio || l.servizio, valore: r.totale ? String(r.totale) : l.valore });
  return az === 'preventivo' ? 'preventivo e contratto pronti da approvare (' + (r.totale || '?') + ' € + IVA)' : 'risposta pronta (' + az + ')' + (r.notaPerSara ? '. Nota: ' + r.notaPerSara : '');
}

/** Crea il contratto d'incarico in Google Documenti dal modello. Restituisce l'id del documento. */
function creaContratto(l, r) {
  const c = config();
  const voci = (r.voci || []).map(v => '- ' + v.descrizione + ' · quantità ' + v.quantita + ' · ' + v.prezzoUnitario + ' € + IVA cad.').join('\n') || '- ' + (r.servizio || l.servizio);
  const doc = DocumentApp.create('Contratto ' + l.azienda + ' ' + oggi());
  const b = doc.getBody();
  b.appendParagraph('CONTRATTO DI INCARICO PROFESSIONALE').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  b.appendParagraph('Tra ' + c.CONTRAENTE + ' (di seguito "Consulente")\ne ' + l.azienda + (l.sito ? ' (' + l.sito + ')' : '') + ', sede: ____________________, P.IVA ____________________, in persona del legale rappresentante ____________________ (di seguito "Cliente").');
  b.appendParagraph('1. Oggetto').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendParagraph('Il Cliente affida al Consulente le seguenti prestazioni in materia di salute e sicurezza sul lavoro (D.Lgs. 81/08):\n' + voci);
  b.appendParagraph('2. Corrispettivo e pagamento').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendParagraph('Corrispettivo complessivo: ' + (r.totale || '______') + ' € oltre IVA. ' + c.PAGAMENTO);
  b.appendParagraph('3. Tempi e modalità').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendParagraph('Le attività iniziano entro 15 giorni dalla firma, in date concordate. Il Cliente fornisce le informazioni e l\'accesso ai luoghi necessari. Per formazione: attestati rilasciati al superamento della verifica finale.');
  b.appendParagraph('4. Durata e recesso').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendParagraph('Per prestazioni una tantum il contratto termina con la consegna. Per servizi continuativi durata 12 mesi, con recesso scritto con 30 giorni di preavviso.');
  b.appendParagraph('5. Riservatezza e dati personali').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  b.appendParagraph('Le parti trattano i dati personali nel rispetto del Regolamento UE 2016/679. Il Consulente mantiene riservate le informazioni del Cliente.');
  b.appendParagraph('Data ____________\n\nIl Consulente ____________________\t\tIl Cliente (timbro e firma) ____________________');
  doc.saveAndClose();
  return doc.getId();
}

/** Riepilogo delle 12:30: cosa approvare oggi. */
function riepilogoGiornaliero() {
  const c = config(); if (c.ATTIVO !== 'SI') return;
  const bozze = leggi('bozze').filter(b => b.stato === 'da approvare');
  const az = azioniOggi();
  if (!bozze.length && !az.length) return;
  const url = ScriptApp.getService().getUrl();
  const txt = 'Oggi ti servono circa ' + Math.max(5, Math.min(20, bozze.length + az.length * 2)) + ' minuti.\n\n' +
    (bozze.length ? bozze.length + ' email pronte da approvare (' + (c.MODALITA === 'AUTO' ? 'partono da sole domani alle 9 se non le scarti' : 'partono quando premi Approva') + ').\n' : '') +
    (az.length ? '\nAzioni in scadenza:\n' + az.slice(0, 10).map(a => '- ' + a.t + ': ' + a.d).join('\n') + '\n' : '') +
    '\nApri il Motore Clienti: ' + url;
  GmailApp.sendEmail(c.EMAIL_NOTIFICHE || Session.getEffectiveUser().getEmail(), 'Motore Clienti · oggi: ' + bozze.length + ' email da approvare', txt);
}

/** Analista del venerdì: report e 3 correzioni. */
function agenteAnalista() {
  const st = statistiche();
  let testo;
  try {
    testo = ai('Sei l\'analista commerciale. Dati della settimana: ' + JSON.stringify(st) + '. Obiettivo: 1 contratto a settimana. Dai una diagnosi in 2 righe e poi esattamente 3 azioni per la prossima settimana, ognuna con numero e tempo stimato. Se i dati sono pochi dillo e indica cosa misurare.', false);
  } catch (e) { testo = 'Analisi AI non disponibile: ' + e.message; }
  GmailApp.sendEmail(config().EMAIL_NOTIFICHE || Session.getEffectiveUser().getEmail(), 'Motore Clienti · report del venerdì', testo + '\n\nNumeri: ' + JSON.stringify(st, null, 1) + '\n\n' + ScriptApp.getService().getUrl());
  scriviLog('Analista', 'Report inviato');
}

/* ═════════════ CALCOLI ═════════════ */
function inizioSettimana() { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return Utilities.formatDate(d, 'Europe/Rome', 'yyyy-MM-dd'); }
function statistiche() {
  const L = leggi('lead'), P = leggi('partner'), B = leggi('bozze'), ws = inizioSettimana();
  const fasi = {}; ['nuovo','contattato','risposto','call','preventivo','contratto','perso'].forEach(f => fasi[f] = 0);
  L.forEach(l => fasi[l.stato || 'nuovo'] = (fasi[l.stato || 'nuovo'] || 0) + 1);
  return {
    fasi: fasi,
    contrattiSettimana: L.filter(l => l.stato === 'contratto' && (l.dataContratto || '') >= ws).length,
    emailInviateSettimana: B.filter(b => b.stato === 'inviata' && (b.inviata || '') >= ws).length,
    risposteSettimana: L.filter(l => ['risposto','call','preventivo','contratto'].indexOf(l.stato) >= 0 && (l.updatedAt || '').slice(0, 10) >= ws).length,
    partnerAttivi: P.filter(p => p.stato === 'attivo').length,
    partnerTotali: P.length,
    valoreFirmato: L.filter(l => l.stato === 'contratto').reduce((a, l) => a + (parseFloat(l.valore) || 0), 0),
    bozzeDaApprovare: B.filter(b => b.stato === 'da approvare').length
  };
}
function azioniOggi() {
  const t = oggi(), out = [];
  leggi('lead').forEach(l => { if (l.dataProssima && l.dataProssima <= t && ['contratto','perso','contattato'].indexOf(l.stato) < 0) out.push({ tipo: 'lead', id: l.id, t: l.azienda, d: l.prossimaAzione || 'Prossima azione' }); });
  leggi('partner').forEach(p => { if (p.dataProssima && p.dataProssima <= t && ['chiuso','contattato'].indexOf(p.stato) < 0) out.push({ tipo: 'partner', id: p.id, t: p.nome, d: p.prossimaAzione || 'Ricontatta' }); });
  leggi('scadenze').forEach(s => { const g = giorniA(s.dataScadenza); if (g !== null && g <= 30 && s.stato !== 'rinnovato') out.push({ tipo: 'scadenza', id: s.id, t: s.cliente + ' · ' + s.adempimento, d: g < 0 ? 'Scaduto da ' + (-g) + ' giorni' : 'Scade tra ' + g + ' giorni' }); });
  return out;
}

/* ═════════════ API PER L'APP WEB ═════════════ */
function api_carica() {
  const c = config();
  return { lead: leggi('lead'), partner: leggi('partner'), scadenze: leggi('scadenze'), bozze: leggi('bozze').filter(b => b.stato === 'da approvare'), log: leggi('log').slice(-30).reverse(),
    stat: statistiche(), azioni: azioniOggi(), listino: leggi('listino'), config: c, haChiave: !!chiaveAI(), inviatiOggi: inviatiOggi(), url: ScriptApp.getService().getUrl() };
}
function api_salva(k, obj) {
  if (['lead','partner','scadenze'].indexOf(k) < 0) throw new Error('Archivio non valido');
  if (k === 'lead' && obj.stato === 'contratto' && !obj.dataContratto) obj.dataContratto = oggi();
  const id = salva(k, obj);
  if (k === 'lead' && obj.stato === 'nuovo' && obj.email) { try { const l = leggi('lead').filter(x => x.id === id)[0]; if (!haBozzaAperta(id, 'primo')) creaBozzaLead(l, 'primo'); } catch (e) {} }
  if (k === 'partner' && obj.email && (obj.stato || 'da contattare') === 'da contattare') { try { creaBozzaPartner(id); } catch (e) {} }
  return api_carica();
}
function api_elimina(k, id) { if (['lead','partner','scadenze'].indexOf(k) < 0) throw new Error('Archivio non valido'); elimina(k, id); return api_carica(); }
function api_approva(id, oggetto, corpo) { inviaBozza(id, corpo, oggetto); return api_carica(); }
function api_approvaTutte() {
  const ids = leggi('bozze').filter(b => b.stato === 'da approvare').map(b => b.id);
  let n = 0, err = '';
  for (let i = 0; i < ids.length; i++) { try { if (inviaBozza(ids[i])) n++; } catch (e) { err = e.message; break; } }
  const r = api_carica(); r.messaggio = n + ' email inviate' + (err ? '. ' + err : ''); return r;
}
function api_scarta(id) { salva('bozze', { id: id, stato: 'scartata' }); return api_carica(); }
function api_esegui(agente) {
  const mappa = { cercatore: agenteCercatore, partner: agenteCercatorePartnerOra, redattore: agenteRedattore, rimandatore: agenteRimandatore, scadenziere: agenteScadenziere, risposte: controllaRisposte, analista: agenteAnalista };
  if (!mappa[agente]) throw new Error('Agente sconosciuto');
  mappa[agente]();
  return api_carica();
}
function agenteCercatorePartnerOra() { agenteCercatorePartner(true); }
function api_scrivi(tipo, id) {
  const l = leggi('lead').filter(x => x.id === id)[0];
  if (!l) throw new Error('Scheda non trovata');
  const ctx = 'Azienda: ' + l.azienda + '. Settore: ' + (l.settore || 'n.d.') + '. Referente: ' + (l.contatto || 'n.d.') + '. Servizio: ' + (l.servizio || 'n.d.') + '. Segnale: ' + (l.segnale || 'n.d.') + '. Note e appunti: ' + (l.note || 'nessuno') + '.';
  const P = {
    telefono: 'Scrivi uno SCRIPT TELEFONATA di massimo 45 secondi: apertura, motivo legato al segnale, una domanda di qualificazione, proposta di 2 orari per una call di 20 minuti, risposte alle obiezioni "abbiamo già un RSPP" e "non ho tempo".',
    linkedin: 'Scrivi un messaggio di collegamento LinkedIn (massimo 280 caratteri) al referente, senza vendere.',
    preventivo: 'Scrivi una PROPOSTA COMMERCIALE in testo semplice basata sulle note: Situazione emersa, Cosa proponiamo, Cosa è incluso, Tempi, Investimento (scrivi [PREZZO] dove manca il dato, non inventare), Prossimo passo con una data proposta.'
  };
  if (!P[tipo]) throw new Error('Tipo non valido');
  return ai(ctx + '\n\n' + P[tipo], false);
}
function api_impostazioni(cfg, chiave) {
  const sh = SpreadsheetApp.getActive().getSheetByName(NOMI_TAB.config);
  const vals = sh.getRange(2, 1, Math.max(1, sh.getLastRow() - 1), 2).getDisplayValues();
  Object.keys(cfg || {}).forEach(k => {
    if (!(k in CONFIG_DEFAULT)) return;
    const i = vals.findIndex(r => r[0] === k);
    if (i >= 0) sh.getRange(i + 2, 2).setValue(String(cfg[k])); else sh.appendRow([k, String(cfg[k])]);
  });
  if (chiave) PropertiesService.getScriptProperties().setProperty('AI_KEY', String(chiave).trim());
  return api_carica();
}
function api_listino(righe) {
  const sh = foglio('listino');
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 4).clearContent();
  const v = (righe || []).filter(r => r.servizio).map(r => [r.servizio, String(r.prezzo || ''), r.unita || '', r.note || '']);
  if (v.length) sh.getRange(2, 1, v.length, 4).setValues(v);
  return api_carica();
}
function api_contrattoUrl(id) { return 'https://docs.google.com/document/d/' + id + '/edit'; }
function api_provaAI() { return ai('Rispondi solo con: "Collegamento AI funzionante."', false); }
