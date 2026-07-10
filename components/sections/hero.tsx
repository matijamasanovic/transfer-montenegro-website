"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, ArrowRight, Star } from "lucide-react";
import { LOCATIONS } from "@/lib/booking-data";
import { useBooking } from "@/components/booking/booking-provider";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  const { openBooking } = useBooking();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src="/images/hero-coast.png"
          alt="Crnogorska obala i serpentinasti put uz more"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3E]/80 via-[#0A1A3E]/60 to-[#0A1A3E]" />
      </div>
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t("title1")} <span className="text-[#00C2E8]">{t("title2")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 w-full"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#0D1F4E]/90 p-4 shadow-2xl backdrop-blur sm:p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <QuickField
                label={t("from")}
                value={from}
                onChange={setFrom}
                placeholder={t("fromPlaceholder")}
              />
              <QuickField
                label={t("to")}
                value={to}
                onChange={setTo}
                placeholder={t("toPlaceholder")}
              />
              <button
                type="button"
                onClick={() => openBooking({ from, to })}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#00C2E8] px-8 py-4 font-semibold text-[#0A1A3E] transition hover:bg-[#00D4FF] active:scale-95"
              >
                {t("book")} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0A1A3E] px-4 py-3 transition focus-within:border-[#00C2E8] focus-within:ring-2 focus-within:ring-[#00C2E8]/30">
      <MapPin className="h-5 w-5 shrink-0 text-[#00C2E8]" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-medium text-white/50">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-white outline-none"
        >
          <option value="" className="bg-[#0D1F4E]">
            {placeholder}
          </option>
          {LOCATIONS.map((l) => (
            <option key={l.id} value={l.id} className="bg-[#0D1F4E]">
              {l.name}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
