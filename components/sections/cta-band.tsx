"use client";

import { motion } from "motion/react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useBooking } from "@/components/booking/booking-provider";
import { useTranslations } from "next-intl";

export function CtaBand() {
  const t = useTranslations("cta");
  const { openBooking } = useBooking();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-[#0D1F4E] border border-white/10 px-8 py-14 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00C2E8]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#00C2E8]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-1 bg-[#00C2E8]" />
        <div className="relative">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
            {t("eyebrow")}
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance font-heading text-3xl font-bold text-white sm:text-4xl">
            {t("title1")} <span className="text-[#00C2E8]">{t("title2")}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">{t("subtitle")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00C2E8] px-7 py-3.5 text-sm font-semibold text-[#0A1A3E] transition hover:bg-[#00D4FF] active:scale-95"
            >
              {t("bookRide")} <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="https://wa.me/38268861538"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#00C2E8]/50 hover:text-[#00C2E8]"
            >
              <PhoneCall className="h-4 w-4" /> {t("phone")}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
