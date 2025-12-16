"use client";
import { motion } from "framer-motion";

export default function Impressum() {
  return (
    <section className="pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
            <span className="gradient-text">Impressum</span>
          </h1>

          <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Elektro Rugova</strong>
                <br />
                Inhaber: Enton Rugova
                <br />
                Zinkenstraße 19
                <br />
                72336 Balingen
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontakt</h2>
              <p className="text-gray-700 leading-relaxed">
                Telefon: <a href="tel:01729411024" className="text-blue-600 hover:text-orange-500">0172 9411024</a>
                <br />
                E-Mail: <a href="mailto:elektro-rugova@t-online.de" className="text-blue-600 hover:text-orange-500">elektro-rugova@t-online.de</a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Umsatzsteuer-ID</h2>
              <p className="text-gray-700 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
                <br />
                <span className="text-gray-500">[Umsatzsteuer-ID falls vorhanden]</span>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p className="text-gray-700 leading-relaxed">
                Enton Rugova
                <br />
                Zinkenstraße 19
                <br />
                72336 Balingen
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Haftungsausschluss</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Haftung für Inhalte</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Haftung für Links</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Urheberrecht</h3>
              <p className="text-gray-700 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

