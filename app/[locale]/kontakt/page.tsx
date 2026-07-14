"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/anim/reveal";
import { useBooking } from "@/components/booking/booking-provider";
import { useTranslations } from "next-intl";

const WEB3FORMS_KEY = "f61e5aaf-5734-4b59-af8a-a44d9df98184";
const CONTACT_ICONS = [Phone, Mail, MapPin, Clock];
const CONTACT_HREFS = [
  "https://wa.me/38268861538",
  "mailto:info@transfercrnagora.me",
  undefined,
  undefined,
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const { openBooking } = useBooking();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const contactItems = t.raw("items") as { label: string; value: string }[];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", t("emailSubject", { name: form.name }));
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(t("errorMsg"));
      }
    } catch {
      setError(t("errorMsg"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-[#0A1A3E] mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {contactItems.map((item, i) => {
              const Icon = CONTACT_ICONS[i];
              const href = CONTACT_HREFS[i];
              return (
                <Reveal key={item.label} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0D1F4E] p-5 transition hover:border-[#00C2E8]/30">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#00C2E8]/10">
                      <Icon className="size-5 text-[#00C2E8]" />
                    </span>
                    <div>
                      <p className="text-sm text-white/50">{item.label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-lg font-semibold text-white transition hover:text-[#00C2E8]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-white">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <div className="relative overflow-hidden rounded-2xl border border-[#00C2E8]/20 bg-[#0D1F4E] p-6">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#00C2E8]/10 blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-0.5 bg-[#00C2E8]" />
                <h3 className="font-heading text-xl font-semibold text-white">
                  {t("quickTitle")}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {t("quickSubtitle")}
                </p>
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="mt-4 rounded-xl bg-[#00C2E8] px-5 py-2.5 text-sm font-semibold text-[#0A1A3E] transition hover:bg-[#00D4FF] active:scale-95"
                >
                  {t("quickBtn")}
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-[#0D1F4E] p-6 sm:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <CheckCircle2 className="size-16 text-[#00C2E8]" />
                  <h3 className="font-heading text-2xl font-semibold text-white">
                    {t("successTitle")}
                  </h3>
                  <p className="max-w-sm text-white/60">{t("successMsg")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="font-heading text-2xl font-semibold text-white">
                    {t("formTitle")}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-white/70"
                    >
                      {t("nameLabel")}
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="rounded-xl border border-white/10 bg-[#0A1A3E] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#00C2E8] focus:ring-2 focus:ring-[#00C2E8]/20"
                      placeholder={t("namePlaceholder")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-white/70"
                    >
                      {t("emailLabel")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="rounded-xl border border-white/10 bg-[#0A1A3E] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#00C2E8] focus:ring-2 focus:ring-[#00C2E8]/20"
                      placeholder="vas@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-white/70"
                    >
                      {t("messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="resize-none rounded-xl border border-white/10 bg-[#0A1A3E] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#00C2E8] focus:ring-2 focus:ring-[#00C2E8]/20"
                      placeholder={t("messagePlaceholder")}
                    />
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#00C2E8] px-6 py-3.5 text-sm font-semibold text-[#0A1A3E] transition enabled:hover:bg-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />{" "}
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <Send className="size-4" /> {t("submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
