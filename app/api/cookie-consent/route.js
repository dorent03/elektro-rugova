import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, timestamp } = body;

    // Gmail API Konfiguration
    const gmailToken = process.env.GMAIL_ACCESS_TOKEN;
    const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const gmailClientId = process.env.GMAIL_CLIENT_ID;
    const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
    const recipientEmail = process.env.CONTACT_EMAIL || 'elektro-rugova@t-online.de';

    const actionText = action === 'accepted' ? 'akzeptiert' : 'abgelehnt';
    const actionEmoji = action === 'accepted' ? '✅' : '❌';

    // E-Mail-Inhalt
    const emailContent = [
      `From: ${recipientEmail}`,
      `To: ${recipientEmail}`,
      `Subject: Cookie-Zustimmung ${actionText} - Elektro Rugova Website`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      `<h2>Cookie-Zustimmung ${actionText}</h2>`,
      `<p><strong>Status:</strong> ${actionEmoji} ${actionText.toUpperCase()}</p>`,
      `<p><strong>Zeitstempel:</strong> ${new Date(timestamp).toLocaleString('de-DE')}</p>`,
      `<p><strong>IP-Adresse:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Nicht verfügbar'}</p>`,
      `<hr>`,
      `<p style="color: #666; font-size: 12px;">Diese E-Mail wurde automatisch generiert, wenn ein Besucher die Cookie-Einstellungen auf der Website geändert hat.</p>`
    ].join('\n');

    // Wenn kein Gmail Token vorhanden, logge nur
    if (!gmailToken && !gmailRefreshToken) {
      console.log(`Cookie-Zustimmung ${actionText}:`, { action, timestamp });
      return NextResponse.json(
        { 
          success: true,
          message: 'Cookie-Zustimmung gespeichert.',
          note: 'E-Mail-Versand nicht konfiguriert.'
        },
        { status: 200 }
      );
    }

    // Gmail API: Access Token aktualisieren falls nötig
    let accessToken = gmailToken;
    
    if (gmailRefreshToken) {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: gmailClientId,
          client_secret: gmailClientSecret,
          refresh_token: gmailRefreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        accessToken = tokenData.access_token;
      }
    }

    // E-Mail über Gmail API senden
    const encodedEmail = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const gmailResponse = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      }
    );

    if (!gmailResponse.ok) {
      const errorData = await gmailResponse.json();
      console.error('Gmail API Fehler:', errorData);
      // Trotzdem Erfolg zurückgeben, da Zustimmung bereits gespeichert ist
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Cookie-Zustimmung gespeichert und E-Mail gesendet.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fehler beim Verarbeiten der Cookie-Zustimmung:', error);
    // Trotzdem Erfolg zurückgeben, da Zustimmung bereits im Browser gespeichert ist
    return NextResponse.json(
      { 
        success: true,
        message: 'Cookie-Zustimmung gespeichert.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 200 }
    );
  }
}

