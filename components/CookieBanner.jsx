"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Prüfe ob Cookie-Zustimmung bereits gespeichert wurde
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Zeige Banner nach kurzer Verzögerung
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = async () => {
    setIsSubmitting(true);
    
    // Speichere Zustimmung
    const consentData = {
      accepted: true,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
    };
    
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    
    // Sende E-Mail-Benachrichtigung
    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "accepted",
          timestamp: consentData.timestamp,
        }),
      });
    } catch (error) {
      console.error("Fehler beim Senden der Cookie-Zustimmung:", error);
      // Fehler nicht anzeigen, da Zustimmung bereits gespeichert ist
    }
    
    setIsSubmitting(false);
    setShowBanner(false);
  };

  const handleDecline = async () => {
    setIsSubmitting(true);
    
    // Speichere Ablehnung
    const consentData = {
      accepted: false,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
    };
    
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    
    // Sende E-Mail-Benachrichtigung
    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "declined",
          timestamp: consentData.timestamp,
        }),
      });
    } catch (error) {
      console.error("Fehler beim Senden der Cookie-Ablehnung:", error);
    }
    
    setIsSubmitting(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t-2 border-blue-600"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                🍪 Cookie-Einstellungen
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                Durch Klicken auf "Akzeptieren" stimmen Sie der Verwendung von Cookies zu. 
                Weitere Informationen finden Sie in unserer{" "}
                <Link 
                  href="/datenschutz" 
                  className="text-blue-600 hover:text-orange-500 underline font-medium"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAccept}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Wird gespeichert..." : "Akzeptieren"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

