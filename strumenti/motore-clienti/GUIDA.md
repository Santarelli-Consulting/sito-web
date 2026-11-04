# Motore Clienti su Google: installazione (15 minuti, una volta sola)

Fai tutto con l'account **consulting.santarelli@gmail.com**: le email partiranno da lì.

1. Apri **sheets.new** e chiama il foglio `Motore Clienti`.
2. Menu **Estensioni → Apps Script**.
3. Nel file `Codice.gs` cancella tutto e incolla il contenuto di **Codice.gs** (qui su GitHub: pulsante "Copy raw file").
4. Clicca **+** accanto a "File" → **HTML** → chiamalo `App` (senza .html) → cancella tutto e incolla **App.html**.
5. Premi 💾 Salva. In alto scegli la funzione **installa** → **Esegui**.
   Google chiede l'autorizzazione: *Rivedi autorizzazioni → scegli l'account → Avanzate → Vai a Motore Clienti (non sicuro) → Consenti*. È normale per gli script personali.
6. **Esegui il deployment → Nuovo deployment** → ingranaggio → **App web**.
   Esegui come: **Me** · Chi ha accesso: **Solo io** → **Esegui il deployment**. Copia il link dell'app web.
7. Apri il link. Su PC: aggiungilo ai preferiti. Su telefono: menu del browser → **Aggiungi a schermata Home**.
8. Crea la chiave AI gratuita su **aistudio.google.com** (stesso account) → *Get API key* → incollala nell'app in **Impostazioni** → **Salva chiave** → **Prova**.
9. In **Agenti** premi **Esegui ora** sul *Cercatore*: le prime aziende arrivano in Pipeline e le prime email in *Oggi*.

## Cosa succede da solo ogni giorno
| Ora | Agente |
|---|---|
| 06:00 | Legge risposte, cerca aziende (e partner il lunedì), scrive primi messaggi e follow-up, prepara rinnovi |
| 09:00 | In modalità Automatica invia le email (massimo 15 al giorno) |
| ogni 2 ore | Legge le risposte in Gmail, ti avvisa, esclude chi scrive NO |
| 12:30 | Ti manda il riepilogo: cosa approvare oggi |
| venerdì 17:00 | Report della settimana con 3 correzioni |

## Se aggiorni il codice
Incolla i nuovi file, salva, poi **Esegui il deployment → Gestisci deployment → Modifica → Versione: Nuova → Esegui il deployment**.
