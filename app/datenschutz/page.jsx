"use client";
import { motion } from "framer-motion";

export default function Datenschutz() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
            <span className="gradient-text">Datenschutzerklärung</span>
          </h1>

          <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Allgemeine Hinweise</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                <br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Verantwortliche Stelle</h2>
              <p className="text-gray-700 leading-relaxed">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                <br /><br />
                <strong>Elektro Rugova</strong>
                <br />
                Enton Rugova
                <br />
                Zinkenstraße 19
                <br />
                72336 Balingen
                <br /><br />
                Telefon: <a href="tel:01729411024" className="text-blue-600 hover:text-orange-500">0172 9411024</a>
                <br />
                E-Mail: <a href="mailto:elektro-rugova@t-online.de" className="text-blue-600 hover:text-orange-500">elektro-rugova@t-online.de</a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Kontaktformular</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Server-Log-Dateien</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                <br />
                • Browsertyp und Browserversion
                <br />
                • verwendetes Betriebssystem
                <br />
                • Referrer URL
                <br />
                • Hostname des zugreifenden Rechners
                <br />
                • Uhrzeit der Serveranfrage
                <br />
                • IP-Adresse
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Ihre Rechte</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sie haben jederzeit das Recht, Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung zu erhalten. Außerdem haben Sie ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="text-gray-700 leading-relaxed">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

