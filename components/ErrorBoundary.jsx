"use client";
import React, { Component } from "react";
import Link from "next/link";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Etwas ist schiefgelaufen
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Seite neu laden
              </button>
              <Link
                href="/"
                className="glass text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

