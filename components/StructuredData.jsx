export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.elektro-rugova.de/#organization",
    name: "Elektro Rugova",
    legalName: "Elektro Rugova",
    image: "https://www.elektro-rugova.de/logo.png",
    url: "https://www.elektro-rugova.de",
    telephone: "+491729411024",
    email: "elektro-rugova@t-online.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Zinkenstraße 19",
      addressLocality: "Balingen",
      postalCode: "72336",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.2745",
      longitude: "8.8542",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "Balingen",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Elektrotechnische Dienstleistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Elektroinstallation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Smart Home",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Elektroprüfung",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Notdienst",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "LED-Beleuchtung",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photovoltaik",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

