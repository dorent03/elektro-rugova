"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-slate-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 electric-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <span className="font-bold text-xl">Elektro Rugova</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Ihr zuverlässiger Partner für alle elektrotechnischen Anforderungen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="text-gray-300 hover:text-white transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Leistungen</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Elektroinstallation</li>
              <li>Smart Home</li>
              <li>Elektroprüfung</li>
              <li>Notdienst</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="tel:01729411024" className="hover:text-white transition-colors">
                  📞 0172 9411024
                </a>
              </li>
              <li>
                <a href="mailto:elektro-rugova@t-online.de" className="hover:text-white transition-colors">
                  ✉️ elektro-rugova@t-online.de
                </a>
              </li>
              <li>📍 Zinkenstraße 19</li>
              <li>📍 72336 Balingen</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
            <p>© 2025 Elektro Rugova – Alle Rechte vorbehalten.</p>
                <div className="flex gap-6 text-sm">
                  <Link href="/impressum" className="hover:text-white transition-colors">
                    Impressum
                  </Link>
                  <Link href="/datenschutz" className="hover:text-white transition-colors">
                    Datenschutz
                  </Link>
                </div>
          </div>
        </div>
      </div>
    </footer>
  );
}