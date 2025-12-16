import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Elektro Rugova Balingen - Professionelle Elektroinstallationen",
  description: "Elektroinstallationsbetrieb in Balingen. Professionelle Elektroinstallationen, Smart Home Lösungen und elektrotechnische Dienstleistungen von Enton Rugova. Zinkenstraße 19, 72336 Balingen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
