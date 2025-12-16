"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamisch laden für Karte (nur Client-Side)
const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  ssr: false,
  loading: () => (
    <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-gray-700 font-medium">
          Lade Karte...
        </div>
      </div>
    </div>
  ),
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message });
        // Formular zurücksetzen
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Fehler beim Senden" });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: "error", 
        message: "Netzwerkfehler. Bitte versuchen Sie es später erneut." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            <span className="gradient-text">Kontakt</span>{" "}
            <span className="text-gray-800">aufnehmen</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Haben Sie Fragen? Wir sind für Sie da und beraten Sie gerne kostenlos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nachricht senden</h2>
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Kontaktformular">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">E-Mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="ihre@email.de"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="0172 9411024"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nachricht *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  placeholder="Ihre Nachricht..."
                />
              </div>
              {submitStatus && (
                <div
                  className={`p-4 rounded-xl ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Kontaktinformationen</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Adresse</h3>
                    <p className="text-gray-600">Zinkenstraße 19</p>
                    <p className="text-gray-600">72336 Balingen</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Telefon</h3>
                    <p className="text-gray-600">0172 9411024</p>
                    <p className="text-sm text-gray-500">Mo-Fr: 8:00 - 18:00 Uhr</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">E-Mail</h3>
                    <p className="text-gray-600">elektro-rugova@t-online.de</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                    🚨
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Notdienst</h3>
                    <p className="text-gray-600">24/7 verfügbar</p>
                    <p className="text-sm text-gray-500">0172 9411024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <GoogleMap />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}