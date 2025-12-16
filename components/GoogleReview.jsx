"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Platzhalter für Google Place ID
// Diese finden Sie in Ihrer Google My Business URL oder über die Google Places API
const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "XXX_PLACE_ID_XXX";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

// Fallback Reviews (werden angezeigt, wenn keine API-Verbindung besteht)
const fallbackReviews = [
  {
    author_name: "Max Mustermann",
    rating: 5,
    text: "Ausgezeichnete Arbeit! Die Installation war professionell und pünktlich. Sehr zufrieden!",
    time: Date.now() - 86400000 * 7, // 7 Tage ago
  },
  {
    author_name: "Anna Schmidt",
    rating: 5,
    text: "Das Smart Home System funktioniert perfekt. Top Beratung und Umsetzung!",
    time: Date.now() - 86400000 * 14, // 14 Tage ago
  },
  {
    author_name: "Thomas Müller",
    rating: 5,
    text: "Komplette Elektroinstallation für unser neues Haus. Alles termingerecht und in bester Qualität.",
    time: Date.now() - 86400000 * 21, // 21 Tage ago
  },
];

export default function GoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useGoogleReviews, setUseGoogleReviews] = useState(false);

  useEffect(() => {
    // Prüfen ob Google API Key vorhanden ist
    if (GOOGLE_API_KEY && GOOGLE_API_KEY !== "" && GOOGLE_PLACE_ID && GOOGLE_PLACE_ID !== "XXX_PLACE_ID_XXX") {
      fetchGoogleReviews();
    } else {
      // Fallback auf statische Reviews
      setReviews(fallbackReviews);
      setLoading(false);
    }
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      // Google Places API Details Endpoint
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Fehler beim Laden der Reviews");
      }

      const data = await response.json();

      if (data.status === "OK" && data.result.reviews) {
        // Neueste 3 Reviews
        const latestReviews = data.result.reviews.slice(0, 3);
        setReviews(latestReviews);
        setUseGoogleReviews(true);
      } else {
        throw new Error("Keine Reviews gefunden");
      }
    } catch (err) {
      console.error("Fehler beim Laden der Google Reviews:", err);
      setError(err.message);
      // Fallback auf statische Reviews
      setReviews(fallbackReviews);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "vor 1 Tag";
    if (diffDays < 7) return `vor ${diffDays} Tagen`;
    if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`;
    if (diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`;
    return `vor ${Math.floor(diffDays / 365)} Jahren`;
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Lade Bewertungen...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <h2 className="text-5xl md:text-6xl font-extrabold">
              <span className="gradient-text">Google</span>{" "}
              <span className="text-gray-800">Bewertungen</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            {useGoogleReviews 
              ? "Echte Bewertungen von Google" 
              : "Beispielbewertungen (Google API nicht konfiguriert)"}
          </p>
          {!useGoogleReviews && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800">
                <strong>Hinweis:</strong> Um echte Google Reviews anzuzeigen, fügen Sie Ihre Google Place ID und API Key in die Umgebungsvariablen ein.
              </p>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Google Logo & Author */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                  {review.author_name?.charAt(0) || "?"}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800">{review.author_name || "Anonym"}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    {useGoogleReviews && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    )}
                    {formatDate(review.time || review.time * 1000)}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < (review.rating || 5)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed italic">
                "{review.text || review.review_text || ""}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Link zu Google Reviews */}
        {useGoogleReviews && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={`https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Bewertung auf Google hinterlassen
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
