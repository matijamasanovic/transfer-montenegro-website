import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { PopularTours } from "@/components/sections/popular-tours";
import { PopularRoutes } from "@/components/sections/popular-routes";
import { Fleet } from "@/components/sections/fleet";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    cnr: "Transfer Podgorica | Privatni Transfer Crna Gora | MTG",
    en: "Podgorica Airport Transfer | Private Transfer Montenegro | MTG",
    ru: "Трансфер Подгорица | Частный Трансфер Черногория | MTG",
  };

  const descriptions: Record<string, string> = {
    cnr: "Privatni transferi i ture u Crnoj Gori. Transfer sa aerodroma Podgorica, Tivat. Prevoz do Budve, Kotora, Dubrovnika, Sarajeva i ostalih destinacija. Rezervišite online.",
    en: "Private airport transfers and tours in Montenegro. Transfer from Podgorica and Tivat airport to Budva, Kotor, Dubrovnik, Sarajevo and more. Book online.",
    ru: "Частные трансферы и туры в Черногории. Трансфер из аэропорта Подгорица и Тиват до Будвы, Котора, Дубровника, Сараево и других направлений. Бронируйте онлайн.",
  };

  const keywords: Record<string, string> = {
    cnr: "transfer podgorica, privatni transfer crna gora, aerodrom podgorica transfer, taxi podgorica budva, transfer tivat, prevoz crna gora, ture crna gora, transfer kotor, transfer budva",
    en: "podgorica airport transfer, private transfer montenegro, tivat airport transfer, taxi montenegro, podgorica to budva transfer, podgorica to kotor transfer, montenegro tours, private driver montenegro",
    ru: "трансфер подгорица, частный трансфер черногория, аэропорт подгорица трансфер, такси черногория, трансфер тиват, подгорица будва трансфер, туры черногория",
  };

  const baseUrl = "https://montenegrotransfergroup.com";
  const canonical = locale === "cnr" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    keywords: keywords[locale] ?? keywords.en,
    authors: [{ name: "Montenegro Transfer Group" }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical,
      languages: {
        "sr-ME": baseUrl,
        en: `${baseUrl}/en`,
        ru: `${baseUrl}/ru`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "cnr" ? "sr_ME" : locale === "ru" ? "ru_RU" : "en_US",
      url: canonical,
      siteName: "Montenegro Transfer Group",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Montenegro Transfer Group",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularRoutes />
      <PopularTours />
      <Fleet />
      <WhyChooseUs />
      <Testimonials />
      <CtaBand />
    </>
  );
}
