"use client";

import { motion } from "motion/react";
import { Users, Briefcase, Wifi } from "lucide-react";
import { VEHICLES } from "@/lib/booking-data";
import { Reveal } from "@/components/anim/reveal";
import { useTranslations } from "next-intl";

export function Fleet() {
  const t = useTranslations("fleet");

  return (
    <section className="bg-[#0D1F4E] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
              {t("eyebrow")}
            </span>
            <h2 className="mt-2 font-heading text-4xl font-bold text-white sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-white/60">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VEHICLES.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#0A1A3E] p-6 shadow-sm transition hover:border-[#00C2E8]/40 hover:shadow-[0_0_30px_rgba(0,194,232,0.08)]"
            >
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#0D1F4E]">
                <img
                  src={v.image || "/placeholder.svg"}
                  alt={v.name}
                  className="h-32 w-auto object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold text-white">
                {v.name}
              </h3>
              <p className="mt-1 flex-1 text-sm text-white/60">
                {v.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-white/50">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#00C2E8]" /> {v.passengers}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-[#00C2E8]" /> {v.luggage}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Wifi className="h-4 w-4 text-[#00C2E8]" /> WiFi
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
