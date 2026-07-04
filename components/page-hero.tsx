"use client";

import { motion } from "motion/react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0A1A3E] pt-28 pb-16">
      {/* Cyan glow blobs */}
      <div className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-[#00C2E8]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#00C2E8]/8 blur-3xl" />

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0A1A3E]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#00C2E8]">
            {eyebrow}
          </span>
          <h1 className="mt-3 text-balance font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-white/65">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
