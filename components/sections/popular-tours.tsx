import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOURS } from "@/lib/tours-data";
import { ToursGrid } from "@/components/tours/tours-grid";
import { Reveal } from "@/components/anim/reveal";
import { useTranslations } from "next-intl";

export function PopularTours() {
  const t = useTranslations("popularTours");

  return (
    <section className="relative z-0 bg-[#0A1A3E] mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
              {t("eyebrow")}
            </span>
            <h2 className="mt-2 font-heading text-4xl font-bold text-white sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-md text-white/60">{t("subtitle")}</p>
          </div>
          <Link
            href="/ture"
            className="inline-flex items-center gap-2 rounded-xl border border-[#00C2E8]/40 px-5 py-3 text-sm font-medium text-[#00C2E8] transition hover:bg-[#00C2E8] hover:text-[#0A1A3E]"
          >
            {t("allTours")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10">
        <ToursGrid tours={TOURS.slice(0, 6)} />
      </div>
    </section>
  );
}
