"use client";
import { motion } from "framer-motion";

const features = [
  {
      title: "Zertifizierter Meisterbetrieb",
    description: "Ausgezeichnete Qualität durch langjährige Erfahrung",
    icon: "🏆",
  },
  {
    title: "Moderne Technologie",
    description: "Aktuellste Standards und innovative Lösungen",
    icon: "⚡",
  },
  {
    title: "Fair & Transparent",
    description: "Klare Preise ohne versteckte Kosten",
    icon: "💎",
  },
  {
    title: "Schnelle Reaktionszeit",
    description: "Kurzfristige Termine und zuverlässige Umsetzung",
    icon: "🚀",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image Placeholder */}
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
                  <div className="text-8xl mb-4">🔧</div>
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-gray-700 font-medium">
                    Bildplatzhalter: Team bei der Arbeit
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-50 -z-10"></div>
          </motion.div>

          {/* Right Side - Features */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6"
            >
              <span className="text-gray-800">Warum</span>{" "}
              <span className="gradient-text">Elektro Rugova?</span>
            </motion.h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4 p-6 glass rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-5xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

