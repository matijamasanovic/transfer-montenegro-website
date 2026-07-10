import { Analytics } from "@vercel/analytics/next";
import type { Viewport } from "next";
import { Montserrat, Poppins, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { BookingProvider } from "@/components/booking/booking-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingBookButton } from "@/components/floating-book-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { StructuredData } from "@/components/structured-data";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#0A1A3E",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${poppins.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BookingProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
            <FloatingBookButton />
            <WhatsAppButton />
          </BookingProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
