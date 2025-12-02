"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Michael Schmidt",
    role: "Hausbesitzer",
    text: "Ausgezeichnete Arbeit! Die Installation war professionell und pünktlich. Sehr zufrieden!",
    rating: 5,
    image: "/placeholder-avatar1.jpg",
  },
  {
    name: "Sarah Müller",
    role: "Geschäftsführerin",
    text: "Das Smart Home System funktioniert perfekt. Top Beratung und Umsetzung!",
    rating: 5,
    image: "/placeholder-avatar2.jpg",
  },
  {
    name: "Thomas Weber",
    role: "Bauherr",
    text: "Komplette Elektroinstallation für unser neues Haus. Alles termingerecht und in bester Qualität.",
    rating: 5,
    image: "/placeholder-avatar3.jpg",
  },
];

export default function Testimonials() {
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
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Was unsere</span>{" "}
            <span className="text-gray-800">Kunden sagen</span>
          </h2>
          <p className="text-xl text-gray-600">
            Zufriedene Kunden sind unser größter Erfolg
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Avatar Placeholder */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

