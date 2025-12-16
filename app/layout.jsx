import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

export const metadata = {
  title: "Elektro Rugova Balingen - Professionelle Elektroinstallationen",
  description: "Elektroinstallationsbetrieb in Balingen. Professionelle Elektroinstallationen, Smart Home Lösungen und elektrotechnische Dienstleistungen von Enton Rugova. Zinkenstraße 19, 72336 Balingen.",
  keywords: "Elektriker Balingen, Elektroinstallation, Smart Home, Elektroprüfung, Notdienst, LED-Beleuchtung, Photovoltaik, Elektro Rugova",
  authors: [{ name: "Elektro Rugova" }],
  openGraph: {
    title: "Elektro Rugova Balingen - Professionelle Elektroinstallationen",
    description: "Ihr zuverlässiger Elektroinstallationsbetrieb in Balingen",
    type: "website",
    locale: "de_DE",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <StructuredData />
      </head>
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 text-gray-900 min-h-screen flex flex-col antialiased">
        <ErrorBoundary>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
