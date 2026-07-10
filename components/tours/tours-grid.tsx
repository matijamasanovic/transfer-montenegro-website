"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Clock, ArrowRight, MapPin } from "lucide-react";
import { TOURS, type Tour } from "@/lib/tours-data";
import { TourReservationModal } from "./tour-reservation-modal";
import { useTranslations } from "next-intl";

export function ToursGrid({ tours = TOURS }: { tours?: Tour[] }) {
  const t = useTranslations("toursGrid");
  const [selected, setSelected] = useState<Tour | null>(null);
  const [open, setOpen] = useState(false);

  const book = (tour: Tour) => {
    setSelected(tour);
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => {
          const title = t(`tours.${tour.id}.title`);
          const shortDescription = t(`tours.${tour.id}.shortDescription`);
          const highlights = t.raw(`tours.${tour.id}.highlights`) as string[];

          return (
            <motion.article
              key={tour.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0D1F4E] shadow-sm transition hover:border-[#00C2E8]/30 hover:shadow-[0_0_30px_rgba(0,194,232,0.08)]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F4E] via-transparent to-transparent" />

                {/* Duration badge */}
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#0A1A3E]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Clock className="h-3.5 w-3.5 text-[#00C2E8]" />{" "}
                  {tour.duration}
                </span>

                {/* Price badge */}
                <span className="absolute bottom-3 left-3 rounded-full bg-[#00C2E8] px-3 py-1.5 text-sm font-bold text-[#0A1A3E]">
                  {t("from")} {tour.price} €
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1 text-xs font-medium text-[#00C2E8]">
                  <MapPin className="h-3 w-3" /> Podgorica
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-white leading-snug">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                  {shortDescription}
                </p>

                {/* Highlights */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => book(tour)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-[#00C2E8]/40 px-5 py-2.5 text-sm font-semibold text-[#00C2E8] transition hover:bg-[#00C2E8] hover:text-[#0A1A3E]"
                >
                  {t("bookTour")} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      <TourReservationModal
        tour={selected}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
