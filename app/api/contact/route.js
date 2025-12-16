import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validierung
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
        { status: 400 }
      );
    }

    // Gmail API Konfiguration
    const gmailToken = process.env.GMAIL_ACCESS_TOKEN;
    const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const gmailClientId = process.env.GMAIL_CLIENT_ID;
    const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
    const recipientEmail = process.env.CONTACT_EMAIL || 'elektro-rugova@t-online.de';

    // Wenn kein Gmail Token vorhanden, verwende einfaches SMTP oder senden Sie eine E-Mail über einen Service
    // Für Production: Verwenden Sie einen E-Mail-Service wie Resend, SendGrid, oder Gmail API
    
    if (!gmailToken && !gmailRefreshToken) {
      // Fallback: Log die Nachricht (für Development)
      console.log('Kontaktanfrage erhalten:', { name, email, phone, message });
      
      // In Production sollten Sie hier einen E-Mail-Service nutzen
      // Beispiel mit nodemailer oder einem anderen Service
      return NextResponse.json(
        { 
          success: true,
          message: 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.',
          note: 'E-Mail-Versand nicht konfiguriert. Bitte konfigurieren Sie Gmail API.'
        },
        { status: 200 }
      );
    }

    // Gmail API: E-Mail senden
    // Erstellen Sie eine Base64-kodierte E-Mail
    const emailContent = [
      `From: ${email}`,
      `To: ${recipientEmail}`,
      `Subject: Kontaktanfrage von ${name}`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      `<h2>Neue Kontaktanfrage</h2>`,
      `<p><strong>Name:</strong> ${name}</p>`,
      `<p><strong>E-Mail:</strong> ${email}</p>`,
      phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : '',
      `<p><strong>Nachricht:</strong></p>`,
      `<p>${message.replace(/\n/g, '<br>')}</p>`
    ].filter(Boolean).join('\n');

    const encodedEmail = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Gmail API: Access Token aktualisieren falls nötig
    let accessToken = gmailToken;
    
    if (gmailRefreshToken) {
      // Token aktualisieren
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
      throw new Error('Fehler beim Senden der E-Mail');
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fehler beim Verarbeiten der Kontaktanfrage:', error);
    return NextResponse.json(
      { 
        error: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

