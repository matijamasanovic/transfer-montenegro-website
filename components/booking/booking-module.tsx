"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Phone,
  Plane,
  User,
  Users,
  Check,
  Loader2,
  Car,
  AlertCircle,
  Baby,
} from "lucide-react";
import {
  LOCATIONS,
  VEHICLES,
  getRouteInfo,
  calculatePrice,
  getFromLocations,
  getToLocations,
} from "@/lib/booking-data";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const WEB3FORMS_KEY = "ee0b1e4f-1101-4d4f-baba-7aa09f5905dc";

export type BookingPrefill = Partial<{
  from: string;
  to: string;
  note: string;
}>;

type FormState = {
  vehicle: string;
  roundTrip: boolean;
  from: string;
  to: string;
  date: string;
  time: string;
  // Return ride fields
  returnDate: string;
  returnTime: string;
  returnFrom: string; // pickup on return (default = to)
  returnTo: string; // dropoff on return (default = from)
  passengers: number;
  babySeat: boolean;
  name: string;
  email: string;
  phone: string;
  flight: string;
  note: string;
};

const STEPS_ONE_WAY = [
  "stepVehicle",
  "stepRoute",
  "stepData",
  "stepConfirm",
] as const;
const STEPS_RETURN = [
  "stepVehicle",
  "stepRoute",
  "stepReturn",
  "stepData",
  "stepConfirm",
] as const;

