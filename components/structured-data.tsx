export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://montenegrotransfergroup.com/#organization",
        name: "Montenegro Transfer Group",
        url: "https://montenegrotransfergroup.com",
        logo: "https://montenegrotransfergroup.com/mtg-logo.png",
        description:
          "Private airport transfers and tours in Montenegro. Transfer from Podgorica and Tivat airport to Budva, Kotor, Dubrovnik and more.",
        telephone: "+38268861538",
        email: "info@montenegrotransfergroup.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bulevar Sv. Petra Cetinjskog 12",
          addressLocality: "Podgorica",
          addressCountry: "ME",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 42.4304,
          longitude: 19.2594,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        priceRange: "€€",
        areaServed: [
          "Montenegro",
          "Croatia",
          "Bosnia and Herzegovina",
          "Serbia",
          "Albania",
          "North Macedonia",
          "Kosovo",
        ],
        sameAs: ["https://www.instagram.com/mtgtransfergroup/", ""],
      },
      {
        "@type": "WebSite",
        "@id": "https://montenegrotransfergroup.com/#website",
        url: "https://montenegrotransfergroup.com",
        name: "Montenegro Transfer Group",
        publisher: {
          "@id": "https://montenegrotransfergroup.com/#organization",
        },
        inLanguage: ["sr", "en", "ru"],
      },
      {
        "@type": "Service",
        name: "Private Airport Transfer Montenegro",
        description:
          "Private transfers from Podgorica and Tivat airport to all major destinations.",
        provider: {
          "@id": "https://montenegrotransfergroup.com/#organization",
        },
        areaServed: "Montenegro",
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "40",
        },
      },
      {
        "@type": "TouristTrip",
        name: "Kotor, Perast & Tivat Bay Tour",
        description:
          "Private guided tour of Kotor Old Town, Perast and Porto Montenegro from Podgorica.",
        provider: {
          "@id": "https://montenegrotransfergroup.com/#organization",
        },
        offers: { "@type": "Offer", priceCurrency: "EUR", price: "200" },
      },
      {
        "@type": "TouristTrip",
        name: "Durmitor & Tara Canyon Tour",
        description:
          "Private day trip to Durmitor National Park, Black Lake and Tara Bridge from Podgorica.",
        provider: {
          "@id": "https://montenegrotransfergroup.com/#organization",
        },
        offers: { "@type": "Offer", priceCurrency: "EUR", price: "200" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
