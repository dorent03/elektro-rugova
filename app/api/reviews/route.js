import { NextResponse } from 'next/server';

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // Prüfen ob Konfiguration vorhanden ist
  if (!placeId || placeId === 'XXX_PLACE_ID_XXX' || !apiKey || apiKey === 'XXX_API_KEY_XXX') {
    return NextResponse.json(
      { 
        error: 'Google API nicht konfiguriert',
        status: 'NOT_CONFIGURED'
      },
      { status: 200 } // 200 damit Frontend den Fallback anzeigen kann
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`,
      {
        next: { revalidate: 3600 } // Cache für 1 Stunde
      }
    );

    if (!response.ok) {
      throw new Error('Fehler beim Laden der Reviews');
    }

    const data = await response.json();

    if (data.status === 'OK' && data.result.reviews) {
      return NextResponse.json({
        status: 'OK',
        reviews: data.result.reviews.slice(0, 3), // Neueste 3 Reviews
        rating: data.result.rating,
        name: data.result.name
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Keine Reviews gefunden',
          status: data.status 
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Fehler beim Laden der Google Reviews:', error);
    return NextResponse.json(
      { 
        error: error.message,
        status: 'ERROR'
      },
      { status: 200 }
    );
  }
}

