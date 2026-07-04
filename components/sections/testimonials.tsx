"use client";

import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const reviews = t.raw("reviews") as {
    name: string;
    location: string;
    text: string;
  }[];

  return (
    <section className="bg-[#0D1F4E] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
            {t("eyebrow")}
          </span>
          <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            {t("title")}
          </h2>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#00C2E8] text-[#00C2E8]" />
            ))}
            <span className="ml-2 text-sm font-medium text-white/50">
              5.0 / 5.0
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0A1A3E] p-7 shadow-sm transition hover:border-[#00C2E8]/30"
            >
              <Quote className="h-8 w-8 text-[#00C2E8]" />
              <blockquote className="flex-1 text-sm leading-relaxed text-white/70">
                {r.text}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C2E8] font-heading text-sm font-bold text-[#0A1A3E]">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {r.name}
                  </div>
                  <div className="text-xs text-white/40">{r.location}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
