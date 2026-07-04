"use client";

import { motion } from "motion/react";
import { UserCheck, Clock, ShieldCheck, BadgePercent } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [UserCheck, Clock, ShieldCheck, BadgePercent];
const DARK = [false, true, false, true];

export function WhyChooseUs() {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section className="bg-[#0A1A3E] mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
          {t("eyebrow")}
        </span>
        <h2 className="mt-2 font-heading text-4xl font-bold text-white sm:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = ICONS[i];
          const dark = DARK[i];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={
                dark
                  ? "flex flex-col gap-4 rounded-2xl bg-[#00C2E8] p-7 text-[#0A1A3E]"
                  : "flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0D1F4E] p-7 text-white"
              }
            >
              <div
                className={
                  dark
                    ? "flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A1A3E]/15"
                    : "flex h-14 w-14 items-center justify-center rounded-xl bg-[#00C2E8]/10"
                }
              >
                <Icon
                  className={
                    dark ? "h-7 w-7 text-[#0A1A3E]" : "h-7 w-7 text-[#00C2E8]"
                  }
                />
              </div>
              <h3 className="font-heading text-lg font-bold">{item.title}</h3>
              <p
                className={
                  dark
                    ? "text-sm leading-relaxed text-[#0A1A3E]/70"
                    : "text-sm leading-relaxed text-white/60"
                }
              >
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
