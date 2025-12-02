"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Elektroinstallation",
    description: "Professionelle Installation von Elektroanlagen für Neubau und Sanierung",
    icon: "🔌",
    image: "/placeholder-installation.jpg",
  },
  {
    title: "Smart Home",
    description: "Intelligente Haussteuerung und Automatisierung für modernes Wohnen",
    icon: "🏠",
    image: "/placeholder-smarthome.jpg",
  },
  {
    title: "Elektroprüfung",
    description: "Sicherheitsprüfungen und Wartung Ihrer elektrischen Anlagen",
    icon: "✅",
    image: "/placeholder-pruefung.jpg",
  },
  {
    title: "Notdienst",
    description: "24/7 Elektro-Notdienst für schnelle Hilfe bei Stromausfällen",
    icon: "🚨",
    image: "/placeholder-notdienst.jpg",
  },
  {
    title: "LED-Beleuchtung",
    description: "Moderne LED-Beleuchtungslösungen für Innen- und Außenbereiche",
    icon: "💡",
    image: "/placeholder-led.jpg",
  },
  {
    title: "Photovoltaik",
    description: "Solaranlagen für nachhaltige Energiegewinnung",
    icon: "☀️",
    image: "/placeholder-photovoltaik.jpg",
  },
];

export default function Services() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 electric-gradient"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Unsere</span>{" "}
            <span className="text-gray-800">Leistungen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Umfassende elektrotechnische Dienstleistungen für jeden Bedarf
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">{service.icon}</div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-600">
                    Bildplatzhalter
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="text-indigo-600 font-semibold hover:text-purple-600 transition-colors inline-flex items-center gap-2"
                >
                  Mehr erfahren
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 electric-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

