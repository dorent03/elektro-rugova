"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <div className="text-9xl font-extrabold gradient-text mb-4">404</div>
            <div className="text-6xl mb-4">🔌</div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Seite nicht gefunden
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Zur Startseite
            </Link>
            <Link
              href="/contact"
              className="glass text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

