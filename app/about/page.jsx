"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            <span className="gradient-text">Über</span>{" "}
            <span className="text-gray-800">uns</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ihr zuverlässiger Elektroinstallationsbetrieb in Balingen. Professionelle Lösungen für alle elektrotechnischen Herausforderungen.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 electric-gradient opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👷</div>
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-gray-700 font-medium">
                    Bildplatzhalter: Unser Team
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Über Elektro Rugova
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Elektro Rugova ist ein etablierter Elektroinstallationsbetrieb in Balingen, geleitet von Herrn Enton Rugova. 
              Wir bieten elektrotechnische Dienstleistungen auf höchstem Niveau und kombinieren traditionelles Handwerk mit modernster Technologie.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Unser Unternehmen in der Zinkenstraße 19 in Balingen steht für Qualität, Zuverlässigkeit und Kundenzufriedenheit. 
              Wir sind stolz auf unsere vielen zufriedenen Kunden in Balingen und der gesamten Region.
            </p>
            <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
              <p className="text-gray-700 font-semibold">
                <span className="text-indigo-600">Inhaber:</span> Enton Rugova
              </p>
              <p className="text-gray-700 mt-2">
                <span className="text-indigo-600">Standort:</span> Zinkenstraße 19, 72336 Balingen
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { title: "Qualität", description: "Höchste Standards in jeder Arbeit", icon: "🏆" },
            { title: "Zuverlässigkeit", description: "Termingerecht und präzise", icon: "⏱️" },
            { title: "Innovation", description: "Moderne Technologien und Lösungen", icon: "💡" },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 glass rounded-3xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-6xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}