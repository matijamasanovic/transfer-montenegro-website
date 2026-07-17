"use client";

import { useTranslations } from "next-intl";
import { useBooking } from "@/components/booking/booking-provider";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/anim/reveal";

const ROUTES = [
  {
    from: "Tivat",
    to: "Himara",
    price: 360,
    fromId: "tivat",
    toId: "himara",
  },
  {
    from: "Tivat",
    to: "Saranda",
    price: 390,
    fromId: "tivat",
    toId: "saranda",
  },
  {
    from: "Tivat",
    to: "Ksamil",
    price: 395,
    fromId: "tivat",
    toId: "ksamil",
  },
  {
    from: "Tivat",
    to: "Prizren",
    price: 260,
    fromId: "tivat",
    toId: "prizren",
  },
  {
    from: "Tivat",
    to: "Priština",
    price: 310,
    fromId: "tivat",
    toId: "pristina",
  },
  {
    from: "Tivat",
    to: "Ohrid",
    price: 320,
    fromId: "tivat",
    toId: "ohrid",
  },
  {
    from: "Tivat",
    to: "Split",
    price: 350,
    fromId: "tivat",
    toId: "split",
  },
  {
    from: "Budva",
    to: "Dubrovnik",
    price: 190,
    fromId: "budva",
    toId: "dubrovnik-city",
  },
  {
    from: "Budva",
    to: "Mostar",
    price: 240,
    fromId: "budva",
    toId: "mostar",
  },
  {
    from: "Budva",
    to: "Sarajevo",
    price: 260,
    fromId: "budva",
    toId: "sarajevo",
  },
  {
    from: "Budva",
    to: "Skadar",
    price: 140,
    fromId: "budva",
    toId: "shkoder",
  },
  {
    from: "Budva",
    to: "Tirana",
    price: 190,
    fromId: "budva",
    toId: "tirana-city",
  },
  {
    from: "Budva",
    to: "Drač",
    price: 200,
    fromId: "budva",
    toId: "durres",
  },
  {
    from: "Budva",
    to: "Himara",
    price: 340,
    fromId: "budva",
    toId: "himara",
  },
  {
    from: "Budva",
    to: "Saranda",
    price: 370,
    fromId: "budva",
    toId: "saranda",
  },
  {
    from: "Budva",
    to: "Ksamil",
    price: 375,
    fromId: "budva",
    toId: "ksamil",
  },
  {
    from: "Budva",
    to: "Prizren",
    price: 240,
    fromId: "budva",
    toId: "prizren",
  },
  {
    from: "Budva",
    to: "Priština",
    price: 290,
    fromId: "budva",
    toId: "pristina",
  },
  {
    from: "Budva",
    to: "Ohrid",
    price: 300,
    fromId: "budva",
    toId: "ohrid",
  },
  {
    from: "Budva",
    to: "Split",
    price: 350,
    fromId: "budva",
    toId: "split",
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
      </div>
    </section>
  );
}
