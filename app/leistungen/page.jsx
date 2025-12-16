"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const leistungen = [
  {
    title: "Elektroinstallation",
    description: "Professionelle Installation von Elektroanlagen für Neubau und Sanierung",
    details: [
      "Komplette Elektroinstallation für Neubauten",
      "Sanierung und Modernisierung bestehender Anlagen",
      "Unterputz- und Aufputzinstallation",
      "Schalt- und Verteilerkästen",
      "Steckdosen und Schalter",
      "Beleuchtungsinstallation",
    ],
    icon: "🔌",
    image: "/placeholder-installation.jpg",
  },
  {
    title: "Smart Home",
    description: "Intelligente Haussteuerung und Automatisierung für modernes Wohnen",
    details: [
      "Smart Home Systeme (KNX, Loxone, etc.)",
      "Lichtsteuerung und Dimmer",
      "Rollladen- und Jalousiesteuerung",
      "Heizungssteuerung",
      "Sicherheitstechnik (Alarmanlagen)",
      "Vernetzung und App-Steuerung",
    ],
    icon: "🏠",
    image: "/placeholder-smarthome.jpg",
  },
  {
    title: "Elektroprüfung",
    description: "Sicherheitsprüfungen und Wartung Ihrer elektrischen Anlagen",
    details: [
      "E-Check nach VDE 0100-600",
      "Prüfung von Elektroinstallationen",
      "Dokumentation und Prüfprotokolle",
      "Fehlerbehebung und Reparaturen",
      "Wartung von Elektroanlagen",
      "Beratung zur Sicherheit",
    ],
    icon: "✅",
    image: "/placeholder-pruefung.jpg",
  },
  {
    title: "Notdienst",
    description: "24/7 Elektro-Notdienst für schnelle Hilfe bei Stromausfällen",
    details: [
      "24 Stunden Notdienst",
      "Schnelle Reaktionszeit",
      "Stromausfälle beheben",
      "Defekte Elektrogeräte reparieren",
      "Sicherheitsprobleme lösen",
      "Soforthilfe bei Elektropannen",
    ],
    icon: "🚨",
    image: "/placeholder-notdienst.jpg",
  },
  {
    title: "LED-Beleuchtung",
    description: "Moderne LED-Beleuchtungslösungen für Innen- und Außenbereiche",
    details: [
      "LED-Innenbeleuchtung",
      "Außenbeleuchtung und Gartenbeleuchtung",
      "Energieeffiziente Lösungen",
      "Individuelle Lichtplanung",
      "Dimmsysteme",
      "Farbsteuerung (RGB)",
    ],
    icon: "💡",
    image: "/placeholder-led.jpg",
  },
  {
    title: "Photovoltaik",
    description: "Solaranlagen für nachhaltige Energiegewinnung",
    details: [
      "Planung und Installation von PV-Anlagen",
      "Netzeinspeisung",
      "Batteriespeicher-Systeme",
      "Wartung und Reparatur",
      "Ertragsoptimierung",
      "Beratung zu Förderungen",
    ],
    icon: "☀️",
    image: "/placeholder-photovoltaik.jpg",
  },
];

export default function Leistungen() {
  return (
    <section className="pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            <span className="gradient-text">Unsere</span>{" "}
            <span className="text-gray-800">Leistungen</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Umfassende elektrotechnische Dienstleistungen in Balingen und Umgebung
          </p>
        </motion.div>

        {/* Leistungen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {leistungen.map((leistung, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Header mit Icon */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-orange-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-30">{leistung.icon}</div>
                </div>
                <div className="absolute top-6 left-6">
                  <div className="text-6xl">{leistung.icon}</div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {leistung.title}
                  </h2>
                  <p className="text-gray-600">{leistung.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Leistungsumfang:
                </h3>
                <ul className="space-y-3 mb-6">
                  {leistung.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span className="text-gray-600 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Jetzt anfragen
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Haben Sie Fragen zu unseren Leistungen?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Wir beraten Sie gerne zu allen elektrotechnischen Themen.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Jetzt Kontakt aufnehmen
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

