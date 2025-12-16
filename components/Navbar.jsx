"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2" aria-label="Zur Startseite">
            <div className="w-10 h-10 electric-gradient rounded-lg flex items-center justify-center" aria-hidden="true">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <span className="font-bold text-2xl gradient-text">Elektro Rugova</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Über uns
            </Link>
            <Link
              href="/leistungen"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Leistungen
            </Link>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-medium"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4 pb-4"
            >
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Über uns
              </Link>
              <Link
                href="/leistungen"
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leistungen
              </Link>
              <Link
                href="/contact"
                className="block bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}