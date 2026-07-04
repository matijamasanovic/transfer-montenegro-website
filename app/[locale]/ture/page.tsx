import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ToursGrid } from "@/components/tours/tours-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("toursPage");
  return {
    title: `${t("title")} — Montenegro Transfer Group`,
    description: t("subtitle"),
  };
}

export default async function ToursPage() {
  const t = await getTranslations("toursPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="bg-[#0A1A3E] mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ToursGrid />
      </section>
      <CtaBand />
    </>
  );
}
