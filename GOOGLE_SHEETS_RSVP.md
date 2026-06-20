# Confirmation de présence → Google Sheets (Apps Script)

Le formulaire « Confirmer votre présence » de l'invitation envoie les réponses
directement dans un Google Sheet, via un **Google Apps Script** déployé en
application web. Aucune redirection, aucune nouvelle page, aucun WhatsApp,
aucun Formspree : tout se passe dans l'invitation.

## Endpoint utilisé

```txt
https://script.google.com/macros/s/AKfycbxz0sdWGw5ZYeI95d-z_epTivlAit6rz2Nx4YY6ROKYnJAHLLGCP5KyWPwAqsYUCcYo/exec
```

Configuré dans [`src/config/invitationConfig.ts`](src/config/invitationConfig.ts) :

```ts
rsvp: {
  enabled: true,
  deadline: "1er juillet 2026",
  provider: "google-sheets",
  endpoint: "https://script.google.com/macros/s/AKfycbxz0sdWGw5ZYeI95d-z_epTivlAit6rz2Nx4YY6ROKYnJAHLLGCP5KyWPwAqsYUCcYo/exec",
}
```

Google Sheet associé (pour information) :

```txt
https://docs.google.com/spreadsheets/d/10dDHhgU7hDXJvn_liT2UWWNGf6PYinEuwiBP27VLPTE/edit?gid=0#gid=0
```

## Comment fonctionne l'envoi (côté site)

Dans [`src/components/RSVPForm.tsx`](src/components/RSVPForm.tsx) :

- au clic sur **« Envoyer ma réponse »**, le bouton est désactivé et affiche
  « Envoi en cours… » (état de chargement, anti double-envoi) ;
- les données sont envoyées en `POST` avec `fetch()` :

```ts
await fetch(invitationConfig.rsvp.endpoint, {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify(payload),
});
```

- `mode: "no-cors"` + `Content-Type: text/plain` = requête « simple » qui évite
  le pré-vol CORS bloquant d'Apps Script. La réponse est **opaque** : on ne lit
  donc pas `response.json()` ;
- si le `fetch()` se résout sans erreur réseau → message de succès
  **« Merci, votre réponse a bien été envoyée. »** ;
- en cas d'erreur réseau → **« Une erreur est survenue. Merci de réessayer dans
  quelques instants. »**

### Données envoyées (payload)

```ts
const payload = {
  nomPrenom,   // obligatoire
  presence,    // obligatoire : "Présent(e)" ou "Absent(e)"
  adultes,     // optionnel
  enfants,     // optionnel
  message,     // optionnel
  allergies,   // optionnel
  dateEnvoi: new Date().toISOString(),
  userAgent: navigator.userAgent,
};
```

## Script Google Apps Script conseillé

Dans le Google Sheet : **Extensions > Apps Script**, coller ce code, puis
déployer en **application web** (accès : « Tout le monde »).
La feuille doit s'appeler **`Réponses`** (ou adaptez le nom ci-dessous).

```js
function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Réponses");

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nomPrenom || "",
      data.presence || "",
      data.adultes || "",
      data.enfants || "",
      data.message || "",
      data.allergies || "",
      data.dateEnvoi || "",
      data.userAgent || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Colonnes recommandées (ligne d'en-tête de la feuille `Réponses`) :

```txt
Date | Nom et prénom | Présence | Adultes | Enfants | Message | Allergies | Date d'envoi | User agent
```

## Important : redéploiement après modification

Si vous modifiez le script Apps Script, **l'URL `/exec` ne reflète pas les
changements** tant que vous n'avez pas publié une nouvelle version :

```txt
Déployer > Gérer les déploiements > (sélectionner le déploiement) > Modifier
  > Version : Nouvelle version > Déployer
```

L'endpoint `/exec` reste le même ; seule la version change.
