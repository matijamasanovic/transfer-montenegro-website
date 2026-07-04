"use client";

import { motion } from "motion/react";
import { CalendarCheck } from "lucide-react";
import { useBooking } from "@/components/booking/booking-provider";

export function FloatingBookButton() {
  const { openBooking } = useBooking();

  return (
    <motion.button
      type="button"
      onClick={() => openBooking()}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Rezerviši vožnju"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-2xl bg-gradient-to-b from-brand to-accent-teal px-3 py-5 font-semibold text-brand-foreground shadow-lg [writing-mode:vertical-rl] lg:flex"
    >
      <CalendarCheck className="h-5 w-5 rotate-90" />
      Book a ride
    </motion.button>
  );
}
