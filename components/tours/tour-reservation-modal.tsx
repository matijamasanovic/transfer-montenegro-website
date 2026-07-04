"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  User,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import type { Tour } from "@/lib/tours-data";
import { useTranslations } from "next-intl";

const WEB3FORMS_KEY = "f61e5aaf-5734-4b59-af8a-a44d9df98184";

export function TourReservationModal({
  tour,
  open,
  onClose,
}: {
  tour: Tour | null;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("tourModal");
  const tt = useTranslations("toursGrid");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [people, setPeople] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const valid = name && email && phone && date;
  const reset = () => {
    setDone(false);
    setLoading(false);
    setError("");
    setPeople(2);
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
  };
  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  if (!tour) return null;

  const title = tt(`tours.${tour.id}.title`);
  const description = tt(`tours.${tour.id}.description`);
  const highlights = tt.raw(`tours.${tour.id}.highlights`) as string[];

  const handleSubmit = async () => {
    if (!valid) return;
    setLoading(true);
    setError("");
    try {
      // Save via API route (server-side, uses service role key)
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tour",
          name,
          email,
          phone,
          tour_name: title,
          date,
          passengers: people,
          price: tour.price,
          status: "new",
        }),
      });

      const result = await res.json();
      console.log("Tour booking result:", result);

      if (!res.ok) {
        setError(t("errorMsg"));
        return;
      }

      // Send email
      const message =
        `TOUR BOOKING\n\nTour: ${title}\nRoute: Podgorica → ${title}\nDate: ${date}\nPeople: ${people}\nPrice: ${tour.price} €\n\nCONTACT\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`.trim();
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append("subject", `New tour booking: ${title} — ${name}`);
      fd.append("name", name);
      fd.append("email", email);
      fd.append("message", message);
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });

      setDone(true);
    } catch (err) {
      console.error("Tour booking error:", err);
      setError(t("errorMsg"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} labelledBy="tour-title">
      <div className="relative h-40 w-full sm:h-48">
        <img
          src={tour.image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F4E] to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h2
            id="tour-title"
            className="font-heading text-2xl font-bold text-white drop-shadow"
          >
            {title}
          </h2>
          <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4 text-[#00C2E8]" /> {tour.duration}
            </span>
            <span className="font-semibold text-[#00C2E8]">
              {t("from")} {tour.price} €
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="form"
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <p className="text-sm leading-relaxed text-white/60">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-[#00C2E8]/20 bg-[#00C2E8]/10 px-3 py-1 text-xs font-medium text-[#00C2E8]"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label={t("fullName")}
                  icon={<User className="h-4 w-4" />}
                >
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("fullName")}
                    className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
                  />
                </Field>
                <Field
                  label={t("tourDate")}
                  icon={<Calendar className="h-4 w-4" />}
                >
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-white outline-none"
                  />
                </Field>
                <Field label={t("email")} icon={<Mail className="h-4 w-4" />}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
                  />
                </Field>
                <Field label={t("phone")} icon={<Phone className="h-4 w-4" />}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+382 ..."
                    className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
                  />
                </Field>
              </div>
              <Field label={t("people")} icon={<Users className="h-4 w-4" />}>
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {people} {t("person")}
                  </span>
                  <div className="flex items-center gap-3">
                    <Step
                      onClick={() => setPeople(Math.max(1, people - 1))}
                      label="-"
                    />
                    <span className="w-6 text-center text-sm font-semibold text-white">
                      {people}
                    </span>
                    <Step
                      onClick={() => setPeople(Math.min(20, people + 1))}
                      label="+"
                    />
                  </div>
                </div>
              </Field>
              <div className="flex items-center justify-between rounded-xl border border-[#00C2E8]/20 bg-[#00C2E8]/5 px-5 py-4">
                <span className="text-sm text-white/50">{t("priceLabel")}</span>
                <span className="font-heading text-2xl font-bold text-[#00C2E8]">
                  {tour.price} €
                </span>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="button"
                disabled={!valid || loading}
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#00C2E8] py-3.5 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
                  </>
                ) : (
                  t("submit")
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00C2E8]/20"
              >
                <CheckCircle2 className="h-12 w-12 text-[#00C2E8]" />
              </motion.div>
              <h3 className="font-heading text-2xl font-bold text-white">
                {t("successTitle")}
              </h3>
              <p className="max-w-sm text-balance text-white/60">
                {t("successMsg", {
                  name: name.split(" ")[0] || "...",
                  tour: title,
                })}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition hover:border-[#00C2E8]/50 hover:text-[#00C2E8]"
              >
                {t("close")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-[#00C2E8] focus-within:ring-2 focus-within:ring-[#00C2E8]/20">
      <span className="text-[#00C2E8]">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-medium text-white/40">{label}</span>
        {children}
      </span>
    </label>
  );
}
function Step({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-base font-semibold text-white transition hover:border-[#00C2E8] hover:text-[#00C2E8]"
    >
      {label}
    </button>
  );
}
