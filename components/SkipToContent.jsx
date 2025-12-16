export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-full focus:shadow-lg"
    >
      Zum Hauptinhalt springen
    </a>
  );
}

