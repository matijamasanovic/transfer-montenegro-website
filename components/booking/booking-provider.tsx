"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { BookingModule, type BookingPrefill } from "./booking-module";

type BookingContextValue = {
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill | undefined>();
  const [key, setKey] = useState(0);

  const openBooking = useCallback((p?: BookingPrefill) => {
    setPrefill(p);
    setKey((k) => k + 1);
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => setOpen(false), []);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}

      <Modal open={open} onClose={closeBooking} labelledBy="booking-title">
        <div className="relative border-b border-white/10 px-6 pb-5 pt-7">
          <h2 id="booking-title" className="text-2xl font-bold text-white">
            Book your ride
          </h2>

          <p className="mt-1 text-sm text-white/50">
            Select your transfer details
          </p>
        </div>

        <BookingModule key={key} prefill={prefill} />
      </Modal>
    </BookingContext.Provider>
  );
}
