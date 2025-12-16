# E-Mail-Versand & Google Maps Setup

## Gmail API Konfiguration

### 1. Google Cloud Console Setup

1. Gehen Sie zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie ein bestehendes aus
3. Aktivieren Sie die **Gmail API**:
   - Gehen Sie zu "APIs & Services" > "Library"
   - Suchen Sie nach "Gmail API"
   - Klicken Sie auf "Enable"

### 2. OAuth 2.0 Credentials erstellen

1. Gehen Sie zu "APIs & Services" > "Credentials"
2. Klicken Sie auf "Create Credentials" > "OAuth client ID"
3. Wählen Sie "Web application"
4. Fügen Sie autorisierte Redirect URIs hinzu:
   - `http://localhost:3000/api/auth/callback/google` (für Development)
   - Ihre Production-URL (für Production)
5. Speichern Sie die **Client ID** und **Client Secret**

### 3. OAuth Token generieren

**Option A: OAuth 2.0 Playground (Einfachste Methode)**

1. Gehen Sie zu [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Klicken Sie rechts oben auf das Zahnrad-Symbol
3. Aktivieren Sie "Use your own OAuth credentials"
4. Geben Sie Ihre Client ID und Client Secret ein
5. Wählen Sie im linken Menü "Gmail API v1"
6. Wählen Sie `https://www.googleapis.com/auth/gmail.send`
7. Klicken Sie auf "Authorize APIs"
8. Melden Sie sich mit dem Gmail-Konto an, von dem E-Mails gesendet werden sollen
9. Klicken Sie auf "Exchange authorization code for tokens"
10. Kopieren Sie den **Refresh Token**

**Option B: Node.js Script (Für Production)**

Erstellen Sie ein Script zum Generieren des Tokens:

```javascript
// generate-token.js
const { google } = require('googleapis');
const readline = require('readline');

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'http://localhost:3000/oauth2callback'
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Öffnen Sie diese URL in Ihrem Browser:');
console.log(url);

rl.question('Geben Sie den Code ein: ', (code) => {
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Fehler:', err);
    console.log('Refresh Token:', token.refresh_token);
    rl.close();
  });
});
```

### 4. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env.local` Datei:

```env
# Gmail API Konfiguration
GMAIL_CLIENT_ID=IHRE_CLIENT_ID
GMAIL_CLIENT_SECRET=IHER_CLIENT_SECRET
GMAIL_REFRESH_TOKEN=IHER_REFRESH_TOKEN
CONTACT_EMAIL=elektro-rugova@t-online.de

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=IHER_GOOGLE_MAPS_API_KEY
```

## Google Maps API Konfiguration

### 1. Google Maps API aktivieren

1. Gehen Sie zu [Google Cloud Console](https://console.cloud.google.com/)
2. Aktivieren Sie die **Maps JavaScript API**
3. Aktivieren Sie optional die **Geocoding API** (für bessere Adresssuche)

### 2. API Key erstellen

1. Gehen Sie zu "APIs & Services" > "Credentials"
2. Klicken Sie auf "Create Credentials" > "API Key"
3. Kopieren Sie den API Key
4. (Optional) Beschränken Sie den Key auf bestimmte APIs und Domains

### 3. Umgebungsvariable hinzufügen

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=IHER_API_KEY_HIER
```

## Alternative: Einfacherer E-Mail-Service

Für eine einfachere Lösung können Sie auch einen E-Mail-Service wie **Resend** oder **SendGrid** verwenden:

### Resend Setup

1. Registrieren Sie sich bei [Resend](https://resend.com)
2. Erstellen Sie einen API Key
3. Installieren Sie das Package: `npm install resend`
4. Erstellen Sie eine API Route:

```javascript
// app/api/contact/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, phone, message } = await request.json();
  
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'elektro-rugova@t-online.de',
    subject: `Kontaktanfrage von ${name}`,
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
      <p><strong>Nachricht:</strong></p>
      <p>${message}</p>
    `,
  });
  
  return Response.json({ success: true });
}
```

## Kosten

- **Gmail API**: Kostenlos (innerhalb der Limits)
- **Google Maps API**: $200 kostenloses Guthaben pro Monat
- **Resend**: Kostenlos bis 3.000 E-Mails/Monat

## Sicherheit

⚠️ **Wichtig:**
- Speichern Sie niemals API Keys im Code
- Verwenden Sie `.env.local` für lokale Entwicklung
- Verwenden Sie Umgebungsvariablen in Production (Vercel, Netlify, etc.)
- Beschränken Sie API Keys auf bestimmte Domains/IPs

