"use client";

import { useTranslations } from "next-intl";
import { useBooking } from "@/components/booking/booking-provider";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/anim/reveal";

const ROUTES = [
  {
    from: "Podgorica",
    to: "Budva",
    price: 60,
    fromId: "podgorica",
    toId: "budva",
  },
  {
    from: "Podgorica",
    to: "Kotor",
    price: 90,
    fromId: "podgorica",
    toId: "kotor",
  },
  {
    from: "Podgorica",
    to: "Tivat",
    price: 90,
    fromId: "podgorica",
    toId: "tivat",
  },
  {
    from: "Podgorica",
    to: "Ada Bojana",
    price: 90,
    fromId: "podgorica",
    toId: "ada-bojana",
  },
  { from: "Podgorica", to: "Bar", price: 55, fromId: "podgorica", toId: "bar" },
  {
    from: "Podgorica",
    to: "Ulcinj",
    price: 80,
    fromId: "podgorica",
    toId: "ulcinj",
  },
  {
    from: "Podgorica",
    to: "Herceg Novi",
    price: 110,
    fromId: "podgorica",
    toId: "herceg-novi",
  },
  {
    from: "Podgorica",
    to: "Dubrovnik",
    price: 160,
    fromId: "podgorica",
    toId: "dubrovnik-city",
  },
  {
    from: "Podgorica",
    to: "Sveti Stefan",
    price: 70,
    fromId: "podgorica",
    toId: "sveti-stefan",
  },
  {
    from: "Podgorica",
    to: "Sarajevo",
    price: 170,
    fromId: "podgorica",
    toId: "sarajevo",
  },
  {
    from: "Podgorica",
    to: "Tirana",
    price: 150,
    fromId: "podgorica",
    toId: "tirana-city",
  },
  {
    from: "Podgorica",
    to: "Cetinje",
    price: 40,
    fromId: "podgorica",
    toId: "cetinje",
  },
  {
    from: "Podgorica",
    to: "Nikšić",
    price: 50,
    fromId: "podgorica",
    toId: "niksic",
  },
  {
    from: "Podgorica",
    to: "Kolašin",
    price: 70,
    fromId: "podgorica",
    toId: "kolasin",
  },
  {
    from: "Podgorica",
    to: "Žabljak",
    price: 100,
    fromId: "podgorica",
    toId: "zabljak",
  },
  {
    from: "Podgorica",
    to: "Ostrog",
    price: 40,
    fromId: "podgorica",
    toId: "ostrog",
  },
  {
    from: "Podgorica",
    to: "Shkodër",
    price: 65,
    fromId: "podgorica",
    toId: "shkoder",
  },
  {
    from: "Podgorica",
    to: "Saranda",
    price: 300,
    fromId: "podgorica",
    toId: "saranda",
  },
];

export function PopularRoutes() {
  const t = useTranslations("popularRoutes");
  const { openBooking } = useBooking();

  return (
    <section className="bg-[#060E24] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
              {t("eyebrow")}
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/50">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTES.map((route) => (
            <button
              key={`${route.fromId}-${route.toId}`}
              type="button"
              onClick={() =>
                openBooking({ from: route.fromId, to: route.toId })
              }
              className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-left transition hover:border-[#00C2E8]/30 hover:bg-[#00C2E8]/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white/60">
                  {route.from}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#00C2E8]/40 transition group-hover:text-[#00C2E8]" />
                <span className="text-sm font-semibold text-white">
                  {route.to}
                </span>
              </div>
              <span className="shrink-0 font-heading text-sm font-bold text-[#00C2E8]">
                {route.price} €
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/25">{t("note")}</p>
      </div>
    </section>
  );
}
