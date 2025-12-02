import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Moderne Website",
  description: "Eine moderne Next.js Webseite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