export function BookingModule({
  prefill,
  variant = "panel",
}: {
  prefill?: BookingPrefill;
  variant?: "panel" | "hero";
}) {
  const t = useTranslations("booking");

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    vehicle: "",
    roundTrip: false,
    from: prefill?.from ?? "",
    to: prefill?.to ?? "",
    date: "",
    time: "",
    returnDate: "",
    returnTime: "",
    returnFrom: "",
    returnTo: "",
    passengers: 1,
    babySeat: false,
    name: "",
    email: "",
    phone: "",
    flight: "",
    note: prefill?.note ?? "",
  });

  const STEPS = form.roundTrip ? STEPS_RETURN : STEPS_ONE_WAY;
  const STEP_LABELS = STEPS.map((k) => t(k));

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const locName = (id: string) =>
    LOCATIONS.find((l) => l.id === id)?.name ?? id;
  const selectedVehicle = VEHICLES.find((v) => v.id === form.vehicle);
  const isPodgoricaRoute =
    ["podgorica", "aerodrom-podgorica"].includes(form.from) ||
    ["podgorica", "aerodrom-podgorica"].includes(form.to);
  const routeInfo =
    form.from && form.to
      ? getRouteInfo(form.from, form.to, form.vehicle)
      : null;

  const outboundPrice =
    routeInfo?.available && routeInfo.basePrice !== null && form.vehicle
      ? calculatePrice(
          routeInfo.basePrice,
          form.vehicle,
          false,
          isPodgoricaRoute
        )
      : null;

  // Return route price
  const returnFrom = form.returnFrom || form.to;
  const returnTo = form.returnTo || form.from;
  const isReturnPodgoricaRoute =
    ["podgorica", "aerodrom-podgorica"].includes(returnFrom) ||
    ["podgorica", "aerodrom-podgorica"].includes(returnTo);
  const returnRouteInfo =
    form.roundTrip && returnFrom && returnTo
      ? getRouteInfo(returnFrom, returnTo, form.vehicle)
      : null;
  const returnPrice =
    returnRouteInfo?.available &&
    returnRouteInfo.basePrice !== null &&
    form.vehicle
      ? calculatePrice(
          returnRouteInfo.basePrice,
          form.vehicle,
          false,
          isReturnPodgoricaRoute
        )
      : null;

  const totalPrice =
    form.roundTrip && outboundPrice !== null && returnPrice !== null
      ? outboundPrice + returnPrice
      : outboundPrice;

  const step0Valid = !!form.vehicle;
  const step1Valid = !!(
    form.from &&
    form.to &&
    routeInfo?.available &&
    form.date &&
    form.time &&
    form.passengers >= 1 &&
    form.passengers <= (selectedVehicle?.maxPassengers ?? 8)
  );
  const step2Valid_return = !!(
    returnFrom &&
    returnTo &&
    form.returnDate &&
    form.returnTime
  );
  const stepDataValid = !!(form.name && form.email && form.phone);

  const next = () => setStep((s) => Math.min(s + 1, STEP_LABELS.length));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Get current step key
  const currentStepKey = STEPS[step];

  // When toggling roundTrip, reset step to 0
  const toggleRoundTrip = (val: boolean) => {
    set("roundTrip", val);
    // Pre-fill return fields with reverse route
    if (val) {
      setForm((f) => ({
        ...f,
        roundTrip: val,
        returnFrom: f.to,
        returnTo: f.from,
      }));
    } else {
      set("roundTrip", val);
    }
    setStep(0);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      const priceText = totalPrice ? `${totalPrice} €` : "Cijena na upit";

      const returnInfo = form.roundTrip
        ? `\n\nRETURN RIDE\nPickup: ${locName(returnFrom)}\nDropoff: ${locName(
            returnTo
          )}\nDate/Time: ${form.returnDate} at ${
            form.returnTime
          }\nReturn price: ${returnPrice ? returnPrice + " €" : "On request"}`
        : "";

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "transfer",
          name: form.name,
          email: form.email,
          phone: form.phone,
          from_location: locName(form.from),
          to_location: locName(form.to),
          vehicle: selectedVehicle?.name,
          date: form.date,
          time: form.time,
          passengers: form.passengers,
          baby_seat: form.babySeat,
          flight: form.flight || null,
          note: form.note || null,
          round_trip: form.roundTrip,
          return_date: form.roundTrip ? form.returnDate : null,
          return_time: form.roundTrip ? form.returnTime : null,
          return_from: form.roundTrip ? locName(returnFrom) : null,
          return_to: form.roundTrip ? locName(returnTo) : null,
          price: totalPrice,
          status: "new",
        }),
      });
      if (!res.ok) {
        setError(t("errorMsg"));
        return;
      }

      const message = `TRANSFER REQUEST\n\nROUTE: ${locName(
        form.from
      )} → ${locName(form.to)}\nVehicle: ${selectedVehicle?.name}\nType: ${
        form.roundTrip ? "Return" : "One way"
      }\nDate/Time: ${form.date} at ${form.time}\nPassengers: ${
        form.passengers
      }\nBaby seat: ${
        form.babySeat ? "Yes" : "No"
      }\nPrice: ${priceText}${returnInfo}${
        form.flight ? `\nFlight: ${form.flight}` : ""
      }${form.note ? `\nNote: ${form.note}` : ""}\n\nCONTACT\nName: ${
        form.name
      }\nEmail: ${form.email}\nPhone: ${form.phone}`;

      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append(
        "subject",
        `New transfer: ${locName(form.from)} → ${locName(form.to)} — ${
          form.name
        }`
      );
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("message", message);
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });

      next();
    } catch {
      setError(t("errorMsg"));
    } finally {
      setLoading(false);
    }
  };

  const fromLocations = getFromLocations();
  const toLocations = form.from ? getToLocations(form.from) : [];

  return (
    <div
      className={cn("flex flex-col", variant === "hero" ? "p-0" : "p-6 sm:p-8")}
    >
      {/* Progress */}
      {step < STEP_LABELS.length && (
        <div className="mb-6 flex items-center gap-2">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    i < step && "bg-[#00C2E8] text-[#0A1A3E]",
                    i === step && "bg-[#00C2E8] text-[#0A1A3E]",
                    i > step && "bg-white/10 text-white/40"
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:block",
                    i <= step ? "text-white" : "text-white/40"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1",
                    i < step ? "bg-[#00C2E8]/40" : "bg-white/10"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 0 — VEHICLE */}
        {currentStepKey === "stepVehicle" && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <p className="text-sm text-white/50">{t("selectVehicleHint")}</p>
            <div className="flex flex-col gap-3">
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => set("vehicle", v.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-xl border p-4 text-left transition",
                    form.vehicle === v.id
                      ? "border-[#00C2E8] bg-[#00C2E8]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      form.vehicle === v.id ? "bg-[#00C2E8]/20" : "bg-white/5"
                    )}
                  >
                    <Car
                      className={cn(
                        "h-5 w-5",
                        form.vehicle === v.id
                          ? "text-[#00C2E8]"
                          : "text-white/40"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "font-semibold",
                        form.vehicle === v.id ? "text-white" : "text-white/80"
                      )}
                    >
                      {v.name}
                    </div>
                    <div className="text-xs text-white/40">{v.description}</div>
                  </div>
                  {form.vehicle === v.id && (
                    <Check className="h-5 w-5 shrink-0 text-[#00C2E8]" />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!step0Valid}
              onClick={next}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#00C2E8] py-3.5 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("next")} <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* STEP 1 — ROUTE */}
        {currentStepKey === "stepRoute" && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-1">
              <button
                type="button"
                onClick={() => toggleRoundTrip(false)}
                className={cn(
                  "rounded-lg py-2 text-sm font-medium transition",
                  !form.roundTrip
                    ? "bg-[#00C2E8] text-[#0A1A3E]"
                    : "text-white/50 hover:text-white"
                )}
              >
                {t("oneWay")}
              </button>
              <button
                type="button"
                onClick={() => toggleRoundTrip(true)}
                className={cn(
                  "rounded-lg py-2 text-sm font-medium transition",
                  form.roundTrip
                    ? "bg-[#00C2E8] text-[#0A1A3E]"
                    : "text-white/50 hover:text-white"
                )}
              >
                {t("return")}
              </button>
            </div>

            <Field label={t("from")} icon={<MapPin className="h-4 w-4" />}>
              <select
                value={form.from}
                onChange={(e) => {
                  set("from", e.target.value);
                  set("to", "");
                  setForm((f) => ({
                    ...f,
                    from: e.target.value,
                    to: "",
                    returnTo: e.target.value,
                  }));
                }}
                className="w-full bg-transparent text-sm font-medium text-white outline-none"
              >
                <option value="" className="bg-[#0D1F4E]">
                  {t("selectDeparture")}
                </option>
                {fromLocations.map((l) => (
                  <option key={l.id} value={l.id} className="bg-[#0D1F4E]">
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t("to")} icon={<MapPin className="h-4 w-4" />}>
              <select
                value={form.to}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    to: e.target.value,
                    returnFrom: e.target.value,
                  }));
                }}
                disabled={!form.from}
                className="w-full bg-transparent text-sm font-medium text-white outline-none disabled:opacity-40"
              >
                <option value="" className="bg-[#0D1F4E]">
                  {t("selectDestination")}
                </option>
                {toLocations.map((l) => (
                  <option key={l.id} value={l.id} className="bg-[#0D1F4E]">
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>

            {routeInfo?.quoteOnly && (
              <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                <AlertCircle className="h-4 w-4 shrink-0" /> {t("quoteOnly")}
              </div>
            )}

            {routeInfo?.available && form.vehicle && (
              <div className="rounded-xl border border-[#00C2E8]/20 bg-[#00C2E8]/5 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">
                    {t("oneWay")} · {selectedVehicle?.name}
                  </span>
                  <span className="font-heading text-xl font-bold text-[#00C2E8]">
                    {outboundPrice !== null
                      ? `${outboundPrice} €`
                      : t("priceOnRequest")}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Field label={t("date")} icon={<Calendar className="h-4 w-4" />}>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-white outline-none"
                />
              </Field>
              <Field label={t("time")} icon={<Clock className="h-4 w-4" />}>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-white outline-none"
                />
              </Field>
            </div>

            <Field label={t("passengers")} icon={<Users className="h-4 w-4" />}>
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-medium text-white">
                  {form.passengers} {t("passengersUnit")}
                  {selectedVehicle && (
                    <span className="ml-1 text-white/40">
                      (max {selectedVehicle.maxPassengers})
                    </span>
                  )}
                </span>
                <div className="flex items-center gap-3">
                  <Stepper
                    onClick={() =>
                      set("passengers", Math.max(1, form.passengers - 1))
                    }
                    label="-"
                  />
                  <span className="w-6 text-center text-sm font-semibold text-white">
                    {form.passengers}
                  </span>
                  <Stepper
                    onClick={() =>
                      set(
                        "passengers",
                        Math.min(
                          selectedVehicle?.maxPassengers ?? 8,
                          form.passengers + 1
                        )
                      )
                    }
                    label="+"
                  />
                </div>
              </div>
            </Field>

            <button
              type="button"
              onClick={() => set("babySeat", !form.babySeat)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 text-left transition",
                form.babySeat
                  ? "border-[#00C2E8] bg-[#00C2E8]/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  form.babySeat ? "bg-[#00C2E8]/20" : "bg-white/5"
                )}
              >
                <Baby
                  className={cn(
                    "h-5 w-5",
                    form.babySeat ? "text-[#00C2E8]" : "text-white/40"
                  )}
                />
              </div>
              <div className="flex-1">
                <div
                  className={cn(
                    "text-sm font-semibold",
                    form.babySeat ? "text-white" : "text-white/70"
                  )}
                >
                  {t("babySeat")}
                </div>
                <div className="text-xs text-white/40">{t("babySeatDesc")}</div>
              </div>
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition",
                  form.babySeat
                    ? "border-[#00C2E8] bg-[#00C2E8]"
                    : "border-white/20"
                )}
              >
                {form.babySeat && <Check className="h-3 w-3 text-[#0A1A3E]" />}
              </div>
            </button>

            <BackNext
              onBack={back}
              onNext={next}
              disabled={!step1Valid}
              nextLabel={t("next")}
            />
          </motion.div>
        )}

        {/* STEP 2 — RETURN RIDE (only if roundTrip) */}
        {currentStepKey === "stepReturn" && (
          <motion.div
            key="stepReturn"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-xl border border-[#00C2E8]/20 bg-[#00C2E8]/5 px-4 py-3 text-sm text-white/60">
              {t("returnRideInfo")}
            </div>

            <Field
              label={t("returnPickup")}
              icon={<MapPin className="h-4 w-4" />}
            >
              <select
                value={form.returnFrom || form.to}
                onChange={(e) => set("returnFrom", e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-white outline-none"
              >
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.id} className="bg-[#0D1F4E]">
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label={t("returnDropoff")}
              icon={<MapPin className="h-4 w-4" />}
            >
              <select
                value={form.returnTo || form.from}
                onChange={(e) => set("returnTo", e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-white outline-none"
              >
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.id} className="bg-[#0D1F4E]">
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>

            {returnRouteInfo?.quoteOnly && (
              <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                <AlertCircle className="h-4 w-4 shrink-0" /> {t("quoteOnly")}
              </div>
            )}

            {returnRouteInfo?.available && form.vehicle && (
              <div className="rounded-xl border border-[#00C2E8]/20 bg-[#00C2E8]/5 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">
                    {t("returnRide")} · {selectedVehicle?.name}
                  </span>
                  <span className="font-heading text-xl font-bold text-[#00C2E8]">
                    {returnPrice !== null
                      ? `${returnPrice} €`
                      : t("priceOnRequest")}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Field
                label={t("returnDate")}
                icon={<Calendar className="h-4 w-4" />}
              >
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={(e) => set("returnDate", e.target.value)}
                  min={form.date}
                  className="w-full bg-transparent text-sm font-medium text-white outline-none"
                />
              </Field>
              <Field
                label={t("returnTime")}
                icon={<Clock className="h-4 w-4" />}
              >
                <input
                  type="time"
                  value={form.returnTime}
                  onChange={(e) => set("returnTime", e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-white outline-none"
                />
              </Field>
            </div>

            <BackNext
              onBack={back}
              onNext={next}
              disabled={!step2Valid_return}
              nextLabel={t("next")}
            />
          </motion.div>
        )}

        {/* STEP — DATA */}
        {currentStepKey === "stepData" && (
          <motion.div
            key="stepData"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <Field label={t("fullName")} icon={<User className="h-4 w-4" />}>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder={t("yourName")}
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("email")} icon={<Mail className="h-4 w-4" />}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="vas@email.com"
                  className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
                />
              </Field>
              <Field label={t("phone")} icon={<Phone className="h-4 w-4" />}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+382 ..."
                  className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
                />
              </Field>
            </div>
            <Field
              label={t("flightOptional")}
              icon={<Plane className="h-4 w-4" />}
            >
              <input
                value={form.flight}
                onChange={(e) => set("flight", e.target.value)}
                placeholder={t("flightPlaceholder")}
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
              />
            </Field>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <label className="mb-1 block text-xs font-medium text-white/40">
                {t("noteOptional")}
              </label>
              <textarea
                value={form.note}
                onChange={(e) => set("note", e.target.value)}
                rows={2}
                placeholder={t("notePlaceholder")}
                className="w-full resize-none bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
              />
            </div>
            <BackNext
              onBack={back}
              onNext={next}
              disabled={!stepDataValid}
              nextLabel={t("review")}
            />
          </motion.div>
        )}

        {/* STEP — CONFIRM */}
        {currentStepKey === "stepConfirm" && (
          <motion.div
            key="stepConfirm"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h4 className="mb-3 font-heading text-lg font-semibold text-white">
                {t("reviewTitle")}
              </h4>
              <dl className="flex flex-col gap-2 text-sm">
                <Row
                  label={t("vehicleLabel")}
                  value={selectedVehicle?.name ?? ""}
                />
                <Row
                  label={t("routeLabel")}
                  value={`${locName(form.from)} → ${locName(form.to)}`}
                />
                <Row
                  label={t("dateTimeLabel")}
                  value={`${form.date} ${t("at")} ${form.time}`}
                />
                {form.roundTrip && (
                  <>
                    <div className="my-1 border-t border-white/10" />
                    <Row
                      label={t("returnRide")}
                      value={`${locName(returnFrom)} → ${locName(returnTo)}`}
                    />
                    <Row
                      label={t("returnDate")}
                      value={`${form.returnDate} ${t("at")} ${form.returnTime}`}
                    />
                  </>
                )}
                <Row
                  label={t("passengersLabel")}
                  value={`${form.passengers}`}
                />
                {form.babySeat && <Row label={t("babySeat")} value="✓" />}
                {form.flight && (
                  <Row label={t("flightLabel")} value={form.flight} />
                )}
                <Row
                  label={t("contactLabel")}
                  value={`${form.name} · ${form.phone}`}
                />
                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                  <dt className="font-semibold text-white/70">
                    {t("priceLabel")}
                  </dt>
                  <dd className="font-heading text-xl font-bold text-[#00C2E8]">
                    {totalPrice !== null
                      ? `${totalPrice} €`
                      : t("priceOnRequest")}
                  </dd>
                </div>
              </dl>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={back}
                className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40"
              >
                <ArrowLeft className="h-4 w-4" /> {t("back")}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirm}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00C2E8] py-3 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
                  </>
                ) : (
                  <>
                    {t("confirm")} <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* SUCCESS */}
        {step === STEP_LABELS.length && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 200,
                delay: 0.1,
              }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00C2E8]/20"
            >
              <CheckCircle2 className="h-12 w-12 text-[#00C2E8]" />
            </motion.div>
            <h3 className="font-heading text-2xl font-bold text-white">
              {t("successTitle")}
            </h3>
            <p className="max-w-sm text-balance text-white/60">
              {t("successMsg", { name: form.name.split(" ")[0] || "..." })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
    <label className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-[#00C2E8] focus-within:ring-2 focus-within:ring-[#00C2E8]/20">
      <span className="text-[#00C2E8]">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-medium text-white/40">{label}</span>
        {children}
      </span>
    </label>
  );
}
function Stepper({ onClick, label }: { onClick: () => void; label: string }) {
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
function BackNext({
  onBack,
  onNext,
  disabled,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  disabled: boolean;
  nextLabel: string;
}) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onNext}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00C2E8] py-3 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {nextLabel} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-white/50">{label}</dt>
      <dd className="text-right font-medium text-white">{value}</dd>
    </div>
  );
}
