# Google Reviews Integration

Diese Website unterstützt die Einbindung echter Google Reviews über die Google Places API.

## Einrichtung

### 1. Google Cloud Console Setup

1. Gehen Sie zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie ein bestehendes aus
3. Aktivieren Sie die **Places API** für Ihr Projekt
4. Erstellen Sie einen API Key:
   - Gehen Sie zu "APIs & Services" > "Credentials"
   - Klicken Sie auf "Create Credentials" > "API Key"
   - Kopieren Sie den API Key

### 2. Google Place ID finden

Ihre Google Place ID finden Sie auf verschiedene Weise:

**Methode 1: Über Google My Business**
- Öffnen Sie Ihre Google My Business Seite
- Die Place ID steht in der URL oder können Sie über die Google My Business API abrufen

**Methode 2: Über Google Places API**
- Verwenden Sie den [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
- Geben Sie Ihre Adresse ein und kopieren Sie die Place ID

**Methode 3: Über die Google Maps URL**
- Öffnen Sie Ihre Firma auf Google Maps
- Die Place ID steht in der URL: `https://www.google.com/maps/place/?q=place_id:IHRE_PLACE_ID`

### 3. Umgebungsvariablen konfigurieren

1. Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis des Projekts
2. Fügen Sie folgende Variablen ein:

```env
NEXT_PUBLIC_GOOGLE_PLACE_ID=IHRE_PLACE_ID_HIER
NEXT_PUBLIC_GOOGLE_API_KEY=IHER_API_KEY_HIER
```

3. Starten Sie den Development Server neu: `npm run dev`

## Funktionsweise

- **Mit API Key:** Die Komponente lädt automatisch die neuesten 3 Google Reviews
- **Ohne API Key:** Es werden Beispielbewertungen angezeigt (Fallback)

## Datenschutz & Einverständnis

⚠️ **Wichtig:** Bevor Sie Google Reviews auf Ihrer Website anzeigen:

1. **Einverständnis der Kunden:** Stellen Sie sicher, dass Sie das Einverständnis Ihrer Kunden haben, ihre Bewertungen auf Ihrer Website zu veröffentlichen
2. **Google Richtlinien:** Überprüfen Sie die [Google API Terms of Service](https://developers.google.com/maps/terms)
3. **Datenschutz:** Informieren Sie sich über die DSGVO-Anforderungen für die Anzeige von Bewertungen

## Kosten

Die Google Places API hat ein kostenloses Kontingent:
- **$200 kostenloses Guthaben pro Monat**
- Details: [Google Cloud Pricing](https://cloud.google.com/maps-platform/pricing)

Für die meisten Websites reicht das kostenlose Kontingent aus.

## Fehlerbehebung

**Reviews werden nicht angezeigt:**
- Überprüfen Sie, ob die Places API aktiviert ist
- Überprüfen Sie Ihre API Key Berechtigungen
- Stellen Sie sicher, dass Ihre Place ID korrekt ist
- Überprüfen Sie die Browser-Konsole auf Fehlermeldungen

**CORS-Fehler:**
- Die Google Places API sollte über einen Server-Endpoint aufgerufen werden
- Für Production: Erstellen Sie eine API Route in Next.js (`/api/reviews`)

## Alternative: Server-Side API Route

Für Production wird empfohlen, eine API Route zu erstellen, um den API Key nicht im Client zu exponieren:

```javascript
// app/api/reviews/route.js
export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
  );
  
  const data = await response.json();
  return Response.json(data);
}
```

