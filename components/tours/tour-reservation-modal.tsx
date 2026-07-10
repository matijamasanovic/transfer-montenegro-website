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
  MapPin,
  Car,
  ArrowRight,
  Check,
  ArrowLeft,
  Baby,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import type { Tour } from "@/lib/tours-data";
import { VEHICLES, calculatePrice } from "@/lib/booking-data";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const WEB3FORMS_KEY = "f61e5aaf-5734-4b59-af8a-a44d9df98184";

type Step = "vehicle" | "details" | "confirm" | "success";

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
  const b = useTranslations("booking");
  const tt = useTranslations("toursGrid");

  const [step, setStep] = useState<Step>("vehicle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [people, setPeople] = useState(2);
  const [babySeat, setBabySeat] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const selectedVehicle = VEHICLES.find((v) => v.id === vehicle);
  const finalPrice =
    tour && vehicle ? calculatePrice(tour.price, vehicle, false) : null;

  const reset = () => {
    setStep("vehicle");
    setLoading(false);
    setError("");
    setVehicle("");
    setPeople(2);
    setBabySeat(false);
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
  const stops = tt.raw(`tours.${tour.id}.stops`) as {
    name: string;
    desc: string;
  }[];

  const handleSubmit = async () => {
    if (!name || !email || !phone || !date || !vehicle) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tour",
          name,
          email,
          phone,
          tour_name: title,
          vehicle: selectedVehicle?.name,
          date,
          passengers: people,
          baby_seat: babySeat,
          price: finalPrice,
          status: "new",
        }),
      });
      if (!res.ok) {
        setError(t("errorMsg"));
        return;
      }

      const message = `TOUR BOOKING\n\nTour: ${title}\nVehicle: ${
        selectedVehicle?.name
      }\nDate: ${date}\nPeople: ${people}${
        babySeat ? "\nBaby seat: Yes" : ""
      }\nPrice: ${finalPrice} €\n\nCONTACT\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;
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

      setStep("success");
    } catch {
      setError(t("errorMsg"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} labelledBy="tour-title">
      {/* Hero image */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={tour.image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F4E] via-[#0D1F4E]/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h2
            id="tour-title"
            className="font-heading text-xl font-bold text-white drop-shadow"
          >
            {title}
          </h2>
          <div className="mt-1 flex items-center gap-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#00C2E8]" /> {tour.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#00C2E8]" /> Podgorica
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {/* VEHICLE + OVERVIEW */}
          {step === "vehicle" && (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <p className="text-sm leading-relaxed text-white/60">
                {description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-[#00C2E8]/20 bg-[#00C2E8]/10 px-2.5 py-0.5 text-xs font-medium text-[#00C2E8]"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {stops.map((s, i) => (
                  <div
                    key={s.name}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00C2E8]/20 text-xs font-bold text-[#00C2E8]">
                        {i + 1}
                      </div>
                      {i < stops.length - 1 && (
                        <div className="mt-1 h-full w-px bg-white/10" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {s.name}
                      </div>
                      <div className="mt-0.5 text-xs leading-relaxed text-white/50">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                {t("selectVehicle")}
              </p>
              <div className="flex flex-col gap-2">
                {VEHICLES.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicle(v.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3 text-left transition",
                      vehicle === v.id
                        ? "border-[#00C2E8] bg-[#00C2E8]/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        vehicle === v.id ? "bg-[#00C2E8]/20" : "bg-white/5"
                      )}
                    >
                      <Car
                        className={cn(
                          "h-4 w-4",
                          vehicle === v.id ? "text-[#00C2E8]" : "text-white/40"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "text-sm font-semibold",
                          vehicle === v.id ? "text-white" : "text-white/70"
                        )}
                      >
                        {v.name}
                      </div>
                      <div className="text-xs text-white/30">
                        {v.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={cn(
                          "text-sm font-bold",
                          vehicle === v.id ? "text-[#00C2E8]" : "text-white/30"
                        )}
                      >
                        {calculatePrice(tour.price, v.id, false)} €
                      </div>
                      {vehicle === v.id && (
                        <Check className="ml-auto h-4 w-4 text-[#00C2E8]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={!vehicle}
                onClick={() => setStep("details")}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#00C2E8] py-3 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t("next")} <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* DETAILS */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
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
                    {selectedVehicle && (
                      <span className="ml-1 text-white/30">
                        (max {selectedVehicle.maxPassengers})
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-3">
                    <StepBtn
                      onClick={() => setPeople(Math.max(1, people - 1))}
                      label="-"
                    />
                    <span className="w-5 text-center text-sm font-semibold text-white">
                      {people}
                    </span>
                    <StepBtn
                      onClick={() =>
                        setPeople(
                          Math.min(
                            selectedVehicle?.maxPassengers ?? 8,
                            people + 1
                          )
                        )
                      }
                      label="+"
                    />
                  </div>
                </div>
              </Field>

              {/* Baby seat */}
              <button
                type="button"
                onClick={() => setBabySeat(!babySeat)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left transition",
                  babySeat
                    ? "border-[#00C2E8] bg-[#00C2E8]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    babySeat ? "bg-[#00C2E8]/20" : "bg-white/5"
                  )}
                >
                  <Baby
                    className={cn(
                      "h-5 w-5",
                      babySeat ? "text-[#00C2E8]" : "text-white/40"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div
                    className={cn(
                      "text-sm font-semibold",
                      babySeat ? "text-white" : "text-white/70"
                    )}
                  >
                    {b("babySeat")}
                  </div>
                  <div className="text-xs text-white/40">
                    {b("babySeatDesc")}
                  </div>
                </div>
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition",
                    babySeat
                      ? "border-[#00C2E8] bg-[#00C2E8]"
                      : "border-white/20"
                  )}
                >
                  {babySeat && <Check className="h-3 w-3 text-[#0A1A3E]" />}
                </div>
              </button>

              <div className="flex items-center justify-between rounded-xl border border-[#00C2E8]/20 bg-[#00C2E8]/5 px-4 py-3">
                <span className="text-sm text-white/50">
                  {t("priceLabel")} · {selectedVehicle?.name}
                </span>
                <span className="font-heading text-xl font-bold text-[#00C2E8]">
                  {finalPrice} €
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("vehicle")}
                  className="flex items-center gap-1 rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:border-white/40"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={!name || !email || !phone || !date}
                  onClick={() => setStep("confirm")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00C2E8] py-3 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("review")} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* CONFIRM */}
          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-heading text-base font-semibold text-white">
                  {t("reviewTitle")}
                </h4>
                <dl className="flex flex-col gap-2 text-sm">
                  <Row label={t("tourLabel")} value={title} />
                  <Row
                    label={t("vehicleLabel")}
                    value={selectedVehicle?.name ?? ""}
                  />
                  <Row label={t("tourDate")} value={date} />
                  <Row label={t("people")} value={`${people}`} />
                  {babySeat && <Row label={b("babySeat")} value="✓" />}
                  <Row label="Kontakt" value={`${name} · ${phone}`} />
                  <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                    <dt className="font-semibold text-white/70">
                      {t("priceLabel")}
                    </dt>
                    <dd className="font-heading text-xl font-bold text-[#00C2E8]">
                      {finalPrice} €
                    </dd>
                  </div>
                </dl>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="flex items-center gap-1 rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:border-white/40"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00C2E8] py-3 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />{" "}
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      {t("submit")} <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
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
function StepBtn({ onClick, label }: { onClick: () => void; label: string }) {
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
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-white/50">{label}</dt>
      <dd className="text-right font-medium text-white">{value}</dd>
    </div>
  );
}
